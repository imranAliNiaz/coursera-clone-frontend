import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { courseApi } from "../../../services/courseApi";
import type {
  CourseDetailsCourse,
  StudentCourseDetailsState,
} from "../../../types/student";

const initialState: StudentCourseDetailsState = {
  course: null,
  seriesCourses: [],
  loading: true,
  error: null,
  currentCourseId: null,
};

export const fetchCourseDetails = createAsyncThunk(
  "studentCourseDetails/fetch",
  async (courseId: string, { rejectWithValue }) => {
    try {
      const data = await courseApi.getCourseById(courseId);
      return { courseId, course: data as CourseDetailsCourse };
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Error fetching course details";
      return rejectWithValue(message);
    }
  },
);

export const fetchCourseSeries = createAsyncThunk(
  "studentCourseDetails/fetchSeries",
  async (courseId: string, { rejectWithValue }) => {
    try {
      const result = await courseApi.getCourses({ limit: 6 });
      const items = (result?.courses || [])
        .filter((c: CourseDetailsCourse) => c.id !== courseId)
        .slice(0, 4);
      return { courseId, seriesCourses: items as CourseDetailsCourse[] };
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Error fetching course series";
      return rejectWithValue(message);
    }
  },
);

const studentCourseDetailsSlice = createSlice({
  name: "studentCourseDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourseDetails.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        state.currentCourseId = action.meta.arg;
      })
      .addCase(fetchCourseDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.course = action.payload.course;
        state.currentCourseId = action.payload.courseId;
      })
      .addCase(fetchCourseDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchCourseSeries.fulfilled, (state, action) => {
        if (state.currentCourseId === action.payload.courseId) {
          state.seriesCourses = action.payload.seriesCourses;
        }
      });
  },
});

export default studentCourseDetailsSlice.reducer;
