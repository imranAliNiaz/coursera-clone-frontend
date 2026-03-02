import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { enrollmentApi } from "../../../services/enrollmentApi";
import type { UsePaymentMethodsArgs } from "../../../types/ui/checkout.types";

const usePaymentMethods = ({ course }: UsePaymentMethodsArgs) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEnroll = async () => {
    setIsSubmitting(true);
    setError(null);
    try {
      await enrollmentApi.enroll(course.id);
      navigate("/my-learning");
    } catch (err: unknown) {
      console.error("Enrollment failed:", err);
      const message =
        err instanceof Error
          ? err.message
          : "Enrollment failed. Please try again.";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return { isSubmitting, error, handleEnroll };
};

export default usePaymentMethods;
