import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  deleteInstructorCourse,
  fetchInstructorCourses,
} from "../../../redux/slices/instructor/instructorCoursesSlice";
import type { CoursesState } from "../../../types/ui/instructor/courses.types";

const useCourses = (): CoursesState => {
  const dispatch = useAppDispatch();
  const { items: courses, loading } = useAppSelector(
    (state) => state.instructorCourses,
  );

  useEffect(() => {
    dispatch(fetchInstructorCourses());
  }, [dispatch]);

  const handleDelete = async (id: string) => {
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
      await dispatch(deleteInstructorCourse(id)).unwrap();
      toast.success("Course deleted");
    } catch (error) {
      console.error("Failed to delete course:", error);
      toast.error("Failed to delete course");
    }
  };

  return {
    items: courses,
    loading,
    error: null,
    fetchCourses: () => dispatch(fetchInstructorCourses()),
    handleDelete,
  };
};

export default useCourses;
