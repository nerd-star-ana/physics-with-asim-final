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
      <Section className="grid gap-8 pt-12 sm:pt-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <p className="text-sm uppercase tracking-[0.34em] text-amber-600 dark:text-amber-300">Resource library</p>
            <h1 className="mt-3 text-5xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-6xl">A polished digital study vault.</h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">Each folder is designed like an organized academic archive: search-friendly, retrieval-ready, and built to support steady progress.</p>
            <div className="mt-6 flex flex-wrap gap-2">
              <a href="#library" className="rounded-md bg-slate-950 px-4 py-2 text-sm font-semibold text-white dark:bg-white dark:text-slate-950">Browse library</a>
              <a href="#recent" className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-900 dark:border-slate-700 dark:text-slate-100">Recent uploads</a>
            </div>
          </div>
          <div className="grid grid-cols-2 border-y border-slate-200 py-5 dark:border-slate-800">
              <div className="border-r border-slate-200 pr-5 dark:border-slate-800"><FolderOpen className="mb-4 h-5 w-5 text-amber-700 dark:text-amber-300" /><p className="text-sm font-semibold text-slate-950 dark:text-white">Organized categories</p></div>
              <div className="pl-5"><ArrowDownToLine className="mb-4 h-5 w-5 text-amber-700 dark:text-amber-300" /><p className="text-sm font-semibold text-slate-950 dark:text-white">Download-ready content</p></div>
            </div>
      </Section>

      <section id="library" className="border-y border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
        <Section className="grid gap-8 py-12 lg:grid-cols-[220px_1fr] lg:gap-14">
          <aside className="self-start lg:sticky lg:top-24">
            <SectionHeader eyebrow="Browse" title="Library" />
            <SearchBar placeholder="Search resources" />
            <nav aria-label="Resource categories" className="mt-6 divide-y divide-slate-200 border-y border-slate-200 dark:divide-slate-800 dark:border-slate-800">
              {resources.map((item, index) => (
                <a key={item.title} href={`#resource-${index + 1}`} className="flex items-center justify-between gap-3 py-3 text-sm font-medium text-slate-700 transition-colors hover:text-slate-950 dark:text-slate-300 dark:hover:text-white">
                  <span>{item.title}</span><span className="text-xs text-amber-800 dark:text-amber-300">0{index + 1}</span>
                </a>
              ))}
            </nav>
          </aside>
          <div>
            <SectionHeader eyebrow="Browse" title="Library categories" description="The content system is intentionally arranged for faster access and a more premium browsing experience." />
            <div className="divide-y divide-slate-200 border-y border-slate-200 dark:divide-slate-800 dark:border-slate-800">
              {resources.map((item, index) => (
                <motion.article id={`resource-${index + 1}`} key={item.title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }} className="grid gap-4 py-6 sm:grid-cols-[52px_1fr]">
                  <span className="text-sm font-semibold text-amber-800 dark:text-amber-300">0{index + 1}</span>
                  <div className="grid gap-3 md:grid-cols-[1fr_auto] md:items-center">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-600 dark:text-slate-400">{item.category}</p>
                      <h3 className="mt-1 text-lg font-semibold text-slate-950 dark:text-white">{item.title}</h3>
                      <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-700 dark:text-slate-300">{item.description}</p>
                    </div>
                    <PackageOpen className="h-5 w-5 text-amber-700 dark:text-amber-300" aria-hidden="true" />
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </Section>
      </section>

      <Section id="recent" className="grid gap-6 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:py-20">
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
      </Section>
    </div>
  );
}
