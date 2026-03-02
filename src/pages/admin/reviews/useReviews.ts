import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { fetchAdminReviews } from "../../../redux/slices/admin/adminReviewsSlice";
import type { ReviewsState } from "../../../types/ui/admin/reviews.types";

const useReviews = (): ReviewsState => {
  const dispatch = useAppDispatch();
  const {
    items: reviews,
    loading,
    error,
  } = useAppSelector((state) => state.adminReviews);

  useEffect(() => {
    dispatch(fetchAdminReviews());
  }, [dispatch]);

  return { reviews, loading, error };
};

export default useReviews;
