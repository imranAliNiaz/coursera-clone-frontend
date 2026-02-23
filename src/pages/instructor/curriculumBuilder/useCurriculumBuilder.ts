import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { courseApi } from "../../../services/courseApi";
import type {
  InstructorModule,
  InstructorLesson,
  InstructorLessonDraft,
} from "../../../types/instructor";
import type { CurriculumBuilderState } from "../../../types/ui/instructor/curriculum.types";

interface CourseSummary {
  id: string;
  title?: string;
  _count?: {
    enrollments?: number;
  };
}

const useCurriculumBuilder = (): CurriculumBuilderState => {
  const location = useLocation();
  const isAdmin = location.pathname.includes("/admin");
  const { id: courseId } = useParams<{ id: string }>();
  const [modules, setModules] = useState<InstructorModule[]>([]);
  const [loading, setLoading] = useState(false);
  const [courseInfo, setCourseInfo] = useState<CourseSummary | null>(null);

  // Add Lesson Modal State
  const [isAddLessonModalOpen, setIsAddLessonModalOpen] = useState(false);
  const [currentModuleId, setCurrentModuleId] = useState<string | null>(null);
  const [pendingLesson, setPendingLesson] =
    useState<InstructorLessonDraft | null>(null);
  const [isAddLessonContentModalOpen, setIsAddLessonContentModalOpen] =
    useState(false);

  // Edit Lesson Modal State
  const [isEditLessonModalOpen, setIsEditLessonModalOpen] = useState(false);
  const [editingLesson, setEditingLesson] = useState<InstructorLesson | null>(
    null,
  );

  const getErrorMessage = (error: unknown, fallback: string) =>
    (error as { response?: { data?: { message?: string } } })?.response?.data
      ?.message || fallback;

  const fetchModules = async () => {
    if (!courseId) return;
    setLoading(true);
    try {
      const [data, course] = await Promise.all([
        isAdmin
          ? courseApi.getModulesAsAdmin(courseId)
          : courseApi.getModules(courseId),
        isAdmin
          ? courseApi.getCourseByIdAsAdmin(courseId)
          : courseApi.getCourseById(courseId),
      ]);
      // Ensure lessons are sorted by order
      const sortedModules = (data as InstructorModule[])
        .map((m) => ({
          ...m,
          lessons: m.lessons
            ? [...m.lessons].sort((a, b) => a.order - b.order)
            : [],
        }))
        .sort((a, b) => a.order - b.order);
      setModules(sortedModules);
      setCourseInfo(course as CourseSummary);
    } catch (error) {
      toast.error("Failed to load curriculum");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (courseId) {
      fetchModules();
    }
  }, [courseId, isAdmin]);

  const getEnrollmentGateMessage = () => {
    const count = courseInfo?._count?.enrollments ?? 0;
    const title = courseInfo?.title || "This course";
    const label = count === 1 ? "student" : "students";
    return `Course "${title}" has ${count} enrolled ${label}. Content cannot be edited or deleted.`;
  };

  const isContentLocked = () => {
    const count = courseInfo?._count?.enrollments ?? 0;
    return count > 0;
  };

  const handleAddModule = async () => {
    if (!courseId) return;
    if (isContentLocked()) {
      toast.error(getEnrollmentGateMessage());
      return;
    }
    const title = prompt("Enter Module Title:");
    if (title) {
      try {
        if (isAdmin) {
          await courseApi.createModuleAsAdmin(courseId, {
            title,
            order: modules.length,
          });
        } else {
          await courseApi.createModule(courseId, {
            title,
            order: modules.length,
          });
        }
        toast.success("Module added");
        fetchModules();
      } catch (error) {
        toast.error(getErrorMessage(error, "Failed to add module"));
      }
    }
  };

  const handleEditModule = async (module: InstructorModule) => {
    if (isContentLocked()) {
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
        fetchModules();
      } catch (error) {
        toast.error(getErrorMessage(error, "Failed to update module"));
      }
    }
  };

  const handleDeleteModule = async (moduleId: string) => {
    if (isContentLocked()) {
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
        fetchModules();
      } catch (error) {
        toast.error(getErrorMessage(error, "Failed to delete module"));
      }
    }
  };

  // --- Add Lesson Logic ---
  const handleAddLesson = (moduleId: string) => {
    if (isContentLocked()) {
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
    if (isContentLocked()) {
      toast.error(getEnrollmentGateMessage());
      return;
    }

    try {
      // Find current module to determine order
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
      fetchModules();
    } catch (error) {
      toast.error(getErrorMessage(error, "Failed to add lesson"));
    }
  };

  // --- Edit Lesson Logic ---
  const handleEditLesson = (lesson: InstructorLesson) => {
    if (isContentLocked()) {
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
    if (isContentLocked()) {
      toast.error(getEnrollmentGateMessage());
      return;
    }
    try {
      if (isAdmin) {
        await courseApi.updateLessonAsAdmin(payload.id, {
          title: payload.title,
          type: editingLesson!.type,
          description: payload.description,
          content: payload.content,
          videoUrl: payload.videoUrl,
          duration: payload.duration ?? undefined,
        });
      } else {
        await courseApi.updateLesson(payload.id, {
          title: payload.title,
          type: editingLesson!.type,
          description: payload.description,
          content: payload.content,
          videoUrl: payload.videoUrl,
          duration: payload.duration ?? undefined,
        });
      }
      toast.success("Lesson updated");
      setIsEditLessonModalOpen(false);
      setEditingLesson(null);
      fetchModules();
    } catch (error) {
      toast.error(getErrorMessage(error, "Failed to update lesson"));
    }
  };

  const handleDeleteLesson = async (lessonId: string) => {
    if (isContentLocked()) {
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
        fetchModules();
      } catch (error) {
        toast.error(getErrorMessage(error, "Failed to delete lesson"));
      }
    }
  };

  const handleReorderLessons = async (
    moduleId: string,
    lessons: InstructorLesson[],
  ) => {
    if (isContentLocked()) {
      toast.error(getEnrollmentGateMessage());
      return;
    }
    // Optimistic update
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
      fetchModules(); // Revert on error
    }
  };

  return {
    modules,
    loading,
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

export default useCurriculumBuilder;
