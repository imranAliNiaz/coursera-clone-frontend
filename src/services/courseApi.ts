import api from "./apiClient";
import instructorApi from "./instructorApiClient";
import adminApi from "./adminApiClient";
import { ENDPOINTS } from "./endpoints";

export type CourseDifficulty = "Beginner" | "Intermediate" | "Advanced";
export type CourseStatus = "Draft" | "Published";

export interface CoursePayload {
  title: string;
  subtitle: string;
  category: string;
  difficulty: CourseDifficulty;
  language: string;
  price: number;
  status: CourseStatus;
  description: string;
  outcomes: string;
  skills: string[];
  durationMinutes?: number;
  instructorId?: string;
}

export interface LessonPayload {
  title: string;
  type: "VIDEO" | "READING" | "ASSESSMENT";
  order: number;
  description?: string;
  content?: string;
  videoUrl?: string;
  duration?: number | null;
}

export const courseApi = {
  getCourses: async (params?: {
    category?: string;
    difficulty?: string;
    language?: string;
    skills?: string;
    durationMin?: number;
    durationMax?: number;
    durationBuckets?: string;
    instructorId?: string;
    search?: string;
    page?: number;
    limit?: number;
    sortBy?: string;
  }) => {
    const response = await api.get(ENDPOINTS.COURSES, { params });
    return response.data;
  },

  getCourseById: async (id: string) => {
    const response = await api.get(ENDPOINTS.COURSES_BY_ID(id));
    return response.data;
  },

  getCourseByIdAsAdmin: async (id: string) => {
    const response = await adminApi.get(ENDPOINTS.COURSES_BY_ID(id));
    return response.data;
  },

  getRecentlyViewed: async () => {
    const response = await api.get(`${ENDPOINTS.COURSES}/recently-viewed`);
    return response.data;
  },

  getRecommendations: async () => {
    const response = await api.get(`${ENDPOINTS.COURSES}/recommendations`);
    return response.data;
  },

  searchCourses: async (query: string, limit?: number) => {
    const response = await api.get(ENDPOINTS.COURSES_SEARCH, {
      params: { q: query, limit },
    });
    return response.data;
  },

  getEnrollmentStatus: async (id: string) => {
    const response = await api.get(ENDPOINTS.COURSES_ENROLLMENT_STATUS(id));
    return response.data;
  },

  getInstructorCourses: async () => {
    const response = await instructorApi.get(ENDPOINTS.COURSES_INSTRUCTOR);
    return response.data;
  },

  getAdminCourses: async () => {
    const response = await adminApi.get(ENDPOINTS.COURSES_ADMIN_CATALOG);
    return response.data;
  },

  createCourse: async (data: CoursePayload) => {
    const response = await instructorApi.post(ENDPOINTS.COURSES, data);
    return response.data;
  },

  createCourseAsAdmin: async (data: CoursePayload) => {
    const response = await adminApi.post(ENDPOINTS.COURSES, data);
    return response.data;
  },

  updateCourse: async (id: string, data: CoursePayload) => {
    const response = await instructorApi.put(ENDPOINTS.COURSES_BY_ID(id), data);
    return response.data;
  },

  updateCourseAsAdmin: async (id: string, data: CoursePayload) => {
    const response = await adminApi.put(ENDPOINTS.COURSES_BY_ID(id), data);
    return response.data;
  },

  uploadCourseThumbnail: async (id: string, file: File) => {
    const formData = new FormData();
    formData.append("thumbnail", file);
    const response = await instructorApi.post(
      ENDPOINTS.COURSES_THUMBNAIL(id),
      formData,
      { headers: { "Content-Type": "multipart/form-data" } },
    );
    return response.data;
  },

  uploadCourseThumbnailAsAdmin: async (id: string, file: File) => {
    const formData = new FormData();
    formData.append("thumbnail", file);
    const response = await adminApi.post(
      ENDPOINTS.COURSES_THUMBNAIL(id),
      formData,
      { headers: { "Content-Type": "multipart/form-data" } },
    );
    return response.data;
  },

  deleteCourse: async (id: string) => {
    const response = await instructorApi.delete(ENDPOINTS.COURSES_BY_ID(id));
    return response.data;
  },

  deleteCourseAsAdmin: async (id: string) => {
    const response = await adminApi.delete(ENDPOINTS.COURSES_BY_ID(id));
    return response.data;
  },

  // Module & Lesson Methods
  getModules: async (courseId: string) => {
    // GET /courses/:courseId/modules
    const response = await api.get(`/courses/${courseId}/modules`);
    return response.data;
  },

  getModulesAsAdmin: async (courseId: string) => {
    const response = await adminApi.get(`/courses/${courseId}/modules`);
    return response.data;
  },

  createModule: async (
    courseId: string,
    data: { title: string; order: number },
  ) => {
    // POST /courses/:courseId/modules
    const response = await instructorApi.post(
      `/courses/${courseId}/modules`,
      data,
    );
    return response.data;
  },

  createModuleAsAdmin: async (
    courseId: string,
    data: { title: string; order: number },
  ) => {
    const response = await adminApi.post(
      `/courses/${courseId}/modules`,
      data,
    );
    return response.data;
  },

  updateModule: async (id: string, data: { title: string }) => {
    const response = await instructorApi.put(`/modules/${id}`, data);
    return response.data;
  },

  updateModuleAsAdmin: async (id: string, data: { title: string }) => {
    const response = await adminApi.put(`/modules/${id}`, data);
    return response.data;
  },

  deleteModule: async (id: string) => {
    const response = await instructorApi.delete(`/modules/${id}`);
    return response.data;
  },

  deleteModuleAsAdmin: async (id: string) => {
    const response = await adminApi.delete(`/modules/${id}`);
    return response.data;
  },

  reorderModules: async (
    courseId: string,
    modules: { id: string; order: number }[],
  ) => {
    const response = await instructorApi.put(
      `/courses/${courseId}/modules/reorder`,
      { modules },
    );
    return response.data;
  },

  reorderModulesAsAdmin: async (
    courseId: string,
    modules: { id: string; order: number }[],
  ) => {
    const response = await adminApi.put(`/courses/${courseId}/modules/reorder`, {
      modules,
    });
    return response.data;
  },

  createLesson: async (moduleId: string, data: LessonPayload) => {
    const response = await instructorApi.post(
      `/modules/${moduleId}/lessons`,
      data,
    );
    return response.data;
  },

  createLessonAsAdmin: async (moduleId: string, data: LessonPayload) => {
    const response = await adminApi.post(`/modules/${moduleId}/lessons`, data);
    return response.data;
  },

  updateLesson: async (id: string, data: Omit<LessonPayload, "order">) => {
    const response = await instructorApi.put(`/lessons/${id}`, data);
    return response.data;
  },

  updateLessonAsAdmin: async (id: string, data: Omit<LessonPayload, "order">) => {
    const response = await adminApi.put(`/lessons/${id}`, data);
    return response.data;
  },

  deleteLesson: async (id: string) => {
    const response = await instructorApi.delete(`/lessons/${id}`);
    return response.data;
  },

  deleteLessonAsAdmin: async (id: string) => {
    const response = await adminApi.delete(`/lessons/${id}`);
    return response.data;
  },

  reorderLessons: async (lessons: { id: string; order: number }[]) => {
    const response = await instructorApi.put(`/lessons/reorder`, { lessons });
    return response.data;
  },

  reorderLessonsAsAdmin: async (lessons: { id: string; order: number }[]) => {
    const response = await adminApi.put(`/lessons/reorder`, { lessons });
    return response.data;
  },
};
