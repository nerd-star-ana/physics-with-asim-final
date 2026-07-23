"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

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
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = "physics_asim_auth_session";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.role && parsed.username) {
          setUser(parsed);
        }
      }
    } catch {
      // Ignore storage error
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (inputUsername: string, password?: string) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 300));

    const cleanUsername = inputUsername.trim().toLowerCase();

    // Check credentials: password must be "123"
    if (password !== "123") {
      setIsLoading(false);
      return {
        success: false,
        message: "Incorrect password. Password for all demo accounts is '123'.",
      };
    }

    const matchedAccount = DEMO_ACCOUNTS[cleanUsername];

    if (!matchedAccount) {
      setIsLoading(false);
      return {
        success: false,
        message: "Username not recognized. Use 'asim' for Teacher or 'student1' to 'student5' for Students.",
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

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        isLoading,
        login,
        logout,
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

