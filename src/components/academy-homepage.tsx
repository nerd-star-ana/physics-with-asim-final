"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  BookCheck,
  CircleHelp,
  GraduationCap,
  Layers3,
  NotebookPen,
  Sparkles,
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
import { ScrollProgress } from "@/components/scroll-progress";
import { fadeInUp } from "@/lib/animations";
import {
  boardsCovered,
  faqs,
  outcomeStories,
  stats,
  subjectCards,
  testimonials,
} from "@/lib/site-data";
import { featureCards } from "@/lib/utils";

const learningIcons = [BookOpen, GraduationCap, NotebookPen];

const resourceGroups = [
  {
    title: "Revision Folder",
    category: "Concept notes",
    description: "High-signal summaries for mechanics, electricity, waves, and modern physics.",
  },
  {
    title: "Formula Pack",
    category: "Quick-reference",
    description: "Clean formula sheets built to reduce cognitive load during revision sessions.",
  },
  {
    title: "Applied Worksheet Set",
    category: "Practice",
    description: "Exam-style problem sets with guided structure and answer reasoning.",
  },
  {
    title: "Past Paper Vault",
    category: "Assessment",
    description: "A curated bank of assessment-style materials for realistic exam preparation.",
  },
];

export function AcademyHomepage() {
  return (
    <main className="overflow-hidden">
      <ScrollProgress />

      <Section className="grid items-center gap-8 py-10 sm:py-14 lg:min-h-[570px] lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
        <motion.div {...fadeInUp} className="space-y-6" data-scroll-reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.1em] text-[var(--color-secondary)]">
            Premium Online Physics Coaching
          </p>
          <div className="max-w-2xl space-y-3">
            <h1 className="text-[clamp(2.8rem,6vw,4.7rem)] font-bold leading-[1.04] text-[var(--color-primary)]">
              All CAIE Physics Resources
            </h1>
            <h2 className="text-2xl font-semibold leading-tight text-[var(--color-secondary)] sm:text-3xl">
              you need to boost your grade!
            </h2>
            <p className="max-w-xl text-base leading-7 text-[var(--color-text)] sm:text-lg">
              Explore structured resources and concept-first teaching for Cambridge and Edexcel Physics qualifications.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/resources" className={buttonVariants({ variant: "default", size: "lg" })}>
              Explore Resources <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/courses" className={buttonVariants({ variant: "secondary", size: "lg" })}>
              Explore Courses
            </Link>
          </div>
          <div className="flex flex-wrap gap-2" aria-label="Qualifications covered">
            {boardsCovered.map((board) => <Badge key={board}>{board}</Badge>)}
          </div>
        </motion.div>

        <motion.div {...fadeInUp} className="relative mx-auto flex aspect-[1.1/1] w-full max-w-[520px] items-center justify-center overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-5 sm:p-8">
          <div className="absolute inset-0 [background-image:linear-gradient(rgba(24,59,99,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(24,59,99,0.055)_1px,transparent_1px)] [background-size:28px_28px]" />
          <div className="absolute aspect-square h-[82%] rounded-full border border-[var(--color-primary)]/20" />
          <div className="absolute aspect-square h-[62%] rounded-full border border-[var(--color-primary)]/35" />
          <div className="absolute aspect-square h-[42%] rounded-full border border-[var(--color-accent)]/70" />
          <div className="absolute aspect-square h-[22%] rounded-full border border-[var(--color-secondary)]/40" />
          <div className="relative flex aspect-square h-[36%] items-center justify-center rounded-full bg-[var(--color-surface)] text-center shadow-[0_0_0_1px_var(--color-border)]">
            <span className="absolute h-3 w-3 -translate-y-14 rounded-full bg-[var(--color-accent)] sm:-translate-y-16" />
            <span className="absolute h-3 w-3 translate-x-12 translate-y-10 rounded-full bg-[var(--color-secondary)] sm:translate-x-16 sm:translate-y-12" />
            <span className="relative z-10 rounded-md bg-[var(--color-primary)] px-4 py-2 text-sm font-semibold text-white">
              Physics with Asim
            </span>
          </div>
          <span className="absolute left-3 top-3 rounded-sm border border-[var(--color-border)] bg-[var(--color-surface)] px-2.5 py-1 text-[11px] font-medium text-[var(--color-primary)] sm:left-5 sm:top-5 sm:text-xs">
            Concept mastery
          </span>
          <span className="absolute bottom-3 right-3 rounded-sm border border-[var(--color-border)] bg-[var(--color-surface)] px-2.5 py-1 text-[11px] font-medium text-[var(--color-primary)] sm:bottom-5 sm:right-5 sm:text-xs">
            Exam application
          </span>
        </motion.div>
      </Section>

      <section className="border-y border-[var(--color-border)] bg-[var(--color-surface)]">
        <Section className="grid gap-8 py-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div data-scroll-reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--color-secondary)]">Instructor introduction</p>
            <h2 className="mt-3 text-3xl font-bold leading-tight text-[var(--color-primary)] sm:text-4xl">
              Helping students unlock the wonders of Physics.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-[var(--color-text)]">
              Physics with Asim blends concept-first teaching, elegant communication, and disciplined exam preparation into a high-trust online learning experience.
            </p>
            <div className="mt-5 grid gap-2 sm:grid-cols-3">
              {stats.map((stat) => <StatCard key={stat.label} value={stat.value} label={stat.label} />)}
            </div>
            <Link href="/about" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)] underline decoration-[var(--color-accent)] decoration-2 underline-offset-4">
              About Asim <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-[96px_1fr] items-center gap-5 sm:grid-cols-[128px_1fr]" data-scroll-reveal>
            <div className="flex aspect-square items-center justify-center rounded-lg bg-[var(--color-primary)] text-4xl font-bold text-[var(--color-surface)] sm:text-5xl" aria-hidden="true">A</div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--color-secondary)]">Physics Tutor &amp; Academic Mentor</p>
              <h3 className="mt-2 text-2xl font-bold text-[var(--color-primary)]">Asim</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--color-text)]">
                A calm, rigorous, concept-first educator focused on making advanced physics approachable and exam-ready.
              </p>
            </div>
          </div>
        </Section>
      </section>

      <Section className="grid gap-8 py-12 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
        <div data-scroll-reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--color-secondary)]">Academic results</p>
          <h2 className="mt-3 text-3xl font-bold leading-tight text-[var(--color-primary)] sm:text-4xl">
            Student progress and learning outcomes
          </h2>
          <p className="mt-3 max-w-lg text-base leading-7 text-[var(--color-text)]">
            Celebrating student progress and achievements.
          </p>
          <Link href="/results" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)] underline decoration-[var(--color-accent)] decoration-2 underline-offset-4">
            Explore results <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]" data-scroll-reveal>
          {outcomeStories.map((story, index) => (
            <article key={story.title} className="grid gap-3 py-5 sm:grid-cols-[44px_1fr]">
              <span className="text-sm font-semibold text-[var(--color-secondary)]">0{index + 1}</span>
              <div>
                <h3 className="font-semibold text-[var(--color-primary)]">{story.title}</h3>
                <p className="mt-1 text-sm leading-6 text-[var(--color-text)]">{story.description}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <section className="border-y border-[var(--color-border)] bg-[var(--color-surface-alt)]">
        <Section className="py-12">
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end" data-scroll-reveal>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--color-secondary)]">Latest courses</p>
              <h2 className="mt-2 text-3xl font-bold text-[var(--color-primary)] sm:text-4xl">Qualification pathways</h2>
              <p className="mt-2 max-w-2xl text-base leading-7 text-[var(--color-text)]">
                Browse the current Cambridge and Edexcel Physics pathways.
              </p>
            </div>
            <Link href="/courses" className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-[var(--color-primary)] underline decoration-[var(--color-accent)] decoration-2 underline-offset-4">
              View all courses <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {subjectCards.map((course, index) => (
              <Card key={course.title} className="flex h-full flex-col">
                <CardHeader>
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-md bg-[var(--color-primary)] text-[var(--color-surface)]">
                    {index % 2 === 0 ? <BookCheck className="h-5 w-5" /> : <Layers3 className="h-5 w-5" />}
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--color-secondary)]">{index < 4 ? "IGCSE / O Level" : "Advanced level"}</p>
                  <CardTitle className="mt-2 text-lg text-[var(--color-primary)]">{course.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col justify-between gap-5">
                  <CardDescription className="leading-6">{course.description}</CardDescription>
                  <Link href="/courses" className={buttonVariants({ variant: "outline", size: "sm" })}>
                    Explore course <ArrowRight className="h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </Section>
      </section>

      <Section className="grid gap-8 py-12 lg:grid-cols-[0.7fr_1.3fr]">
        <div data-scroll-reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--color-secondary)]">Student testimonials</p>
          <h2 className="mt-3 text-3xl font-bold leading-tight text-[var(--color-primary)] sm:text-4xl">
            The Results I’ve Helped Create!
          </h2>
          <p className="mt-3 text-base leading-7 text-[var(--color-text)]">
            Hear what students say about their learning experience.
          </p>
          <Link href="/testimonials" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)] underline decoration-[var(--color-accent)] decoration-2 underline-offset-4">
            Read testimonials <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-3 md:grid-cols-3" data-scroll-reveal>
          {testimonials.map((item) => (
            <Card key={item.name} className="flex h-full flex-col justify-between">
              <CardContent className="p-5">
                <p className="text-sm leading-6 text-[var(--color-text)]">“{item.quote}”</p>
                <div className="mt-5 border-t border-[var(--color-border)] pt-4">
                  <p className="font-semibold text-[var(--color-primary)]">{item.name}</p>
                  <p className="mt-1 text-xs text-[var(--color-secondary)]">{item.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <section className="border-y border-[var(--color-border)] bg-[var(--color-primary)] text-white">
        <Section className="grid gap-8 py-12 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
          <div data-scroll-reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--color-accent)]">Class registration</p>
            <h2 className="mt-3 text-3xl font-bold leading-tight text-white sm:text-4xl">Join Our Physics Classes!</h2>
            <p className="mt-3 max-w-lg text-base leading-7 text-[#e8d6b8]">
              Structured support for O Level, IGCSE, AS and A Level Physics.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {boardsCovered.map((board) => <Badge key={board}>{board}</Badge>)}
            </div>
            <Link href="/admissions" className="mt-6 inline-flex items-center gap-2 rounded-md bg-[var(--color-accent)] px-5 py-3 text-sm font-semibold text-[var(--color-button-primary-text)] transition-colors hover:bg-[var(--color-accent-hover)]">
              Register now <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2" data-scroll-reveal>
            {featureCards.slice(0, 4).map((feature, index) => {
              const Icon = learningIcons[index % learningIcons.length];
              return (
                <div key={feature.title} className="flex gap-3 border border-white/20 bg-white/5 p-4">
                  <Icon className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-accent)]" />
                  <div>
                    <h3 className="font-semibold text-white">{feature.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-[#e8d6b8]">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Section>
      </section>

      <Section className="py-12">
        <div className="mb-8 max-w-2xl" data-scroll-reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--color-secondary)]">Learning resources</p>
          <h2 className="mt-2 text-3xl font-bold text-[var(--color-primary)] sm:text-4xl">Find the right way to study</h2>
          <p className="mt-3 text-base leading-7 text-[var(--color-text)]">
            Choose a learning pathway, build exam technique, or browse the available study materials.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { title: "Online Interactive Classes", description: featureCards[3].description, icon: GraduationCap, href: "/admissions", action: "Explore classes" },
            { title: "Exam-focused Learning", description: featureCards[1].description, icon: Sparkles, href: "/courses", action: "Explore courses" },
            { title: "Free Resources", description: "Browse revision folders, formula sheets, worksheets and past-paper resources.", icon: BookOpen, href: "/resources", action: "Browse resources" },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.title} className="h-full">
                <CardHeader>
                  <div className="flex h-11 w-11 items-center justify-center rounded-md bg-[var(--color-surface-alt)] text-[var(--color-primary)]"><Icon className="h-5 w-5" /></div>
                  <CardTitle className="mt-3 text-[var(--color-primary)]">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="leading-6">{item.description}</CardDescription>
                  <Link href={item.href} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)] underline decoration-[var(--color-accent)] decoration-2 underline-offset-4">
                    {item.action} <ArrowRight className="h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </Section>

      <section className="border-y border-[var(--color-border)] bg-[var(--color-surface)]">
        <Section className="grid gap-8 py-12 lg:grid-cols-[0.7fr_1.3fr]">
          <div data-scroll-reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--color-secondary)]">Explore freebies</p>
            <h2 className="mt-3 text-3xl font-bold text-[var(--color-primary)] sm:text-4xl">Explore Freebies!</h2>
            <p className="mt-3 text-base leading-7 text-[var(--color-text)]">
              Notes, topical past papers, formula sheets, definitions, laws and study plans.
            </p>
            <Link href="/resources" className="mt-6 inline-flex items-center gap-2 rounded-md bg-[var(--color-accent)] px-5 py-3 text-sm font-semibold text-[var(--color-button-primary-text)] hover:bg-[var(--color-accent-hover)]">
              Start for Free <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2" data-scroll-reveal>
            {resourceGroups.map((resource, index) => (
              <Link key={resource.title} href="/resources" className="group flex min-h-36 flex-col justify-between border border-[var(--color-border)] bg-[var(--color-background)] p-5 transition-colors hover:border-[var(--color-accent)]">
                <span className="flex items-center justify-between text-xs font-semibold text-[var(--color-secondary)]">
                  {resource.category}<span>0{index + 1}</span>
                </span>
                <span>
                  <span className="block text-lg font-semibold text-[var(--color-primary)]">{resource.title}</span>
                  <span className="mt-1 block text-sm leading-6 text-[var(--color-text)]">{resource.description}</span>
                </span>
              </Link>
            ))}
          </div>
        </Section>
      </section>

      <Section className="grid gap-8 py-12 lg:grid-cols-[0.7fr_1.3fr]">
        <div data-scroll-reveal>
          <SectionHeader eyebrow="FAQs" title="Common questions" />
          <Link href="/faq" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)] underline decoration-[var(--color-accent)] decoration-2 underline-offset-4">
            Visit FAQs <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
          {faqs.map((faq) => (
            <details key={faq.question} className="group py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left font-semibold text-[var(--color-primary)]">
                <span className="flex items-center gap-3"><CircleHelp className="h-4 w-4 shrink-0 text-[var(--color-secondary)]" />{faq.question}</span>
                <span className="text-xl font-normal text-[var(--color-secondary)] transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="pb-2 pl-7 pt-3 text-sm leading-6 text-[var(--color-text)]">{faq.answer}</p>
            </details>
          ))}
        </div>
      </Section>

      <section className="border-t border-[var(--color-border)] bg-[var(--color-surface-alt)]">
        <Section className="grid gap-8 py-12 lg:grid-cols-[0.7fr_1.3fr]">
          <div data-scroll-reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--color-secondary)]">Contact and registration</p>
            <h2 className="mt-3 text-3xl font-bold text-[var(--color-primary)] sm:text-4xl">Book your free trial lesson</h2>
            <p className="mt-3 text-base leading-7 text-[var(--color-text)]">
              Share your goal and the team will help shape the right next step for your journey.
            </p>
            <Link href="/contact" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)] underline decoration-[var(--color-accent)] decoration-2 underline-offset-4">
              Contact Physics with Asim <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <Card className="p-5 sm:p-7" data-scroll-reveal>
            <CardContent className="p-0"><ContactForm /></CardContent>
          </Card>
        </Section>
      </section>
    </main>
  );
}
