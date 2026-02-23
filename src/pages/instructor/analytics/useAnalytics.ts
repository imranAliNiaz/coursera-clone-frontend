import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  fetchInstructorAnalytics,
  setInstructorAnalyticsMetric,
} from "../../../redux/slices/instructor/instructorAnalyticsSlice";
import type { AnalyticsState } from "../../../types/ui/instructor/analytics.types";

const useAnalytics = (): AnalyticsState => {
  const dispatch = useAppDispatch();
  const { timeseries, insights, loading, error, metric } = useAppSelector(
    (state) => state.instructorAnalytics,
  );

  useEffect(() => {
    dispatch(fetchInstructorAnalytics());
  }, [dispatch]);

  const chartData = useMemo(
    () =>
      timeseries.map((d) => ({
        ...d,
        label: d.date.slice(5),
        value: metric === "enrollments" ? d.enrollments : d.revenue,
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
  const formatPercent = (value?: number) =>
    typeof value === "number" ? `${value.toFixed(1)}%` : "--";

  return {
    timeseries,
    insights,
    loading,
    error,
    metric,
    chartData,
    setMetric: (value: "enrollments" | "revenue") =>
      dispatch(setInstructorAnalyticsMetric(value)),
    formatNumber,
    formatCurrency,
    formatPercent,
  };
};

export default useAnalytics;
