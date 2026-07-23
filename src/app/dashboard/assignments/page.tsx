"use client";

import { useState } from "react";
import {
  Clock,
  FileCheck,
  FileText,
  GraduationCap,
  Send,
  UploadCloud,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLMS } from "@/context/lms-context";
import { cn } from "@/lib/utils";

export default function AssignmentsPage() {
  const { getStudentAssignedAssignments, submitAssignment, activeStudent } = useLMS();
  const lmsAssignments = getStudentAssignedAssignments();

  const [activeTab, setActiveTab] = useState<"All" | "Pending" | "Graded" | "Submitted">("All");
  const [selectedAssignment, setSelectedAssignment] = useState<any | null>(null);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [targetAssignment, setTargetAssignment] = useState<any | null>(null);

  // Upload Form State
  const [file, setFile] = useState<File | null>(null);
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredAssignments = lmsAssignments.filter((a) => {
    const sub = a.submissions.find((s) => s.studentId === "st-01");
    const status = sub ? sub.status : "pending";

    if (activeTab === "Pending") return status === "pending" || status === "resubmit_requested";
    if (activeTab === "Graded") return status === "graded";
    if (activeTab === "Submitted") return sub !== undefined;
    return true;
  });

  const handleStartSubmit = (asg: any) => {
    setTargetAssignment(asg);
    setUploadModalOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetAssignment) return;

    setIsSubmitting(true);
    setTimeout(() => {
      submitAssignment(
        targetAssignment.id,
        activeStudent?.id || "st-01",
        activeStudent?.name || "Ahmed Khan",
        notes || (file ? `File attached: ${file.name}` : "Solution document attached")
      );
      setIsSubmitting(false);
      setUploadModalOpen(false);
      setFile(null);
      setNotes("");
    }, 400);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950 shadow-xs">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
            <FileCheck className="h-3.5 w-3.5" /> Homework & Submissions
          </div>
          <h1 className="mt-2 text-2xl font-bold text-slate-950 dark:text-white sm:text-3xl">
            Assignments Dashboard
          </h1>
          <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
            Track pending worksheets, submit PDF solutions, and view teacher grading feedback.
          </p>
        </div>

        {/* Status Filters */}
        <div className="flex flex-wrap gap-1.5">
          {(["All", "Pending", "Graded", "Submitted"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={cn(
                "rounded-full px-3 py-1.5 text-xs font-bold transition",
                activeTab === tab
                  ? "bg-indigo-600 text-white dark:bg-indigo-500"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800",
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Assignments List */}
      <div className="grid gap-4">
        {filteredAssignments.map((asg) => (
          <Card
            key={asg.id}
            className="border-slate-200 bg-white p-5 transition hover:border-indigo-300 dark:border-slate-800 dark:bg-slate-950 shadow-xs"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="space-y-1.5 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase">
                    PHYSICS ASSIGNMENT
                  </span>
                </div>
                <h2 className="text-base font-bold text-slate-950 dark:text-white">{asg.title}</h2>
                <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-600 dark:text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-amber-500" /> Due: {asg.dueDate}
                  </span>
                  <span>Total Marks: {asg.totalMarks} Marks</span>
                </div>
              </div>

              {(() => {
                const sub = asg.submissions?.find((s: any) => s.studentId === "st-01");
                const status = sub ? sub.status : "pending";

                return (
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        "rounded-full px-3 py-1 text-xs font-bold uppercase",
                        status === "pending"
                          ? "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                          : status === "graded"
                          ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                          : "bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300",
                      )}
                    >
                      {status} {sub?.grade !== undefined ? `(${sub.grade}/${asg.totalMarks})` : ""}
                    </span>

                    {status === "pending" && (
                      <Button
                        onClick={() => handleStartSubmit(asg)}
                        size="sm"
                        className="bg-indigo-600 text-white hover:bg-indigo-700"
                      >
                        <UploadCloud className="h-4 w-4" /> Upload Solution
                      </Button>
                    )}

                    {status === "graded" && (
                      <Button
                        onClick={() => setSelectedAssignment(asg)}
                        variant="outline"
                        size="sm"
                        className="h-9 text-xs"
                      >
                        View Feedback
                      </Button>
                    )}
                  </div>
                );
              })()}
            </div>

            {/* Feedback section if selected inline */}
            {selectedAssignment?.id === asg.id && (() => {
              const sub = asg.submissions?.find((s: any) => s.studentId === "st-01");
              return (
                <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4 text-xs dark:border-emerald-900/50 dark:bg-emerald-950/30 space-y-2">
                  <div className="flex items-center justify-between font-bold text-emerald-900 dark:text-emerald-200">
                    <span className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4" /> Instructor Evaluation Report
                    </span>
                    <button onClick={() => setSelectedAssignment(null)} className="text-slate-400 hover:text-slate-600">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="text-emerald-950 dark:text-emerald-300 leading-relaxed font-medium">
                    {sub?.feedback || "Great mathematical rigor shown in vector resolution."}
                  </p>
                  <div className="pt-1 text-[11px] font-semibold text-emerald-800 dark:text-emerald-400">
                    Marks Obtained: {sub?.grade !== undefined ? sub.grade : asg.totalMarks} / {asg.totalMarks}
                  </div>
                </div>
              );
            })()}
          </Card>
        ))}
      </div>

      {/* Upload Modal */}
      {uploadModalOpen && targetAssignment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-xs">
          <form
            onSubmit={handleFormSubmit}
            className="relative w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950 shadow-2xl space-y-5"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                  {targetAssignment.courseCode}
                </span>
                <h2 className="text-lg font-bold text-slate-950 dark:text-white">
                  Submit Assignment
                </h2>
                <p className="text-xs text-slate-500">{targetAssignment.title}</p>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setUploadModalOpen(false)}
                className="rounded-full"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Drag & Drop Area */}
            <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/80 p-6 text-center dark:border-slate-800 dark:bg-slate-900/50 space-y-3">
              <UploadCloud className="mx-auto h-8 w-8 text-indigo-600 dark:text-indigo-400" />
              <div>
                <label className="cursor-pointer text-xs font-bold text-indigo-600 hover:underline dark:text-indigo-400">
                  Choose PDF file
                  <input
                    type="file"
                    accept=".pdf,.png,.jpg,.jpeg"
                    className="hidden"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                  />
                </label>
                <span className="text-xs text-slate-500"> or drag and drop solution</span>
              </div>
              <p className="text-[11px] text-slate-400">Accepted formats: PDF, PNG, JPG (Max 25MB)</p>
              {file && (
                <div className="inline-flex items-center gap-2 rounded-full bg-indigo-100 px-3 py-1 text-xs font-bold text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">
                  <FileText className="h-3.5 w-3.5" /> {file.name}
                </div>
              )}
            </div>

            {/* Submission Notes */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Notes for Instructor (Optional)
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="E.g., I have included rough work for Question 3b on page 4."
                className="w-full rounded-2xl border border-slate-200 bg-white p-3 text-xs font-medium text-slate-900 focus:border-indigo-500 focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setUploadModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-indigo-600 text-white hover:bg-indigo-700"
              >
                {isSubmitting ? "Submitting..." : "Confirm & Submit"} <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
