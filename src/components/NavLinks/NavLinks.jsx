import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { candidateLinks, employerLinks } from "../../utils/links";

const NavLinks = ({ toggleSidebar, links: linksProp }) => {
  const { user } = useSelector((store) => store.user);

  // Use provided links prop, or determine from user role
  const links =
    linksProp || (user?.role === "employer" ? employerLinks : candidateLinks);

  return (
    <div className="nav-links">
      {links.map((link) => {
        const { text, path, id, icon } = link;
        return (
          <NavLink
            to={path}
            className={({ isActive }) => {
              return isActive ? "nav-link active" : "nav-link";
            }}
            key={id}
            onClick={toggleSidebar}
            end
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};
export default NavLinks;
