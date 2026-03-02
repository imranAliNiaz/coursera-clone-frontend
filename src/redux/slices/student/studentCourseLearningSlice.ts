import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { courseApi } from "../../../services/courseApi";
import { enrollmentApi } from "../../../services/enrollmentApi";
import type {
  CourseLearningCourse,
  CourseProgress,
  StudentCourseLearningState,
} from "../../../types/student";

const initialState: StudentCourseLearningState = {
  course: null,
  progressData: null,
  learningObjectives: [],
  loading: true,
  error: null,
  currentCourseId: null,
};

const normalizeLearningObjectives = (
  rawOutcomes: CourseLearningCourse["outcomes"],
) => {
  if (Array.isArray(rawOutcomes)) {
    return rawOutcomes.filter(Boolean);
  }
  if (typeof rawOutcomes === "string") {
    return rawOutcomes
      .split(/\r?\n|Ã¢â‚¬Â¢|- /g)
      .map((s: string) => s.trim())
      .filter(Boolean);
  }
  return [];
};

export const fetchCourseLearning = createAsyncThunk(
  "studentCourseLearning/fetch",
  async (courseId: string, { rejectWithValue }) => {
    try {
      const [courseRes, progressRes] = await Promise.all([
        courseApi.getCourseById(courseId),
        enrollmentApi.getCourseProgress(courseId),
      ]);
      return {
        courseId,
        course: courseRes as CourseLearningCourse,
        progressData: progressRes as CourseProgress | null,
        learningObjectives: normalizeLearningObjectives(
          (courseRes as CourseLearningCourse)?.outcomes,
        ),
      };
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to fetch course data";
      return rejectWithValue(message);
    }
  },
);

const studentCourseLearningSlice = createSlice({
  name: "studentCourseLearning",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourseLearning.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        state.currentCourseId = action.meta.arg;
      })
      .addCase(fetchCourseLearning.fulfilled, (state, action) => {
        state.loading = false;
        state.course = action.payload.course;
        state.progressData = action.payload.progressData;
        state.learningObjectives = action.payload.learningObjectives;
        state.currentCourseId = action.payload.courseId;
      })
      .addCase(fetchCourseLearning.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default studentCourseLearningSlice.reducer;
