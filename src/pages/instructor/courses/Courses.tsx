import React from "react";
import { Link } from "react-router-dom";
import useCourses from "./useCourses";
import type { CoursesState } from "../../../types/ui/instructor/courses.types";

const Courses: React.FC = () => {
  const {
    items: courses,
    loading,
    fetchCourses,
    handleDelete,
  }: CoursesState = useCourses();

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <h1 className="text-2xl font-semibold text-text-primary mb-2">
            My Courses
          </h1>
          <p className="text-sm text-text-secondary">
            Create, update, and publish your course catalog.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={fetchCourses}
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
          <Link
            to="/instructor/courses/new"
            className="px-4 py-2 bg-primary text-white font-medium text-sm rounded-lg hover:bg-primary-hover transition-all shadow-sm"
          >
            + Create Course
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-surface border-b border-border">
                <th className="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  Course
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  Students
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  Updated
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {loading ? (
                <tr>
                  <td colSpan={6} className="p-12 text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
                  </td>
                </tr>
              ) : courses.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="p-16 text-center text-text-secondary"
                  >
                    No courses found. Start by creating one!
                  </td>
                </tr>
              ) : (
                courses.map((c) => (
                  <tr key={c.id} className="hover:bg-surface transition-colors">
                    <td className="px-6 py-4">
                      <div className="text-sm font-semibold text-text-primary">
                        {c.title}
                      </div>
                      <div className="text-xs text-text-secondary mt-0.5">
                        ID: {c.id}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium border ${
                          c.status === "Published"
                            ? "bg-badge-success-bg text-badge-success-text border-badge-success-border"
                            : "bg-badge-warning-bg text-badge-warning-text border-badge-warning-border"
                        }`}
                      >
                        {c.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-text-secondary">
                        {c._count.enrollments.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-text-secondary">
                        {c._count.reviews > 0 ? "4.8" : "—"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-text-secondary">
                        {new Date(c.updatedAt).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="inline-flex items-center gap-3">
                        <Link
                          to={`/instructor/videos?courseId=${c.id}`}
                          className="text-sm font-medium text-primary hover:text-primary-hover transition-colors"
                        >
                          Manage Content
                        </Link>
                        <Link
                          to={`/instructor/courses/${c.id}/curriculum`}
                          className="text-sm font-medium text-primary hover:text-primary-hover transition-colors"
                        >
                          Curriculum
                        </Link>
                        <Link
                          to={`/instructor/courses/edit/${c.id}`}
                          className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(c.id)}
                          className="text-sm font-medium text-error hover:text-red-700 transition-colors cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Courses;
