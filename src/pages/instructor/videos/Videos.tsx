import React from "react";
import ModuleList from "../../../components/instructor/ModuleList";
import AddLessonModal from "../../../components/instructor/AddLessonModal";
import EditLessonModal from "../../../components/instructor/EditLessonModal";
import useVideos from "./useVideos";

const Videos: React.FC = () => {
  const {
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
    setCurrentModuleId,
    pendingLesson,
    setPendingLesson,
    isAddLessonContentModalOpen,
    setIsAddLessonContentModalOpen,
    isEditLessonModalOpen,
    setIsEditLessonModalOpen,
    editingLesson,
  } = useVideos();

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <h1 className="text-2xl font-semibold text-text-primary mb-2">
            Manage Content
          </h1>
          <p className="text-sm text-text-secondary">
            Organize modules and lessons for your course.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={refreshModules}
            className="px-4 py-2 border border-border text-text-secondary font-medium text-sm rounded-lg hover:bg-surface hover:border-border-dark transition-all flex items-center gap-2 cursor-pointer"
          >
            <svg
              className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Refresh
          </button>
          <button
            onClick={handleAddModule}
            disabled={!selectedCourseId || loading}
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
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Select Course
          </label>
          {showSkeleton ? (
            <div className="h-10 w-full rounded-lg bg-surface-hover animate-pulse" />
          ) : (
            <select
              value={selectedCourseId}
              onChange={(e) => setSelectedCourseId(e.target.value)}
              className="w-full bg-surface border border-border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
            >
              {courses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
              {courses.length === 0 && <option>No courses found</option>}
            </select>
          )}

          <label className="block text-sm font-medium text-text-secondary mb-2 mt-6">
            Filter by Module
          </label>
          {showSkeleton ? (
            <div className="h-10 w-full rounded-lg bg-surface-hover animate-pulse" />
          ) : (
            <select
              value={selectedModuleId}
              onChange={(e) => setSelectedModuleId(e.target.value)}
              className="w-full bg-surface border border-border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
            >
              <option value="all">All Modules</option>
              {modules.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.title}
                </option>
              ))}
            </select>
          )}

          <label className="block text-sm font-medium text-text-secondary mb-2 mt-6">
            Filter by Lesson Type
          </label>
          {showSkeleton ? (
            <div className="h-10 w-full rounded-lg bg-surface-hover animate-pulse" />
          ) : (
            <select
              value={selectedLessonType}
              onChange={(e) =>
                setSelectedLessonType(
                  e.target.value as "all" | "VIDEO" | "READING" | "ASSESSMENT",
                )
              }
              className="w-full bg-surface border border-border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
            >
              <option value="all">All Types</option>
              <option value="VIDEO">Video</option>
              <option value="READING">Reading</option>
              <option value="ASSESSMENT">Assessment</option>
            </select>
          )}
        </div>

        <div className="lg:col-span-3">
          {showSkeleton || (loading && modules.length === 0) ? (
            <div className="flex justify-center items-center h-64">
              <div className="space-y-4 w-full max-w-2xl">
                <div className="h-10 w-1/3 bg-surface-hover rounded animate-pulse" />
                <div className="h-24 w-full bg-surface-hover rounded animate-pulse" />
                <div className="h-24 w-full bg-surface-hover rounded animate-pulse" />
                <div className="h-24 w-full bg-surface-hover rounded animate-pulse" />
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-border shadow-sm p-6">
              <ModuleList
                modules={filteredModules}
                onEditModule={handleEditModule}
                onDeleteModule={handleDeleteModule}
                onAddLesson={handleAddLesson}
                onEditLesson={handleEditLesson}
                onDeleteLesson={handleDeleteLesson}
                onReorderLessons={handleReorderLessons}
              />
            </div>
          )}
        </div>
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

export default Videos;
