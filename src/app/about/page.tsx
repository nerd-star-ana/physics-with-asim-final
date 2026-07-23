"use client";

import { motion } from "framer-motion";
import { Compass, HeartHandshake, Rocket, Sparkles } from "lucide-react";

import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

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

          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.45 }} className="relative overflow-hidden rounded-[32px] border border-indigo-200/80 bg-gradient-to-br from-indigo-600 via-indigo-700 to-slate-900 p-6 text-white shadow-xl dark:border-indigo-900/60 dark:from-slate-950 dark:to-slate-950">
            <div className="relative z-10 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.34em] text-indigo-100 dark:text-indigo-300">Teaching Identity</p>
                  <h2 className="mt-1 text-2xl font-bold text-white">Asim’s Approach</h2>
                </div>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-indigo-700 font-extrabold text-xl shadow-md dark:bg-indigo-600 dark:text-white">A</div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
                  <p className="text-xs font-semibold text-indigo-100 dark:text-indigo-200">Pedagogy</p>
                  <p className="mt-1 text-base font-bold text-white">Structured intuition</p>
                </div>
                <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
                  <p className="text-xs font-semibold text-indigo-100 dark:text-indigo-200">Outcomes</p>
                  <p className="mt-1 text-base font-bold text-white">Exam readiness</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Section>

      <Section className="pt-2">
        <SectionHeader eyebrow="Mission" title="The reason the platform exists" description="Every teaching decision is designed to reduce overwhelm and increase clarity for students preparing for high-stakes physics qualifications." />
        <div className="grid gap-4 lg:grid-cols-3">
          {values.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.title} className="h-full border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
                <CardHeader>
                  <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-xl font-bold text-slate-950 dark:text-white">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-6 text-slate-700 dark:text-slate-300">{item.description}</CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </Section>

      <Section>
        <SectionHeader eyebrow="Milestones" title="A teaching story shaped by progression" description="The platform combines academic rigor with emotional steadiness, translating complexity into confidence." />
        <div className="grid gap-4 md:grid-cols-3">
          {milestones.map((milestone, index) => (
            <motion.div key={milestone.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }}>
              <Card className="h-full border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
                <CardHeader>
                  <div className="mb-2 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">0{index + 1}</div>
                  <CardTitle className="text-xl font-bold text-slate-950 dark:text-white">{milestone.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-6 text-slate-700 dark:text-slate-300">{milestone.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section className="pb-20">
        <div className="rounded-[32px] border border-indigo-200 bg-indigo-50/80 p-6 dark:border-indigo-900/60 dark:bg-indigo-950/40">
          <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.34em] text-indigo-600 dark:text-indigo-400">Teaching Philosophy</p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-3xl">Confidence is built through precision, not pressure.</h2>
            </div>
            <div className="rounded-[24px] bg-white p-5 text-sm leading-6 text-slate-800 dark:bg-slate-900 dark:text-slate-200">
              <div className="mb-2 flex items-center gap-2 font-bold text-indigo-600 dark:text-indigo-400"><HeartHandshake className="h-4 w-4" /> Student-centered support</div>
              Students are guided through problems with a transparent method that encourages ownership, curiosity, and long-term exam confidence.
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
