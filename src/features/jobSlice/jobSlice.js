import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getUserFromLocalStorage } from "../../utils/localStorage";
import { createJobThunk, deleteJobThunk, editJobThunk } from "./jobThunk";

/**
 * jobSlice - Manages employer job posting and editing form state
 *
 * This slice handles the form state for creating and editing job listings.
 * It is used by employers to post new jobs and modify existing ones.
 *
 * Requirements: 10.1, 10.2, 10.3, 12.1, 12.2
 */
const initialState = {
  isLoading: false,
  // Form fields for posting/editing
  title: "",
  location: "",
  job_type: "full-time",
  job_type_options: ["full-time", "part-time", "remote", "internship"],
  salary_min: "",
  salary_max: "",
  description: "",
  requirements: "",
  status: "open",
  status_options: ["open", "closed"],
  // Edit mode
  isEditing: false,
  editJobId: "",
};

export const createJob = createAsyncThunk("job/createJob", createJobThunk);

export const deleteJob = createAsyncThunk("job/deleteJob", deleteJobThunk);

export const editJob = createAsyncThunk("job/editJob", editJobThunk);

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    /**
     * Handles form field changes
     * @param {string} name - The field name to update
     * @param {any} value - The new value for the field
     */
    handleChange: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
    /**
     * Clears all form values and resets to initial state
     * Sets default location from user profile if available
     */
    clearValues: () => {
      return {
        ...initialState,
        location: getUserFromLocalStorage()?.location || "",
      };
    },
    /**
     * Populates form with existing job data for editing
     * @param {Object} payload - The job data to edit
     */
    setEditJob: (state, { payload }) => {
      return {
        ...state,
        isEditing: true,
        editJobId: payload.id,
        title: payload.title || "",
        location: payload.location || "",
        job_type: payload.job_type || "full-time",
        salary_min: payload.salary_min ?? "",
        salary_max: payload.salary_max ?? "",
        description: payload.description || "",
        requirements: payload.requirements || "",
        status: payload.status || "open",
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // Create job handlers
      .addCase(createJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createJob.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("Job posted successfully");
      })
      .addCase(createJob.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      // Delete job handlers
      .addCase(deleteJob.fulfilled, (state, { payload }) => {
        toast.success(payload);
      })
      .addCase(deleteJob.rejected, (state, { payload }) => {
        toast.error(payload);
      })
      // Edit job handlers
      .addCase(editJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editJob.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("Job updated successfully");
      })
      .addCase(editJob.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  },
});

export const { handleChange, clearValues, setEditJob } = jobSlice.actions;

export default jobSlice.reducer;
