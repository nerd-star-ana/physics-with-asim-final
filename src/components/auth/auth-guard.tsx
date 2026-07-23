"use client";

import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth, UserRole } from "@/context/auth-context";

interface AuthGuardProps {
  children: React.ReactNode;
  allowedRole: UserRole;
}

export function AuthGuard({ children, allowedRole }: AuthGuardProps) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated || !user) {
      router.replace("/login");
      return;
    }

    if (allowedRole === "teacher" && user.role !== "teacher") {
      router.replace("/dashboard");
      return;
    }

    if (allowedRole === "student" && user.role !== "student") {
      router.replace("/teacher");
      return;
    }
  }, [user, isAuthenticated, isLoading, allowedRole, router, pathname]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white p-6">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="relative flex h-12 w-12 items-center justify-center">
            <div className="absolute inset-0 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent" />
            <span className="text-xs font-bold text-indigo-400">PWA</span>
          </div>
          <div>
            <p className="text-sm font-bold text-slate-200">Verifying session...</p>
            <p className="text-xs text-slate-400">Physics with Asim LMS Security</p>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user || user.role !== allowedRole) {
    return null;
  }

  return <>{children}</>;
}
