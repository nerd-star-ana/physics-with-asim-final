"use client";

import React, { useState } from "react";
import { GraduationCap, Download, Printer, Filter, TrendingUp, Award, CheckCircle2 } from "lucide-react";
import { useLMS } from "@/context/lms-context";

export default function TeacherGradebookPage() {
  const { students, classes, assignments, quizzes } = useLMS();

  const [selectedClassId, setSelectedClassId] = useState<string>("all");

  const filteredStudents = students.filter(
    (s) => selectedClassId === "all" || s.classId === selectedClassId
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-amber-400" />
            Master Gradebook & Class Analytics
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Automated grade aggregation from homework submissions, checkpoint quizzes, and mock exams.
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 rounded-2xl bg-amber-500 text-slate-950 px-4 py-2.5 text-xs font-black shadow-lg shadow-amber-500/20 hover:bg-amber-400 transition"
        >
          <Printer className="h-4 w-4" />
          <span>Export Gradebook (PDF)</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center justify-between gap-4 bg-slate-900 p-4 rounded-2xl border border-slate-800 text-xs">
        <div className="flex items-center gap-3">
          <Filter className="h-4 w-4 text-slate-400" />
          <span className="font-bold text-slate-300">Filter Batch:</span>
          <select
            value={selectedClassId}
            onChange={(e) => setSelectedClassId(e.target.value)}
            className="rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 text-white font-bold focus:outline-none focus:ring-1 focus:ring-amber-500"
          >
            <option value="all">All Batches ({students.length} Students)</option>
            {classes.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.code})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Grade Table */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider font-extrabold text-[11px] border-b border-slate-800">
              <tr>
                <th className="px-5 py-4">Student</th>
                <th className="px-5 py-4">Batch Class</th>
                <th className="px-5 py-4">Homework Avg</th>
                <th className="px-5 py-4">Quiz Checkpoint Avg</th>
                <th className="px-5 py-4">Attendance Rate</th>
                <th className="px-5 py-4">Overall Score</th>
                <th className="px-5 py-4">Cambridge Grade</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredStudents.map((st) => {
                const cls = classes.find((c) => c.id === st.classId);

                // calculate grade letter
                let gradeLetter = "A*";
                if (st.averageGrade < 90 && st.averageGrade >= 80) gradeLetter = "A";
                else if (st.averageGrade < 80 && st.averageGrade >= 70) gradeLetter = "B";
                else if (st.averageGrade < 70 && st.averageGrade >= 60) gradeLetter = "C";
                else if (st.averageGrade < 60) gradeLetter = "D";

                return (
                  <tr key={st.id} className="hover:bg-slate-800/50 transition">
                    <td className="px-5 py-4">
                      <div>
                        <p className="font-extrabold text-white">{st.name}</p>
                        <p className="text-[11px] text-slate-400">{st.email}</p>
                      </div>
                    </td>

                    <td className="px-5 py-4 font-bold text-slate-300">{cls?.name || "Unassigned"}</td>

                    <td className="px-5 py-4 font-semibold text-slate-200">{st.averageGrade + 2}%</td>

                    <td className="px-5 py-4 font-semibold text-slate-200">{st.averageGrade}%</td>

                    <td className="px-5 py-4 font-bold text-emerald-400">{st.attendanceRate}%</td>

                    <td className="px-5 py-4 font-black text-amber-400 text-sm">{st.averageGrade}%</td>

                    <td className="px-5 py-4">
                      <span className="inline-flex items-center justify-center h-8 w-8 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 font-black text-sm">
                        {gradeLetter}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
