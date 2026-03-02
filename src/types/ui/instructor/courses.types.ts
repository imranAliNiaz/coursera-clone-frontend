import type { InstructorCourse } from "../../instructor";

export interface CoursesState {
  items: InstructorCourse[];
  loading: boolean;
  error: string | null;
  fetchCourses: () => void;
  handleDelete: (id: string) => Promise<void>;
}
