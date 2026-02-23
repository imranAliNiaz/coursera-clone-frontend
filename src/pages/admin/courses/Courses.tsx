import React from "react";
import { Link } from "react-router-dom";
import useCourses from "./useCourses";
import type { CoursesState } from "../../../types/ui/admin/courses.types";

const Courses: React.FC = () => {
  const {
    courses,
    loading,
    error,
    fetchCourses,
    handleDeleteCourse,
  }: CoursesState = useCourses();

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <h1 className="text-2xl font-semibold text-text-primary mb-2">
            Courses Catalog
          </h1>
          <p className="text-sm text-text-secondary">
            Manage and curate educational content across the platform
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={fetchCourses}
            className="px-4 py-2 border border-border text-text-secondary font-medium text-sm rounded-lg hover:bg-surface-hover hover:border-border-dark transition-all flex items-center gap-2 cursor-pointer"
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
          <Link
            to="/admin/courses/new"
            className="px-4 py-2 bg-primary text-white font-medium text-sm rounded-lg hover:bg-primary-hover transition-all shadow-sm flex items-center gap-2"
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
            Add Course
          </Link>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-error/10 text-error rounded-lg text-sm border border-error/20">
          {error}
        </div>
      )}

      <div className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-text-primary" />
            <p className="text-text-secondary text-sm mt-4">
              Loading catalog...
            </p>
          </div>
        ) : courses.length === 0 ? (
          <div className="p-16 text-center">
            <svg
              className="w-12 h-12 text-text-muted mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            <p className="text-text-primary font-medium">No courses found</p>
            <p className="text-text-secondary text-sm mt-1">
              Courses created by instructors will appear here
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-surface-hover border-b border-border">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-text-primary uppercase tracking-wider">
                    Course
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-text-primary uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-text-primary uppercase tracking-wider">
                    Instructor
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-text-primary uppercase tracking-wider">
                    Metrics
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-text-primary uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-text-primary uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-light">
                {courses.map((course) => (
                  <tr
                    key={course.id}
                    className="hover:bg-surface-hover transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-text-primary truncate">
                          {course.title}
                        </p>
                        <p className="text-xs text-text-secondary truncate max-w-xs">
                          {course.category}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                          course.status === "Published"
                            ? "bg-success/10 text-success"
                            : "bg-surface-hover text-text-secondary"
                        }`}
                      >
                        {course.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-text-secondary">
                      {course.instructor.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-text-secondary">
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-medium">
                          Students:{" "}
                          <span className="text-text-primary">
                            {course._count.enrollments}
                          </span>
                        </span>
                        <span className="text-xs font-medium">
                          Reviews:{" "}
                          <span className="text-text-primary">
                            {course._count.reviews}
                          </span>
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-text-primary">
                      ${course.price}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="inline-flex items-center gap-3">
                        <Link
                          to={`/admin/videos?courseId=${course.id}`}
                          className="text-sm font-medium text-primary hover:text-primary-hover transition-colors"
                        >
                          Manage Content
                        </Link>
                        <Link
                          to={`/admin/courses/${course.id}/curriculum`}
                          className="text-sm font-medium text-primary hover:text-primary-hover transition-colors"
                        >
                          Curriculum
                        </Link>
                        <Link
                          to={`/admin/courses/edit/${course.id}`}
                          className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDeleteCourse(course.id)}
                          className="text-sm font-medium text-error hover:text-error/80 transition-colors cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;
