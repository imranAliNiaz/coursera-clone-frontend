import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";

import {
  loginAdmin,
  setAdminSession,
  clearAdminError,
} from "../../redux/slices/auth/adminAuthSlice";
import {
  loginInstructor,
  setInstructorSession,
  clearInstructorError,
} from "../../redux/slices/auth/instructorAuthSlice";
import type { AppDispatch, RootState } from "../../redux/store";
import { ENDPOINTS } from "../../services/endpoints";

interface UseAdminInstructorLoginParams {
  expectedRole?: "admin" | "instructor";
}

const useAdminInstructorLogin = ({
  expectedRole,
}: UseAdminInstructorLoginParams) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const adminAuth = useSelector((state: RootState) => state.adminAuth);
  const instructorAuth = useSelector(
    (state: RootState) => state.instructorAuth,
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isLoading = useMemo(
    () =>
      expectedRole === "admin"
        ? adminAuth.isLoading
        : expectedRole === "instructor"
          ? instructorAuth.isLoading
          : adminAuth.isLoading || instructorAuth.isLoading,
    [adminAuth.isLoading, instructorAuth.isLoading, expectedRole],
  );

  const error = useMemo(
    () =>
      expectedRole === "admin"
        ? adminAuth.error
        : expectedRole === "instructor"
          ? instructorAuth.error
          : adminAuth.error || instructorAuth.error,
    [adminAuth.error, instructorAuth.error, expectedRole],
  );

  useEffect(() => {
    if (expectedRole === "admin" && adminAuth.user) {
      navigate("/admin");
    } else if (expectedRole === "instructor" && instructorAuth.user) {
      navigate("/instructor");
    } else if (!expectedRole) {
      if (adminAuth.user) navigate("/admin");
      else if (instructorAuth.user) navigate("/instructor");
    }
  }, [adminAuth.user, instructorAuth.user, expectedRole, navigate]);

  useEffect(() => {
    return () => {
      dispatch(clearAdminError());
      dispatch(clearInstructorError());
    };
  }, [dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    try {
      if (expectedRole === "admin") {
        const result = await dispatch(loginAdmin({ email, password }));
        if (loginAdmin.fulfilled.match(result)) {
          toast.success("Welcome back, Admin");
          navigate("/admin");
        } else {
          toast.error((result.payload as string) || "Login failed");
        }
      } else if (expectedRole === "instructor") {
        const result = await dispatch(loginInstructor({ email, password }));
        if (loginInstructor.fulfilled.match(result)) {
          toast.success("Welcome back, Instructor");
          navigate("/instructor");
        } else {
          toast.error((result.payload as string) || "Login failed");
        }
      } else {
        const API_URL = import.meta.env.VITE_API_BASE_URL || "/api/v1";
        const { data } = await axios.post(`${API_URL}${ENDPOINTS.AUTH_LOGIN}`, {
          email,
          password,
        });

        const role = data.user.role.toLowerCase();
        if (role === "admin") {
          dispatch(setAdminSession(data));
          toast.success("Welcome Admin");
          navigate("/admin");
        } else if (role === "instructor") {
          dispatch(setInstructorSession(data));
          toast.success("Welcome Instructor");
          navigate("/instructor");
        } else {
          toast.error("Access restricted. Please use student login.");
        }
      }
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message ||
        (err as { message?: string })?.message ||
        "Login failed";
      if (!expectedRole) {
        toast.error(msg);
      }
    }
  };

  return {
    email,
    error,
    handleSubmit,
    isLoading,
    password,
    setEmail,
    setPassword,
  };
};

export default useAdminInstructorLogin;
