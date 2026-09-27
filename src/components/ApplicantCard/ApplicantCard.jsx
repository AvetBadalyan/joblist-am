import { useState } from "react";
import {
  FaCalendarAlt,
  FaEnvelope,
  FaExternalLinkAlt,
  FaFileAlt,
  FaTimes,
} from "react-icons/fa";
import Wrapper from "../../assets/wrappers/ApplicantCard";
import StatusDropdown from "../StatusDropdown/StatusDropdown";

/**
 * Format date for display (e.g., "Jan 15, 2024")
 * @param {string} dateString - ISO date string
 * @returns {string} - Formatted date
 */
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

/**
 * ApplicantCard Component
 * Displays an applicant's information for employer view
 *
 * Features:
 * - Displays candidate name, email, applied date, and status
 * - StatusDropdown for changing application status (task 15.6)
 * - View/hide cover letter functionality
 * - Resume link when available
 *
 * @param {Object} props
 * @param {Object} props.application - Application data
 * @param {string} props.application.id - Application ID
 * @param {string} props.application.candidate_name - Candidate's name
 * @param {string} props.application.candidate_email - Candidate's email
 * @param {string} props.application.applied_at - Application date
 * @param {string} props.application.status - Application status
 * @param {string} props.application.cover_letter - Cover letter content
 * @param {string} [props.application.resume_url] - Resume URL (optional)
 * @param {Function} props.onStatusChange - Callback when status changes (applicationId, newStatus)
 * @param {boolean} [props.isUpdating=false] - Whether status update is in progress
 *
 * @see Requirements: 14.3, 14.4, 15.1, 15.2, 15.3, 15.4, 15.5
 */
const ApplicantCard = ({ application, onStatusChange, isUpdating = false }) => {
  const [showCoverLetter, setShowCoverLetter] = useState(false);

  const {
    id,
    candidate_name,
    candidate_email,
    applied_at,
    status,
    cover_letter,
    resume_url,
  } = application;

  /**
   * Handle status change from dropdown
   * Calls onStatusChange prop with application ID and new status
   * @param {string} newStatus - The new status value
   */
  const handleStatusChange = (newStatus) => {
    if (onStatusChange) {
      onStatusChange(id, newStatus);
    }
  };

  const toggleCoverLetter = () => {
    setShowCoverLetter(!showCoverLetter);
  };

  /**
   * Get initials from candidate name for avatar
   * @param {string} name - Full name
   * @returns {string} Initials (up to 2 characters)
   */
  const getInitials = (name) => {
    if (!name) return "?";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.charAt(0).toUpperCase();
  };

  return (
    <Wrapper className={isUpdating ? "updating" : ""}>
      {/* Header with avatar, name/email, and status dropdown */}
      <div className="applicant-header">
        <div className="avatar">{getInitials(candidate_name)}</div>
        <div className="applicant-info">
          <h4>{candidate_name}</h4>
          <p className="email">{candidate_email}</p>
        </div>
        <div className="status-wrapper">
          <StatusDropdown
            value={status}
            onChange={handleStatusChange}
            disabled={isUpdating}
          />
        </div>
      </div>

      {/* Content section with meta info and actions */}
      <div className="applicant-content">
        <div className="applicant-meta">
          <div className="meta-item">
            <FaCalendarAlt />
            <span className="text">Applied {formatDate(applied_at)}</span>
          </div>
          <div className="meta-item">
            <FaEnvelope />
            <span className="text">{candidate_email}</span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="actions">
          <button
            type="button"
            className="action-btn view-cover-letter-btn"
            onClick={toggleCoverLetter}
            aria-expanded={showCoverLetter}
            aria-controls={`cover-letter-${id}`}
          >
            <FaFileAlt />
            {showCoverLetter ? "Hide Cover Letter" : "View Cover Letter"}
          </button>

          {resume_url && (
            <a
              href={resume_url}
              target="_blank"
              rel="noopener noreferrer"
              className="action-btn view-resume-btn"
            >
              <FaExternalLinkAlt />
              View Resume
            </a>
          )}
        </div>

        {/* Cover letter expanded view */}
        {showCoverLetter && (
          <div
            className="cover-letter-section"
            id={`cover-letter-${id}`}
            role="region"
            aria-label="Cover letter content"
          >
            <div className="cover-letter-header">
              <h5>Cover Letter</h5>
              <button
                type="button"
                className="close-btn"
                onClick={toggleCoverLetter}
                aria-label="Close cover letter"
              >
                <FaTimes />
              </button>
            </div>
            <p className="cover-letter-text">
              {cover_letter || "No cover letter provided."}
            </p>
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default ApplicantCard;
