"use client";

import React, { useState } from "react";
import {
  FolderDown,
  Plus,
  FileText,
  Pin,
  Eye,
  Trash2,
  X,
  Upload,
  Lock,
  Globe,
  School,
  UserCheck,
} from "lucide-react";
import { useLMS, Resource } from "@/context/lms-context";

export default function TeacherResourcesPage() {
  const { resources, classes, addResource } = useLMS();

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [title, setTitle] = useState("");
  const [type, setType] = useState<Resource["type"]>("notes");
  const [qualification, setQualification] = useState<Resource["qualification"]>("Cambridge A-Level");
  const [year, setYear] = useState("2025");
  const [session, setSession] = useState("May/June");
  const [variant, setVariant] = useState("Variant 2");
  const [visibility, setVisibility] = useState<Resource["visibility"]>("class");
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
  const [pinned, setPinned] = useState(false);

  const handleUploadResource = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addResource({
      title,
      type,
      qualification,
      year,
      session,
      variant,
      fileUrl: `/resources/${title.toLowerCase().replace(/\s+/g, "_")}.pdf`,
      visibility,
      assignedClassIds: selectedClasses,
      pinned,
    });

    setIsModalOpen(false);
    setTitle("");
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <FolderDown className="h-6 w-6 text-amber-400" />
            Resource Library & Past Paper Uploader
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Upload notes, formula sheets, and solved past papers (QP, MS, Examiner Reports). You control visibility and target batches.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 rounded-2xl bg-amber-500 text-slate-950 px-4 py-2.5 text-xs font-black shadow-lg shadow-amber-500/20 hover:bg-amber-400 transition"
        >
          <Upload className="h-4 w-4" />
          <span>Upload Resource</span>
        </button>
      </div>

      {/* Resource Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((res) => {
          const assignedClassNames = classes
            .filter((c) => res.assignedClassIds.includes(c.id))
            .map((c) => c.name);

          return (
            <div key={res.id} className="rounded-2xl bg-slate-900 border border-slate-800 p-5 space-y-4 shadow-xl relative flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/30 px-2.5 py-0.5 rounded-full">
                    {res.type.replace("_", " ")}
                  </span>
                  {res.pinned && <Pin className="h-4 w-4 text-amber-400 fill-amber-400" />}
                </div>

                <h3 className="text-base font-bold text-white">{res.title}</h3>
                <p className="text-xs text-slate-400">{res.qualification}</p>

                {res.type === "past_paper" && (
                  <p className="text-xs font-mono font-bold text-cyan-400">
                    {res.year} • {res.session} • {res.variant}
                  </p>
                )}

                <div className="rounded-xl bg-slate-950 p-2.5 text-[11px] space-y-1 border border-slate-800">
                  <div className="flex justify-between text-slate-300">
                    <span className="text-slate-400">Visibility:</span>
                    <span className="font-bold text-emerald-400 uppercase">{res.visibility}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span className="text-slate-400">Assigned To:</span>
                    <span className="font-bold text-blue-400">
                      {assignedClassNames.length > 0 ? assignedClassNames.join(", ") : "All Batches"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-mono">{res.createdAt}</span>
                <a
                  href={res.fileUrl}
                  download
                  className="rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/30 px-3 py-1 font-bold hover:bg-amber-500/20"
                >
                  Download
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Upload Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-xl rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h2 className="text-xl font-extrabold text-white">Upload New Learning Resource</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-slate-400 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleUploadResource} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Resource Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Sir Asim's Nuclear Physics Revision Notes"
                  className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3.5 py-2.5 text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Type</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as Resource["type"])}
                    className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3.5 py-2.5 text-white font-bold focus:outline-none focus:ring-1 focus:ring-amber-500"
                  >
                    <option value="notes">PDF Revision Notes</option>
                    <option value="formula_sheet">Formula Sheet</option>
                    <option value="past_paper">Solved Past Paper</option>
                    <option value="worksheet">Topical Worksheet</option>
                    <option value="powerpoint">PowerPoint Slides</option>
                    <option value="video">Video Lecture Walkthrough</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Qualification Level</label>
                  <select
                    value={qualification}
                    onChange={(e) => setQualification(e.target.value as Resource["qualification"])}
                    className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3.5 py-2.5 text-white font-bold focus:outline-none focus:ring-1 focus:ring-amber-500"
                  >
                    <option value="Cambridge A-Level">Cambridge A-Level</option>
                    <option value="Cambridge O-Level">Cambridge O-Level</option>
                    <option value="IGCSE Physics">IGCSE Physics</option>
                  </select>
                </div>
              </div>

              {type === "past_paper" && (
                <div className="grid grid-cols-3 gap-3 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Year</label>
                    <input
                      type="text"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      className="w-full bg-slate-900 text-white rounded-lg p-2 border border-slate-800 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Session</label>
                    <input
                      type="text"
                      value={session}
                      onChange={(e) => setSession(e.target.value)}
                      className="w-full bg-slate-900 text-white rounded-lg p-2 border border-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Variant</label>
                    <input
                      type="text"
                      value={variant}
                      onChange={(e) => setVariant(e.target.value)}
                      className="w-full bg-slate-900 text-white rounded-lg p-2 border border-slate-800"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-slate-300 font-bold mb-1">Visibility Scope</label>
                <select
                  value={visibility}
                  onChange={(e) => setVisibility(e.target.value as Resource["visibility"])}
                  className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3.5 py-2.5 text-white font-bold focus:outline-none focus:ring-1 focus:ring-amber-500"
                >
                  <option value="class">Specific Class Batches Only</option>
                  <option value="school">Entire School / Enrolled Students</option>
                  <option value="public">Public</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Assign to Class Batches</label>
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

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="pin"
                  checked={pinned}
                  onChange={(e) => setPinned(e.target.checked)}
                  className="rounded border-slate-800 text-amber-500 focus:ring-amber-500"
                />
                <label htmlFor="pin" className="text-slate-300 font-bold cursor-pointer">
                  Pin to top of Student Resource tab
                </label>
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
                  Upload & Distribute
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
