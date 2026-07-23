"use client";

import { useState } from "react";
import {
  Bell,
  BellOff,
  CalendarDays,
  Clock,
  ExternalLink,
  Users,
  Video,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLMS } from "@/context/lms-context";
import { cn } from "@/lib/utils";

export default function LiveSchedulePage() {
  const { getStudentAssignedLiveClasses } = useLMS();
  const assignedLiveClasses = getStudentAssignedLiveClasses();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950 shadow-xs">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-100 px-3 py-1 text-xs font-bold text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">
            <CalendarDays className="h-3.5 w-3.5" /> Interactive Seminars
          </div>
          <h1 className="mt-2 text-2xl font-bold text-slate-950 dark:text-white sm:text-3xl">
            Live Class Schedule
          </h1>
          <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
            Join Sir Asim for live webinars, instant Q&A sessions, and problem solving workshops.
          </p>
        </div>
      </div>

      {/* Live Classes Grid */}
      <div className="grid gap-6">
        {assignedLiveClasses.map((cls) => (
          <Card
            key={cls.id}
            className={cn(
              "border-slate-200 bg-white p-6 transition dark:border-slate-800 dark:bg-slate-950 shadow-xs",
              cls.status === "live" && "border-2 border-indigo-500 ring-2 ring-indigo-500/20",
            )}
          >
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="space-y-2 max-w-2xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={cn(
                      "rounded-full px-3 py-1 text-xs font-bold uppercase",
                      cls.status === "live"
                        ? "bg-rose-500 text-white animate-pulse"
                        : "bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300",
                    )}
                  >
                    {cls.status === "live" ? "🔴 Live Classroom Now" : cls.status}
                  </span>
                  <span className="text-xs font-bold text-amber-500">
                    Instructor: Sir Asim
                  </span>
                </div>

                <h2 className="text-lg font-bold text-slate-950 dark:text-white">{cls.topic}</h2>

                <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-600 dark:text-slate-300">
                  <span className="flex items-center gap-1">
                    <CalendarDays className="h-4 w-4 text-indigo-500" /> Date: {cls.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-amber-500" /> {cls.time} ({cls.durationMinutes} Mins)
                  </span>
                  {cls.password && (
                    <span className="text-cyan-500 font-mono font-bold">Passcode: {cls.password}</span>
                  )}
                </div>
              </div>

              {/* Join Controls */}
              <div className="flex items-center gap-3">
                <a href={cls.joinLink} target="_blank" rel="noopener noreferrer">
                  <Button
                    className={cn(
                      "font-bold text-xs gap-2",
                      cls.status === "live"
                        ? "bg-rose-600 text-white hover:bg-rose-700"
                        : "bg-indigo-600 text-white hover:bg-indigo-700",
                    )}
                  >
                    <Video className="h-4 w-4" />
                    <span>Join Class on {cls.platform.replace("_", " ")}</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Button>
                </a>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
