import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";

const WelcomeHeader: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const firstName = user?.name ? user.name.split(" ")[0] : "Learner";

  return (
    <div className="flex flex-col">
      <div className="mb-2">
        <div className="text-[38px] font-normal text-dashboard-heading leading-[1.1]">
          Welcome,
        </div>
        <div className="text-[38px] font-normal text-dashboard-heading leading-[1.1]">
          {firstName}!
        </div>
      </div>

      <button className="w-full border border-primary text-primary px-4 py-[10px] rounded-[6px] font-medium text-[14px] hover:bg-surface-hover transition-colors mb-8 bg-white">
        Add career goals
      </button>
      <div>
        <div className="flex justify-between items-center mb-3">
          <div className="text-[12px] uppercase tracking-wide text-text-secondary font-semibold">
            Weekly activity
          </div>

          <button className="text-text-secondary hover:text-text-primary">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </button>
        </div>

        <div className="mb-4">
          <div className="text-[14px] font-semibold text-text-primary">
            On track
          </div>
          <div className="text-[13px] text-text-secondary">
            0 of your 6-day goal. Keep it up!
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:justify-between mb-4">
          {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day) => (
            <div
              key={day}
              className={`w-[30px] h-[30px] sm:w-[34px] sm:h-[34px] rounded-[8px] flex items-center justify-center text-[12px] font-semibold ${
                day === "Tu"
                  ? "bg-badge-purple-bg text-badge-purple-text"
                  : "border border-badge-purple-border text-text-secondary"
              }`}
            >
              {day === "Tu" ? (
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                day
              )}
            </div>
          ))}
        </div>

        <div className="text-[13px] text-text-secondary">
          40 items completed · 66 minutes learned
        </div>
      </div>
    </div>
  );
};

export default WelcomeHeader;
