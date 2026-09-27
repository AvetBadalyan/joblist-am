import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FaCalendarAlt, FaPaperPlane, FaSearch, FaComments, FaHandshake, FaTimesCircle } from 'react-icons/fa';

import Wrapper from '../../../assets/wrappers/MyApplications';
import Loading from '../../../components/Loading/Loading';
import EmptyState from '../../../components/EmptyState/EmptyState';
import { getMyApplications } from '../../../features/applications/applicationsSlice';

/**
 * MyApplications Component
 * Displays all job applications submitted by the candidate
 * 
 * Requirements: 7.1, 7.2, 7.3, 7.4, 7.5
 * - 7.1: Display a list of all candidate's Applications
 * - 7.2: Display job title, company name, application date, and status
 * - 7.3: Use distinct visual indicators (color/icon) for each Application_Status
 * - 7.4: Show empty state with link to browse jobs when no applications
 * - 7.5: Order applications by applied_at DESC (most recent first)
 */
const MyApplications = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { applications, isLoading, totalApplications } = useSelector(
    (store) => store.applications
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
      case 'applied':
        return <FaPaperPlane />;
      case 'reviewing':
        return <FaSearch />;
      case 'interview':
        return <FaComments />;
      case 'offer':
        return <FaHandshake />;
      case 'rejected':
        return <FaTimesCircle />;
      default:
        return <FaPaperPlane />;
    }
  };

  /**
   * Formats the date for display
   * @param {string} dateString - ISO date string
   * @returns {string} Formatted date
   */
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  /**
   * Navigates to the browse jobs page
   */
  const handleBrowseJobs = () => {
    navigate('/jobs');
  };

  // Show loading state while fetching applications
  if (isLoading) {
    return <Loading center />;
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
          {totalApplications} application{totalApplications !== 1 ? 's' : ''} submitted
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
                    {application.job_title || 'Job Title'}
                  </Link>
                </h4>
                <p className="company-name">
                  {application.company_name || 'Company'}
                </p>
              </div>
              <span className={`status-badge status-${application.status}`}>
                {getStatusIcon(application.status)}
                {application.status}
              </span>
            </div>
            <div className="card-details">
              <FaCalendarAlt />
              <span>Applied {formatDate(application.applied_at)}</span>
            </div>
          </article>
        ))}
      </div>
    </Wrapper>
  );
};

export default MyApplications;
