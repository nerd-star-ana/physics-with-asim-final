"use client";

import { useState } from "react";
import {
  Bookmark,
  BookmarkCheck,
  Download,
  NotebookPen,
  Search,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLMS } from "@/context/lms-context";
import { cn } from "@/lib/utils";

export default function NotesPage() {
  const { getStudentAssignedResources } = useLMS();
  const assignedResources = getStudentAssignedResources();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [previewResource, setPreviewResource] = useState<any | null>(null);

  const categories = ["All", "Fields", "Quantum", "Mechanics", "Thermodynamics", "Waves"];

  const filteredResources = assignedResources.filter((r) => {
    const matchesSearch =
      r.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950 shadow-xs">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-cyan-100 px-3 py-1 text-xs font-bold text-cyan-800 dark:bg-cyan-950 dark:text-cyan-300">
            <NotebookPen className="h-3.5 w-3.5" /> Formula Bank & Study Notes
          </div>
          <h1 className="mt-2 text-2xl font-bold text-slate-950 dark:text-white sm:text-3xl">
            Notes & Formula Library
          </h1>
          <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
            High-yield physics revision notes, key equation sheets, and chapter formula summaries.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                "rounded-full px-3 py-1.5 text-xs font-bold transition",
                selectedCategory === cat
                  ? "bg-indigo-600 text-white dark:bg-indigo-500"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800",
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search equations, topics, or formulas..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="h-11 w-full rounded-2xl border border-slate-200 bg-white pl-10 pr-4 text-xs font-medium text-slate-900 focus:border-indigo-500 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
        />
      </div>

      {/* Resource Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        {filteredResources.map((res) => (
          <Card
            key={res.id}
            className="flex flex-col justify-between border-slate-200 bg-white p-5 transition hover:border-indigo-300 dark:border-slate-800 dark:bg-slate-950 shadow-xs"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-cyan-100 px-2.5 py-0.5 text-xs font-bold text-cyan-800 dark:bg-cyan-950 dark:text-cyan-300 uppercase">
                  {res.type?.replace("_", " ") || "Notes"}
                </span>
                <span className="text-xs font-bold text-amber-500">{res.qualification}</span>
              </div>

              <div>
                <h2 className="text-base font-bold text-slate-950 dark:text-white">{res.title}</h2>
              </div>

              {res.year && (
                <p className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400">
                  {res.year} • {res.session} • {res.variant}
                </p>
              )}
            </div>

            <div className="mt-4 flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-800">
              <span className="text-[11px] font-semibold text-slate-400">
                Uploaded: {res.createdAt || "Today"}
              </span>
              <a
                href={res.fileUrl || "#"}
                download
                className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 text-white px-3 py-1.5 text-xs font-bold hover:bg-indigo-700"
              >
                <Download className="h-3.5 w-3.5" /> Download PDF
              </a>
            </div>
          </Card>
        ))}
      </div>

      {/* Preview Modal */}
      {previewResource && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-xs">
          <div className="relative w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400">
                  {previewResource.category} · {previewResource.level}
                </span>
                <h2 className="text-lg font-bold text-slate-950 dark:text-white">
                  {previewResource.title}
                </h2>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setPreviewResource(null)}
                className="rounded-full"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="rounded-2xl border border-indigo-100 bg-indigo-50/60 p-4 dark:border-indigo-900/50 dark:bg-indigo-950/30 text-xs text-indigo-950 dark:text-indigo-200">
              {previewResource.description}
            </div>

            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                All Included Equations & Symbol Definitions
              </h3>
              <div className="space-y-2">
                {previewResource.formulas?.map((f: any) => (
                  <div
                    key={f.label}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-slate-200 bg-slate-50 p-3.5 dark:border-slate-800 dark:bg-slate-900/60 text-xs gap-2"
                  >
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white">{f.label}</div>
                      <div className="text-[11px] text-slate-500">Symbol: {f.symbol}</div>
                    </div>
                    <div className="rounded-xl bg-white px-3 py-1.5 font-mono font-bold text-indigo-700 dark:bg-slate-950 dark:text-indigo-300 border border-slate-200 dark:border-slate-800">
                      {f.equation}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button onClick={() => setPreviewResource(null)} variant="secondary">
                Close
              </Button>
              <Button className="bg-indigo-600 text-white hover:bg-indigo-700">
                <Download className="h-4 w-4" /> Download PDF ({previewResource.fileSize})
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
