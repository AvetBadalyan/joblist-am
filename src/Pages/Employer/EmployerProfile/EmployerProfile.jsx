import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Wrapper from "../../../assets/wrappers/DashboardFormPage";
import FormRow from "../../../components/FormRow/FormRow";
import FormRowTextArea from "../../../components/FormRowTextArea/FormRowTextArea";
import { updateUser } from "../../../features/user/userSlice";

/**
 * EmployerProfile Component
 * Allows employers to view and edit their company profile information.
 *
 * Features:
 * - Pre-filled form with current profile data
 * - Editable fields: name, company_name, company_description, company_logo_url
 * - Read-only email field (styled differently)
 * - Note: company name change does NOT update existing job listings
 * - Save button dispatches updateUser thunk
 * - Success toast shown via updateUser thunk
 * - Validation for required fields (name, company_name)
 * - Loading state during save
 *
 */
const EmployerProfile = () => {
  const { isLoading, user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  // Initialize form state with current user data
  const [userData, setUserData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    company_name: user?.company_name || "",
    company_description: user?.company_description || "",
    company_logo_url: user?.company_logo_url || "",
  });

  // Track field-level validation errors
  const [fieldErrors, setFieldErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, company_name } = userData;

    // Validate required fields
    const errors = {};
    if (!name || name.trim() === "") {
      errors.name = "Name is required";
    }
    if (!company_name || company_name.trim() === "") {
      errors.company_name = "Company name is required";
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
        company_name: userData.company_name.trim(),
        company_description: userData.company_description.trim(),
        company_logo_url: userData.company_logo_url.trim(),
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
        <h3>Company Profile</h3>
        <div className="form-center">
          {/* Name field - required */}
          <div>
            <FormRow
              type="text"
              name="name"
              labelText="Contact Name *"
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

          {/* Company Name field - required */}
          <div>
            <FormRow
              type="text"
              name="company_name"
              labelText="Company Name *"
              value={userData.company_name}
              handleChange={handleChange}
            />
            {fieldErrors.company_name && (
              <p className="field-error">{fieldErrors.company_name}</p>
            )}
            {/* Changing company name does not retroactively update existing job listings */}
            <p className="field-note">
              Note: Changing company name will not update existing job listings
            </p>
          </div>

          {/* Company Logo URL field - optional */}
          <div>
            <FormRow
              type="url"
              name="company_logo_url"
              labelText="Company Logo URL"
              value={userData.company_logo_url}
              handleChange={handleChange}
            />
          </div>

          {/* Company Description field - optional, using textarea for longer content */}
          <div className="form-full-width">
            <FormRowTextArea
              name="company_description"
              labelText="Company Description"
              value={userData.company_description}
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

export default EmployerProfile;
