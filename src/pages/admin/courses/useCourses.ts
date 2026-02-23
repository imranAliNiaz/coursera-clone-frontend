import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  deleteAdminCourse,
  fetchAdminCourses,
} from "../../../redux/slices/admin/adminCoursesSlice";
import type { CoursesState } from "../../../types/ui/admin/courses.types";

const useCourses = (): CoursesState => {
  const dispatch = useAppDispatch();
  const {
    items: courses,
    loading,
    error,
  } = useAppSelector((state) => state.adminCourses);

  useEffect(() => {
    dispatch(fetchAdminCourses());
  }, [dispatch]);

  const handleDeleteCourse = async (id: string) => {
    const course = courses.find((c) => c.id === id);
    const enrolledCount = course?._count?.enrollments ?? 0;
    if (enrolledCount > 0) {
      const label = enrolledCount === 1 ? "student" : "students";
      toast.error(
        `Course "${course?.title || "This course"}" has ${enrolledCount} enrolled ${label}. Content cannot be edited or deleted.`,
      );
      return;
    }
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    try {
      await dispatch(deleteAdminCourse(id)).unwrap();
      toast.success("Course deleted successfully");
    } catch (err: unknown) {
      const message =
        (err as { message?: string })?.message ||
        (typeof err === "string" ? err : undefined) ||
        "Failed to delete course";
      toast.error(message);
    }
  };

  return {
    courses,
    loading,
    error,
    fetchCourses: () => dispatch(fetchAdminCourses()),
    handleDeleteCourse,
  };
};

export default useCourses;
