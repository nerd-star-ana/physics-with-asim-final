"use client";

import React, { createContext, useContext, useState } from "react";

export type UserRole = "teacher" | "student";

export type User = {
  username: string;
  name: string;
  email: string;
  role: UserRole;
  studentId?: string;
  level?: string;
  avatar?: string;
  streak?: number;
  xp?: number;
};

export const DEMO_ACCOUNTS: Record<string, User> = {
  asim: {
    username: "asim",
    name: "Sir Asim",
    email: "asim@physicswithasim.com",
    role: "teacher",
    level: "Master Physics Instructor",
    avatar: "A",
    streak: 365,
    xp: 9999,
  },
  student1: {
    username: "student1",
    name: "Ahmed Khan",
    email: "ahmed.khan@student.edu",
    role: "student",
    studentId: "std_1",
    level: "Cambridge A-Level Physics (Batch A)",
    avatar: "A",
    streak: 14,
    xp: 1480,
  },
  student2: {
    username: "student2",
    name: "Fatima Zahra",
    email: "fatima.z@student.edu",
    role: "student",
    studentId: "std_2",
    level: "Cambridge A-Level Physics (Batch A)",
    avatar: "F",
    streak: 21,
    xp: 1920,
  },
  student3: {
    username: "student3",
    name: "Zain Ali",
    email: "zain.a@student.edu",
    role: "student",
    studentId: "std_3",
    level: "Physics AS-Level Evening",
    avatar: "Z",
    streak: 7,
    xp: 840,
  },
  student4: {
    username: "student4",
    name: "Ayesha Malik",
    email: "ayesha.m@student.edu",
    role: "student",
    studentId: "std_4",
    level: "Physics O-Level Morning",
    avatar: "A",
    streak: 12,
    xp: 1100,
  },
  student5: {
    username: "student5",
    name: "Bilal Siddiqui",
    email: "bilal.s@student.edu",
    role: "student",
    studentId: "std_5",
    level: "Physics O-Level Evening",
    avatar: "B",
    streak: 5,
    xp: 620,
  },
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password?: string) => Promise<{ success: boolean; message?: string; user?: User }>;
  logout: () => void;
  register: (name: string, email: string, password?: string) => Promise<{ success: boolean; message?: string; user?: User }>;
  forgotPassword: (email: string) => Promise<{ success: boolean; message?: string }>;
  resetPassword: (password: string) => Promise<{ success: boolean; message?: string }>;
  updateUser: (data: Partial<User>) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = "physics_asim_auth_session";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window === "undefined") return null;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.role && parsed.username) {
          return parsed;
        }
      }
    } catch {
      // Ignore storage error
    }
    return null;
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const login = async (inputUsername: string, password?: string) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 200));

    const cleanInput = inputUsername.trim().toLowerCase();

    // Check credentials: password must be "123"
    if (password !== "123") {
      setIsLoading(false);
      return {
        success: false,
        message: "Incorrect password. The password for all demo accounts is '123'.",
      };
    }

    let matchedAccount: User | undefined = DEMO_ACCOUNTS[cleanInput];

    if (!matchedAccount) {
      matchedAccount = Object.values(DEMO_ACCOUNTS).find(
        (acc) =>
          acc.username.toLowerCase() === cleanInput ||
          acc.email.toLowerCase() === cleanInput
      );
    }

    if (!matchedAccount) {
      setIsLoading(false);
      return {
        success: false,
        message: "Username not recognized. Use 'asim' for Teacher or 'student1' through 'student5' for Students.",
      };
    }

    setUser(matchedAccount);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(matchedAccount));
    } catch {}

    setIsLoading(false);
    return {
      success: true,
      message: `Welcome back, ${matchedAccount.name}!`,
      user: matchedAccount,
    };
  };

  const registerUser = async (name: string, email: string, password?: string) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 300));

    const username = email.split("@")[0] || "student_new";
    const newUser: User = {
      username,
      name,
      email,
      role: "student",
      studentId: `std_${Date.now()}`,
      level: "Cambridge A-Level Physics",
      avatar: name.charAt(0).toUpperCase() || "S",
      streak: 1,
      xp: 100,
    };

    setUser(newUser);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    } catch {}

    setIsLoading(false);
    return {
      success: true,
      message: `Account created successfully! Welcome, ${name}.`,
      user: newUser,
    };
  };

  const forgotPassword = async (email: string) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return {
      success: true,
      message: `Recovery instructions sent to ${email}.`,
    };
  };

  const resetPassword = async (password: string) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return {
      success: true,
      message: "Password updated successfully!",
    };
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  };

  const updateUser = (data: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return null;
      const updated = { ...prev, ...data };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        isLoading,
        login,
        logout,
        register: registerUser,
        forgotPassword,
        resetPassword,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

