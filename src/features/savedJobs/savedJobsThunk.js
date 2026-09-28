/**
 * savedJobsThunk - Async thunk handlers for saved jobs operations
 *
 * These thunks manage candidate's saved/bookmarked jobs functionality.
 * All operations require an authenticated candidate user.
 *
 */

import { mapSavedJobFromDB } from "../../utils/mappers";
import { supabase } from "../../utils/supabase";

/**
 * Fetch all saved jobs for the current candidate with joined job data
 *
 * Fetches from saved_jobs table and joins with jobs table to get full job details.
 * Only returns jobs that are still available (not deleted).
 *
 * @returns {Promise<{ savedJobs: Array }>}
 */
export const getSavedJobsThunk = async (_, thunkAPI) => {
  try {
    const { user } = thunkAPI.getState().user;

    if (!user) {
      return thunkAPI.rejectWithValue(
        "You must be logged in to view saved jobs",
      );
    }

    // Fetch saved jobs with joined job data
    const { data, error } = await supabase
      .from("saved_jobs")
      .select(
        `
        id,
        job_id,
        candidate_id,
        saved_at,
        jobs (
          id,
          employer_id,
          title,
          company_name,
          location,
          job_type,
          salary_min,
          salary_max,
          description,
          requirements,
          status,
          created_at,
          updated_at
        )
      `,
      )
      .eq("candidate_id", user.id)
      .order("saved_at", { ascending: false });

    if (error) {
      console.error("Error fetching saved jobs:", error);
      return thunkAPI.rejectWithValue("Failed to load saved jobs");
    }

    // Map the data using the mapper function
    const savedJobs = data.map(mapSavedJobFromDB);

    return { savedJobs };
  } catch (error) {
    console.error("Unexpected error in getSavedJobsThunk:", error);
    return thunkAPI.rejectWithValue("An unexpected error occurred");
  }
};

/**
 * Save a job to the candidate's saved jobs
 *
 * Inserts a new record into saved_jobs table.
 * Returns the jobId for optimistic UI update confirmation.
 *
 * @param {string} jobId - The job ID to save
 * @returns {Promise<{ jobId: string, savedJob?: object }>}
 */
export const saveJobThunk = async (jobId, thunkAPI) => {
  try {
    const { user } = thunkAPI.getState().user;

    if (!user) {
      return thunkAPI.rejectWithValue("You must be logged in to save jobs");
    }

    if (user.role !== "candidate") {
      return thunkAPI.rejectWithValue("Only candidates can save jobs");
    }

    // Insert the saved job record
    const { data, error } = await supabase
      .from("saved_jobs")
      .insert({
        job_id: jobId,
        candidate_id: user.id,
      })
      .select(
        `
        id,
        job_id,
        candidate_id,
        saved_at,
        jobs (
          id,
          employer_id,
          title,
          company_name,
          location,
          job_type,
          salary_min,
          salary_max,
          description,
          requirements,
          status,
          created_at,
          updated_at
        )
      `,
      )
      .single();

    if (error) {
      // Check for duplicate error (already saved)
      if (error.code === "23505") {
        return thunkAPI.rejectWithValue("You have already saved this job");
      }
      console.error("Error saving job:", error);
      return thunkAPI.rejectWithValue("Failed to save job");
    }

    // Return the saved job with joined data for the slice to store
    const savedJob = mapSavedJobFromDB(data);

    return { jobId, savedJob };
  } catch (error) {
    console.error("Unexpected error in saveJobThunk:", error);
    return thunkAPI.rejectWithValue("An unexpected error occurred");
  }
};

/**
 * Remove a job from the candidate's saved jobs
 *
 * Deletes the saved_jobs record where job_id and candidate_id match.
 *
 * @param {string} jobId - The job ID to unsave
 * @returns {Promise<{ jobId: string }>}
 */
export const unsaveJobThunk = async (jobId, thunkAPI) => {
  try {
    const { user } = thunkAPI.getState().user;

    if (!user) {
      return thunkAPI.rejectWithValue("You must be logged in to unsave jobs");
    }

    // Delete the saved job record
    const { error } = await supabase
      .from("saved_jobs")
      .delete()
      .eq("job_id", jobId)
      .eq("candidate_id", user.id);

    if (error) {
      console.error("Error unsaving job:", error);
      return thunkAPI.rejectWithValue("Failed to remove saved job");
    }

    return { jobId };
  } catch (error) {
    console.error("Unexpected error in unsaveJobThunk:", error);
    return thunkAPI.rejectWithValue("An unexpected error occurred");
  }
};

/**
 * Fetch just the IDs of saved jobs for quick bookmark state initialization
 *
 * This is a lightweight query that only fetches job_id column.
 * Used to initialize bookmark state when a candidate logs in,
 * allowing the UI to show the correct saved/unsaved state on job cards.
 *
 * @returns {Promise<{ savedJobIds: string[] }>}
 */
export const getSavedJobIdsThunk = async (_, thunkAPI) => {
  try {
    const { user } = thunkAPI.getState().user;

    if (!user) {
      return thunkAPI.rejectWithValue("You must be logged in");
    }

    // Fetch only job_id column for lightweight initialization
    const { data, error } = await supabase
      .from("saved_jobs")
      .select("job_id")
      .eq("candidate_id", user.id);

    if (error) {
      console.error("Error fetching saved job IDs:", error);
      return thunkAPI.rejectWithValue("Failed to load saved job IDs");
    }

    // Extract just the job_id values into an array
    const savedJobIds = data.map((item) => item.job_id);

    return { savedJobIds };
  } catch (error) {
    console.error("Unexpected error in getSavedJobIdsThunk:", error);
    return thunkAPI.rejectWithValue("An unexpected error occurred");
  }
};
