/**
 * applicationsThunk - Async thunk handlers for candidate job applications
 *
 * - submitApplicationThunk: Submit a new job application
 * - getMyApplicationsThunk: Fetch all applications for the candidate
 * - checkAppliedJobsThunk: Get list of job IDs user has applied to
 */

import { supabase } from "../../utils/supabase";
import { handleSupabaseError } from "../../utils/errorHandler";
import { mapApplicationFromDB } from "../../utils/mappers";

/**
 * Submit a new job application
 * @param {Object} data - Application data { jobId, cover_letter, resume_url }
 * @param {Object} thunkAPI - Redux Toolkit thunk API
 * @returns {Object} { application } - The created application
 *
 */
export const submitApplicationThunk = async (
  { jobId, cover_letter, resume_url },
  thunkAPI
) => {
  try {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return thunkAPI.rejectWithValue("Please log in to apply for jobs");
    }

    const { data, error } = await supabase
      .from("applications")
      .insert({
        job_id: jobId,
        candidate_id: user.id,
        cover_letter: cover_letter,
        resume_url: resume_url || null,
        status: "applied",
      })
      .select(
        `
        *,
        jobs (
          title,
          company_name
        )
      `
      )
      .single();

    if (error) {
      // Handle unique constraint violation (already applied)
      if (
        error.code === "23505" ||
        error.message?.includes("duplicate key") ||
        error.message?.includes("unique constraint")
      ) {
        return thunkAPI.rejectWithValue("You have already applied to this job");
      }
      return handleSupabaseError(error, thunkAPI);
    }

    const application = mapApplicationFromDB(data);

    return { application };
  } catch (error) {
    return handleSupabaseError(error, thunkAPI);
  }
};

/**
 * Fetch all applications for the current candidate
 * @param {undefined} _ - Unused argument
 * @param {Object} thunkAPI - Redux Toolkit thunk API
 * @returns {Object} { applications, totalApplications }
 *
 */
export const getMyApplicationsThunk = async (_, thunkAPI) => {
  try {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return thunkAPI.rejectWithValue("Please log in to view your applications");
    }

    const { data, error, count } = await supabase
      .from("applications")
      .select(
        `
        *,
        jobs (
          title,
          company_name
        )
      `,
        { count: "exact" }
      )
      .eq("candidate_id", user.id)
      .order("applied_at", { ascending: false });

    if (error) {
      return handleSupabaseError(error, thunkAPI);
    }

    const applications = (data || []).map(mapApplicationFromDB);

    return {
      applications,
      totalApplications: count || 0,
    };
  } catch (error) {
    return handleSupabaseError(error, thunkAPI);
  }
};

/**
 * Check which jobs the candidate has already applied to
 * Used to prevent duplicate applications and show "Already Applied" state
 * @param {undefined} _ - Unused argument
 * @param {Object} thunkAPI - Redux Toolkit thunk API
 * @returns {Object} { appliedJobIds }
 *
 */
export const checkAppliedJobsThunk = async (_, thunkAPI) => {
  try {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
        return { appliedJobIds: [] };
    }

    const { data, error } = await supabase
      .from("applications")
      .select("job_id")
      .eq("candidate_id", user.id);

    if (error) {
      return handleSupabaseError(error, thunkAPI);
    }

    const appliedJobIds = (data || []).map((app) => app.job_id);

    return { appliedJobIds };
  } catch (error) {
    return handleSupabaseError(error, thunkAPI);
  }
};
