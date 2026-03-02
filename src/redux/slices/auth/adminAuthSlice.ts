import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import axios from "axios"; // Use generic axios for initial login, or adminApi if we want consistent base URL
import { ENDPOINTS } from "../../../services/endpoints";
import type { LoginPayload, User } from "./types";
import adminApi from "../../../services/adminApiClient";

// Helper to use correct base URL
const API_URL = import.meta.env.VITE_API_BASE_URL || "/api/v1";

interface AdminAuthState {
  token: string | null;
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AdminAuthState = {
  token: localStorage.getItem("adminToken"),
  user: JSON.parse(localStorage.getItem("adminUser") || "null"),
  isLoading: false,
  error: null,
};

export const loginAdmin = createAsyncThunk(
  "adminAuth/login",
  async (payload: LoginPayload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}${ENDPOINTS.AUTH_LOGIN}`,
        payload,
      );
      const data = response.data;
      if (data.user.role.toLowerCase() !== "admin") {
        return rejectWithValue("Access restricted to administrators.");
      }
      return data;
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || "Login failed";
      return rejectWithValue(message);
    }
  },
);

export const logoutAdmin = createAsyncThunk("adminAuth/logout", async () => {
  localStorage.removeItem("adminToken");
  localStorage.removeItem("adminUser");
  return null;
});

export const changeAdminPassword = createAsyncThunk(
  "adminAuth/changePassword",
  async (
    payload: { currentPassword: string; newPassword: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await adminApi.patch(
        ENDPOINTS.AUTH_CHANGE_PASSWORD,
        payload,
      );
      return response.data;
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || "Failed to update password";
      return rejectWithValue(message);
    }
  },
);

export const updateAdminProfile = createAsyncThunk(
  "adminAuth/updateProfile",
  async (payload: { name: string }, { rejectWithValue }) => {
    try {
      const response = await adminApi.patch(
        ENDPOINTS.USERS_UPDATE_PROFILE,
        payload,
      );
      return response.data;
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || "Failed to update profile";
      return rejectWithValue(message);
    }
  },
);

const adminAuthSlice = createSlice({
  name: "adminAuth",
  initialState,
  reducers: {
    // Synchronous action to set session manually (e.g. from generic login)
    setAdminSession(
      state,
      action: PayloadAction<{ user: User; token: string }>,
    ) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("adminToken", action.payload.token);
      localStorage.setItem("adminUser", JSON.stringify(action.payload.user));
      state.error = null;
    },
    clearAdminError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        localStorage.setItem("adminToken", action.payload.token);
        localStorage.setItem("adminUser", JSON.stringify(action.payload.user));
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(updateAdminProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateAdminProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedUser = {
          ...state.user,
          ...action.payload,
        } as User;
        state.user = updatedUser;
        localStorage.setItem("adminUser", JSON.stringify(updatedUser));
      })
      .addCase(updateAdminProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(logoutAdmin.fulfilled, (state) => {
        state.token = null;
        state.user = null;
        state.error = null;
      });
  },
});

export const { setAdminSession, clearAdminError } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;
