"use client";

import React, { useState } from "react";
import { Megaphone, Plus, Pin, AlertCircle, Calendar, Users, X } from "lucide-react";
import { useLMS } from "@/context/lms-context";

export default function TeacherAnnouncementsPage() {
  const { announcements, classes, addAnnouncement } = useLMS();

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [priority, setPriority] = useState<"high" | "normal" | "low">("normal");
  const [targetScope, setTargetScope] = useState<"everyone" | "class">("everyone");
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
  const [pinned, setPinned] = useState(false);

  const handleCreateAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    addAnnouncement({
      title,
      content,
      priority,
      targetScope,
      targetClassIds: selectedClasses,
      pinned,
    });

    setIsModalOpen(false);
    setTitle("");
    setContent("");
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <Megaphone className="h-6 w-6 text-amber-400" />
            Announcement Center
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Broadcast messages, mock exam updates, or schedule changes. Broadcast to all students or specific batches.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 rounded-2xl bg-amber-500 text-slate-950 px-4 py-2.5 text-xs font-black shadow-lg shadow-amber-500/20 hover:bg-amber-400 transition"
        >
          <Plus className="h-4 w-4" />
          <span>New Announcement</span>
        </button>
      </div>

      {/* List */}
      <div className="space-y-4">
        {announcements.map((anc) => {
          const targetClassNames = classes
            .filter((c) => anc.targetClassIds.includes(c.id))
            .map((c) => c.name);

          return (
            <div key={anc.id} className="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-3 shadow-xl relative">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                <div className="flex items-center gap-2">
                  {anc.priority === "high" && (
                    <span className="bg-rose-500/10 text-rose-400 border border-rose-500/30 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase">
                      High Priority
                    </span>
                  )}
                  <span className="text-[10px] font-bold uppercase text-slate-400">
                    Target: {anc.targetScope === "everyone" ? "All School" : targetClassNames.join(", ")}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-400">
                  {anc.pinned && <Pin className="h-4 w-4 text-amber-400 fill-amber-400" />}
                  <span>{anc.createdAt}</span>
                </div>
              </div>

              <h2 className="text-base font-extrabold text-white">{anc.title}</h2>
              <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line">{anc.content}</p>

              <div className="pt-2 text-[11px] text-slate-500 font-bold">
                Posted by: {anc.author}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h2 className="text-xl font-extrabold text-white">Broadcast Announcement</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-slate-400 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateAnnouncement} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. 📢 Mock Examination Date Sheet Released"
                  className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3.5 py-2.5 text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Message Content</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={4}
                  className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3.5 py-2.5 text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Priority</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as any)}
                    className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3.5 py-2.5 text-white font-bold"
                  >
                    <option value="normal">Normal Priority</option>
                    <option value="high">High Priority</option>
                    <option value="low">Low Priority</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Target Scope</label>
                  <select
                    value={targetScope}
                    onChange={(e) => setTargetScope(e.target.value as any)}
                    className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3.5 py-2.5 text-white font-bold"
                  >
                    <option value="everyone">Everyone (All Batches)</option>
                    <option value="class">Specific Class Batches</option>
                  </select>
                </div>
              </div>

              {targetScope === "class" && (
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Select Batches</label>
                  <div className="space-y-2 max-h-32 overflow-y-auto p-2 bg-slate-950 border border-slate-800 rounded-xl">
                    {classes.map((cls) => (
                      <label key={cls.id} className="flex items-center gap-2 text-slate-300 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedClasses.includes(cls.id)}
                          onChange={(e) => {
                            if (e.target.checked) setSelectedClasses((prev) => [...prev, cls.id]);
                            else setSelectedClasses((prev) => prev.filter((id) => id !== cls.id));
                          }}
                          className="rounded border-slate-800 text-amber-500"
                        />
                        <span>{cls.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="pinAnc"
                  checked={pinned}
                  onChange={(e) => setPinned(e.target.checked)}
                  className="rounded border-slate-800 text-amber-500"
                />
                <label htmlFor="pinAnc" className="text-slate-300 font-bold cursor-pointer">
                  Pin to top of Student Dashboard
                </label>
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
                  Broadcast Message
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
