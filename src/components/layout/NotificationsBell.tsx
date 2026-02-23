import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import type { RootState } from "../../redux/store";
import { notificationApi } from "../../services/notificationApi";
import {
  getNotificationSocket,
  resetNotificationSocket,
} from "../../services/notificationSocket";

const NotificationsBell: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();
  const location = useLocation();
  const isUpdatesPage = location.pathname === "/updates";
  const [unreadCount, setUnreadCount] = useState(0);
  const lastToastAtRef = useRef<number | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("notifications:lastToastAt");
    if (stored) {
      const parsed = Number.parseInt(stored, 10);
      if (Number.isFinite(parsed)) lastToastAtRef.current = parsed;
    }
  }, []);

  useEffect(() => {
    let mounted = true;
    const fetchUnread = async () => {
      try {
        const res = await notificationApi.getUnreadCount();
        if (mounted) setUnreadCount(res.count || 0);
      } catch (err) {
        console.error("Failed to fetch unread notifications", err);
      }
    };

    if (isUpdatesPage) {
      setUnreadCount(0);
      localStorage.setItem("notifications:unread", "0");
    } else {
      const storedUnread = localStorage.getItem("notifications:unread");
      if (storedUnread) {
        const parsed = Number.parseInt(storedUnread, 10);
        if (Number.isFinite(parsed)) setUnreadCount(parsed);
      }
      fetchUnread();
    }

    const onRead = () => {
      setUnreadCount(0);
      localStorage.setItem("notifications:unread", "0");
    };
    window.addEventListener("notifications:read", onRead);

    return () => {
      mounted = false;
      window.removeEventListener("notifications:read", onRead);
    };
  }, [isUpdatesPage]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || !user) {
      resetNotificationSocket();
      return;
    }

    const socket = getNotificationSocket();

    const onNew = (payload: {
      unreadCount?: number;
      notification?: {
        title?: string;
        message?: string;
        createdAt?: string;
      };
    }) => {
      console.log("[notifications] socket payload:", payload);
      if (!payload?.notification) return;
      if (isUpdatesPage) {
        setUnreadCount(0);
        localStorage.setItem("notifications:unread", "0");
        return;
      }

      setUnreadCount((prev) => {
        const next =
          typeof payload.unreadCount === "number" && payload.unreadCount > 0
            ? payload.unreadCount
            : prev + 1;
        localStorage.setItem("notifications:unread", String(next));
        return next;
      });

      const n = payload.notification;
      const createdAtTs = n?.createdAt ? Date.parse(n.createdAt) : null;
      if (
        createdAtTs &&
        lastToastAtRef.current !== null &&
        createdAtTs <= lastToastAtRef.current
      ) {
        return;
      }

      if (createdAtTs) {
        lastToastAtRef.current = createdAtTs;
        localStorage.setItem("notifications:lastToastAt", String(createdAtTs));
      }

      toast(
        (t) => (
          <button
            className="text-left"
            onClick={() => {
              toast.dismiss(t.id);
              navigate("/updates");
            }}
          >
            <div className="font-semibold text-[14px] text-text-primary">
              {n.title}
            </div>
            <div className="text-[13px] text-text-secondary">{n.message}</div>
          </button>
        ),
        { duration: 5000 },
      );
    };

    socket.on("notification:new", onNew);

    return () => {
      socket.off("notification:new", onNew);
    };
  }, [isUpdatesPage, navigate, user]);

  return (
    <div className="relative">
      <button
        onClick={() => navigate("/updates")}
        className="text-[#5b5b5b] hover:text-primary p-1 transition-colors bg-transparent border-none cursor-pointer relative block no-underline"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
        </svg>
        {unreadCount > 0 && !isUpdatesPage && (
          <span className="absolute top-0 right-0 h-4 w-4 bg-[#C20E0E] text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>
    </div>
  );
};

export default NotificationsBell;
