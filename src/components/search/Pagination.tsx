import React from "react";
import type { PaginationProps } from "../../types/ui/search-results.types";

type PageItem = number | "ellipsis";

const buildPageItems = (
  currentPage: number,
  totalPages: number,
): PageItem[] => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const items: PageItem[] = [1];
  const left = Math.max(2, currentPage - 1);
  const right = Math.min(totalPages - 1, currentPage + 1);

  if (left > 2) items.push("ellipsis");
  for (let i = left; i <= right; i += 1) {
    items.push(i);
  }
  if (right < totalPages - 1) items.push("ellipsis");
  items.push(totalPages);
  return items;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 0) return null;

  const items = buildPageItems(currentPage, totalPages);
  const canGoPrev = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  return (
    <div className="flex items-center justify-center gap-1 mt-12 py-8 font-sans">
      <button
        className={`w-8 h-8 flex items-center justify-center transition-colors ${
          canGoPrev
            ? "text-text-secondary hover:text-primary"
            : "text-text-muted cursor-not-allowed"
        }`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!canGoPrev}
        aria-label="Previous page"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </button>

      {items.map((item, index) =>
        item === "ellipsis" ? (
          <span key={`ellipsis-${index}`} className="text-text-muted mx-1">
            ...
          </span>
        ) : (
          <button
            key={item}
            className={`w-8 h-8 flex items-center justify-center rounded-full text-[14px] font-medium transition-all ${
              item === currentPage
                ? "bg-primary text-white underline decoration-0"
                : "text-text-secondary hover:bg-surface"
            }`}
            onClick={() => onPageChange(item)}
            aria-current={item === currentPage ? "page" : undefined}
          >
            {item}
          </button>
        ),
      )}

      <button
        className={`w-8 h-8 flex items-center justify-center transition-colors ${
          canGoNext
            ? "text-primary hover:text-primary-hover"
            : "text-text-muted cursor-not-allowed"
        }`}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!canGoNext}
        aria-label="Next page"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>
    </div>
  );
};

export default Pagination;
