import React from "react";
import useSettings from "./useSettings";
import type { SettingsState } from "../../../types/ui/admin/settings.types";

const Settings: React.FC = () => {
  const {
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
  }: SettingsState = useSettings();

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="pb-6 border-b border-border">
        <h1 className="text-2xl font-semibold text-text-primary mb-2">
          Settings
        </h1>
        <p className="text-sm text-text-secondary">
          Manage your account preferences and security settings
        </p>
      </div>

      <div className="max-w-3xl space-y-6">
        <section className="bg-surface p-6 rounded-xl border border-border shadow-sm">
          <h3 className="text-base font-semibold text-text-primary mb-6">
            Profile Information
          </h3>

          <div className="flex items-center gap-6 pb-6 mb-6 border-b border-border-light">
            <div className="w-16 h-16 rounded-xl bg-primary flex items-center justify-center text-white font-semibold text-lg shadow-md">
              AD
            </div>
            <div>
              <button className="px-4 py-2 border border-border text-sm font-medium text-text-secondary rounded-lg hover:bg-surface-hover hover:border-border-dark transition-all">
                Change Avatar
              </button>
              <p className="text-xs text-text-muted mt-1">
                JPG, PNG or GIF. Max size 2MB
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Display Name
              </label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full bg-surface-hover border border-border rounded-lg px-4 py-3 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={adminUser?.email || ""}
                disabled
                className="w-full bg-surface-hover border border-border rounded-lg px-4 py-3 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all cursor-not-allowed opacity-80"
              />
            </div>
          </div>
        </section>

        <section className="bg-surface p-6 rounded-xl border border-border shadow-sm">
          <h3 className="text-base font-semibold text-text-primary mb-6">
            Security Settings
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-surface-hover rounded-lg border border-border-light">
              <div className="flex-1">
                <p className="text-sm font-semibold text-text-primary mb-1">
                  Two-Factor Authentication
                </p>
                <p className="text-xs text-text-muted">
                  Add an extra layer of security to your account
                </p>
              </div>
              <button
                onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
                  twoFactorEnabled ? "bg-primary" : "bg-border-dark"
                }`}
              >
                <span
                  className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ${
                    twoFactorEnabled ? "translate-x-6" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-surface-hover rounded-lg border border-border-light">
              <div className="flex-1">
                <p className="text-sm font-semibold text-text-primary mb-1">
                  Password Rotation
                </p>
                <p className="text-xs text-text-muted">
                  Last changed: 14 days ago
                </p>
              </div>
              <button className="px-4 py-2 bg-white border border-border text-sm font-medium text-text-secondary rounded-lg hover:bg-surface-hover hover:border-border-dark transition-all">
                Change Password
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-surface-hover rounded-lg border border-border-light">
              <div className="flex-1">
                <p className="text-sm font-semibold text-text-primary mb-1">
                  Email Notifications
                </p>
                <p className="text-xs text-text-muted">
                  Receive email updates about account activity
                </p>
              </div>
              <button
                onClick={() => setEmailNotifications(!emailNotifications)}
                className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
                  emailNotifications ? "bg-primary" : "bg-border-dark"
                }`}
              >
                <span
                  className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ${
                    emailNotifications ? "translate-x-6" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Current Password
              </label>
              <input
                type="password"
                value={passwordState.currentPassword}
                onChange={(e) =>
                  setPasswordState({
                    ...passwordState,
                    currentPassword: e.target.value,
                  })
                }
                className="w-full bg-surface-hover border border-border rounded-lg px-3 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                New Password
              </label>
              <input
                type="password"
                value={passwordState.newPassword}
                onChange={(e) =>
                  setPasswordState({
                    ...passwordState,
                    newPassword: e.target.value,
                  })
                }
                className="w-full bg-surface-hover border border-border rounded-lg px-3 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Retype Password
              </label>
              <input
                type="password"
                value={passwordState.retypePassword}
                onChange={(e) =>
                  setPasswordState({
                    ...passwordState,
                    retypePassword: e.target.value,
                  })
                }
                className="w-full bg-surface-hover border border-border rounded-lg px-3 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>
          </div>
          <div className="mt-4">
            <button
              type="button"
              onClick={handleChangePassword}
              disabled={isUpdatingPassword}
              className="px-4 py-2 bg-white border border-border text-sm font-medium text-text-secondary rounded-lg hover:bg-surface-hover hover:border-border-dark transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isUpdatingPassword ? "Updating..." : "Update Password"}
            </button>
          </div>
        </section>

        <section className="bg-surface p-6 rounded-xl border border-border shadow-sm">
          <h3 className="text-base font-semibold text-text-primary mb-6">
            System Preferences
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Language
              </label>
              <select className="w-full bg-surface-hover border border-border rounded-lg px-4 py-3 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all">
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
                <option>German</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Timezone
              </label>
              <select className="w-full bg-surface-hover border border-border rounded-lg px-4 py-3 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all">
                <option>UTC (Coordinated Universal Time)</option>
                <option>EST (Eastern Standard Time)</option>
                <option>PST (Pacific Standard Time)</option>
              </select>
            </div>
          </div>
        </section>

        <section className="bg-surface p-6 rounded-xl border border-border shadow-sm">
          <h3 className="text-base font-semibold text-text-primary mb-6">
            Account Actions
          </h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-text-primary mb-1">
                Sign Out
              </p>
              <p className="text-xs text-text-muted">
                Sign out of your account on this device
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-error/10 border border-error/20 text-sm font-medium text-error rounded-lg hover:bg-error/20 transition-all"
            >
              Log Out
            </button>
          </div>
        </section>

        <div className="flex justify-end gap-3 pt-4">
          <button className="px-6 py-2.5 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-surface-hover rounded-lg transition-all">
            Cancel
          </button>
          <button
            onClick={handleSaveProfile}
            disabled={isSavingProfile}
            className="px-6 py-2.5 bg-primary text-white font-medium text-sm rounded-lg hover:bg-primary-hover transition-all shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSavingProfile ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
