export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: "student" | "instructor" | "admin";
}

export interface FAQItem {
  q: string;
  a: string;
}

export interface TestimonialItem {
  name: string;
  quote: string;
  image: string;
}

export interface CareerSkillCourse {
  id: string;
  university: string;
  logo: string;
  title: string;
  type: string;
  image: string;
}

export interface HomeHeaderState {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  isRegisterModalOpen: boolean;
  setIsRegisterModalOpen: (open: boolean) => void;
  isUserMenuOpen: boolean;
  setIsUserMenuOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  user: User | null;
  signOut: () => Promise<void>;
  openAuth: (e?: React.MouseEvent) => void;
  openRegister: (e?: React.MouseEvent) => void;
  switchToRegister: () => void;
  switchToLogin: () => void;
  handleSearch: (e: React.FormEvent) => void;
}

export interface CareerSkillsState {
  courses: CareerSkillCourse[];
  isLoading: boolean;
  showAll: boolean;
  setShowAll: (show: boolean) => void;
  visibleCourses: CareerSkillCourse[];
  remainingCount: number;
  handleCourseClick: (courseId: string) => void;
}

export interface FAQState {
  openIndex: number | null;
  toggleIndex: (index: number) => void;
}

export interface FooterProps {
  simple?: boolean;
}
