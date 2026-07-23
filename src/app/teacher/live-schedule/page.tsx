"use client";

import React, { useState } from "react";
import { Video, Plus, Calendar, Clock, Link2, Key, Users, X, CheckCircle } from "lucide-react";
import { useLMS } from "@/context/lms-context";

export default function TeacherLiveSchedulePage() {
  const { liveClasses, classes, addLiveClass } = useLMS();

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [topic, setTopic] = useState("");
  const [date, setDate] = useState("2026-07-28");
  const [time, setTime] = useState("18:00");
  const [durationMinutes, setDurationMinutes] = useState(90);
  const [assignedClassId, setAssignedClassId] = useState(classes[0]?.id || "");
  const [platform, setPlatform] = useState<"zoom" | "google_meet" | "teams">("zoom");
  const [joinLink, setJoinLink] = useState("https://zoom.us/j/123456789");
  const [password, setPassword] = useState("PHYSICS2026");

  const handleScheduleLiveClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    addLiveClass({
      topic,
      date,
      time,
      durationMinutes,
      assignedClassId,
      platform,
      joinLink,
      password,
      attendanceRequired: true,
      status: "upcoming",
    });

    setIsModalOpen(false);
    setTopic("");
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <Video className="h-6 w-6 text-amber-400" />
            Live Seminar & Webinar Schedule
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Schedule live online sessions on Zoom or Google Meet for specific batches. Students automatically see these on their dashboard calendar.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 rounded-2xl bg-amber-500 text-slate-950 px-4 py-2.5 text-xs font-black shadow-lg shadow-amber-500/20 hover:bg-amber-400 transition"
        >
          <Plus className="h-4 w-4" />
          <span>Schedule Live Class</span>
        </button>
      </div>

      {/* Webinars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {liveClasses.map((live) => {
          const cls = classes.find((c) => c.id === live.assignedClassId);

          return (
            <div key={live.id} className="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-4 shadow-xl flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 px-2.5 py-0.5 rounded-full">
                    {cls?.name || "Target Batch"}
                  </span>
                  <span className="text-xs font-mono font-bold text-amber-400 uppercase">{live.platform.replace("_", " ")}</span>
                </div>

                <h3 className="text-lg font-bold text-white">{live.topic}</h3>

                <div className="rounded-xl bg-slate-950 p-3 text-xs space-y-2 border border-slate-800">
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="flex items-center gap-1.5 text-slate-400">
                      <Calendar className="h-3.5 w-3.5 text-amber-400" /> Date & Time:
                    </span>
                    <span className="font-bold text-white">{live.date} @ {live.time} ({live.durationMinutes} mins)</span>
                  </div>

                  {live.password && (
                    <div className="flex items-center justify-between text-slate-300">
                      <span className="flex items-center gap-1.5 text-slate-400">
                        <Key className="h-3.5 w-3.5 text-cyan-400" /> Passcode:
                      </span>
                      <span className="font-mono font-bold text-cyan-300">{live.password}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                <a
                  href={live.joinLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-amber-500 text-slate-950 px-4 py-2 font-black hover:bg-amber-400 transition"
                >
                  <Video className="h-4 w-4" /> Start Meeting
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Schedule Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h2 className="text-xl font-extrabold text-white">Schedule Live Class Session</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-slate-400 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleScheduleLiveClass} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Session Topic</label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g. Live Past Paper Solving: A2 SHM & Waves"
                  className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3.5 py-2.5 text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3.5 py-2.5 text-white font-bold"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Time</label>
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3.5 py-2.5 text-white font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Assign to Batch</label>
                <select
                  value={assignedClassId}
                  onChange={(e) => setAssignedClassId(e.target.value)}
                  className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3.5 py-2.5 text-white font-bold"
                >
                  {classes.map((cls) => (
                    <option key={cls.id} value={cls.id}>
                      {cls.name} ({cls.code})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Platform</label>
                  <select
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value as any)}
                    className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3.5 py-2.5 text-white font-bold"
                  >
                    <option value="zoom">Zoom Meeting</option>
                    <option value="google_meet">Google Meet</option>
                    <option value="teams">Microsoft Teams</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Meeting Link</label>
                  <input
                    type="url"
                    value={joinLink}
                    onChange={(e) => setJoinLink(e.target.value)}
                    className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3.5 py-2.5 text-white"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-xl bg-slate-800 px-4 py-2.5 text-slate-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-amber-500 text-slate-950 px-5 py-2.5 font-extrabold hover:bg-amber-400"
                >
                  Schedule Class
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
