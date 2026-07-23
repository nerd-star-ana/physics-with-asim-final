"use client";

import React from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { AuthGuard } from "@/components/auth/auth-guard";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard allowedRole="student">
      <DashboardLayout>{children}</DashboardLayout>
    </AuthGuard>
  );
}
