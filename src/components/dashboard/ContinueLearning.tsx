import React from "react";
import { Link } from "react-router-dom";
import { IMAGES } from "../../constants/images";
import type { MyLearningEnrollment } from "../../types/student";

interface ContinueLearningProps {
  enrollments: MyLearningEnrollment[];
}

const ContinueLearning: React.FC<ContinueLearningProps> = ({ enrollments }) => {
  const inProgressEnrollments = enrollments.filter((e) => !e.completed);
  const currentEnrollment = inProgressEnrollments[0];

  if (!currentEnrollment) return null;

  const firstModule = currentEnrollment.course.modules?.[0];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-[20px] font-medium text-dashboard-heading mb-6">
          Continue your learning
        </h2>

        <div className="flex items-center gap-2 mb-4">
          <img
            src={IMAGES.LOGOS.GOOGLE_WORDMARK}
            alt="Google"
            className="h-4 object-contain"
          />
          <span className="text-[15px] font-medium text-text-primary">
            {currentEnrollment.course.title}
          </span>
        </div>

        <div className="border border-card-border rounded-[12px] p-6 mb-8 bg-white shadow-soft">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-success flex items-center justify-center shrink-0">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-[17px] font-medium text-text-primary mb-1">
                {firstModule?.title || "Welcome to the Course"}
              </h3>
              <Link
                to={`/learn/${currentEnrollment.courseId}`}
                className="text-primary hover:underline text-[14px] font-medium inline-block"
              >
                Go to course
              </Link>
            </div>
            <button className="text-text-muted hover:text-text-primary transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="bg-help-banner-bg rounded-[8px] p-2 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 shrink-0">
            <img
              src={IMAGES.UI.CARTOON_ICON}
              alt="Coach"
              className="w-full h-full object-contain"
            />
          </div>
          <p className="text-[14px] text-text-primary leading-tight flex gap-6">
            <span>Need help? Tell me a little about yourself</span>
            <span>so I can make the best recommendations.</span>
          </p>
        </div>
        <button className="text-primary hover:underline text-[14px] font-semibold px-4 whitespace-nowrap">
          Set your goal
        </button>
      </div>
    </div>
  );
};

export default ContinueLearning;
