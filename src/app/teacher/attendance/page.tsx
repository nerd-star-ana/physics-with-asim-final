"use client";

import React, { useState } from "react";
import { CalendarCheck, Save, CheckCircle2, XCircle, Clock, AlertCircle } from "lucide-react";
import { useLMS } from "@/context/lms-context";

export default function TeacherAttendancePage() {
  const { classes, students, saveAttendance, attendanceRecords } = useLMS();

  const [selectedClassId, setSelectedClassId] = useState<string>(classes[0]?.id || "");
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split("T")[0]);

  // Attendance Map
  const [attendanceMap, setAttendanceMap] = useState<Record<string, "present" | "absent" | "late" | "excused">>({});

  const classStudents = students.filter((s) => s.classId === selectedClassId);

  const handleStatusChange = (studentId: string, status: "present" | "absent" | "late" | "excused") => {
    setAttendanceMap((prev) => ({ ...prev, [studentId]: status }));
  };

  const handleSave = () => {
    saveAttendance(selectedDate, selectedClassId, attendanceMap);
    alert("Attendance register saved successfully!");
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <CalendarCheck className="h-6 w-6 text-amber-400" />
            Class Attendance Register & Manager
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Mark daily attendance for each classroom batch. Students only see their own attendance logs.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 rounded-2xl bg-amber-500 text-slate-950 px-5 py-2.5 text-xs font-black shadow-lg shadow-amber-500/20 hover:bg-amber-400 transition"
        >
          <Save className="h-4 w-4" />
          <span>Save Attendance Register</span>
        </button>
      </div>

      {/* Control Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-900 p-4 rounded-2xl border border-slate-800 text-xs">
        <div>
          <label className="block text-slate-300 font-bold mb-1">Select Batch / Class</label>
          <select
            value={selectedClassId}
            onChange={(e) => setSelectedClassId(e.target.value)}
            className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3.5 py-2.5 text-white font-bold focus:outline-none focus:ring-1 focus:ring-amber-500"
          >
            {classes.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.code})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-slate-300 font-bold mb-1">Session Date</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3.5 py-2.5 text-white font-bold focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
        </div>
      </div>

      {/* Student List for Attendance */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-4 shadow-2xl">
        <h2 className="text-base font-extrabold text-white">
          Enrolled Students in Selected Batch ({classStudents.length})
        </h2>

        {classStudents.length === 0 ? (
          <p className="text-xs text-slate-500 italic">No students assigned to this classroom batch yet.</p>
        ) : (
          <div className="space-y-3">
            {classStudents.map((st) => {
              const currentStatus = attendanceMap[st.id] || "present";

              return (
                <div
                  key={st.id}
                  className="rounded-xl bg-slate-950 border border-slate-800 p-4 flex flex-wrap items-center justify-between gap-3 text-xs"
                >
                  <div>
                    <p className="font-extrabold text-white text-sm">{st.name}</p>
                    <p className="text-slate-400 font-mono text-[11px]">{st.email}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleStatusChange(st.id, "present")}
                      className={`px-3 py-1.5 rounded-lg font-extrabold border transition ${
                        currentStatus === "present"
                          ? "bg-emerald-500 text-slate-950 border-emerald-400"
                          : "bg-slate-900 text-slate-400 border-slate-800 hover:text-white"
                      }`}
                    >
                      Present
                    </button>

                    <button
                      type="button"
                      onClick={() => handleStatusChange(st.id, "late")}
                      className={`px-3 py-1.5 rounded-lg font-extrabold border transition ${
                        currentStatus === "late"
                          ? "bg-amber-500 text-slate-950 border-amber-400"
                          : "bg-slate-900 text-slate-400 border-slate-800 hover:text-white"
                      }`}
                    >
                      Late
                    </button>

                    <button
                      type="button"
                      onClick={() => handleStatusChange(st.id, "absent")}
                      className={`px-3 py-1.5 rounded-lg font-extrabold border transition ${
                        currentStatus === "absent"
                          ? "bg-rose-500 text-white border-rose-400"
                          : "bg-slate-900 text-slate-400 border-slate-800 hover:text-white"
                      }`}
                    >
                      Absent
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
