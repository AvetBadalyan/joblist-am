import { toast } from "react-toastify";
import { checkAppliedJobs } from "../features/applications/applicationsSlice";
import { getSavedJobIds } from "../features/savedJobs/savedJobsSlice";
import { logoutUser, setUser } from "../features/user/userSlice";
import { store } from "../store";
import { mapProfileFromDB } from "./mappers";
import { supabase } from "./supabase";

/**
 * Fetches the user's profile from the profiles table.
 * @param {string} userId - The authenticated user's ID
 * @returns {Object|null} The mapped profile data or null if not found
 */
const fetchUserProfile = async (userId) => {
  try {
    const { data: profile, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) {
      console.error("Failed to fetch user profile:", error);
      return null;
    }

    return mapProfileFromDB(profile);
  } catch (error) {
    console.error("Error fetching profile:", error);
    return null;
  }
};

/**
 * Initializes candidate-specific state when a candidate logs in.
 * This fetches saved job IDs and applied job IDs for bookmark/application UI state.
 * @param {Object} profile - The user profile object
 */
const initializeCandidateState = (profile) => {
  if (profile?.role === "candidate") {
    // Initialize saved job IDs for bookmark state (Requirement 8.1)
    store.dispatch(getSavedJobIds());
    // Initialize applied job IDs for "Already Applied" state
    store.dispatch(checkAppliedJobs());
  }
};

/**
 * Sets up a Supabase auth state listener to:
 * 1. Fetch profile data (including role) when session is restored
 * 2. Store complete user profile in Redux state
 * 3. Handle session persistence across page refreshes
 * 4. Clear user state on sign-out
 *
 * @returns {Object} Subscription object with unsubscribe method
 */
export const setupAuthListener = () => {
  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange(async (event, session) => {
    // Handle sign-out events - clear user state
    if (event === "SIGNED_OUT") {
      store.dispatch(logoutUser());
      return;
    }

    // Handle token refresh without session - session expired
    if (event === "TOKEN_REFRESHED" && !session) {
      store.dispatch(logoutUser());
      toast.info("Session expired. Please log in again.");
      return;
    }

    // Handle session restoration on page refresh or initial load
    // INITIAL_SESSION fires when Supabase client initializes and detects an existing session
    if (event === "INITIAL_SESSION" && session?.user) {
      const currentUser = store.getState().user.user;

      // Only fetch profile if we don't have user data in Redux
      // (localStorage might have stale data, so we re-fetch to ensure consistency)
      if (!currentUser || currentUser.id !== session.user.id) {
        const profile = await fetchUserProfile(session.user.id);

        if (profile) {
          store.dispatch(setUser(profile));
          // Initialize candidate-specific state (saved jobs, applied jobs)
          initializeCandidateState(profile);
        } else {
          // Profile doesn't exist - this shouldn't happen with proper registration flow
          // but handle gracefully by logging out
          console.warn(
            "No profile found for authenticated user - clearing session",
          );
          await supabase.auth.signOut();
          store.dispatch(logoutUser());
        }
      } else {
        // User already in Redux state, but still initialize candidate state
        // (this handles page refresh where localStorage has user but Redux state needs initialization)
        initializeCandidateState(currentUser);
      }
      return;
    }

    // Handle new sign-in events
    // Note: SIGNED_IN also fires during initial session restore in some cases,
    // so we check if we already have the user to avoid duplicate fetches
    if (event === "SIGNED_IN" && session?.user) {
      const currentUser = store.getState().user.user;

      // Only fetch if we don't already have this user in state
      // (login thunk already handles setting user on explicit login)
      if (!currentUser || currentUser.id !== session.user.id) {
        const profile = await fetchUserProfile(session.user.id);

        if (profile) {
          store.dispatch(setUser(profile));
          // Initialize candidate-specific state (saved jobs, applied jobs)
          initializeCandidateState(profile);
        } else {
          // Profile doesn't exist - shouldn't happen with proper registration
          console.warn("No profile found for signed-in user");
        }
      } else {
        // User already in Redux state, still initialize candidate state for explicit logins
        initializeCandidateState(currentUser);
      }
    }
  });

  return subscription;
};
