import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { courseApi } from "../../../services/courseApi";
import type { SearchCourse } from "../../../types/student";
import type {
  CareerSkillCourse,
  CareerSkillsState,
} from "../../../types/ui/home.types";

const useCareerSkills = (): CareerSkillsState => {
  const [courses, setCourses] = useState<CareerSkillCourse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await courseApi.getCourses({ limit: 6 });
        // Map backend data to UI format
        const mappedCourses = (response.courses as SearchCourse[]).map((c) => ({
          id: c.id,
          university: c.instructor?.name || "Instructor",
          logo:
            c.instructor?.avatarUrl ||
            "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg",
          title: c.title,
          type: `${c.difficulty || "Beginner"} Â· Course`,
          image:
            c.thumbnail ||
            "https://images.unsplash.com/photo-1591453089816-0fbb971ca25c?w=800&auto=format&fit=crop&q=60",
        }));
        setCourses(mappedCourses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const visibleCourses = useMemo(
    () => (showAll ? courses : courses.slice(0, 3)),
    [courses, showAll],
  );
  const remainingCount = useMemo(
    () => Math.max(courses.length - 3, 0),
    [courses.length],
  );

  const handleCourseClick = (courseId: string) => {
    navigate(`/course/${courseId}`);
  };

  return {
    courses,
    isLoading,
    showAll,
    setShowAll,
    visibleCourses,
    remainingCount,
    handleCourseClick,
  };
};

export default useCareerSkills;
