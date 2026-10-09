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
  currentRequestId: undefined,
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
    /**
     * Handle filter/search input changes — resets pagination to page 1.
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
    clearFilters: (state) => {
      return { ...state, ...initialFiltersState, page: 1 };
    },
    clearCurrentJob: (state) => {
      state.currentJob = null;
      state.currentJobLoading = false;
    },
    clearPublicJobsState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // getAllPublicJobs cases
      .addCase(getAllPublicJobs.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.currentRequestId = action.meta.requestId;
      })
      .addCase(getAllPublicJobs.fulfilled, (state, action) => {
        if (state.currentRequestId !== action.meta.requestId) return;
        state.isLoading = false;
        state.isError = false;
        state.currentRequestId = undefined;
        state.jobs = action.payload.jobs;
        state.totalJobs = action.payload.totalJobs;
        state.numOfPages = action.payload.numOfPages;
      })
      .addCase(getAllPublicJobs.rejected, (state, action) => {
        if (state.currentRequestId !== action.meta.requestId) return;
        state.isLoading = false;
        state.currentRequestId = undefined;
        if (action.meta.aborted) return;
        state.isError = true;
        toast.error(
          action.payload || "Failed to load jobs. Please try again.",
        );
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
  handleChange,
  setPage,
  clearFilters,
  clearCurrentJob,
  clearPublicJobsState,
} = publicJobsSlice.actions;

export default publicJobsSlice.reducer;
