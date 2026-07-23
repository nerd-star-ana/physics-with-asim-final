import Link from "next/link";
import { ArrowRight, Atom, BookOpen, GraduationCap } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
    <Section>
      <SectionHeader
        eyebrow="Teaching Levels"
        title="Every level, taught with academic precision"
        description="The qualification portfolio is shaped to feel premium, curated, and confidence-building from the first lesson onward."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {levels.map((level, index) => {
          const Icon = icons[index % icons.length];
          return (
            <Card key={level.title} className="group relative overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_80px_rgba(37,99,235,0.18)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.18),transparent_30%)] opacity-80" />
              <CardHeader className="relative">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-sky-700 dark:bg-sky-900/50 dark:text-sky-200">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex items-center justify-between gap-3">
                  <CardTitle>{level.title}</CardTitle>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-900 dark:text-slate-200">{level.board}</span>
                </div>
              </CardHeader>
              <CardContent className="relative space-y-4">
                <CardDescription>{level.description}</CardDescription>
                <div className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                  <div className="flex items-center justify-between"><span>Difficulty</span><span>{level.difficulty}</span></div>
                  <div className="flex items-center justify-between"><span>Recommended age</span><span>{level.age}</span></div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {level.subjects.map((subject) => (
                    <span key={subject} className="rounded-full border border-sky-200 px-3 py-1 text-xs font-medium text-sky-700 dark:border-sky-900 dark:text-sky-200">{subject}</span>
                  ))}
                </div>
                <Link href="/courses" className="block">
                  <Button className="w-full">Explore pathway <ArrowRight className="h-4 w-4" /></Button>
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </Section>
  );
}
