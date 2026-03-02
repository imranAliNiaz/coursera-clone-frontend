import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { analyticsApi } from "../../../services/analyticsApi";
import type { InstructorOverview } from "../../../types/instructor";

interface InstructorDashboardState {
  overview: InstructorOverview | null;
  loading: boolean;
  error: string | null;
}

const initialState: InstructorDashboardState = {
  overview: null,
  loading: true,
  error: null,
};

export const fetchInstructorOverview = createAsyncThunk(
  "instructorDashboard/fetchOverview",
  async (_, { rejectWithValue }) => {
    try {
      const data = await analyticsApi.getInstructorOverview();
      return data?.overview || null;
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || "Failed to load instructor analytics";
      return rejectWithValue(message);
    }
  },
);

const instructorDashboardSlice = createSlice({
  name: "instructorDashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInstructorOverview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInstructorOverview.fulfilled, (state, action) => {
        state.loading = false;
        state.overview = action.payload;
      })
      .addCase(fetchInstructorOverview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default instructorDashboardSlice.reducer;
