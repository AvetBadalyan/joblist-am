import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loading from "../../components/Loading/Loading";

/**
 * ProtectedRoute - Role-based route protection component
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components to render if access is granted
 * @param {Array<'candidate'|'employer'>} [props.allowedRoles] - Roles permitted to access this route.
 *        If omitted, allows any authenticated user.
 *
 * Behavior:
 * 1. If user is not authenticated → redirect to /register
 * 2. If user is authenticated but role not in allowedRoles:
 *    - Candidate trying employer route → redirect to /candidate
 *    - Employer trying candidate route → redirect to /employer
 * 3. If role matches allowedRoles (or allowedRoles is not specified) → render children
 */
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, isLoading, isInitializing } = useSelector(
    (store) => store.user,
  );

  // Wait while the initial Supabase session is resolving or a user fetch is in
  // flight, so an uncached returning user isn't redirected before their profile
  // loads.
  if (isInitializing || isLoading) {
    return <Loading center />;
  }

  // 1. Redirect unauthenticated users to /register
  if (!user) {
    return <Navigate to="/register" replace />;
  }

  // 2. If allowedRoles is specified, check if user's role is permitted
  if (allowedRoles && allowedRoles.length > 0) {
    const userRole = user.role;

    // Check if user's role is in the allowed roles
    if (!allowedRoles.includes(userRole)) {
      // Redirect based on user's actual role
      if (userRole === "candidate") {
        // Candidate trying to access employer routes → redirect to candidate dashboard
        return <Navigate to="/candidate" replace />;
      }
      if (userRole === "employer") {
        // Employer trying to access candidate routes → redirect to employer dashboard
        return <Navigate to="/employer" replace />;
      }
      // Fallback: redirect to the landing page (served at "/") if role is unexpected
      return <Navigate to="/" replace />;
    }
  }

  // 3. User is authenticated and role is allowed (or no role restriction) → render children
  return children;
};

export default ProtectedRoute;
