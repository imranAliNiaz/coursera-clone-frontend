import type { InstructorUser } from "../../instructor";

export interface PasswordState {
  currentPassword: string;
  newPassword: string;
  retypePassword: string;
}

export interface SettingsState {
  twoFactorEnabled: boolean;
  setTwoFactorEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  emailNotifications: boolean;
  setEmailNotifications: React.Dispatch<React.SetStateAction<boolean>>;
  passwordState: PasswordState;
  setPasswordState: React.Dispatch<React.SetStateAction<PasswordState>>;
  isUpdatingPassword: boolean;
  instructorUser: InstructorUser | null;
  displayName: string;
  setDisplayName: React.Dispatch<React.SetStateAction<string>>;
  isSavingProfile: boolean;
  handleLogout: () => Promise<void>;
  handleChangePassword: () => Promise<void>;
  handleSaveProfile: () => Promise<void>;
}
