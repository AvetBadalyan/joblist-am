import { useState } from "react";
import Wrapper from "../../assets/wrappers/ApplicationForm";
import FormRow from "../FormRow/FormRow";
import FormRowTextArea from "../FormRowTextArea/FormRowTextArea";

/**
 * ApplicationForm component for candidates to apply to job listings.
 *
 * @param {Object} props
 * @param {Function} props.onSubmit - Callback with form data { cover_letter, resume_url }
 * @param {Function} props.onCancel - Callback to close/cancel the form
 * @param {boolean} props.isLoading - Whether submission is in progress
 */
const ApplicationForm = ({ onSubmit, onCancel, isLoading }) => {
  const [coverLetter, setCoverLetter] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [coverLetterError, setCoverLetterError] = useState("");

  const handleCoverLetterChange = (e) => {
    setCoverLetter(e.target.value);
    // Clear error when user starts typing
    if (coverLetterError && e.target.value.trim()) {
      setCoverLetterError("");
    }
  };

  const handleResumeUrlChange = (e) => {
    setResumeUrl(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate cover letter is not empty
    if (!coverLetter.trim()) {
      setCoverLetterError("Cover letter is required");
      return;
    }

    // Call onSubmit with form data
    onSubmit({
      cover_letter: coverLetter.trim(),
      resume_url: resumeUrl.trim() || null,
    });
  };

  return (
    <Wrapper>
      <h4>Apply for this position</h4>
      <form className="form" onSubmit={handleSubmit}>
        <FormRowTextArea
          name="cover_letter"
          labelText="Cover Letter *"
          value={coverLetter}
          handleChange={handleCoverLetterChange}
          required
        />
        {coverLetterError && <p className="field-error">{coverLetterError}</p>}

        <FormRow
          type="url"
          name="resume_url"
          labelText="Resume URL (optional)"
          value={resumeUrl}
          handleChange={handleResumeUrlChange}
        />

        <div className="btn-container">
          <button
            type="button"
            className="btn btn-cancel"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button type="submit" className="btn" disabled={isLoading}>
            {isLoading ? "Submitting..." : "Submit Application"}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default ApplicationForm;
