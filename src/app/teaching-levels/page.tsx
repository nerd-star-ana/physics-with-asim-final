import Link from "next/link";
import { ArrowRight, Atom, BookOpen, GraduationCap } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";

const levels = [
  {
    title: "Cambridge IGCSE",
    board: "Cambridge",
    description: "A structured qualification pathway for students seeking exam clarity, reliable progression, and strong problem-solving confidence.",
    subjects: ["Mechanics", "Electricity", "Waves"],
    difficulty: "Foundation",
    age: "14-16",
  },
  {
    title: "Edexcel IGCSE",
    board: "Edexcel",
    description: "A polished, board-aligned support model designed to improve conceptual understanding and assessment performance.",
    subjects: ["Thermal Physics", "Measurements", "Practical Physics"],
    difficulty: "Foundation",
    age: "14-16",
  },
  {
    title: "Cambridge O Level",
    board: "Cambridge",
    description: "A refined pathway balancing academic depth with accessible teaching and exam-readiness techniques.",
    subjects: ["Modern Physics", "Space Physics", "Atomic Physics"],
    difficulty: "Foundation",
    age: "15-17",
  },
  {
    title: "Edexcel O Level",
    board: "Edexcel",
    description: "A clear route for students who need precision, consistency, and structured topic mastery across core physics content.",
    subjects: ["Waves", "Electricity", "Nuclear Physics"],
    difficulty: "Foundation",
    age: "15-17",
  },
  {
    title: "AS Level",
    board: "Cambridge / Edexcel",
    description: "A more advanced, concept-rich pathway with emphasis on mathematical interpretation and analytical thinking.",
    subjects: ["Mechanics", "Electricity", "Modern Physics"],
    difficulty: "Advanced",
    age: "16-18",
  },
  {
    title: "A Level",
    board: "Cambridge / Edexcel",
    description: "High-level support for ambitious learners preparing for rigorous, high-stakes final examination performance.",
    subjects: ["Atomic Physics", "Space Physics", "Nuclear Physics"],
    difficulty: "Advanced",
    age: "17-19",
  },
];

const icons = [Atom, BookOpen, GraduationCap];

export default function TeachingLevelsPage() {
  return (
    <div className="page-shell">
      <Section className="grid gap-8 pt-12 sm:pt-16 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
        <div>
          <SectionHeader
            eyebrow="Teaching Levels"
            title="Every level, taught with academic precision"
            description="The qualification portfolio is shaped to feel premium, curated, and confidence-building from the first lesson onward."
          />
          <div className="flex flex-wrap gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
            <span className="border border-slate-200 px-3 py-2 dark:border-slate-700">Foundation</span>
            <span className="border border-slate-200 px-3 py-2 dark:border-slate-700">Advanced</span>
          </div>
        </div>

      <div className="divide-y divide-slate-200 border-y border-slate-200 dark:divide-slate-800 dark:border-slate-800">
        {levels.map((level, index) => {
          const Icon = icons[index % icons.length];
          return (
            <article key={level.title} className="grid gap-4 py-6 sm:grid-cols-[52px_1fr]">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-amber-100 text-slate-950 dark:bg-amber-300"><Icon className="h-5 w-5" /></div>
              <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-lg font-semibold text-slate-950 dark:text-white">{level.title}</h2>
                    <span className="border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-700 dark:border-slate-700 dark:text-slate-200">{level.board}</span>
                  </div>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-700 dark:text-slate-300">{level.description}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                  {level.subjects.map((subject) => (
                    <span key={subject} className="border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-700 dark:border-slate-700 dark:text-slate-200">{subject}</span>
                  ))}
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 lg:justify-end">
                  <span className="text-xs text-slate-600 dark:text-slate-300">{level.difficulty} · {level.age}</span>
                  <Link href="/courses" className="block">
                    <Button>Explore pathway <ArrowRight className="h-4 w-4" /></Button>
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>
      </Section>
    </div>
  );
}
