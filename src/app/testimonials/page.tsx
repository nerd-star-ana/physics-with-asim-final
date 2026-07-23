"use client";

import { motion } from "framer-motion";
import { PlayCircle, Star } from "lucide-react";

import { Section } from "@/components/ui/section";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

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
      <Section className="pt-14">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.34em] text-fuchsia-600 dark:text-fuchsia-300">Testimonials</p>
            <h1 className="mt-3 text-5xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-6xl">A review wall built for trust and warmth.</h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">Each story is framed as a mood, not a checkbox. The page shifts from emotion to proof and back again, so social proof feels elegant rather than generic.</p>
          </div>
          <div className="rounded-[30px] border border-fuchsia-200/80 bg-[linear-gradient(135deg,rgba(217,70,239,0.14),rgba(59,130,246,0.14))] p-6 dark:border-fuchsia-900/60">
            <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-fuchsia-800 dark:text-fuchsia-300"><PlayCircle className="h-4 w-4" /> Student testimonial highlight</div>
            <div className="mt-4 rounded-[24px] border border-fuchsia-100 bg-white/90 p-6 text-slate-950 dark:bg-slate-950/80 dark:text-white dark:border-slate-800">
              <p className="text-xs font-semibold text-slate-600 dark:text-slate-300">Preview</p>
              <div className="mt-3 h-28 rounded-2xl bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.34),transparent_48%),linear-gradient(135deg,#0f172a,#1d4ed8)]" />
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div key={testimonial.name} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }}>
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-950 text-sm font-semibold text-white dark:bg-sky-600">{testimonial.name.split(" ").map((part) => part[0]).join("")}</div>
                    <div className="flex gap-1 text-amber-500">
                      {Array.from({ length: 5 }).map((_, starIndex) => <Star key={`${testimonial.name}-${starIndex}`} className="h-4 w-4 fill-current" />)}
                    </div>
                  </div>
                  <CardTitle>{testimonial.name}</CardTitle>
                  <p className="text-xs uppercase tracking-[0.28em] text-slate-500 dark:text-slate-300">{testimonial.role}</p>
                </CardHeader>
                <CardContent>
                  <CardDescription>“{testimonial.quote}”</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>
    </div>
  );
}
