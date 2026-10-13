"use client";

import { motion } from "framer-motion";
import { BarChart3, TrendingUp } from "lucide-react";

import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { StatCard } from "@/components/ui/stat-card";

const outcomeStories = [
  {
    title: "Higher confidence under pressure",
    description: "Students report stronger exam formulation and calmer problem-solving behavior after a short plateau-busting period.",
  },
  {
    title: "More visible academic momentum",
    description: "The structured rhythm encourages consistency, sustained revision behavior, and better time management in the learning cycle.",
  },
];

export default function ResultsPage() {
  return (
    <div className="page-shell">
      <Section className="grid gap-8 pt-12 sm:pt-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <p className="text-sm uppercase tracking-[0.34em] text-emerald-600 dark:text-emerald-300">Results</p>
            <h1 className="mt-3 text-5xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-6xl">Elegant outcomes, backed by measurable momentum.</h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">The educational journey is designed to translate clarity into real classroom performance, confidence, and consistent long-term academic growth.</p>
          </div>
          <div className="border-y border-slate-200 py-5 dark:border-slate-800" data-scroll-reveal>
            <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-700 dark:text-slate-300"><TrendingUp className="h-4 w-4 text-amber-700 dark:text-amber-300" /> Learning momentum</div>
            <div className="border-t border-slate-200 pt-4 dark:border-slate-800">
              <div className="flex h-44 items-end gap-3">
                <div className="w-full rounded-t-2xl bg-sky-500/80" style={{ height: "42%" }} />
                <div className="w-full rounded-t-2xl bg-emerald-500/80" style={{ height: "64%" }} />
                <div className="w-full rounded-t-2xl bg-violet-500/80" style={{ height: "78%" }} />
                <div className="w-full rounded-t-2xl bg-amber-500/80" style={{ height: "94%" }} />
              </div>
            </div>
          </div>
      </Section>

      <section className="border-y border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
        <Section className="grid gap-0 py-8 sm:grid-cols-3">
          <StatCard value="95%" label="Course confidence" />
          <StatCard value="8+" label="Qualifications covered" />
          <StatCard value="1:1" label="Mentoring rhythm" />
        </Section>
      </section>

      <Section>
        <SectionHeader eyebrow="Impact" title="How the results are felt" description="The goal is not only to teach physics, but to create sustainable academic confidence for the learner." />
        <div className="divide-y divide-slate-200 border-y border-slate-200 md:grid md:grid-cols-2 md:divide-x md:divide-y-0 dark:divide-slate-800 dark:border-slate-800">
          {outcomeStories.map((story, index) => (
            <motion.div key={story.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }}>
              <article className="py-6 md:px-6 first:pl-0 last:pr-0">
                <BarChart3 className="mb-4 h-5 w-5 text-amber-700 dark:text-amber-300" />
                <h3 className="text-lg font-semibold text-slate-950 dark:text-white">{story.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">{story.description}</p>
              </article>
            </motion.div>
          ))}
        </div>
      </Section>
    </div>
  );
}
