import React from "react";
import LoggedHeader from "../../components/layout/LoggedHeader";
import BillingInfo from "../../components/checkout/BillingInfo";
import PaymentMethods from "../../components/checkout/PaymentMethods";
import OrderSummary from "../../components/checkout/OrderSummary";
import useCheckout from "./useCheckout";

const Checkout: React.FC = () => {
  const { course, isLoading, studentName } = useCheckout();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white font-sans flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-white font-sans flex items-center justify-center">
        <div className="text-xl">Course not found.</div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-white font-sans">
      <LoggedHeader />

      <main className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-10 2xl:px-12 py-6 sm:py-8 lg:py-10 max-w-[1200px] 2xl:max-w-[1360px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-16">
          <div className="lg:col-span-7">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6 sm:mb-8">
              <div>
                <h1 className="text-[26px] sm:text-[30px] md:text-[32px] font-semibold text-text-primary mb-2">
                  Checkout
                </h1>
                <p className="text-[13px] sm:text-[14px] text-checkout-text-muted">
                  All fields are required
                </p>
              </div>

              <div className="hidden md:block bg-checkout-badge-bg text-checkout-badge-text px-4 py-2 rounded-full text-[14px] font-semibold whitespace-nowrap">
                23,860 already enrolled!
              </div>
            </div>
            <BillingInfo name={studentName} />
            <PaymentMethods course={course} />
          </div>

          <div className="lg:col-span-5">
            <OrderSummary course={course} />
          </div>
        </div>
        <div className="mt-4 pt-6 sm:pt-8 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 text-[12px] text-checkout-text-muted">
          <div className="font-normal text-[16px] sm:text-[18px] text-checkout-logo-muted">
            coursera
          </div>
          <div className="flex flex-col sm:flex-row sm:gap-2">
            <span className="text-checkout-copyright">
              © 2025 Coursera Inc.
            </span>
            <span className="text-checkout-reserved">All rights reserved.</span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Checkout;
