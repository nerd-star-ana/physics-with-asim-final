"use client";

import { motion } from "framer-motion";
import { PlayCircle, Star } from "lucide-react";

import { Section } from "@/components/ui/section";

const testimonials = [
  {
    name: "M. Ali",
    quote: "The lessons felt premium from the first session. Every concept was explained with calm structure and real exam focus.",
    role: "Cambridge A Level Student",
  },
  {
    name: "H. Rana",
    quote: "I finally understood mechanics instead of memorizing steps. The progress was measurable and confidence-building.",
    role: "Edexcel IGCSE Student",
  },
  {
    name: "S. Noor",
    quote: "Every class felt intentionally planned. The support atmosphere made it easy to ask better questions and improve fast.",
    role: "Cambridge IGCSE Student",
  },
];

export default function TestimonialsPage() {
  return (
    <div className="page-shell">
      <Section className="grid gap-8 pt-12 sm:pt-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <p className="text-sm uppercase tracking-[0.34em] text-fuchsia-600 dark:text-fuchsia-300">Testimonials</p>
            <h1 className="mt-3 text-5xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-6xl">A review wall built for trust and warmth.</h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">Each story is framed as a mood, not a checkbox. The page shifts from emotion to proof and back again, so social proof feels elegant rather than generic.</p>
          </div>
          <div className="border-y border-slate-200 py-5 dark:border-slate-800" data-scroll-reveal>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-700 dark:text-slate-300"><PlayCircle className="h-4 w-4 text-amber-700 dark:text-amber-300" /> Student testimonial highlight</div>
            <div className="mt-6">
              <p className="text-xs font-semibold text-slate-600 dark:text-slate-300">Preview</p>
              <div className="mt-3 h-28 border-l-2 border-amber-400 bg-slate-100 dark:bg-slate-950" />
            </div>
          </div>
      </Section>

      <section className="border-y border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
        <Section className="grid gap-8 py-12 lg:grid-cols-[220px_1fr] lg:gap-14">
          <aside className="self-start lg:sticky lg:top-24">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-800 dark:text-amber-300">Student voices</p>
            <h2 className="mt-3 text-2xl font-semibold text-slate-950 dark:text-white">Learning experiences</h2>
          </aside>
          <div className="divide-y divide-slate-200 border-y border-slate-200 dark:divide-slate-800 dark:border-slate-800">
          {testimonials.map((testimonial, index) => (
            <motion.article key={testimonial.name} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }} className="grid gap-4 py-6 sm:grid-cols-[56px_1fr]">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-950 text-sm font-semibold text-white dark:bg-slate-700">{testimonial.name.split(" ").map((part) => part[0]).join("")}</div>
              <div>
                <div className="flex gap-1 text-amber-600 dark:text-amber-400">
                  {Array.from({ length: 5 }).map((_, starIndex) => <Star key={`${testimonial.name}-${starIndex}`} className="h-4 w-4 fill-current" />)}
                </div>
                <p className="mt-3 max-w-3xl text-lg leading-7 text-slate-900 dark:text-slate-100">“{testimonial.quote}”</p>
                <div className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="font-semibold text-slate-950 dark:text-white">{testimonial.name}</h3>
                  <p className="text-xs uppercase tracking-[0.16em] text-slate-600 dark:text-slate-300">{testimonial.role}</p>
                </div>
              </div>
            </motion.article>
          ))}
          </div>
        </Section>
      </section>
    </div>
  );
}
