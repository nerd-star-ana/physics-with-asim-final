"use client";

import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";

import { Button } from "@/components/ui/button";

function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

function getSnapshot() {
  return document.documentElement.classList.contains("dark");
}

function getServerSnapshot() {
  return false;
}

export function ThemeToggle() {
  const isDark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggleTheme = () => {
    const root = document.documentElement;
    const currentIsDark = root.classList.contains("dark");
    const nextTheme = currentIsDark ? "light" : "dark";

    root.classList.toggle("dark", !currentIsDark);
    root.style.colorScheme = nextTheme;
    window.localStorage.setItem("theme", nextTheme);
  };

  return (
    <Button
      variant="secondary"
      size="sm"
      aria-label="Toggle theme"
      onClick={toggleTheme}
    >
      <span className="sr-only">Toggle theme</span>
      {isDark ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-slate-700" />}
    </Button>
  );
}
