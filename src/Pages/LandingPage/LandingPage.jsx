import { FaBriefcase, FaRocket, FaUsers } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import FeaturedJobs from "../../components/FeaturedJobs/FeaturedJobs";
import Logo from "../../components/Logo/Logo";
import mainImage from "./../../assets/images/main.jpg";
import Wrapper from "./../../assets/wrappers/LandingPage";

/**
 * LandingPage Component
 * Updated hero section explaining the two-sided marketplace concept
 *
 * Requirements implemented:
 * - 18.1: Display hero section explaining the two-sided marketplace concept
 * - 18.2: Display featured Job_Listings (up to 6 most recent open jobs)
 * - 18.3: Provide call-to-action buttons: "Browse Jobs" and "Post a Job"
 * - 18.4: When "Browse Jobs" is clicked, navigate to the public job browse page
 * - 18.5: When "Post a Job" is clicked and user is not authenticated, navigate to registration page
 * - 18.6: When "Post a Job" is clicked and user is an authenticated Employer, navigate to post job page
 */

// Features showcasing the marketplace concept
const features = [
  {
    icon: <FaBriefcase />,
    title: "For Job Seekers",
    description:
      "Browse thousands of job listings, apply with a single click, and track your applications in one place.",
  },
  {
    icon: <FaUsers />,
    title: "For Employers",
    description:
      "Post job openings, review qualified candidates, and manage your hiring pipeline effortlessly.",
  },
  {
    icon: <FaRocket />,
    title: "Fast & Easy",
    description:
      "Simple registration, intuitive interface, and powerful search to connect talent with opportunity.",
  },
];

const LandingPage = () => {
  const { user } = useSelector((store) => store.user);

  /**
   * Determine the "Post a Job" button destination
   * - Unauthenticated users: /register
   * - Authenticated employers: /employer/post-job
   * - Authenticated candidates: /register (candidates can't post jobs)
   */
  const getPostJobLink = () => {
    if (!user) {
      return "/register";
    }
    if (user.role === "employer") {
      return "/employer/post-job";
    }
    // Candidates trying to post: redirect to register (they'd need employer account)
    return "/register";
  };

  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        {/* Hero section - marketplace concept */}
        <div className="info">
          <h1>
            Connect <span>Talent</span> with Opportunity
          </h1>
          <p>
            Your two-sided job marketplace connecting skilled professionals with
            top employers. Whether you're looking for your dream job or
            searching for the perfect candidate, we make it simple.
          </p>
          <div className="cta-buttons">
            <Link to="/jobs" className="btn btn-hero">
              Browse Jobs
            </Link>
            <Link to={getPostJobLink()} className="btn btn-hero btn-secondary">
              Post a Job
            </Link>
          </div>
        </div>
        <img src={mainImage} alt="job marketplace" className="img main-img" />
      </div>

      {/* Featured Jobs section */}
      <FeaturedJobs showBookmark={false} />

      {/* Features section */}
      <div className="features">
        <div className="container">
          <h2 className="features-heading">A Marketplace for Everyone</h2>
          <div className="features-grid">
            {features.map(({ icon, title, description }) => (
              <div className="feature-card" key={title}>
                <span className="feature-icon">{icon}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default LandingPage;
