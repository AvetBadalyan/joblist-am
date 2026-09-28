import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Wrapper from "../../../assets/wrappers/DashboardFormPage";
import FormRow from "../../../components/FormRow/FormRow";
import FormRowTextArea from "../../../components/FormRowTextArea/FormRowTextArea";
import { updateUser } from "../../../features/user/userSlice";

/**
 * CandidateProfile Component
 * Allows candidates to view and edit their profile information.
 *
 * Features:
 * - Pre-filled form with current user data
 * - Editable fields: name, location, skills, resume_url
 * - Read-only email field (styled differently)
 * - Save button dispatches updateUser thunk
 * - Success toast shown via updateUser thunk
 * - Validation for required fields (name)
 * - Loading state during save
 *
 * @see Requirements: 9.1, 9.2, 9.3, 9.4, 9.5
 */
const CandidateProfile = () => {
  const { isLoading, user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  // Initialize form state with current user data
  const [userData, setUserData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    location: user?.location || "",
    skills: user?.skills || "",
    resume_url: user?.resume_url || "",
  });

  // Track field-level validation errors
  const [fieldErrors, setFieldErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name } = userData;

    // Validate required fields
    const errors = {};
    if (!name || name.trim() === "") {
      errors.name = "Name is required";
    }

    // If there are validation errors, display them and don't submit
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    // Clear any previous errors
    setFieldErrors({});

    // Dispatch updateUser thunk - success toast is handled by the thunk
    await dispatch(
      updateUser({
        name: userData.name.trim(),
        location: userData.location.trim(),
        skills: userData.skills.trim(),
        resume_url: userData.resume_url.trim(),
      }),
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });

    // Clear error for the field being edited
    if (fieldErrors[name]) {
      setFieldErrors({ ...fieldErrors, [name]: "" });
    }
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>profile</h3>
        <div className="form-center">
          {/* Name field - required */}
          <div>
            <FormRow
              type="text"
              name="name"
              value={userData.name}
              handleChange={handleChange}
            />
            {fieldErrors.name && (
              <p className="field-error">{fieldErrors.name}</p>
            )}
          </div>

          {/* Email field - read-only */}
          <div>
            <div className="form-row">
              <label htmlFor="email" className="form-label">
                email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={userData.email}
                className="form-input"
                disabled
              />
            </div>
          </div>

          {/* Location field - optional */}
          <div>
            <FormRow
              type="text"
              name="location"
              value={userData.location}
              handleChange={handleChange}
            />
          </div>

          {/* Skills field - optional, using textarea for longer content */}
          <div>
            <FormRowTextArea
              name="skills"
              labelText="skills (comma separated)"
              value={userData.skills}
              handleChange={handleChange}
            />
          </div>

          {/* Resume URL field - optional */}
          <div>
            <FormRow
              type="url"
              name="resume_url"
              labelText="resume URL"
              value={userData.resume_url}
              handleChange={handleChange}
            />
          </div>

          {/* Submit button with loading state */}
          <button type="submit" className="btn btn-block" disabled={isLoading}>
            {isLoading ? "Saving..." : "save changes"}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default CandidateProfile;
