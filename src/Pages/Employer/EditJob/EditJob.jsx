import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Wrapper from "../../../assets/wrappers/DashboardFormPage";
import FormRow from "../../../components/FormRow/FormRow";
import FormRowSelect from "../../../components/FormRow/FormRowSelect";
import FormRowTextArea from "../../../components/FormRowTextArea/FormRowTextArea";
import Loading from "../../../components/Loading/Loading";
import {
  clearValues,
  editJob,
  handleChange,
  setEditJob,
} from "../../../features/jobSlice/jobSlice";
import { mapJobFromDB } from "../../../utils/mappers";
import { supabase } from "../../../utils/supabase";

/**
 * EditJob page - Form for employers to edit existing job listings
 *
 * Features:
 * 1. Fetches job data by ID from URL params (/employer/edit-job/:id)
 * 2. Pre-fills form with existing job data using setEditJob action
 * 3. Editable fields: title, location, job_type, salary_min, salary_max, description, requirements, status
 * 4. Status dropdown with open/closed options
 * 5. Validates salary_max >= salary_min before submission
 * 6. Prevents editing jobs not owned by current employer (via RLS)
 * 7. Redirects to /employer dashboard with success message on submit
 *
 * Requirements: 12.1, 12.2, 12.3, 12.4, 12.5
 */
