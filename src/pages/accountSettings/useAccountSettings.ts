import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import type { FormEvent } from "react";
import type { RootState } from "../../redux/store";
import { useAppDispatch } from "../../redux/hooks";
import {
  changePassword,
  updateUserProfile,
} from "../../redux/slices/auth/authSlice";
import type { PasswordState } from "../../types/ui/account-settings.types";

const useAccountSettings = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  const [fullName, setFullName] = useState(user?.name || "");
  const [isSaving, setIsSaving] = useState(false);
  const [passwordState, setPasswordState] = useState<PasswordState>({
    currentPassword: "",
    newPassword: "",
    retypePassword: "",
  });
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  useEffect(() => {
    setFullName(user?.name || "");
  }, [user?.name]);

  const handleSaveProfile = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedName = fullName.trim();
    if (!trimmedName) {
      toast.error("Full name is required");
      return;
    }

    try {
      setIsSaving(true);
      await dispatch(updateUserProfile({ name: trimmedName })).unwrap();
      toast.success("Profile updated");
    } catch (error) {
      console.error("Failed to update profile", error);
      toast.error("Failed to update profile");
    } finally {
      setIsSaving(false);
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
      await dispatch(changePassword({ currentPassword, newPassword })).unwrap();
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
    fullName,
    handleChangePassword,
    handleSaveProfile,
    isSaving,
    isUpdatingPassword,
    passwordState,
    setFullName,
    setPasswordState,
    user,
  };
};

export default useAccountSettings;
