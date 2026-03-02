import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setAssessmentResult } from "../../redux/slices/student/studentAssessmentResultSlice";
import type { AssessmentQuestion } from "../../types/student";
import type { QuestionResult } from "../../types/ui/assessment-result.types";

const useCourseAssessmentResult = () => {
  const navigate = useNavigate();
  const { courseId } = useParams<{ courseId: string }>();
  const dispatch = useAppDispatch();
  const {
    score,
    passingScore,
    questions,
    answers,
    isPassed,
    title,
    highestScore,
  } = useAppSelector((state) => state.studentAssessmentResult);

  useEffect(() => {
    if (questions.length > 0) return;
    try {
      const raw = localStorage.getItem("studentAssessmentResult");
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (parsed && Array.isArray(parsed.questions)) {
        dispatch(setAssessmentResult(parsed));
      }
    } catch {}
  }, [dispatch, questions.length]);

  const [expandedExplanations, setExpandedExplanations] = useState<Set<string>>(
    new Set(),
  );

  const results: QuestionResult[] = questions.map((q: AssessmentQuestion) => ({
    id: q.id,
    text: q.question,
    points: 1,
    type: "single",
    options: q.options,
    userAnswer: q.options[answers[q.id]] || "No answer",
    correctAnswer: q.options[q.correctAnswerIndex],
    isCorrect: answers[q.id] === q.correctAnswerIndex,
    explanation:
      q.explanation ||
      (answers[q.id] === q.correctAnswerIndex
        ? "Great job! You got it right."
        : "Keep studying and try again!"),
  }));

  const toggleExplanation = (questionId: string) => {
    setExpandedExplanations((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(questionId)) {
        newSet.delete(questionId);
      } else {
        newSet.add(questionId);
      }
      return newSet;
    });
  };

  return {
    courseId,
    navigate,
    score,
    passingScore,
    questions,
    answers,
    isPassed,
    title,
    highestScore,
    results,
    expandedExplanations,
    toggleExplanation,
  };
};

export default useCourseAssessmentResult;
