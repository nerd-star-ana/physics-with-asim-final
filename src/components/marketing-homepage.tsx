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

      <Section className="relative pt-16 sm:pt-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]">
          <motion.div {...fadeInUp} className="space-y-6">
            <div className="flex flex-wrap gap-2">
              <Badge>Premium Online Physics Coaching</Badge>
              <Badge>Cambridge & Edexcel</Badge>
            </div>
            <div className="space-y-4">
              <h1 className="max-w-2xl text-[clamp(3.5rem,7vw,4.75rem)] font-semibold leading-[1.03] text-slate-950 dark:text-white">
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

          <motion.div {...fadeInUp} className="relative overflow-hidden rounded-lg border border-slate-200 bg-slate-50 p-4 text-slate-950 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-white sm:p-6">
            <div className="absolute inset-0 opacity-60 [background-image:linear-gradient(rgba(23,23,23,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(23,23,23,0.045)_1px,transparent_1px)] [background-size:24px_24px] dark:opacity-20" />
            <div className="relative flex min-h-[420px] items-center justify-center overflow-hidden rounded-md border border-slate-200 bg-[radial-gradient(circle_at_center,rgba(245,196,0,0.12),transparent_42%)] dark:border-slate-700">
              <div className="absolute h-72 w-72 rounded-full border border-slate-300 dark:border-slate-600" />
              <div className="absolute h-56 w-56 rounded-full border border-amber-300" />
              <div className="absolute h-40 w-40 rounded-full border border-slate-300 dark:border-slate-600" />
              <div className="absolute left-4 top-4 rounded-sm border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200">Electromagnetic Field</div>
              <div className="absolute bottom-4 right-4 rounded-sm border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200">Physics in Motion</div>
              <div className="relative flex h-72 w-72 items-center justify-center rounded-full bg-white ring-1 ring-slate-200 dark:bg-slate-950 dark:ring-slate-700">
                <div className="absolute h-24 w-24 rounded-full border border-amber-400" />
                <div className="absolute h-[140px] w-[140px] rounded-full border border-slate-300 dark:border-slate-600" />
                <div className="absolute h-[200px] w-[200px] rounded-full border border-slate-200 dark:border-slate-700" />
                <div className="absolute h-4 w-4 rounded-full bg-amber-400" />
                <div className="absolute h-4 w-4 rounded-full bg-slate-500" style={{ transform: "translate(70px, -80px)" }} />
                <div className="absolute h-4 w-4 rounded-full bg-slate-300" style={{ transform: "translate(-80px, 75px)" }} />
                <div className="z-10 rounded-md bg-amber-400 px-5 py-3 text-sm font-semibold text-slate-950">
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
                    <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-md bg-amber-100 text-slate-950 dark:bg-amber-300 dark:text-slate-950">
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
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 rounded-lg border border-slate-800 bg-slate-950 px-6 py-8 text-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-400">Start Learning</p>
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
