import type {
  TimeseriesPoint,
  InstructorInsights,
  ChartPoint,
} from "../../instructor";

export interface AnalyticsState {
  timeseries: TimeseriesPoint[];
  insights: InstructorInsights | null;
  loading: boolean;
  error: string | null;
  metric: "enrollments" | "revenue";
  chartData: ChartPoint[];
  setMetric: (metric: "enrollments" | "revenue") => void;
  formatNumber: (value?: number) => string;
  formatCurrency: (value?: number) => string;
  formatPercent: (value?: number) => string;
}
