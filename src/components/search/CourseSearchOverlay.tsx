import type { CourseSearchOverlayProps } from "../../types/ui/search-results.types";

const CourseSearchOverlay: React.FC<CourseSearchOverlayProps> = ({
  show,
  overlayRef,
  searchQuery,
  isLoading,
  popularSuggestions,
  results,
  selectedIndex,
  onSelectSuggestion,
  onSelectCourse,
  onHover,
  onSeeAll,
}) => {
  if (!show) return null;

  return (
    <div
      ref={overlayRef}
      className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-50 overflow-hidden max-h-[480px] overflow-y-auto"
      role="listbox"
    >
      {isLoading ? (
        <div className="p-12 text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-gray-500">Finding matches...</p>
        </div>
      ) : searchQuery.trim().length < 2 ? (
        <div className="p-4">
          <div className="px-3 py-2 text-[12px] font-bold text-gray-500 uppercase tracking-wider mb-2">
            Popular Suggestions
          </div>
          <div className="flex flex-col gap-1">
            {popularSuggestions.map((suggestion, index) => (
              <div
                key={suggestion}
                id={`suggestion-item-${index}`}
                onClick={() => onSelectSuggestion(suggestion, index)}
                onMouseEnter={() => onHover(index)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md cursor-pointer transition-colors ${
                  selectedIndex === index
                    ? "bg-learn-active-bg"
                    : "hover:bg-gray-50"
                }`}
                role="option"
                aria-selected={selectedIndex === index}
              >
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <span className="text-sm font-medium text-gray-700">
                  {suggestion}
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : results.length > 0 ? (
        <div className="p-2">
          <div className="px-3 py-2 text-[12px] font-bold text-gray-500 uppercase tracking-wider">
            Courses
          </div>
          {results.map((course, index) => (
            <div
              key={course.id}
              id={`course-item-${index}`}
              onClick={() => onSelectCourse(course, index)}
              onMouseEnter={() => onHover(index)}
              className={`flex items-center gap-4 p-3 rounded-md cursor-pointer transition-colors ${
                selectedIndex === index
                  ? "bg-learn-active-bg"
                  : "hover:bg-gray-50"
              }`}
              role="option"
              aria-selected={selectedIndex === index}
            >
              <img
                src={
                  course.thumbnail ||
                  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=200&auto=format&fit=crop&q=60"
                }
                alt=""
                className="w-16 h-10 object-cover rounded shadow-sm"
              />
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-gray-900 truncate">
                  {course.title}
                </h4>
                <p className="text-xs text-gray-500 truncate">
                  {course.category} • {course.difficulty}
                </p>
              </div>
            </div>
          ))}
          <div className="border-t border-gray-100 mt-2 pt-2">
            <button
              onClick={onSeeAll}
              className="w-full text-left px-3 py-2 text-sm text-primary font-bold hover:bg-gray-50 flex items-center justify-between"
            >
              <span>See all results for "{searchQuery}"</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      ) : (
        <div className="p-8 text-center text-gray-500">
          <p className="text-sm">No courses found for "{searchQuery}"</p>
        </div>
      )}
    </div>
  );
};

export default CourseSearchOverlay;
