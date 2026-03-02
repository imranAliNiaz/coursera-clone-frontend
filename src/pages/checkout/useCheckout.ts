import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchCheckoutData } from "../../redux/slices/student/studentCheckoutSlice";

const useCheckout = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const dispatch = useAppDispatch();
  const {
    course,
    loading: isLoading,
    studentName,
  } = useAppSelector((state) => state.studentCheckout);

  useEffect(() => {
    if (!courseId) return;
    dispatch(fetchCheckoutData(courseId));
  }, [courseId, dispatch]);

  return { course, isLoading, studentName };
};

export default useCheckout;
