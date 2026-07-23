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
      <Section className="pt-14">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.34em] text-sky-600 dark:text-sky-300">Admissions</p>
            <h1 className="mt-3 text-5xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-6xl">From inquiry to a clear academic pathway.</h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">The admissions flow is framed as a calm decision journey: understand the learner, experience the teaching style, then lock into a roadmap that feels tailored.</p>
          </div>
          <div className="rounded-[30px] border border-sky-200/80 bg-[linear-gradient(135deg,rgba(59,130,246,0.16),rgba(34,211,238,0.12))] p-6 dark:border-sky-900/60">
            <div className="rounded-[24px] bg-white/90 p-5 border border-sky-100 text-slate-950 dark:bg-slate-950/80 dark:text-white dark:border-slate-800">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-sky-700 dark:text-sky-300">Enrollment flow</p>
              <div className="mt-4 space-y-3 text-sm font-medium text-slate-900 dark:text-slate-200">
                <div className="flex items-center gap-2"><BadgeCheck className="h-4 w-4 text-emerald-600" /> Intake guidance</div>
                <div className="flex items-center gap-2"><BadgeCheck className="h-4 w-4 text-emerald-600" /> Trial session</div>
                <div className="flex items-center gap-2"><BadgeCheck className="h-4 w-4 text-emerald-600" /> Placement roadmap</div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeader eyebrow="Journey" title="A premium enrollment structure" description="This route avoids the feel of a plain process page by turning the flow into a guided academic decision surface." />
        <div className="grid gap-4 md:grid-cols-3">
          {steps.map((step, index) => (
            <motion.div key={step.title} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }}>
              <Card className="h-full overflow-hidden">
                <div className={`h-2 bg-gradient-to-r ${step.accent}`} />
                <CardHeader>
                  <div className="mb-2 text-sm font-semibold text-sky-700 dark:text-sky-300">0{index + 1}</div>
                  <CardTitle>{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{step.description}</CardDescription>
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
        </div>
      </Section>
    </div>
  );
}
