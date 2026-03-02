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

export interface AddLessonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNext: (
    title: string,
    type: "VIDEO" | "READING" | "ASSESSMENT",
    description?: string,
  ) => void;
}

export interface EditLessonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (payload: {
    id?: string;
    title: string;
    description?: string;
    content?: string;
    videoUrl?: string;
    duration?: number | null;
  }) => void;
  lesson: {
    id?: string;
    title: string;
    type: "VIDEO" | "READING" | "ASSESSMENT";
    description?: string;
    content?: string;
    videoUrl?: string;
    duration?: number | null;
  } | null;
  mode?: "edit" | "create";
}

export interface AssessmentQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
}

export interface AssessmentContent {
  title: string;
  passingScore: number;
  questions: AssessmentQuestion[];
  instructions?: string;
}

export interface Lesson {
  id: string;
  title: string;
  type: "VIDEO" | "READING" | "ASSESSMENT";
  order: number;
  updatedAt?: string;
}

export interface LessonListProps {
  lessons: Lesson[];
  moduleId: string;
  onEdit: (lesson: Lesson) => void;
  onDelete: (lessonId: string) => void;
  onReorder: (moduleId: string, lessons: Lesson[]) => void;
}

export interface Lesson {
  id: string;
  title: string;
  type: "VIDEO" | "READING" | "ASSESSMENT";
  order: number;
  updatedAt?: string;
}

export interface Module {
  id: string;
  title: string;
  order: number;
  lessons: Lesson[];
}

export interface ModuleListProps {
  modules: Module[];
  onEditModule: (module: Module) => void;
  onDeleteModule: (moduleId: string) => void;
  onAddLesson: (moduleId: string) => void;
  onEditLesson: (lesson: Lesson) => void;
  onDeleteLesson: (lessonId: string) => void;
  onReorderLessons: (moduleId: string, lessons: Lesson[]) => void;
}
