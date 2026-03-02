import type { MappedSearchResult } from "../student";

export interface FilterOption {
  label: string;
  value: string;
  count?: number;
}

export interface FilterCategoryProps {
  title: string;
  items: FilterOption[];
  showMore?: boolean;
  selectedValues: string[];
  onToggle: (value: string) => void;
}

export interface FilterSidebarProps {
  subjects: string[];
  skills: string[];
  levels: string[];
  durations: string[];
  subjectOptions: FilterOption[];
  skillOptions: FilterOption[];
  levelOptions: FilterOption[];
  durationOptions: FilterOption[];
  educatorOptions: FilterOption[];
  languageOptions: FilterOption[];
  selectedEducators: string[];
  languages: string[];
  onToggleSubject: (value: string) => void;
  onToggleSkill: (value: string) => void;
  onToggleLevel: (value: string) => void;
  onToggleDuration: (value: string) => void;
  onToggleEducator: (value: string) => void;
  onToggleLanguage: (value: string) => void;
}

export type SearchCourseCardProps = MappedSearchResult;

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface CourseSearchOverlayProps {
  show: boolean;
  overlayRef: React.RefObject<HTMLDivElement | null>;
  searchQuery: string;
  isLoading: boolean;
  popularSuggestions: string[];
  results: import("../student").SearchCourse[];
  selectedIndex: number;
  onSelectSuggestion: (suggestion: string, index?: number) => void;
  onSelectCourse: (
    course: import("../student").SearchCourse,
    index?: number,
  ) => void;
  onHover: (index: number) => void;
  onSeeAll: () => void;
}
