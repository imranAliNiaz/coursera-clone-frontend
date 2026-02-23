import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userApi } from "../../../services/userApi";
import { certificateApi } from "../../../services/certificateApi";
import type {
  WorkExperienceInput,
  EducationInput,
  ProfileCertificateInput,
  StudentProfileState,
} from "../../../types/student";

const initialState: StudentProfileState = {
  workExperiences: [],
  educations: [],
  profileCertificates: [],
  completedCourses: [],
  isLoadingWork: true,
  isLoadingCredentials: true,
  isLoadingCompletedCourses: true,
  isSavingWork: false,
  isSavingCredential: false,
  isDeletingWorkId: null,
  isDeletingCredentialId: null,
  error: null,
};

export const fetchProfileData = createAsyncThunk(
  "studentProfile/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const [workItems, educationItems, certificateItems, completedItems] =
        await Promise.all([
          userApi.getMyWorkExperiences(),
          userApi.getMyEducations(),
          userApi.getMyProfileCertificates(),
          certificateApi.getMyCertificates(),
        ]);
      return {
        workExperiences: Array.isArray(workItems) ? workItems : [],
        educations: Array.isArray(educationItems) ? educationItems : [],
        profileCertificates: Array.isArray(certificateItems)
          ? certificateItems
          : [],
        completedCourses: Array.isArray(completedItems) ? completedItems : [],
      };
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to fetch profile data";
      return rejectWithValue(message);
    }
  },
);

export const saveWorkExperience = createAsyncThunk(
  "studentProfile/saveWork",
  async (
    payload: { id?: string; data: WorkExperienceInput },
    { rejectWithValue },
  ) => {
    try {
      if (payload.id) {
        const updated = await userApi.updateMyWorkExperience(
          payload.id,
          payload.data,
        );
        return { id: payload.id, item: updated, mode: "update" as const };
      }
      const created = await userApi.addMyWorkExperience(payload.data);
      return { item: created, mode: "create" as const };
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to save work experience";
      return rejectWithValue(message);
    }
  },
);

export const deleteWorkExperience = createAsyncThunk(
  "studentProfile/deleteWork",
  async (id: string, { rejectWithValue }) => {
    try {
      await userApi.deleteMyWorkExperience(id);
      return id;
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to delete work experience";
      return rejectWithValue(message);
    }
  },
);

export const saveEducation = createAsyncThunk(
  "studentProfile/saveEducation",
  async (
    payload: { id?: string; data: EducationInput },
    { rejectWithValue },
  ) => {
    try {
      if (payload.id) {
        const updated = await userApi.updateMyEducation(
          payload.id,
          payload.data,
        );
        return { id: payload.id, item: updated, mode: "update" as const };
      }
      const created = await userApi.addMyEducation(payload.data);
      return { item: created, mode: "create" as const };
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to save education";
      return rejectWithValue(message);
    }
  },
);

export const deleteEducation = createAsyncThunk(
  "studentProfile/deleteEducation",
  async (id: string, { rejectWithValue }) => {
    try {
      await userApi.deleteMyEducation(id);
      return id;
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to delete education";
      return rejectWithValue(message);
    }
  },
);

export const saveProfileCertificate = createAsyncThunk(
  "studentProfile/saveCertificate",
  async (
    payload: { id?: string; data: ProfileCertificateInput },
    { rejectWithValue },
  ) => {
    try {
      if (payload.id) {
        const updated = await userApi.updateMyProfileCertificate(
          payload.id,
          payload.data,
        );
        return { id: payload.id, item: updated, mode: "update" as const };
      }
      const created = await userApi.addMyProfileCertificate(payload.data);
      return { item: created, mode: "create" as const };
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to save certificate";
      return rejectWithValue(message);
    }
  },
);

export const deleteProfileCertificate = createAsyncThunk(
  "studentProfile/deleteCertificate",
  async (id: string, { rejectWithValue }) => {
    try {
      await userApi.deleteMyProfileCertificate(id);
      return id;
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to delete certificate";
      return rejectWithValue(message);
    }
  },
);

