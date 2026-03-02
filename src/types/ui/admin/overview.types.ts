import type { AnalyticsData } from "../../admin";

export interface StatCard {
  name: string;
  value: string | number;
  change: string;
  isPositive: boolean;
  icon: React.ReactNode;
}

export interface AdminActivity {
  user: string;
  action: string;
  target: string;
  time: string;
}

export interface ChartPoint {
  enrollments: number;
  revenue: number;
  date: string;
  label: string;
}

export interface OverviewState {
  data: AnalyticsData | null;
  loading: boolean;
  chartLoading: boolean;
  error: string | null;
  metric: "enrollments" | "revenue";
  setMetric: (value: "enrollments" | "revenue") => void;
  chartData: ChartPoint[];
  stats: StatCard[];
  activities: AdminActivity[];
  formatNumber: (value?: number) => string;
  formatCurrency: (value?: number) => string;
}
