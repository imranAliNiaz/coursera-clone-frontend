import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  deleteAdminInstructor,
  fetchAdminInstructors,
} from "../../../redux/slices/admin/adminInstructorsSlice";
import type { InstructorsState } from "../../../types/ui/admin/instructors.types";

const useInstructors = (): InstructorsState => {
  const dispatch = useAppDispatch();
  const {
    items: instructors,
    loading,
    error,
  } = useAppSelector((state) => state.adminInstructors);

  useEffect(() => {
    dispatch(fetchAdminInstructors());
  }, [dispatch]);

  const handleRemoveInstructor = async (id: string) => {
    if (!window.confirm("Are you sure you want to remove this instructor?"))
      return;
    try {
      await dispatch(deleteAdminInstructor(id)).unwrap();
      toast.success("Instructor removed successfully");
    } catch (err: unknown) {
      const message =
        (err as { message?: string })?.message ||
        (typeof err === "string" ? err : undefined) ||
        "Failed to remove instructor";
      toast.error(message);
    }
  };

  return {
    instructors,
    loading,
    error,
    fetchInstructors: () => dispatch(fetchAdminInstructors()),
    handleRemoveInstructor,
  };
};

export default useInstructors;
