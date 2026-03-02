import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import adminApi from "../../../services/adminApiClient";
import { ENDPOINTS } from "../../../services/endpoints";
import type { AdminInstructor } from "../../../types/admin";

interface AdminInstructorsState {
  items: AdminInstructor[];
  loading: boolean;
  error: string | null;
}

const initialState: AdminInstructorsState = {
  items: [],
  loading: true,
  error: null,
};

export const fetchAdminInstructors = createAsyncThunk(
  "adminInstructors/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await adminApi.get(ENDPOINTS.USERS_LIST, {
        params: { role: "instructor", limit: 50 },
      });
      return response.data.users as AdminInstructor[];
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || "Failed to load instructor network";
      return rejectWithValue(message);
    }
  },
);

export const deleteAdminInstructor = createAsyncThunk(
  "adminInstructors/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      await adminApi.delete(ENDPOINTS.USERS_BY_ID(id));
      return id;
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || "Failed to remove instructor";
      return rejectWithValue(message);
    }
  },
);

const adminInstructorsSlice = createSlice({
  name: "adminInstructors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminInstructors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminInstructors.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchAdminInstructors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteAdminInstructor.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (instructor) => instructor.id !== action.payload,
        );
      })
      .addCase(deleteAdminInstructor.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export default adminInstructorsSlice.reducer;
