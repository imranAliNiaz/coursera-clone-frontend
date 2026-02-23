export interface InstructorOverview {
  publishedCoursesCount?: number;
  draftCoursesCount?: number;
  totalStudents?: number;
  monthlyStudentsCount?: number;
  averageRating?: number;
  monthlyRevenue?: number;
  monthlyRevenueChangePct?: number;
}

export interface InstructorCourse {
  id: string;
  title: string;
  status: "Draft" | "Published";
  updatedAt: string;
  _count: {
    enrollments: number;
    reviews: number;
  };
}

// Analytics Types
export interface TimeseriesPoint {
  date: string;
  enrollments: number;
  revenue: number;
}

export interface InstructorInsights {
  topCourse: { id: string; title: string; students: number } | null;
  completionRate: number;
  reviewsCount: number;
  averageRating: number;
}

// Reviews Types
export interface InstructorReviewUser {
  id: string;
  name: string;
}

export interface InstructorReviewCourseInstructor {
  id: string;
  name: string;
}

export interface InstructorReviewCourse {
  id: string;
  title: string;
  instructor?: InstructorReviewCourseInstructor | null;
}

export interface InstructorReview {
  id: string;
  rating: number;
  comment?: string | null;
  createdAt: string;
  course?: InstructorReviewCourse | null;
  user?: InstructorReviewUser | null;
}

// Course Creation Types
export type CourseStatus = "Draft" | "Published";
export type CourseDifficulty = "Beginner" | "Intermediate" | "Advanced";

export interface InstructorCourseForm {
  title: string;
  subtitle: string;
  category: string;
  difficulty: CourseDifficulty;
  language: string;
  price: string;
  status: CourseStatus;
  description: string;
  outcomes: string;
  skills: string;
  durationMinutes: string;
  instructorId?: string;
}

// Curriculum Types
export interface InstructorLesson {
  id: string;
  title: string;
  type: "VIDEO" | "READING" | "ASSESSMENT";
  order: number;
  description?: string;
  content?: string;
  videoUrl?: string;
  duration?: number | null;
  updatedAt?: string;
}

export interface InstructorLessonDraft {
  title: string;
  type: "VIDEO" | "READING" | "ASSESSMENT";
  description?: string;
}

export interface InstructorModule {
  id: string;
  title: string;
  order: number;
  lessons: InstructorLesson[];
}

export interface InstructorUser {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: string;
}

export interface InstructorSummary {
  id: string;
  name: string;
}

export interface ChartPoint {
  date: string;
  value: number;
}
