"use client";

import { motion } from "framer-motion";
import { BarChart3, TrendingUp } from "lucide-react";

import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
      <Section className="pt-14">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.34em] text-emerald-600 dark:text-emerald-300">Results</p>
            <h1 className="mt-3 text-5xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-6xl">Elegant outcomes, backed by measurable momentum.</h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">The educational journey is designed to translate clarity into real classroom performance, confidence, and consistent long-term academic growth.</p>
          </div>
          <div className="rounded-[30px] border border-emerald-200/80 bg-[linear-gradient(135deg,rgba(16,185,129,0.18),rgba(59,130,246,0.16))] p-6 dark:border-emerald-900/60">
            <div className="mb-4 flex items-center gap-2 text-emerald-700 dark:text-emerald-300"><TrendingUp className="h-4 w-4" /> Learning momentum</div>
            <div className="rounded-2xl bg-white/75 p-4 dark:bg-slate-950/70">
              <div className="flex h-44 items-end gap-3">
                <div className="w-full rounded-t-2xl bg-sky-400/80" style={{ height: "42%" }} />
                <div className="w-full rounded-t-2xl bg-emerald-400/80" style={{ height: "64%" }} />
                <div className="w-full rounded-t-2xl bg-violet-400/80" style={{ height: "78%" }} />
                <div className="w-full rounded-t-2xl bg-amber-400/80" style={{ height: "94%" }} />
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div className="mb-6 grid gap-4 sm:grid-cols-3">
          <StatCard value="95%" label="Course confidence" />
          <StatCard value="8+" label="Qualifications covered" />
          <StatCard value="1:1" label="Mentoring rhythm" />
        </div>
      </Section>

      <Section>
        <SectionHeader eyebrow="Impact" title="How the results are felt" description="The goal is not only to teach physics, but to create sustainable academic confidence for the learner." />
        <div className="grid gap-4 md:grid-cols-2">
          {outcomeStories.map((story, index) => (
            <motion.div key={story.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }}>
              <Card className="h-full">
                <CardHeader>
                  <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                    <BarChart3 className="h-5 w-5" />
                  </div>
                  <CardTitle>{story.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{story.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>
    </div>
  );
}
