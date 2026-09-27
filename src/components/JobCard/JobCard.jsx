import { FaLocationArrow, FaDollarSign, FaRegBookmark, FaBookmark } from "react-icons/fa";
import { Link } from "react-router-dom";
import Wrapper from "../../assets/wrappers/JobCard";

/**
 * Format salary range for display
 * @param {number|null|undefined} salaryMin - Minimum salary
 * @param {number|null|undefined} salaryMax - Maximum salary
 * @returns {string|null} - Formatted salary string or null if no salary data
 */
const formatSalary = (salaryMin, salaryMax) => {
  if (!salaryMin && !salaryMax) return null;
  
  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  };

  if (salaryMin && salaryMax) {
    return `${formatNumber(salaryMin)} - ${formatNumber(salaryMax)}`;
  }
  if (salaryMin) {
    return `${formatNumber(salaryMin)}+`;
  }
  return formatNumber(salaryMax);
};

/**
 * Format date as relative time (e.g., "3 days ago")
 * @param {string} dateString - ISO date string
 * @returns {string} - Formatted relative time
 */
const formatRelativeDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now - date;
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  
  if (diffInDays === 0) {
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    if (diffInHours === 0) {
      const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
      if (diffInMinutes <= 1) return "Just now";
      return `${diffInMinutes} minutes ago`;
    }
    if (diffInHours === 1) return "1 hour ago";
    return `${diffInHours} hours ago`;
  }
  if (diffInDays === 1) return "1 day ago";
  if (diffInDays < 7) return `${diffInDays} days ago`;
  if (diffInDays < 14) return "1 week ago";
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
  if (diffInDays < 60) return "1 month ago";
  if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
  return `${Math.floor(diffInDays / 365)} year${Math.floor(diffInDays / 365) > 1 ? 's' : ''} ago`;
};

/**
 * JobCard Component
 * Displays a job listing card with key information
 * 
 * @param {Object} props
 * @param {Object} props.job - Job data object
 * @param {string} props.job.id - Job ID
 * @param {string} props.job.title - Job title
 * @param {string} props.job.company_name - Company name
 * @param {string} props.job.location - Job location
 * @param {string} props.job.job_type - Job type (full-time, part-time, remote, internship)
 * @param {number} [props.job.salary_min] - Minimum salary (optional)
 * @param {number} [props.job.salary_max] - Maximum salary (optional)
 * @param {string} props.job.created_at - Job creation date
 * @param {boolean} [props.showBookmark=false] - Whether to show bookmark button
 * @param {boolean} [props.isSaved=false] - Whether job is saved/bookmarked
 * @param {Function} [props.onBookmarkClick] - Callback when bookmark is clicked
 */
const JobCard = ({ 
  job, 
  showBookmark = false, 
  isSaved = false, 
  onBookmarkClick 
}) => {
  const { id, title, company_name, location, job_type, salary_min, salary_max, created_at } = job;
  
  const salary = formatSalary(salary_min, salary_max);
  const postedDate = formatRelativeDate(created_at);

  const handleBookmarkClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onBookmarkClick) {
      onBookmarkClick(id);
    }
  };

  return (
    <Wrapper>
      <Link to={`/jobs/${id}`} className="card-link">
        <header>
          <div className="company-icon">{company_name?.charAt(0) || "?"}</div>
          <div className="header-info">
            <h4>{title}</h4>
            <p>{company_name}</p>
          </div>
          {showBookmark && (
            <button 
              type="button"
              className={`bookmark-btn ${isSaved ? 'saved' : ''}`}
              onClick={handleBookmarkClick}
              aria-label={isSaved ? "Remove from saved jobs" : "Save job"}
            >
              {isSaved ? <FaBookmark /> : <FaRegBookmark />}
            </button>
          )}
        </header>
        <div className="content">
          <div className="job-details">
            <div className="detail-item">
              <FaLocationArrow />
              <span className="text">{location}</span>
            </div>
            <div className="detail-item">
              <span className={`job-type ${job_type}`}>
                {job_type?.replace('-', ' ')}
              </span>
            </div>
            {salary && (
              <div className="detail-item salary">
                <FaDollarSign />
                <span className="text">{salary}</span>
              </div>
            )}
          </div>
          <div className="posted-date">Posted {postedDate}</div>
        </div>
      </Link>
    </Wrapper>
  );
};

export default JobCard;
