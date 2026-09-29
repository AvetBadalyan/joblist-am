import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Wrapper from "../../assets/wrappers/RegisterPage";
import FormRow from "../../components/FormRow/FormRow";
import Logo from "../../components/Logo/Logo";
import PasswordStrength from "../../components/PasswordStrength/PasswordStrength";
import { loginUser, registerUser } from "../../features/user/userSlice";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
  // Role selection (default: candidate)
  role: "candidate",
  // Candidate-specific fields
  location: "",
  skills: "",
  resume_url: "",
  // Employer-specific fields
  company_name: "",
  company_description: "",
  company_logo_url: "",
};

function Register() {
  const [values, setValues] = useState(initialState);
  const [emailError, setEmailError] = useState("");
  const [companyNameError, setCompanyNameError] = useState("");
  // Persistent auth error (login/register) shown inline with next-step actions
  const [authError, setAuthError] = useState("");
  const { user, isLoading } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    // Editing any field clears a previous auth error
    if (authError) setAuthError("");
    // Clear email error as soon as the field becomes valid
    if (name === "email" && emailError && EMAIL_REGEX.test(value)) {
      setEmailError("");
    }
    // Clear company name error when filled
    if (name === "company_name" && companyNameError && value.trim()) {
      setCompanyNameError("");
    }
  };

  const handleRoleChange = (e) => {
    const newRole = e.target.value;
    setValues({ ...values, role: newRole });
    // Clear company name error when switching to candidate
    if (newRole === "candidate") {
      setCompanyNameError("");
    }
  };

  const handleEmailBlur = () => {
    if (values.email && !EMAIL_REGEX.test(values.email)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  const handleCompanyNameBlur = () => {
    if (values.role === "employer" && !values.company_name.trim()) {
      setCompanyNameError("Company name is required for employers");
    } else {
      setCompanyNameError("");
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setAuthError("");
    const {
      name,
      email,
      password,
      isMember,
      role,
      location,
      skills,
      resume_url,
      company_name,
      company_description,
      company_logo_url,
    } = values;

    // Basic validation for all modes
    if (!email || !password || (!isMember && !name)) {
      setAuthError("Please fill out all required fields");
      return;
    }

    // Email validation
    if (!EMAIL_REGEX.test(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    // Registration-specific validation
    if (!isMember) {
      // Password strength validation (minimum 6 characters)
      if (password.length < 6) {
        setAuthError("Password must be at least 6 characters");
        return;
      }

      // Employer must have company name
      if (role === "employer" && !company_name.trim()) {
        setCompanyNameError("Company name is required for employers");
        return;
      }
    }

    if (isMember) {
      const result = await dispatch(loginUser({ email, password }));
      if (loginUser.rejected.match(result)) {
        setAuthError(result.payload || "Invalid email or password");
      }
    } else {
      // Build registration payload with role-specific fields
      const registrationData = {
        name,
        email,
        password,
        role,
      };

      if (role === "candidate") {
        // Include candidate-specific fields (all optional)
        registrationData.location = location || null;
        registrationData.skills = skills || null;
        registrationData.resume_url = resume_url || null;
      } else if (role === "employer") {
        // Include employer-specific fields
        registrationData.company_name = company_name;
        registrationData.company_description = company_description || null;
        registrationData.company_logo_url = company_logo_url || null;
      }

      const result = await dispatch(registerUser(registrationData));
      if (registerUser.rejected.match(result)) {
        setAuthError(
          result.payload || "Registration failed. Please try again.",
        );
      }
    }
  };

  const toggleMember = () => {
    setValues({
      ...initialState,
      isMember: !values.isMember,
    });
    setEmailError("");
    setCompanyNameError("");
    setAuthError("");
  };

  useEffect(() => {
    if (!user) return undefined;
    // Brief pause lets the success toast register before redirecting
    const redirectPath = user.role === "employer" ? "/employer" : "/candidate";
    const timer = setTimeout(() => navigate(redirectPath), 2000);
    return () => clearTimeout(timer);
  }, [user, navigate]);

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isMember ? "Login" : "Register"}</h3>

        {/* Persistent auth error with contextual next steps */}
        {authError && (
          <div className="auth-error" role="alert">
            <p>{authError}</p>
            <div className="auth-error-actions">
              {values.isMember ? (
                <>
                  <Link to="/forgot-password">Forgot password?</Link>
                  <button type="button" onClick={toggleMember}>
                    Create an account
                  </button>
                </>
              ) : /already exists/i.test(authError) ? (
                <>
                  <button type="button" onClick={toggleMember}>
                    Log in instead
                  </button>
                  <Link to="/forgot-password">Reset password</Link>
                </>
              ) : null}
            </div>
          </div>
        )}

        {/* Name field (registration only) */}
        {!values.isMember && (
          <FormRow
            type="text"
            name="name"
            value={values.name}
            handleChange={handleChange}
          />
        )}

        {/* Email field */}
        <FormRow
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
          onBlur={handleEmailBlur}
        />
        {emailError && <p className="form-error">{emailError}</p>}

        {/* Password field */}
        <FormRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
        />
        {!values.isMember && <PasswordStrength password={values.password} />}

        {/* Forgot password link (login only) */}
        {values.isMember && (
          <div className="forgot-password-row">
            <Link to="/forgot-password" className="forgot-password-link">
              Forgot password?
            </Link>
          </div>
        )}

        {/* Role selection (registration only) */}
        {!values.isMember && (
          <div className="form-row">
            <label className="form-label">I am a:</label>
            <div className="role-selection">
              <label className="radio-label">
                <input
                  type="radio"
                  name="role"
                  value="candidate"
                  checked={values.role === "candidate"}
                  onChange={handleRoleChange}
                />
                <span>Job Seeker (Candidate)</span>
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="role"
                  value="employer"
                  checked={values.role === "employer"}
                  onChange={handleRoleChange}
                />
                <span>Employer</span>
              </label>
            </div>
          </div>
        )}

        {/* Candidate-specific fields (registration only, all optional) */}
        {!values.isMember && values.role === "candidate" && (
          <div className="role-fields">
            <p className="fields-note">Optional: Complete your profile</p>
            <FormRow
              type="text"
              name="location"
              labelText="Location"
              value={values.location}
              handleChange={handleChange}
            />
            <FormRow
              type="text"
              name="skills"
              labelText="Skills (comma separated)"
              value={values.skills}
              handleChange={handleChange}
            />
            <FormRow
              type="url"
              name="resume_url"
              labelText="Resume URL"
              value={values.resume_url}
              handleChange={handleChange}
            />
          </div>
        )}

        {/* Employer-specific fields (registration only) */}
        {!values.isMember && values.role === "employer" && (
          <div className="role-fields">
            <FormRow
              type="text"
              name="company_name"
              labelText="Company Name *"
              value={values.company_name}
              handleChange={handleChange}
              onBlur={handleCompanyNameBlur}
            />
            {companyNameError && (
              <p className="form-error">{companyNameError}</p>
            )}
            <p className="fields-note">Optional: Additional company info</p>
            <FormRow
              type="text"
              name="company_description"
              labelText="Company Description"
              value={values.company_description}
              handleChange={handleChange}
            />
            <FormRow
              type="url"
              name="company_logo_url"
              labelText="Company Logo URL"
              value={values.company_logo_url}
              handleChange={handleChange}
            />
          </div>
        )}

        <button type="submit" className="btn btn-block" disabled={isLoading}>
          {isLoading
            ? "loading..."
            : values.isMember
              ? "Sign In"
              : "Create Account"}
        </button>
        <p>
          {values.isMember ? "Not a member yet?" : "Already a member?"}
          <button type="button" onClick={toggleMember} className="member-btn">
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
}
export default Register;
