import { useEffect, useState } from "react";
import { getNotificationSocket } from "../../services/notificationSocket";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import type { UpdateItem } from "../../types/student";
import type { SocketPayload } from "../../types/ui/updates.types";
import {
  fetchUpdates,
  markAllUpdatesRead,
  prependUpdate,
} from "../../redux/slices/student/studentUpdatesSlice";
import { toast } from "react-hot-toast";

const useUpdates = () => {
  const dispatch = useAppDispatch();
  const { items, loading } = useAppSelector((state) => state.studentUpdates);
  const [now, setNow] = useState(() => Date.now());
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const skeletonCount = 3;

  const formatRelativeTime = (value?: string, currentMs?: number) => {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    const diffSeconds = Math.max(
      0,
      Math.floor(((currentMs ?? Date.now()) - date.getTime()) / 1000),
    );
    if (diffSeconds < 60) return "just now";
    const minutes = Math.floor(diffSeconds / 60);
    if (minutes < 60) return `${minutes} min${minutes === 1 ? "" : "s"} ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
    const days = Math.floor(hours / 24);
    if (days < 30) return `${days} day${days === 1 ? "" : "s"} ago`;
    const months = Math.floor(days / 30);
    if (months < 12) return `${months} month${months === 1 ? "" : "s"} ago`;
    const years = Math.floor(months / 12);
    return `${years} year${years === 1 ? "" : "s"} ago`;
  };

  const mapActionText = (type: UpdateItem["type"]) => {
    if (type === "CERTIFICATE_READY") return "View Certificate";
    if (type === "COURSE_COMPLETED") return "View Accomplishments";
    if (type === "ENROLLMENT") return "Go to Course";
    return "Read More";
  };

  useEffect(() => {
    dispatch(fetchUpdates())
      .unwrap()
      .then(() => dispatch(markAllUpdatesRead()))
      .then(() => window.dispatchEvent(new Event("notifications:read")))
      .catch(() => {
        toast.error("Failed to load notifications.");
      });
  }, [dispatch]);

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 60 * 1000);
    return () => window.clearInterval(id);
  }, []);

  const totalPages = Math.ceil(items.length / pageSize);
  const effectivePage =
    items.length > 0 ? Math.min(currentPage, Math.max(1, totalPages)) : 1;
  const startIndex = (effectivePage - 1) * pageSize;
  const pageItems = items.slice(startIndex, startIndex + pageSize);

  useEffect(() => {
    const socket = getNotificationSocket();

    const onNew = async (payload: SocketPayload) => {
      if (!payload?.notification) return;

      const n = payload.notification;

      const mapped: UpdateItem = {
        id: n.id,
        type: n.type,
        title: n.title,
        message: n.message,
        actionText: mapActionText(n.type),
        link: n.link || "#",
        image: n.imageUrl || undefined,
        isRead: true,
        createdAt: n.createdAt,
      };

      dispatch(prependUpdate(mapped));
      setCurrentPage(1);

      try {
        await dispatch(markAllUpdatesRead()).unwrap();
        window.dispatchEvent(new Event("notifications:read"));
      } catch {
        toast.error("Failed to update notification status.");
      }
    };

    socket.on("notification:new", onNew);
    return () => {
      socket.off("notification:new", onNew);
    };
  }, [dispatch]);

  return {
    items,
    loading,
    now,
    currentPage,
    setCurrentPage,
    pageSize,
    skeletonCount,
    pageItems,
    totalPages,
    formatRelativeTime,
  };
};

export default useUpdates;
