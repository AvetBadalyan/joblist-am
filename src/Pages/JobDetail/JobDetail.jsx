import { useCallback, useEffect, useMemo, useState } from "react";
import {
  FaArrowLeft,
  FaBriefcase,
  FaCheck,
  FaLock,
  FaMapMarkerAlt,
  FaMoneyBillWave,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Wrapper from "../../assets/wrappers/JobDetail";
import ApplicationForm from "../../components/ApplicationForm/ApplicationForm";
import BookmarkButton from "../../components/BookmarkButton/BookmarkButton";
import Loading from "../../components/Loading/Loading";
import { submitApplication } from "../../features/applications/applicationsSlice";
import {
  clearCurrentJob,
  getJobById,
} from "../../features/publicJobs/publicJobsSlice";
import {
  optimisticSave,
  optimisticUnsave,
  saveJob,
  unsaveJob,
} from "../../features/savedJobs/savedJobsSlice";
import { formatSalary } from "../../utils/format";

/**
 * JobDetail Page
 *
 * Displays full job details and handles the application flow.
 *
 * Requirements implemented:
 * - 3.1: Navigate to dedicated job detail page
 * - 3.2: Display full job details (title, company_name, location, job_type, salary, description, requirements)
 * - 3.3: Display "Apply Now" button
 * - 3.4: Redirect unauthenticated users to /register with return URL when clicking Apply
 * - 3.5: Show ApplicationForm when authenticated candidate clicks Apply
 * - 3.6: Hide Apply button for employer users
 * - 6.1: ApplicationForm with cover_letter (required), resume_url (optional)
 * - 6.3: Show "You have already applied" if already applied
 * - 6.4: Show "Application Submitted" state after applying
 * - 6.5: Hide Apply button for closed jobs
 */

/**
 * Format date to human-readable string
 */
const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const JobDetail = () => {
  const { jobId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Local state for showing application form
  const [showApplicationForm, setShowApplicationForm] = useState(false);

  // Redux state
  const { currentJob, currentJobLoading } = useSelector(
    (store) => store.publicJobs,
  );
  const { user } = useSelector((store) => store.user);
  const { appliedJobIds, isSubmitting } = useSelector(
    (store) => store.applications,
  );
  const { savedJobIds } = useSelector((store) => store.savedJobs);

  // Derived state
  const isAuthenticated = Boolean(user);
  const isCandidate = user?.role === "candidate";
  const isEmployer = user?.role === "employer";
  const hasApplied = useMemo(
    () => appliedJobIds.includes(jobId),
    [appliedJobIds, jobId],
  );
  const isSaved = useMemo(
    () => savedJobIds.includes(jobId),
    [savedJobIds, jobId],
  );
  const isJobClosed = currentJob?.status === "closed";

  // Fetch job on mount and when jobId changes
  useEffect(() => {
    if (jobId) {
      dispatch(getJobById(jobId));
    }

    // Cleanup: clear current job when leaving the page
    return () => {
      dispatch(clearCurrentJob());
    };
  }, [dispatch, jobId]);

  /**
   * Handle Apply Now button click
   * - Unauthenticated: redirect to /register with return URL
   * - Candidate: show application form
   */
  const handleApplyClick = useCallback(() => {
    if (!isAuthenticated) {
      // Redirect to register with return URL (Requirement 3.4)
      navigate(`/register?returnUrl=/jobs/${jobId}`);
      return;
    }

    if (isCandidate) {
      // Show application form (Requirement 3.5)
      setShowApplicationForm(true);
    }
  }, [isAuthenticated, isCandidate, navigate, jobId]);

  /**
   * Handle application form submission
   */
  const handleApplicationSubmit = useCallback(
    async (formData) => {
      const result = await dispatch(
        submitApplication({
          jobId,
          cover_letter: formData.cover_letter,
          resume_url: formData.resume_url,
        }),
      );

      if (submitApplication.fulfilled.match(result)) {
        // Success - hide the form (UI will show "Application Submitted")
        setShowApplicationForm(false);
      }
      // Error handling is done in the slice via toast
    },
    [dispatch, jobId],
  );

  /**
   * Handle application form cancel
   */
  const handleApplicationCancel = useCallback(() => {
    setShowApplicationForm(false);
  }, []);

  /**
   * Handle bookmark toggle
   */
  const handleBookmarkClick = useCallback(() => {
    if (!isCandidate) return;

    if (isSaved) {
      // Optimistic update then dispatch
      dispatch(optimisticUnsave(jobId));
      dispatch(unsaveJob(jobId));
    } else {
      // Optimistic update then dispatch
      dispatch(optimisticSave(jobId));
      dispatch(saveJob(jobId));
    }
  }, [dispatch, isCandidate, isSaved, jobId]);

  /**
   * Determine what to show in the sidebar action area
   */
  const renderSidebarAction = () => {
    // Hide Apply button for employers (Requirement 3.6)
    if (isEmployer) {
      return null;
    }

    // Show "Position Closed" badge for closed jobs (Requirement 6.5)
    if (isJobClosed) {
      return (
        <div className="closed-badge">
          <FaLock />
          <span>Position Closed</span>
        </div>
      );
    }

    // Show "Application Submitted" badge if already applied (Requirement 6.3, 6.4)
    if (hasApplied) {
      return (
        <div className="applied-badge">
          <FaCheck />
          <span>Application Submitted</span>
        </div>
      );
    }

    // Show Apply button for unauthenticated and candidates (Requirement 3.3)
    return (
      <button
        type="button"
        className="btn apply-btn"
        onClick={handleApplyClick}
        disabled={showApplicationForm}
      >
        Apply Now
      </button>
    );
  };

  // Loading state
  if (currentJobLoading) {
    return (
      <Wrapper>
        <div className="loading-container">
          <Loading center />
        </div>
      </Wrapper>
    );
  }

  // Error state - job not found
  if (!currentJob) {
    return (
      <Wrapper>
        <Link to="/jobs" className="back-link">
          <FaArrowLeft />
          <span>Back to Jobs</span>
        </Link>
        <div className="error-container">
          <h3>Job Not Found</h3>
          <p>
            The job you're looking for doesn't exist or may have been removed.
          </p>
          <Link to="/jobs" className="btn">
            Browse Jobs
          </Link>
        </div>
      </Wrapper>
    );
  }

  const {
    title,
    company_name,
    location,
    job_type,
    salary_min,
    salary_max,
    description,
    requirements,
    created_at,
    status,
  } = currentJob;

  const salaryDisplay = formatSalary(salary_min, salary_max);

  return (
    <Wrapper>
      {/* Back navigation */}
      <Link to="/jobs" className="back-link">
        <FaArrowLeft />
        <span>Back to Jobs</span>
      </Link>

      <div className="job-detail-container">
        {/* Main Content */}
        <div className="job-main">
          {/* Header */}
          <header className="job-header">
            <div className="company-icon">{company_name?.charAt(0) || "C"}</div>
            <div className="job-title-section">
              <h2>{title}</h2>
              <p className="company-name">{company_name}</p>
            </div>
            {/* Bookmark button for authenticated candidates (Requirement 8.1) */}
            {isCandidate && (
              <BookmarkButton
                isSaved={isSaved}
                onClick={handleBookmarkClick}
                disabled={false}
              />
            )}
          </header>

          {/* Job Meta Info */}
          <div className="job-meta">
            <div className="meta-item">
              <FaMapMarkerAlt />
              <span className="text">{location}</span>
            </div>
            <div className="meta-item">
              <span className={`job-type-badge ${job_type}`}>{job_type}</span>
            </div>
            {salaryDisplay && (
              <div className="meta-item">
                <FaMoneyBillWave />
                <span className="salary">{salaryDisplay}</span>
              </div>
            )}
            {status === "closed" && (
              <div className="meta-item">
                <FaBriefcase />
                <span className="text" style={{ color: "var(--red-dark)" }}>
                  Closed
                </span>
              </div>
            )}
          </div>

          {/* Job Content */}
          <div className="job-content">
            {/* Description */}
            <section className="content-section">
              <h3>Job Description</h3>
              <p style={{ whiteSpace: "pre-wrap" }}>{description}</p>
            </section>

            {/* Requirements */}
            {requirements && (
              <section className="content-section">
                <h3>Requirements</h3>
                <p style={{ whiteSpace: "pre-wrap" }}>{requirements}</p>
              </section>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="job-sidebar">
          <div className="sidebar-header">
            <h3>Apply for this Job</h3>
          </div>

          {/* Sidebar Action (Apply button, Applied badge, or Closed badge) */}
          {renderSidebarAction()}

          {/* Application Form - shown inline when candidate clicks Apply */}
          {showApplicationForm &&
            isCandidate &&
            !isJobClosed &&
            !hasApplied && (
              <div className="application-section">
                <ApplicationForm
                  jobId={jobId}
                  onSubmit={handleApplicationSubmit}
                  onCancel={handleApplicationCancel}
                  isLoading={isSubmitting}
                />
              </div>
            )}

          {/* Posted date */}
          <p className="posted-date">Posted on {formatDate(created_at)}</p>
        </aside>
      </div>
    </Wrapper>
  );
};

export default JobDetail;
