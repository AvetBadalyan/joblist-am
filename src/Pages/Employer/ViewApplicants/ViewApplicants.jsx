import { useEffect, useState } from "react";
import { FaArrowLeft, FaBriefcase, FaMapMarkerAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Wrapper from "../../../assets/wrappers/ViewApplicants";
import ApplicantCard from "../../../components/ApplicantCard/ApplicantCard";
import EmptyState from "../../../components/EmptyState/EmptyState";
import Loading from "../../../components/Loading/Loading";
import {
  clearApplicants,
  getJobApplicants,
  updateApplicationStatus,
} from "../../../features/employerJobs/employerJobsSlice";
import { supabase } from "../../../utils/supabase";

/**
 * ViewApplicants Component
 * Displays all applications for a specific job listing
 *
 * Features:
 * - Fetch and display applications for selected job
 * - Use ApplicantCard for each application
 * - Show: candidate name, email, application date, status, cover letter link
 * - Display cover letter in modal when link clicked (handled by ApplicantCard)
 * - Show empty state "No applications received yet"
 * - Handle status updates via StatusDropdown in ApplicantCard
 *
 */
const ViewApplicants = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: jobId } = useParams();

  // Redux state
  const { currentJobApplicants, applicantsLoading } = useSelector(
    (store) => store.employerJobs,
  );

  // Local state for job details and tracking status updates
  const [jobDetails, setJobDetails] = useState(null);
  const [jobLoading, setJobLoading] = useState(true);
  const [jobError, setJobError] = useState(null);
  const [updatingApplicationId, setUpdatingApplicationId] = useState(null);

  // Fetch job details
  useEffect(() => {
    const fetchJobDetails = async () => {
      setJobLoading(true);
      setJobError(null);

      try {
        const { data, error } = await supabase
          .from("jobs")
          .select("id, title, location, job_type, company_name")
          .eq("id", jobId)
          .single();

        if (error) {
          throw error;
        }

        setJobDetails(data);
      } catch (error) {
        console.error("Error fetching job details:", error);
        setJobError(error.message || "Failed to load job details");
      } finally {
        setJobLoading(false);
      }
    };

    if (jobId) {
      fetchJobDetails();
    }
  }, [jobId]);

  // Fetch applicants when component mounts or jobId changes
  useEffect(() => {
    if (jobId) {
      dispatch(getJobApplicants(jobId));
    }

    // Cleanup on unmount
    return () => {
      dispatch(clearApplicants());
    };
  }, [dispatch, jobId]);

  /**
   * Handle application status change
   * Dispatches updateApplicationStatus thunk and shows success toast
   * @param {string} applicationId - The application ID to update
   * @param {string} newStatus - The new status value
   */
  const handleStatusChange = async (applicationId, newStatus) => {
    // Set the updating application ID for UI feedback
    setUpdatingApplicationId(applicationId);

    try {
      await dispatch(
        updateApplicationStatus({
          applicationId,
          status: newStatus,
        }),
      ).unwrap();
      // Success toast is shown by the slice
    } catch (error) {
      // Error toast is shown by the slice
      console.error("Failed to update application status:", error);
    } finally {
      setUpdatingApplicationId(null);
    }
  };

  /**
   * Format job type for display
   * @param {string} jobType - The job type value
   * @returns {string} Formatted job type
   */
  const formatJobType = (jobType) => {
    if (!jobType) return "";
    return jobType
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Render loading state
  if (jobLoading || applicantsLoading) {
    return (
      <Wrapper>
        <div className="page-header">
          <Link to="/employer" className="back-link">
            <FaArrowLeft />
            Back to Dashboard
          </Link>
          <h2 className="page-title">Applicants</h2>
        </div>
        <div className="loading-container">
          <Loading center />
        </div>
      </Wrapper>
    );
  }

  // Render error state
  if (jobError || !jobDetails) {
    return (
      <Wrapper>
        <div>
          <h2 className="page-title">Unable to Load Applicants</h2>
          <p className="applicants-count">
            {jobError ||
              "Job not found or you don't have permission to view it."}
          </p>
          <Link to="/employer" className="back-link">
            <FaArrowLeft />
            Back to Dashboard
          </Link>
        </div>
      </Wrapper>
    );
  }

  // Render empty state
  if (currentJobApplicants.length === 0) {
    return (
      <Wrapper>
        <div className="page-header">
          <Link to="/employer" className="back-link">
            <FaArrowLeft />
            Back to Dashboard
          </Link>
          <h2 className="page-title">Applicants for {jobDetails.title}</h2>
          <div className="job-info">
            <span className="info-item">
              <FaMapMarkerAlt />
              {jobDetails.location}
            </span>
            <span className="info-item">
              <FaBriefcase />
              {formatJobType(jobDetails.job_type)}
            </span>
          </div>
        </div>
        <EmptyState
          message="No applications received yet"
          actionText="Back to Dashboard"
          onAction={() => navigate("/employer")}
        />
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      {/* Page Header */}
      <div className="page-header">
        <Link to="/employer" className="back-link">
          <FaArrowLeft />
          Back to Dashboard
        </Link>
        <h2 className="page-title">Applicants for {jobDetails.title}</h2>
        <div className="job-info">
          <span className="info-item">
            <FaMapMarkerAlt />
            {jobDetails.location}
          </span>
          <span className="info-item">
            <FaBriefcase />
            {formatJobType(jobDetails.job_type)}
          </span>
        </div>
      </div>

      {/* Applicants Count */}
      <p className="applicants-count">
        {currentJobApplicants.length} applicant
        {currentJobApplicants.length !== 1 ? "s" : ""}
      </p>

      {/* Applicants List */}
      <div className="applicants-list">
        {currentJobApplicants.map((application) => (
          <ApplicantCard
            key={application.id}
            application={application}
            onStatusChange={handleStatusChange}
            isUpdating={updatingApplicationId === application.id}
          />
        ))}
      </div>
    </Wrapper>
  );
};

export default ViewApplicants;
