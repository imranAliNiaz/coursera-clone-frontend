import api from "./apiClient";
import { ENDPOINTS } from "./endpoints";

export const notificationApi = {
  getMyNotifications: async (limit?: number) => {
    const response = await api.get(ENDPOINTS.NOTIFICATIONS_MY, {
      params: typeof limit === "number" ? { limit } : undefined,
    });
    return response.data;
  },

  getUnreadCount: async () => {
    const response = await api.get(ENDPOINTS.NOTIFICATIONS_UNREAD_COUNT);
    return response.data as { count: number };
  },

  markAllRead: async () => {
    const response = await api.post(ENDPOINTS.NOTIFICATIONS_MARK_READ);
    return response.data as { updated: number };
  },
};
