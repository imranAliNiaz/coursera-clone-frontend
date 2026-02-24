import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { courseApi } from "../../services/courseApi";
import type { RootState } from "../../redux/store";

type AuthUser = RootState["auth"]["user"];

const useCourseEnrollment = (
  courseId?: string,
  price?: number,
  user?: AuthUser,
) => {
  const navigate = useNavigate();
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isCheckingEnrollment, setIsCheckingEnrollment] = useState(false);

  useEffect(() => {
    const checkEnrollment = async () => {
      if (!user || !courseId) return;
      setIsCheckingEnrollment(true);
      try {
        const status = await courseApi.getEnrollmentStatus(courseId);
        setIsEnrolled(status.isEnrolled);
      } catch (error) {
        console.error("Error checking enrollment status:", error);
      } finally {
        setIsCheckingEnrollment(false);
      }
    };

    checkEnrollment();
  }, [user, courseId]);

  const handleEnrollClick = () => {
    if (!user) {
      navigate("/?triggerAuth=login", {
        state: { from: `/course/${courseId}` },
      });
      return;
    }

    if (isEnrolled) {
      navigate("/my-learning");
      return;
    }

    navigate(`/checkout/${courseId}`);
  };

  const buttonText = useMemo(() => {
    if (isCheckingEnrollment) return "Checking...";
    if (isEnrolled) return "Go to Course";
    return price === 0 ? "Enroll for Free" : `Enroll for $${price}`;
  }, [isCheckingEnrollment, isEnrolled, price]);

  return {
    buttonText,
    handleEnrollClick,
    isCheckingEnrollment,
    isEnrolled,
  };
};

export default useCourseEnrollment;
