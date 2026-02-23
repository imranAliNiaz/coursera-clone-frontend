import type { CourseDetailsCourse } from "../student";

export interface CourseHeroProps {
  course: CourseDetailsCourse;
}

export interface CourseInfoBarProps {
  course: CourseDetailsCourse;
}

export interface CourseSeriesItem {
  id: string;
  title: string;
  thumbnail?: string | null;
}

export interface CourseSeriesProps {
  courses: CourseSeriesItem[];
}

export interface WhatYouWillLearnProps {
  outcomes?: string | string[] | null;
  description?: string | null;
}

export interface AdvanceExpertiseProps {
  thumbnailUrl?: string | null;
}

export interface CourseSeriesSideCardProps {
  instructorName?: string;
}
