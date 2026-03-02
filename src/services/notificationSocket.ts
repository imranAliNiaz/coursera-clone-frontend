import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

const getSocketUrl = () => {
  const apiBase = import.meta.env.VITE_API_BASE_URL || "/api/v1";
  return apiBase.replace(/\/api\/v1\/?$/, "");
};

export const getNotificationSocket = () => {
  if (socket) return socket;
  const token = localStorage.getItem("token");
  socket = io(getSocketUrl(), {
    transports: ["websocket"],
    auth: { token },
  });
  return socket;
};

export const resetNotificationSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
