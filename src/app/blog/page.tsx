"use client";

import { motion } from "framer-motion";
import { ArrowRight, NotebookPen } from "lucide-react";

import { Button } from "@/components/ui/button";
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
      <Section className="grid gap-8 pt-12 sm:pt-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <p className="text-sm uppercase tracking-[0.34em] text-orange-600 dark:text-orange-300">Blog</p>
            <h1 className="mt-3 text-5xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-6xl">Editorial insight for ambitious learners.</h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">The blog is repositioned as a premium editorial layer that surfaces teaching insight, exam thinking, and academic strategy in a more distinctive way.</p>
          </div>
          <div className="flex min-h-48 flex-col justify-between border-y border-slate-200 py-5 dark:border-slate-800" data-scroll-reveal>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-700 dark:text-slate-300"><NotebookPen className="h-4 w-4 text-amber-700 dark:text-amber-300" /> Featured article</div>
            <h2 className="mt-8 text-2xl font-semibold text-slate-950 dark:text-white">How to think in physics</h2>
          </div>
      </Section>

      <Section>
        <SectionHeader eyebrow="Latest" title="High-value editorial reads" description="Instead of a simple card feed, the content is presented with stronger hierarchy and more magazine-style rhythm." />
        <div className="divide-y divide-slate-200 border-y border-slate-200 dark:divide-slate-800 dark:border-slate-800">
          {posts.map((post, index) => (
            <motion.article key={post.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }} className="grid gap-4 py-6 md:grid-cols-[100px_1fr_auto] md:items-center">
              <div className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-800 dark:text-amber-300">{post.tag}</div>
              <div>
                <h2 className="text-xl font-semibold text-slate-950 dark:text-white">{post.title}</h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-700 dark:text-slate-300">{post.summary}</p>
              </div>
              <Button variant="secondary" className="md:w-max">Read article <ArrowRight className="h-4 w-4" /></Button>
            </motion.article>
          ))}
        </div>
      </Section>
    </div>
  );
}
