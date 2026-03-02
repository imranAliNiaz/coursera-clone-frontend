import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { courseApi } from "../../../services/courseApi";
import type { InstructorCourse } from "../../../types/instructor";

interface InstructorCoursesState {
  items: InstructorCourse[];
  loading: boolean;
  error: string | null;
}

const initialState: InstructorCoursesState = {
  items: [],
  loading: true,
  error: null,
};

export const fetchInstructorCourses = createAsyncThunk(
  "instructorCourses/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const data = await courseApi.getInstructorCourses();
      return data as InstructorCourse[];
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || "Failed to load courses";
      return rejectWithValue(message);
    }
  },
);

export const deleteInstructorCourse = createAsyncThunk(
  "instructorCourses/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      await courseApi.deleteCourse(id);
      return id;
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || "Failed to delete course";
      return rejectWithValue(message);
    }
  },
);

const instructorCoursesSlice = createSlice({
  name: "instructorCourses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInstructorCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInstructorCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchInstructorCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteInstructorCourse.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (course) => course.id !== action.payload,
        );
      })
      .addCase(deleteInstructorCourse.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export default instructorCoursesSlice.reducer;
