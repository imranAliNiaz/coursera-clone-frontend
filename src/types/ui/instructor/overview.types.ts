import React from "react";

export interface Stat {
  label: string;
  value: string;
  helper: string;
  icon: React.ReactNode;
}

export interface OverviewState {
  loading: boolean;
  stats: Stat[];
}
