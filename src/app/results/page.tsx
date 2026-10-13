"use client";

import { motion } from "framer-motion";
import { BarChart3, TrendingUp } from "lucide-react";

import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { outcomeStories } from "@/lib/site-data";

export default function ResultsPage() {
  return (
    <div className="page-shell">
      <Section className="grid gap-8 pt-12 sm:pt-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.1em] text-[var(--color-secondary)]">Academic results</p>
            <h1 className="mt-3 text-4xl font-bold leading-tight text-[var(--color-primary)] sm:text-5xl">CAIE Physics Results</h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-[var(--color-text)]">Celebrating student progress and achievements.</p>
          </div>
          <div className="border-y border-[var(--color-border)] py-5" data-scroll-reveal>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em] text-[var(--color-secondary)]"><TrendingUp className="h-4 w-4" /> Learning momentum</div>
            <p className="mt-4 border-t border-[var(--color-border)] pt-4 text-base leading-7 text-[var(--color-text)]">
              The goal is not only to teach physics, but to create sustainable academic confidence for the learner.
            </p>
          </div>
      </Section>

      <Section>
        <SectionHeader eyebrow="Impact" title="How the results are felt" description="The educational journey is designed to translate clarity into real classroom performance, confidence, and consistent long-term academic growth." />
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
