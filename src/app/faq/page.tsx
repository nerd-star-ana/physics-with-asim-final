"use client";

import { useState } from "react";
import { ChevronDown, CircleHelp } from "lucide-react";

import { SearchBar } from "@/components/search-bar";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";

const faqs = [
  {
    question: "How do I know which identification route fits my child?",
    answer: "We recommend mapping the course to the student’s curriculum, current academic level, and confidence profile during an initial consultation.",
  },
  {
    question: "Do classes support exam preparation?",
    answer: "Yes. Every lesson is structured around exam fluency, formal problem-solving, and layered revision so students improve both confidence and measurable accuracy.",
  },
  {
    question: "Can classes be scheduled flexibly?",
    answer: "Yes. The teaching rhythm remains adaptable for busy students and families, while maintaining consistency in progress and support.",
  },
  {
    question: "What makes the tuition experience premium?",
    answer: "The experience combines concept-first pedagogy, polished delivery, targeted assessment support, and consistent academic mentoring across each qualification route.",
  },
];

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="page-shell">
      <Section className="pt-14">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.34em] text-cyan-600 dark:text-cyan-300">FAQ</p>
            <h1 className="mt-3 text-5xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-6xl">Answers designed to remove friction.</h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">This page moves away from a static list and becomes a guided support experience with a more editorial and confidence-led rhythm.</p>
          </div>
          <div className="rounded-[30px] border border-cyan-200/80 bg-[linear-gradient(135deg,rgba(56,189,248,0.18),rgba(6,182,212,0.12))] p-6 dark:border-cyan-900/60">
            <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-cyan-800 dark:text-cyan-300"><CircleHelp className="h-4 w-4" /> Guided support</div>
            <div className="mt-4 rounded-[24px] bg-white/90 p-4 border border-cyan-100 text-sm font-medium text-slate-900 dark:bg-slate-950/80 dark:text-slate-100 dark:border-slate-800">Everything is arranged to answer the common questions a parent or student would have before taking the next step.</div>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeader eyebrow="Questions" title="Modern answers, not generic blocks" description="The FAQ becomes a refined support surface with clear hierarchy, layered thinking, and a more comfortable browsing rhythm." />
        <div className="mb-6"><SearchBar placeholder="Search questions" /></div>
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <Card key={faq.question} className="overflow-hidden">
                <button type="button" aria-expanded={isOpen} onClick={() => setOpenIndex(isOpen ? null : index)} className="flex w-full items-center justify-between gap-4 p-6 text-left">
                  <div className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-cyan-100 text-cyan-700 dark:bg-cyan-950/60 dark:text-cyan-300"><CircleHelp className="h-4 w-4" /></span>
                    <div>
                      <CardTitle className="text-base">{faq.question}</CardTitle>
                    </div>
                  </div>
                  <ChevronDown className={`h-5 w-5 shrink-0 transition ${isOpen ? "rotate-180" : ""}`} />
                </button>
                {isOpen ? (
                  <CardContent className="pt-0">
                    <CardDescription>{faq.answer}</CardDescription>
                  </CardContent>
                ) : null}
              </Card>
            );
          })}
        </div>
      </Section>
    </div>
  );
}
