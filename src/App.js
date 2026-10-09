import { lazy, Suspense, useEffect } from "react";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "./components/Loading/Loading";

// Routing primitives stay eager — they gate every route and are tiny.
import RoleRedirect from "./components/RoleRedirect/RoleRedirect";
import ProtectedRoute from "./Pages/ProtectedRoute/ProtectedRoute";

// Route pages are code-split so each area loads on demand, keeping the
// initial bundle small. React.lazy + Suspense handles the loading fallback.
const ErrorPage = lazy(() => import("./Pages/ErrorPage/ErrorPage"));
const ForgotPassword = lazy(
  () => import("./Pages/ForgotPassword/ForgotPassword"),
);
const RegisterPage = lazy(() => import("./Pages/RegisterPage/RegisterPage"));
const ResetPassword = lazy(() => import("./Pages/ResetPassword/ResetPassword"));
const BrowseJobs = lazy(() => import("./Pages/BrowseJobs/BrowseJobs"));
const JobDetail = lazy(() => import("./Pages/JobDetail/JobDetail"));
const CandidateDashboard = lazy(
  () => import("./Pages/Candidate/CandidateDashboard/CandidateDashboard"),
);
const CandidateLayout = lazy(
  () => import("./Pages/Candidate/CandidateLayout/CandidateLayout"),
);
const CandidateProfile = lazy(
  () => import("./Pages/Candidate/CandidateProfile/CandidateProfile"),
);
const MyApplications = lazy(
  () => import("./Pages/Candidate/MyApplications/MyApplications"),
);
const SavedJobs = lazy(() => import("./Pages/Candidate/SavedJobs/SavedJobs"));
const EditJob = lazy(() => import("./Pages/Employer/EditJob/EditJob"));
const EmployerDashboard = lazy(
  () => import("./Pages/Employer/EmployerDashboard/EmployerDashboard"),
);
const EmployerLayout = lazy(
  () => import("./Pages/Employer/EmployerLayout/EmployerLayout"),
);
const EmployerProfile = lazy(
  () => import("./Pages/Employer/EmployerProfile/EmployerProfile"),
);
const PostJob = lazy(() => import("./Pages/Employer/PostJob/PostJob"));
const ViewApplicants = lazy(
  () => import("./Pages/Employer/ViewApplicants/ViewApplicants"),
);

function App() {
  useEffect(() => {
    let cancelled = false;
    let subscription;

    import("./utils/authListener")
      .then(({ setupAuthListener }) => {
        const nextSubscription = setupAuthListener();
        if (cancelled) {
          nextSubscription.unsubscribe();
          return;
        }
        subscription = nextSubscription;
      })
      .catch((error) => {
        console.error("Failed to initialize the auth listener:", error);
      });

    return () => {
      cancelled = true;
      subscription?.unsubscribe();
    };
  }, []);

  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Suspense fallback={<Loading center />}>
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
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
