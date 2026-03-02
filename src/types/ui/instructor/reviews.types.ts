import type { InstructorReview } from "../../instructor";

export interface ReviewsState {
  items: InstructorReview[];
  loading: boolean;
  error: string | null;
}
