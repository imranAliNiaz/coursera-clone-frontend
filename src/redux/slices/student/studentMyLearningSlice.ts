import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { enrollmentApi } from "../../../services/enrollmentApi";
import { reviewApi } from "../../../services/reviewApi";
import type {
  MyLearningEnrollment,
  MyCertificate,
  StudentMyLearningState,
  SubmitCourseReviewPayload,
} from "../../../types/student";

const initialState: StudentMyLearningState = {
  enrollments: [],
  certificatesByCourseId: {},
  loading: true,
  error: null,
  reviewSubmitting: false,
  reviewError: null,
};

export const fetchMyLearning = createAsyncThunk(
  "studentMyLearning/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const enrollments =
        (await enrollmentApi.getMyEnrollments()) as MyLearningEnrollment[];
      const certMap: Record<string, MyCertificate> = {};

      (enrollments || []).forEach((e: MyLearningEnrollment) => {
        if (e.certificate && e.courseId) {
          certMap[e.courseId] = e.certificate;
        }
      });

      return {
        enrollments: enrollments || [],
        certificatesByCourseId: certMap,
      };
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Error fetching enrollments";
      return rejectWithValue(message);
    }
  },
);

export const submitCourseReview = createAsyncThunk(
  "studentMyLearning/submitReview",
  async (payload: SubmitCourseReviewPayload, { rejectWithValue }) => {
    try {
      const created = await reviewApi.createReview(payload.courseId, {
        rating: payload.rating,
        comment: payload.comment,
      });
      return { enrollmentId: payload.enrollmentId, created };
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Failed to submit review. Please try again.";
      return rejectWithValue(message);
    }
  },
);

const studentMyLearningSlice = createSlice({
  name: "studentMyLearning",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyLearning.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyLearning.fulfilled, (state, action) => {
        state.loading = false;
        state.enrollments = action.payload.enrollments;
        state.certificatesByCourseId = action.payload.certificatesByCourseId;
      })
      .addCase(fetchMyLearning.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(submitCourseReview.pending, (state) => {
        state.reviewSubmitting = true;
        state.reviewError = null;
      })
      .addCase(submitCourseReview.fulfilled, (state, action) => {
        state.reviewSubmitting = false;
        state.enrollments = state.enrollments.map((e: MyLearningEnrollment) =>
          e.id === action.payload.enrollmentId
            ? {
                ...e,
                hasReviewed: true,
                myRating: action.payload.created.rating,
              }
            : e,
        );
      })
      .addCase(submitCourseReview.rejected, (state, action) => {
        state.reviewSubmitting = false;
        state.reviewError = action.payload as string;
      });
  },
});

export default studentMyLearningSlice.reducer;
