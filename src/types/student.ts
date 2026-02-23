export interface MyLearningInstructor {
  id?: string;
  name?: string | null;
  avatarUrl?: string | null;
}

export interface MyLearningCourse {
  id: string;
  title: string;
  thumbnail?: string | null;
  description?: string | null;
  difficulty?: string | null;
  category?: string | null;
  instructor?: MyLearningInstructor | null;
  modules?: {
    id: string;
    title: string;
    order: number;
    lessons: {
      id: string;
      title: string;
      type: string;
    }[];
  }[];
}

export interface MyLearningEnrollment {
  id: string;
  courseId: string;
  progress: number;
  completed: boolean;
  completedAt?: string | null;
  updatedAt?: string | null;
  hasReviewed: boolean;
  myRating?: number | null;
  certificate?: MyCertificate | null;
  course: MyLearningCourse;
}

export interface MyCertificate {
  id: string;
  courseId?: string | null;
  imageUrl?: string | null;
  verificationCode?: string | null;
}

export interface StudentMyLearningState {
  enrollments: MyLearningEnrollment[];
  certificatesByCourseId: Record<string, MyCertificate>;
  loading: boolean;
  error: string | null;
  reviewSubmitting: boolean;
  reviewError: string | null;
}

export interface SubmitCourseReviewPayload {
  enrollmentId: string;
  courseId: string;
  rating: number;
  comment?: string;
}

export type LessonType = "VIDEO" | "READING" | "ASSESSMENT";

export interface CourseLesson {
  id: string;
  title: string;
  type: LessonType;
  duration?: number | null;
  videoUrl?: string | null;
  content?: string | null;
}

export interface CourseModule {
  id: string;
  title: string;
  lessons: CourseLesson[];
}

export interface CourseLearningCourse {
  id: string;
  title: string;
  description?: string | null;
  outcomes?: string[] | string | null;
  instructor?: { name?: string | null } | null;
  modules?: CourseModule[];
}

export interface LessonProgressItem {
  lessonId: string;
  completed: boolean;
  lastPlayed?: number | null;
  passed?: boolean | null;
  score?: number | null;
}

export interface ModuleProgressItem {
  moduleId: string;
  totalLessons: number;
  completedLessons: number;
  completed: boolean;
}

export interface CourseProgress {
  enrollmentId: string;
  progress: number;
  completed: boolean;
  lessonProgress: LessonProgressItem[];
  moduleProgress: ModuleProgressItem[];
}

export interface StudentCourseLearningState {
  course: CourseLearningCourse | null;
  progressData: CourseProgress | null;
  learningObjectives: string[];
  loading: boolean;
  error: string | null;
  currentCourseId: string | null;
}

export type CourseLearningLessonDisplayType =
  | "Video"
  | "Reading"
  | "Assessment";

export interface CourseLearningLesson {
  id: string;
  title: string;
  type: CourseLearningLessonDisplayType;
  duration?: number;
  status: "completed" | "in-progress" | "not-started";
  videoUrl?: string;
  content?: string;
}

export interface CourseLearningModuleSection {
  id: string;
  title: string;
  lessons: CourseLearningLesson[];
  isExpanded: boolean;
  isComplete: boolean;
}

export interface CourseContentLesson {
  id: string;
  title: string;
  type: LessonType;
  duration?: number | null;
  videoUrl?: string | null;
  content?: string | null;
  updatedAt?: string;
}

export interface CourseContentModule {
  id: string;
  title: string;
  lessons: CourseContentLesson[];
}

export interface CourseContentCourse {
  id: string;
  title: string;
  description?: string | null;
  instructor?: { name?: string | null } | null;
  modules?: CourseContentModule[];
}

export interface CourseContentLessonProgressItem {
  lessonId: string;
  completed: boolean;
  lastPlayed?: number | null;
  passed?: boolean | null;
  score?: number | null;
}

export interface CourseContentModuleProgressItem {
  moduleId: string;
  totalLessons: number;
  completedLessons: number;
  completed: boolean;
}

export interface CourseContentProgress {
  enrollmentId: string;
  progress: number;
  completed: boolean;
  lessonProgress: CourseContentLessonProgressItem[];
  moduleProgress: CourseContentModuleProgressItem[];
}

