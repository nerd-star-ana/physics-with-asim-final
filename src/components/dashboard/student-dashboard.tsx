"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Bell,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  CircleCheckBig,
  Clock3,
  Download,
  FileText,
  Flame,
  GraduationCap,
  Play,
  Search,
  Sparkles,
  Trophy,
  Video,
  MessageSquare,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/auth-context";
import { useLMS } from "@/context/lms-context";
import { cn } from "@/lib/utils";

const analyticsStats = [
  { label: "Enrolled Courses", value: "4 Active", detail: "Cambridge A-Level & IGCSE", icon: BookOpen, color: "text-indigo-600 dark:text-indigo-400" },
  { label: "Hours Studied", value: "128 hrs", detail: "+12 hrs this week", icon: Clock3, color: "text-cyan-600 dark:text-cyan-400" },
  { label: "Assignments Done", value: "31 / 34", detail: "91% Completion Rate", icon: CircleCheckBig, color: "text-emerald-600 dark:text-emerald-400" },
  { label: "Average Test Score", value: "89.4%", detail: "Top 5% in Academy", icon: Trophy, color: "text-amber-600 dark:text-amber-400" },
];

const enrolledCourses = [
  {
    title: "A2 Physics: Electromagnetic Induction & Waves",
    code: "PHYS-9702-A2",
    progress: 78,
    nextLesson: "Faraday's Law & Lenz's Law Drills",
    dueDate: "Tomorrow at 5:00 PM",
    badge: "In Progress",
  },
  {
    title: "AS Physics: Quantum & Wave-Particle Duality",
    code: "PHYS-9702-AS",
    progress: 92,
    nextLesson: "Photoelectric Effect Past Paper Seminar",
    dueDate: "Friday at 4:00 PM",
    badge: "Exam Ready",
  },
  {
    title: "Mechanics & Gravitational Fields Masterclass",
    code: "PHYS-MECH-EX",
    progress: 64,
    nextLesson: "Circular Motion & Kepler's Laws",
    dueDate: "Next Monday",
    badge: "In Progress",
  },
];

const recentActivity = [
  {
    title: "Submitted Assignment: Mechanics Worksheet 04",
    time: "2 hours ago",
    status: "Graded (94%)",
    icon: CheckCircle2,
    color: "text-emerald-600 dark:text-emerald-400",
  },
  {
    title: "Attended Live Seminar: Electric Fields & Capacitance",
    time: "Yesterday at 6:00 PM",
    status: "Attended",
    icon: Video,
    color: "text-indigo-600 dark:text-indigo-400",
  },
  {
    title: "Downloaded Resource: 2024 Past Paper Solved Revision Pack",
    time: "2 days ago",
    status: "Downloaded",
    icon: Download,
    color: "text-cyan-600 dark:text-cyan-400",
  },
];

const upcomingReminders = [
  {
    title: "Electromagnetic Induction Homework",
    due: "Tomorrow, 5:00 PM",
    type: "Assignment",
    status: "Pending",
  },
  {
    title: "Live Problem Solving Seminar: Quantum Physics",
    due: "Thursday, 6:00 PM",
    type: "Live Class",
    status: "Upcoming",
  },
  {
    title: "Chapter Quiz 03: Thermal State Equations",
    due: "Friday, 11:59 PM",
    type: "Quiz",
    status: "Ready",
  },
];

const announcements = [
  {
    title: "2025 May/June Solved Past Paper Revision Series Available!",
    date: "July 22, 2026",
    content: "All variant solution packs for 9702 Paper 1 and Paper 2 are now uploaded in the Past Papers library.",
  },
  {
    title: "Special Weekend Masterclass: Gravitational Fields",
    date: "July 20, 2026",
    content: "Join Sir Asim this Saturday at 4:00 PM PKT for a 2-hour intensive problem solving webinar.",
  },
];

const topicProgress = [
  { topic: "Mechanics & Kinematics", score: 92 },
  { topic: "Electricity & Magnetism", score: 85 },
  { topic: "Waves & Optics", score: 88 },
  { topic: "Nuclear & Particle Physics", score: 94 },
  { topic: "Thermal & Ideal Gases", score: 81 },
];

