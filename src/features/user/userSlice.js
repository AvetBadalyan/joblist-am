import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from "../../utils/localStorage";
import {
  clearStoreThunk,
  loginUserThunk,
  registerUserThunk,
  requestPasswordResetThunk,
  updatePasswordThunk,
  updateUserThunk,
} from "./userThunk";

// User shape stored in Redux state (Supabase):
// {
//   id: 'uuid',
//   email: 'user@example.com',
//   name: 'John Doe',
//   role: 'candidate' | 'employer',
//   location: 'Yerevan',
//   // Candidate-specific fields
//   skills: 'React, Node.js',
//   resume_url: 'https://...',
//   // Employer-specific fields
//   company_name: 'TechCorp',
//   company_description: '...',
//   company_logo_url: 'https://...'
// }
// Session management is handled by Supabase client — no token stored here.
const cachedUser = getUserFromLocalStorage();

const initialState = {
  isLoading: false,
  // True until Supabase resolves the initial session on first load. When we
  // already have a cached user there is no redirect flash to guard against,
  // so we can start ready. Without a cache, ProtectedRoute waits on this so a
  // returning-but-uncached user isn't bounced to /register before the profile
  // fetch completes.
  isInitializing: !cachedUser,
  user: cachedUser,
};

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user, thunkAPI) => {
    return registerUserThunk(user, thunkAPI);
  },
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user, thunkAPI) => {
    return loginUserThunk(user, thunkAPI);
  },
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (user, thunkAPI) => {
    return updateUserThunk(user, thunkAPI);
  },
);
export const requestPasswordReset = createAsyncThunk(
  "user/requestPasswordReset",
  async (email, thunkAPI) => {
    return requestPasswordResetThunk(email, thunkAPI);
  },
);

export const updatePassword = createAsyncThunk(
  "user/updatePassword",
  async (password, thunkAPI) => {
    return updatePasswordThunk(password, thunkAPI);
  },
);

export const clearStore = createAsyncThunk("user/clearStore", clearStoreThunk);
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state, { payload }) => {
      state.user = null;
      // Supabase session is managed by the Supabase client;
      // here we only clear the cached user profile from localStorage.
      removeUserFromLocalStorage();
      if (payload) {
        toast.success(payload);
      }
    },
    // Set user profile directly (used by auth listener on session restore)
    setUser: (state, { payload }) => {
      state.user = payload;
      if (payload) {
        addUserToLocalStorage(payload);
      } else {
        removeUserFromLocalStorage();
      }
    },
    // Update specific fields in the user profile
    updateUserProfile: (state, { payload }) => {
      if (state.user) {
        state.user = { ...state.user, ...payload };
        addUserToLocalStorage(state.user);
      }
    },
    // Marks the end of initial session resolution (called by the auth listener
    // once Supabase has reported INITIAL_SESSION, with or without a session).
    finishInitializing: (state) => {
      state.isInitializing = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        const { user } = payload;
        state.isLoading = false;
        state.user = user;
        addUserToLocalStorage(user);
        toast.success(`Hello There ${user.name}`);
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        const { user } = payload;
        state.isLoading = false;
        state.user = user;
        addUserToLocalStorage(user);

        toast.success(`Welcome Back ${user.name}`);
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        const { user } = payload;
        state.isLoading = false;
        state.user = user;
        addUserToLocalStorage(user);

        toast.success(`User Updated!`);
      })
      .addCase(updateUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(requestPasswordReset.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(requestPasswordReset.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(requestPasswordReset.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload || "Couldn't send reset email. Please try again.");
      })
      .addCase(updatePassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePassword.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updatePassword.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload || "Couldn't update password. Please try again.");
      })
      .addCase(clearStore.rejected, () => {
        toast.error("There was an error..");
      });
  },
});

export const { logoutUser, setUser, updateUserProfile, finishInitializing } =
  userSlice.actions;
export default userSlice.reducer;
