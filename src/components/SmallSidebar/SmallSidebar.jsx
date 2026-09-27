import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Wrapper from "../../assets/wrappers/SmallSidebar";
import { toggleSidebar } from "../../features/user/userSlice";
import { candidateLinks, employerLinks } from "../../utils/links";
import Logo from "./../Logo/Logo";
import NavLinks from "./../NavLinks/NavLinks";

/**
 * Mobile navigation sidebar component
 * Displays role-based navigation links for candidates and employers
 * @see Requirements: 17.2, 17.3, 21.2
 */
const SmallSidebar = () => {
  const { isSidebarOpen, user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  // Select links based on user role: employer → employerLinks, candidate → candidateLinks (default)
  const links = user?.role === "employer" ? employerLinks : candidateLinks;

  const toggle = () => {
    dispatch(toggleSidebar());
  };

  return (
    <Wrapper>
      <div
        className={
          isSidebarOpen ? "sidebar-container show-sidebar" : "sidebar-container"
        }
      >
        <div className="content">
          <button className="close-btn" onClick={toggle}>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <NavLinks toggleSidebar={toggle} links={links} />
        </div>
      </div>
    </Wrapper>
  );
};

export default SmallSidebar;
