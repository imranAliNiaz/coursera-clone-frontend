import React from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import useAnalytics from "./useAnalytics";
import type { AnalyticsState } from "../../../types/ui/instructor/analytics.types";

const Analytics: React.FC = () => {
  const {
    loading,
    metric,
    setMetric,
    chartData,
    insights,
    formatNumber,
    formatCurrency,
    formatPercent,
  }: AnalyticsState = useAnalytics();

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="pb-6 border-b border-border">
        <h1 className="text-2xl font-semibold text-text-primary mb-2">
          Analytics
        </h1>
        <p className="text-sm text-text-secondary">
          Track enrollments, watch-time, and performance across courses.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-surface p-6 rounded-xl border border-border shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-text-primary">
                Performance
              </h2>
              <p className="text-sm text-text-secondary mt-1">Last 30 days</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setMetric("enrollments")}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                  metric === "enrollments"
                    ? "bg-primary text-white"
                    : "text-primary hover:text-primary-hover hover:bg-surface-hover"
                }`}
              >
                Enrollments
              </button>
              <button
                onClick={() => setMetric("revenue")}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                  metric === "revenue"
                    ? "bg-primary text-white"
                    : "text-primary hover:text-primary-hover hover:bg-surface-hover"
                }`}
              >
                Revenue
              </button>
            </div>
          </div>
          <div className="h-[320px] rounded-lg border border-border">
            {loading ? (
              <div className="h-full w-full animate-pulse bg-gradient-to-br from-primary/5 to-surface-hover rounded-lg" />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={chartData}
                  margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="var(--color-border)"
                  />
                  <XAxis dataKey="label" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip
                    formatter={(value: number) =>
                      metric === "revenue"
                        ? formatCurrency(value)
                        : formatNumber(value)
                    }
                  />
                  <Line
                    type="monotone"
                    dataKey={metric}
                    stroke="var(--color-primary)"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        <div className="bg-surface p-6 rounded-xl border border-border shadow-sm">
          <h2 className="text-lg font-semibold text-text-primary mb-2">
            Quick Insights
          </h2>
          <p className="text-sm text-text-secondary">
            High-signal KPIs for creators.
          </p>

          <div className="mt-5 space-y-3">
            {[
              {
                label: "Top course",
                value: insights?.topCourse?.title || "--",
              },
              {
                label: "Completion rate",
                value: formatPercent(insights?.completionRate),
              },
              {
                label: "Reviews received",
                value: formatNumber(insights?.reviewsCount),
              },
              {
                label: "Avg rating",
                value: formatNumber(insights?.averageRating),
              },
            ].map((k) => (
              <div
                key={k.label}
                className="p-4 rounded-lg bg-surface-hover border border-border"
              >
                <div className="text-xs text-text-secondary">{k.label}</div>
                <div className="text-sm font-semibold text-text-primary mt-1">
                  {k.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
