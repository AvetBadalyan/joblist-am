import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

/**
 * RoleRedirect Component
 *
 * Redirects users to appropriate pages based on their authentication status and role.
 *
 * Requirements implemented:
 * - 5.2: Redirect candidates to /candidate dashboard, employers to /employer dashboard
 *
 * Behavior:
 * - Unauthenticated users → /landing
 * - Authenticated candidates → /candidate
 * - Authenticated employers → /employer
 */
const RoleRedirect = () => {
  const { user } = useSelector((store) => store.user);

  // If user is not authenticated, redirect to landing page
  if (!user) {
    return <Navigate to="/landing" replace />;
  }

  // Redirect based on user role
  if (user.role === "candidate") {
    return <Navigate to="/candidate" replace />;
  }

  if (user.role === "employer") {
    return <Navigate to="/employer" replace />;
  }

  // Fallback to landing if role is somehow undefined
  return <Navigate to="/landing" replace />;
};

export default RoleRedirect;
