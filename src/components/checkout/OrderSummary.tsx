import React from "react";
import { IMAGES } from "../../constants/images";
import type { OrderSummaryProps } from "../../types/ui/checkout.types";

const OrderSummary: React.FC<OrderSummaryProps> = ({ course }) => {
  return (
    <div className="flex flex-col gap-6">
      {/* Course Card */}
      <div className="border border-checkout-border-card rounded-[8px] p-6 bg-white shadow-soft">
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="w-[64px] h-[64px] shrink-0 border border-checkout-border-card p-1 rounded-[4px] flex items-center justify-center">
            {course.thumbnail ? (
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="w-full h-full bg-blue-50 flex items-center justify-center text-primary font-bold">
                {course.title.charAt(0)}
              </div>
            )}
          </div>
          <div>
            <h3 className="text-[16px] leading-[22px] font-semibold text-text-primary mb-1">
              {course.title}
            </h3>
            <p className="text-[14px] text-checkout-text-muted">
              by {course.instructor?.name}
            </p>
          </div>
        </div>

        <hr className="my-6 border-checkout-border-card" />

        <div className="mb-6">
          <p className="text-[16px] text-text-primary mb-4 font-normal">
            No commitment. Cancel anytime.
          </p>

          <div className="flex justify-between items-start mb-1">
            <span className="text-[14px] text-text-primary">
              {course.price === 0 ? "Course access" : "One-time enrollment"}
            </span>
            <span className="text-[14px] text-text-primary font-semibold">
              {course.price === 0 ? "Free" : `$${course.price} USD`}
            </span>
          </div>

          <div className="flex justify-between items-center mt-6">
            <span className="text-[16px] text-text-primary font-semibold">
              Today's Total:
            </span>
            <span className="text-[20px] text-text-primary font-bold">
              ${course.price} USD
            </span>
          </div>
        </div>

        <hr className="my-6 border-checkout-border-card" />

        {course.price === 0 && (
          <div className="bg-checkout-badge-bg p-3 rounded-[4px] text-[12px] leading-[18px] text-checkout-badge-text">
            You're enrolling in a free course. No payment information is
            required to start learning.
          </div>
        )}

        <div className="mt-4 text-[12px] leading-[18px] text-checkout-text-info">
          Your subscription begins today with a 7-day free trial. If you decide
          to stop during the trial period, visit My Purchases to cancel before
          November 19, 2025 and your card won't be charged. We can't issue
          refunds once your card is charged.
        </div>
      </div>

      {/* Testimonial / Trust Element (Optional as per image bottom right) */}
      <div className="border border-checkout-border-card rounded-[8px] bg-white flex flex-col sm:flex-row items-stretch gap-4 overflow-hidden shadow-soft">
        <div className="w-full sm:w-[140px] h-[160px] sm:h-[120px] shrink-0">
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="Learner"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-5 flex flex-col justify-center">
          <p className="text-[14px] leading-[20px] text-text-primary mb-2">
            Coursera helped me learn skills to develop my career and enrich my
            expertise.
          </p>
          <div className="flex items-center justify-end gap-2">
            <span className="h-px w-6 bg-text-primary/40"></span>
            <span className="text-[12px] font-semibold text-checkout-text-muted">
              Elena M.
            </span>
          </div>
        </div>
      </div>

      {/* Stats (Learners, Courses) */}
      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 py-4 opacity-70 grayscale">
        <div className="flex items-center gap-2">
          <img
            src={IMAGES.UI.LEARNERS_ICON}
            alt=""
            className="w-10 h-10 object-contain"
          />
          <div>
            <div className="text-[14px] font-bold text-primary">
              140 Million+
            </div>
            <div className="text-[12px] text-checkout-text-muted">Learners</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <img
            src={IMAGES.UI.BOOK_ICON_STATIC}
            alt=""
            className="w-10 h-10 object-contain"
          />
          <div>
            <div className="text-[14px] font-bold text-text-primary">
              10,000+
            </div>
            <div className="text-[12px] text-checkout-text-muted">Courses</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
