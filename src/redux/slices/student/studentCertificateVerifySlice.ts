import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { certificateApi } from "../../../services/certificateApi";
import type {
  CertificateVerification,
  StudentCertificateVerifyState,
} from "../../../types/student";

const initialState: StudentCertificateVerifyState = {
  data: null,
  loading: true,
  error: null,
  code: null,
};

export const verifyCertificate = createAsyncThunk(
  "studentCertificateVerify/verify",
  async (code: string, { rejectWithValue }) => {
    try {
      const res = await certificateApi.verifyCertificate(code);
      return { code, data: res as CertificateVerification };
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Certificate not found.";
      return rejectWithValue(message);
    }
  },
);

const studentCertificateVerifySlice = createSlice({
  name: "studentCertificateVerify",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(verifyCertificate.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        state.code = action.meta.arg;
      })
      .addCase(verifyCertificate.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.code = action.payload.code;
      })
      .addCase(verifyCertificate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default studentCertificateVerifySlice.reducer;
