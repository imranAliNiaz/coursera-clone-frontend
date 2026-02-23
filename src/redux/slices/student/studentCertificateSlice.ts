import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { certificateApi } from "../../../services/certificateApi";
import type {
  CertificateData,
  StudentCertificateState,
} from "../../../types/student";

const initialState: StudentCertificateState = {
  certificate: null,
  loading: true,
  error: null,
  currentId: null,
};

export const fetchCertificate = createAsyncThunk(
  "studentCertificate/fetch",
  async (id: string, { rejectWithValue }) => {
    try {
      const data = await certificateApi.getCertificateById(id);
      return { id, certificate: data as CertificateData };
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to load certificate";
      return rejectWithValue(message);
    }
  },
);

const studentCertificateSlice = createSlice({
  name: "studentCertificate",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCertificate.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        state.currentId = action.meta.arg;
      })
      .addCase(fetchCertificate.fulfilled, (state, action) => {
        state.loading = false;
        state.certificate = action.payload.certificate;
        state.currentId = action.payload.id;
      })
      .addCase(fetchCertificate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default studentCertificateSlice.reducer;
