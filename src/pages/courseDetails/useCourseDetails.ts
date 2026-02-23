import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  fetchCourseDetails,
  fetchCourseSeries,
} from "../../redux/slices/student/studentCourseDetailsSlice";

const useCourseDetails = (id?: string) => {
  const dispatch = useAppDispatch();
  const {
    course,
    loading: isLoading,
    seriesCourses,
  } = useAppSelector((state) => state.studentCourseDetails);

  useEffect(() => {
    if (!id) return;
    dispatch(fetchCourseDetails(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (!course?.id) return;
    dispatch(fetchCourseSeries(course.id));
  }, [course?.id, dispatch]);

  return {
    course,
    isLoading,
    seriesCourses,
  };
};

export default useCourseDetails;
