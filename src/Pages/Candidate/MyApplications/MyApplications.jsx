import { useEffect } from "react";
import {
  FaCalendarAlt,
  FaComments,
  FaHandshake,
  FaPaperPlane,
  FaSearch,
  FaTimesCircle,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import Wrapper from "../../../assets/wrappers/MyApplications";
import EmptyState from "../../../components/EmptyState/EmptyState";
import Loading from "../../../components/Loading/Loading";
import { getMyApplications } from "../../../features/applications/applicationsSlice";

/**
 * MyApplications Component
 * Displays all job applications submitted by the candidate
 *
 */
const MyApplications = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { applications, isLoading, isError, totalApplications } = useSelector(
    (store) => store.applications,
  );

  // Fetch applications on component mount
  useEffect(() => {
    dispatch(getMyApplications());
  }, [dispatch]);

  /**
   * Returns the appropriate icon for each application status
   * @param {string} status - Application status
   * @returns {JSX.Element} Icon component
   */
  const getStatusIcon = (status) => {
    switch (status) {
      case "applied":
        return <FaPaperPlane aria-hidden="true" />;
      case "reviewing":
        return <FaSearch aria-hidden="true" />;
      case "interview":
        return <FaComments aria-hidden="true" />;
      case "offer":
        return <FaHandshake aria-hidden="true" />;
      case "rejected":
        return <FaTimesCircle aria-hidden="true" />;
      default:
        return <FaPaperPlane aria-hidden="true" />;
    }
  };

  /**
   * Formats the date for display
   * @param {string} dateString - ISO date string
   * @returns {string} Formatted date
   */
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  /**
   * Navigates to the browse jobs page
   */
  const handleBrowseJobs = () => {
    navigate("/jobs");
  };

  // Show loading state while fetching applications
  if (isLoading) {
    return <Loading center />;
  }

  // Show error state (distinct from an empty list)
  if (isError) {
    return (
      <EmptyState
        message="We couldn't load your applications. Please try again."
        actionText="Retry"
        onAction={() => dispatch(getMyApplications())}
      />
    );
  }

  // Show empty state if no applications
  if (applications.length === 0) {
    return (
      <EmptyState
        message="You haven't applied to any jobs yet"
        actionText="Browse Jobs"
        onAction={handleBrowseJobs}
      />
    );
  }

  return (
    <Wrapper>
      <div className="page-header">
        <h2 className="page-title">My Applications</h2>
        <p className="applications-count">
          {totalApplications} application{totalApplications !== 1 ? "s" : ""}{" "}
          submitted
        </p>
      </div>

      <div className="applications-list">
        {applications.map((application) => (
          <article key={application.id} className="application-card">
            <div className="card-header">
              <div className="job-info">
                <h4 className="job-title">
                  <Link
                    to={`/jobs/${application.job_id}`}
                    className="job-title-link"
                  >
                    {application.job_title || "Job Title"}
                  </Link>
                </h4>
                <p className="company-name">
                  {application.company_name || "Company"}
                </p>
              </div>
              <span className={`status-badge status-${application.status}`}>
                {getStatusIcon(application.status)}
                {application.status}
              </span>
            </div>
            <div className="card-details">
              <FaCalendarAlt aria-hidden="true" />
              <span>Applied {formatDate(application.applied_at)}</span>
            </div>
          </article>
        ))}
      </div>
    </Wrapper>
  );
};

export default MyApplications;
