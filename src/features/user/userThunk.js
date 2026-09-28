import { handleSupabaseError } from "../../utils/errorHandler";
import { mapProfileFromDB } from "../../utils/mappers";
import { supabase } from "../../utils/supabase";
import { clearApplicationsState } from "../applications/applicationsSlice";
import { clearEmployerJobsState } from "../employerJobs/employerJobsSlice";
import { clearValues } from "../jobSlice/jobSlice";
import { clearPublicJobsState } from "../publicJobs/publicJobsSlice";
import { clearSavedJobsState } from "../savedJobs/savedJobsSlice";
import { logoutUser } from "./userSlice";

/**
 * Register a new user with role selection and role-specific fields.
 *
 * Flow:
 * 1. Call supabase.auth.signUp({ email, password })
 * 2. Insert profile record with role and role-specific fields
 * 3. Return { user } with the profile data
 *
 * @param {Object} user - Registration data
 * @param {string} user.email - User email
 * @param {string} user.password - User password
 * @param {string} user.name - User display name
 * @param {string} user.role - 'candidate' or 'employer'
 * @param {string} [user.location] - User location (candidate)
 * @param {string} [user.skills] - Skills (candidate)
 * @param {string} [user.resume_url] - Resume URL (candidate)
 * @param {string} [user.company_name] - Company name (employer, required)
 * @param {string} [user.company_description] - Company description (employer)
 * @param {string} [user.company_logo_url] - Company logo URL (employer)
 */
export const registerUserThunk = async (user, thunkAPI) => {
  // Step 1: Sign up with Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: user.email,
    password: user.password,
    options: {
      data: {
        name: user.name,
        role: user.role,
      },
    },
  });

  if (authError) return handleSupabaseError(authError, thunkAPI);

  const authUser = authData.user;
  if (!authUser) {
    return thunkAPI.rejectWithValue("Registration failed. Please try again.");
  }

  // Step 2: Insert profile record with role and role-specific fields
  const profileData = {
    id: authUser.id,
    email: user.email,
    name: user.name,
    role: user.role,
    location: user.location || null,
    // Candidate-specific fields
    skills: user.role === "candidate" ? user.skills || null : null,
    resume_url: user.role === "candidate" ? user.resume_url || null : null,
    // Employer-specific fields
    company_name: user.role === "employer" ? user.company_name : null,
    company_description:
      user.role === "employer" ? user.company_description || null : null,
    company_logo_url:
      user.role === "employer" ? user.company_logo_url || null : null,
  };

  const { data: profileInsert, error: profileError } = await supabase
    .from("profiles")
    .insert(profileData)
    .select()
    .single();

  if (profileError) {
    // If profile creation fails, we should still return the auth user info
    // but log the error. In a real-world scenario, we might want to handle this differently.
    console.error("Profile creation failed:", profileError);
    return handleSupabaseError(profileError, thunkAPI);
  }

  // Step 3: Return user with profile data
  return {
    user: mapProfileFromDB(profileInsert),
  };
};

/**
 * Log in an existing user and fetch their profile with role.
 *
 * Flow:
 * 1. Call supabase.auth.signInWithPassword({ email, password })
 * 2. Fetch the user's profile from profiles table
 * 3. Return { user } with the profile data
 *
 * @param {Object} user - Login credentials
 * @param {string} user.email - User email
 * @param {string} user.password - User password
 */
export const loginUserThunk = async (user, thunkAPI) => {
  // Step 1: Sign in with Supabase Auth
  const { data: authData, error: authError } =
    await supabase.auth.signInWithPassword({
      email: user.email,
      password: user.password,
    });

  if (authError) return handleSupabaseError(authError, thunkAPI);

  const authUser = authData.user;
  if (!authUser) {
    return thunkAPI.rejectWithValue("Login failed. Please try again.");
  }

  // Step 2: Fetch the user's profile from profiles table
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", authUser.id)
    .single();

  if (profileError) {
    // Profile might not exist for old users - handle gracefully
    console.error("Profile fetch failed:", profileError);
    return handleSupabaseError(profileError, thunkAPI);
  }

  // Step 3: Return user with profile data
  return {
    user: mapProfileFromDB(profile),
  };
};

/**
 * Update the current user's profile in the profiles table.
 *
 * @param {Object} user - Updated profile data
 */
export const updateUserThunk = async (user, thunkAPI) => {
  try {
    // Get the current user ID
    const {
      data: { user: authUser },
    } = await supabase.auth.getUser();

    if (!authUser) {
      return thunkAPI.rejectWithValue("Not authenticated");
    }

    // Build the update object based on what fields are provided
    const updateData = {
      name: user.name,
      location: user.location || null,
      // Candidate fields
      skills: user.skills || null,
      resume_url: user.resume_url || null,
      // Employer fields
      company_name: user.company_name || null,
      company_description: user.company_description || null,
      company_logo_url: user.company_logo_url || null,
      updated_at: new Date().toISOString(),
    };

    // Update profile in the profiles table
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .update(updateData)
      .eq("id", authUser.id)
      .select()
      .single();

    if (profileError) return handleSupabaseError(profileError, thunkAPI);

    return {
      user: mapProfileFromDB(profile),
    };
  } catch (error) {
    return handleSupabaseError(error, thunkAPI);
  }
};

/**
 * Clear the store and sign out from Supabase.
 *
 * Flow:
 * 1. Call supabase.auth.signOut() to clear Supabase session
 * 2. Dispatch logout actions to clear all user-specific Redux state
 * 3. Clear localStorage user data (handled by logoutUser reducer)
 *
 * Note: Navigation to "/" is handled by the component dispatching this action.
 *
 * @param {string} message - Optional message to show on logout
 */
export const clearStoreThunk = async (message, thunkAPI) => {
  try {
    // Step 1: Clear Supabase session
    await supabase.auth.signOut();

    // Step 2: Clear user state and localStorage
    thunkAPI.dispatch(logoutUser(message));

    // Step 3: Clear all user-specific Redux state
    thunkAPI.dispatch(clearValues());
    thunkAPI.dispatch(clearApplicationsState());
    thunkAPI.dispatch(clearSavedJobsState());
    thunkAPI.dispatch(clearEmployerJobsState());
    thunkAPI.dispatch(clearPublicJobsState());

    return Promise.resolve();
  } catch (error) {
    return Promise.reject();
  }
};