const EditJob = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: jobId } = useParams();

  const {
    isLoading,
    title,
    location,
    job_type,
    job_type_options,
    salary_min,
    salary_max,
    description,
    requirements,
    status,
    status_options,
    editJobId,
  } = useSelector((store) => store.job);

  const { user } = useSelector((store) => store.user);

  // Local state for fetching and validation
  const [isFetching, setIsFetching] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const [salaryError, setSalaryError] = useState("");

  /**
   * Fetch job data on component mount
   * Verifies ownership via RLS - only employer's own jobs will be returned
   */
  useEffect(() => {
    const fetchJob = async () => {
      if (!jobId) {
        setFetchError("Invalid job ID");
        setIsFetching(false);
        return;
      }

      try {
        // Fetch job by ID - RLS ensures only owner can access for editing
        const { data, error } = await supabase
          .from("jobs")
          .select("*")
          .eq("id", jobId)
          .single();

        if (error) {
          // Handle "not found" case - could mean job doesn't exist or user doesn't own it
          if (error.code === "PGRST116") {
            setFetchError(
              "Job not found or you don't have permission to edit it",
            );
          } else {
            setFetchError(error.message || "Failed to load job");
          }
          setIsFetching(false);
          return;
        }

        if (!data) {
          setFetchError("Job not found");
          setIsFetching(false);
          return;
        }

        // Additional check: verify the current user is the employer who owns this job
        if (data.employer_id !== user?.id) {
          setFetchError("You don't have permission to edit this job");
          setIsFetching(false);
          return;
        }

        // Map and dispatch to populate form
        const job = mapJobFromDB(data);
        dispatch(setEditJob(job));
        setIsFetching(false);
      } catch (err) {
        console.error("Error fetching job:", err);
        setFetchError("Failed to load job. Please try again.");
        setIsFetching(false);
      }
    };

    fetchJob();

    // Cleanup: clear form values when unmounting
    return () => {
      dispatch(clearValues());
    };
  }, [jobId, user?.id, dispatch]);

  /**
   * Handle form field changes and dispatch to Redux store
   */
  const handleJobInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChange({ name, value }));

    // Clear salary error when user modifies salary fields
    if (name === "salary_min" || name === "salary_max") {
      setSalaryError("");
    }
  };

  /**
   * Validate salary range: max must be >= min if both are provided
   * @returns {boolean} True if valid, false otherwise
   */
  const validateSalary = () => {
    if (salary_min && salary_max) {
      const minSalary = Number(salary_min);
      const maxSalary = Number(salary_max);
      if (maxSalary < minSalary) {
        setSalaryError(
          "Maximum salary must be greater than or equal to minimum salary",
        );
        return false;
      }
    }
    setSalaryError("");
    return true;
  };

  /**
   * Handle form submission
   * Validates required fields and salary range, then dispatches editJob
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!title || !location || !description) {
      toast.error("Please fill out all required fields");
      return;
    }

    // Validate salary range
    if (!validateSalary()) {
      return;
    }

    // Dispatch editJob thunk with job ID and updated data
    const result = await dispatch(
      editJob({
        jobId: editJobId,
        job: {
          title,
          location,
          job_type,
          salary_min,
          salary_max,
          description,
          requirements,
          status,
        },
      }),
    );

    // On success, redirect to employer dashboard
    if (!result.error) {
      navigate("/employer");
    }
  };

  /**
   * Handle cancel - clear form and navigate back to dashboard
   */
  const handleCancel = () => {
    dispatch(clearValues());
    navigate("/employer");
  };

  // Show loading state while fetching job data
  if (isFetching) {
    return (
      <Wrapper>
        <Loading />
      </Wrapper>
    );
  }

  // Show error state if job couldn't be loaded
  if (fetchError) {
    return (
      <Wrapper>
        <div className="form">
          <h3>Error</h3>
          <p style={{ color: "var(--red-dark)", marginBottom: "1rem" }}>
            {fetchError}
          </p>
          <button
            type="button"
            className="btn btn-block"
            onClick={() => navigate("/employer")}
          >
            Back to Dashboard
          </button>
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <form className="form">
        <h3>Edit Job</h3>

        {/* Display company name from profile (read-only) */}
        <p style={{ marginBottom: "1.5rem", color: "var(--grey-600)" }}>
          Editing job for:{" "}
          <strong>{user?.company_name || "Your Company"}</strong>
        </p>

        <div className="form-center">
          {/* Title - Required */}
          <FormRow
            type="text"
            name="title"
            labelText="Job Title *"
            value={title}
            handleChange={handleJobInput}
          />

          {/* Location - Required */}
          <FormRow
            type="text"
            name="location"
            labelText="Location *"
            value={location}
            handleChange={handleJobInput}
          />

          {/* Job Type - Required (select) */}
          <FormRowSelect
            name="job_type"
            labelText="Job Type *"
            value={job_type}
            handleChange={handleJobInput}
            list={job_type_options}
          />

          {/* Status - Open/Closed (select) */}
          <FormRowSelect
            name="status"
            labelText="Job Status *"
            value={status}
            handleChange={handleJobInput}
            list={status_options}
          />

          {/* Salary Min - Optional */}
          <FormRow
            type="number"
            name="salary_min"
            labelText="Minimum Salary"
            value={salary_min}
            handleChange={handleJobInput}
          />

          {/* Salary Max - Optional with validation */}
          <div className="form-row">
            <label htmlFor="salary_max" className="form-label">
              Maximum Salary
            </label>
            <input
              id="salary_max"
              type="number"
              name="salary_max"
              value={salary_max}
              onChange={handleJobInput}
              className="form-input"
            />
            {salaryError && <p className="field-error">{salaryError}</p>}
          </div>

          {/* Description - Required (textarea, spans full width) */}
          <div style={{ gridColumn: "1 / -1" }}>
            <FormRowTextArea
              name="description"
              labelText="Job Description *"
              value={description}
              handleChange={handleJobInput}
              required
            />
          </div>

          {/* Requirements - Optional (textarea, spans full width) */}
          <div style={{ gridColumn: "1 / -1" }}>
            <FormRowTextArea
              name="requirements"
              labelText="Requirements"
              value={requirements}
              handleChange={handleJobInput}
            />
          </div>

          {/* Action buttons */}
          <div className="btn-container">
            <button
              type="button"
              className="btn btn-block clear-btn"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-block submit-btn"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default EditJob;
