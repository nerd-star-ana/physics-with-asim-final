"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  School,
  Users,
  FileCheck,
  GraduationCap,
  Plus,
  ArrowRight,
  Sparkles,
  Clock,
  CheckCircle2,
  Calendar,
  AlertCircle,
  Video,
} from "lucide-react";
import { useLMS, ClassColor } from "@/context/lms-context";

const COLOR_MAP: Record<ClassColor, { bg: string; text: string; border: string; badge: string }> = {
  blue: { bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/30", badge: "🟦 Blue Class" },
  green: { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/30", badge: "🟩 Green Class" },
  purple: { bg: "bg-purple-500/10", text: "text-purple-400", border: "border-purple-500/30", badge: "🟪 Purple Class" },
  orange: { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/30", badge: "🟧 Orange Class" },
  red: { bg: "bg-rose-500/10", text: "text-rose-400", border: "border-rose-500/30", badge: "🟥 Red Class" },
};

export default function TeacherCommandCenter() {
  const { classes, students, assignments, quizzes, liveClasses, announcements } = useLMS();

  // Metrics
  const totalClasses = classes.length;
  const totalStudents = students.length;

  const pendingGradingSubmissions = assignments.flatMap((a) =>
    a.submissions.filter((s) => s.status === "pending")
  );

  const totalAssignments = assignments.length;
  const totalQuizzes = quizzes.length;

  return (
    <div className="space-y-8">
      {/* Top Welcome Banner */}
      <div data-scroll-reveal className="relative overflow-hidden rounded-lg border border-slate-200 bg-slate-50 p-6 text-slate-950 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
        <div className="relative z-10 space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-md border border-amber-300 bg-amber-50 px-3 py-1 text-xs font-semibold text-slate-950 dark:border-amber-700 dark:bg-amber-950/40 dark:text-amber-200">
            <Sparkles className="h-4 w-4" />
            <span>TEACHER CONTROL CENTER</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-semibold text-slate-950 dark:text-white">
            Welcome back, Sir Asim!
          </h1>
          <p className="text-xs sm:text-sm font-medium text-slate-700 leading-relaxed dark:text-slate-300">
            You are managing <span className="font-black underline">{totalClasses} Active Classes</span> and <span className="font-black underline">{totalStudents} Enrolled Students</span>. Everything in this LMS is strictly teacher-driven — students only see what you assign to their class color.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link
              href="/teacher/classes"
              className="inline-flex items-center gap-2 rounded-md bg-slate-950 text-white px-4 py-2.5 text-xs font-semibold hover:bg-slate-800 transition-colors dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100"
            >
              <Plus className="h-4 w-4" />
              <span>Create New Class</span>
            </Link>
            <Link
              href="/teacher/assignments"
              className="inline-flex items-center gap-2 rounded-md bg-white text-slate-950 px-4 py-2.5 text-xs font-semibold border border-slate-300 hover:bg-slate-100 transition-colors dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:hover:bg-slate-900"
            >
              <FileCheck className="h-4 w-4" />
              <span>Assign Homework ({assignments.length})</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-lg bg-white border border-slate-200 p-5 space-y-2 dark:bg-slate-900 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">Total Classes</span>
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
              <School className="h-5 w-5" />
            </div>
          </div>
          <p className="text-3xl font-semibold text-slate-950 dark:text-white">{totalClasses}</p>
          <p className="text-xs text-slate-600 dark:text-slate-400">Batches with color identities</p>
        </div>

        <div className="rounded-lg bg-white border border-slate-200 p-5 space-y-2 dark:bg-slate-900 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">Total Students</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <Users className="h-5 w-5" />
            </div>
          </div>
          <p className="text-3xl font-semibold text-slate-950 dark:text-white">{totalStudents}</p>
          <p className="text-xs text-slate-600 dark:text-slate-400">Enrolled & assigned by teacher</p>
        </div>

        <div className="rounded-lg bg-white border border-slate-200 p-5 space-y-2 dark:bg-slate-900 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">Pending Grading</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
              <Clock className="h-5 w-5" />
            </div>
          </div>
          <p className="text-3xl font-black text-amber-400">{pendingGradingSubmissions.length}</p>
          <p className="text-xs text-slate-600 dark:text-slate-400">Submissions awaiting feedback</p>
        </div>

        <div className="rounded-lg bg-white border border-slate-200 p-5 space-y-2 dark:bg-slate-900 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">Active Quizzes</span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
              <GraduationCap className="h-5 w-5" />
            </div>
          </div>
          <p className="text-3xl font-semibold text-slate-950 dark:text-white">{totalQuizzes}</p>
          <p className="text-xs text-slate-600 dark:text-slate-400">Checkpoint tests created</p>
        </div>
      </div>

      {/* Classroom Identity Hub */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-950 dark:text-white">Classroom Management Hub</h2>
            <p className="text-xs text-slate-400">Each batch has its own distinct color identity, Zoom links, and timetable.</p>
          </div>
          <Link href="/teacher/classes" className="text-xs font-bold text-amber-400 hover:underline flex items-center gap-1">
            Manage All Classes <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {classes.map((cls) => {
            const theme = COLOR_MAP[cls.color] || COLOR_MAP.blue;
            const classStudentCount = students.filter((s) => s.classId === cls.id).length;

            return (
              <div
                key={cls.id}
                className={`rounded-2xl bg-slate-900 border ${theme.border} p-5 flex flex-col justify-between space-y-4 shadow-xl relative overflow-hidden`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className={`text-[11px] font-black uppercase px-2.5 py-1 rounded-full border ${theme.bg} ${theme.text} ${theme.border}`}>
                      {theme.badge}
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-400">{cls.code}</span>
                  </div>
                  <h3 className="text-base font-bold text-white">{cls.name}</h3>
                  <p className="text-xs text-slate-400 flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-amber-400" />
                    <span>{cls.timetable}</span>
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-300">
                  <span className="font-semibold text-slate-400">{classStudentCount} Enrolled Students</span>
                  <Link
                    href="/teacher/classes"
                    className="font-bold text-amber-400 hover:text-amber-300 transition"
                  >
                    Edit Class &rarr;
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Action Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pending Submissions Queue */}
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-amber-400" />
              <h3 className="text-base font-bold text-white">Pending Submissions Queue</h3>
            </div>
            <Link href="/teacher/assignments" className="text-xs font-bold text-amber-400 hover:underline">
              View All
            </Link>
          </div>

          {pendingGradingSubmissions.length === 0 ? (
            <div className="p-6 text-center rounded-xl bg-slate-950 border border-slate-800/80 text-slate-400 text-xs">
              <CheckCircle2 className="h-8 w-8 text-emerald-400 mx-auto mb-2" />
              <p className="font-semibold text-white">All caught up!</p>
              <p>No ungraded assignment submissions pending right now.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {pendingGradingSubmissions.map((sub) => (
                <div
                  key={sub.id}
                  className="rounded-xl bg-slate-950 border border-slate-800 p-3.5 flex items-center justify-between gap-3"
                >
                  <div>
                    <p className="text-xs font-bold text-white">{sub.studentName}</p>
                    <p className="text-[11px] text-slate-400">Submitted at {sub.submittedAt}</p>
                  </div>
                  <Link
                    href="/teacher/assignments"
                    className="rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3 py-1.5 text-xs font-bold hover:bg-amber-500/30 transition"
                  >
                    Grade ({sub.totalMarks} Marks)
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Live Classes & Broadcast Center */}
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Video className="h-5 w-5 text-cyan-400" />
              <h3 className="text-base font-bold text-white">Upcoming Live Classes</h3>
            </div>
            <Link href="/teacher/live-schedule" className="text-xs font-bold text-cyan-400 hover:underline">
              Schedule Class
            </Link>
          </div>

          {liveClasses.length === 0 ? (
            <div className="p-6 text-center rounded-xl bg-slate-950 border border-slate-800/80 text-slate-400 text-xs">
              <p>No live webinars scheduled.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {liveClasses.map((live) => {
                const cls = classes.find((c) => c.id === live.assignedClassId);
                return (
                  <div key={live.id} className="rounded-xl bg-slate-950 border border-slate-800 p-3.5 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded">
                        {cls?.name || "Target Class"}
                      </span>
                      <span className="text-xs text-slate-400">{live.date} @ {live.time}</span>
                    </div>
                    <p className="text-xs font-bold text-white">{live.topic}</p>
                    <a
                      href={live.joinLink}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-block text-[11px] text-amber-400 hover:underline font-mono"
                    >
                      {live.joinLink}
                    </a>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
