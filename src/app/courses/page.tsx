"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Layers3, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
      <Section className="grid gap-8 pt-12 sm:pt-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div className="space-y-5" data-scroll-reveal>
            <p className="text-sm uppercase tracking-[0.34em] text-violet-600 dark:text-violet-300">Course magazine</p>
            <h1 className="text-5xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-6xl">Academic pathways, designed like editorial features.</h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">Each course is strategically framed to feel distinct, polished, and purposeful rather than like a generic list of modules.</p>
            <div className="flex flex-wrap gap-2 pt-2">
              <Link href="#pathways" className="rounded-md bg-slate-950 px-4 py-2 text-sm font-semibold text-white dark:bg-white dark:text-slate-950">Browse pathways</Link>
              <Link href="#outcomes" className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-900 dark:border-slate-700 dark:text-slate-100">Learning outcomes</Link>
            </div>
          </div>
          <div className="grid grid-cols-2 border-y border-slate-200 py-5 dark:border-slate-800" data-scroll-reveal>
            <div className="border-r border-slate-200 pr-5 dark:border-slate-800">
              <p className="text-xs font-semibold text-slate-600 dark:text-slate-300">Qualification coverage</p>
              <p className="mt-2 text-3xl font-semibold text-slate-950 dark:text-white">8+</p>
            </div>
            <div className="pl-5">
              <p className="text-xs font-semibold text-slate-600 dark:text-slate-300">Custom pacing</p>
              <p className="mt-2 text-3xl font-semibold text-slate-950 dark:text-white">Weekly</p>
            </div>
          </div>
      </Section>

      <section id="pathways" className="border-y border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
        <Section className="grid gap-8 py-12 lg:grid-cols-[220px_1fr] lg:gap-14">
          <aside className="self-start lg:sticky lg:top-24" data-scroll-reveal>
            <SectionHeader eyebrow="Course index" title="Pathways" />
            <nav aria-label="Course pathways" className="divide-y divide-slate-200 border-y border-slate-200 dark:divide-slate-800 dark:border-slate-800">
              {courses.map((course, index) => (
                <a key={course.title} href={`#course-${index + 1}`} className="flex items-center justify-between gap-3 py-3 text-sm font-medium text-slate-700 transition-colors hover:text-slate-950 dark:text-slate-300 dark:hover:text-white">
                  <span>{course.title}</span><span className="text-xs text-amber-800 dark:text-amber-300">0{index + 1}</span>
                </a>
              ))}
            </nav>
          </aside>
          <div>
            <SectionHeader eyebrow="Featured pathways" title="A magazine-style route map" description="The course experience balances deeper learning outcomes, editorial presentation, and smooth progression between topics." />
            <div className="divide-y divide-slate-200 border-y border-slate-200 dark:divide-slate-800 dark:border-slate-800">
          {courses.map((course, index) => (
            <motion.article id={`course-${index + 1}`} key={course.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className="grid gap-5 py-7 lg:grid-cols-[1fr_0.8fr_auto] lg:items-center">
                  <div>
                    <div className="mb-2 flex items-center gap-3">
                      <span className="text-xs font-semibold text-amber-800 dark:text-amber-300">0{index + 1}</span>
                      <span className={`h-1 w-10 bg-gradient-to-r ${course.accent}`} />
                      <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">{course.range}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-slate-950 dark:text-white">{course.title}</h3>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-700 dark:text-slate-300">{course.overview}</p>
                  </div>
                  <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-1">
                    {course.outcomes.map((outcome) => (
                      <div key={outcome} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                        <Sparkles className="h-4 w-4 shrink-0 text-amber-700 dark:text-amber-300" />
                        {outcome}
                      </div>
                    ))}
                  </div>
                  <Link href="/contact" className="block lg:w-max">
                    <Button className="w-full">View pathway <ArrowRight className="h-4 w-4" /></Button>
                  </Link>
            </motion.article>
          ))}
            </div>
          </div>
        </Section>
      </section>

      <Section id="outcomes" className="grid gap-8 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:py-20">
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
      </Section>
    </div>
  );
}
