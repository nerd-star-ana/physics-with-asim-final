import Link from "next/link";

import { navigationItems } from "@/lib/utils";

export function SiteFooter() {
  return (
    <footer id="contact" className="border-t border-slate-200 bg-slate-100/90 text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <p className="mb-3 text-sm font-bold tracking-[0.24em] text-indigo-700 dark:text-sky-300">PHYSICS WITH ASIM</p>
          <p className="max-w-md text-sm text-slate-700 dark:text-slate-300">
            Premium online physics coaching for international qualifications with a calm, concept-first approach.
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-950 dark:text-slate-200">Explore</h2>
          <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
            {navigationItems.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="transition hover:text-indigo-600 dark:hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-950 dark:text-slate-200">Get in touch</h2>
          <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
            <li>Book a free trial lesson</li>
            <li>Weekly live sessions</li>
            <li>Personalized progress support</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
