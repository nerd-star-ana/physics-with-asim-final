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
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { StatCard } from "@/components/ui/stat-card";
import { TeacherCard } from "@/components/ui/teacher-card";
import { ScrollProgress } from "@/components/scroll-progress";
import { fadeInUp } from "@/lib/animations";
import {
  boardsCovered,
  faqs,
  learningTimeline,
  stats,
  subjectCards,
  testimonials,
} from "@/lib/site-data";
import { featureCards } from "@/lib/utils";

const featureIcons = [Sparkles, Layers3, BookCheck, Rocket, GraduationCap, Stars];

export function AcademyHomepage() {
  return (
    <main className="overflow-hidden">
      <ScrollProgress />

      <Section className="relative grid items-center gap-10 pb-12 pt-12 sm:pt-16 lg:min-h-[650px] lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:pb-16">
        <motion.div {...fadeInUp} className="relative z-10 space-y-7">
          <div className="flex flex-wrap gap-2">
            <Badge>Premium Online Physics Coaching</Badge>
            <Badge>Cambridge &amp; Edexcel</Badge>
          </div>
          <div className="max-w-2xl space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-600 dark:text-slate-300">
              Concept-first physics education
            </p>
            <h1 className="text-[clamp(3.25rem,7vw,5.75rem)] font-semibold leading-[1.02] text-slate-950 dark:text-white">
              Physics with Asim
            </h1>
            <p className="max-w-xl text-lg leading-8 text-slate-700 dark:text-slate-300">
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
        </motion.div>

        <motion.div {...fadeInUp} className="relative mx-auto flex aspect-square w-full max-w-[560px] items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
          <div className="absolute inset-0 [background-image:linear-gradient(rgba(23,23,23,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(23,23,23,0.045)_1px,transparent_1px)] [background-size:28px_28px] dark:opacity-20" />
          <div className="absolute h-[84%] aspect-square rounded-full border border-slate-300 dark:border-slate-700" />
          <div className="absolute h-[66%] aspect-square rounded-full border border-slate-300 dark:border-slate-600" />
          <div className="absolute h-[46%] aspect-square rounded-full border border-amber-400" />
          <div className="absolute h-[25%] aspect-square rounded-full border border-slate-300 dark:border-slate-600" />
          <div className="relative flex h-[40%] aspect-square items-center justify-center rounded-full bg-white text-center ring-1 ring-slate-200 dark:bg-slate-950 dark:ring-slate-700">
            <div className="absolute h-3 w-3 -translate-y-16 rounded-full bg-amber-400 sm:-translate-y-20" />
            <div className="absolute h-3 w-3 translate-x-14 translate-y-12 rounded-full bg-slate-500 sm:translate-x-20 sm:translate-y-16" />
            <span className="relative z-10 rounded-md bg-amber-400 px-4 py-2 text-sm font-semibold text-slate-950">
              Physics in Motion
            </span>
          </div>
          <span className="absolute left-4 top-4 rounded-sm border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 sm:left-6 sm:top-6">
            Electromagnetic Field
          </span>
          <span className="absolute bottom-4 right-4 rounded-sm border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 sm:bottom-6 sm:right-6">
            Physics in Motion
          </span>
        </motion.div>
      </Section>

      <nav aria-label="Explore learning" className="border-y border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto grid max-w-7xl divide-y divide-slate-200 px-5 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:px-6 lg:px-8 dark:divide-slate-800">
          {[
            { label: "Course pathways", href: "/courses", number: "01" },
            { label: "Study resources", href: "/resources", number: "02" },
            { label: "Teaching levels", href: "/teaching-levels", number: "03" },
          ].map((item) => (
            <Link key={item.href} href={item.href} className="group flex items-center justify-between gap-4 py-4 transition-colors hover:text-slate-950 sm:px-5 sm:py-5 dark:hover:text-white">
              <span className="flex items-center gap-3">
                <span className="text-xs font-semibold text-amber-700 dark:text-amber-300">{item.number}</span>
                <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">{item.label}</span>
              </span>
              <ArrowRight className="h-4 w-4 text-slate-500 transition-transform group-hover:translate-x-1" />
            </Link>
          ))}
        </div>
      </nav>

      <Section className="grid gap-10 py-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:py-24">
        <div className="space-y-6" data-scroll-reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-800 dark:text-amber-300">Meet the instructor</p>
          <h2 className="max-w-xl text-3xl font-semibold leading-tight text-slate-950 dark:text-white sm:text-4xl">
            Teaching with clarity and authority
          </h2>
          <p className="max-w-lg text-base leading-7 text-slate-700 dark:text-slate-300">
            A calm, rigorous, concept-first educator focused on making advanced physics approachable and exam-ready.
          </p>
          <div className="grid gap-3 sm:grid-cols-3">
            {stats.map((stat) => (
              <StatCard key={stat.label} value={stat.value} label={stat.label} />
            ))}
          </div>
          <Link href="/about" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 underline decoration-amber-500 decoration-2 underline-offset-4 dark:text-white">
            About Physics with Asim <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2" data-scroll-reveal>
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
          <div className="sm:col-span-2">
            <TeacherCard
              name="Premium Student Support"
              role="Encouraging Accountability"
              description="Students gain confidence through careful feedback, structured methods, and a supportive academic environment."
            />
          </div>
        </div>
      </Section>

      <section className="border-y border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
        <Section className="grid gap-8 py-16 lg:grid-cols-[0.75fr_1.25fr] lg:py-20">
          <div data-scroll-reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-800 dark:text-amber-300">Find your course</p>
            <h2 className="mt-3 max-w-md text-3xl font-semibold leading-tight text-slate-950 dark:text-white sm:text-4xl">
              Qualification coverage
            </h2>
            <p className="mt-4 max-w-md text-base leading-7 text-slate-700 dark:text-slate-300">
              Every major curriculum track is supported with high-quality, polished guidance and focused teaching structure.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {boardsCovered.map((board) => <Badge key={board}>{board}</Badge>)}
            </div>
            <Link href="/courses" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-slate-900 underline decoration-amber-500 decoration-2 underline-offset-4 dark:text-white">
              Explore Courses <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2" data-scroll-reveal>
            {subjectCards.map((subject, index) => (
              <Link key={subject.title} href="/courses" className="group flex min-h-36 flex-col justify-between border border-slate-200 bg-white p-5 transition-colors hover:border-amber-500 dark:border-slate-700 dark:bg-slate-950">
                <span className="text-xs font-semibold text-amber-800 dark:text-amber-300">0{index + 1}</span>
                <span>
                  <span className="block text-base font-semibold text-slate-950 dark:text-white">{subject.title}</span>
                  <span className="mt-1 block text-sm leading-6 text-slate-600 dark:text-slate-300">{subject.description}</span>
                </span>
                <ArrowRight className="mt-4 h-4 w-4 text-slate-500 transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </Section>
      </section>

      <Section className="grid gap-12 py-16 lg:grid-cols-2 lg:py-24">
        <div>
          <SectionHeader
            eyebrow="Why choose us"
            title="Structured to feel world-class"
            description="The teaching approach balances conceptual clarity with exam fluency so students see real progress in both confidence and performance."
          />
          <div className="grid gap-3 sm:grid-cols-2">
            {featureCards.map((feature, index) => {
              const Icon = featureIcons[index % featureIcons.length];
              return (
                <Card key={feature.title} className="h-full">
                  <CardHeader>
                    <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-md bg-amber-100 text-slate-950 dark:bg-amber-300">
                      <Icon className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-base font-semibold">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent><CardDescription>{feature.description}</CardDescription></CardContent>
                </Card>
              );
            })}
          </div>
        </div>
        <div className="border-l border-slate-200 pl-0 sm:pl-8 dark:border-slate-800" data-scroll-reveal>
          <SectionHeader
            eyebrow="Learning process"
            title="How the tuition journey works"
          />
          <ol className="divide-y divide-slate-200 dark:divide-slate-800">
            {learningTimeline.map((item, index) => (
              <li key={item.title} className="grid gap-2 py-5 sm:grid-cols-[52px_1fr]">
                <span className="text-sm font-semibold text-amber-800 dark:text-amber-300">0{index + 1}</span>
                <div>
                  <h3 className="text-lg font-semibold text-slate-950 dark:text-white">{item.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-700 dark:text-slate-300">{item.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <section className="border-y border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
        <Section className="grid gap-10 py-16 lg:grid-cols-[0.7fr_1.3fr] lg:py-20">
          <div data-scroll-reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-800 dark:text-amber-300">Student voices</p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight text-slate-950 dark:text-white sm:text-4xl">
              What students feel after the sessions
            </h2>
            <Link href="/testimonials" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-900 underline decoration-amber-500 decoration-2 underline-offset-4 dark:text-white">
              Read testimonials <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-3 md:grid-cols-3" data-scroll-reveal>
            {testimonials.map((item) => (
              <Card key={item.name} className="h-full">
                <CardContent className="pt-6">
                  <p className="text-base leading-7 text-slate-800 dark:text-slate-200">“{item.quote}”</p>
                  <div className="mt-5 border-t border-slate-200 pt-4 dark:border-slate-700">
                    <div className="font-semibold text-slate-950 dark:text-white">{item.name}</div>
                    <div className="text-xs font-medium text-slate-600 dark:text-slate-400">{item.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Section>
      </section>

      <Section className="grid gap-12 py-16 lg:grid-cols-[0.8fr_1.2fr] lg:py-24">
        <div data-scroll-reveal>
          <SectionHeader eyebrow="Frequently asked questions" title="Common questions" />
          <Link href="/faq" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 underline decoration-amber-500 decoration-2 underline-offset-4 dark:text-white">
            Visit FAQ <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="divide-y divide-slate-200 border-y border-slate-200 dark:divide-slate-800 dark:border-slate-800">
          {faqs.map((faq) => (
            <details key={faq.question} className="group py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-base font-semibold text-slate-950 dark:text-white">
                <span className="flex items-center gap-3"><CircleHelp className="h-4 w-4 shrink-0 text-amber-700 dark:text-amber-300" />{faq.question}</span>
                <span className="text-xl font-normal text-slate-500 transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="max-w-2xl pb-2 pl-7 pt-3 text-sm leading-6 text-slate-700 dark:text-slate-300">{faq.answer}</p>
            </details>
          ))}
        </div>
      </Section>

      <section className="border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
        <Section className="grid gap-10 py-16 lg:grid-cols-[0.8fr_1.2fr] lg:py-20">
          <div data-scroll-reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-800 dark:text-amber-300">Start learning</p>
            <h2 className="mt-3 max-w-lg text-3xl font-semibold leading-tight text-slate-950 dark:text-white sm:text-4xl">
              Book your free trial lesson
            </h2>
            <p className="mt-4 max-w-md text-base leading-7 text-slate-700 dark:text-slate-300">
              Share your goal and the team will help shape the right next step for your journey.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Badge>Cambridge</Badge><Badge>Edexcel</Badge><Badge>AS/A Level</Badge>
            </div>
            <Link href="/contact" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-900 underline decoration-amber-500 decoration-2 underline-offset-4 dark:text-white">
              Contact Physics with Asim <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <Card className="p-5 sm:p-7" data-scroll-reveal>
            <CardContent className="p-0">
              <ContactForm />
            </CardContent>
          </Card>
        </Section>
      </section>
    </main>
  );
}
