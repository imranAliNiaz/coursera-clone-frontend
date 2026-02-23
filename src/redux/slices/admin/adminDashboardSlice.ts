import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import adminApi from "../../../services/adminApiClient";
import { ENDPOINTS } from "../../../services/endpoints";
import type {
  AdminDashboardState,
  AnalyticsData,
  TimeseriesPoint,
} from "../../../types/admin";

const initialState: AdminDashboardState = {
  data: null,
  timeseries: [],
  loading: true,
  chartLoading: true,
  error: null,
  metric: "enrollments",
};

export const fetchAdminDashboard = createAsyncThunk(
  "adminDashboard/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const [overviewRes, timeseriesRes] = await Promise.all([
        adminApi.get(ENDPOINTS.ANALYTICS_ADMIN),
        adminApi.get(ENDPOINTS.ANALYTICS_ADMIN_TIMESERIES),
      ]);
      return {
        data: overviewRes.data as AnalyticsData,
        timeseries: (timeseriesRes.data?.timeseries || []) as TimeseriesPoint[],
      };
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || "Failed to load dashboard metrics";
      return rejectWithValue(message);
    }
  },
);

const adminDashboardSlice = createSlice({
  name: "adminDashboard",
  initialState,
  reducers: {
    setAdminDashboardMetric(
      state,
      action: { payload: "enrollments" | "revenue" },
    ) {
      state.metric = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminDashboard.pending, (state) => {
        state.loading = true;
        state.chartLoading = true;
        state.error = null;
      })
      .addCase(fetchAdminDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.chartLoading = false;
        state.data = action.payload.data;
        state.timeseries = action.payload.timeseries;
      })
      .addCase(fetchAdminDashboard.rejected, (state, action) => {
        state.loading = false;
        state.chartLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setAdminDashboardMetric } = adminDashboardSlice.actions;
export default adminDashboardSlice.reducer;
