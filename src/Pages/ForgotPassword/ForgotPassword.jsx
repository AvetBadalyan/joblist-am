import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Wrapper from "../../assets/wrappers/RegisterPage";
import FormRow from "../../components/FormRow/FormRow";
import Logo from "../../components/Logo/Logo";
import { requestPasswordReset } from "../../features/user/userSlice";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * ForgotPassword
 *
 * Lets a user request a password-reset email. On success we show a neutral
 * "check your inbox" confirmation (Supabase intentionally doesn't reveal
 * whether the email is registered, which avoids account enumeration).
 */
function ForgotPassword() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((store) => store.user);

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!EMAIL_REGEX.test(email)) {
      setError("Please enter a valid email address");
      return;
    }
    setError("");

    const result = await dispatch(requestPasswordReset(email));
    if (requestPasswordReset.fulfilled.match(result)) {
      setSent(true);
    }
  };

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={handleSubmit}>
        <Logo />
        <h3>Reset your password</h3>

        {sent ? (
          <>
            <p className="auth-hint" role="status">
              If an account exists for <strong>{email}</strong>, we&rsquo;ve
              sent a link to reset your password. Check your inbox (and spam
              folder).
            </p>
            <Link to="/register" className="btn btn-block">
              Back to Login
            </Link>
          </>
        ) : (
          <>
            <p className="auth-hint">
              Enter the email for your account and we&rsquo;ll send you a link
              to set a new password.
            </p>

            <FormRow
              type="email"
              name="email"
              labelText="Email"
              value={email}
              handleChange={(e) => {
                setEmail(e.target.value);
                if (error && EMAIL_REGEX.test(e.target.value)) setError("");
              }}
            />
            {error && (
              <p className="form-error" role="alert">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="btn btn-block"
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send reset link"}
            </button>

            <p className="auth-alt">
              Remembered it?
              <Link to="/register" className="member-btn">
                Back to Login
              </Link>
            </p>
          </>
        )}
      </form>
    </Wrapper>
  );
}

export default ForgotPassword;
