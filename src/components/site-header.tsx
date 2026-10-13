"use client";

import Link from "next/link";
import { Menu, User, X, ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { buttonVariants } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";
import { cn, navigationItems } from "@/lib/utils";

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-background)]/80 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 text-sm font-bold tracking-[0.08em] text-[var(--color-primary)]">
          <motion.span 
            whileHover={{ rotate: 10 }}
            className="flex h-10 w-10 items-center justify-center rounded-sm bg-[var(--color-primary)] text-base font-extrabold text-white"
          >
            A
          </motion.span>
          <span className="hidden sm:inline">PHYSICS WITH ASIM</span>
        </Link>

        <nav aria-label="Primary navigation" className="hidden items-center gap-1 lg:flex">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "relative rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-[0.1em] transition-all",
                  isActive
                    ? "text-[var(--color-primary)]"
                    : "text-[var(--color-text)] hover:text-[var(--color-primary)]",
                )}
              >
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="header-nav"
                    className="absolute inset-0 z-[-1] rounded-full bg-[var(--color-sand)]"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--color-primary)]">{user?.name}</span>
              <button
                type="button"
                onClick={() => logout()}
                className="text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--color-text)] hover:text-[var(--color-primary)]"
              >
                Log Out
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--color-text)] hover:text-[var(--color-primary)]"
            >
              Login
            </Link>
          )}
          <Link href="/contact" className={cn(buttonVariants({ variant: "default", size: "sm" }), "rounded-full bg-[var(--color-accent)] px-6 py-5 text-[11px] font-bold uppercase tracking-[0.1em] hover:bg-[var(--color-accent-hover)]")}>
            Free Trial
          </Link>
        </div>

        <button
          type="button"
          aria-label="Toggle navigation menu"
          className="inline-flex rounded-full p-2 text-[var(--color-primary)] transition-colors hover:bg-[var(--color-sand)] lg:hidden"
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-[var(--color-border)] bg-[var(--color-background)] lg:hidden"
          >
            <nav className="flex flex-col p-4">
              {navigationItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center justify-between rounded-md p-4 text-sm font-bold uppercase tracking-[0.05em] text-[var(--color-primary)]"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                  <ChevronRight size={16} />
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
