import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  logoutAdmin,
  updateAdminProfile,
  changeAdminPassword,
} from "../../../redux/slices/auth/adminAuthSlice";
import type { AppDispatch, RootState } from "../../../redux/store";
import { toast } from "react-hot-toast";
import type {
  SettingsState,
  PasswordState,
} from "../../../types/ui/admin/settings.types";

const useSettings = (): SettingsState => {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [passwordState, setPasswordState] = useState<PasswordState>({
    currentPassword: "",
    newPassword: "",
    retypePassword: "",
  });
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  const adminUser = useSelector((state: RootState) => state.adminAuth.user);
  const [displayName, setDisplayName] = useState(adminUser?.name || "");
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    setDisplayName(adminUser?.name || "");
  }, [adminUser?.name]);

  const handleLogout = async () => {
    const confirmed = window.confirm("Are you sure you want to log out?");
    if (confirmed) {
      await dispatch(logoutAdmin());
      navigate("/admin-login");
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
      await dispatch(updateAdminProfile({ name: trimmedName })).unwrap();
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
        changeAdminPassword({ currentPassword, newPassword }),
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

  return {
    twoFactorEnabled,
    setTwoFactorEnabled,
    emailNotifications,
    setEmailNotifications,
    passwordState,
    setPasswordState,
    isUpdatingPassword,
    adminUser,
    displayName,
    setDisplayName,
    isSavingProfile,
    handleLogout,
    handleSaveProfile,
    handleChangePassword,
  };
};

export default useSettings;
