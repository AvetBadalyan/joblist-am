import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
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
  const { user, isLoading } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
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

  const onSubmit = (e) => {
    e.preventDefault();
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
      toast.error("Please fill out all required fields");
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
        toast.error("Password must be at least 6 characters");
        return;
      }

      // Employer must have company name
      if (role === "employer" && !company_name.trim()) {
        setCompanyNameError("Company name is required for employers");
        toast.error("Company name is required for employers");
        return;
      }
    }

    if (isMember) {
      dispatch(loginUser({ email, password }));
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

      dispatch(registerUser(registrationData));
    }
  };

  const toggleMember = () => {
    setValues({
      ...initialState,
      isMember: !values.isMember,
    });
    setEmailError("");
    setCompanyNameError("");
  };

  useEffect(() => {
    if (user) {
      // Redirect based on user role
      const redirectPath =
        user.role === "employer" ? "/employer" : "/candidate";
      setTimeout(() => navigate(redirectPath), 2000);
    }
  }, [user, navigate]);

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isMember ? "Login" : "Register"}</h3>

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
        {emailError && (
          <p
            className="form-row"
            style={{
              color: "var(--red-dark)",
              marginBottom: "0.5rem",
              fontSize: "0.875rem",
            }}
          >
            {emailError}
          </p>
        )}

        {/* Password field */}
        <FormRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
        />
        {!values.isMember && <PasswordStrength password={values.password} />}

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
              <p
                style={{
                  color: "var(--red-dark)",
                  marginBottom: "0.5rem",
                  fontSize: "0.875rem",
                  marginTop: "-0.5rem",
                }}
              >
                {companyNameError}
              </p>
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
