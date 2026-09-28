import { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
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
 *
 * On narrow screens the links collapse behind a hamburger toggle, backed by a
 * scrim that dims the page and closes the menu on tap or Escape.
 */
const PublicNav = () => {
  const { user } = useSelector((store) => store.user);
  const [isOpen, setIsOpen] = useState(false);
  const dashboardPath = user?.role === "employer" ? "/employer" : "/candidate";

  const closeMenu = () => setIsOpen(false);

  // Close on Escape for keyboard users
  useEffect(() => {
    if (!isOpen) return undefined;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  return (
    <Wrapper>
      <div className="nav-center">
        <Link to="/" aria-label="Go to home page" onClick={closeMenu}>
          <Logo />
        </Link>

        <button
          type="button"
          className="menu-toggle"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        <div className={`nav-links ${isOpen ? "open" : ""}`}>
          <Link to="/jobs" className="nav-link" onClick={closeMenu}>
            Browse Jobs
          </Link>

          {user ? (
            <Link
              to={dashboardPath}
              className="btn nav-btn"
              onClick={closeMenu}
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link to="/register" className="nav-link" onClick={closeMenu}>
                Login
              </Link>
              <Link to="/register" className="btn nav-btn" onClick={closeMenu}>
                Register
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Backdrop scrim (mobile only): dims the page and closes on tap */}
      {isOpen && (
        <button
          type="button"
          className="nav-scrim"
          aria-label="Close menu"
          onClick={closeMenu}
        />
      )}
    </Wrapper>
  );
};

export default PublicNav;
