"use client";

import Link from "next/link";
import { Menu, User, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { ThemeToggle } from "@/components/theme-toggle";
import { buttonVariants } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";
import { cn, navigationItems } from "@/lib/utils";

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 dark:border-slate-800 dark:bg-slate-950/95">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 text-sm font-bold tracking-[0.14em] text-slate-950 dark:text-white">
          <span className="flex h-10 w-10 items-center justify-center rounded-md bg-amber-400 text-base font-extrabold text-slate-950">
            A
          </span>
          PHYSICS WITH ASIM
        </Link>

        <nav aria-label="Primary navigation" className="hidden items-center gap-1.5 lg:flex">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                    "rounded-md px-3.5 py-2 text-xs font-semibold transition-colors",
                  isActive
                      ? "bg-amber-100 text-slate-950 dark:bg-amber-300 dark:text-slate-950"
                      : "text-slate-700 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <ThemeToggle />
          {isAuthenticated ? (
            <>
              {user?.role === "teacher" ? (
                <Link
                  href="/teacher"
                  className="flex items-center gap-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 hover:bg-amber-500/20 transition"
                >
                  <span>👑 Teacher Suite</span>
                </Link>
              ) : (
                <Link
                  href="/dashboard"
                  className="flex items-center gap-1.5 rounded-md border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-800 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  <User className="h-3.5 w-3.5" />
                  <span>{user?.name || "Student Portal"}</span>
                </Link>
              )}
              <button
                type="button"
                onClick={() => logout()}
                className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-900 transition"
              >
                Log Out
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-1.5 rounded-md bg-amber-400 px-3.5 py-1.5 text-xs font-semibold text-slate-950 transition-colors hover:bg-amber-500"
            >
              <User className="h-3.5 w-3.5" />
              <span>Portal Login</span>
            </Link>
          )}
          <Link href="/contact" className={buttonVariants({ variant: "default", size: "sm" })}>
            Free Trial
          </Link>
        </div>

        <button
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
          className="inline-flex rounded-md border border-slate-200 p-2 text-slate-800 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-900 lg:hidden"
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <div id="mobile-navigation" className={cn("border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950 lg:hidden", mobileOpen ? "block" : "hidden")}>
        <nav className="mx-auto flex max-w-7xl flex-col px-4 py-4 space-y-1">
          {navigationItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "rounded-md px-3.5 py-2.5 text-sm font-medium transition-colors",
                pathname === item.href
                  ? "bg-amber-100 text-slate-950 dark:bg-amber-300 dark:text-slate-950"
                  : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-900",
              )}
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Theme</span>
              <ThemeToggle />
            </div>
            {isAuthenticated ? (
              <Link
                href="/dashboard"
                className="flex h-10 items-center justify-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-4 text-xs font-semibold text-slate-900 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                onClick={() => setMobileOpen(false)}
              >
                <User className="h-3.5 w-3.5" />
                <span>{user?.name || "Student Dashboard"}</span>
              </Link>
            ) : (
              <Link
                href="/login"
                className="flex h-10 items-center justify-center rounded-md border border-slate-200 px-4 text-xs font-semibold text-slate-800 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-900"
                onClick={() => setMobileOpen(false)}
              >
                Student Portal
              </Link>
            )}
            <Link
              href="/contact"
              className={cn(buttonVariants({ variant: "default", size: "sm" }), "w-full")}
              onClick={() => setMobileOpen(false)}
            >
              Book Free Trial
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
