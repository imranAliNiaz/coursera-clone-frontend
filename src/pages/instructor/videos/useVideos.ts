import { useEffect, useMemo, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { courseApi } from "../../../services/courseApi";

interface Lesson {
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

interface Module {
  id: string;
  title: string;
  order: number;
  lessons: Lesson[];
}

interface LessonDraft {
  title: string;
  type: "VIDEO" | "READING" | "ASSESSMENT";
  description?: string;
}

interface CourseSummary {
  id: string;
  title?: string;
  _count?: {
    enrollments?: number;
  };
}

const useVideos = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const isAdmin = location.pathname.includes("/admin");
  const [courses, setCourses] = useState<CourseSummary[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState<string>("");
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(false);
  const [coursesLoading, setCoursesLoading] = useState(false);
  const [selectedModuleId, setSelectedModuleId] = useState<string>("all");
  const [selectedLessonType, setSelectedLessonType] = useState<
    "all" | "VIDEO" | "READING" | "ASSESSMENT"
  >("all");

  const [isAddLessonModalOpen, setIsAddLessonModalOpen] = useState(false);
  const [currentModuleId, setCurrentModuleId] = useState<string | null>(null);
  const [pendingLesson, setPendingLesson] = useState<LessonDraft | null>(null);
  const [isAddLessonContentModalOpen, setIsAddLessonContentModalOpen] =
    useState(false);

  const [isEditLessonModalOpen, setIsEditLessonModalOpen] = useState(false);
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);

  const requestedCourseId = useMemo(
    () => searchParams.get("courseId") || "",
    [searchParams],
  );

  const selectedCourse = courses.find((c) => c.id === selectedCourseId);
  const enrolledCount = selectedCourse?._count?.enrollments ?? 0;
  const isContentLocked = enrolledCount > 0;
  const getEnrollmentGateMessage = () => {
    const title = selectedCourse?.title || "This course";
    const label = enrolledCount === 1 ? "student" : "students";
    return `Course "${title}" has ${enrolledCount} enrolled ${label}. Content cannot be edited or deleted.`;
  };

  const getErrorMessage = (error: unknown, fallback: string) =>
    (error as { response?: { data?: { message?: string } } })?.response?.data
      ?.message || fallback;

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setCoursesLoading(true);
        const data = isAdmin
          ? await courseApi.getAdminCourses()
          : await courseApi.getInstructorCourses();
        setCourses(data as CourseSummary[]);
        if (data.length > 0) {
          const hasRequested = requestedCourseId
            ? data.some((c: CourseSummary) => c.id === requestedCourseId)
            : false;
          if (hasRequested) {
            setSelectedCourseId(requestedCourseId);
          } else if (!selectedCourseId) {
            setSelectedCourseId(data[0].id);
          }
        }
      } catch (error) {
        toast.error("Failed to fetch courses");
      } finally {
        setCoursesLoading(false);
      }
    };
    fetchCourses();
  }, [isAdmin, requestedCourseId, selectedCourseId]);

  useEffect(() => {
    if (!requestedCourseId || courses.length === 0) return;
    const hasRequested = courses.some((c) => c.id === requestedCourseId);
    if (hasRequested && requestedCourseId !== selectedCourseId) {
      setSelectedCourseId(requestedCourseId);
    }
  }, [requestedCourseId, courses, selectedCourseId]);

  useEffect(() => {
    if (!selectedCourseId) {
      setModules([]);
      setSelectedModuleId("all");
      setSelectedLessonType("all");
      return;
    }
    const fetchModules = async () => {
      setLoading(true);
      try {
        const data = isAdmin
          ? await courseApi.getModulesAsAdmin(selectedCourseId)
          : await courseApi.getModules(selectedCourseId);
        const sorted = (data as Module[])
          .map((m) => ({
            ...m,
            lessons: m.lessons
              ? m.lessons.sort((a, b) => a.order - b.order)
              : [],
          }))
          .sort((a, b) => a.order - b.order);
        setModules(sorted);
        setSelectedModuleId("all");
        setSelectedLessonType("all");
      } catch (error) {
        toast.error("Failed to load curriculum");
      } finally {
        setLoading(false);
      }
    };
    fetchModules();
  }, [selectedCourseId, isAdmin]);

  const refreshModules = async () => {
    if (!selectedCourseId) return;
    setLoading(true);
    try {
      const data = isAdmin
        ? await courseApi.getModulesAsAdmin(selectedCourseId)
        : await courseApi.getModules(selectedCourseId);
      const sorted = (data as Module[])
        .map((m) => ({
          ...m,
          lessons: m.lessons ? m.lessons.sort((a, b) => a.order - b.order) : [],
        }))
        .sort((a, b) => a.order - b.order);
      setModules(sorted);
      setSelectedModuleId("all");
      setSelectedLessonType("all");
    } catch (error) {
      toast.error("Failed to load curriculum");
    } finally {
      setLoading(false);
    }
  };

  const handleAddModule = async () => {
    if (!selectedCourseId) return;
    if (isContentLocked) {
      toast.error(getEnrollmentGateMessage());
      return;
    }
    const title = prompt("Enter Module Title:");
    if (title) {
      try {
        if (isAdmin) {
          await courseApi.createModuleAsAdmin(selectedCourseId, {
            title,
            order: modules.length,
          });
        } else {
          await courseApi.createModule(selectedCourseId, {
            title,
            order: modules.length,
          });
        }
        toast.success("Module added");
        refreshModules();
      } catch (error) {
        toast.error(getErrorMessage(error, "Failed to add module"));
      }
    }
  };

  const handleEditModule = async (module: Module) => {
    if (isContentLocked) {
      toast.error(getEnrollmentGateMessage());
      return;
    }
    const title = prompt("Edit Module Title:", module.title);
    if (title && title !== module.title) {
      try {
        if (isAdmin) {
          await courseApi.updateModuleAsAdmin(module.id, { title });
        } else {
          await courseApi.updateModule(module.id, { title });
        }
        toast.success("Module updated");
        refreshModules();
      } catch (error) {
        toast.error(getErrorMessage(error, "Failed to update module"));
      }
    }
  };

  const handleDeleteModule = async (moduleId: string) => {
    if (isContentLocked) {
      toast.error(getEnrollmentGateMessage());
      return;
    }
    if (
      confirm(
        "Delete this module? All lessons inside will be removed and this will immediately affect student course content.",
      )
    ) {
      try {
        if (isAdmin) {
          await courseApi.deleteModuleAsAdmin(moduleId);
        } else {
          await courseApi.deleteModule(moduleId);
        }
        toast.success("Module deleted");
        refreshModules();
      } catch (error) {
        toast.error(getErrorMessage(error, "Failed to delete module"));
      }
    }
  };

  const handleAddLesson = (moduleId: string) => {
    if (isContentLocked) {
      toast.error(getEnrollmentGateMessage());
      return;
    }
    setCurrentModuleId(moduleId);
    setIsAddLessonModalOpen(true);
  };

  const handleNextLesson = (
    title: string,
    type: "VIDEO" | "READING" | "ASSESSMENT",
    description?: string,
  ) => {
    setPendingLesson({ title, type, description });
    setIsAddLessonModalOpen(false);
    setIsAddLessonContentModalOpen(true);
  };

  const handleCreateLesson = async (payload: {
    title: string;
    description?: string;
    content?: string;
    videoUrl?: string;
    duration?: number | null;
  }) => {
    if (!currentModuleId) return;
    if (!pendingLesson) return;
    if (isContentLocked) {
      toast.error(getEnrollmentGateMessage());
      return;
    }

    try {
      const module = modules.find((m) => m.id === currentModuleId);
      const order = module ? module.lessons.length : 0;

      if (isAdmin) {
        await courseApi.createLessonAsAdmin(currentModuleId, {
          title: payload.title,
          type: pendingLesson.type,
          order,
          description: payload.description,
          content: payload.content,
          videoUrl: payload.videoUrl,
          duration: payload.duration ?? undefined,
        });
      } else {
        await courseApi.createLesson(currentModuleId, {
          title: payload.title,
          type: pendingLesson.type,
          order,
          description: payload.description,
          content: payload.content,
          videoUrl: payload.videoUrl,
          duration: payload.duration ?? undefined,
        });
      }

      const typeLabel =
        pendingLesson.type === "VIDEO"
          ? "Video"
          : pendingLesson.type === "READING"
            ? "Reading"
            : "Assessment";
      toast.success(`${typeLabel} lesson added`);
      setIsAddLessonContentModalOpen(false);
      setCurrentModuleId(null);
      setPendingLesson(null);
      refreshModules();
    } catch (error) {
      toast.error(getErrorMessage(error, "Failed to add lesson"));
    }
  };

  const handleEditLesson = (lesson: Lesson) => {
    if (isContentLocked) {
      toast.error(getEnrollmentGateMessage());
      return;
    }
    setEditingLesson(lesson);
    setIsEditLessonModalOpen(true);
  };

  const handleSaveEditedLesson = async (payload: {
    id?: string;
    title: string;
    description?: string;
    content?: string;
    videoUrl?: string;
    duration?: number | null;
  }) => {
    if (!payload.id) return;
    if (isContentLocked) {
      toast.error(getEnrollmentGateMessage());
      return;
    }
    try {
      if (isAdmin) {
        await courseApi.updateLessonAsAdmin(payload.id, {
          title: payload.title,
          type: editingLesson?.type || "VIDEO",
          description: payload.description,
          content: payload.content,
          videoUrl: payload.videoUrl,
          duration: payload.duration ?? undefined,
        });
      } else {
        await courseApi.updateLesson(payload.id, {
          title: payload.title,
          type: editingLesson?.type || "VIDEO",
          description: payload.description,
          content: payload.content,
          videoUrl: payload.videoUrl,
          duration: payload.duration ?? undefined,
        });
      }
      toast.success("Lesson updated");
      setIsEditLessonModalOpen(false);
      setEditingLesson(null);
      refreshModules();
    } catch (error) {
      toast.error(getErrorMessage(error, "Failed to update lesson"));
    }
  };

  const handleDeleteLesson = async (lessonId: string) => {
    if (isContentLocked) {
      toast.error(getEnrollmentGateMessage());
      return;
    }
    if (
      confirm(
        "Delete this lesson? This will immediately remove it from student course content.",
      )
    ) {
      try {
        if (isAdmin) {
          await courseApi.deleteLessonAsAdmin(lessonId);
        } else {
          await courseApi.deleteLesson(lessonId);
        }
        toast.success("Lesson deleted");
        refreshModules();
      } catch (error) {
        toast.error(getErrorMessage(error, "Failed to delete lesson"));
      }
    }
  };

  const handleReorderLessons = async (moduleId: string, lessons: Lesson[]) => {
    if (isContentLocked) {
      toast.error(getEnrollmentGateMessage());
      return;
    }
    setModules((prev) =>
      prev.map((m) => {
        if (m.id === moduleId) {
          return { ...m, lessons };
        }
        return m;
      }),
    );

    try {
      const updates = lessons.map((l, index) => ({ id: l.id, order: index }));
      if (isAdmin) {
        await courseApi.reorderLessonsAsAdmin(updates);
      } else {
        await courseApi.reorderLessons(updates);
      }
    } catch (error) {
      toast.error(getErrorMessage(error, "Failed to reorder lessons"));
      refreshModules();
    }
  };

  const filteredModules = modules
    .filter((module) =>
      selectedModuleId === "all" ? true : module.id === selectedModuleId,
    )
    .map((module) => {
      const lessons =
        selectedLessonType === "all"
          ? module.lessons
          : module.lessons.filter((l) => l.type === selectedLessonType);
      return { ...module, lessons };
    })
    .filter(
      (module) => module.lessons.length > 0 || selectedLessonType === "all",
    );

  const showSkeleton = coursesLoading && courses.length === 0;

  return {
    courses,
    selectedCourseId,
    setSelectedCourseId,
    modules,
    selectedModuleId,
    setSelectedModuleId,
    selectedLessonType,
    setSelectedLessonType,
    loading,
    showSkeleton,
    filteredModules,
    refreshModules,
    handleAddModule,
    handleEditModule,
    handleDeleteModule,
    handleAddLesson,
    handleNextLesson,
    handleCreateLesson,
    handleEditLesson,
    handleSaveEditedLesson,
    handleDeleteLesson,
    handleReorderLessons,
    isAddLessonModalOpen,
    setIsAddLessonModalOpen,
    currentModuleId,
    setCurrentModuleId,
    pendingLesson,
    setPendingLesson,
    isAddLessonContentModalOpen,
    setIsAddLessonContentModalOpen,
    isEditLessonModalOpen,
    setIsEditLessonModalOpen,
    editingLesson,
    setEditingLesson,
  };
};

export default useVideos;
