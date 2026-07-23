"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  BookCheck,
  CircleHelp,
  GraduationCap,
  Layers3,
  Rocket,
  Sparkles,
  Stars,
} from "lucide-react";

import Link from "next/link";

import { ContactForm } from "@/components/ui/contact-form";
import { SectionHeader } from "@/components/ui/section-header";
import { Section } from "@/components/ui/section";
import { StatCard } from "@/components/ui/stat-card";
import { TeacherCard } from "@/components/ui/teacher-card";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollProgress } from "@/components/scroll-progress";
import { fadeInStagger, fadeInUp } from "@/lib/animations";
import { boardsCovered, faqs, learningTimeline, stats, subjectCards, testimonials } from "@/lib/site-data";
import { featureCards } from "@/lib/utils";

const featureIcons = [Sparkles, Layers3, BookCheck, Rocket, GraduationCap, Stars];

export function MarketingHomepage() {
  return (
    <div className="relative overflow-hidden">
      <ScrollProgress />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.12),transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(16,185,129,0.1),transparent_25%)]" />

      <Section className="relative pt-12">
        <div className="grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]">
          <motion.div {...fadeInUp} className="space-y-6">
            <div className="flex flex-wrap gap-2">
              <Badge>Premium Online Physics Coaching</Badge>
              <Badge>Cambridge & Edexcel</Badge>
            </div>
            <div className="space-y-4">
              <h1 className="max-w-2xl text-5xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-6xl">
                Physics with Asim
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-700 dark:text-slate-300">
                A refined learning experience focused on elegant physics thinking, exam confidence, and premium academic support for international qualifications.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/contact" className={buttonVariants({ variant: "default", size: "lg" })}>
                Book Free Trial <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/courses" className={buttonVariants({ variant: "secondary", size: "lg" })}>
                Explore Courses
              </Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {stats.map((stat) => (
                <StatCard key={stat.label} value={stat.value} label={stat.label} />
              ))}
            </div>
          </motion.div>

          <motion.div {...fadeInUp} className="relative overflow-hidden rounded-[32px] border border-indigo-200/80 bg-slate-950 p-6 shadow-2xl dark:border-indigo-900/60 sm:p-8">
            <div className="absolute inset-0 opacity-60 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:24px_24px]" />
            <div className="relative flex min-h-[420px] items-center justify-center overflow-hidden rounded-[24px] border border-white/10 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.35),transparent_40%)]">
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 14, repeat: Infinity, ease: "linear" }} className="absolute h-72 w-72 rounded-full border border-indigo-300/30" />
              <motion.div animate={{ rotate: -360 }} transition={{ duration: 18, repeat: Infinity, ease: "linear" }} className="absolute h-56 w-56 rounded-full border border-emerald-300/30" />
              <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute h-40 w-40 rounded-full border border-cyan-300/40" />
              <motion.div animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 4, repeat: Infinity }} className="absolute h-16 w-16 rounded-full bg-indigo-500/80 blur-2xl" />
              <div className="absolute left-6 top-6 rounded-full border border-white/10 bg-slate-900/80 px-3 py-1 text-xs font-semibold text-indigo-200">Electromagnetic Field</div>
              <div className="absolute bottom-6 right-6 rounded-full border border-white/10 bg-slate-900/80 px-3 py-1 text-xs font-semibold text-emerald-200">Physics in Motion</div>
              <div className="relative flex h-72 w-72 items-center justify-center rounded-full bg-slate-950/80 ring-1 ring-white/10">
                <div className="absolute h-24 w-24 rounded-full border border-cyan-200/80" />
                <div className="absolute h-[140px] w-[140px] rounded-full border border-indigo-300/50" />
                <div className="absolute h-[200px] w-[200px] rounded-full border border-emerald-300/25" />
                <motion.div animate={{ scale: [1, 1.05, 1], opacity: [0.7, 1, 0.7] }} transition={{ duration: 3.5, repeat: Infinity }} className="absolute h-4 w-4 rounded-full bg-indigo-300 shadow-[0_0_20px_rgba(99,102,241,0.8)]" />
                <motion.div animate={{ scale: [1, 1.05, 1], opacity: [0.7, 1, 0.7] }} transition={{ duration: 3.2, repeat: Infinity, delay: 0.5 }} className="absolute h-4 w-4 rounded-full bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.8)]" style={{ transform: "translate(70px, -80px)" }} />
                <motion.div animate={{ scale: [1, 1.05, 1], opacity: [0.7, 1, 0.7] }} transition={{ duration: 3.8, repeat: Infinity, delay: 0.9 }} className="absolute h-4 w-4 rounded-full bg-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.8)]" style={{ transform: "translate(-80px, 75px)" }} />
                <div className="z-10 rounded-full bg-[linear-gradient(135deg,#4338ca,#0891b2)] px-5 py-3 text-sm font-bold text-white shadow-lg">
                  Physics in Motion
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Section>

      <Section>
        <SectionHeader eyebrow="Why Choose Us" title="Structured to feel world-class" description="The teaching approach balances conceptual clarity with exam fluency so students see real progress in both confidence and performance." align="center" />
        <motion.div {...fadeInStagger} className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {featureCards.map((feature, index) => {
            const Icon = featureIcons[index % featureIcons.length];
            return (
              <motion.div key={feature.title} {...fadeInUp}>
                <Card className="h-full border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
                  <CardHeader>
                    <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300">
                      <Icon className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-lg font-bold text-slate-950 dark:text-white">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm leading-6 text-slate-700 dark:text-slate-300">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </Section>

      <Section>
        <SectionHeader eyebrow="Subjects Offered" title="Qualification coverage" description="Every major curriculum track is supported with high-quality, polished guidance and focused teaching structure." />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {subjectCards.map((subject) => (
            <Card key={subject.title} className="h-full border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-slate-950 dark:text-white">{subject.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-6 text-slate-700 dark:text-slate-300">{subject.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeader eyebrow="Boards Covered" title="Designed for international academic standards" />
        <div className="flex flex-wrap gap-3">
          {boardsCovered.map((board) => (
            <Badge key={board}>{board}</Badge>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeader eyebrow="Learning Process" title="How the tuition journey works" />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {learningTimeline.map((item, index) => (
            <Card key={item.title} className="h-full border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
              <CardHeader>
                <div className="mb-2 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Step 0{index + 1}</div>
                <CardTitle className="text-lg font-bold text-slate-950 dark:text-white">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-6 text-slate-700 dark:text-slate-300">{item.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeader eyebrow="Meet The Instructor" title="Teaching with clarity and authority" />
        <div className="grid gap-4 md:grid-cols-3">
          <TeacherCard
            name="Asim"
            role="Physics Tutor & Academic Mentor"
            description="A calm, rigorous, concept-first educator focused on making advanced physics approachable and exam-ready."
          />
          <TeacherCard
            name="Curated Learning System"
            role="Guided Progress Architecture"
            description="Every lesson sequence is designed for clarity, retention, and measurable outcomes across the academic year."
          />
          <TeacherCard
            name="Premium Student Support"
            role="Encouraging Accountability"
            description="Students gain confidence through careful feedback, structured methods, and a supportive academic environment."
          />
        </div>
      </Section>

      <Section>
        <SectionHeader eyebrow="Testimonials" title="What students feel after the sessions" align="center" />
        <div className="grid gap-4 lg:grid-cols-3">
          {testimonials.map((item) => (
            <Card key={item.name} className="h-full border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
              <CardContent className="pt-6">
                <p className="text-base leading-7 text-slate-800 dark:text-slate-200">“{item.quote}”</p>
                <div className="mt-5">
                  <div className="font-bold text-slate-950 dark:text-white">{item.name}</div>
                  <div className="text-xs font-medium text-slate-600 dark:text-slate-400">{item.role}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeader eyebrow="FAQ" title="Common questions" />
        <div className="space-y-3">
          {faqs.map((faq) => (
            <Card key={faq.question} className="border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <CircleHelp className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  <CardTitle className="text-base font-bold text-slate-950 dark:text-white">{faq.question}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-6 text-slate-700 dark:text-slate-300">{faq.answer}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeader eyebrow="Contact" title="Book your free trial lesson" description="Share your goal and the team will help shape the right next step for your journey." />
            <div className="flex flex-wrap gap-3">
              <Badge>Cambridge</Badge>
              <Badge>Edexcel</Badge>
              <Badge>AS/A Level</Badge>
            </div>
          </div>
          <Card className="border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
            <CardContent className="pt-6">
              <ContactForm />
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section className="pb-20">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 rounded-[28px] border border-indigo-200/80 bg-slate-950 px-6 py-8 text-white dark:border-indigo-900/50 shadow-xl">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-indigo-300">Start Learning</p>
            <h2 className="mt-1 text-2xl sm:text-3xl font-bold text-white">Book Your Free Trial Lesson Today</h2>
          </div>
          <Link href="/contact" className={buttonVariants({ variant: "default", size: "lg" })}>
            Book Free Trial <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>
    </div>
  );
}
