import type { CheckoutCourse } from "../student";

export interface BillingInfoProps {
  name?: string;
}

export interface OrderSummaryProps {
  course: CheckoutCourse;
}

export interface PaymentMethodsProps {
  course: CheckoutCourse;
}

export interface UsePaymentMethodsArgs {
  course: CheckoutCourse;
}
