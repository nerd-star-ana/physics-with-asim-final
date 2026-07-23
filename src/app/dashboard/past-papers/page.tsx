"use client";

import { useState } from "react";
import {
  Download,
  FileCheck,
  FileText,
  PlayCircle,
  Search,
  Video,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLMS } from "@/context/lms-context";
import { cn } from "@/lib/utils";

export default function PastPapersPage() {
  const { getStudentAssignedResources } = useLMS();
  const allResources = getStudentAssignedResources();
  const pastPapers = allResources.filter((r) => r.type === "past_paper");

  const [boardFilter, setBoardFilter] = useState<string>("All");
  const [levelFilter, setLevelFilter] = useState<string>("All");
  const [yearFilter, setYearFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const [activeModal, setActiveModal] = useState<{ paper: any; type: "MS" | "ER" | "VIDEO" } | null>(null);

  const filteredPapers = pastPapers.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950 shadow-xs">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-100 px-3 py-1 text-xs font-bold text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">
            <Download className="h-3.5 w-3.5" /> Cambridge & Edexcel Archive
          </div>
          <h1 className="mt-2 text-2xl font-bold text-slate-950 dark:text-white sm:text-3xl">
            Past Papers & Mark Schemes
          </h1>
          <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
            Official question papers, verified mark schemes, examiner reports, and step-by-step video solution walk-throughs.
          </p>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
        {/* Search Input */}
        <div className="relative sm:col-span-2">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search paper code (e.g., 9702/41, 0625)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-10 w-full rounded-2xl border border-slate-200 bg-white pl-10 pr-4 text-xs font-medium text-slate-900 focus:border-indigo-500 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
          />
        </div>

        {/* Board Filter */}
        <select
          value={boardFilter}
          onChange={(e) => setBoardFilter(e.target.value)}
          className="h-10 rounded-2xl border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-900 focus:border-indigo-500 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
        >
          <option value="All">All Exam Boards</option>
          <option value="Cambridge">Cambridge (CAIE)</option>
          <option value="Edexcel">Edexcel (Pearson)</option>
        </select>

        {/* Year Filter */}
        <select
          value={yearFilter}
          onChange={(e) => setYearFilter(e.target.value)}
          className="h-10 rounded-2xl border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-900 focus:border-indigo-500 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
        >
          <option value="All">All Years</option>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
        </select>
      </div>

      {/* Level Filters */}
      <div className="flex flex-wrap gap-2">
        {["All", "A Level", "AS Level", "O Level / IGCSE"].map((lvl) => (
          <button
            key={lvl}
            onClick={() => setLevelFilter(lvl)}
            className={cn(
              "rounded-full px-3 py-1.5 text-xs font-bold transition",
              levelFilter === lvl
                ? "bg-indigo-600 text-white dark:bg-indigo-500"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800",
            )}
          >
            {lvl}
          </button>
        ))}
      </div>

      {/* Papers Grid */}
      <div className="grid gap-4">
        {filteredPapers.map((paper) => (
          <Card
            key={paper.id}
            className="border-slate-200 bg-white p-5 transition hover:border-indigo-300 dark:border-slate-800 dark:bg-slate-950 shadow-xs"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-bold text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 uppercase">
                    {paper.qualification}
                  </span>
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                    {paper.session} {paper.year} · {paper.variant}
                  </span>
                </div>
                <h2 className="text-base font-bold text-slate-950 dark:text-white">{paper.title}</h2>
                <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 font-medium">
                  <span>Paper Code / Variant: {paper.variant}</span>
                  <span>·</span>
                  <span>Verified Exam Material</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href={paper.fileUrl || "#"}
                  download
                  className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 text-white px-3 py-1.5 text-xs font-bold hover:bg-indigo-700"
                >
                  <Download className="h-3.5 w-3.5" /> QP PDF
                </a>

                <Button
                  onClick={() => setActiveModal({ paper, type: "MS" })}
                  variant="outline"
                  size="sm"
                  className="text-xs font-semibold"
                >
                  <FileCheck className="h-3.5 w-3.5 text-emerald-600" /> Mark Scheme
                </Button>

                <Button
                  onClick={() => setActiveModal({ paper, type: "ER" })}
                  variant="outline"
                  size="sm"
                  className="text-xs font-semibold"
                >
                  <FileText className="h-3.5 w-3.5 text-cyan-600" /> Examiner Report
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Paper View Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-xs">
          <div className="relative w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950 shadow-2xl space-y-5">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                  {activeModal.paper.code} · {activeModal.paper.session} {activeModal.paper.year}
                </span>
                <h2 className="text-lg font-bold text-slate-950 dark:text-white">
                  {activeModal.type === "MS" && "Official Mark Scheme"}
                  {activeModal.type === "ER" && "Examiner Performance Report"}
                  {activeModal.type === "VIDEO" && "Step-by-Step Video Walkthrough"}
                </h2>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setActiveModal(null)}
                className="rounded-full"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {activeModal.type === "VIDEO" ? (
              <div className="rounded-2xl bg-indigo-950 p-6 text-white text-center space-y-3">
                <PlayCircle className="mx-auto h-12 w-12 text-indigo-400 animate-bounce" />
                <h3 className="text-sm font-bold">Sir Asim Solved Past Paper Video</h3>
                <p className="text-xs text-indigo-200">
                  Includes full explanation of tricky 4-mark calculation questions and common student mistakes highlighted by Cambridge examiners.
                </p>
              </div>
            ) : (
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-xs font-medium text-slate-800 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 space-y-2">
                <p className="font-bold text-slate-950 dark:text-white">
                  Document Preview ({activeModal.paper.title})
                </p>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {activeModal.type === "MS"
                    ? "Full point distribution breakdown according to Cambridge Assessment International Education grading criteria."
                    : "Key statistical trends, grade thresholds, and common misconceptions observed by chief examiners for this paper variant."}
                </p>
              </div>
            )}

            <div className="flex justify-end gap-3 pt-2">
              <Button onClick={() => setActiveModal(null)} variant="secondary">
                Close
              </Button>
              <Button className="bg-indigo-600 text-white hover:bg-indigo-700">
                <Download className="h-4 w-4" /> Download Full PDF
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
