import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchAssessmentData } from "../../redux/slices/student/studentAssessmentSlice";
import type {
  AssessmentQuestion,
  AssessmentLesson,
  AssessmentEnrollmentProgress,
} from "../../types/student";
import { enrollmentApi } from "../../services/enrollmentApi";
import { setAssessmentResult } from "../../redux/slices/student/studentAssessmentResultSlice";
import { toast } from "react-hot-toast";

const useCourseAssessment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { courseId, assessmentId } = useParams<{
    courseId: string;
    assessmentId: string;
  }>();

  const assessmentStarted = Boolean(
    (location.state as { assessmentStarted?: boolean } | undefined)
      ?.assessmentStarted,
  );

  const dispatch = useAppDispatch();
  const { assessment, enrollment, loading, error } = useAppSelector(
    (state) => state.studentAssessment,
  );

  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [honorCodeAccepted, setHonorCodeAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!courseId || !assessmentId) return;
    dispatch(fetchAssessmentData({ courseId, assessmentId }));
  }, [courseId, assessmentId, dispatch]);

  const questions: AssessmentQuestion[] =
    assessment?.parsedContent?.questions || [];

  const handleOptionChange = (questionId: string, optionIndex: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleSubmit = () => {
    setIsSubmitModalOpen(true);
  };

  const handleSubmitConfirm = async () => {
    setIsSubmitModalOpen(false);
    setIsSubmitting(true);

    let correctCount = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswerIndex) {
        correctCount++;
      }
    });

    const finalScore = Number(
      ((correctCount / questions.length) * 100).toFixed(2),
    );

    const passingScore = (assessment as AssessmentLesson).parsedContent
      .passingScore;

    const isPassed = finalScore >= passingScore;

    try {
      if (enrollment?.enrollmentId && isPassed) {
        await enrollmentApi.updateLessonProgress(
          enrollment.enrollmentId,
          assessmentId!,
          {
            completed: true,
            passed: true,
            score: finalScore,
          },
        );
      }

      const resultPayload = {
        score: finalScore,
        passingScore,
        answers,
        questions,
        isPassed,
        title:
          (assessment as AssessmentLesson).parsedContent.title ||
          (assessment as AssessmentLesson).title,
        highestScore:
          (assessmentId &&
            (enrollment as AssessmentEnrollmentProgress | null)?.progress?.[
              assessmentId
            ]?.score) ||
          finalScore,
      };

      dispatch(setAssessmentResult(resultPayload));

      try {
        localStorage.setItem(
          "studentAssessmentResult",
          JSON.stringify(resultPayload),
        );
      } catch {}

      toast.success(
        isPassed
          ? "Assessment submitted successfully!"
          : "Assessment submitted. You did not pass this attempt.",
      );

      setTimeout(() => {
        navigate(`/learn/${courseId}/assessment/${assessmentId}/result`);
      }, 1500);
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Failed to submit assessment. Please try again.";

      toast.error(message);
      setIsSubmitting(false);
    }
  };

  return {
    assessment,
    enrollment,
    loading,
    error,
    answers,
    questions,
    isSubmitModalOpen,
    honorCodeAccepted,
    isSubmitting,
    setIsSubmitModalOpen,
    setHonorCodeAccepted,
    handleOptionChange,
    handleSubmit,
    handleSubmitConfirm,
    assessmentStarted,
    courseId,
    assessmentId,
  };
};

export default useCourseAssessment;
