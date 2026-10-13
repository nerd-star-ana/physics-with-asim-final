"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import {
  BookOpen,
  CalendarDays,
  CircleCheckBig,
  Download,
  Flame,
  LayoutDashboard,
  LogOut,
  Menu,
  NotebookPen,
  Target,
  UserRound,
  X,
} from "lucide-react";

import { AuthGuard } from "@/components/auth/auth-guard";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { useAuth } from "@/context/auth-context";
import { useLMS } from "@/context/lms-context";
import { cn } from "@/lib/utils";

const sidebarNavItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/courses", label: "My Courses", icon: BookOpen },
  { href: "/dashboard/assignments", label: "Assignments", icon: CircleCheckBig },
  { href: "/dashboard/quizzes", label: "Quizzes", icon: Target },
  { href: "/dashboard/notes", label: "Notes & Formulae", icon: NotebookPen },
  { href: "/dashboard/past-papers", label: "Past Papers", icon: Download },
  { href: "/dashboard/live-schedule", label: "Live Schedule", icon: CalendarDays },
  { href: "/dashboard/profile", label: "Profile Settings", icon: UserRound },
];

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const { activeStudent, activeStudentClass } = useLMS();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const studentName = activeStudent?.name || user?.name || "Ahmed Khan";
  const studentAvatar = activeStudent?.name.charAt(0).toUpperCase() || user?.name?.charAt(0).toUpperCase() || "A";
  const className = activeStudentClass?.name || "Physics A-Level Batch A";
  const classCode = activeStudentClass?.code || "PHY-A1";
  const classColor = activeStudentClass?.color || "blue";

  const colorBadgeText =
    classColor === "blue"
      ? "🟦 Blue Class"
      : classColor === "green"
      ? "🟩 Green Class"
      : classColor === "purple"
      ? "🟪 Purple Class"
      : classColor === "orange"
      ? "🟧 Orange Class"
      : "ff Red Class";

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <AuthGuard allowedRole="student">
      <div className="page-shell min-h-screen py-6 bg-slate-50/50 dark:bg-slate-950/20">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          {/* Top Mobile Bar */}
          <div className="mb-4 flex items-center justify-between rounded-2xl border border-slate-200 bg-white/90 p-3 shadow-xs backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/80 lg:hidden">
            <div className="flex items-center gap-3">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">
                  {studentAvatar}
                </div>
                <span className="text-sm font-bold text-slate-900 dark:text-white truncate max-w-[130px]">
                  {studentName}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Button
                variant="outline"
                size="sm"
                aria-label="Log out"
                onClick={handleLogout}
                className="h-8 text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 border-rose-200 dark:border-rose-900 dark:text-rose-400 dark:hover:bg-rose-950"
              >
                <LogOut className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
            {/* Desktop & Mobile Sidebar */}
            <aside
              className={cn(
                "rounded-[28px] border border-slate-200/90 bg-white/95 p-4 shadow-sm backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/90 lg:block",
                mobileMenuOpen ? "block" : "hidden lg:block",
              )}
            >
              {/* Student Info Card */}
              <div className="flex flex-col gap-2 rounded-2xl bg-indigo-50/90 p-3.5 dark:bg-indigo-950/60">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-base font-bold text-white shadow-xs dark:bg-indigo-500">
                    {studentAvatar}
                  </div>
                  <div className="overflow-hidden">
                    <div className="truncate text-sm font-bold text-slate-950 dark:text-white">{studentName}</div>
                    <div className="truncate text-xs font-semibold text-indigo-600 dark:text-indigo-400">Teacher: Sir Asim</div>
                  </div>
                </div>

                {/* Class Color Identity Badge */}
                <div className="mt-1 pt-2 border-t border-indigo-200/60 dark:border-indigo-800/60 flex items-center justify-between text-xs">
                  <span className="font-extrabold text-slate-900 dark:text-slate-100">{colorBadgeText}</span>
                  <span className="font-mono text-[10px] font-bold bg-indigo-200/60 dark:bg-indigo-900/60 px-2 py-0.5 rounded text-indigo-900 dark:text-indigo-200">
                    {classCode}
                  </span>
                </div>
              </div>

              {/* Navigation links */}
              <nav aria-label="Student portal navigation" className="mt-5 space-y-1">
                {sidebarNavItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-2xl px-3.5 py-2.5 text-sm font-semibold transition-all duration-150",
                        isActive
                          ? "bg-indigo-600 text-white shadow-sm dark:bg-indigo-500"
                          : "text-slate-700 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white",
                      )}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}

                <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-2xl px-3.5 py-2.5 text-sm font-semibold text-rose-600 transition hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/40"
                  >
                    <LogOut className="h-4 w-4 shrink-0" />
                    <span>Log out</span>
                  </button>
                </div>
              </nav>

              {/* Quick Streak Badge */}
              <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50/70 p-3.5 text-xs text-amber-900 dark:border-amber-900/40 dark:bg-amber-950/30 dark:text-amber-200">
                <div className="flex items-center gap-1.5 font-bold">
                  <Flame className="h-4 w-4 text-amber-500 fill-amber-500" />
                  <span>14 Day Study Streak!</span>
                </div>
                <p className="mt-1 text-[11px] text-amber-800/80 dark:text-amber-300/80">
                  Keep learning daily to earn exam mastery rewards.
                </p>
              </div>
            </aside>

            {/* Main Route Content */}
            <main className="space-y-6" data-scroll-reveal>
              {children}
            </main>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}

