"use client";

import React, { useState } from "react";
import {
  Users,
  UserPlus,
  Search,
  Filter,
  FileSpreadsheet,
  Award,
  FileCheck2,
  ShieldAlert,
  ShieldCheck,
  KeyRound,
  ArrowRightLeft,
  X,
  Phone,
  Mail,
  Printer,
  Download,
} from "lucide-react";
import { useLMS, StudentRecord } from "@/context/lms-context";

export default function TeacherStudentsPage() {
  const { students, classes, addStudent, updateStudent, transferStudentClass, toggleStudentStatus } = useLMS();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClassFilter, setSelectedClassFilter] = useState<string>("all");

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedStudentForReport, setSelectedStudentForReport] = useState<StudentRecord | null>(null);
  const [selectedStudentForCertificate, setSelectedStudentForCertificate] = useState<StudentRecord | null>(null);

  // New Student Form
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [classId, setClassId] = useState(classes[0]?.id || "");
  const [parentName, setParentName] = useState("");
  const [parentPhone, setParentPhone] = useState("");
  const [parentEmail, setParentEmail] = useState("");

  const filteredStudents = students.filter((st) => {
    const matchesSearch =
      st.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      st.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesClass = selectedClassFilter === "all" || st.classId === selectedClassFilter;
    return matchesSearch && matchesClass;
  });

  const handleAddStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    addStudent({
      name,
      email,
      classId,
      status: "active",
      parentName: parentName || "N/A",
      parentPhone: parentPhone || "N/A",
      parentEmail: parentEmail || "N/A",
    });

    setIsAddModalOpen(false);
    setName("");
    setEmail("");
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <Users className="h-6 w-6 text-amber-400" />
            Student Roster & Control Center
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Teacher controls every student account: assign class, suspend/activate, reset credentials, and generate official report cards or certificates.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center gap-2 rounded-2xl bg-amber-500 text-slate-950 px-4 py-2.5 text-xs font-black shadow-lg shadow-amber-500/20 hover:bg-amber-400 transition"
        >
          <UserPlus className="h-4 w-4" />
          <span>Add New Student</span>
        </button>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900 p-4 rounded-2xl border border-slate-800">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search student by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl bg-slate-950 border border-slate-800 pl-10 pr-4 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
        </div>

        <div className="flex items-center gap-3">
          <Filter className="h-4 w-4 text-slate-400" />
          <select
            value={selectedClassFilter}
            onChange={(e) => setSelectedClassFilter(e.target.value)}
            className="rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 text-xs text-white font-semibold focus:outline-none focus:ring-1 focus:ring-amber-500"
          >
            <option value="all">All Batches & Classes ({students.length})</option>
            {classes.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.code})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Roster Table */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider font-extrabold text-[11px] border-b border-slate-800">
              <tr>
                <th className="px-5 py-4">Student Name</th>
                <th className="px-5 py-4">Assigned Batch</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Avg Grade</th>
                <th className="px-5 py-4">Attendance</th>
                <th className="px-5 py-4">Parent Contact</th>
                <th className="px-5 py-4 text-right">Teacher Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredStudents.map((st) => {
                const assignedClass = classes.find((c) => c.id === st.classId);

                return (
                  <tr key={st.id} className="hover:bg-slate-800/50 transition">
                    <td className="px-5 py-4">
                      <div>
                        <p className="font-extrabold text-white">{st.name}</p>
                        <p className="text-[11px] text-slate-400 font-mono">{st.email}</p>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <select
                          value={st.classId}
                          onChange={(e) => transferStudentClass(st.id, e.target.value)}
                          className="bg-slate-950 text-slate-200 border border-slate-700 rounded-lg px-2.5 py-1 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-amber-500"
                        >
                          {classes.map((cls) => (
                            <option key={cls.id} value={cls.id}>
                              {cls.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      {st.status === "active" ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 text-[11px] font-bold">
                          <ShieldCheck className="h-3 w-3" /> Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/30 px-2.5 py-0.5 text-[11px] font-bold">
                          <ShieldAlert className="h-3 w-3" /> Suspended
                        </span>
                      )}
                    </td>

                    <td className="px-5 py-4 font-black text-amber-400 text-sm">
                      {st.averageGrade}%
                    </td>

                    <td className="px-5 py-4 font-bold text-slate-200">
                      {st.attendanceRate}%
                    </td>

                    <td className="px-5 py-4">
                      <div className="text-[11px] space-y-0.5">
                        <p className="font-bold text-slate-200">{st.parentName}</p>
                        <p className="text-slate-400 flex items-center gap-1">
                          <Phone className="h-3 w-3 text-emerald-400" /> {st.parentPhone}
                        </p>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedStudentForReport(st)}
                          className="rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/30 px-2.5 py-1 font-bold hover:bg-blue-500/20"
                          title="Generate Report Card"
                        >
                          <FileCheck2 className="h-3.5 w-3.5" />
                        </button>

                        <button
                          onClick={() => setSelectedStudentForCertificate(st)}
                          className="rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/30 px-2.5 py-1 font-bold hover:bg-amber-500/20"
                          title="Generate Certificate"
                        >
                          <Award className="h-3.5 w-3.5" />
                        </button>

                        <button
                          onClick={() => toggleStudentStatus(st.id)}
                          className={`rounded-lg px-2.5 py-1 font-bold border transition ${
                            st.status === "active"
                              ? "bg-rose-500/10 text-rose-400 border-rose-500/30 hover:bg-rose-500/20"
                              : "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20"
                          }`}
                        >
                          {st.status === "active" ? "Suspend" : "Activate"}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Student Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h2 className="text-xl font-extrabold text-white">Enroll New Student</h2>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleAddStudentSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Student Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Usman Ali"
                  className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3.5 py-2.5 text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Student Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="usman@student.edu"
                  className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3.5 py-2.5 text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Assign to Batch / Class</label>
                <select
                  value={classId}
                  onChange={(e) => setClassId(e.target.value)}
                  className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3.5 py-2.5 text-white font-bold focus:outline-none focus:ring-1 focus:ring-amber-500"
                >
                  {classes.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.code})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Parent Guardian Name</label>
                  <input
                    type="text"
                    value={parentName}
                    onChange={(e) => setParentName(e.target.value)}
                    placeholder="e.g. Ali Ahmed"
                    className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3.5 py-2.5 text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Parent Phone Number</label>
                  <input
                    type="text"
                    value={parentPhone}
                    onChange={(e) => setParentPhone(e.target.value)}
                    placeholder="+92 300 0000000"
                    className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3.5 py-2.5 text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="rounded-xl bg-slate-800 px-4 py-2.5 text-slate-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-amber-500 text-slate-950 px-5 py-2.5 font-extrabold hover:bg-amber-400"
                >
                  Enroll Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Report Card Modal */}
      {selectedStudentForReport && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-2xl rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-6 text-white shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-xl font-black text-amber-400">OFFICIAL STUDENT REPORT CARD</h2>
                <p className="text-xs text-slate-400">Physics With Asim • Cambridge & O-Level Coaching</p>
              </div>
              <button
                onClick={() => setSelectedStudentForReport(null)}
                className="p-1 rounded-full text-slate-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs bg-slate-950 p-6 rounded-2xl border border-slate-800">
              <div className="grid grid-cols-2 gap-4 border-b border-slate-800 pb-4">
                <div>
                  <p className="text-slate-400">Student Name:</p>
                  <p className="text-base font-extrabold text-white">{selectedStudentForReport.name}</p>
                  <p className="text-slate-400 font-mono mt-1">{selectedStudentForReport.email}</p>
                </div>
                <div>
                  <p className="text-slate-400">Class Batch:</p>
                  <p className="text-sm font-bold text-amber-400">
                    {classes.find((c) => c.id === selectedStudentForReport.classId)?.name}
                  </p>
                  <p className="text-slate-400 mt-1">Instructor: Sir Asim</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center py-2">
                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                  <p className="text-slate-400 text-[11px]">Average Score</p>
                  <p className="text-2xl font-black text-amber-400">{selectedStudentForReport.averageGrade}%</p>
                </div>
                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                  <p className="text-slate-400 text-[11px]">Attendance Rate</p>
                  <p className="text-2xl font-black text-emerald-400">{selectedStudentForReport.attendanceRate}%</p>
                </div>
                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                  <p className="text-slate-400 text-[11px]">Study Hours</p>
                  <p className="text-2xl font-black text-cyan-400">{selectedStudentForReport.studyHours} hrs</p>
                </div>
              </div>

              <div className="pt-2">
                <p className="font-bold text-slate-300 mb-1">Teacher Remarks by Sir Asim:</p>
                <p className="text-slate-400 leading-relaxed italic bg-slate-900 p-3 rounded-xl border border-slate-800">
                  &quot;{selectedStudentForReport.name} demonstrates good conceptual understanding in mechanics and thermal physics. Continued effort in paper 4 numerical steps will secure an A*.&quot;
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 rounded-xl bg-amber-500 text-slate-950 px-4 py-2.5 text-xs font-black hover:bg-amber-400"
              >
                <Printer className="h-4 w-4" /> Print Report Card
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Certificate Modal */}
      {selectedStudentForCertificate && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-2xl rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-amber-950/40 border-2 border-amber-500/40 p-8 space-y-6 text-white shadow-2xl relative text-center">
            <button
              onClick={() => setSelectedStudentForCertificate(null)}
              className="absolute top-4 right-4 p-1 rounded-full text-slate-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="space-y-4 py-6">
              <Award className="h-16 w-16 text-amber-400 mx-auto" />
              <p className="text-xs font-extrabold tracking-[0.3em] uppercase text-amber-400">
                PHYSICS WITH ASIM • ACADEMIC EXCELLENCE
              </p>
              <h2 className="text-3xl font-black text-white">CERTIFICATE OF ACHIEVEMENT</h2>
              <p className="text-xs text-slate-300">This certificate is proudly presented to</p>

              <p className="text-3xl font-black text-amber-300 underline underline-offset-8 decoration-amber-500">
                {selectedStudentForCertificate.name}
              </p>

              <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                For outstanding academic dedication and achieving an average score of <span className="font-bold text-white">{selectedStudentForCertificate.averageGrade}%</span> in {classes.find((c) => c.id === selectedStudentForCertificate.classId)?.name}.
              </p>

              <div className="pt-8 flex items-center justify-around border-t border-amber-500/20">
                <div>
                  <p className="font-black text-white text-sm">SIR ASIM</p>
                  <p className="text-[10px] text-amber-400">Lead Physics Master Instructor</p>
                </div>
                <div>
                  <p className="font-black text-white text-sm">2026 SESSION</p>
                  <p className="text-[10px] text-amber-400">Physics With Asim LMS</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 rounded-xl bg-amber-500 text-slate-950 px-5 py-2.5 text-xs font-black hover:bg-amber-400"
            >
              <Printer className="h-4 w-4" /> Print Certificate
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
