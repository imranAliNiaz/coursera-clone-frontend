import React from "react";
import CourseCard from "./CourseCard";
import useCourseSection from "./hooks/useCourseSection";
import type { CourseSectionProps } from "../../types/ui/course-section.types";

const CourseSection: React.FC<CourseSectionProps> = ({
  title,
  courses,
  initialVisibleCount = 4,
  columns = { base: 1, md: 2, lg: 4 },
  isLoading = false,
  skeletonCount,
}) => {
  const {
    displaySkeletonCount,
    gridClasses,
    remainingCount,
    showAll,
    visibleCount,
  } = useCourseSection(
    courses.length,
    initialVisibleCount,
    columns,
    skeletonCount,
  );

  return (
    <div className="mb-12">
      <h2 className="text-[21px] font-normal text-section-heading mb-2">
        {title}
      </h2>
      <div className={`grid gap-x-6 gap-y-10 ${gridClasses}`}>
        {isLoading
          ? Array.from({ length: displaySkeletonCount }).map((_, index) => (
              <div
                key={`skeleton-${index}`}
                className="flex flex-col h-full bg-white border border-card-border rounded-[10px] overflow-hidden shadow-soft animate-pulse"
              >
                <div className="p-2">
                  <div className="h-[160px] rounded-[10px] bg-skeleton-alt" />
                </div>
                <div className="pt-3 pb-3 ml-3 mr-3 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-[26px] h-[26px] rounded-full bg-skeleton-bg" />
                    <div className="h-[12px] w-[90px] rounded bg-skeleton-bg" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-[12px] w-full rounded bg-skeleton-bg" />
                    <div className="h-[12px] w-4/5 rounded bg-skeleton-bg" />
                  </div>
                  <div className="mt-auto space-y-2">
                    <div className="h-[12px] w-[140px] rounded bg-skeleton-bg" />
                    <div className="h-[10px] w-[120px] rounded bg-skeleton-bg" />
                  </div>
                </div>
              </div>
            ))
          : courses
              .slice(0, visibleCount)
              .map((course, index) => <CourseCard key={index} {...course} />)}
      </div>
      {!isLoading && remainingCount > 0 ? (
        <button
          className="mt-8 px-6 py-[7px] border border-primary text-primary font-bold rounded-[4px] text-[14px] hover:bg-surface transition-colors"
          onClick={showAll}
        >
          Show {remainingCount} more
        </button>
      ) : null}
    </div>
  );
};

export default CourseSection;
