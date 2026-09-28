import { useEffect, useState } from "react";
import { FaBars, FaCaretDown, FaTimes, FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Wrapper from "../../assets/wrappers/PublicNav";
import { clearStore } from "../../features/user/userSlice";
import { candidateLinks, employerLinks } from "../../utils/links";
import Logo from "../Logo/Logo";

/**
 * AppHeader (PublicNav)
 *
 * The single top navigation used on every page — public and authenticated —
 * so the layout never shifts between browsing and the dashboard.
 *
 * - Logged out: Browse Jobs + Login / Register
 * - Logged in: role-based links (Dashboard, Browse Jobs, etc.) + a user menu
 *
 * On narrow screens the links collapse behind a hamburger, backed by a scrim
 * that closes the menu on tap or Escape.
 */
const PublicNav = () => {
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const links = user?.role === "employer" ? employerLinks : candidateLinks;

  const closeMenu = () => {
    setIsOpen(false);
    setShowMenu(false);
  };

  const handleLogout = () => {
    closeMenu();
    dispatch(clearStore("Logging out...")).then(() => navigate("/"));
  };

  // Close the mobile menu on Escape for keyboard users
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
          {user ? (
            <>
              {links.map(({ id, text, path }) => (
                <NavLink
                  key={id}
                  to={path}
                  end
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                  onClick={closeMenu}
                >
                  {text}
                </NavLink>
              ))}

              {/* User menu (logout) */}
              <div className="user-menu">
                <button
                  type="button"
                  className="btn nav-btn user-btn"
                  aria-haspopup="true"
                  aria-expanded={showMenu}
                  onClick={() => setShowMenu((open) => !open)}
                >
                  <FaUserCircle />
                  <span className="user-name">{user.name}</span>
                  <FaCaretDown />
                </button>
                <div className={`dropdown ${showMenu ? "show" : ""}`}>
                  <button
                    type="button"
                    className="dropdown-btn"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <Link to="/jobs" className="nav-link" onClick={closeMenu}>
                Browse Jobs
              </Link>
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
