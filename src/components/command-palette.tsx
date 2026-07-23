"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Command, Search, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

const commands = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Courses", href: "/courses" },
  { label: "Teaching Levels", href: "/teaching-levels" },
  { label: "Resources", href: "/resources" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen(true);
      }

      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 dark:border-slate-700 dark:text-slate-200"
        >
          <Search className="h-4 w-4" />
          <span className="hidden xl:inline">Ctrl/Cmd + K</span>
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[min(92vw,640px)] -translate-x-1/2 -translate-y-1/2 rounded-[28px] border border-slate-200 bg-white p-4 shadow-[0_22px_80px_rgba(15,23,42,0.25)] dark:border-slate-800 dark:bg-slate-950">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-300">
              <Command className="h-4 w-4" />
              Quick navigation
            </div>
            <Dialog.Close asChild>
              <Button variant="secondary" size="sm" aria-label="Close command palette">
                <X className="h-4 w-4" />
              </Button>
            </Dialog.Close>
          </div>

          <div className="mt-4 space-y-2">
            {commands.map((command) => (
              <Link
                key={command.label}
                href={command.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between rounded-2xl px-3 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-900"
              >
                <span>{command.label}</span>
                <span className="text-slate-400">↗</span>
              </Link>
            ))}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
