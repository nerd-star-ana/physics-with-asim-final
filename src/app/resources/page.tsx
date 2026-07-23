"use client";

import { motion } from "framer-motion";
import { ArrowDownToLine, FolderOpen, PackageOpen, Sparkles } from "lucide-react";

import { SearchBar } from "@/components/search-bar";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const resources = [
  {
    title: "Revision Folder",
    category: "Concept notes",
    description: "High-signal summaries for mechanics, electricity, waves, and modern physics.",
  },
  {
    title: "Formula Pack",
    category: "Quick-reference",
    description: "Clean formula sheets built to reduce cognitive load during revision sessions.",
  },
  {
    title: "Applied Worksheet Set",
    category: "Practice",
    description: "Exam-style problem sets with guided structure and answer reasoning.",
  },
  {
    title: "Past Paper Vault",
    category: "Assessment",
    description: "A curated bank of assessment-style materials for realistic exam preparation.",
  },
];

export default function ResourcesPage() {
  return (
    <div className="page-shell">
      <Section className="pt-14">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.34em] text-amber-600 dark:text-amber-300">Resource library</p>
            <h1 className="mt-3 text-5xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-6xl">A polished digital study vault.</h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">Each folder is designed like an organized academic archive: search-friendly, retrieval-ready, and built to support steady progress.</p>
          </div>
          <div className="rounded-[30px] border border-amber-200/80 bg-[linear-gradient(135deg,rgba(251,191,36,0.18),rgba(249,115,22,0.16))] p-6 dark:border-amber-900/60">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-white/80 p-4 dark:bg-slate-950/70"><FolderOpen className="mb-3 h-5 w-5 text-amber-600" /><p className="text-sm">Organized categories</p></div>
              <div className="rounded-2xl bg-white/80 p-4 dark:bg-slate-950/70"><ArrowDownToLine className="mb-3 h-5 w-5 text-amber-600" /><p className="text-sm">Download-ready content</p></div>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeader eyebrow="Browse" title="Library categories" description="The content system is intentionally arranged for faster access and a more premium browsing experience." />
        <div className="mb-6"><SearchBar placeholder="Search resources" /></div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {resources.map((item, index) => (
            <motion.div key={item.title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }}>
              <Card className="h-full">
                <CardHeader>
                  <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300">
                    <PackageOpen className="h-5 w-5" />
                  </div>
                  <CardTitle>{item.title}</CardTitle>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-600 dark:text-sky-300">{item.category}</p>
                </CardHeader>
                <CardContent>
                  <CardDescription>{item.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section className="pb-20">
        <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
          <Card className="bg-[linear-gradient(135deg,rgba(56,189,248,0.16),rgba(14,165,233,0.08))] dark:bg-[linear-gradient(135deg,rgba(14,165,233,0.16),rgba(8,47,73,0.28))]">
            <CardHeader>
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-100 text-sky-700 dark:bg-sky-950/60 dark:text-sky-300"><Sparkles className="h-5 w-5" /></div>
              <CardTitle>Featured resource</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Exam formulation toolkit for converting problem understanding into written physics answers with clean structure.</CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent uploads</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-700 dark:text-slate-200">
              <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-900/80">Mechanics strategy notes • updated this week</div>
              <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-900/80">Electricity quick-check sheet • ready to download</div>
              <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-900/80">Modern physics recap pack • newly added</div>
            </CardContent>
          </Card>
        </div>
      </Section>
    </div>
  );
}
