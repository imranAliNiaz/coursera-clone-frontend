import React from "react";
import Button from "../../components/common/Button";
import usePaymentMethods from "./hooks/usePaymentMethods";
import type { PaymentMethodsProps } from "../../types/ui/checkout.types";

const PaymentMethods: React.FC<PaymentMethodsProps> = ({ course }) => {
  const { isSubmitting, error, handleEnroll } = usePaymentMethods({ course });
  const price = course.price ?? 0;

  return (
    <div>
      <h2 className="text-[20px] leading-[28px] font-normal text-text-primary mb-6">
        {price === 0 ? "Review Order" : "Payment methods"}
      </h2>

      {price > 0 && (
        <div className="mb-6 flex items-start gap-3">
          <div className="relative flex items-center h-5">
            <input
              id="save-card"
              type="checkbox"
              defaultChecked
              className="h-5 w-5 border-gray-300 rounded text-primary focus:ring-primary cursor-pointer"
            />
          </div>
          <label
            htmlFor="save-card"
            className="text-[14px] leading-[20px] text-text-primary"
          >
            Save this card securely for future purposes.{" "}
            <a href="#" className="text-primary hover:underline">
              Learn more.
            </a>
          </label>
        </div>
      )}

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-[4px] text-[14px]">
          {error}
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-8 mb-6">
        <Button
          onClick={handleEnroll}
          disabled={isSubmitting}
          className="bg-primary text-white font-bold text-[16px] px-10 py-[14px] rounded-[4px] hover:bg-primary-hover transition-colors w-full sm:w-auto sm:min-w-[240px] disabled:bg-gray-400"
        >
          {isSubmitting
            ? "Enrolling..."
            : course.price === 0
              ? "Enroll Now"
              : "Start free trial"}
        </Button>
        <span className="text-[14px] sm:text-[16px] text-text-primary font-normal">
          {course.price === 0
            ? "Instant access granted"
            : "You won't be charged today (Simulated)"}
        </span>
      </div>

      <div className="text-[12px] leading-[18px] text-checkout-text-muted">
        I agree to the{" "}
        <a href="#" className="text-primary hover:underline">
          Terms of Use
        </a>
        ,{" "}
        <a href="#" className="text-primary hover:underline">
          Refund Policy
        </a>
        , and{" "}
        <a href="#" className="text-primary hover:underline">
          Privacy Policy
        </a>
        .
      </div>
    </div>
  );
};

export default PaymentMethods;
