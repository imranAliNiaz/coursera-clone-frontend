import React from "react";
import useOverview from "./useOverview";
import type { OverviewState } from "../../../types/ui/instructor/overview.types";

const Overview: React.FC = () => {
  const { loading, stats }: OverviewState = useOverview();

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="pb-6 border-b border-border">
        <h1 className="text-2xl font-semibold text-text-primary mb-2">
          Instructor Overview
        </h1>
        <p className="text-sm text-text-secondary">
          Quick snapshot of course performance and learner engagement.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-white p-6 rounded-xl border border-border shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-2.5 rounded-lg bg-primary-light text-primary">
                {s.icon}
              </div>
            </div>
            {loading ? (
              <div className="animate-pulse">
                <div className="h-[24px] w-[90px] bg-surface-hover rounded mb-2" />
                <div className="h-[14px] w-[130px] bg-gray-200 rounded mb-2" />
                <div className="h-[12px] w-[110px] bg-gray-200 rounded" />
              </div>
            ) : (
              <>
                <div className="text-2xl font-semibold text-text-primary mb-1">
                  {s.value}
                </div>
                <div className="text-sm font-medium text-text-primary">
                  {s.label}
                </div>
                <div className="text-xs text-text-secondary mt-1">
                  {s.helper}
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-border shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-text-primary">
                Publishing Checklist
              </h2>
              <p className="text-sm text-text-secondary mt-1">
                Keep your course launches clean and consistent.
              </p>
            </div>
            <button className="px-4 py-2 text-sm font-medium text-primary hover:text-primary-hover hover:bg-primary-light rounded-lg transition-colors">
              Create Course
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: "Course Metadata",
                desc: "Title, description, outcomes, category.",
              },
              {
                title: "Curriculum Builder",
                desc: "Design modules and lessons structure.",
              },
              {
                title: "Video Content",
                desc: "Attach videos to lessons from Videos tab.",
              },
              {
                title: "Pricing & Publish",
                desc: "Set price, preview, publish.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-4 rounded-lg border border-border bg-surface hover:bg-white hover:border-primary-light transition-colors cursor-default"
              >
                <div className="text-sm font-semibold text-text-primary">
                  {item.title}
                </div>
                <div className="text-xs text-text-secondary mt-1">
                  {item.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-text-primary mb-1">
              Recent Activity
            </h2>
            <p className="text-sm text-text-secondary">
              Latest course events and updates.
            </p>
          </div>
          <div className="space-y-4 max-h-[320px] overflow-y-auto custom-scrollbar pr-2">
            {[
              {
                label: "New enrollment",
                detail: "React Fundamentals",
                time: "3m ago",
              },
              {
                label: "Video uploaded",
                detail: "Lesson 2 • Routing",
                time: "1h ago",
              },
              {
                label: "Review received",
                detail: "Course rating 5.0",
                time: "5h ago",
              },
              {
                label: "Draft updated",
                detail: "AI for Beginners",
                time: "1d ago",
              },
            ].map((a, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary text-white flex items-center justify-center text-xs font-semibold">
                  IN
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-text-primary font-medium">
                    {a.label}
                  </div>
                  <div className="text-xs text-text-secondary mt-0.5">
                    {a.detail}
                  </div>
                  <div className="text-xs text-text-muted mt-1">{a.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
