import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { analyticsApi } from "../../../services/analyticsApi";
import type {
  TimeseriesPoint,
  InstructorInsights,
} from "../../../types/instructor";

interface InstructorAnalyticsState {
  timeseries: TimeseriesPoint[];
  insights: InstructorInsights | null;
  loading: boolean;
  error: string | null;
  metric: "enrollments" | "revenue";
}

const initialState: InstructorAnalyticsState = {
  timeseries: [],
  insights: null,
  loading: true,
  error: null,
  metric: "enrollments",
};

export const fetchInstructorAnalytics = createAsyncThunk(
  "instructorAnalytics/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const data = await analyticsApi.getInstructorTimeseries();
      return {
        timeseries: (data?.timeseries || []) as TimeseriesPoint[],
        insights: (data?.insights || null) as InstructorInsights | null,
      };
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || "Failed to load instructor analytics";
      return rejectWithValue(message);
    }
  },
);

const instructorAnalyticsSlice = createSlice({
  name: "instructorAnalytics",
  initialState,
  reducers: {
    setInstructorAnalyticsMetric(
      state,
      action: { payload: "enrollments" | "revenue" },
    ) {
      state.metric = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInstructorAnalytics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInstructorAnalytics.fulfilled, (state, action) => {
        state.loading = false;
        state.timeseries = action.payload.timeseries;
        state.insights = action.payload.insights;
      })
      .addCase(fetchInstructorAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setInstructorAnalyticsMetric } =
  instructorAnalyticsSlice.actions;
export default instructorAnalyticsSlice.reducer;
