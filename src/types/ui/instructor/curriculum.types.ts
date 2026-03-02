import type {
  InstructorModule,
  InstructorLesson,
  InstructorLessonDraft,
} from "../../instructor";

export interface CurriculumBuilderState {
  modules: InstructorModule[];
  loading: boolean;
  handleAddModule: () => Promise<void>;
  handleEditModule: (module: InstructorModule) => Promise<void>;
  handleDeleteModule: (moduleId: string) => Promise<void>;
  handleAddLesson: (moduleId: string) => void;
  handleNextLesson: (
    title: string,
    type: "VIDEO" | "READING" | "ASSESSMENT",
    description?: string,
  ) => void;
  handleCreateLesson: (payload: {
    title: string;
    description?: string;
    content?: string;
    videoUrl?: string;
    duration?: number | null;
  }) => Promise<void>;
  handleEditLesson: (lesson: InstructorLesson) => void;
  handleSaveEditedLesson: (payload: {
    id?: string;
    title: string;
    description?: string;
    content?: string;
    videoUrl?: string;
    duration?: number | null;
  }) => Promise<void>;
  handleDeleteLesson: (lessonId: string) => Promise<void>;
  handleReorderLessons: (
    moduleId: string,
    lessons: InstructorLesson[],
  ) => Promise<void>;
  isAddLessonModalOpen: boolean;
  setIsAddLessonModalOpen: (open: boolean) => void;
  currentModuleId: string | null;
  setCurrentModuleId: (id: string | null) => void;
  pendingLesson: InstructorLessonDraft | null;
  setPendingLesson: (lesson: InstructorLessonDraft | null) => void;
  isAddLessonContentModalOpen: boolean;
  setIsAddLessonContentModalOpen: (open: boolean) => void;
  isEditLessonModalOpen: boolean;
  setIsEditLessonModalOpen: (open: boolean) => void;
  editingLesson: InstructorLesson | null;
  setEditingLesson: (lesson: InstructorLesson | null) => void;
}
