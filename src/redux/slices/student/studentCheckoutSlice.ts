import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { courseApi } from "../../../services/courseApi";
import api from "../../../services/apiClient";
import { ENDPOINTS } from "../../../services/endpoints";
import type {
  CheckoutCourse,
  StudentCheckoutState,
} from "../../../types/student";

const initialState: StudentCheckoutState = {
  course: null,
  studentName: "",
  loading: true,
  error: null,
  currentCourseId: null,
};

export const fetchCheckoutData = createAsyncThunk(
  "studentCheckout/fetch",
  async (courseId: string, { rejectWithValue }) => {
    try {
      const [course, profileRes] = await Promise.all([
        courseApi.getCourseById(courseId),
        api.get(ENDPOINTS.USERS_ME),
      ]);
      return {
        courseId,
        course: course as CheckoutCourse,
        studentName: profileRes.data?.name || "",
      };
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Error fetching checkout data";
      return rejectWithValue(message);
    }
  },
);

const studentCheckoutSlice = createSlice({
  name: "studentCheckout",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCheckoutData.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        state.currentCourseId = action.meta.arg;
      })
      .addCase(fetchCheckoutData.fulfilled, (state, action) => {
        state.loading = false;
        state.course = action.payload.course;
        state.studentName = action.payload.studentName;
        state.currentCourseId = action.payload.courseId;
      })
      .addCase(fetchCheckoutData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default studentCheckoutSlice.reducer;
