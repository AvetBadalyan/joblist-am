import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  getSavedJobIdsThunk,
  getSavedJobsThunk,
  saveJobThunk,
  unsaveJobThunk,
} from "./savedJobsThunk";

/**
 * savedJobsSlice - Manages candidate's saved/bookmarked jobs
 *
 * State shape:
 * - isLoading: boolean for async operations
 * - savedJobs: array of saved job objects with joined job data
 * - savedJobIds: array of job IDs for quick lookup (bookmark UI)
 *
 */

const initialState = {
  isLoading: false,
  isError: false,
  savedJobs: [],
  // Quick lookup for bookmark UI
  savedJobIds: [],
};

// Async thunks
export const getSavedJobs = createAsyncThunk(
  "savedJobs/getSavedJobs",
  getSavedJobsThunk,
);

export const saveJob = createAsyncThunk("savedJobs/saveJob", saveJobThunk);

export const unsaveJob = createAsyncThunk(
  "savedJobs/unsaveJob",
  unsaveJobThunk,
);

export const getSavedJobIds = createAsyncThunk(
  "savedJobs/getSavedJobIds",
  getSavedJobIdsThunk,
);

const savedJobsSlice = createSlice({
  name: "savedJobs",
  initialState,
  reducers: {
    /**
     * Clear all saved jobs state - used on logout
     */
    clearSavedJobsState: () => initialState,

    /**
     * Optimistic UI update when saving a job
     * Immediately adds jobId to savedJobIds for instant bookmark feedback
     * @param {string} payload - The job ID to add
     */
    optimisticSave: (state, { payload: jobId }) => {
      if (!state.savedJobIds.includes(jobId)) {
        state.savedJobIds.push(jobId);
      }
    },

    /**
     * Optimistic UI update when unsaving a job
     * Immediately removes jobId from savedJobIds for instant bookmark feedback
     * @param {string} payload - The job ID to remove
     */
    optimisticUnsave: (state, { payload: jobId }) => {
      state.savedJobIds = state.savedJobIds.filter((id) => id !== jobId);
      // Also remove from savedJobs array if present
      state.savedJobs = state.savedJobs.filter(
        (saved) => saved.job_id !== jobId,
      );
    },
  },
  extraReducers: (builder) => {
    builder
      // getSavedJobs
      .addCase(getSavedJobs.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getSavedJobs.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isError = false;
        state.savedJobs = payload.savedJobs;
        // Sync savedJobIds with fetched data
        state.savedJobIds = payload.savedJobs.map((saved) => saved.job_id);
      })
      .addCase(getSavedJobs.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        toast.error(payload);
      })
      // saveJob
      .addCase(saveJob.pending, (state) => {
        // Don't set isLoading to avoid UI flicker - optimistic update handles UI
      })
      .addCase(saveJob.fulfilled, (state, { payload }) => {
        // Add to savedJobIds if not already present (backup in case optimistic update missed)
        if (!state.savedJobIds.includes(payload.jobId)) {
          state.savedJobIds.push(payload.jobId);
        }
        // Add to savedJobs array if full job data is returned
        if (payload.savedJob) {
          state.savedJobs.push(payload.savedJob);
        }
        toast.success("Job saved");
      })
      .addCase(saveJob.rejected, (state, { payload, meta }) => {
        // Revert optimistic update on failure
        const jobId = meta.arg;
        state.savedJobIds = state.savedJobIds.filter((id) => id !== jobId);
        toast.error(payload || "Failed to save job");
      })
      // unsaveJob
      .addCase(unsaveJob.pending, (state) => {
        // Don't set isLoading to avoid UI flicker - optimistic update handles UI
      })
      .addCase(unsaveJob.fulfilled, (state, { payload }) => {
        // Ensure job is removed (backup in case optimistic update missed)
        state.savedJobIds = state.savedJobIds.filter(
          (id) => id !== payload.jobId,
        );
        state.savedJobs = state.savedJobs.filter(
          (saved) => saved.job_id !== payload.jobId,
        );
        toast.success("Job removed from saved");
      })
      .addCase(unsaveJob.rejected, (state, { payload, meta }) => {
        // Revert optimistic update on failure - add back the jobId
        const jobId = meta.arg;
        if (!state.savedJobIds.includes(jobId)) {
          state.savedJobIds.push(jobId);
        }
        toast.error(payload || "Failed to remove saved job");
      })
      // getSavedJobIds
      .addCase(getSavedJobIds.pending, (state) => {
        // Light operation, no loading state needed
      })
      .addCase(getSavedJobIds.fulfilled, (state, { payload }) => {
        state.savedJobIds = payload.savedJobIds;
      })
      .addCase(getSavedJobIds.rejected, (state, { payload }) => {
        // Silent failure for initial load - don't show toast
        console.error("Failed to fetch saved job IDs:", payload);
      });
  },
});

export const { clearSavedJobsState, optimisticSave, optimisticUnsave } =
  savedJobsSlice.actions;

export default savedJobsSlice.reducer;
