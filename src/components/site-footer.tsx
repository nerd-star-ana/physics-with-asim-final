import Link from "next/link";
import { navigationItems } from "@/lib/utils";
import { Reveal } from "@/components/ui/animation-utils";

export function SiteFooter() {
  return (
    <footer id="contact" className="border-t border-[var(--color-border)] bg-[var(--color-primary)] text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <Reveal>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-accent)]">Physics With Asim</p>
          <p className="max-w-xs text-sm text-blue-200">
            Premium physics education, designed with purpose and precision.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-white">Platform</h2>
          <ul className="space-y-4 text-sm text-blue-200">
            {navigationItems.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="transition-colors hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.2}>
          <h2 className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-white">Resources</h2>
          <ul className="space-y-4 text-sm text-blue-200">
            <li><Link href="/blog" className="hover:text-white">Editorial</Link></li>
            <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </Reveal>

        <Reveal delay={0.3}>
          <h2 className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-white">Account</h2>
          <ul className="space-y-4 text-sm text-blue-200">
            <li><Link href="/login" className="hover:text-white">Login</Link></li>
            <li><Link href="/register" className="hover:text-white">Register</Link></li>
          </ul>
        </Reveal>
      </div>
    </footer>
  );
}
