import Link from "next/link";

import { navigationItems } from "@/lib/utils";

export function SiteFooter() {
  return (
    <footer id="contact" className="border-t border-slate-800 bg-slate-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_0.8fr_0.8fr] lg:px-8">
        <div data-scroll-reveal>
          <p className="mb-3 text-sm font-bold tracking-[0.16em] text-amber-400">PHYSICS WITH ASIM</p>
          <p className="max-w-md text-sm text-slate-300">
            Premium online physics coaching for international qualifications with a calm, concept-first approach.
          </p>
        </div>

        <div data-scroll-reveal>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-white">Explore</h2>
          <ul className="space-y-2 text-sm text-slate-300">
            {navigationItems.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="transition-colors hover:text-amber-400">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div data-scroll-reveal>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-white">Get in touch</h2>
          <ul className="space-y-2 text-sm text-slate-300">
            <li>Book a free trial lesson</li>
            <li>Weekly live sessions</li>
            <li>Personalized progress support</li>
          </ul>
        </div>

        <div data-scroll-reveal>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-white">Student portal</h2>
          <ul className="space-y-2 text-sm text-slate-300">
            <li><Link href="/login" className="transition-colors hover:text-amber-400">Portal Login</Link></li>
            <li><Link href="/register" className="transition-colors hover:text-amber-400">Register</Link></li>
            <li><Link href="/blog" className="transition-colors hover:text-amber-400">Blog</Link></li>
            <li><Link href="/faq" className="transition-colors hover:text-amber-400">FAQ</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
