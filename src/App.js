import LandingPage from "./Pages/LandingPage/LandingPage";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";
import ErrorPage from "./Pages/ErrorPage/ErrorPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SharedLayout from "./Pages/Dashboard/SharedLayout/SharedLayout";
import Stats from "./Pages/Dashboard/Stats/Stats";
import AllJobs from "./Pages/Dashboard/AllJobs/AllJobs";
import Profile from "./Pages/Dashboard/Profile/Profile";
import AddJob from "./Pages/Dashboard/AddJob/AddJob";
import ProtectedRoute from "./Pages/ProtectedRoute/ProtectedRoute";

function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <SharedLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Stats />} />
            <Route path="all-jobs" element={<AllJobs />} />
            <Route path="add-job" element={<AddJob />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route path="landing" element={<LandingPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
