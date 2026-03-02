import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchStudentDashboard } from "../../redux/slices/student/studentDashboardSlice";

const useDashboardData = () => {
  const dispatch = useAppDispatch();
  const {
    recentlyViewed,
    mostPopular,
    personalized,
    enrollments,
    loading: isLoading,
  } = useAppSelector((state) => state.studentDashboard);

  useEffect(() => {
    dispatch(fetchStudentDashboard());
  }, [dispatch]);

  return {
    isLoading,
    mostPopular,
    personalized,
    recentlyViewed,
    enrollments,
  };
};

export default useDashboardData;
