import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { reviewDashboardApi } from "../../../services/reviewDashboardApi";
import type { AdminReview } from "../../../types/admin";

interface AdminReviewsState {
  items: AdminReview[];
  loading: boolean;
  error: string | null;
}

const initialState: AdminReviewsState = {
  items: [],
  loading: true,
  error: null,
};

export const fetchAdminReviews = createAsyncThunk(
  "adminReviews/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const data = await reviewDashboardApi.getAdminReviews();
      if (Array.isArray(data)) {
        return data as AdminReview[];
      }
      if (
        data &&
        typeof data === "object" &&
        Array.isArray((data as { reviews?: unknown }).reviews)
      ) {
        return (data as { reviews: AdminReview[] }).reviews;
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

const adminReviewsSlice = createSlice({
  name: "adminReviews",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchAdminReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default adminReviewsSlice.reducer;
