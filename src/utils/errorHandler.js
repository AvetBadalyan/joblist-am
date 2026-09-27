import { clearStore } from "../features/user/userSlice";

export const handleSupabaseError = (error, thunkAPI) => {
  // Auth errors - login
  if (
    error.message?.includes("Invalid login credentials") ||
    error.code === "invalid_credentials"
  ) {
    return thunkAPI.rejectWithValue("Invalid email or password");
  }
  if (
    error.message?.includes("no user found") ||
    error.message?.includes("No user found") ||
    error.code === "user_not_found"
  ) {
    return thunkAPI.rejectWithValue("No account found with this email");
  }
  if (
    error.message?.includes("Email not confirmed") ||
    error.code === "email_not_confirmed"
  ) {
    return thunkAPI.rejectWithValue(
      "Please verify your email before signing in",
    );
  }
  if (error.code === "user_banned" || error.message?.includes("banned")) {
    return thunkAPI.rejectWithValue("This account has been suspended");
  }

  // Auth errors - registration
  if (
    error.message?.includes("already registered") ||
    error.code === "email_exists"
  ) {
    return thunkAPI.rejectWithValue(
      "An account with this email already exists",
    );
  }
  if (
    error.message?.includes("Unable to validate email address") ||
    error.message?.includes("invalid email") ||
    error.code === "email_address_invalid"
  ) {
    return thunkAPI.rejectWithValue("Please enter a valid email address");
  }
  if (
    error.message?.includes("Password should be at least") ||
    error.code === "weak_password"
  ) {
    return thunkAPI.rejectWithValue("Password must be at least 6 characters");
  }
  if (error.code === "signup_disabled") {
    return thunkAPI.rejectWithValue(
      "Account registration is currently disabled",
    );
  }

  // Rate limiting errors
  if (error.code === "over_request_rate_limit") {
    return thunkAPI.rejectWithValue(
      "Too many requests. Please wait a moment and try again.",
    );
  }
  if (error.code === "over_email_send_rate_limit") {
    return thunkAPI.rejectWithValue(
      "Too many emails sent. Please wait a few minutes.",
    );
  }

  // RLS / authorization errors
  if (error.code === "PGRST301" || error.status === 401) {
    thunkAPI.dispatch(clearStore());
    return thunkAPI.rejectWithValue("Unauthorized! Logging out...");
  }

  // Network errors
  if (
    error.message?.includes("Failed to fetch") ||
    error.message?.includes("NetworkError")
  ) {
    return thunkAPI.rejectWithValue(
      "Network error. Please check your connection and try again.",
    );
  }

  // Generic error
  return thunkAPI.rejectWithValue(error.message || "Something went wrong");
};
