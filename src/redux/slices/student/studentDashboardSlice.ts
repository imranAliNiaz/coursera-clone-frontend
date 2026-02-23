import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { courseApi } from "../../../services/courseApi";
import { enrollmentApi } from "../../../services/enrollmentApi";
import { IMAGES } from "../../../constants/images";
import type {
  DashboardCourseSummary,
  StudentDashboardState,
} from "../../../types/student";

const initialState: StudentDashboardState = {
  recentlyViewed: [],
  mostPopular: [],
  personalized: [],
  enrollments: [],
  loading: true,
  error: null,
};

export const fetchStudentDashboard = createAsyncThunk(
  "studentDashboard/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const recentlyViewedData =
        (await courseApi.getRecentlyViewed()) as DashboardCourseSummary[];
      const formattedRecent = recentlyViewedData.map(
        (course: DashboardCourseSummary, index: number) => ({
          title: course.title,
          provider: "Google",
          image: course.thumbnail,
          logo: IMAGES.LOGOS.GOOGLE_LOGO,
          badge: "Free Trial",
          type: index < 2 ? "Specialization" : "Professional Certificate",
          showBuildTowardDegree: true,
        }),
      );

      const popularResult = await courseApi.getCourses({
        limit: 12,
        sortBy: "popularity",
      });
      const formattedPopular = (popularResult.courses || []).map(
        (course: DashboardCourseSummary) => ({
          title: course.title,
          provider: "Google",
          image: course.thumbnail,
          logo: IMAGES.LOGOS.GOOGLE_LOGO,
          badge: "Free Trial",
          showAiBadge: true,
          type: "Professional Certificate",
        }),
      );

      const personalizedData =
        (await courseApi.getRecommendations()) as DashboardCourseSummary[];
      const formattedPersonalized = personalizedData.map(
        (course: DashboardCourseSummary) => ({
          title: course.title,
          provider: "Google",
          image: course.thumbnail,
          logo: IMAGES.LOGOS.GOOGLE_LOGO,
          badge: "Free Trial",
          showAiBadge: true,
          type: "Specialization",
        }),
      );

      const enrollments = (await enrollmentApi.getMyEnrollments()) || [];

      return {
        recentlyViewed: formattedRecent,
        mostPopular: formattedPopular,
        personalized: formattedPersonalized,
        enrollments,
      };
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Error fetching dashboard data";
      return rejectWithValue(message);
    }
  },
);

const studentDashboardSlice = createSlice({
  name: "studentDashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudentDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudentDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.recentlyViewed = action.payload.recentlyViewed;
        state.mostPopular = action.payload.mostPopular;
        state.personalized = action.payload.personalized;
        state.enrollments = action.payload.enrollments;
      })
      .addCase(fetchStudentDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default studentDashboardSlice.reducer;
