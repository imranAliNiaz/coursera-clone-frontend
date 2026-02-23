import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { courseApi } from "../../../services/courseApi";
import { enrollmentApi } from "../../../services/enrollmentApi";
import type {
  CourseContentCourse,
  CourseContentProgress,
  StudentCourseContentState,
  CourseContentUpdateLessonProgressPayload,
} from "../../../types/student";

const initialState: StudentCourseContentState = {
  course: null,
  progressData: null,
  loading: true,
  error: null,
  currentCourseId: null,
};

export const fetchCourseContent = createAsyncThunk(
  "studentCourseContent/fetch",
  async (courseId: string, { rejectWithValue }) => {
    try {
      const [courseRes, progressRes] = await Promise.all([
        courseApi.getCourseById(courseId),
        enrollmentApi.getCourseProgress(courseId),
      ]);
      return {
        courseId,
        course: courseRes as CourseContentCourse,
        progressData: progressRes as CourseContentProgress | null,
      };
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to fetch course data";
      return rejectWithValue(message);
    }
  },
);

export const refreshCourseProgress = createAsyncThunk(
  "studentCourseContent/refreshProgress",
  async (courseId: string, { rejectWithValue }) => {
    try {
      const progressRes = await enrollmentApi.getCourseProgress(courseId);
      return {
        courseId,
        progressData: progressRes as CourseContentProgress | null,
      };
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to refresh progress";
      return rejectWithValue(message);
    }
  },
);

export const updateLessonProgress = createAsyncThunk(
  "studentCourseContent/updateLessonProgress",
  async (
    payload: CourseContentUpdateLessonProgressPayload,
    { rejectWithValue },
  ) => {
    try {
      await enrollmentApi.updateLessonProgress(
        payload.enrollmentId,
        payload.lessonId,
        payload.data,
      );
      const progressRes = await enrollmentApi.getCourseProgress(
        payload.courseId,
      );
      return {
        courseId: payload.courseId,
        progressData: progressRes as CourseContentProgress | null,
      };
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to update progress";
      return rejectWithValue(message);
    }
  },
);

const studentCourseContentSlice = createSlice({
  name: "studentCourseContent",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourseContent.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        state.currentCourseId = action.meta.arg;
      })
      .addCase(fetchCourseContent.fulfilled, (state, action) => {
        state.loading = false;
        state.course = action.payload.course;
        state.progressData = action.payload.progressData;
        state.currentCourseId = action.payload.courseId;
      })
      .addCase(fetchCourseContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(refreshCourseProgress.fulfilled, (state, action) => {
        if (state.currentCourseId === action.payload.courseId) {
          state.progressData = action.payload.progressData;
        }
      })
      .addCase(updateLessonProgress.fulfilled, (state, action) => {
        if (state.currentCourseId === action.payload.courseId) {
          state.progressData = action.payload.progressData;
        }
      });
  },
});

export default studentCourseContentSlice.reducer;
