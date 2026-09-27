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
const initialState = {
  isLoading: false,
  isSidebarOpen: false,
  user: getUserFromLocalStorage(),
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
export const clearStore = createAsyncThunk("user/clearStore", clearStoreThunk);
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    logoutUser: (state, { payload }) => {
      state.user = null;
      state.isSidebarOpen = false;
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
      .addCase(clearStore.rejected, () => {
        toast.error("There was an error..");
      });
  },
});

export const { toggleSidebar, logoutUser, setUser, updateUserProfile } =
  userSlice.actions;
export default userSlice.reducer;