export interface StudentCourseContentState {
  course: CourseContentCourse | null;
  progressData: CourseContentProgress | null;
  loading: boolean;
  error: string | null;
  currentCourseId: string | null;
}

export interface CourseContentUpdateLessonProgressPayload {
  enrollmentId: string;
  lessonId: string;
  courseId: string;
  data: {
    lastPlayed?: number;
    completed?: boolean;
    forceComplete?: boolean;
    videoDuration?: number;
    passed?: boolean;
    score?: number;
  };
}

export interface CourseContentTranscriptLine {
  id: string;
  startTime: number;
  endTime: number;
  text: string;
}

export type CourseContentTab = "transcript" | "notes-downloads";

export interface DashboardItem {
  title: string;
  provider: string;
  image?: string | null;
  logo: string;
  badge: string;
  type: string;
  showBuildTowardDegree?: boolean;
  showAiBadge?: boolean;
}

export interface DashboardCourseSummary {
  title: string;
  thumbnail?: string | null;
}

export interface StudentDashboardState {
  recentlyViewed: DashboardItem[];
  mostPopular: DashboardItem[];
  personalized: DashboardItem[];
  enrollments: MyLearningEnrollment[];
  loading: boolean;
  error: string | null;
}

export interface SearchCourseInstructor {
  id: string;
  name: string;
  avatarUrl?: string | null;
}

export interface SearchCourse {
  id: string;
  title: string;
  subtitle?: string | null;
  description: string;
  status?: "Draft" | "Published" | null;
  outcomes?: string | null;
  category?: string | null;
  difficulty?: string | null;
  language?: string | null;
  skills?: string[];
  durationMinutes?: number | null;
  thumbnail?: string | null;
  instructor?: SearchCourseInstructor | null;
}

export interface StudentSearchState {
  query: string;
  allCourses: SearchCourse[];
  loading: boolean;
  error: string | null;
}

export type DurationBucket =
  | "under_60"
  | "1_4_weeks"
  | "1_3_months"
  | "3_6_months"
  | "under_21_hours";

export interface MappedSearchResult {
  id: string;
  image: string;
  badge?: string;
  partnerLogo: string;
  partnerName: string;
  title: string;
  skills: string;
  rating: number;
  reviews: string;
  type: string;
}

export interface CourseDetailsInstructor {
  id: string;
  name: string;
  avatarUrl?: string | null;
}

export interface CourseDetailsCourse {
  id: string;
  title: string;
  subtitle?: string | null;
  description?: string | null;
  outcomes?: string[] | string | null;
  difficulty?: string | null;
  language?: string | null;
  durationMinutes?: number | null;
  thumbnail?: string | null;
  price?: number | null;
  instructor?: CourseDetailsInstructor | null;
}

export interface StudentCourseDetailsState {
  course: CourseDetailsCourse | null;
  seriesCourses: CourseDetailsCourse[];
  loading: boolean;
  error: string | null;
  currentCourseId: string | null;
}

export interface CertificateCourseInfo {
  outcomes?: string[] | string | null;
  description?: string | null;
  instructor?: { name?: string | null } | null;
  thumbnail?: string | null;
}

export interface CertificateApiItem {
  id: string;
  courseTitle?: string | null;
  partnerName?: string | null;
  imageUrl?: string | null;
  grade?: number | null;
  course?: CertificateCourseInfo | null;
}

export interface CertificateItem {
  id: string;
  title: string;
  type: string;
  image: string;
  grade?: string;
}

export interface TopPickCourse {
  title: string;
  provider: string;
  image?: string | null;
  logo?: string | null;
  type: string;
}

export interface RecentlyViewedCourse {
  title: string;
  provider: string;
  image?: string | null;
  logo?: string | null;
  badge: string;
  type: string;
}

export interface UpNextCourse {
  title: string;
  image?: string | null;
}

export interface CertificateData {
  id: string;
  courseTitle?: string | null;
  learnerName?: string | null;
  imageUrl?: string | null;
  verificationCode?: string | null;
  issuedAt?: string | null;
  durationMinutes?: number | null;
  durationHours?: number | null;
  grade?: number | null;
  partnerName?: string | null;
  course?: CertificateCourseInfo | null;
}

