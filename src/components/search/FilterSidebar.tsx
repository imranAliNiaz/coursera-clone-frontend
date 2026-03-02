import React from "react";

interface FilterOption {
  label: string;
  value: string;
  count?: number;
}

interface FilterCategoryProps {
  title: string;
  items: FilterOption[];
  showMore?: boolean;
  selectedValues: string[];
  onToggle: (value: string) => void;
}

const FilterCategory: React.FC<FilterCategoryProps> = ({
  title,
  items,
  showMore,
  selectedValues,
  onToggle,
}) => {
  return (
    <div className="py-6 border-b border-border last:border-0">
      <span className="text-[14px] font-bold text-text-primary uppercase tracking-wider">
        {title}
      </span>
      <div className="space-y-3">
        {items.map((item) => (
          <label
            key={item.value}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative flex items-center justify-center">
              <input
                type="checkbox"
                checked={selectedValues.includes(item.value)}
                onChange={() => onToggle(item.value)}
                className="w-[18px] h-[18px] border-2 border-border rounded-[2px] text-primary focus:ring-0 focus:ring-offset-0 cursor-pointer appearance-none checked:bg-primary checked:border-primary transition-all"
              />
              <svg
                className="absolute w-3 h-3 text-white pointer-events-none hidden group-has-checked:block"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <span
              className={`text-[14px] ${
                selectedValues.includes(item.value)
                  ? "text-text-primary font-medium"
                  : "text-text-primary group-hover:text-primary transition-colors"
              }`}
            >
              {item.label}
            </span>
            {item.count !== undefined && (
              <span className="ml-auto text-[12px] text-text-secondary group-hover:text-primary transition-colors">
                ({item.count})
              </span>
            )}
          </label>
        ))}
        {showMore && (
          <button className="mt-4 text-[14px] font-bold text-primary hover:underline bg-transparent border-none cursor-pointer">
            Show more
          </button>
        )}
      </div>
    </div>
  );
};

interface FilterSidebarProps {
  subjects: string[];
  skills: string[];
  levels: string[];
  durations: string[];
  subjectOptions: FilterOption[];
  skillOptions: FilterOption[];
  levelOptions: FilterOption[];
  durationOptions: FilterOption[];
  educatorOptions: FilterOption[];
  languageOptions: FilterOption[];
  selectedEducators: string[];
  languages: string[];
  onToggleSubject: (value: string) => void;
  onToggleSkill: (value: string) => void;
  onToggleLevel: (value: string) => void;
  onToggleDuration: (value: string) => void;
  onToggleEducator: (value: string) => void;
  onToggleLanguage: (value: string) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  subjects,
  skills,
  levels,
  durations,
  subjectOptions,
  skillOptions,
  levelOptions,
  durationOptions,
  educatorOptions,
  languageOptions,
  selectedEducators,
  languages,
  onToggleSubject,
  onToggleSkill,
  onToggleLevel,
  onToggleDuration,
  onToggleEducator,
  onToggleLanguage,
}) => {
  return (
    <div className="w-[260px] shrink-0 font-sans pr-4">
      <h2 className="text-[20px] font-bold text-[#1f1f1f] mb-6">Filter by</h2>

      <div className="space-y-0">
        <FilterCategory
          title="Subject"
          items={subjectOptions}
          showMore={subjectOptions.length > 6}
          selectedValues={subjects}
          onToggle={onToggleSubject}
        />

        <FilterCategory
          title="Skills"
          items={skillOptions}
          showMore={skillOptions.length > 6}
          selectedValues={skills}
          onToggle={onToggleSkill}
        />

        <FilterCategory
          title="Level"
          items={levelOptions}
          selectedValues={levels}
          onToggle={onToggleLevel}
        />

        <FilterCategory
          title="Duration"
          items={durationOptions}
          selectedValues={durations}
          onToggle={onToggleDuration}
        />

        <FilterCategory
          title="Educator"
          items={educatorOptions}
          selectedValues={selectedEducators}
          onToggle={onToggleEducator}
        />

        <FilterCategory
          title="Language"
          items={languageOptions}
          showMore={languageOptions.length > 6}
          selectedValues={languages}
          onToggle={onToggleLanguage}
        />
      </div>
    </div>
  );
};

export default FilterSidebar;
