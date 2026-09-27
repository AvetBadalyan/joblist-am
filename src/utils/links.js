import { BsBookmark } from "react-icons/bs";
import { FaPlus, FaRegFileAlt } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { IoBarChartSharp } from "react-icons/io5";
import { MdWorkOutline } from "react-icons/md";

/**
 * Navigation links for candidates
 * @see Requirements: 17.2, 17.3
 */
export const candidateLinks = [
  { id: 1, text: "Dashboard", path: "/candidate", icon: <IoBarChartSharp /> },
  { id: 2, text: "Browse Jobs", path: "/jobs", icon: <MdWorkOutline /> },
  {
    id: 3,
    text: "My Applications",
    path: "/candidate/applications",
    icon: <FaRegFileAlt />,
  },
  { id: 4, text: "Saved Jobs", path: "/candidate/saved", icon: <BsBookmark /> },
  { id: 5, text: "Profile", path: "/candidate/profile", icon: <ImProfile /> },
];

/**
 * Navigation links for employers
 * @see Requirements: 17.2, 17.3
 */
export const employerLinks = [
  { id: 1, text: "Dashboard", path: "/employer", icon: <IoBarChartSharp /> },
  { id: 2, text: "Post Job", path: "/employer/post-job", icon: <FaPlus /> },
  { id: 3, text: "Browse Jobs", path: "/jobs", icon: <MdWorkOutline /> },
  { id: 4, text: "Profile", path: "/employer/profile", icon: <ImProfile /> },
];

// Default export for backward compatibility
export default candidateLinks;
