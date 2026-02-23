import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import axios from "axios";
import { ENDPOINTS } from "../../../services/endpoints";
import type { LoginPayload, User } from "./types";
import instructorApi from "../../../services/instructorApiClient";

const API_URL = import.meta.env.VITE_API_BASE_URL || "/api/v1";

interface InstructorAuthState {
  token: string | null;
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: InstructorAuthState = {
  token: localStorage.getItem("instructorToken"),
  user: JSON.parse(localStorage.getItem("instructorUser") || "null"),
  isLoading: false,
  error: null,
};

export const loginInstructor = createAsyncThunk(
  "instructorAuth/login",
  async (payload: LoginPayload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}${ENDPOINTS.AUTH_LOGIN}`,
        payload,
      );
      const data = response.data;
      if (data.user.role.toLowerCase() !== "instructor") {
        return rejectWithValue("Access restricted to instructors.");
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

export const logoutInstructor = createAsyncThunk(
  "instructorAuth/logout",
  async () => {
    localStorage.removeItem("instructorToken");
    localStorage.removeItem("instructorUser");
    return null;
  },
);

export const changeInstructorPassword = createAsyncThunk(
  "instructorAuth/changePassword",
  async (
    payload: { currentPassword: string; newPassword: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await instructorApi.patch(
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

export const updateInstructorProfile = createAsyncThunk(
  "instructorAuth/updateProfile",
  async (payload: { name: string }, { rejectWithValue }) => {
    try {
      const response = await instructorApi.patch(
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

const instructorAuthSlice = createSlice({
  name: "instructorAuth",
  initialState,
  reducers: {
    setInstructorSession(
      state,
      action: PayloadAction<{ user: User; token: string }>,
    ) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("instructorToken", action.payload.token);
      localStorage.setItem(
        "instructorUser",
        JSON.stringify(action.payload.user),
      );
      state.error = null;
    },
    clearInstructorError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginInstructor.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginInstructor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        localStorage.setItem("instructorToken", action.payload.token);
        localStorage.setItem(
          "instructorUser",
          JSON.stringify(action.payload.user),
        );
      })
      .addCase(loginInstructor.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(updateInstructorProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateInstructorProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedUser = {
          ...state.user,
          ...action.payload,
        } as User;
        state.user = updatedUser;
        localStorage.setItem("instructorUser", JSON.stringify(updatedUser));
      })
      .addCase(updateInstructorProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(logoutInstructor.fulfilled, (state) => {
        state.token = null;
        state.user = null;
        state.error = null;
      });
  },
});

export const { setInstructorSession, clearInstructorError } =
  instructorAuthSlice.actions;
export default instructorAuthSlice.reducer;
