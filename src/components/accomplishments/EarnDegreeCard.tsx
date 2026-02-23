import React from "react";
import { IMAGES } from "../../constants/images";
import type { EarnDegreeCardProps } from "../../types/ui/accomplishments.types";

const EarnDegreeCard: React.FC<EarnDegreeCardProps> = ({
  university,
  degree,
  image,
  universityIcon,
  className,
}) => {
  return (
    <div
      className={`flex flex-col h-full bg-white border border-border rounded-[10px] overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.08)] ${className || ""}`}
    >
      <div className="relative p-2 h-[140px] overflow-hidden rounded-2xl">
        <img
          src={image}
          alt={degree}
          className="w-full h-full object-cover rounded-[8px]"
        />
      </div>

      <div className="pt-3 pb-3 ml-3 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-2">
          <img
            src={universityIcon}
            alt={university}
            className="w-[18px] h-[18px] object-contain shrink-0"
          />
          <span className="text-[12px] text-accomplishments-provider-text font-normal leading-none truncate">
            {university}
          </span>
        </div>

        <h3 className="text-[14px] font-normal text-accomplishments-title-text mb-2 line-clamp-2 leading-[1.3] min-h-[40px]">
          {degree}
        </h3>

        <div className="mt-auto">
          <div className="flex items-center gap-1.5 text-primary text-[16px] font-normal mb-2">
            <img
              src={IMAGES.EARN_DEGREE.DEGREE_ICON}
              alt="Degree"
              className="w-[20px] h-[20px] object-contain shrink-0"
            />
            <span className="leading-tight">Earn a degree</span>
          </div>

          <p className="text-[14px] text-accomplishments-label-muted font-medium  tracking-tight leading-none opacity-80">
            Degree
          </p>
        </div>
      </div>
    </div>
  );
};

export default EarnDegreeCard;
