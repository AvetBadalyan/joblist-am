import { useEffect, useState } from "react";
import {
  FaBriefcase,
  FaCalendarAlt,
  FaEdit,
  FaMapMarkerAlt,
  FaPlus,
  FaTrash,
  FaUsers,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Wrapper from "../../../assets/wrappers/EmployerDashboard";
import ConfirmModal from "../../../components/ConfirmModal/ConfirmModal";
import EmptyState from "../../../components/EmptyState/EmptyState";
import Loading from "../../../components/Loading/Loading";
import { getEmployerJobs } from "../../../features/employerJobs/employerJobsSlice";
import { deleteJob } from "../../../features/jobSlice/jobSlice";

/**
 * EmployerDashboard Component
 * Main dashboard view for employers showing their posted job listings
 *
 * Features:
 * - Display list of employer's posted job listings
 * - Show: title, location, job_type, status, posting date, application count
 * - Provide Edit and Delete actions for each job
 * - Click job title to navigate to applicants view
 * - Order by created_at descending
 * - Show empty state "You haven't posted any jobs yet" with link to post job
 *
 */
const EmployerDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux state
  const { jobs, isLoading, isError, totalJobs } = useSelector(
    (store) => store.employerJobs,
  );

  // Local state for delete confirmation modal
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    jobId: null,
    jobTitle: "",
  });
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch employer's jobs on mount
  useEffect(() => {
    dispatch(getEmployerJobs());
  }, [dispatch]);

  /**
   * Format date to readable string
   * @param {string} dateString - ISO date string
   * @returns {string} Formatted date
   */
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  /**
   * Format job type for display
   * @param {string} jobType - The job type value
   * @returns {string} Formatted job type
   */
  const formatJobType = (jobType) => {
    return jobType
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  /**
   * Open delete confirmation modal
   * @param {string} jobId - The job ID to delete
   * @param {string} jobTitle - The job title for confirmation message
   */
  const handleDeleteClick = (jobId, jobTitle) => {
    setDeleteModal({
      isOpen: true,
      jobId,
      jobTitle,
    });
  };

  /**
   * Close delete confirmation modal
   */
  const handleCancelDelete = () => {
    setDeleteModal({
      isOpen: false,
      jobId: null,
      jobTitle: "",
    });
  };

  /**
   * Confirm and execute job deletion
   */
  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      await dispatch(deleteJob(deleteModal.jobId)).unwrap();
      // Refresh the jobs list after successful deletion
      dispatch(getEmployerJobs());
    } catch (error) {
      // Error is handled by the thunk with toast notification
    } finally {
      setIsDeleting(false);
      handleCancelDelete();
    }
  };

  /**
   * Navigate to post job page (for empty state action)
   */
  const handlePostJob = () => {
    navigate("/employer/post-job");
  };

  // Render loading state
  if (isLoading) {
    return (
      <Wrapper>
        <div className="dashboard-header">
          <div className="header-content">
            <div>
              <h2 className="page-title">My Job Listings</h2>
              <p className="subtitle">
                Manage your posted jobs and view applicants
              </p>
            </div>
          </div>
        </div>
        <div className="loading-container">
          <Loading center />
        </div>
      </Wrapper>
    );
  }

  // Render error state (distinct from an empty list)
  if (isError) {
    return (
      <Wrapper>
        <div className="dashboard-header">
          <div className="header-content">
            <div>
              <h2 className="page-title">My Job Listings</h2>
              <p className="subtitle">
                Manage your posted jobs and view applicants
              </p>
            </div>
          </div>
        </div>
        <EmptyState
          message="We couldn't load your job listings. Please try again."
          actionText="Retry"
          onAction={() => dispatch(getEmployerJobs())}
        />
      </Wrapper>
    );
  }

  // Render empty state
  if (jobs.length === 0) {
    return (
      <Wrapper>
        <div className="dashboard-header">
          <div className="header-content">
            <div>
              <h2 className="page-title">My Job Listings</h2>
              <p className="subtitle">
                Manage your posted jobs and view applicants
              </p>
            </div>
            <Link to="/employer/post-job" className="post-job-btn">
              <FaPlus />
              Post a Job
            </Link>
          </div>
        </div>
        <EmptyState
          message="You haven't posted any jobs yet"
          actionText="Post Your First Job"
          onAction={handlePostJob}
        />
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      {/* Header Section */}
      <div className="dashboard-header">
        <div className="header-content">
          <div>
            <h2 className="page-title">My Job Listings</h2>
            <p className="subtitle">
              Manage your posted jobs and view applicants
            </p>
          </div>
          <Link to="/employer/post-job" className="post-job-btn">
            <FaPlus />
            Post a Job
          </Link>
        </div>
      </div>

      {/* Jobs Count */}
      <p className="jobs-count">
        {totalJobs} job{totalJobs !== 1 ? "s" : ""} posted
      </p>

      {/* Jobs List */}
      <div className="jobs-list">
        {jobs.map((job) => (
          <article key={job.id} className="job-card">
            {/* Job Header with Title and Status */}
            <div className="job-header">
              <Link
                to={`/employer/jobs/${job.id}/applicants`}
                className="job-title-link"
              >
                {job.title}
              </Link>
              <span className={`job-status ${job.status}`}>{job.status}</span>
            </div>

            {/* Job Details */}
            <div className="job-details">
              <div className="detail-item">
                <FaMapMarkerAlt />
                <span>{job.location}</span>
              </div>
              <div className="detail-item">
                <FaBriefcase />
                <span>{formatJobType(job.job_type)}</span>
              </div>
              <div className="detail-item">
                <FaCalendarAlt />
                <span>{formatDate(job.created_at)}</span>
              </div>
              <div className="detail-item applications">
                <FaUsers />
                <span>
                  {job.application_count}{" "}
                  {job.application_count === 1 ? "applicant" : "applicants"}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="job-actions">
              <Link
                to={`/employer/edit-job/${job.id}`}
                className="action-btn edit-btn"
              >
                <FaEdit />
                Edit
              </Link>
              <button
                type="button"
                className="action-btn delete-btn"
                onClick={() => handleDeleteClick(job.id, job.title)}
              >
                <FaTrash />
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteModal.isOpen}
        title="Delete Job Listing"
        message={`Are you sure you want to delete "${deleteModal.jobTitle}"? This will also remove all applications and saved jobs associated with this listing.`}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        confirmText={isDeleting ? "Deleting..." : "Delete"}
        cancelText="Cancel"
      />
    </Wrapper>
  );
};

export default EmployerDashboard;
