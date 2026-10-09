import { handleSupabaseError } from "../../utils/errorHandler";
import { mapJobToDB, mapJobToDBForCreate } from "../../utils/mappers";
import { loadSupabase } from "../../utils/loadSupabase";
import { clearValues } from "./jobSlice";

/**
 * Creates a new job listing for an employer
 *
 * - Creates job with employer_id from current user
 * - Auto-populates company_name from employer's profile
 * - Sets initial status to "open"
 *
 * @param {Object} job - Job form data from jobSlice state
 * @param {Object} thunkAPI - Redux thunk API
 * @returns {string} Success message or rejected with error
 */
export const createJobThunk = async (job, thunkAPI) => {
  const state = thunkAPI.getState();
  const user = state.user.user;

  if (!user) {
    return thunkAPI.rejectWithValue("You must be logged in to post a job");
  }

  if (user.role !== "employer") {
    return thunkAPI.rejectWithValue("Only employers can post jobs");
  }

  if (!user.company_name) {
    return thunkAPI.rejectWithValue(
      "Company name is required. Please update your profile.",
    );
  }

  // Validate salary range if both are provided
  if (job.salary_min && job.salary_max) {
    const minSalary = Number(job.salary_min);
    const maxSalary = Number(job.salary_max);
    if (maxSalary < minSalary) {
      return thunkAPI.rejectWithValue(
        "Maximum salary must be greater than or equal to minimum salary",
      );
    }
  }

  const dbJob = mapJobToDBForCreate(job, user.id, user.company_name);

  const supabase = await loadSupabase();
  const { error } = await supabase.from("jobs").insert(dbJob);

  if (error) return handleSupabaseError(error, thunkAPI);

  thunkAPI.dispatch(clearValues());
  return "Job posted successfully";
};

/**
 * Deletes a job listing owned by the employer
 *
 * - Deletes job and cascades to applications and saved_jobs via DB
 * - Only deletes if employer owns the job (employer_id match)
 *
 * @param {string} jobId - The job ID to delete
 * @param {Object} thunkAPI - Redux thunk API
 * @returns {string} Success message or rejected with error
 */
export const deleteJobThunk = async (jobId, thunkAPI) => {
  const state = thunkAPI.getState();
  const user = state.user.user;

  if (!user) {
    return thunkAPI.rejectWithValue("You must be logged in to delete a job");
  }

  // Note: RLS policies ensure employers can only delete their own jobs
  // The employer_id check in the query provides an additional layer of safety
  const supabase = await loadSupabase();
  const { error } = await supabase
    .from("jobs")
    .delete()
    .eq("id", jobId)
    .eq("employer_id", user.id);

  if (error) {
    return handleSupabaseError(error, thunkAPI);
  }

  return "Job deleted successfully";
};

/**
 * Updates an existing job listing owned by the employer
 *
 * - Updates all editable fields including status (open/closed)
 * - Only updates if employer owns the job (employer_id match via RLS)
 *
 * @param {Object} params - { jobId, job } The job ID and updated job data
 * @param {Object} thunkAPI - Redux thunk API
 * @returns {string} Success message or rejected with error
 */
export const editJobThunk = async ({ jobId, job }, thunkAPI) => {
  const state = thunkAPI.getState();
  const user = state.user.user;

  if (!user) {
    return thunkAPI.rejectWithValue("You must be logged in to edit a job");
  }

  // Validate salary range if both are provided
  if (job.salary_min && job.salary_max) {
    const minSalary = Number(job.salary_min);
    const maxSalary = Number(job.salary_max);
    if (maxSalary < minSalary) {
      return thunkAPI.rejectWithValue(
        "Maximum salary must be greater than or equal to minimum salary",
      );
    }
  }

  // Note: RLS policies ensure employers can only update their own jobs
  const supabase = await loadSupabase();
  const { error } = await supabase
    .from("jobs")
    .update({
      ...mapJobToDB(job),
      updated_at: new Date().toISOString(),
    })
    .eq("id", jobId)
    .eq("employer_id", user.id);

  if (error) return handleSupabaseError(error, thunkAPI);

  thunkAPI.dispatch(clearValues());
  return "Job updated successfully";
};
