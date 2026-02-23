import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import adminApi from "../../../services/adminApiClient";
import { ENDPOINTS } from "../../../services/endpoints";
import type { AdminUser, AdminUserForm } from "../../../types/admin";

interface AdminUsersState {
  items: AdminUser[];
  loading: boolean;
  error: string | null;
  deletingId: string | null;
}

const initialState: AdminUsersState = {
  items: [],
  loading: true,
  error: null,
  deletingId: null,
};

export const fetchAdminUsers = createAsyncThunk(
  "adminUsers/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await adminApi.get(ENDPOINTS.USERS_LIST, {
        params: { limit: 50 },
      });
      return response.data.users as AdminUser[];
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || "Failed to fetch users";
      return rejectWithValue(message);
    }
  },
);

export const createAdminUser = createAsyncThunk(
  "adminUsers/create",
  async (payload: AdminUserForm, { rejectWithValue }) => {
    try {
      const response = await adminApi.post(ENDPOINTS.USERS_LIST, payload);
      return response.data as AdminUser;
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || "Failed to create user";
      return rejectWithValue(message);
    }
  },
);

export const updateAdminUserRole = createAsyncThunk(
  "adminUsers/updateRole",
  async (payload: { userId: string; role: string }, { rejectWithValue }) => {
    try {
      await adminApi.patch(ENDPOINTS.USERS_UPDATE_ROLE(payload.userId), {
        role: payload.role,
      });
      return payload;
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || "Failed to update role";
      return rejectWithValue(message);
    }
  },
);

export const deleteAdminUser = createAsyncThunk(
  "adminUsers/delete",
  async (userId: string, { rejectWithValue }) => {
    try {
      await adminApi.delete(ENDPOINTS.USERS_BY_ID(userId));
      return userId;
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || "Failed to delete user";
      return rejectWithValue(message);
    }
  },
);

const adminUsersSlice = createSlice({
  name: "adminUsers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchAdminUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createAdminUser.fulfilled, (state, action) => {
        state.items = [action.payload, ...state.items];
      })
      .addCase(updateAdminUserRole.fulfilled, (state, action) => {
        const user = state.items.find((u) => u.id === action.payload.userId);
        if (user) user.role = action.payload.role;
      })
      .addCase(deleteAdminUser.pending, (state, action) => {
        state.deletingId = action.meta.arg;
      })
      .addCase(deleteAdminUser.fulfilled, (state, action) => {
        state.deletingId = null;
        state.items = state.items.filter((u) => u.id !== action.payload);
      })
      .addCase(deleteAdminUser.rejected, (state, action) => {
        state.deletingId = null;
        state.error = action.payload as string;
      });
  },
});

export default adminUsersSlice.reducer;
