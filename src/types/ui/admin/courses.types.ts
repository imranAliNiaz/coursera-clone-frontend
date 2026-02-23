import type { AdminCourse } from "../../admin";

export interface CoursesState {
  courses: AdminCourse[];
  loading: boolean;
  error: string | null;
  fetchCourses: () => void;
  handleDeleteCourse: (id: string) => Promise<void>;
}
