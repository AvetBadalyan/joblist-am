import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  getEmployerJobsThunk,
  getJobApplicantsThunk,
  updateApplicationStatusThunk,
} from "./employerJobsThunk";

const initialState = {
  isLoading: false,
  isError: false,
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  // Applicants for a specific job
  currentJobApplicants: [],
  applicantsLoading: false,
};

// Async thunks for employer job management
export const getEmployerJobs = createAsyncThunk(
  "employerJobs/getEmployerJobs",
  getEmployerJobsThunk,
);

export const getJobApplicants = createAsyncThunk(
  "employerJobs/getJobApplicants",
  getJobApplicantsThunk,
);

export const updateApplicationStatus = createAsyncThunk(
  "employerJobs/updateApplicationStatus",
  updateApplicationStatusThunk,
);

const employerJobsSlice = createSlice({
  name: "employerJobs",
  initialState,
  reducers: {
    setPage: (state, { payload }) => {
      state.page = payload;
    },
    clearApplicants: (state) => {
      state.currentJobApplicants = [];
      state.applicantsLoading = false;
    },
    clearEmployerJobsState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // getEmployerJobs cases
      .addCase(getEmployerJobs.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getEmployerJobs.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isError = false;
        state.jobs = payload.jobs;
        state.totalJobs = payload.totalJobs;
        state.numOfPages = payload.numOfPages;
      })
      .addCase(getEmployerJobs.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        toast.error(payload || "Failed to load job listings");
      })
      // getJobApplicants cases
      .addCase(getJobApplicants.pending, (state) => {
        state.applicantsLoading = true;
      })
      .addCase(getJobApplicants.fulfilled, (state, { payload }) => {
        state.applicantsLoading = false;
        state.currentJobApplicants = payload.applicants;
      })
      .addCase(getJobApplicants.rejected, (state, { payload }) => {
        state.applicantsLoading = false;
        toast.error(payload || "Failed to load applicants");
      })
      // updateApplicationStatus cases
      .addCase(updateApplicationStatus.pending, (state) => {
        // No loading state change - keep UI responsive
      })
      .addCase(updateApplicationStatus.fulfilled, (state, { payload }) => {
        // Update the application status in currentJobApplicants
        const { applicationId, status } = payload;
        const application = state.currentJobApplicants.find(
          (app) => app.id === applicationId,
        );
        if (application) {
          application.status = status;
          application.updated_at = new Date().toISOString();
        }
        toast.success("Application status updated");
      })
      .addCase(updateApplicationStatus.rejected, (state, { payload }) => {
        toast.error(payload || "Failed to update application status");
      });
  },
});

export const { setPage, clearApplicants, clearEmployerJobsState } =
  employerJobsSlice.actions;

export default employerJobsSlice.reducer;
