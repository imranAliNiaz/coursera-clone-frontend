import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  logoutInstructor,
  updateInstructorProfile,
  changeInstructorPassword,
} from "../../../redux/slices/auth/instructorAuthSlice";
import type { AppDispatch, RootState } from "../../../redux/store";
import { toast } from "react-hot-toast";
import type { SettingsState } from "../../../types/ui/instructor/settings.types";

const useSettings = (): SettingsState => {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [passwordState, setPasswordState] = useState({
    currentPassword: "",
    newPassword: "",
    retypePassword: "",
  });
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  const instructorUser = useSelector(
    (state: RootState) => state.instructorAuth.user,
  );
  const [displayName, setDisplayName] = useState(instructorUser?.name || "");
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    setDisplayName(instructorUser?.name || "");
  }, [instructorUser?.name]);

  const handleLogout = async () => {
    const confirmed = window.confirm("Are you sure you want to log out?");
    if (confirmed) {
      await dispatch(logoutInstructor());
      navigate("/instructor-login");
    }
  };

  const handleChangePassword = async () => {
    const { currentPassword, newPassword, retypePassword } = passwordState;

    if (!currentPassword || !newPassword || !retypePassword) {
      toast.error("All password fields are required");
      return;
    }

    if (newPassword !== retypePassword) {
      toast.error("New passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("New password must be at least 6 characters");
      return;
    }

    try {
      setIsUpdatingPassword(true);
      await dispatch(
        changeInstructorPassword({ currentPassword, newPassword }),
      ).unwrap();
      toast.success("Password updated successfully");
      setPasswordState({
        currentPassword: "",
        newPassword: "",
        retypePassword: "",
      });
    } catch (error: unknown) {
      console.error("Failed to update password", error);
      const message =
        (error as { message?: string })?.message ||
        (typeof error === "string" ? error : undefined) ||
        "Failed to update password";
      toast.error(message);
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  const handleSaveProfile = async () => {
    const trimmedName = displayName.trim();
    if (!trimmedName) {
      toast.error("Display name is required");
      return;
    }
    try {
      setIsSavingProfile(true);
      await dispatch(updateInstructorProfile({ name: trimmedName })).unwrap();
      toast.success("Profile updated");
    } catch (error: unknown) {
      console.error("Failed to update profile", error);
      const message =
        (error as { message?: string })?.message ||
        (typeof error === "string" ? error : undefined) ||
        "Failed to update profile";
      toast.error(message);
    } finally {
      setIsSavingProfile(false);
    }
  };

  return {
    twoFactorEnabled,
    setTwoFactorEnabled,
    emailNotifications,
    setEmailNotifications,
    passwordState,
    setPasswordState,
    isUpdatingPassword,
    instructorUser,
    displayName,
    setDisplayName,
    isSavingProfile,
    handleLogout,
    handleChangePassword,
    handleSaveProfile,
  };
};

export default useSettings;
