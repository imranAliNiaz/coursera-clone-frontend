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
import useOverview from "./useOverview";

const Overview: React.FC = () => {
  const {
    loading,
    chartLoading,
    error,
    metric,
    setMetric,
    chartData,
    stats,
    activities,
    formatNumber,
    formatCurrency,
  } = useOverview();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black" />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {error && (
        <div className="p-4 bg-error/10 border border-error/20 text-error rounded-lg text-sm mb-6">
          {error}
        </div>
      )}

      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-text-primary mb-2">
          Dashboard Overview
        </h1>
        <p className="text-sm text-text-secondary">
          Monitor platform performance and user activity in real-time
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-surface p-6 rounded-xl border border-border shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className={`p-2.5 rounded-lg ${
                  stat.isPositive
                    ? "bg-primary/5 text-primary"
                    : "bg-surface-hover text-text-secondary"
                }`}
              >
                {stat.icon}
              </div>
              <span
                className={`text-xs font-semibold px-2 py-1 rounded-md ${
                  stat.isPositive
                    ? "bg-success/10 text-success"
                    : "bg-error/10 text-error"
                }`}
              >
                {stat.change}
              </span>
            </div>
            <h3 className="text-2xl font-semibold text-text-primary mb-1">
              {stat.value}
            </h3>
            <p className="text-sm text-text-secondary font-medium">
              {stat.name}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-surface p-6 rounded-xl border border-border shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-text-primary">
                Growth Analytics
              </h2>
              <p className="text-sm text-text-secondary mt-1">Last 30 days</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setMetric("enrollments")}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                  metric === "enrollments"
                    ? "bg-primary text-white"
                    : "text-primary hover:text-primary-hover hover:bg-primary/5"
                }`}
              >
                Enrollments
              </button>
              <button
                onClick={() => setMetric("revenue")}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                  metric === "revenue"
                    ? "bg-primary text-white"
                    : "text-primary hover:text-primary-hover hover:bg-primary/5"
                }`}
              >
                Revenue
              </button>
            </div>
          </div>
          <div className="h-[320px] rounded-lg border border-border">
            {chartLoading ? (
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
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-text-primary mb-1">
              Recent Signups
            </h2>
            <p className="text-sm text-text-secondary">
              Latest platform members
            </p>
          </div>
          <div className="space-y-4 max-h-[320px] overflow-y-auto custom-scrollbar pr-2">
            {activities.length > 0 ? (
              activities.map((activity, index) => (
                <div key={index} className="flex gap-3 items-start group">
                  <div className="w-10 h-10 rounded-lg bg-text-primary flex items-center justify-center text-white font-semibold text-xs shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                    {activity.user
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-text-secondary leading-relaxed">
                      <span className="font-semibold text-text-primary">
                        {activity.user}
                      </span>{" "}
                      {activity.action}{" "}
                      <span className="font-medium text-text-primary">
                        {activity.target}
                      </span>
                    </p>
                    <span className="text-xs text-text-muted mt-1 block">
                      Joined on {activity.time}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-center py-12 text-text-muted">
                No recent activity
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
