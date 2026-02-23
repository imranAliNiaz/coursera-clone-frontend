export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  avatarUrl?: string;
  createdAt: string;
  _count: {
    courses: number;
    enrollments: number;
  };
}

export interface AdminUserForm {
  name: string;
  email: string;
  password?: string;
  role: string;
}

export interface AdminCourse {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  status: string;
  instructor: {
    name: string;
  };
  _count: {
    enrollments: number;
    reviews: number;
  };
}

export interface AdminInstructor {
  id: string;
  name: string;
  email: string;
  role: string;
  avatarUrl?: string;
  expertise?: string;
  _count: {
    courses: number;
    enrollments: number;
  };
}

export interface AdminReviewUser {
  id: string;
  name: string;
}

export interface AdminReviewCourseInstructor {
  id: string;
  name: string;
}

export interface AdminReviewCourse {
  id: string;
  title: string;
  instructor?: AdminReviewCourseInstructor | null;
}

export interface AdminReview {
  id: string;
  rating: number;
  comment?: string | null;
  createdAt: string;
  course?: AdminReviewCourse | null;
  user?: AdminReviewUser | null;
}

// Analytics / Dashboard Types
export interface AdminRecentSignup {
  id: string;
  name: string;
  role: string;
  createdAt: string;
}

export interface TimeseriesPoint {
  date: string;
  enrollments: number;
  revenue: number;
}

export interface AnalyticsOverview {
  totalUsers: number;
  totalCourses: number;
  totalEnrollments: number;
  totalReviews: number;
  totalCertificates?: number;
  totalRevenue: number;
}

export interface AnalyticsData {
  overview: AnalyticsOverview;
  recentSignups: AdminRecentSignup[];
}

export interface AdminDashboardState {
  data: AnalyticsData | null;
  timeseries: TimeseriesPoint[];
  loading: boolean;
  chartLoading: boolean;
  error: string | null;
  metric: "enrollments" | "revenue";
}

export interface AdminReviewUser {
  id: string;
  name: string;
}

export interface AdminReviewCourseInstructor {
  id: string;
  name: string;
}

export interface AdminReviewCourse {
  id: string;
  title: string;
  instructor?: AdminReviewCourseInstructor | null;
}

export interface AdminReview {
  id: string;
  rating: number;
  comment?: string | null;
  createdAt: string;
  course?: AdminReviewCourse | null;
  user?: AdminReviewUser | null;
}
