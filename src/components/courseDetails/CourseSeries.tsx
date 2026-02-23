import React, { useState } from "react";
import { IMAGES } from "../../constants/images";
import type { CourseSeriesProps } from "../../types/ui/course-details.types";

const CourseSeries: React.FC<CourseSeriesProps> = ({ courses }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section>
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <h2 className="text-[22px] sm:text-[26px] md:text-[28px] font-normal text-text-primary">
          Specialization - 4 course series
        </h2>
      </div>

      <p className="text-[14px] sm:text-[15px] text-gray-700 max-w-[800px] mb-2 leading-relaxed">
        Want to use generative AI tools but not sure where to start? Google
        Prompting Essentials teaches you how to give clear and specific
        instructions to generative AI - known as prompting. In 5 easy steps,
        you'll learn how to prompt effectively and unlock more of AI's
        potential.
      </p>
      <button className="text-[14px] sm:text-[15px] text-primary hover:underline mb-6 sm:mb-8">
        Read more
      </button>

      <div className="w-full border border-gray-200 rounded-[10px] overflow-hidden bg-white">
        {courses.map((course, index) => (
          <div key={course.id}>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 px-4 sm:px-6 md:px-8 py-5">
              <div className="w-full sm:w-[188px] h-[140px] sm:h-[68px] shrink-0 rounded-[4px] overflow-hidden bg-gray-100">
                {course.thumbnail && (
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-[14px] font-semibold text-text-primary line-clamp-1">
                  {course.title}
                </h3>
                <button
                  type="button"
                  onClick={() => handleToggle(index)}
                  className="flex items-center gap-2 text-[12px] text-gray-500 hover:text-text-primary mt-1"
                >
                  <span>Course {index + 1}</span>
                  <span className="text-gray-500 text-3xl">&bull;</span>
                  <span>2 hours</span>
                </button>
              </div>
              <button
                type="button"
                onClick={() => handleToggle(index)}
                className="text-primary hover:text-primary-hover transition-colors self-start sm:self-auto"
                aria-label={expandedIndex === index ? "Collapse" : "Expand"}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`transition-transform ${
                    expandedIndex === index ? "rotate-180" : ""
                  }`}
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
            </div>
            {index !== courses.length - 1 && (
              <div className="h-0.5 bg-gray-100 mx-4 sm:mx-5"></div>
            )}
          </div>
        ))}

        <div className="h-0.5 bg-gray-100 mx-4 sm:mx-5"></div>
        <div className="flex items-start gap-4 px-4 sm:px-5 py-6 mb-4">
          <div className="w-[36px] h-[36px] bg-career-bg rounded-[8px] flex items-center justify-center">
            <img
              src={IMAGES.UI.EARN_CERTIFICATE_ICON}
              alt=""
              className="w-5 h-5 object-contain"
            />
          </div>
          <div>
            <p className="text-[14px] text-text-primary font-semibold">
              Earn a career certificate
            </p>
            <p className="text-[12px] text-gray-600">
              Add this credential to your LinkedIn profile, resume, or CV. Share
              it on social media and in your performance review.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseSeries;
