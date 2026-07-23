"use client";

import { motion } from "framer-motion";
import { ImageIcon } from "lucide-react";

import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const galleryItems = [
  {
    title: "Classroom Moments",
    description: "A curated look at interactive lesson environments and student collaboration.",
    tone: "bg-sky-100/70 text-sky-700 dark:bg-sky-950/60 dark:text-sky-200",
  },
  {
    title: "Events",
    description: "Celebrating student milestones, workshop moments, and academic achievements.",
    tone: "bg-emerald-100/70 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-200",
  },
  {
    title: "Student Work",
    description: "Examples of polished question-solving, structured revision, and concept mastery.",
    tone: "bg-violet-100/70 text-violet-700 dark:bg-violet-950/60 dark:text-violet-200",
  },
];

export default function GalleryPage() {
  return (
    <div className="page-shell">
      <Section className="pt-14">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.34em] text-violet-600 dark:text-violet-300">Gallery</p>
            <h1 className="mt-3 text-5xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-6xl">A visual rhythm of progress and momentum.</h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">The gallery becomes a visual story surface rather than a static list, using layout contrast and mood to make each category feel distinct.</p>
          </div>
          <div className="rounded-[30px] border border-violet-200/80 bg-[linear-gradient(135deg,rgba(124,58,237,0.16),rgba(56,189,248,0.14))] p-6 dark:border-violet-900/60">
            <div className="h-52 rounded-[24px] bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.34),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(124,58,237,0.32),transparent_35%),linear-gradient(135deg,#0f172a,#1d4ed8)]" />
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeader eyebrow="Showcase" title="Curated moments from the learning journey" description="The goal is to present the platform as a living, polished ecosystem, not a plain archive." />
        <div className="grid gap-4 md:grid-cols-3">
          {galleryItems.map((item, index) => (
            <motion.div key={item.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }}>
              <Card className="h-full overflow-hidden">
                <div className="p-6">
                  <div className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl ${item.tone}`}>
                    <ImageIcon className="h-5 w-5" />
                  </div>
                </div>
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{item.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>
    </div>
  );
}