export interface StudentCertificateState {
  certificate: CertificateData | null;
  loading: boolean;
  error: string | null;
  currentId: string | null;
}

export interface AssessmentQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation?: string;
}

export interface AssessmentContent {
  title?: string;
  instructions?: string;
  passingScore: number;
  questions: AssessmentQuestion[];
}

export interface AssessmentLesson {
  id: string;
  title: string;
  content?: string | null;
  parsedContent: AssessmentContent;
}

export interface AssessmentCourseLesson {
  id: string;
  type: "VIDEO" | "READING" | "ASSESSMENT";
  title: string;
  content?: string | null;
}

export interface AssessmentModule {
  lessons: AssessmentCourseLesson[];
}

export interface AssessmentCourse {
  modules?: AssessmentModule[];
}

export interface AssessmentEnrollmentProgress {
  enrollmentId: string;
  studentName?: string;
  progress?: Record<string, { score?: number | null }>;
}

export interface StudentAssessmentState {
  assessment: AssessmentLesson | null;
  enrollment: AssessmentEnrollmentProgress | null;
  loading: boolean;
  error: string | null;
}

export interface AssessmentResultState {
  score: number;
  passingScore: number;
  questions: AssessmentQuestion[];
  answers: Record<string, number>;
  isPassed: boolean;
  title: string;
  highestScore: number;
}

// Profile Types
export interface WorkExperienceInput {
  title: string;
  company: string;
  location?: string;
  employmentType?: string;
  startDate: string;
  endDate?: string;
  isCurrent?: boolean;
  description?: string;
}

export interface WorkExperience extends WorkExperienceInput {
  id: string;
  createdAt: string;
}

export interface EducationInput {
  instituteName: string;
  degreeDetails: string;
  startDate: string;
  endDate: string;
}

export interface Education extends EducationInput {
  id: string;
  createdAt: string;
}

export interface ProfileCertificateInput {
  certificateName: string;
  completionDate: string;
}

export interface ProfileCertificate extends ProfileCertificateInput {
  id: string;
  createdAt: string;
}

export interface ProfileUpdateInput {
  name?: string;
}

export interface CompletedCourseCertificate {
  id: string;
  courseTitle?: string;
  issuedAt?: string;
}

export interface StudentProfileState {
  workExperiences: WorkExperience[];
  educations: Education[];
  profileCertificates: ProfileCertificate[];
  completedCourses: CompletedCourseCertificate[];
  isLoadingWork: boolean;
  isLoadingCredentials: boolean;
  isLoadingCompletedCourses: boolean;
  isSavingWork: boolean;
  isSavingCredential: boolean;
  isDeletingWorkId: string | null;
  isDeletingCredentialId: string | null;
  error: string | null;
}

export interface UpdatePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

// Updates Types
export interface UpdateItem {
  id: string;
  type: "ENROLLMENT" | "COURSE_COMPLETED" | "CERTIFICATE_READY" | "GENERAL";
  title: string;
  message: string;
  actionText: string;
  link: string;
  image?: string;
  isRead: boolean;
  createdAt: string;
}

export interface NotificationData {
  id: string;
  type: UpdateItem["type"];
  title: string;
  message: string;
  link?: string | null;
  imageUrl?: string | null;
  readAt?: string | null;
  createdAt: string;
}

export interface StudentUpdatesState {
  items: UpdateItem[];
  loading: boolean;
  error: string | null;
}

// Certificate Verify Types
export interface CertificateVerification {
  learnerName: string;
  courseTitle: string;
  issuedAt: string;
  partnerName?: string | null;
  verificationCode: string;
}

export interface StudentCertificateVerifyState {
  data: CertificateVerification | null;
  loading: boolean;
  error: string | null;
  code: string | null;
}

// Checkout Types
export interface CheckoutInstructor {
  id?: string;
  name?: string | null;
  avatarUrl?: string | null;
}

export interface CheckoutCourse {
  id: string;
  title: string;
  thumbnail?: string | null;
  price?: number | null;
  instructor?: CheckoutInstructor | null;
}

export interface StudentCheckoutState {
  course: CheckoutCourse | null;
  studentName: string;
  loading: boolean;
  error: string | null;
  currentCourseId: string | null;
}
