import { useEffect } from "react";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorPage from "./Pages/ErrorPage/ErrorPage";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";
import ProtectedRoute from "./Pages/ProtectedRoute/ProtectedRoute";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";
import ResetPassword from "./Pages/ResetPassword/ResetPassword";
import { setupAuthListener } from "./utils/authListener";
// Public pages
import BrowseJobs from "./Pages/BrowseJobs/BrowseJobs";
import JobDetail from "./Pages/JobDetail/JobDetail";
// Candidate imports
import CandidateDashboard from "./Pages/Candidate/CandidateDashboard/CandidateDashboard";
import CandidateLayout from "./Pages/Candidate/CandidateLayout/CandidateLayout";
import CandidateProfile from "./Pages/Candidate/CandidateProfile/CandidateProfile";
import MyApplications from "./Pages/Candidate/MyApplications/MyApplications";
import SavedJobs from "./Pages/Candidate/SavedJobs/SavedJobs";
// Employer imports
import EditJob from "./Pages/Employer/EditJob/EditJob";
import EmployerDashboard from "./Pages/Employer/EmployerDashboard/EmployerDashboard";
import EmployerLayout from "./Pages/Employer/EmployerLayout/EmployerLayout";
import EmployerProfile from "./Pages/Employer/EmployerProfile/EmployerProfile";
import PostJob from "./Pages/Employer/PostJob/PostJob";
import ViewApplicants from "./Pages/Employer/ViewApplicants/ViewApplicants";
// Role-based redirect
import RoleRedirect from "./components/RoleRedirect/RoleRedirect";

function App() {
  useEffect(() => {
    const subscription = setupAuthListener();
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          {/* Legacy path — the landing page now lives at "/" */}
          <Route path="/landing" element={<Navigate to="/" replace />} />
          <Route path="/jobs" element={<BrowseJobs />} />
          <Route path="/jobs/:jobId" element={<JobDetail />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Candidate Routes */}
          <Route
            path="/candidate"
            element={
              <ProtectedRoute allowedRoles={["candidate"]}>
                <CandidateLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<CandidateDashboard />} />
            <Route path="applications" element={<MyApplications />} />
            <Route path="saved" element={<SavedJobs />} />
            <Route path="profile" element={<CandidateProfile />} />
          </Route>

          {/* Employer Routes */}
          <Route
            path="/employer"
            element={
              <ProtectedRoute allowedRoles={["employer"]}>
                <EmployerLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<EmployerDashboard />} />
            <Route path="post-job" element={<PostJob />} />
            <Route path="edit-job/:id" element={<EditJob />} />
            <Route path="jobs/:id/applicants" element={<ViewApplicants />} />
            <Route path="profile" element={<EmployerProfile />} />
          </Route>

          {/* Root path - Role-based redirect */}
          <Route path="/" element={<RoleRedirect />} />

          {/* 404 Error Page */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
