"use client";

import { motion } from "framer-motion";
import { ArrowRight, NotebookPen } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";

const posts = [
  {
    title: "How to Think in Physics",
    summary: "An editorial-style guide to building intuition rather than memorizing formulas.",
    tag: "Insight",
  },
  {
    title: "Exam Strategy for Mechanics",
    summary: "A premium breakdown of how to approach high-scoring problem solving with clarity.",
    tag: "Strategy",
  },
  {
    title: "The Role of Visual Learning in Physics",
    summary: "Why elegant visual thinking is one of the best accelerators for student confidence.",
    tag: "Teaching",
  },
];

export default function BlogPage() {
  return (
    <div className="page-shell">
      <Section className="pt-14">
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.34em] text-orange-600 dark:text-orange-300">Blog</p>
            <h1 className="mt-3 text-5xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-6xl">Editorial insight for ambitious learners.</h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">The blog is repositioned as a premium editorial layer that surfaces teaching insight, exam thinking, and academic strategy in a more distinctive way.</p>
          </div>
          <div className="rounded-[30px] border border-orange-200/80 bg-[linear-gradient(135deg,rgba(249,115,22,0.16),rgba(251,191,36,0.16))] p-6 dark:border-orange-900/60">
            <div className="rounded-[24px] bg-white/90 p-5 border border-orange-100 text-slate-950 dark:bg-slate-950/80 dark:text-white dark:border-slate-800">
              <div className="flex items-center gap-2 text-orange-700 dark:text-orange-300 font-bold text-xs uppercase tracking-wider"><NotebookPen className="h-4 w-4" /> Featured article</div>
              <h2 className="mt-2 text-2xl font-bold text-slate-950 dark:text-white">How to think in physics</h2>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeader eyebrow="Latest" title="High-value editorial reads" description="Instead of a simple card feed, the content is presented with stronger hierarchy and more magazine-style rhythm." />
        <div className="grid gap-4 md:grid-cols-3">
          {posts.map((post, index) => (
            <motion.div key={post.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }}>
              <Card className="h-full">
                <CardHeader>
                  <div className="text-xs font-semibold uppercase tracking-[0.3em] text-orange-600 dark:text-orange-300">{post.tag}</div>
                  <CardTitle>{post.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription>{post.summary}</CardDescription>
                  <Button variant="secondary" className="w-full">Read article <ArrowRight className="h-4 w-4" /></Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>
    </div>
  );
}
