import type { User } from "../../../redux/slices/auth/types";

export interface PasswordState {
  currentPassword: string;
  newPassword: string;
  retypePassword: string;
}

export interface SettingsState {
  twoFactorEnabled: boolean;
  setTwoFactorEnabled: (enabled: boolean) => void;
  emailNotifications: boolean;
  setEmailNotifications: (enabled: boolean) => void;
  passwordState: PasswordState;
  setPasswordState: (state: PasswordState) => void;
  isUpdatingPassword: boolean;
  adminUser: User | null;
  displayName: string;
  setDisplayName: (name: string) => void;
  isSavingProfile: boolean;
  handleLogout: () => Promise<void>;
  handleSaveProfile: () => Promise<void>;
  handleChangePassword: () => Promise<void>;
}
