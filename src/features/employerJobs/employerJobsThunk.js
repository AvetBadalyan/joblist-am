/**
 * employerJobsThunk - Async thunks for employer job management
 */

import { handleSupabaseError } from "../../utils/errorHandler";
import { mapApplicationFromDB, mapJobFromDB } from "../../utils/mappers";
import { loadSupabase } from "../../utils/loadSupabase";

const PAGE_SIZE = 10;

/**
 * Fetches all jobs posted by the current employer with application counts
 * @param {Object} _ - unused first argument
 * @param {Object} thunkAPI - Redux Toolkit thunk API
 * @returns {Object} { jobs, totalJobs, numOfPages }
 */
export const getEmployerJobsThunk = async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const userId = state.user.user?.id;
  const { page } = state.employerJobs;

  if (!userId) {
    return thunkAPI.rejectWithValue("User not authenticated");
  }

  const supabase = await loadSupabase();
  const {
    data: jobs,
    count,
    error: jobsError,
  } = await supabase
    .from("jobs")
    .select("*", { count: "exact" })
    .eq("employer_id", userId)
    .order("created_at", { ascending: false })
    .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);

  if (jobsError) {
    return handleSupabaseError(jobsError, thunkAPI);
  }

  if (!jobs || jobs.length === 0) {
    return { jobs: [], totalJobs: 0, numOfPages: 1 };
  }

  const jobIds = jobs.map((job) => job.id);
  const { data: applicationCounts, error: countsError } = await supabase
    .from("applications")
    .select("job_id")
    .in("job_id", jobIds);

  if (countsError) {
    return handleSupabaseError(countsError, thunkAPI);
  }

  const countMap = {};
  (applicationCounts || []).forEach((app) => {
    countMap[app.job_id] = (countMap[app.job_id] || 0) + 1;
  });

  const mappedJobs = jobs.map((job) => ({
    ...mapJobFromDB(job),
    application_count: countMap[job.id] || 0,
  }));

  return {
    jobs: mappedJobs,
    totalJobs: count || 0,
    numOfPages: Math.ceil((count || 0) / PAGE_SIZE),
  };
};

/**
 * Fetches all applicants for a specific job
 * RLS ensures employer can only see applications for their own jobs
 * @param {string} jobId - The job ID to fetch applicants for
 * @param {Object} thunkAPI - Redux Toolkit thunk API
 * @returns {Object} { applicants }
 */
export const getJobApplicantsThunk = async (jobId, thunkAPI) => {
  if (!jobId) {
    return thunkAPI.rejectWithValue("Job ID is required");
  }

  // RLS will automatically prevent access if the employer doesn't own the job
  const supabase = await loadSupabase();
  const { data: applications, error } = await supabase
    .from("applications")
    .select(
      `
      *,
      profiles:candidate_id (
        name,
        email
      )
    `,
    )
    .eq("job_id", jobId)
    .order("applied_at", { ascending: false });

  if (error) {
    return handleSupabaseError(error, thunkAPI);
  }

  const mappedApplicants = (applications || []).map((app) => {
    // Use the mapper but also add the joined profile fields
    const mapped = mapApplicationFromDB({
      ...app,
      // mapApplicationFromDB expects profiles nested under 'profiles' key
    });

      return {
      ...mapped,
      candidate_name: app.profiles?.name || "Unknown",
      candidate_email: app.profiles?.email || "Unknown",
    };
  });

  return { applicants: mappedApplicants };
};

/**
 * Updates the status of an application
 * RLS ensures employer can only update applications for their own jobs
 * @param {Object} params - { applicationId, status }
 * @param {Object} thunkAPI - Redux Toolkit thunk API
 * @returns {Object} { applicationId, status }
 */
export const updateApplicationStatusThunk = async (
  { applicationId, status },
  thunkAPI,
) => {
  if (!applicationId) {
    return thunkAPI.rejectWithValue("Application ID is required");
  }

  const validStatuses = [
    "applied",
    "reviewing",
    "interview",
    "offer",
    "rejected",
  ];
  if (!validStatuses.includes(status)) {
    return thunkAPI.rejectWithValue("Invalid application status");
  }

  const supabase = await loadSupabase();
  const { error } = await supabase
    .from("applications")
    .update({
      status,
      updated_at: new Date().toISOString(),
    })
    .eq("id", applicationId);

  if (error) {
    return handleSupabaseError(error, thunkAPI);
  }

  return { applicationId, status };
};
