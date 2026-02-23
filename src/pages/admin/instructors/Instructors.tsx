import React from "react";
import useInstructors from "./useInstructors";
import type { InstructorsState } from "../../../types/ui/admin/instructors.types";

const Instructors: React.FC = () => {
  const {
    instructors,
    loading,
    error,
    handleRemoveInstructor,
  }: InstructorsState = useInstructors();

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <h1 className="text-2xl font-semibold text-text-primary mb-2">
            Instructor Network
          </h1>
          <p className="text-sm text-text-secondary">
            Manage faculty and content creators
          </p>
        </div>
        <button className="px-4 py-2 bg-primary text-white font-medium text-sm rounded-lg hover:bg-primary-hover transition-all shadow-sm cursor-pointer">
          + Add Instructor
        </button>
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
              Syncing instructor data...
            </p>
          </div>
        ) : instructors.length === 0 ? (
          <div className="p-12 text-center text-text-secondary">
            No instructors found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-surface-hover border-b border-border">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-text-primary uppercase tracking-wider">
                    Instructor
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-text-primary uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-text-primary uppercase tracking-wider">
                    Courses
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-text-primary uppercase tracking-wider">
                    Students
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-text-primary uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-light">
                {instructors.map((instructor) => (
                  <tr
                    key={instructor.id}
                    className="hover:bg-surface-hover transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-text-primary flex items-center justify-center text-white font-semibold text-sm shadow-sm group-hover:scale-105 transition-transform">
                          {instructor.avatarUrl ? (
                            <img
                              src={instructor.avatarUrl}
                              alt=""
                              className="w-full h-full rounded-xl object-cover"
                            />
                          ) : (
                            instructor.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-text-primary">
                            {instructor.name}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-text-secondary">
                      {instructor.email}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-text-primary">
                        {instructor._count.courses}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-text-secondary">
                        {instructor._count.enrollments.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <button
                          onClick={() => handleRemoveInstructor(instructor.id)}
                          className="text-sm font-medium text-error hover:text-error/80 transition-colors cursor-pointer"
                        >
                          Remove
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

export default Instructors;
