import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Wrapper from "../../../assets/wrappers/DashboardFormPage";
import FormRow from "../../../components/FormRow/FormRow";
import FormRowSelect from "../../../components/FormRow/FormRowSelect";
import FormRowTextArea from "../../../components/FormRowTextArea/FormRowTextArea";
import {
  clearValues,
  createJob,
  handleChange,
} from "../../../features/jobSlice/jobSlice";

const PostJob = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
  } = useSelector((store) => store.job);

  const { user } = useSelector((store) => store.user);

  const [salaryError, setSalaryError] = useState("");

  // Pre-fill location from the employer's profile on first mount
  useEffect(() => {
    if (user?.location) {
      dispatch(handleChange({ name: "location", value: user.location }));
    }
    return () => {
      dispatch(clearValues());
    };
  }, [dispatch, user?.location]);

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
   * Validates required fields and salary range, then dispatches createJob
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

    // Dispatch createJob thunk
    const result = await dispatch(
      createJob({
        title,
        location,
        job_type,
        salary_min,
        salary_max,
        description,
        requirements,
      }),
    );

    // On success, redirect to employer dashboard
    if (!result.error) {
      navigate("/employer");
    }
  };

  /**
   * Clear form and reset to initial values
   */
  const handleClear = () => {
    dispatch(clearValues());
    setSalaryError("");
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>Post a Job</h3>

        {/* Display company name from profile (read-only) */}
        <p className="form-subtitle">
          Posting as: <strong>{user?.company_name || "Your Company"}</strong>
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
          <div className="form-full-width">
            <FormRowTextArea
              name="description"
              labelText="Job Description *"
              value={description}
              handleChange={handleJobInput}
              required
            />
          </div>

          {/* Requirements - Optional (textarea, spans full width) */}
          <div className="form-full-width">
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
              onClick={handleClear}
            >
              Clear
            </button>
            <button
              type="submit"
              className="btn btn-block submit-btn"
              disabled={isLoading}
            >
              {isLoading ? "Posting..." : "Post Job"}
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default PostJob;
