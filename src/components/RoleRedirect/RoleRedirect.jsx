import { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loading from "../Loading/Loading";

// Lazy-loaded so authenticated users (who redirect away) never download the
// landing page and its section components.
const LandingPage = lazy(() => import("../../Pages/LandingPage/LandingPage"));

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

  // Unauthenticated (or unknown role): public landing page
  return (
    <Suspense fallback={<Loading center />}>
      <LandingPage />
    </Suspense>
  );
};

export default RoleRedirect;
