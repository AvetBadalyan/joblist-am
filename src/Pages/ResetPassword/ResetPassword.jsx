import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Wrapper from "../../assets/wrappers/RegisterPage";
import FormRow from "../../components/FormRow/FormRow";
import Logo from "../../components/Logo/Logo";
import { updatePassword } from "../../features/user/userSlice";

const MIN_PASSWORD_LENGTH = 6;

/**
 * ResetPassword
 *
 * Destination of the reset link from the email. Supabase establishes a
 * temporary recovery session when the link is followed, so updateUser can
 * set a new password without the old one. On success we send the user to log in.
 */
function ResetPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((store) => store.user);

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < MIN_PASSWORD_LENGTH) {
      setError(`Password must be at least ${MIN_PASSWORD_LENGTH} characters`);
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }
    setError("");

    const result = await dispatch(updatePassword(password));
    if (updatePassword.fulfilled.match(result)) {
      toast.success("Password updated. Please log in.");
      navigate("/register");
    }
  };

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={handleSubmit}>
        <Logo />
        <h3>Set a new password</h3>

        <p className="auth-hint">
          Choose a new password for your account.
        </p>

        <FormRow
          type="password"
          name="password"
          labelText="New password"
          value={password}
          handleChange={(e) => setPassword(e.target.value)}
        />
        <FormRow
          type="password"
          name="confirm"
          labelText="Confirm new password"
          value={confirm}
          handleChange={(e) => setConfirm(e.target.value)}
        />
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}

        <button type="submit" className="btn btn-block" disabled={isLoading}>
          {isLoading ? "Updating..." : "Update password"}
        </button>

        <p className="auth-alt">
          Changed your mind?
          <Link to="/register" className="member-btn">
            Back to Login
          </Link>
        </p>
      </form>
    </Wrapper>
  );
}

export default ResetPassword;
