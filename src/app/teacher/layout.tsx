"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  School,
  FileText,
  HelpCircle,
  FolderDown,
  Video,
  Megaphone,
  GraduationCap,
  CalendarCheck,
  Eye,
  ShieldAlert,
  LogOut,
} from "lucide-react";
import { useLMS } from "@/context/lms-context";
import { useAuth } from "@/context/auth-context";
import { AuthGuard } from "@/components/auth/auth-guard";
import { cn } from "@/lib/utils";

const TEACHER_NAV = [
  { href: "/teacher", label: "Command Center", icon: LayoutDashboard },
  { href: "/teacher/classes", label: "Classroom System", icon: School },
  { href: "/teacher/students", label: "Student Roster", icon: Users },
  { href: "/teacher/assignments", label: "Assignments & Grading", icon: FileText },
  { href: "/teacher/quizzes", label: "Quizzes & Tests", icon: HelpCircle },
  { href: "/teacher/resources", label: "Past Papers & Notes", icon: FolderDown },
  { href: "/teacher/live-schedule", label: "Live Classes", icon: Video },
  { href: "/teacher/announcements", label: "Announcement Center", icon: Megaphone },
  { href: "/teacher/gradebook", label: "Master Gradebook", icon: GraduationCap },
  { href: "/teacher/attendance", label: "Attendance Manager", icon: CalendarCheck },
];

export default function TeacherLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { logout } = useAuth();
  const { students, classes, activeStudentId, setActiveStudentId } = useLMS();

  const handleLogout = () => {
    logout();
    window.location.assign("/login");
  };

  return (
    <AuthGuard allowedRole="teacher">
      <div className="teacher-workspace min-h-screen bg-slate-50 text-slate-950 flex flex-col dark:bg-slate-950 dark:text-slate-100">
        {/* Top Banner */}
        <div className="sticky top-0 z-40 bg-white/95 border-b border-slate-200 px-4 py-3 sm:px-6 flex flex-wrap items-center justify-between gap-4 dark:bg-slate-950/95 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-amber-400 text-slate-950 font-black text-lg">
              A
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm font-bold text-slate-950 tracking-wide dark:text-white">SIR ASIM TEACHER COMMAND CENTER</h1>
                <span className="rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-extrabold px-2 py-0.5 border border-amber-500/30">
                  MASTER ADMIN
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">Total Teacher Control • Physics With Asim LMS</p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {/* Student View Simulation Switcher */}
              <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-md p-1.5 text-xs dark:bg-slate-900 dark:border-slate-700">
              <Eye className="h-4 w-4 text-cyan-400 ml-1" />
              <span className="text-slate-300 font-medium hidden sm:inline">Preview Student View:</span>
              <select
                value={activeStudentId}
                onChange={(e) => setActiveStudentId(e.target.value)}
                className="bg-slate-900 text-slate-200 text-xs font-semibold rounded-lg px-2 py-1 border border-slate-700 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              >
                {students.map((st) => {
                  const cls = classes.find((c) => c.id === st.classId);
                  return (
                    <option key={st.id} value={st.id}>
                      {st.name} ({cls?.code || "Unassigned"} - {cls?.name || "No Class"})
                    </option>
                  );
                })}
              </select>
            </div>

            {/* Logout Button */}
            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-1.5 rounded-xl bg-rose-500/10 border border-rose-500/30 px-3 py-1.5 text-xs font-bold text-rose-400 hover:bg-rose-500/20 transition"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Log out</span>
            </button>
          </div>
        </div>

        <div className="flex-1 flex flex-col md:flex-row">
          {/* Left Sidebar */}
              <aside className="w-full md:w-64 bg-white border-r border-slate-200 p-4 shrink-0 flex flex-col justify-between dark:bg-slate-900 dark:border-slate-800">
            <div className="space-y-6">
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 px-3 mb-2">
                  Teacher Management
                </p>
                <nav className="space-y-1">
                  {TEACHER_NAV.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-bold transition",
                          isActive
                            ? "bg-amber-500 text-slate-950 font-black shadow-md shadow-amber-500/20"
                            : "text-slate-300 hover:bg-slate-800 hover:text-white"
                        )}
                      >
                        <Icon className={cn("h-4 w-4", isActive ? "text-slate-950" : "text-amber-400")} />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </nav>
              </div>

              <div className="rounded-md border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-3.5 space-y-2">
                <div className="flex items-center gap-2 text-[var(--color-secondary)] font-bold text-xs">
                  <ShieldAlert className="h-4 w-4 shrink-0" />
                  <span>Teacher Rule System</span>
                </div>
                <p className="text-[11px] text-[var(--color-text)] leading-relaxed">
                  Students cannot self-enroll or edit content. Every resource, quiz, and assignment is explicitly assigned by Sir Asim.
                </p>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-800 flex flex-col items-center gap-3">
              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-800 hover:bg-rose-950/40 hover:text-rose-400 py-2 text-xs font-bold text-slate-300 transition border border-slate-700"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span>Log out (Sir Asim)</span>
              </button>
              <p className="text-[11px] text-slate-500">Physics With Asim v4.0 LMS</p>
            </div>
          </aside>

          {/* Main Workspace */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden max-w-7xl mx-auto w-full" data-scroll-reveal>
            {children}
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}
