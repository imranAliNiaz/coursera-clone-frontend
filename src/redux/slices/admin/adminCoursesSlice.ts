import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import adminApi from "../../../services/adminApiClient";
import { ENDPOINTS } from "../../../services/endpoints";
import type { AdminCourse } from "../../../types/admin";

interface AdminCoursesState {
  items: AdminCourse[];
  loading: boolean;
  error: string | null;
}

const initialState: AdminCoursesState = {
  items: [],
  loading: true,
  error: null,
};

export const fetchAdminCourses = createAsyncThunk(
  "adminCourses/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await adminApi.get(ENDPOINTS.COURSES_ADMIN_CATALOG);
      return response.data as AdminCourse[];
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || "Failed to load course catalog";
      return rejectWithValue(message);
    }
  },
);

export const deleteAdminCourse = createAsyncThunk(
  "adminCourses/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      await adminApi.delete(ENDPOINTS.COURSES_BY_ID(id));
      return id;
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || "Failed to delete course";
      return rejectWithValue(message);
    }
  },
);

const adminCoursesSlice = createSlice({
  name: "adminCourses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchAdminCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteAdminCourse.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (course) => course.id !== action.payload,
        );
      })
      .addCase(deleteAdminCourse.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export default adminCoursesSlice.reducer;
