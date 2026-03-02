import React from "react";
import useReviews from "./useReviews";
import type { ReviewsState } from "../../../types/ui/instructor/reviews.types";

const Reviews: React.FC = () => {
  const { items: reviews, loading, error }: ReviewsState = useReviews();

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="mb-2">
        <h1 className="text-2xl font-semibold text-text-primary mb-2">
          Reviews & Ratings
        </h1>
        <p className="text-sm text-text-secondary">
          Feedback for your published courses
        </p>
      </div>

      {error && (
        <div className="p-4 bg-error/10 border border-error/20 text-error rounded-lg text-sm">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center min-h-[300px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      ) : reviews.length === 0 ? (
        <div className="bg-white rounded-xl border border-border p-10 text-center text-sm text-text-muted">
          No reviews available yet.
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-border-light flex items-center justify-between">
            <h2 className="text-lg font-semibold text-text-primary">
              Latest Reviews
            </h2>
            <span className="text-xs text-text-secondary">
              {reviews.length} total
            </span>
          </div>
          <div className="divide-y divide-border-light">
            {reviews.map((review) => (
              <div key={review.id} className="px-6 py-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-text-primary">
                      {review.course?.title || "Course"}
                    </p>
                    <p className="text-xs text-text-secondary mt-1">
                      Student: {review.user?.name || "Student"}
                    </p>
                  </div>
                  <div className="flex items-center gap-0.5 shrink-0">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <svg
                        key={value}
                        className={`w-4 h-4 ${
                          review.rating >= value
                            ? "text-star"
                            : "text-star-muted"
                        }`}
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-text-secondary mt-3">
                  {review.comment || "No comment provided."}
                </p>
                <p className="text-xs text-text-muted mt-2">
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Reviews;
