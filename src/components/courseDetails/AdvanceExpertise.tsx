import React from "react";
import type { AdvanceExpertiseProps } from "../../types/ui/course-details.types";

const AdvanceExpertise: React.FC<AdvanceExpertiseProps> = ({
  thumbnailUrl,
}) => {
  const imageSrc =
    thumbnailUrl ||
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800";

  return (
    <section className="bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6 sm:gap-8 lg:gap-10 min-h-[220px] sm:min-h-[240px]">
        <div className="py-4 sm:py-6">
          <h2 className="text-[20px] font-normal text-text-primary mb-3">
            Advance your subject matter expertise
          </h2>
          <ul className="space-y-3">
            {[
              "Learn in-demand skills from university and industry experts",
              "Master a subject or tool with hands-on projects",
              "Develop a deep understanding of key concepts",
              "Earn a career certificate from Google",
            ].map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-[13px] text-gray-700"
              >
                <span className="text-text-primary font-bold mt-[2px]">
                  &bull;
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="h-[200px] sm:h-[220px] md:h-[240px] overflow-hidden rounded-[8px] w-full">
          <img
            src={imageSrc}
            alt="Students working"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default AdvanceExpertise;
