import api from "./apiClient";
import { ENDPOINTS } from "./endpoints";
import type {
  WorkExperience,
  WorkExperienceInput,
  Education,
  EducationInput,
  ProfileCertificate,
  ProfileCertificateInput,
  ProfileUpdateInput,
} from "../types/student";

export const userApi = {
  updateMyProfile: async (payload: ProfileUpdateInput) => {
    const response = await api.patch(ENDPOINTS.USERS_UPDATE_PROFILE, payload);
    return response.data as {
      id: string;
      name: string;
      email: string;
      role: string;
      avatarUrl?: string;
    };
  },

  getMyWorkExperiences: async () => {
    const response = await api.get(ENDPOINTS.USERS_WORK_EXPERIENCES);
    return response.data as WorkExperience[];
  },

  addMyWorkExperience: async (payload: WorkExperienceInput) => {
    const response = await api.post(ENDPOINTS.USERS_WORK_EXPERIENCES, payload);
    return response.data as WorkExperience;
  },

  updateMyWorkExperience: async (id: string, payload: WorkExperienceInput) => {
    const response = await api.put(
      ENDPOINTS.USERS_WORK_EXPERIENCE_BY_ID(id),
      payload,
    );
    return response.data as WorkExperience;
  },

  deleteMyWorkExperience: async (id: string) => {
    const response = await api.delete(
      ENDPOINTS.USERS_WORK_EXPERIENCE_BY_ID(id),
    );
    return response.data as { id: string; message: string };
  },

  getMyEducations: async () => {
    const response = await api.get(ENDPOINTS.USERS_EDUCATIONS);
    return response.data as Education[];
  },

  addMyEducation: async (payload: EducationInput) => {
    const response = await api.post(ENDPOINTS.USERS_EDUCATIONS, payload);
    return response.data as Education;
  },

  updateMyEducation: async (id: string, payload: EducationInput) => {
    const response = await api.put(
      ENDPOINTS.USERS_EDUCATION_BY_ID(id),
      payload,
    );
    return response.data as Education;
  },

  deleteMyEducation: async (id: string) => {
    const response = await api.delete(ENDPOINTS.USERS_EDUCATION_BY_ID(id));
    return response.data as { id: string; message: string };
  },

  getMyProfileCertificates: async () => {
    const response = await api.get(ENDPOINTS.USERS_PROFILE_CERTIFICATES);
    return response.data as ProfileCertificate[];
  },

  addMyProfileCertificate: async (payload: ProfileCertificateInput) => {
    const response = await api.post(
      ENDPOINTS.USERS_PROFILE_CERTIFICATES,
      payload,
    );
    return response.data as ProfileCertificate;
  },

  updateMyProfileCertificate: async (
    id: string,
    payload: ProfileCertificateInput,
  ) => {
    const response = await api.put(
      ENDPOINTS.USERS_PROFILE_CERTIFICATE_BY_ID(id),
      payload,
    );
    return response.data as ProfileCertificate;
  },

  deleteMyProfileCertificate: async (id: string) => {
    const response = await api.delete(
      ENDPOINTS.USERS_PROFILE_CERTIFICATE_BY_ID(id),
    );
    return response.data as { id: string; message: string };
  },
};
