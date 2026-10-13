"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck, FileSpreadsheet, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";

const steps = [
  {
    title: "Registration",
    description: "Begin with a short intake conversation and student goal discussion.",
    accent: "from-sky-500 to-cyan-400",
  },
  {
    title: "Trial Lesson",
    description: "Each student is invited to experience the delivery style before enrollment.",
    accent: "from-emerald-500 to-teal-400",
  },
  {
    title: "Academic Placement",
    description: "The best-fit learning pathway is then mapped to the student’s syllabus and pace.",
    accent: "from-violet-500 to-fuchsia-400",
  },
];

export default function AdmissionsPage() {
  return (
    <div className="page-shell">
      <Section className="grid gap-8 pt-12 sm:pt-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <p className="text-sm uppercase tracking-[0.34em] text-sky-600 dark:text-sky-300">Admissions</p>
            <h1 className="mt-3 text-5xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-6xl">From inquiry to a clear academic pathway.</h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">The admissions flow is framed as a calm decision journey: understand the learner, experience the teaching style, then lock into a roadmap that feels tailored.</p>
          </div>
          <div className="border-y border-slate-200 py-5 dark:border-slate-800">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-600 dark:text-slate-300">Enrollment flow</p>
              <ol className="mt-4 divide-y divide-slate-200 dark:divide-slate-800">
                <li className="flex items-center gap-2 py-3 text-sm font-medium text-slate-900 dark:text-slate-200"><BadgeCheck className="h-4 w-4 text-emerald-600" /> Intake guidance</li>
                <li className="flex items-center gap-2 py-3 text-sm font-medium text-slate-900 dark:text-slate-200"><BadgeCheck className="h-4 w-4 text-emerald-600" /> Trial session</li>
                <li className="flex items-center gap-2 py-3 text-sm font-medium text-slate-900 dark:text-slate-200"><BadgeCheck className="h-4 w-4 text-emerald-600" /> Placement roadmap</li>
              </ol>
          </div>
      </Section>

      <section className="border-y border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
        <Section className="grid gap-8 py-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
          <SectionHeader eyebrow="Journey" title="A premium enrollment structure" description="This route avoids the feel of a plain process page by turning the flow into a guided academic decision surface." />
          <ol className="divide-y divide-slate-200 border-y border-slate-200 dark:divide-slate-800 dark:border-slate-800">
          {steps.map((step, index) => (
            <motion.li key={step.title} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }} className="grid gap-3 py-6 sm:grid-cols-[56px_1fr]">
              <span className="text-sm font-semibold text-amber-800 dark:text-amber-300">0{index + 1}</span>
              <div>
                <span className={`mb-3 block h-1 w-12 bg-gradient-to-r ${step.accent}`} />
                <h3 className="text-xl font-semibold text-slate-950 dark:text-white">{step.title}</h3>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-700 dark:text-slate-300">{step.description}</p>
              </div>
            </motion.li>
          ))}
          </ol>
        </Section>
      </section>

      <Section className="grid gap-6 py-16 lg:grid-cols-[1fr_1fr] lg:py-20">
          <Card className="bg-[linear-gradient(135deg,rgba(56,189,248,0.16),rgba(14,165,233,0.08))] dark:bg-[linear-gradient(135deg,rgba(14,165,233,0.16),rgba(8,47,73,0.28))]">
            <CardHeader>
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-100 text-sky-700 dark:bg-sky-950/60 dark:text-sky-300"><FileSpreadsheet className="h-5 w-5" /></div>
              <CardTitle>What happens next</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>After the consultation, the learner receives a clear academic recommendation with a pacing map, expected outcomes, and a next-step support plan.</CardDescription>
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <CardHeader>
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-100 text-violet-700 dark:bg-violet-950/60 dark:text-violet-300"><Sparkles className="h-5 w-5" /></div>
              <CardTitle>Start with confidence</CardTitle>
            </CardHeader>
            <CardContent>
              <Link href="/contact" className="block">
                <Button className="w-full">Request a trial class <ArrowRight className="h-4 w-4" /></Button>
              </Link>
            </CardContent>
          </Card>
      </Section>
    </div>
  );
}
