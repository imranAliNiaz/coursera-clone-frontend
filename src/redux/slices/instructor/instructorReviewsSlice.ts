import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { reviewDashboardApi } from "../../../services/reviewDashboardApi";
import type { InstructorReview } from "../../../types/instructor";

interface InstructorReviewsState {
  items: InstructorReview[];
  loading: boolean;
  error: string | null;
}

const initialState: InstructorReviewsState = {
  items: [],
  loading: true,
  error: null,
};

export const fetchInstructorReviews = createAsyncThunk(
  "instructorReviews/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const data = await reviewDashboardApi.getInstructorReviews();
      if (Array.isArray(data)) {
        return data as InstructorReview[];
      }
      if (
        data &&
        typeof data === "object" &&
        Array.isArray((data as { reviews?: unknown }).reviews)
      ) {
        return (data as { reviews: InstructorReview[] }).reviews;
      }
      return [];
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || "Failed to load course reviews";
      return rejectWithValue(message);
    }
  },
);

const instructorReviewsSlice = createSlice({
  name: "instructorReviews",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInstructorReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInstructorReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchInstructorReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default instructorReviewsSlice.reducer;
