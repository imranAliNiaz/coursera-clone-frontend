import React from "react";
import useCreateCourse from "./useCreateCourse";
import type { CreateCourseState } from "../../../types/ui/instructor/create-course.types";

const CreateCourse: React.FC = () => {
  const {
    isEditMode,
    isAdmin,
    form,
    thumbnailPreview,
    loading,
    fetching,
    instructors,
    onChange,
    onSubmit,
    setThumbnailFile,
    handleManageVideos,
  }: CreateCourseState = useCreateCourse();

  if (fetching) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="pb-6 border-b border-border">
        <h1 className="text-2xl font-semibold text-text-primary mb-2">
          {isEditMode ? "Edit Course" : "Create Course"}
        </h1>
        <p className="text-sm text-text-secondary">
          {isEditMode
            ? "Update your course content and metadata."
            : "Build a course draft with clean metadata and outcomes."}
        </p>
      </div>

      <form
        onSubmit={onSubmit}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-white p-6 rounded-xl border border-border shadow-sm">
            <h2 className="text-base font-semibold text-text-primary mb-6">
              Course Details
            </h2>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Title
                </label>
                <input
                  required
                  name="title"
                  value={form.title}
                  onChange={onChange}
                  placeholder="e.g. React Fundamentals"
                  className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Subtitle
                </label>
                <input
                  name="subtitle"
                  value={form.subtitle}
                  onChange={onChange}
                  placeholder="Short value proposition for learners"
                  className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Category
                  </label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={onChange}
                    className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  >
                    <option>Development</option>
                    <option>Business</option>
                    <option>Design</option>
                    <option>Data Science</option>
                    <option>Artificial Intelligence</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Difficulty
                  </label>
                  <select
                    name="difficulty"
                    value={form.difficulty}
                    onChange={onChange}
                    className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  >
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Language
                  </label>
                  <select
                    name="language"
                    value={form.language}
                    onChange={onChange}
                    className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  >
                    <option>English</option>
                    <option>Urdu</option>
                    <option>Arabic</option>
                  </select>
                </div>
              </div>

              {isAdmin && !isEditMode && (
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Assign Instructor *
                  </label>
                  <select
                    required
                    name="instructorId"
                    value={form.instructorId || ""}
                    onChange={onChange}
                    className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  >
                    <option value="">Select instructor...</option>
                    {instructors.map((inst) => (
                      <option key={inst.id} value={inst.id}>
                        {inst.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Course Thumbnail
                </label>
                {thumbnailPreview && (
                  <div className="mb-3">
                    <img
                      src={thumbnailPreview}
                      alt="Course thumbnail preview"
                      className="w-full h-40 object-cover rounded-lg border border-border"
                    />
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setThumbnailFile(e.target.files?.[0] || null)
                  }
                  className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
                <p className="text-xs text-text-secondary mt-2">
                  Upload a course thumbnail image (stored as base64 for now).
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={onChange}
                  placeholder="Write a clear course description for learners..."
                  rows={5}
                  className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Skills (comma separated)
                </label>
                <input
                  name="skills"
                  value={form.skills}
                  onChange={onChange}
                  placeholder="e.g. React, TypeScript, UI Design"
                  className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
                <p className="text-xs text-text-secondary mt-2">
                  Use commas to separate skills for filtering.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Duration (minutes)
                </label>
                <input
                  name="durationMinutes"
                  value={form.durationMinutes}
                  onChange={onChange}
                  inputMode="numeric"
                  placeholder="e.g. 180"
                  className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Learning Outcomes
                </label>
                <textarea
                  name="outcomes"
                  value={form.outcomes}
                  onChange={onChange}
                  placeholder="Example: Build reusable React components, Manage state with hooks..."
                  rows={4}
                  className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                />
                <p className="text-xs text-text-secondary mt-2">
                  Tip: keep outcomes action-oriented and measurable.
                </p>
              </div>
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <section className="bg-white p-6 rounded-xl border border-border shadow-sm">
            <h2 className="text-base font-semibold text-text-primary mb-6">
              Publishing
            </h2>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Status
                </label>
                <select
                  name="status"
                  value={form.status}
                  onChange={onChange}
                  className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                >
                  <option>Draft</option>
                  <option>Published</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Price (USD)
                </label>
                <input
                  name="price"
                  value={form.price}
                  onChange={onChange}
                  inputMode="decimal"
                  className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
                <p className="text-xs text-text-secondary mt-2">
                  Set 0 for free courses.
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              <button
                type="submit"
                disabled={loading}
                className="w-full px-4 py-3 bg-primary text-white font-medium text-sm rounded-lg hover:bg-primary-hover transition-all shadow-sm disabled:opacity-50 cursor-pointer"
              >
                {loading
                  ? "Saving..."
                  : isEditMode
                    ? "Update Course"
                    : "Create Course"}
              </button>
              {isEditMode && (
                <button
                  type="button"
                  onClick={handleManageVideos}
                  className="w-full px-4 py-3 border border-border text-text-secondary font-medium text-sm rounded-lg hover:bg-surface-hover hover:border-gray-300 transition-all cursor-pointer"
                >
                  Manage Videos
                </button>
              )}
            </div>
          </section>

          <section className="bg-white p-6 rounded-xl border border-border shadow-sm">
            <h2 className="text-base font-semibold text-text-primary mb-2">
              Next Steps
            </h2>
            <p className="text-sm text-text-secondary">
              After creating the course, upload videos and arrange lessons.
            </p>
            <div className="mt-4 grid grid-cols-1 gap-3">
              {[
                {
                  title: "Upload videos",
                  desc: "Add lesson videos and assets.",
                },
                {
                  title: "Structure lessons",
                  desc: "Organize modules and lessons.",
                },
                {
                  title: "Preview & publish",
                  desc: "Validate content before publishing.",
                },
              ].map((n) => (
                <div
                  key={n.title}
                  className="p-3 rounded-lg bg-surface border border-border"
                >
                  <div className="text-sm font-semibold text-text-primary">
                    {n.title}
                  </div>
                  <div className="text-xs text-text-secondary mt-0.5">
                    {n.desc}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </form>
    </div>
  );
};

export default CreateCourse;
