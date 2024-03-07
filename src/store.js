import { configureStore } from "@reduxjs/toolkit";
import jobSlice from "./features/jobSlice/jobSlice";
import userSlice from "./features/user/userSlice";
import allJobsSlice from "./features/allJobs/allJobsSlice";
export const store = configureStore({
  reducer: {
    user: userSlice,
    job: jobSlice,
    allJobs: allJobsSlice,
  },
});
