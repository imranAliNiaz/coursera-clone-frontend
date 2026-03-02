import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchCourseLearning } from "../../redux/slices/student/studentCourseLearningSlice";
import type {
  CourseLesson,
  CourseModule,
  LessonProgressItem,
  ModuleProgressItem,
  LessonType,
  CourseLearningLessonDisplayType,
  CourseLearningLesson,
  CourseLearningModuleSection,
} from "../../types/student";

const useCourseLearning = (courseId?: string) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { course, loading, progressData, learningObjectives } = useAppSelector(
    (state) => state.studentCourseLearning,
  );

  const [expandedSections, setExpandedSections] = useState<string[]>([
    "observe-crit",
  ]);
  const [isCourseMaterialOpen, setIsCourseMaterialOpen] = useState(true);
  const [isTopInfoOpen, setIsTopInfoOpen] = useState(true);
  const [isObjectivesOpen, setIsObjectivesOpen] = useState(false);

  useEffect(() => {
    if (!courseId) return;
    dispatch(fetchCourseLearning(courseId));
  }, [courseId, dispatch]);

  useEffect(() => {
    if (course?.modules && progressData?.lessonProgress) {
      const firstUnfinished = course.modules.find((m: CourseModule) =>
        m.lessons.some(
          (l: CourseLesson) =>
            !progressData?.lessonProgress.find(
              (p: LessonProgressItem) => p.lessonId === l.id && p.completed,
            ),
        ),
      );
      if (firstUnfinished) {
        setExpandedSections([firstUnfinished.id]);
      }
    }
  }, [course?.modules, progressData?.lessonProgress]);

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId],
    );
  };

  const isLessonCompleted = (lessonId: string) => {
    return progressData?.lessonProgress?.some(
      (p: LessonProgressItem) => p.lessonId === lessonId && p.completed,
    );
  };

  const getLessonStatus = (
    lessonId: string,
    index: number,
    allLessons: CourseLesson[],
  ) => {
    if (isLessonCompleted(lessonId)) return "completed";

    const prevLesson = allLessons[index - 1];
    if (!prevLesson || isLessonCompleted(prevLesson.id)) return "in-progress";

    return "not-started";
  };

  const toDisplayType = (type: LessonType): CourseLearningLessonDisplayType =>
    type === "ASSESSMENT"
      ? "Assessment"
      : type === "READING"
        ? "Reading"
        : "Video";

  const sections: CourseLearningModuleSection[] = useMemo(() => {
    if (!course?.modules) return [];

    return course.modules.map((module: CourseModule) => {
      const moduleLessons: CourseLearningLesson[] = module.lessons.map(
        (lesson: CourseLesson, index: number) => ({
          id: lesson.id,
          title: lesson.title,
          type: toDisplayType(lesson.type),
          duration: lesson.duration ?? 0,
          status: getLessonStatus(lesson.id, index, module.lessons),
          videoUrl: lesson.videoUrl ?? undefined,
          content: lesson.content ?? undefined,
        }),
      );

      const backendModuleProgress = progressData?.moduleProgress?.find(
        (m: ModuleProgressItem) => m.moduleId === module.id,
      );
      const isComplete = backendModuleProgress
        ? backendModuleProgress.completed
        : moduleLessons.every(
            (l: CourseLearningLesson) => l.status === "completed",
          );

      return {
        id: module.id,
        title: module.title,
        lessons: moduleLessons,
        isExpanded: expandedSections.includes(module.id),
        isComplete,
      };
    });
  }, [course, expandedSections, progressData]);

  const handleResumeLesson = (
    lesson: { id: string; type?: CourseLearningLessonDisplayType },
    onNavigate?: (path: string, state?: unknown) => void,
  ) => {
    const nav = onNavigate ?? navigate;
    if (lesson.type === "Assessment") {
      nav(`/learn/${courseId}/assessment/${lesson.id}`, {
        state: { assessmentStarted: true },
      });
    } else {
      nav(`/learn/${courseId}/lecture/${lesson.id}`);
    }
  };

  const handleBackToDashboard = () => {
    navigate("/my-learning");
  };

  return {
    course,
    expandedSections,
    handleBackToDashboard,
    handleResumeLesson,
    isCourseMaterialOpen,
    isLessonCompleted,
    isObjectivesOpen,
    isTopInfoOpen,
    learningObjectives,
    loading,
    progressData,
    sections,
    setIsCourseMaterialOpen,
    setIsObjectivesOpen,
    setIsTopInfoOpen,
    toggleSection,
  };
};

export default useCourseLearning;
