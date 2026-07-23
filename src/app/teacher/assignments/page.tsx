"use client";

import React, { useState } from "react";
import {
  FileText,
  Plus,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileCheck,
  Send,
  X,
  Calendar,
  Users,
} from "lucide-react";
import { useLMS, Assignment } from "@/context/lms-context";

export default function TeacherAssignmentsPage() {
  const { assignments, classes, addAssignment, gradeSubmission } = useLMS();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSubToGrade, setSelectedSubToGrade] = useState<{
    assignmentId: string;
    submissionId: string;
    studentName: string;
    text?: string;
    totalMarks: number;
  } | null>(null);

  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [instructions, setInstructions] = useState("");
  const [totalMarks, setTotalMarks] = useState(50);
  const [dueDate, setDueDate] = useState("2026-08-05");
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
  const [latePolicy, setLatePolicy] = useState("10% mark deduction per 24 hours late");

  // Grading modal state
  const [gradeInput, setGradeInput] = useState<number>(0);
  const [feedbackInput, setFeedbackInput] = useState("");

  const handleCreateAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addAssignment({
      title,
      description,
      instructions,
      totalMarks,
      dueDate,
      assignedClassIds: selectedClasses,
      assignedStudentIds: [],
      attachments: ["Physics_Problem_Sheet.pdf"],
      latePolicy,
      maxAttempts: 2,
    });

    setIsModalOpen(false);
    setTitle("");
    setDescription("");
  };

  const handleGradeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSubToGrade) return;

    gradeSubmission(
      selectedSubToGrade.assignmentId,
      selectedSubToGrade.submissionId,
      gradeInput,
      feedbackInput
    );

    setSelectedSubToGrade(null);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <FileText className="h-6 w-6 text-amber-400" />
            Teacher Assignment & Grading Suite
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Create problem sets and assign to specific classes. Grade student submissions with detailed feedback.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 rounded-2xl bg-amber-500 text-slate-950 px-4 py-2.5 text-xs font-black shadow-lg shadow-amber-500/20 hover:bg-amber-400 transition"
        >
          <Plus className="h-4 w-4" />
          <span>Create Assignment</span>
        </button>
      </div>

      {/* Assignment List */}
      <div className="space-y-6">
        {assignments.map((asg) => {
          const targetClasses = classes.filter((c) => asg.assignedClassIds.includes(c.id));
          const pendingSubs = asg.submissions.filter((s) => s.status === "pending");
          const gradedSubs = asg.submissions.filter((s) => s.status === "graded");

          return (
            <div key={asg.id} className="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-4 shadow-xl">
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    {targetClasses.length === 0 ? (
                      <span className="bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[10px] font-black px-2.5 py-0.5 rounded-full">
                        ALL CLASSES
                      </span>
                    ) : (
                      targetClasses.map((c) => (
                        <span key={c.id} className="bg-blue-500/10 text-blue-400 border border-blue-500/30 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                          {c.name}
                        </span>
                      ))
                    )}
                  </div>
                  <h2 className="text-lg font-extrabold text-white">{asg.title}</h2>
                  <p className="text-xs text-slate-400 mt-1">{asg.description}</p>
                </div>

                <div className="text-right text-xs space-y-1">
                  <p className="font-bold text-amber-400">{asg.totalMarks} Total Marks</p>
                  <p className="text-slate-400 flex items-center gap-1 justify-end">
                    <Calendar className="h-3.5 w-3.5 text-slate-500" /> Due: {asg.dueDate}
                  </p>
                </div>
              </div>

              {/* Submissions Queue */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                  <span>Student Submissions ({asg.submissions.length})</span>
                  <span className="text-amber-400">{pendingSubs.length} Pending Grading</span>
                </div>

                {asg.submissions.length === 0 ? (
                  <p className="text-xs text-slate-500 italic">No submissions received yet for this assignment.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {asg.submissions.map((sub) => (
                      <div
                        key={sub.id}
                        className="rounded-xl bg-slate-950 border border-slate-800 p-4 flex items-center justify-between gap-3 text-xs"
                      >
                        <div>
                          <p className="font-extrabold text-white">{sub.studentName}</p>
                          <p className="text-[11px] text-slate-400">Submitted: {sub.submittedAt}</p>
                          {sub.status === "graded" && (
                            <p className="text-xs font-bold text-emerald-400 mt-1">
                              Graded: {sub.grade}/{sub.totalMarks} Marks
                            </p>
                          )}
                        </div>

                        {sub.status === "pending" ? (
                          <button
                            onClick={() => {
                              setSelectedSubToGrade({
                                assignmentId: asg.id,
                                submissionId: sub.id,
                                studentName: sub.studentName,
                                text: sub.submissionText,
                                totalMarks: asg.totalMarks,
                              });
                              setGradeInput(asg.totalMarks);
                              setFeedbackInput("Good effort!");
                            }}
                            className="rounded-lg bg-amber-500 text-slate-950 px-3 py-1.5 font-bold hover:bg-amber-400 transition"
                          >
                            Grade Now
                          </button>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/30">
                            <CheckCircle2 className="h-3.5 w-3.5" /> Graded
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Create Assignment Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-xl rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h2 className="text-xl font-extrabold text-white">Create New Homework Assignment</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-slate-400 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateAssignment} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Assignment Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Electric Fields & Potential Worksheet"
                  className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3.5 py-2.5 text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Summary of what the homework covers..."
                  rows={2}
                  className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3.5 py-2.5 text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Total Marks</label>
                  <input
                    type="number"
                    value={totalMarks}
                    onChange={(e) => setTotalMarks(Number(e.target.value))}
                    className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3.5 py-2.5 text-white focus:outline-none focus:ring-1 focus:ring-amber-500 font-bold"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Due Date</label>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3.5 py-2.5 text-white focus:outline-none focus:ring-1 focus:ring-amber-500 font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Assign To Specific Classes</label>
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
                        className="rounded border-slate-800 text-amber-500 focus:ring-amber-500"
                      />
                      <span>{cls.name} ({cls.code})</span>
                    </label>
                  ))}
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
                  Publish & Assign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Grade Submission Modal */}
      {selectedSubToGrade && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-lg font-extrabold text-white">
                  Grading Submission: {selectedSubToGrade.studentName}
                </h2>
                <p className="text-xs text-slate-400">Total Available: {selectedSubToGrade.totalMarks} Marks</p>
              </div>
              <button onClick={() => setSelectedSubToGrade(null)} className="p-1 text-slate-400 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleGradeSubmit} className="space-y-4 text-xs">
              {selectedSubToGrade.text && (
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                  <p className="font-bold text-slate-400">Student Submission Text:</p>
                  <p className="text-slate-200">{selectedSubToGrade.text}</p>
                </div>
              )}

              <div>
                <label className="block text-slate-300 font-bold mb-1">Assigned Grade / Marks</label>
                <input
                  type="number"
                  max={selectedSubToGrade.totalMarks}
                  min={0}
                  value={gradeInput}
                  onChange={(e) => setGradeInput(Number(e.target.value))}
                  className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3.5 py-2.5 text-white font-extrabold text-base focus:outline-none focus:ring-1 focus:ring-amber-500"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Sir Asim's Written Feedback</label>
                <textarea
                  value={feedbackInput}
                  onChange={(e) => setFeedbackInput(e.target.value)}
                  rows={3}
                  className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3.5 py-2.5 text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedSubToGrade(null)}
                  className="rounded-xl bg-slate-800 px-4 py-2.5 text-slate-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-emerald-500 text-slate-950 px-5 py-2.5 font-extrabold hover:bg-emerald-400"
                >
                  Save & Return Grade
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
