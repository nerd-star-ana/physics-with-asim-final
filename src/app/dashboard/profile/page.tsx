"use client";

import { useState } from "react";
import {
  CheckCircle2,
  Globe,
  KeyRound,
  Save,
  UserRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";
import { useAuth } from "@/context/auth-context";
import { cn } from "@/lib/utils";

export default function ProfilePage() {
  const { user, updateUser } = useAuth();

  // Profile Form State
  const [name, setName] = useState(user?.name || "Ahmed Khan");
  const [email, setEmail] = useState(user?.email || "ahmed.khan@gmail.com");
  const [level, setLevel] = useState(user?.level || "Cambridge A Level Physics");
  const [phone, setPhone] = useState("+92 300 1234567");
  const [language, setLanguage] = useState("English");

  // Avatar selector state
  const avatarOptions = ["A", "K", "P", "S", "M", "Z"];
  const [selectedAvatar, setSelectedAvatar] = useState(user?.avatar || "A");

  // Password State
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");

  // Notification Preferences
  const [emailReminders, setEmailReminders] = useState(true);
  const [classAlerts, setClassAlerts] = useState(true);
  const [quizReminders, setQuizReminders] = useState(false);

  // General Save state
  const [profileSuccess, setProfileSuccess] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    setTimeout(() => {
      updateUser({
        name,
        email,
        level,
        avatar: selectedAvatar,
      });
      setIsSaving(false);
      setProfileSuccess("Profile settings saved successfully!");
      setTimeout(() => setProfileSuccess(""), 4000);
    }, 400);
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess("");

    if (!currentPassword) {
      setPasswordError("Please enter your current password.");
      return;
    }
    if (newPassword.length < 6) {
      setPasswordError("New password must be at least 6 characters long.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("New password and confirm password do not match.");
      return;
    }

    setPasswordSuccess("Password updated successfully.");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setTimeout(() => setPasswordSuccess(""), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950 shadow-xs">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-100 px-3 py-1 text-xs font-bold text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">
            <UserRound className="h-3.5 w-3.5" /> Student Identity & Settings
          </div>
          <h1 className="mt-2 text-2xl font-bold text-slate-950 dark:text-white sm:text-3xl">
            Account & Profile Settings
          </h1>
          <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
            Manage your personal profile details, exam board preference, password security, and alerts.
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        {/* Main Personal Profile Form */}
        <form onSubmit={handleSaveProfile} className="space-y-6">
          <Card className="border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950 shadow-xs space-y-6">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-4 dark:border-slate-800">
              <UserRound className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              <h2 className="text-lg font-bold text-slate-950 dark:text-white">Personal Details</h2>
            </div>

            {profileSuccess && (
              <div className="flex items-center gap-2 rounded-2xl bg-emerald-100 p-3.5 text-xs font-bold text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                <span>{profileSuccess}</span>
              </div>
            )}

            {/* Avatar Selection */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Choose Profile Avatar Monogram
              </label>
              <div className="flex flex-wrap gap-2">
                {avatarOptions.map((letter) => (
                  <button
                    key={letter}
                    type="button"
                    onClick={() => setSelectedAvatar(letter)}
                    className={cn(
                      "flex h-11 w-11 items-center justify-center rounded-2xl text-sm font-bold transition",
                      selectedAvatar === letter
                        ? "bg-indigo-600 text-white ring-2 ring-indigo-600/30 dark:bg-indigo-500"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-900 dark:text-slate-300",
                    )}
                  >
                    {letter}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Student Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-10 w-full rounded-2xl border border-slate-200 bg-white px-3.5 text-xs font-medium text-slate-900 focus:border-indigo-500 focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
                />
              </div>

              {/* Email Address */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-10 w-full rounded-2xl border border-slate-200 bg-white px-3.5 text-xs font-medium text-slate-900 focus:border-indigo-500 focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
                />
              </div>

              {/* Exam Board & Level */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Curriculum & Exam Level
                </label>
                <select
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  className="h-10 w-full rounded-2xl border border-slate-200 bg-white px-3.5 text-xs font-medium text-slate-900 focus:border-indigo-500 focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
                >
                  <option value="Cambridge A Level Physics">Cambridge A Level Physics (9702)</option>
                  <option value="Cambridge AS Level Physics">Cambridge AS Level Physics (9702)</option>
                  <option value="Cambridge IGCSE Physics">Cambridge IGCSE Physics (0625)</option>
                  <option value="Edexcel International A Level">Edexcel International A Level</option>
                </select>
              </div>

              {/* Phone Number */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Phone / WhatsApp Number
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="h-10 w-full rounded-2xl border border-slate-200 bg-white px-3.5 text-xs font-medium text-slate-900 focus:border-indigo-500 focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <Button
                type="submit"
                disabled={isSaving}
                className="bg-indigo-600 text-white hover:bg-indigo-700 font-bold"
              >
                <Save className="h-4 w-4" /> {isSaving ? "Saving..." : "Save Profile Changes"}
              </Button>
            </div>
          </Card>
        </form>

        {/* Security & System Preferences */}
        <div className="space-y-6">
          {/* Password Change Form */}
          <form onSubmit={handlePasswordChange}>
            <Card className="border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950 shadow-xs space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-200 pb-3 dark:border-slate-800">
                <KeyRound className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                <h2 className="text-base font-bold text-slate-950 dark:text-white">Security & Password</h2>
              </div>

              {passwordError && (
                <div className="rounded-2xl bg-rose-100 p-3 text-xs font-bold text-rose-900 dark:bg-rose-950 dark:text-rose-200">
                  {passwordError}
                </div>
              )}
              {passwordSuccess && (
                <div className="rounded-2xl bg-emerald-100 p-3 text-xs font-bold text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200">
                  {passwordSuccess}
                </div>
              )}

              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Current Password
                  </label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="••••••••"
                    className="h-9 w-full rounded-2xl border border-slate-200 bg-white px-3 text-xs font-medium text-slate-900 focus:border-indigo-500 focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                    className="h-9 w-full rounded-2xl border border-slate-200 bg-white px-3 text-xs font-medium text-slate-900 focus:border-indigo-500 focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="h-9 w-full rounded-2xl border border-slate-200 bg-white px-3 text-xs font-medium text-slate-900 focus:border-indigo-500 focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
                  />
                </div>
              </div>

              <Button type="submit" variant="outline" className="w-full text-xs font-bold">
                Update Password
              </Button>
            </Card>
          </form>

          {/* Preferences & Theme Toggle */}
          <Card className="border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950 shadow-xs space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-3 dark:border-slate-800">
              <Globe className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              <h2 className="text-base font-bold text-slate-950 dark:text-white">App Preferences</h2>
            </div>

            <div className="space-y-3 text-xs font-medium">
              {/* Theme Preference */}
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  Theme Appearance
                </span>
                <ThemeToggle />
              </div>

              {/* Language Preference */}
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-800 dark:text-slate-200">Language</span>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="h-8 rounded-xl border border-slate-200 bg-white px-2 text-xs font-semibold text-slate-900 focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
                >
                  <option value="English">English</option>
                  <option value="Urdu">Urdu</option>
                </select>
              </div>

              {/* Email Reminders Toggle */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-900">
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  Email Reminders & Digest
                </span>
                <input
                  type="checkbox"
                  checked={emailReminders}
                  onChange={(e) => setEmailReminders(e.target.checked)}
                  className="h-4 w-4 rounded-sm border-slate-300 text-indigo-600 focus:ring-indigo-500"
                />
              </div>

              {/* Class Notifications */}
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  Live Seminar Alerts
                </span>
                <input
                  type="checkbox"
                  checked={classAlerts}
                  onChange={(e) => setClassAlerts(e.target.checked)}
                  className="h-4 w-4 rounded-sm border-slate-300 text-indigo-600 focus:ring-indigo-500"
                />
              </div>

              {/* Quiz Reminders Toggle */}
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  Weekly Practice Quiz Reminders
                </span>
                <input
                  type="checkbox"
                  checked={quizReminders}
                  onChange={(e) => setQuizReminders(e.target.checked)}
                  className="h-4 w-4 rounded-sm border-slate-300 text-indigo-600 focus:ring-indigo-500"
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
