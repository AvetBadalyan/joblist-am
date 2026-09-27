import { configureStore } from "@reduxjs/toolkit";
import applicationsSlice from "./features/applications/applicationsSlice";
import employerJobsSlice from "./features/employerJobs/employerJobsSlice";
import jobSlice from "./features/jobSlice/jobSlice";
import publicJobsSlice from "./features/publicJobs/publicJobsSlice";
import savedJobsSlice from "./features/savedJobs/savedJobsSlice";
import userSlice from "./features/user/userSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    job: jobSlice,
    publicJobs: publicJobsSlice,
    applications: applicationsSlice,
    savedJobs: savedJobsSlice,
    employerJobs: employerJobsSlice,
  },
});
