import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  getAllPublicJobsThunk,
  getFeaturedJobsThunk,
  getJobByIdThunk,
} from "./publicJobsThunk";

/**
 * publicJobsSlice manages public job browsing state
 * Used by: BrowseJobs page, JobDetail page
 * Requirements: 1.1, 2.1, 3.1
 */

const initialFiltersState = {
  search: "",
  searchType: "all", // job_type filter: all, full-time, part-time, remote, internship
  sort: "latest",
  sortOptions: ["latest", "oldest"],
};

const initialState = {
  isLoading: false,
  isError: false,
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  // Filters
  ...initialFiltersState,
  // Single job detail
  currentJob: null,
  currentJobLoading: false,
  // Landing page "Featured Jobs" section
  featuredJobs: [],
  featuredLoading: false,
  featuredError: null,
};

// Async thunks - implementation in publicJobsThunk.js
export const getAllPublicJobs = createAsyncThunk(
  "publicJobs/getAllPublicJobs",
  getAllPublicJobsThunk,
);

export const getJobById = createAsyncThunk(
  "publicJobs/getJobById",
  getJobByIdThunk,
);

export const getFeaturedJobs = createAsyncThunk(
  "publicJobs/getFeaturedJobs",
  getFeaturedJobsThunk,
);

const publicJobsSlice = createSlice({
  name: "publicJobs",
  initialState,
  reducers: {
    showLoading: (state) => {
      state.isLoading = true;
    },
    hideLoading: (state) => {
      state.isLoading = false;
    },
    /**
     * Handle filter/search input changes
     * Resets pagination to page 1 when filters change (Requirement 2.4)
     */
    handleChange: (state, { payload: { name, value } }) => {
      state.page = 1;
      state[name] = value;
    },
    /**
     * Set current page for pagination
     */
    setPage: (state, { payload }) => {
      state.page = payload;
    },
    /**
     * Clear all filters back to default state (Requirement 2.5)
     */
    clearFilters: (state) => {
      return { ...state, ...initialFiltersState, page: 1 };
    },
    /**
     * Clear current job detail (when leaving job detail page)
     */
    clearCurrentJob: (state) => {
      state.currentJob = null;
      state.currentJobLoading = false;
    },
    /**
     * Set current job directly (useful for optimistic updates)
     */
    setCurrentJob: (state, { payload }) => {
      state.currentJob = payload;
    },
    /**
     * Clear all public jobs state (used when logging out or resetting)
     */
    clearPublicJobsState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // getAllPublicJobs cases
      .addCase(getAllPublicJobs.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getAllPublicJobs.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isError = false;
        state.jobs = payload.jobs;
        state.totalJobs = payload.totalJobs;
        state.numOfPages = payload.numOfPages;
      })
      .addCase(getAllPublicJobs.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        toast.error(payload || "Failed to load jobs. Please try again.");
      })
      // getJobById cases
      .addCase(getJobById.pending, (state) => {
        state.currentJobLoading = true;
      })
      .addCase(getJobById.fulfilled, (state, { payload }) => {
        state.currentJobLoading = false;
        state.currentJob = payload;
      })
      .addCase(getJobById.rejected, (state, { payload }) => {
        state.currentJobLoading = false;
        state.currentJob = null;
        toast.error(payload || "Failed to load job details. Please try again.");
      })
      // getFeaturedJobs cases (landing page; errors shown inline, no toast)
      .addCase(getFeaturedJobs.pending, (state) => {
        state.featuredLoading = true;
        state.featuredError = null;
      })
      .addCase(getFeaturedJobs.fulfilled, (state, { payload }) => {
        state.featuredLoading = false;
        state.featuredJobs = payload;
      })
      .addCase(getFeaturedJobs.rejected, (state, { payload }) => {
        state.featuredLoading = false;
        state.featuredError = payload || "Failed to load featured jobs.";
      });
  },
});

export const {
  showLoading,
  hideLoading,
  handleChange,
  setPage,
  clearFilters,
  clearCurrentJob,
  setCurrentJob,
  clearPublicJobsState,
} = publicJobsSlice.actions;

export default publicJobsSlice.reducer;
