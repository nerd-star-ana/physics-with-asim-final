"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Layers3, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";

const courses = [
  {
    title: "IGCSE Core Pathway",
    range: "Cambridge & Edexcel",
    accent: "from-sky-500 to-cyan-400",
    overview: "A broad, exam-ready progression built around concept integrity, structured revision, and confidence under time pressure.",
    outcomes: ["Mechanics mastery", "Energy fluency", "Exam technique"],
  },
  {
    title: "O Level Precision Track",
    range: "Cambridge & Edexcel",
    accent: "from-amber-500 to-orange-400",
    overview: "A polished route for learners who need clarity, strong pacing, and steady support across challenging topics.",
    outcomes: ["Comprehension drills", "Practical reasoning", "Solution structure"],
  },
  {
    title: "AS Level Depth Programme",
    range: "Advanced pathway",
    accent: "from-violet-500 to-fuchsia-500",
    overview: "A more advanced, mathematically rich experience that sharpens interpretive ability and board-level reasoning.",
    outcomes: ["Higher-order analysis", "Graph reading", "Concept transfer"],
  },
];

export default function CoursesPage() {
  return (
    <div className="page-shell">
      <Section className="pt-14">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
          <div className="space-y-5">
            <p className="text-sm uppercase tracking-[0.34em] text-violet-600 dark:text-violet-300">Course magazine</p>
            <h1 className="text-5xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-6xl">Academic pathways, designed like editorial features.</h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">Each course is strategically framed to feel distinct, polished, and purposeful rather than like a generic list of modules.</p>
          </div>
          <div className="rounded-[30px] border border-violet-200/80 bg-[linear-gradient(135deg,rgba(124,58,237,0.16),rgba(59,130,246,0.16))] p-6 dark:border-violet-900/60">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-white/80 p-4 dark:bg-slate-950/70">
                <p className="text-sm text-slate-500 dark:text-slate-300">Qualification coverage</p>
                <p className="mt-2 text-2xl font-semibold">8+</p>
              </div>
              <div className="rounded-2xl bg-white/80 p-4 dark:bg-slate-950/70">
                <p className="text-sm text-slate-500 dark:text-slate-300">Custom pacing</p>
                <p className="mt-2 text-2xl font-semibold">Weekly</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeader eyebrow="Featured pathways" title="A magazine-style route map" description="The course experience balances deeper learning outcomes, editorial presentation, and smooth progression between topics." />
        <div className="grid gap-4 xl:grid-cols-3">
          {courses.map((course, index) => (
            <motion.div key={course.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }}>
              <Card className="h-full overflow-hidden">
                <div className={`h-2 bg-gradient-to-r ${course.accent}`} />
                <CardHeader>
                  <div className="flex items-center justify-between gap-3">
                    <CardTitle>{course.title}</CardTitle>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-900 dark:text-slate-200">{course.range}</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription>{course.overview}</CardDescription>
                  <div className="space-y-2">
                    {course.outcomes.map((outcome) => (
                      <div key={outcome} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                        <Sparkles className="h-4 w-4 text-violet-500" />
                        {outcome}
                      </div>
                    ))}
                  </div>
                  <Link href="/contact" className="block">
                    <Button className="w-full">View pathway <ArrowRight className="h-4 w-4" /></Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section className="pb-20">
        <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <Card className="h-full bg-[linear-gradient(135deg,rgba(56,189,248,0.16),rgba(14,116,144,0.12))] dark:bg-[linear-gradient(135deg,rgba(14,116,144,0.22),rgba(30,64,175,0.18))]">
            <CardHeader>
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-700 dark:bg-cyan-950/60 dark:text-cyan-300">
                <BookOpen className="h-5 w-5" />
              </div>
              <CardTitle>Learning outcomes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm text-slate-700 dark:text-slate-200">
                <div className="rounded-2xl bg-white/70 p-4 dark:bg-slate-950/70">Concept clarity at the start of each topic block.</div>
                <div className="rounded-2xl bg-white/70 p-4 dark:bg-slate-950/70">Exam technique integrated into every practice cycle.</div>
                <div className="rounded-2xl bg-white/70 p-4 dark:bg-slate-950/70">Progressive challenge increase without losing student confidence.</div>
              </div>
            </CardContent>
          </Card>

          <Card className="h-full">
            <CardHeader>
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-100 text-violet-700 dark:bg-violet-950/60 dark:text-violet-300">
                <Layers3 className="h-5 w-5" />
              </div>
              <CardTitle>Curriculum comparison</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-900/80">
                <p className="text-sm text-slate-500 dark:text-slate-300">Foundation</p>
                <p className="mt-2 font-semibold text-slate-950 dark:text-white">Strong conceptual scaffolding</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-900/80">
                <p className="text-sm text-slate-500 dark:text-slate-300">Advanced</p>
                <p className="mt-2 font-semibold text-slate-950 dark:text-white">Higher-order mathematical interpretation</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </Section>
    </div>
  );
}
