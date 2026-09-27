import { useSelector } from "react-redux";
import Wrapper from "../../assets/wrappers/BigSidebar";
import { candidateLinks, employerLinks } from "../../utils/links";
import Logo from "../Logo/Logo";
import NavLinks from "../NavLinks/NavLinks";

/**
 * BigSidebar component - Desktop sidebar navigation
 * Displays role-based navigation links based on user.role
 * @see Requirements: 17.2, 17.3
 */
const BigSidebar = () => {
  const { isSidebarOpen, user } = useSelector((store) => store.user);

  // Select links based on user role: employer gets employerLinks, others get candidateLinks
  const links = user?.role === "employer" ? employerLinks : candidateLinks;

  return (
    <Wrapper>
      <div
        className={
          isSidebarOpen
            ? "sidebar-container "
            : "sidebar-container show-sidebar"
        }
      >
        <div className="content">
          <header>
            <Logo />
          </header>
          <NavLinks links={links} />
        </div>
      </div>
    </Wrapper>
  );
};
export default BigSidebar;
