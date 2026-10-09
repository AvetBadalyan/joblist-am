/**
 * publicJobsThunk - Async thunks for public job browsing
 */

import { mapJobFromDB } from "../../utils/mappers";
import { loadSupabase } from "../../utils/loadSupabase";

// Number of jobs per page for pagination
const JOBS_PER_PAGE = 10;

// Number of jobs shown in the landing page "Featured Jobs" section
const FEATURED_JOBS_COUNT = 6;

/**
 * Fetch the most recent open jobs for the landing page's Featured section.
 * @returns {Array} up to FEATURED_JOBS_COUNT mapped job objects
 */
export const getFeaturedJobsThunk = async (_, thunkAPI) => {
  try {
    const supabase = await loadSupabase();
    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .eq("status", "open")
      .order("created_at", { ascending: false })
      .limit(FEATURED_JOBS_COUNT);

    if (error) {
      throw error;
    }

    return (data || []).map(mapJobFromDB);
  } catch (error) {
    console.error("Error fetching featured jobs:", error);
    return thunkAPI.rejectWithValue(
      error.message || "Failed to load featured jobs.",
    );
  }
};

/**
 * Fetch all public jobs with search, filter, and pagination
 * Uses Supabase client without auth for public access
 *
 *
 * @param {Object} _ - unused first argument
 * @param {Object} thunkAPI - Redux Toolkit thunk API
 * @returns {Object} { jobs, totalJobs, numOfPages }
 */
export const getAllPublicJobsThunk = async (_, thunkAPI) => {
  try {
    const supabase = await loadSupabase();
    // Get filter state from Redux store
    const { search, searchType, sort, page } = thunkAPI.getState().publicJobs;

    // Build the base query - only fetch open jobs
    let query = supabase
      .from("jobs")
      .select("*", { count: "exact" })
      .eq("status", "open");

    // Apply search filter if provided
    // Search across title, company_name, and location using OR logic
    if (search) {
      const searchPattern = `%${search}%`;
      query = query.or(
        `title.ilike.${searchPattern},company_name.ilike.${searchPattern},location.ilike.${searchPattern}`,
      );
    }

    // Apply job_type filter if not 'all'
    if (searchType && searchType !== "all") {
      query = query.eq("job_type", searchType);
    }

    // Apply sort order
    if (sort === "latest") {
      query = query.order("created_at", { ascending: false });
    } else if (sort === "oldest") {
      query = query.order("created_at", { ascending: true });
    }

    // Calculate pagination range
    const from = (page - 1) * JOBS_PER_PAGE;
    const to = from + JOBS_PER_PAGE - 1;
    query = query.range(from, to);

    // Execute query
    const { data, count, error } = await query;

    if (error) {
      throw error;
    }

    // Map database records to app state shape
    const jobs = data.map(mapJobFromDB);

    // Calculate total pages
    const totalJobs = count || 0;
    const numOfPages = Math.ceil(totalJobs / JOBS_PER_PAGE) || 1;

    return { jobs, totalJobs, numOfPages };
  } catch (error) {
    console.error("Error fetching public jobs:", error);
    return thunkAPI.rejectWithValue(
      error.message || "Failed to load jobs. Please try again.",
    );
  }
};

/**
 * Fetch a single job by ID for the job detail page
 *
 * Requirements implemented:
 *
 * @param {string} jobId - The job ID to fetch
 * @param {Object} thunkAPI - Redux Toolkit thunk API
 * @returns {Object} The job object
 */
export const getJobByIdThunk = async (jobId, thunkAPI) => {
  try {
    const supabase = await loadSupabase();
    // Fetch single job by ID
    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .eq("id", jobId)
      .single();

    if (error) {
      // Handle "not found" case specifically
      if (error.code === "PGRST116") {
        return thunkAPI.rejectWithValue("Job not found");
      }
      throw error;
    }

    if (!data) {
      return thunkAPI.rejectWithValue("Job not found");
    }

    // Map database record to app state shape
    return mapJobFromDB(data);
  } catch (error) {
    console.error("Error fetching job by ID:", error);
    return thunkAPI.rejectWithValue(
      error.message || "Failed to load job details. Please try again.",
    );
  }
};
