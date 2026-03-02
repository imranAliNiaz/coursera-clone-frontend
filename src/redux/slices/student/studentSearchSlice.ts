import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { courseApi } from "../../../services/courseApi";
import type { SearchCourse, StudentSearchState } from "../../../types/student";

const initialState: StudentSearchState = {
  query: "",
  allCourses: [],
  loading: true,
  error: null,
};

export const fetchSearchResults = createAsyncThunk(
  "studentSearch/fetch",
  async (query: string, { rejectWithValue }) => {
    try {
      const searchTerm = query.trim();
      const baseParams: { page: number; limit: number; search?: string } = {
        page: 1,
        limit: 100,
      };
      if (searchTerm) baseParams.search = searchTerm;

      const firstResponse = await courseApi.getCourses(baseParams);
      const totalPages = firstResponse.pagination?.totalPages || 1;
      let combinedCourses: SearchCourse[] = (firstResponse.courses ||
        []) as SearchCourse[];

      if (totalPages > 1) {
        const pageRequests = Array.from(
          { length: totalPages - 1 },
          (_, index) =>
            courseApi.getCourses({ ...baseParams, page: index + 2 }),
        );
        const rest = await Promise.all(pageRequests);
        rest.forEach((response) => {
          if (Array.isArray(response?.courses)) {
            combinedCourses = combinedCourses.concat(response.courses);
          }
        });
      }

      return { query, allCourses: combinedCourses };
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Error searching courses";
      return rejectWithValue(message);
    }
  },
);

const studentSearchSlice = createSlice({
  name: "studentSearch",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchResults.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        state.query = action.meta.arg;
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.loading = false;
        state.query = action.payload.query;
        state.allCourses = action.payload.allCourses;
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.allCourses = [];
      });
  },
});

export default studentSearchSlice.reducer;