const studentProfileSlice = createSlice({
  name: "studentProfile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfileData.pending, (state) => {
        state.isLoadingWork = true;
        state.isLoadingCredentials = true;
        state.isLoadingCompletedCourses = true;
        state.error = null;
      })
      .addCase(fetchProfileData.fulfilled, (state, action) => {
        state.isLoadingWork = false;
        state.isLoadingCredentials = false;
        state.isLoadingCompletedCourses = false;
        state.workExperiences = action.payload.workExperiences;
        state.educations = action.payload.educations;
        state.profileCertificates = action.payload.profileCertificates;
        state.completedCourses = action.payload.completedCourses;
      })
      .addCase(fetchProfileData.rejected, (state, action) => {
        state.isLoadingWork = false;
        state.isLoadingCredentials = false;
        state.isLoadingCompletedCourses = false;
        state.error = action.payload as string;
      })
      .addCase(saveWorkExperience.pending, (state) => {
        state.isSavingWork = true;
      })
      .addCase(saveWorkExperience.fulfilled, (state, action) => {
        state.isSavingWork = false;
        if (action.payload.mode === "update") {
          state.workExperiences = state.workExperiences.map((item) =>
            item.id === action.payload.id ? action.payload.item : item,
          );
        } else {
          state.workExperiences = [
            action.payload.item,
            ...state.workExperiences,
          ];
        }
      })
      .addCase(saveWorkExperience.rejected, (state, action) => {
        state.isSavingWork = false;
        state.error = action.payload as string;
      })
      .addCase(deleteWorkExperience.pending, (state, action) => {
        state.isDeletingWorkId = action.meta.arg;
      })
      .addCase(deleteWorkExperience.fulfilled, (state, action) => {
        state.isDeletingWorkId = null;
        state.workExperiences = state.workExperiences.filter(
          (item) => item.id !== action.payload,
        );
      })
      .addCase(deleteWorkExperience.rejected, (state, action) => {
        state.isDeletingWorkId = null;
        state.error = action.payload as string;
      })
      .addCase(saveEducation.pending, (state) => {
        state.isSavingCredential = true;
      })
      .addCase(saveEducation.fulfilled, (state, action) => {
        state.isSavingCredential = false;
        if (action.payload.mode === "update") {
          state.educations = state.educations.map((item) =>
            item.id === action.payload.id ? action.payload.item : item,
          );
        } else {
          state.educations = [action.payload.item, ...state.educations];
        }
      })
      .addCase(saveEducation.rejected, (state, action) => {
        state.isSavingCredential = false;
        state.error = action.payload as string;
      })
      .addCase(deleteEducation.pending, (state, action) => {
        state.isDeletingCredentialId = action.meta.arg;
      })
      .addCase(deleteEducation.fulfilled, (state, action) => {
        state.isDeletingCredentialId = null;
        state.educations = state.educations.filter(
          (item) => item.id !== action.payload,
        );
      })
      .addCase(deleteEducation.rejected, (state, action) => {
        state.isDeletingCredentialId = null;
        state.error = action.payload as string;
      })
      .addCase(saveProfileCertificate.pending, (state) => {
        state.isSavingCredential = true;
      })
      .addCase(saveProfileCertificate.fulfilled, (state, action) => {
        state.isSavingCredential = false;
        if (action.payload.mode === "update") {
          state.profileCertificates = state.profileCertificates.map((item) =>
            item.id === action.payload.id ? action.payload.item : item,
          );
        } else {
          state.profileCertificates = [
            action.payload.item,
            ...state.profileCertificates,
          ];
        }
      })
      .addCase(saveProfileCertificate.rejected, (state, action) => {
        state.isSavingCredential = false;
        state.error = action.payload as string;
      })
      .addCase(deleteProfileCertificate.pending, (state, action) => {
        state.isDeletingCredentialId = action.meta.arg;
      })
      .addCase(deleteProfileCertificate.fulfilled, (state, action) => {
        state.isDeletingCredentialId = null;
        state.profileCertificates = state.profileCertificates.filter(
          (item) => item.id !== action.payload,
        );
      })
      .addCase(deleteProfileCertificate.rejected, (state, action) => {
        state.isDeletingCredentialId = null;
        state.error = action.payload as string;
      });
  },
});

export default studentProfileSlice.reducer;
