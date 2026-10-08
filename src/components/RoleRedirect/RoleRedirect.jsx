import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import LandingPage from "../../Pages/LandingPage/LandingPage";

/**
 * RoleRedirect (root route "/")
 *
 * - Unauthenticated users: show the public landing page (served at "/")
 * - Authenticated candidates: redirect to /candidate
 * - Authenticated employers: redirect to /employer
 */
const RoleRedirect = () => {
  const { user } = useSelector((store) => store.user);

  if (user?.role === "candidate") {
    return <Navigate to="/candidate" replace />;
  }

  if (user?.role === "employer") {
    return <Navigate to="/employer" replace />;
  }

  return <LandingPage />;
};

export default RoleRedirect;