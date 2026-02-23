import React from "react";
import ModuleList from "../../../components/instructor/ModuleList";
import AddLessonModal from "../../../components/instructor/AddLessonModal";
import EditLessonModal from "../../../components/instructor/EditLessonModal";
import useCurriculumBuilder from "./useCurriculumBuilder";
import type { CurriculumBuilderState } from "../../../types/ui/instructor/curriculum.types";

const CurriculumBuilder: React.FC = () => {
  const {
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
    setCurrentModuleId,
    pendingLesson,
    setPendingLesson,
    isAddLessonContentModalOpen,
    setIsAddLessonContentModalOpen,
    isEditLessonModalOpen,
    setIsEditLessonModalOpen,
    editingLesson,
  }: CurriculumBuilderState = useCurriculumBuilder();

  if (loading && modules.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <h1 className="text-2xl font-semibold text-text-primary mb-2">
            Curriculum
          </h1>
          <p className="text-sm text-text-secondary">
            Design your course structure with modules and lessons.
          </p>
        </div>
        <button
          onClick={handleAddModule}
          disabled={loading}
          className="px-4 py-2 bg-primary text-white font-medium text-sm rounded-lg hover:bg-primary-hover transition-all shadow-sm flex items-center gap-2 disabled:opacity-50"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add Module
        </button>
      </div>

      <div className="bg-white rounded-xl border border-border shadow-sm p-6">
        <ModuleList
          modules={modules}
          onEditModule={handleEditModule}
          onDeleteModule={handleDeleteModule}
          onAddLesson={handleAddLesson}
          onEditLesson={handleEditLesson}
          onDeleteLesson={handleDeleteLesson}
          onReorderLessons={handleReorderLessons}
        />
      </div>

      <AddLessonModal
        isOpen={isAddLessonModalOpen}
        onClose={() => {
          setIsAddLessonModalOpen(false);
          setCurrentModuleId(null);
        }}
        onNext={handleNextLesson}
      />

      <EditLessonModal
        mode="create"
        isOpen={isAddLessonContentModalOpen}
        onClose={() => {
          setIsAddLessonContentModalOpen(false);
          setPendingLesson(null);
          setCurrentModuleId(null);
        }}
        onSave={handleCreateLesson}
        lesson={
          pendingLesson
            ? {
                title: pendingLesson.title,
                type: pendingLesson.type,
                description: pendingLesson.description,
              }
            : null
        }
      />

      <EditLessonModal
        mode="edit"
        isOpen={isEditLessonModalOpen}
        onClose={() => setIsEditLessonModalOpen(false)}
        onSave={handleSaveEditedLesson}
        lesson={editingLesson}
      />
    </div>
  );
};

export default CurriculumBuilder;
