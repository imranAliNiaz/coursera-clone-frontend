import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  fetchAdminDashboard,
  setAdminDashboardMetric,
} from "../../../redux/slices/admin/adminDashboardSlice";
import type {
  AdminActivity,
  OverviewState,
  StatCard,
} from "../../../types/ui/admin/overview.types";

const useOverview = (): OverviewState => {
  const dispatch = useAppDispatch();
  const { data, loading, chartLoading, error, timeseries, metric } =
    useAppSelector((state) => state.adminDashboard);

  useEffect(() => {
    dispatch(fetchAdminDashboard());
  }, [dispatch]);

  const chartData = useMemo(
    () =>
      timeseries.map((d) => ({
        ...d,
        label: d.date.slice(5),
      })),
    [timeseries],
  );

  const formatNumber = (value?: number) =>
    typeof value === "number"
      ? new Intl.NumberFormat("en-US").format(value)
      : "--";
  const formatCurrency = (value?: number) =>
    typeof value === "number"
      ? new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          maximumFractionDigits: 0,
        }).format(value)
      : "--";

  const stats: StatCard[] = [
    {
      name: "Total Users",
      value: data?.overview.totalUsers || 0,
      change: "+2.5%", // Placeholder for growth calculation
      isPositive: true,
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
    },
    {
      name: "Active Courses",
      value: data?.overview.totalCourses || 0,
      change: "+4.2%",
      isPositive: true,
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      ),
    },
    {
      name: "Total Revenue",
      value: `$${(data?.overview.totalRevenue || 0).toLocaleString()}`,
      change: "+18.3%",
      isPositive: true,
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      name: "Enrollments",
      value: data?.overview.totalEnrollments || 0,
      change: "+5.1%",
      isPositive: true,
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
      ),
    },
  ];

  const activities: AdminActivity[] =
    data?.recentSignups.map((user) => ({
      user: user.name,
      action: "joined as",
      target:
        user.role === "student"
          ? "Learner"
          : user.role === "instructor"
            ? "Instructor"
            : "Admin",
      time: new Date(user.createdAt).toLocaleDateString(),
    })) || [];

  return {
    data,
    loading,
    chartLoading,
    error,
    metric,
    setMetric: (value: "enrollments" | "revenue") =>
      dispatch(setAdminDashboardMetric(value)),
    chartData,
    stats,
    activities,
    formatNumber,
    formatCurrency,
  };
};

export default useOverview;
