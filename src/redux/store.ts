import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth/authSlice";
import adminAuthReducer from "./slices/auth/adminAuthSlice";
import instructorAuthReducer from "./slices/auth/instructorAuthSlice";
import adminDashboardReducer from "./slices/admin/adminDashboardSlice";
import adminCoursesReducer from "./slices/admin/adminCoursesSlice";
import adminUsersReducer from "./slices/admin/adminUsersSlice";
import adminReviewsReducer from "./slices/admin/adminReviewsSlice";
import adminInstructorsReducer from "./slices/admin/adminInstructorsSlice";
import instructorDashboardReducer from "./slices/instructor/instructorDashboardSlice";
import instructorAnalyticsReducer from "./slices/instructor/instructorAnalyticsSlice";
import instructorCoursesReducer from "./slices/instructor/instructorCoursesSlice";
import instructorReviewsReducer from "./slices/instructor/instructorReviewsSlice";
import studentDashboardReducer from "./slices/student/studentDashboardSlice";
import studentMyLearningReducer from "./slices/student/studentMyLearningSlice";
import studentCourseDetailsReducer from "./slices/student/studentCourseDetailsSlice";
import studentCourseLearningReducer from "./slices/student/studentCourseLearningSlice";
import studentCourseContentReducer from "./slices/student/studentCourseContentSlice";
import studentSearchReducer from "./slices/student/studentSearchSlice";
import studentCheckoutReducer from "./slices/student/studentCheckoutSlice";
import studentAssessmentReducer from "./slices/student/studentAssessmentSlice";
import studentAssessmentResultReducer from "./slices/student/studentAssessmentResultSlice";
import studentCertificateReducer from "./slices/student/studentCertificateSlice";
import studentUpdatesReducer from "./slices/student/studentUpdatesSlice";
import studentProfileReducer from "./slices/student/studentProfileSlice";
import studentCertificateVerifyReducer from "./slices/student/studentCertificateVerifySlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    adminAuth: adminAuthReducer,
    instructorAuth: instructorAuthReducer,
    adminDashboard: adminDashboardReducer,
    adminCourses: adminCoursesReducer,
    adminUsers: adminUsersReducer,
    adminReviews: adminReviewsReducer,
    adminInstructors: adminInstructorsReducer,
    instructorDashboard: instructorDashboardReducer,
    instructorAnalytics: instructorAnalyticsReducer,
    instructorCourses: instructorCoursesReducer,
    instructorReviews: instructorReviewsReducer,
    studentDashboard: studentDashboardReducer,
    studentMyLearning: studentMyLearningReducer,
    studentCourseDetails: studentCourseDetailsReducer,
    studentCourseLearning: studentCourseLearningReducer,
    studentCourseContent: studentCourseContentReducer,
    studentSearch: studentSearchReducer,
    studentCheckout: studentCheckoutReducer,
    studentAssessment: studentAssessmentReducer,
    studentAssessmentResult: studentAssessmentResultReducer,
    studentCertificate: studentCertificateReducer,
    studentUpdates: studentUpdatesReducer,
    studentProfile: studentProfileReducer,
    studentCertificateVerify: studentCertificateVerifyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
