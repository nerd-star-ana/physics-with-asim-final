import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  action?: ReactNode;
}

export function SectionHeader({ eyebrow, title, description, align = "left", action }: SectionHeaderProps) {
  return (
    <div className={cn("mb-10 flex flex-col gap-2", align === "center" && "items-center text-center")}>
      <p className="text-xs font-bold uppercase tracking-[0.34em] text-indigo-600 dark:text-indigo-400">{eyebrow}</p>
      <div className={cn("flex w-full items-end justify-between gap-4", align === "center" && "justify-center")}>
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-4xl">{title}</h2>
          {description ? (
            <p className="mt-3 max-w-3xl text-base leading-7 text-slate-700 dark:text-slate-300">{description}</p>
          ) : null}
        </div>
        {action}
      </div>
    </div>
  );
}
