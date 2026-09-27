import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Wrapper from "../../assets/wrappers/PublicNav";
import Logo from "../Logo/Logo";

/**
 * PublicNav
 *
 * Persistent header for the public-facing pages (landing, browse, job detail)
 * so visitors and logged-in users always have a way home and to their dashboard.
 *
 * Right-side action is context-aware:
 * - Logged out: Login / Register
 * - Logged in: a single link to the role-appropriate dashboard
 */
const PublicNav = () => {
  const { user } = useSelector((store) => store.user);
  const dashboardPath = user?.role === "employer" ? "/employer" : "/candidate";

  return (
    <Wrapper>
      <div className="nav-center">
        <Link to="/" aria-label="Go to home page">
          <Logo />
        </Link>

        <div className="nav-links">
          <Link to="/jobs" className="nav-link">
            Browse Jobs
          </Link>

          {user ? (
            <Link to={dashboardPath} className="btn nav-btn">
              Dashboard
            </Link>
          ) : (
            <>
              <Link to="/register" className="nav-link">
                Login
              </Link>
              <Link to="/register" className="btn nav-btn">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export default PublicNav;
