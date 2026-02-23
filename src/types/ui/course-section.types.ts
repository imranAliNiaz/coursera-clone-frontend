import type { DashboardItem } from "../student";

export interface CourseSectionProps {
  title: string;
  initialVisibleCount?: number;
  columns?: {
    base?: number;
    md?: number;
    lg?: number;
  };
  isLoading?: boolean;
  skeletonCount?: number;
  courses: DashboardItem[];
}

export interface ColumnConfig {
  base?: number;
  md?: number;
  lg?: number;
}
