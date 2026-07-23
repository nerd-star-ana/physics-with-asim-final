"use client";

import React, { useState } from "react";
import {
  School,
  Plus,
  Trash2,
  Edit2,
  Copy,
  Users,
  Calendar,
  Link2,
  CheckCircle,
  X,
  Palette,
  ExternalLink,
} from "lucide-react";
import { useLMS, ClassColor, Classroom } from "@/context/lms-context";

const COLOR_OPTIONS: { key: ClassColor; label: string; bg: string; text: string; border: string }[] = [
  { key: "blue", label: "🟦 Blue Class", bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/30" },
  { key: "green", label: "🟩 Green Class", bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/30" },
  { key: "purple", label: "🟪 Purple Class", bg: "bg-purple-500/10", text: "text-purple-400", border: "border-purple-500/30" },
  { key: "orange", label: "🟧 Orange Class", bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/30" },
  { key: "red", label: "🟥 Red Class", bg: "bg-rose-500/10", text: "text-rose-400", border: "border-rose-500/30" },
];

export default function TeacherClassesPage() {
  const { classes, addClass, updateClass, deleteClass, duplicateClass, students } = useLMS();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClass, setEditingClass] = useState<Classroom | null>(null);

  // Form State
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [color, setColor] = useState<ClassColor>("blue");
  const [timetable, setTimetable] = useState("");
  const [whatsappUrl, setWhatsappUrl] = useState("");
  const [meetUrl, setMeetUrl] = useState("");
  const [zoomUrl, setZoomUrl] = useState("");
  const [startDate, setStartDate] = useState("2026-08-01");
  const [endDate, setEndDate] = useState("2026-12-31");

  const handleOpenCreateModal = () => {
    setEditingClass(null);
    setName("");
    setCode(`PHY-${Math.floor(100 + Math.random() * 900)}`);
    setColor("blue");
    setTimetable("Mon & Wed • 5:00 PM - 6:30 PM");
    setWhatsappUrl("https://chat.whatsapp.com/demo");
    setMeetUrl("https://meet.google.com/demo");
    setZoomUrl("https://zoom.us/j/1234567890");
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (cls: Classroom) => {
    setEditingClass(cls);
    setName(cls.name);
    setCode(cls.code);
    setColor(cls.color);
    setTimetable(cls.timetable);
    setWhatsappUrl(cls.whatsappUrl);
    setMeetUrl(cls.meetUrl);
    setZoomUrl(cls.zoomUrl);
    setStartDate(cls.startDate);
    setEndDate(cls.endDate);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (editingClass) {
      updateClass(editingClass.id, {
        name,
        code,
        color,
        timetable,
        whatsappUrl,
        meetUrl,
        zoomUrl,
        startDate,
        endDate,
      });
    } else {
      addClass({
        name,
        code,
        color,
        teacher: "Sir Asim",
        studentCount: 0,
        whatsappUrl,
        meetUrl,
        zoomUrl,
        timetable,
        startDate,
        endDate,
        status: "active",
      });
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <School className="h-6 w-6 text-amber-400" />
            Classroom Management System
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Create, color-code, and organize your physics batches. Every student is strictly assigned to one of these classes.
          </p>
        </div>

        <button
          onClick={handleOpenCreateModal}
          className="inline-flex items-center gap-2 rounded-2xl bg-amber-500 text-slate-950 px-4 py-2.5 text-xs font-black shadow-lg shadow-amber-500/20 hover:bg-amber-400 transition"
        >
          <Plus className="h-4 w-4" />
          <span>Create New Class</span>
        </button>
      </div>

      {/* Classrooms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((cls) => {
          const colorMeta = COLOR_OPTIONS.find((c) => c.key === cls.color) || COLOR_OPTIONS[0];
          const classStudents = students.filter((s) => s.classId === cls.id);

          return (
            <div
              key={cls.id}
              className={`rounded-2xl bg-slate-900 border ${colorMeta.border} p-6 space-y-5 shadow-2xl relative flex flex-col justify-between`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-black uppercase px-3 py-1 rounded-full border ${colorMeta.bg} ${colorMeta.text} ${colorMeta.border}`}>
                    {colorMeta.label}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-400">{cls.code}</span>
                </div>

                <div>
                  <h2 className="text-lg font-black text-white">{cls.name}</h2>
                  <p className="text-xs text-slate-400 mt-0.5">Teacher: {cls.teacher}</p>
                </div>

                <div className="rounded-xl bg-slate-950/80 p-3 space-y-2 text-xs border border-slate-800">
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="flex items-center gap-1.5 text-slate-400">
                      <Calendar className="h-3.5 w-3.5 text-amber-400" />
                      Timetable:
                    </span>
                    <span className="font-semibold text-white">{cls.timetable}</span>
                  </div>

                  <div className="flex items-center justify-between text-slate-300">
                    <span className="flex items-center gap-1.5 text-slate-400">
                      <Users className="h-3.5 w-3.5 text-emerald-400" />
                      Enrolled:
                    </span>
                    <span className="font-bold text-emerald-400">{classStudents.length} Students</span>
                  </div>
                </div>

                {/* Class Links */}
                <div className="flex flex-wrap gap-2 text-[11px] pt-1">
                  {cls.whatsappUrl && (
                    <a
                      href={cls.whatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-2.5 py-1 font-semibold hover:bg-emerald-500/20"
                    >
                      <Link2 className="h-3 w-3" /> WhatsApp Group
                    </a>
                  )}
                  {cls.zoomUrl && (
                    <a
                      href={cls.zoomUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-400 px-2.5 py-1 font-semibold hover:bg-blue-500/20"
                    >
                      <ExternalLink className="h-3 w-3" /> Zoom Link
                    </a>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-2 text-xs">
                <button
                  onClick={() => duplicateClass(cls.id)}
                  className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition"
                  title="Duplicate Class"
                >
                  <Copy className="h-4 w-4" />
                </button>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenEditModal(cls)}
                    className="inline-flex items-center gap-1 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 px-3 py-1.5 font-bold hover:bg-amber-500/20 transition"
                  >
                    <Edit2 className="h-3.5 w-3.5" /> Edit
                  </button>
                  <button
                    onClick={() => deleteClass(cls.id)}
                    className="p-2 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/30 hover:bg-rose-500/20 transition"
                    title="Delete Class"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal for Create / Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-xl rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h2 className="text-xl font-extrabold text-white">
                {editingClass ? "Edit Classroom Details" : "Create New Classroom Batch"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Classroom Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Physics A-Level Batch A"
                  className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3.5 py-2.5 text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Class Code</label>
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3.5 py-2.5 text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Class Theme Color</label>
                  <select
                    value={color}
                    onChange={(e) => setColor(e.target.value as ClassColor)}
                    className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3.5 py-2.5 text-white focus:outline-none focus:ring-1 focus:ring-amber-500 font-bold"
                  >
                    {COLOR_OPTIONS.map((c) => (
                      <option key={c.key} value={c.key}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Timetable & Schedule</label>
                <input
                  type="text"
                  value={timetable}
                  onChange={(e) => setTimetable(e.target.value)}
                  placeholder="e.g. Mon & Wed • 5:00 PM - 6:30 PM"
                  className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3.5 py-2.5 text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">WhatsApp Group Link</label>
                  <input
                    type="url"
                    value={whatsappUrl}
                    onChange={(e) => setWhatsappUrl(e.target.value)}
                    className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3.5 py-2.5 text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Zoom Meeting Link</label>
                  <input
                    type="url"
                    value={zoomUrl}
                    onChange={(e) => setZoomUrl(e.target.value)}
                    className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3.5 py-2.5 text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-xl bg-slate-800 px-4 py-2.5 text-slate-300 font-bold hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-amber-500 text-slate-950 px-5 py-2.5 font-extrabold hover:bg-amber-400 shadow-lg shadow-amber-500/20"
                >
                  {editingClass ? "Save Changes" : "Create Classroom"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
