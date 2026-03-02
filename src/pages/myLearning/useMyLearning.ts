import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  fetchMyLearning,
  submitCourseReview,
} from "../../redux/slices/student/studentMyLearningSlice";
import type { MyLearningEnrollment } from "../../types/student";

const useMyLearning = () => {
  const [activeTab, setActiveTab] = useState("In Progress");
  const dispatch = useAppDispatch();
  const {
    enrollments,
    loading: isLoading,
    reviewSubmitting: isSubmittingReview,
    reviewError,
  } = useAppSelector((state) => state.studentMyLearning);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [reviewTarget, setReviewTarget] = useState<MyLearningEnrollment | null>(
    null,
  );
  const [reviewRating, setReviewRating] = useState<number>(0);
  const [reviewComment, setReviewComment] = useState("");
  const [localReviewError, setLocalReviewError] = useState<string | null>(null);
  const navigate = useNavigate();

  const tabs = ["In Progress", "Saved", "Completed"];

  useEffect(() => {
    dispatch(fetchMyLearning());
  }, [dispatch]);

  const filteredEnrollments = enrollments.filter((enrollment) => {
    if (activeTab === "In Progress") return !enrollment.completed;
    if (activeTab === "Completed") return enrollment.completed;
    return false;
  });

  const openReviewForEnrollment = (enrollment: MyLearningEnrollment) => {
    setReviewTarget(enrollment);
    setReviewRating(0);
    setReviewComment("");
    setLocalReviewError(null);
    setIsReviewOpen(true);
  };

  const closeReview = () => setIsReviewOpen(false);

  const submitReview = async () => {
    if (!reviewRating) {
      setLocalReviewError("Please select a rating.");
      return;
    }
    if (!reviewTarget) return;
    try {
      await dispatch(
        submitCourseReview({
          enrollmentId: reviewTarget.id,
          courseId: reviewTarget.course.id,
          rating: reviewRating,
          comment: reviewComment.trim() || undefined,
        }),
      ).unwrap();
      setIsReviewOpen(false);
    } catch {}
  };

  return {
    tabs,
    activeTab,
    setActiveTab,
    enrollments,
    filteredEnrollments,
    isLoading,
    isReviewOpen,
    setIsReviewOpen,
    reviewTarget,
    setReviewTarget,
    reviewRating,
    setReviewRating,
    reviewComment,
    setReviewComment,
    isSubmittingReview,
    reviewError: localReviewError || reviewError,
    navigate,
    openReviewForEnrollment,
    closeReview,
    submitReview,
  };
};

export default useMyLearning;
