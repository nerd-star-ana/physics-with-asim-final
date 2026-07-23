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

      <Section>
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Card className="h-full bg-[linear-gradient(135deg,rgba(244,63,94,0.12),rgba(14,165,233,0.08))] dark:bg-[linear-gradient(135deg,rgba(244,63,94,0.18),rgba(30,64,175,0.18))]">
            <CardContent className="space-y-4 pt-6 text-sm text-slate-700 dark:text-slate-200">
              <div className="flex items-center gap-3"><Mail className="h-4 w-4 text-rose-600" /><span>Email: hello@physicswithasim.com</span></div>
              <div className="flex items-center gap-3"><MessageCircle className="h-4 w-4 text-rose-600" /><span>WhatsApp: +92 300 0000000</span></div>
              <div className="flex items-center gap-3"><CalendarClock className="h-4 w-4 text-rose-600" /><span>Business Hours: Mon - Sat, 9:00 AM - 7:00 PM</span></div>
              <div className="flex items-center gap-3"><MapPin className="h-4 w-4 text-rose-600" /><span>Location: Online tuition for students worldwide</span></div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <ContactForm />
            </CardContent>
          </Card>
        </div>
      </Section>
    </div>
  );
}
