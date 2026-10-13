import { CalendarClock, Mail, MapPin, MessageCircle } from "lucide-react";

import { Section } from "@/components/ui/section";
import { Card, CardContent } from "@/components/ui/card";
import { ContactForm } from "@/components/ui/contact-form";

export default function ContactPage() {
  return (
    <div className="page-shell">
      <Section className="pt-14">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.34em] text-rose-600 dark:text-rose-300">Contact</p>
            <h1 className="mt-3 text-5xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-6xl">Book your next academic step.</h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">This page is framed as a polished business surface with a premium, supportive tone rather than a generic inquiry block.</p>
          </div>
          <div className="rounded-[30px] border border-rose-200/80 bg-[linear-gradient(135deg,rgba(244,63,94,0.16),rgba(59,130,246,0.14))] p-6 dark:border-rose-900/60">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-white/90 p-4 text-slate-950 dark:bg-slate-950/80 dark:text-white border border-rose-100 dark:border-slate-800 font-semibold text-xs sm:text-sm"><Mail className="mb-3 h-5 w-5 text-rose-600 dark:text-rose-400" /> hello@physicswithasim.com</div>
              <div className="rounded-2xl bg-white/90 p-4 text-slate-950 dark:bg-slate-950/80 dark:text-white border border-rose-100 dark:border-slate-800 font-semibold text-xs sm:text-sm"><MessageCircle className="mb-3 h-5 w-5 text-rose-600 dark:text-rose-400" /> WhatsApp support</div>
            </div>
          </div>
        </div>
      </Section>

      <section className="border-y border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
        <Section className="grid gap-10 py-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <aside className="self-start border-l-2 border-amber-400 pl-5" data-scroll-reveal>
            <h2 className="text-xl font-semibold text-slate-950 dark:text-white">Get in touch</h2>
            <dl className="mt-6 divide-y divide-slate-200 dark:divide-slate-800">
              <div className="flex gap-3 py-4"><Mail className="mt-1 h-4 w-4 shrink-0 text-amber-700 dark:text-amber-300" /><div><dt className="text-xs font-semibold text-slate-500 dark:text-slate-400">Email</dt><dd className="mt-1 text-sm text-slate-800 dark:text-slate-200">Email: hello@physicswithasim.com</dd></div></div>
              <div className="flex gap-3 py-4"><MessageCircle className="mt-1 h-4 w-4 shrink-0 text-amber-700 dark:text-amber-300" /><div><dt className="text-xs font-semibold text-slate-500 dark:text-slate-400">WhatsApp</dt><dd className="mt-1 text-sm text-slate-800 dark:text-slate-200">WhatsApp: +92 300 0000000</dd></div></div>
              <div className="flex gap-3 py-4"><CalendarClock className="mt-1 h-4 w-4 shrink-0 text-amber-700 dark:text-amber-300" /><div><dt className="text-xs font-semibold text-slate-500 dark:text-slate-400">Business hours</dt><dd className="mt-1 text-sm text-slate-800 dark:text-slate-200">Business Hours: Mon - Sat, 9:00 AM - 7:00 PM</dd></div></div>
              <div className="flex gap-3 py-4"><MapPin className="mt-1 h-4 w-4 shrink-0 text-amber-700 dark:text-amber-300" /><div><dt className="text-xs font-semibold text-slate-500 dark:text-slate-400">Location</dt><dd className="mt-1 text-sm text-slate-800 dark:text-slate-200">Location: Online tuition for students worldwide</dd></div></div>
            </dl>
          </aside>

          <Card data-scroll-reveal>
            <CardContent className="p-5 sm:p-7">
              <ContactForm />
            </CardContent>
          </Card>
        </Section>
      </section>
    </div>
  );
}
