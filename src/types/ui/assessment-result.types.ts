export interface QuestionResult {
  id: string;
  text: string;
  points: number;
  type: "single" | "multiple";
  options: string[];
  userAnswer: string | string[];
  correctAnswer: string | string[];
  isCorrect: boolean;
  explanation: string;
}
