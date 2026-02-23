import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { courseApi } from "../../../services/courseApi";
import { enrollmentApi } from "../../../services/enrollmentApi";
import type {
  AssessmentContent,
  AssessmentLesson,
  AssessmentCourseLesson,
  AssessmentModule,
  AssessmentCourse,
  AssessmentEnrollmentProgress,
  StudentAssessmentState,
} from "../../../types/student";

const initialState: StudentAssessmentState = {
  assessment: null,
  enrollment: null,
  loading: true,
  error: null,
};

export const fetchAssessmentData = createAsyncThunk(
  "studentAssessment/fetch",
  async (
    payload: { courseId: string; assessmentId: string },
    { rejectWithValue },
  ) => {
    try {
      const [courseRes, progressRes] = await Promise.all([
        courseApi.getCourseById(payload.courseId),
        enrollmentApi.getCourseProgress(payload.courseId),
      ]);

      const course = courseRes as AssessmentCourse;
      const foundAssessment = course.modules
        ?.flatMap((m: AssessmentModule) => m.lessons)
        ?.find((l: AssessmentCourseLesson) => l.id === payload.assessmentId);

      if (!foundAssessment) {
        return rejectWithValue("Assessment not found");
      }

      let parsedContent: AssessmentContent;
      try {
        parsedContent = JSON.parse(foundAssessment.content || "{}");
      } catch {
        return rejectWithValue("Invalid assessment content format.");
      }

      return {
        assessment: { ...foundAssessment, parsedContent } as AssessmentLesson,
        enrollment: progressRes as AssessmentEnrollmentProgress,
      };
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to load assessment.";
      return rejectWithValue(message);
    }
  },
);

const studentAssessmentSlice = createSlice({
  name: "studentAssessment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAssessmentData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAssessmentData.fulfilled, (state, action) => {
        state.loading = false;
        state.assessment = action.payload.assessment;
        state.enrollment = action.payload.enrollment;
      })
      .addCase(fetchAssessmentData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default studentAssessmentSlice.reducer;
