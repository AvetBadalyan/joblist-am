/**
 * publicJobsThunk - Async thunks for public job browsing
 * Implementation: Task 3.4
 * Requirements: 1.1, 1.2, 1.3, 1.4, 2.1, 2.2, 2.3, 2.4, 3.1, 3.2
 */

import { mapJobFromDB } from "../../utils/mappers";
import { supabase } from "../../utils/supabase";

// Number of jobs per page for pagination (Requirement 1.3)
const JOBS_PER_PAGE = 10;

// Number of jobs shown in the landing page "Featured Jobs" section
const FEATURED_JOBS_COUNT = 6;

/**
 * Fetch the most recent open jobs for the landing page's Featured section.
 * @returns {Array} up to FEATURED_JOBS_COUNT mapped job objects
 */
export const getFeaturedJobsThunk = async (_, thunkAPI) => {
  try {
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
 * Requirements implemented:
 * - 1.1: Display paginated list of open job listings
 * - 1.2: Display title, company name, location, job type, posting date
 * - 1.3: Pagination controls for more than 10 items
 * - 1.4: Order by created_at descending (newest first)
 * - 2.1: Search filter on title, company_name, location (case-insensitive)
 * - 2.2: Job type filter
 * - 2.3: AND logic for multiple filters
 * - 2.4: Reset pagination when filters change (handled in slice)
 *
 * @param {Object} _ - unused first argument
 * @param {Object} thunkAPI - Redux Toolkit thunk API
 * @returns {Object} { jobs, totalJobs, numOfPages }
 */
export const getAllPublicJobsThunk = async (_, thunkAPI) => {
  try {
    // Get filter state from Redux store
    const { search, searchType, sort, page } = thunkAPI.getState().publicJobs;

    // Build the base query - only fetch open jobs (Requirement 1.1)
    let query = supabase
      .from("jobs")
      .select("*", { count: "exact" })
      .eq("status", "open");

    // Apply search filter if provided (Requirement 2.1)
    // Search across title, company_name, and location using OR logic
    if (search) {
      const searchPattern = `%${search}%`;
      query = query.or(
        `title.ilike.${searchPattern},company_name.ilike.${searchPattern},location.ilike.${searchPattern}`,
      );
    }

    // Apply job_type filter if not 'all' (Requirement 2.2)
    if (searchType && searchType !== "all") {
      query = query.eq("job_type", searchType);
    }

    // Apply sort order (Requirement 1.4)
    if (sort === "latest") {
      query = query.order("created_at", { ascending: false });
    } else if (sort === "oldest") {
      query = query.order("created_at", { ascending: true });
    }

    // Calculate pagination range (Requirement 1.3)
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
 * - 3.1: Navigate to dedicated job detail page
 * - 3.2: Display full job details (title, company_name, location, job_type,
 *        salary_min, salary_max, description, requirements)
 *
 * @param {string} jobId - The job ID to fetch
 * @param {Object} thunkAPI - Redux Toolkit thunk API
 * @returns {Object} The job object
 */
export const getJobByIdThunk = async (jobId, thunkAPI) => {
  try {
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
