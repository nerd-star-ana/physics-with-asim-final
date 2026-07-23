"use client";

import React, { useState } from "react";
import {
  HelpCircle,
  Plus,
  Clock,
  Award,
  CheckCircle,
  XCircle,
  X,
  Trash2,
  Users,
} from "lucide-react";
import { useLMS, QuizQuestion } from "@/context/lms-context";

export default function TeacherQuizzesPage() {
  const { quizzes, classes, addQuiz } = useLMS();

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [durationMinutes, setDurationMinutes] = useState(20);
  const [passingPercentage, setPassingPercentage] = useState(70);
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);

  // Questions Builder
  const [questions, setQuestions] = useState<QuizQuestion[]>([
    {
      id: "q1",
      question: "What is the unit of electric capacitance?",
      options: ["Farad", "Henry", "Tesla", "Weber"],
      correctOptionIndex: 0,
      explanation: "Capacitance C = Q/V and is measured in Farads (F).",
      marks: 5,
    },
  ]);

  const handleAddQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      {
        id: `q_${Date.now()}`,
        question: "Sample Physics Question?",
        options: ["Option A", "Option B", "Option C", "Option D"],
        correctOptionIndex: 0,
        explanation: "Explanatory note here.",
        marks: 5,
      },
    ]);
  };

  const handleCreateQuiz = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || questions.length === 0) return;

    const totalMarks = questions.reduce((sum, q) => sum + q.marks, 0);

    addQuiz({
      title,
      description,
      durationMinutes,
      passingPercentage,
      totalMarks,
      assignedClassIds: selectedClasses,
      questions,
      status: "published",
    });

    setIsModalOpen(false);
    setTitle("");
    setDescription("");
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <HelpCircle className="h-6 w-6 text-amber-400" />
            Quiz & Checkpoint Test Builder
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Build timed multiple-choice physics tests. Control timer, passing score, and assign to specific batches.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 rounded-2xl bg-amber-500 text-slate-950 px-4 py-2.5 text-xs font-black shadow-lg shadow-amber-500/20 hover:bg-amber-400 transition"
        >
          <Plus className="h-4 w-4" />
          <span>Build New Quiz</span>
        </button>
      </div>

      {/* Quizzes List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {quizzes.map((quiz) => {
          const assignedClassNames = classes
            .filter((c) => quiz.assignedClassIds.includes(c.id))
            .map((c) => c.name);

          return (
            <div key={quiz.id} className="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-4 shadow-xl flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider bg-purple-500/10 text-purple-400 border border-purple-500/30 px-2.5 py-0.5 rounded-full">
                    {quiz.questions.length} Questions
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                    <Clock className="h-3.5 w-3.5 text-amber-400" /> {quiz.durationMinutes} mins
                  </span>
                </div>

                <h2 className="text-lg font-bold text-white">{quiz.title}</h2>
                <p className="text-xs text-slate-400">{quiz.description}</p>

                <div className="rounded-xl bg-slate-950 p-3 text-xs space-y-1.5 border border-slate-800">
                  <div className="flex justify-between text-slate-300">
                    <span className="text-slate-400">Total Marks:</span>
                    <span className="font-extrabold text-amber-400">{quiz.totalMarks} Marks</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span className="text-slate-400">Passing Score:</span>
                    <span className="font-bold text-emerald-400">{quiz.passingPercentage}%</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span className="text-slate-400">Target Batches:</span>
                    <span className="font-bold text-blue-400">
                      {assignedClassNames.length > 0 ? assignedClassNames.join(", ") : "All Batches"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Student Attempt History */}
              <div className="pt-3 border-t border-slate-800 text-xs">
                <p className="font-bold text-slate-400 mb-2">Student Attempts ({quiz.attempts.length}):</p>
                {quiz.attempts.length === 0 ? (
                  <p className="text-slate-500 italic">No attempts recorded yet.</p>
                ) : (
                  <div className="space-y-1.5">
                    {quiz.attempts.map((att) => (
                      <div key={att.id} className="flex items-center justify-between bg-slate-950 p-2 rounded-lg border border-slate-800">
                        <span className="font-semibold text-white">{att.studentName}</span>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-amber-400">{att.score}/{att.totalMarks} ({att.percentage}%)</span>
                          {att.passed ? (
                            <CheckCircle className="h-4 w-4 text-emerald-400" />
                          ) : (
                            <XCircle className="h-4 w-4 text-rose-400" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal for Creating Quiz */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-2xl rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h2 className="text-xl font-extrabold text-white">Create New Physics Checkpoint Quiz</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-slate-400 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateQuiz} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Quiz Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. A-Level Quantum Physics Checkpoint Test"
                  className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3.5 py-2.5 text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Quiz Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Instructions for students..."
                  rows={2}
                  className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3.5 py-2.5 text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Timer (Minutes)</label>
                  <input
                    type="number"
                    value={durationMinutes}
                    onChange={(e) => setDurationMinutes(Number(e.target.value))}
                    className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3.5 py-2.5 text-white font-bold focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Passing Score (%)</label>
                  <input
                    type="number"
                    value={passingPercentage}
                    onChange={(e) => setPassingPercentage(Number(e.target.value))}
                    className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3.5 py-2.5 text-white font-bold focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </div>

              {/* Question Editor */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-amber-400">Multiple Choice Questions ({questions.length})</h3>
                  <button
                    type="button"
                    onClick={handleAddQuestion}
                    className="inline-flex items-center gap-1 text-xs font-bold text-amber-400 hover:underline"
                  >
                    <Plus className="h-3.5 w-3.5" /> Add Question
                  </button>
                </div>

                {questions.map((q, qIndex) => (
                  <div key={q.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white">Q{qIndex + 1}.</span>
                      <button
                        type="button"
                        onClick={() => setQuestions((prev) => prev.filter((item) => item.id !== q.id))}
                        className="text-rose-400 hover:text-rose-300"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <input
                      type="text"
                      value={q.question}
                      onChange={(e) => {
                        const val = e.target.value;
                        setQuestions((prev) =>
                          prev.map((item) => (item.id === q.id ? { ...item, question: val } : item))
                        );
                      }}
                      className="w-full rounded-lg bg-slate-900 border border-slate-800 px-3 py-2 text-white font-semibold"
                      placeholder="Enter question text..."
                    />

                    <div className="grid grid-cols-2 gap-2">
                      {q.options.map((opt, optIndex) => (
                        <input
                          key={optIndex}
                          type="text"
                          value={opt}
                          onChange={(e) => {
                            const val = e.target.value;
                            setQuestions((prev) =>
                              prev.map((item) => {
                                if (item.id !== q.id) return item;
                                const newOpts = [...item.options];
                                newOpts[optIndex] = val;
                                return { ...item, options: newOpts };
                              })
                            );
                          }}
                          className={`w-full rounded-lg bg-slate-900 border px-3 py-1.5 text-white ${
                            q.correctOptionIndex === optIndex ? "border-emerald-500 text-emerald-300 font-bold" : "border-slate-800"
                          }`}
                          placeholder={`Option ${optIndex + 1}`}
                        />
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-1 text-[11px]">
                      <label className="text-slate-400">
                        Correct Option:{" "}
                        <select
                          value={q.correctOptionIndex}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            setQuestions((prev) =>
                              prev.map((item) => (item.id === q.id ? { ...item, correctOptionIndex: val } : item))
                            );
                          }}
                          className="bg-slate-900 text-emerald-400 font-bold border border-slate-700 rounded px-2 py-0.5 ml-1"
                        >
                          {q.options.map((_, idx) => (
                            <option key={idx} value={idx}>
                              Option {idx + 1}
                            </option>
                          ))}
                        </select>
                      </label>
                    </div>
                  </div>
                ))}
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
                  Publish Quiz
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
