"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Clock,
  Play,
  RotateCcw,
  Target,
  Trophy,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLMS } from "@/context/lms-context";
import { cn } from "@/lib/utils";

export default function QuizzesPage() {
  const { getStudentAssignedQuizzes, recordQuizAttempt, activeStudent } = useLMS();
  const assignedQuizzes = getStudentAssignedQuizzes();

  const [activeQuiz, setActiveQuiz] = useState<any | null>(null);

  // Active Quiz State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);
  const [score, setScore] = useState<number>(0);

  const evaluateQuiz = useCallback(() => {
    if (!activeQuiz) return;
    let correctCount = 0;
    activeQuiz.questions.forEach((q: any, idx: number) => {
      const correctIdx = q.correctOptionIndex !== undefined ? q.correctOptionIndex : q.correctIndex;
      if (selectedAnswers[idx] === correctIdx) {
        correctCount += 1;
      }
    });

    const percent = Math.round((correctCount / activeQuiz.questions.length) * 100);
    setScore(percent);
    setIsQuizSubmitted(true);

    recordQuizAttempt(
      activeQuiz.id,
      activeStudent?.id || "st-01",
      activeStudent?.name || "Ahmed Khan",
      correctCount,
      activeQuiz.totalMarks || activeQuiz.questions.length
    );
  }, [activeQuiz, selectedAnswers, recordQuizAttempt, activeStudent]);

  // Countdown timer effect when quiz is active
  useEffect(() => {
    if (!activeQuiz || isQuizSubmitted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          evaluateQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [activeQuiz, isQuizSubmitted, evaluateQuiz]);

  const handleStartQuiz = (quiz: any) => {
    setActiveQuiz(quiz);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setTimeLeft((quiz.durationMinutes || quiz.timeLimitMins || 10) * 60);
    setIsQuizSubmitted(false);
    setScore(0);
  };

  const handleSelectOption = (questionIdx: number, optionIdx: number) => {
    if (isQuizSubmitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionIdx]: optionIdx }));
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950 shadow-xs">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800 dark:bg-amber-950 dark:text-amber-300">
            <Target className="h-3.5 w-3.5" /> Exam Drills & Quiz Center
          </div>
          <h1 className="mt-2 text-2xl font-bold text-slate-950 dark:text-white sm:text-3xl">
            Physics Practice Quizzes
          </h1>
          <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
            Test your conceptual speed, track topic performance analytics, and practice under exam timer constraints.
          </p>
        </div>
      </div>

      {/* Quizzes List */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {assignedQuizzes.map((quiz: any) => {
          const studentAttempt = quiz.attempts?.find((att: any) => att.studentId === "st-01");
          return (
            <Card
              key={quiz.id}
              className="flex flex-col justify-between border-slate-200 bg-white p-5 transition hover:border-indigo-300 dark:border-slate-800 dark:bg-slate-950 shadow-xs"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-bold text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 uppercase">
                    Practice Drill
                  </span>
                  <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                    Pass: {quiz.passingPercentage}%
                  </span>
                </div>

                <div>
                  <h2 className="text-base font-bold text-slate-950 dark:text-white">{quiz.title}</h2>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">{quiz.description}</p>
                </div>

                <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1 font-semibold">
                    <Clock className="h-3.5 w-3.5 text-indigo-500" /> {quiz.durationMinutes || 10} Mins
                  </span>
                  <span>·</span>
                  <span className="font-semibold">{quiz.questions?.length || 0} Questions</span>
                </div>

                {studentAttempt && (
                  <div className="rounded-2xl bg-emerald-50 p-3 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 flex items-center justify-between text-xs font-bold text-emerald-900 dark:text-emerald-200">
                    <span>Best Score:</span>
                    <span>{studentAttempt.percentage}% ({studentAttempt.score}/{studentAttempt.totalMarks})</span>
                  </div>
                )}
              </div>

              <div className="pt-4 mt-2">
                <Button
                  onClick={() => handleStartQuiz(quiz)}
                  className="w-full bg-indigo-600 text-white hover:bg-indigo-700"
                >
                  <Play className="h-4 w-4" /> {studentAttempt ? "Retake Quiz" : "Start Quiz"}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Active Quiz Interactive Modal Runner */}
      {activeQuiz && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-xs">
          <div className="relative w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-slate-200 pb-4 dark:border-slate-800">
              <div>
                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                  {activeQuiz.topic} · Question {currentQuestionIndex + 1} of {activeQuiz.questions.length}
                </span>
                <h2 className="text-lg font-bold text-slate-950 dark:text-white">{activeQuiz.title}</h2>
              </div>
              <div className="flex items-center gap-3">
                {!isQuizSubmitted && (
                  <div className="flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-900 dark:bg-amber-950 dark:text-amber-200">
                    <Clock className="h-4 w-4 text-amber-600 animate-pulse" />
                    <span>{formatTime(timeLeft)}</span>
                  </div>
                )}
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveQuiz(null)}
                  className="rounded-full"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {!isQuizSubmitted ? (
              /* Question Runner */
              <div className="space-y-5">
                <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-900 text-sm font-semibold text-slate-950 dark:text-white leading-relaxed">
                  {activeQuiz.questions[currentQuestionIndex].question}
                </div>

                <div className="space-y-2.5">
                  {activeQuiz.questions[currentQuestionIndex].options.map((opt: string, optIdx: number) => {
                    const isSelected = selectedAnswers[currentQuestionIndex] === optIdx;
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => handleSelectOption(currentQuestionIndex, optIdx)}
                        className={cn(
                          "flex w-full items-center gap-3 rounded-2xl border p-3.5 text-left text-xs font-semibold transition",
                          isSelected
                            ? "border-indigo-600 bg-indigo-50 text-indigo-950 dark:border-indigo-500 dark:bg-indigo-950/80 dark:text-white"
                            : "border-slate-200 bg-white text-slate-800 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900",
                        )}
                      >
                        <div
                          className={cn(
                            "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-bold",
                            isSelected
                              ? "border-indigo-600 bg-indigo-600 text-white"
                              : "border-slate-300 text-slate-500 dark:border-slate-700",
                          )}
                        >
                          {String.fromCharCode(65 + optIdx)}
                        </div>
                        <span>{opt}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
                  <Button
                    disabled={currentQuestionIndex === 0}
                    onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
                    variant="outline"
                    size="sm"
                  >
                    Previous
                  </Button>

                  {currentQuestionIndex < activeQuiz.questions.length - 1 ? (
                    <Button
                      onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
                      className="bg-indigo-600 text-white hover:bg-indigo-700"
                      size="sm"
                    >
                      Next Question
                    </Button>
                  ) : (
                    <Button
                      onClick={evaluateQuiz}
                      className="bg-emerald-600 text-white hover:bg-emerald-700"
                      size="sm"
                    >
                      Submit Quiz Now
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              /* Quiz Score Summary Card */
              <div className="space-y-5 text-center py-4">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                  <Trophy className="h-10 w-10" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-950 dark:text-white">
                    Quiz Completed!
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                    Your Score: {score}%
                  </p>
                </div>

                {/* Question Review List */}
                <div className="text-left space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800 max-h-60 overflow-y-auto">
                  <h4 className="text-xs font-bold uppercase text-slate-500">Explanations & Solutions</h4>
                  {activeQuiz.questions.map((q: any, idx: number) => {
                    const userAns = selectedAnswers[idx];
                    const correctIdx = q.correctOptionIndex !== undefined ? q.correctOptionIndex : q.correctIndex;
                    const isCorrect = userAns === correctIdx;
                    return (
                      <div
                        key={q.id}
                        className={cn(
                          "rounded-2xl border p-3.5 text-xs space-y-1.5",
                          isCorrect
                            ? "border-emerald-200 bg-emerald-50/70 dark:border-emerald-900/40 dark:bg-emerald-950/30"
                            : "border-rose-200 bg-rose-50/70 dark:border-rose-900/40 dark:bg-rose-950/30",
                        )}
                      >
                        <div className="font-bold text-slate-950 dark:text-white">
                          Q{idx + 1}: {q.question}
                        </div>
                        <div className="text-slate-600 dark:text-slate-300">
                          Your choice: {userAns !== undefined ? q.options[userAns] : "Not answered"}
                        </div>
                        <div className="font-semibold text-emerald-700 dark:text-emerald-300">
                          Explanation: {q.explanation}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-center gap-3 pt-2">
                  <Button onClick={() => handleStartQuiz(activeQuiz)} variant="outline">
                    <RotateCcw className="h-4 w-4" /> Try Again
                  </Button>
                  <Button onClick={() => setActiveQuiz(null)} className="bg-indigo-600 text-white">
                    Close Quiz Runner
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