export function StudentDashboard() {
  const { user } = useAuth();
  const {
    activeStudent,
    activeStudentClass,
    getStudentAssignedAssignments,
    getStudentAssignedQuizzes,
    getStudentAssignedLiveClasses,
    getStudentAssignedAnnouncements,
  } = useLMS();

  const [searchQuery, setSearchQuery] = useState("");

  const studentName = activeStudent?.name || user?.name || "Ahmed Khan";
  const cls = activeStudentClass;

  const assignedAssignments = getStudentAssignedAssignments();
  const assignedQuizzes = getStudentAssignedQuizzes();
  const assignedLiveClasses = getStudentAssignedLiveClasses();
  const assignedAnnouncements = getStudentAssignedAnnouncements();

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <section data-scroll-reveal className="relative overflow-hidden rounded-lg border border-slate-200 bg-slate-50 p-6 text-slate-950 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-white sm:p-8">
        <div className="relative flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
          <div className="max-w-xl space-y-3">
            <div className="inline-flex items-center gap-2 rounded-md border border-amber-300 bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-900 dark:border-amber-700 dark:bg-amber-950/40 dark:text-amber-200">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Assigned Class: {cls?.name || "Physics A-Level Batch A"} ({cls?.code || "PHY-A1"})</span>
            </div>
            <h1 className="text-3xl font-semibold text-slate-950 dark:text-white sm:text-4xl">
              Welcome back, {studentName}!
            </h1>
            <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
              Instructor: <span className="font-semibold text-slate-950 dark:text-amber-300">Sir Asim</span> • Timetable: <span className="font-semibold text-slate-700 dark:text-slate-200">{cls?.timetable || "Mon & Wed • 5:00 PM"}</span>
            </p>
            <div className="pt-2 flex flex-wrap gap-2 text-xs">
              {cls?.zoomUrl && (
                <a
                  href={cls.zoomUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-md bg-slate-950 px-3 py-1.5 font-semibold text-white transition-colors hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100"
                >
                  <Video className="h-3.5 w-3.5" /> Join Live Class
                </a>
              )}
              {cls?.whatsappUrl && (
                <a
                  href={cls.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-md border border-slate-300 bg-white px-3 py-1.5 font-semibold text-slate-800 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900"
                >
                  <MessageSquare className="h-3.5 w-3.5" /> WhatsApp Group
                </a>
              )}
            </div>
          </div>

          <div className="flex items-center gap-5 rounded-md border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-950">
            <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-[conic-gradient(#f5c400_0_78%,#e6e6e2_78%_100%)] p-[8px]">
              <div className="flex h-full w-full items-center justify-center rounded-full bg-white text-center text-sm font-bold text-slate-950 dark:bg-slate-900 dark:text-white">
                78%
              </div>
            </div>
            <div className="space-y-1.5 text-xs font-medium text-slate-700 dark:text-slate-300">
              <div className="flex items-center gap-2 font-semibold text-slate-950 dark:text-white"><Flame className="h-4 w-4 text-amber-500" /> 14 Day Study Streak</div>
              <div className="flex items-center gap-2"><Clock3 className="h-4 w-4 text-slate-500" /> 128 Study Hours</div>
              <div className="flex items-center gap-2"><Trophy className="h-4 w-4 text-amber-600" /> 1,480 XP Points</div>
            </div>
          </div>
        </div>
      </section>

      {/* Analytics Stats */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {analyticsStats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2, delay: idx * 0.05 }}>
              <Card className="h-full border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-semibold text-slate-700 dark:text-slate-300">{stat.label}</CardTitle>
                  <Icon className={cn("h-5 w-5", stat.color)} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-950 dark:text-white">{stat.value}</div>
                  <p className="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">{stat.detail}</p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </section>

      {/* Main Grid: Enrolled Courses & Reminders */}
      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        {/* Enrolled Courses Summary */}
        <Card className="p-5 sm:p-6 border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-indigo-600 dark:text-indigo-400">My Curriculum</p>
              <h2 className="mt-1 text-2xl font-bold text-slate-950 dark:text-white">Active Courses</h2>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Filter courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-9 rounded-full border border-slate-200 bg-slate-50 pl-9 pr-4 text-xs font-medium text-slate-900 focus:border-indigo-500 focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
                />
              </div>
              <Link href="/dashboard/courses">
                <Button variant="outline" size="sm" className="h-9 text-xs">View All</Button>
              </Link>
            </div>
          </div>

          <div className="mt-5 space-y-4">
            {enrolledCourses
              .filter((c) => c.title.toLowerCase().includes(searchQuery.toLowerCase()))
              .map((course) => (
                <div
                  key={course.code}
                  className="rounded-[20px] border border-slate-200 bg-slate-50/70 p-4 transition hover:border-indigo-300 dark:border-slate-800 dark:bg-slate-900/60"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">{course.code}</span>
                      <h3 className="text-base font-bold text-slate-950 dark:text-white">{course.title}</h3>
                    </div>
                    <span
                      className={cn(
                        "rounded-full px-2.5 py-1 text-xs font-bold",
                        course.badge === "Exam Ready"
                          ? "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                          : "bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300",
                      )}
                    >
                      {course.badge}
                    </span>
                  </div>

                  <div className="mt-3 space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                      <span>Syllabus Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                      <div
                        className="h-full rounded-full bg-indigo-600 dark:bg-indigo-500 transition-all duration-500"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-slate-200/60 pt-3 dark:border-slate-800/80 text-xs font-medium text-slate-600 dark:text-slate-300">
                    <span>Next: {course.nextLesson}</span>
                    <Link href="/dashboard/courses">
                      <Button size="sm" variant="secondary" className="h-8 rounded-full px-3 text-xs font-semibold">
                        Continue <ArrowRight className="h-3.5 w-3.5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </Card>

        {/* Reminders & Topic Mastery */}
        <div className="space-y-6">
          {/* Upcoming Reminders Card */}
          <Card className="p-5 sm:p-6 border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-indigo-600 dark:text-indigo-400">Deadlines</p>
                <h2 className="mt-1 text-2xl font-bold text-slate-950 dark:text-white">Upcoming Tasks</h2>
              </div>
              <Bell className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            </div>

            <div className="mt-4 space-y-3">
              {upcomingReminders.map((rem) => (
                <div key={rem.title} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-900/50 text-xs">
                  <div>
                    <div className="font-bold text-slate-950 dark:text-white">{rem.title}</div>
                    <div className="mt-0.5 text-slate-500 dark:text-slate-400">{rem.due}</div>
                  </div>
                  <span className="rounded-full bg-indigo-100 px-2.5 py-1 font-bold text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">
                    {rem.type}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Topic Mastery */}
          <Card className="p-5 sm:p-6 border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-indigo-600 dark:text-indigo-400">Analytics</p>
              <h2 className="mt-1 text-2xl font-bold text-slate-950 dark:text-white">Topic Mastery</h2>
            </div>

            <div className="mt-4 space-y-3">
              {topicProgress.slice(0, 3).map((item) => (
                <div key={item.topic} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-900 dark:text-slate-100">
                    <span>{item.topic}</span>
                    <span className="text-indigo-600 dark:text-indigo-400">{item.score}%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-900">
                    <div
                      className="h-full rounded-full bg-indigo-600 dark:bg-indigo-500"
                      style={{ width: `${item.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-2xl border border-indigo-100 bg-indigo-50/70 p-3.5 dark:border-indigo-900/50 dark:bg-indigo-950/30">
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-900 dark:text-indigo-200">
                <GraduationCap className="h-4 w-4" /> Instructor Note
              </div>
              <p className="mt-1.5 text-xs leading-5 text-indigo-950 dark:text-indigo-300">
                &quot;Ahmed demonstrated excellent mathematical precision in electromagnetic induction problem sets. Focus next on thermal physics ideal gas state equations.&quot;
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* Announcements & Activity Feed */}
      <section className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        {/* Latest Announcements */}
        <Card className="p-5 sm:p-6 border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-indigo-600 dark:text-indigo-400">Notice Board</p>
            <h2 className="mt-1 text-2xl font-bold text-slate-950 dark:text-white">Latest Announcements</h2>
          </div>

          <div className="mt-4 space-y-3">
            {announcements.map((ann) => (
              <div key={ann.title} className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-900/50">
                <div className="flex items-center justify-between text-xs font-bold text-indigo-600 dark:text-indigo-400">
                  <span>Academy Bulletin</span>
                  <span className="text-slate-500 dark:text-slate-400 font-normal">{ann.date}</span>
                </div>
                <h3 className="mt-1 text-sm font-bold text-slate-950 dark:text-white">{ann.title}</h3>
                <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-300">{ann.content}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Activity Log */}
        <Card className="p-5 sm:p-6 border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-indigo-600 dark:text-indigo-400">Activity</p>
            <h2 className="mt-1 text-2xl font-bold text-slate-950 dark:text-white">Recent Log</h2>
          </div>

          <div className="mt-4 space-y-3">
            {recentActivity.map((act) => {
              const Icon = act.icon;
              return (
                <div key={act.title} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50/70 p-3.5 dark:border-slate-800 dark:bg-slate-900/50">
                  <div className="mt-0.5 rounded-full bg-white p-2 shadow-xs dark:bg-slate-950">
                    <Icon className={cn("h-4 w-4", act.color)} />
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <h3 className="truncate text-sm font-bold text-slate-950 dark:text-white">{act.title}</h3>
                    <p className="mt-0.5 text-xs font-medium text-slate-500 dark:text-slate-400">{act.time}</p>
                  </div>
                  <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">{act.status}</span>
                </div>
              );
            })}
          </div>

          {/* Shortcuts Grid */}
          <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800">
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-3">Quick Navigation Shortcuts</p>
            <div className="grid gap-2 sm:grid-cols-2">
              <Link href="/dashboard/assignments" className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs font-bold text-slate-900 transition hover:border-indigo-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100">
                <span className="flex items-center gap-2"><CircleCheckBig className="h-4 w-4 text-emerald-500" /> Submit Homework</span>
                <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
              </Link>
              <Link href="/dashboard/quizzes" className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs font-bold text-slate-900 transition hover:border-indigo-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100">
                <span className="flex items-center gap-2"><Trophy className="h-4 w-4 text-amber-500" /> Take Practice Quiz</span>
                <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
              </Link>
              <Link href="/dashboard/past-papers" className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs font-bold text-slate-900 transition hover:border-indigo-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100">
                <span className="flex items-center gap-2"><Download className="h-4 w-4 text-cyan-500" /> Past Papers</span>
                <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
              </Link>
              <Link href="/dashboard/live-schedule" className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs font-bold text-slate-900 transition hover:border-indigo-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100">
                <span className="flex items-center gap-2"><CalendarDays className="h-4 w-4 text-indigo-500" /> Live Schedule</span>
                <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
              </Link>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
