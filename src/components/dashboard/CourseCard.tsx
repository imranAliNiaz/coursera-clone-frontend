import React from "react";
import { IMAGES } from "../../constants/images";
import type { DashboardItem } from "../../types/student";

const CourseCard: React.FC<DashboardItem> = ({
  title,
  provider,
  image,
  logo,
  badge,
  type,
}) => {
  return (
    <div className="flex flex-col h-full bg-white border border-card-border rounded-[10px] overflow-hidden shadow-soft hover:shadow-lg transition-shadow">
      <div className="p-2">
        <div className="relative h-[160px] rounded-[10px] overflow-hidden">
          <img
            src={image || ""}
            alt={title}
            className="w-full h-full object-cover"
          />
          {badge && (
            <div className="absolute top-2 left-2 bg-white/90 text-[10px] px-2 py-1 rounded-full font-semibold text-text-primary">
              {badge}
            </div>
          )}
        </div>
      </div>

      <div className="pt-3 pb-3 ml-3 mr-3 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-2">
          <img
            src={logo}
            alt={provider}
            className="w-[26px] h-[26px] object-contain shrink-0"
          />
          <span className="text-[12px] text-course-provider font-medium leading-none truncate">
            {provider}
          </span>
        </div>

        <h3 className="text-[16px] font-normal text-course-title mb-2 line-clamp-2 leading-[1.4] min-h-[44px]">
          {title}
        </h3>

        <div className="mt-auto">
          <div className="flex items-center gap-2 text-[12px] text-text-muted">
            <img
              src={IMAGES.UI.BOOK_ICON}
              alt="Course"
              className="w-[14px] h-[14px]"
            />
            <span>{type || "Course"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
