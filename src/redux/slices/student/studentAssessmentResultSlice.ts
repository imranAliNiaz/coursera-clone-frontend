import { createSlice } from "@reduxjs/toolkit";
import type {
  AssessmentQuestion,
  AssessmentResultState,
} from "../../../types/student";

const initialState: AssessmentResultState = {
  score: 0,
  passingScore: 80,
  questions: [],
  answers: {},
  isPassed: false,
  title: "Assessment Result",
  highestScore: 0,
};

const studentAssessmentResultSlice = createSlice({
  name: "studentAssessmentResult",
  initialState,
  reducers: {
    setAssessmentResult(
      state,
      action: {
        payload: {
          score: number;
          passingScore: number;
          questions: AssessmentQuestion[];
          answers: Record<string, number>;
          isPassed: boolean;
          title: string;
          highestScore: number;
        };
      },
    ) {
      state.score = action.payload.score;
      state.passingScore = action.payload.passingScore;
      state.questions = action.payload.questions;
      state.answers = action.payload.answers;
      state.isPassed = action.payload.isPassed;
      state.title = action.payload.title;
      state.highestScore = action.payload.highestScore;
    },
    clearAssessmentResult(state) {
      state.score = 0;
      state.passingScore = 80;
      state.questions = [];
      state.answers = {};
      state.isPassed = false;
      state.title = "Assessment Result";
      state.highestScore = 0;
    },
  },
});

export const { setAssessmentResult, clearAssessmentResult } =
  studentAssessmentResultSlice.actions;
export default studentAssessmentResultSlice.reducer;
