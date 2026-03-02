import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { notificationApi } from "../../../services/notificationApi";
import type {
  UpdateItem,
  NotificationData,
  StudentUpdatesState,
} from "../../../types/student";

const initialState: StudentUpdatesState = {
  items: [],
  loading: true,
  error: null,
};

export const fetchUpdates = createAsyncThunk(
  "studentUpdates/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const data = await notificationApi.getMyNotifications();
      const mapActionText = (type: UpdateItem["type"]) => {
        if (type === "CERTIFICATE_READY") return "View Certificate";
        if (type === "COURSE_COMPLETED") return "View Accomplishments";
        if (type === "ENROLLMENT") return "Go to Course";
        return "Read More";
      };
      const mapped: UpdateItem[] = ((data || []) as NotificationData[]).map(
        (n) => ({
          id: n.id,
          type: n.type,
          title: n.title,
          message: n.message,
          actionText: mapActionText(n.type),
          link: n.link || "#",
          image: n.imageUrl || undefined,
          isRead: !!n.readAt,
          createdAt: n.createdAt,
        }),
      );
      return mapped;
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to load notifications";
      return rejectWithValue(message);
    }
  },
);

export const markAllUpdatesRead = createAsyncThunk(
  "studentUpdates/markAllRead",
  async () => {
    await notificationApi.markAllRead();
    return true;
  },
);

const studentUpdatesSlice = createSlice({
  name: "studentUpdates",
  initialState,
  reducers: {
    prependUpdate(state, action: { payload: UpdateItem }) {
      state.items = [action.payload, ...state.items];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUpdates.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUpdates.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchUpdates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { prependUpdate } = studentUpdatesSlice.actions;
export default studentUpdatesSlice.reducer;
