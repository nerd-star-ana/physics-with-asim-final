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
} from "lucide-react";
import { useLMS } from "@/context/lms-context";
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
  const { students, classes, activeStudentId, setActiveStudentId } = useLMS();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Banner */}
      <div className="sticky top-0 z-40 bg-slate-900/90 border-b border-amber-500/20 backdrop-blur-md px-4 py-3 sm:px-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500 text-slate-950 font-black text-lg shadow-lg shadow-amber-500/30">
            A
          </span>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-bold text-white tracking-wide">SIR ASIM TEACHER COMMAND CENTER</h1>
              <span className="rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-extrabold px-2 py-0.5 border border-amber-500/30">
                MASTER ADMIN
              </span>
            </div>
            <p className="text-xs text-slate-400">Total Teacher Control • Physics With Asim LMS</p>
          </div>
        </div>

        {/* Student View Simulation Switcher */}
        <div className="flex items-center gap-2 bg-slate-800/80 border border-slate-700/60 rounded-xl p-1.5 text-xs">
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
          <Link
            href="/dashboard"
            className="rounded-lg bg-cyan-500/20 border border-cyan-500/40 px-2.5 py-1 text-cyan-300 font-bold hover:bg-cyan-500/30 transition text-xs"
          >
            Open Student Portal
          </Link>
        </div>
      </div>

      <div className="flex-1 flex flex-col md:flex-row">
        {/* Left Sidebar */}
        <aside className="w-full md:w-64 bg-slate-900 border-r border-slate-800/80 p-4 shrink-0 flex flex-col justify-between">
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

            <div className="rounded-2xl bg-gradient-to-br from-amber-500/10 via-slate-800/60 to-slate-900 border border-amber-500/20 p-3.5 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
                <ShieldAlert className="h-4 w-4 shrink-0" />
                <span>Teacher Rule System</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Students cannot self-enroll or edit content. Every resource, quiz, and assignment is explicitly assigned by Sir Asim.
              </p>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-slate-800 text-center">
            <p className="text-[11px] text-slate-500">Physics With Asim v4.0 LMS</p>
          </div>
        </aside>

        {/* Main Workspace */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
