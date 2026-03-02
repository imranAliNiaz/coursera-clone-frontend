import type { AdminReview } from "../../admin";

export interface ReviewsState {
  reviews: AdminReview[];
  loading: boolean;
  error: string | null;
}
