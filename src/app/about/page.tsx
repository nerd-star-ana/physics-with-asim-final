"use client";

import { motion } from "framer-motion";
import { Compass, HeartHandshake, Rocket, Sparkles } from "lucide-react";

import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";

const milestones = [
  {
    title: "Concept-first methodology",
    description: "Every lesson starts by unpacking the core physical principles behind formulas so students build durable understanding instead of surface memory.",
  },
  {
    title: "Exam confidence architecture",
    description: "The teaching rhythm combines clear explanations, past paper drills, and strategy-led practice that matches real qualification pressure.",
  },
  {
    title: "Premium mentoring culture",
    description: "Students feel supported through a calm, encouraging, and accountable environment that keeps momentum steady during busy academic terms.",
  },
];

const values = [
  {
    title: "Mission",
    description: "To guide learners through ambitious physics goals with clarity, consistency, and an elite standard of support.",
    icon: Compass,
  },
  {
    title: "Vision",
    description: "To create a globally trusted physics education brand defined by calm rigor and measurable academic confidence.",
    icon: Rocket,
  },
  {
    title: "Philosophy",
    description: "The best teaching doesn’t just explain physics; it changes the way a student thinks about problem solving.",
    icon: Sparkles,
  },
];

export default function AboutPage() {
  return (
    <div className="page-shell">
      <Section className="relative pt-12">
        <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="space-y-5">
            <p className="text-xs font-bold uppercase tracking-[0.34em] text-indigo-600 dark:text-indigo-400">About the Brand</p>
            <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-5xl">
              A story of calm academic excellence.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-slate-700 dark:text-slate-300">
              Physics with Asim blends concept-first teaching, elegant communication, and disciplined exam preparation into a high-trust online learning experience.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="relative overflow-hidden rounded-lg border border-slate-200 bg-slate-50 p-6 text-slate-950 dark:border-slate-800 dark:bg-slate-900 dark:text-white">
            <div className="relative z-10 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-600 dark:text-slate-300">Teaching Identity</p>
                  <h2 className="mt-1 text-2xl font-semibold text-slate-950 dark:text-white">Asim’s Approach</h2>
                </div>
                <div className="flex h-14 w-14 items-center justify-center rounded-md bg-amber-400 text-slate-950 font-bold text-xl">A</div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-md border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-950">
                  <p className="text-xs font-semibold text-slate-600 dark:text-slate-300">Pedagogy</p>
                  <p className="mt-1 text-base font-semibold text-slate-950 dark:text-white">Structured intuition</p>
                </div>
                <div className="rounded-md border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-950">
                  <p className="text-xs font-semibold text-slate-600 dark:text-slate-300">Outcomes</p>
                  <p className="mt-1 text-base font-semibold text-slate-950 dark:text-white">Exam readiness</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Section>

      <Section className="grid gap-8 py-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
        <div>
          <SectionHeader eyebrow="Mission" title="The reason the platform exists" description="Every teaching decision is designed to reduce overwhelm and increase clarity for students preparing for high-stakes physics qualifications." />
        </div>
        <div className="divide-y divide-slate-200 border-y border-slate-200 dark:divide-slate-800 dark:border-slate-800">
          {values.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className="grid gap-3 py-5 sm:grid-cols-[48px_1fr]">
                <Icon className="mt-1 h-5 w-5 text-amber-700 dark:text-amber-300" aria-hidden="true" />
                <div>
                  <h2 className="text-lg font-semibold text-slate-950 dark:text-white">{item.title}</h2>
                  <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-700 dark:text-slate-300">{item.description}</p>
                </div>
              </article>
            );
          })}
        </div>
      </Section>

      <section className="border-y border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
        <Section className="grid gap-8 py-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
          <SectionHeader eyebrow="Milestones" title="A teaching story shaped by progression" description="The platform combines academic rigor with emotional steadiness, translating complexity into confidence." />
          <ol className="divide-y divide-slate-200 border-y border-slate-200 dark:divide-slate-800 dark:border-slate-800">
          {milestones.map((milestone, index) => (
            <motion.li key={milestone.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className="grid gap-3 py-5 sm:grid-cols-[48px_1fr]">
              <span className="text-sm font-semibold text-amber-800 dark:text-amber-300">0{index + 1}</span>
              <div>
                <h3 className="text-lg font-semibold text-slate-950 dark:text-white">{milestone.title}</h3>
                <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-700 dark:text-slate-300">{milestone.description}</p>
              </div>
            </motion.li>
          ))}
          </ol>
        </Section>
      </section>

      <Section className="pb-20">
        <div className="grid gap-6 border-y border-slate-200 py-8 dark:border-slate-800 lg:grid-cols-[1fr_0.9fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.34em] text-indigo-600 dark:text-indigo-400">Teaching Philosophy</p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-3xl">Confidence is built through precision, not pressure.</h2>
            </div>
            <div className="border-l-2 border-amber-400 pl-5 text-sm leading-6 text-slate-800 dark:text-slate-200">
              <div className="mb-2 flex items-center gap-2 font-bold text-indigo-600 dark:text-indigo-400"><HeartHandshake className="h-4 w-4" /> Student-centered support</div>
              Students are guided through problems with a transparent method that encourages ownership, curiosity, and long-term exam confidence.
            </div>
        </div>
      </Section>
    </div>
  );
}
