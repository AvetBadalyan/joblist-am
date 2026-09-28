import { useState } from "react";
import { FaAlignLeft, FaCaretDown, FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Wrapper from "../../assets/wrappers/Navbar";
import { clearStore, toggleSidebar } from "../../features/user/userSlice";
import Logo from "../Logo/Logo";

/**
 * Navbar Component
 * Updated for role-based display and unauthenticated state handling
 *
 * Requirements implemented:
 * - 17.2: Proper link paths for candidates
 * - 17.3: Proper link paths for employers
 * - Handle unauthenticated state (show login/register)
 */
const Navbar = () => {
  const [showLogout, setShowLogout] = useState(false);
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggle = () => {
    dispatch(toggleSidebar());
  };

  const handleLogout = () => {
    dispatch(clearStore("Logging out...")).then(() => {
      // Redirect to the landing page (served at "/") after logout completes
      navigate("/");
    });
  };

  /**
   * Get the dashboard text based on user role
   * - employer: "employer dashboard"
   * - candidate: "candidate dashboard"
   * - unauthenticated: "dashboard"
   */
  const getDashboardText = () => {
    if (!user) return "dashboard";
    if (user.role === "employer") return "employer dashboard";
    return "candidate dashboard";
  };

  return (
    <Wrapper>
      <div className="nav-center">
        {/* Toggle button - only show for authenticated users (sidebars are for authenticated users) */}
        {user && (
          <button
            type="button"
            className="toggle-btn"
            onClick={toggle}
            aria-label="Toggle navigation sidebar"
          >
            <FaAlignLeft />
          </button>
        )}
        <div>
          <Logo />
          <h3 className="logo-text">{getDashboardText()}</h3>
        </div>

        {/* Authenticated user: show user dropdown with logout */}
        {user ? (
          <div className="btn-container">
            <button
              type="button"
              className="btn"
              onClick={() => setShowLogout(!showLogout)}
            >
              <FaUserCircle />
              {user.name}
              <FaCaretDown />
            </button>
            <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
              <button
                type="button"
                className="dropdown-btn"
                onClick={handleLogout}
              >
                logout
              </button>
            </div>
          </div>
        ) : (
          /* Unauthenticated: show Login/Register buttons */
          <div className="auth-buttons">
            <Link to="/register?mode=login" className="btn btn-outline">
              Login
            </Link>
            <Link to="/register" className="btn">
              Register
            </Link>
          </div>
        )}
      </div>
    </Wrapper>
  );
};
export default Navbar;
