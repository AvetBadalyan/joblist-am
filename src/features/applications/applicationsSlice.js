import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  submitApplicationThunk,
  getMyApplicationsThunk,
  checkAppliedJobsThunk,
} from "./applicationsThunk";

/**
 * applicationsSlice - Manages candidate job applications
 *
 * Requirements: 6.1, 7.1
 * - Tracks all applications for the candidate
 * - Manages submission state for new applications
 * - Tracks which jobs the user has already applied to (for UI state)
 */

const initialState = {
  isLoading: false,
  applications: [],
  totalApplications: 0,
  // Application submission
  isSubmitting: false,
  // Track which jobs user has applied to (for UI)
  appliedJobIds: [],
};

// Async thunks for application operations
export const submitApplication = createAsyncThunk(
  "applications/submitApplication",
  submitApplicationThunk
);

export const getMyApplications = createAsyncThunk(
  "applications/getMyApplications",
  getMyApplicationsThunk
);

export const checkAppliedJobs = createAsyncThunk(
  "applications/checkAppliedJobs",
  checkAppliedJobsThunk
);

const applicationsSlice = createSlice({
  name: "applications",
  initialState,
  reducers: {
    /**
     * Clears all application state - used on logout or when switching users
     */
    clearApplicationsState: () => initialState,

    /**
     * Adds a job ID to the list of applied jobs (for optimistic UI updates)
     * Used when a user successfully submits an application
     */
    addAppliedJobId: (state, { payload }) => {
      if (!state.appliedJobIds.includes(payload)) {
        state.appliedJobIds.push(payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Submit Application
      .addCase(submitApplication.pending, (state) => {
        state.isSubmitting = true;
      })
      .addCase(submitApplication.fulfilled, (state, { payload }) => {
        state.isSubmitting = false;
        // Add the new application to the list
        state.applications.unshift(payload.application);
        state.totalApplications += 1;
        // Track that user has applied to this job
        if (!state.appliedJobIds.includes(payload.application.job_id)) {
          state.appliedJobIds.push(payload.application.job_id);
        }
        toast.success("Application submitted successfully!");
      })
      .addCase(submitApplication.rejected, (state, { payload }) => {
        state.isSubmitting = false;
        toast.error(payload);
      })

      // Get My Applications
      .addCase(getMyApplications.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMyApplications.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.applications = payload.applications;
        state.totalApplications = payload.totalApplications;
        // Update appliedJobIds from fetched applications
        state.appliedJobIds = payload.applications.map((app) => app.job_id);
      })
      .addCase(getMyApplications.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })

      // Check Applied Jobs (for initializing applied state on page load)
      .addCase(checkAppliedJobs.pending, (state) => {
        // Silent loading - don't show global loading state
      })
      .addCase(checkAppliedJobs.fulfilled, (state, { payload }) => {
        state.appliedJobIds = payload.appliedJobIds;
      })
      .addCase(checkAppliedJobs.rejected, (state, { payload }) => {
        // Silent failure - don't interrupt user experience
        console.error("Failed to check applied jobs:", payload);
      });
  },
});

export const { clearApplicationsState, addAppliedJobId } =
  applicationsSlice.actions;

export default applicationsSlice.reducer;
