import { useEffect, useMemo, useState } from "react";
import type { ColumnConfig } from "../../../types/ui/course-section.types";

const useCourseSection = (
  coursesLength: number,
  initialVisibleCount: number,
  columns: ColumnConfig,
  skeletonCount?: number,
) => {
  const [visibleCount, setVisibleCount] = useState(
    Math.min(initialVisibleCount, coursesLength),
  );

  useEffect(() => {
    setVisibleCount(Math.min(initialVisibleCount, coursesLength));
  }, [coursesLength, initialVisibleCount]);

  const remainingCount = coursesLength - visibleCount;
  const displaySkeletonCount = skeletonCount ?? initialVisibleCount;

  const gridClasses = useMemo(() => {
    const base = columns.base ?? 1;
    const md = columns.md ?? 2;
    const lg = columns.lg ?? 4;

    const baseClass =
      base === 2 ? "grid-cols-2" : base === 3 ? "grid-cols-3" : "grid-cols-1";
    const mdClass =
      md === 2
        ? "md:grid-cols-2"
        : md === 3
          ? "md:grid-cols-3"
          : "md:grid-cols-1";
    const lgClass =
      lg === 2
        ? "lg:grid-cols-2"
        : lg === 3
          ? "lg:grid-cols-3"
          : "lg:grid-cols-4";

    return `${baseClass} ${mdClass} ${lgClass}`;
  }, [columns.base, columns.md, columns.lg]);

  const showAll = () => setVisibleCount(coursesLength);

  return {
    displaySkeletonCount,
    gridClasses,
    remainingCount,
    showAll,
    visibleCount,
  };
};

export default useCourseSection;
