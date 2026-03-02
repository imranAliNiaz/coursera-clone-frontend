import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { fetchInstructorReviews } from "../../../redux/slices/instructor/instructorReviewsSlice";
import type { ReviewsState } from "../../../types/ui/instructor/reviews.types";

const useReviews = (): ReviewsState => {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector(
    (state) => state.instructorReviews,
  );

  useEffect(() => {
    dispatch(fetchInstructorReviews());
  }, [dispatch]);

  return { items, loading, error };
};

export default useReviews;
