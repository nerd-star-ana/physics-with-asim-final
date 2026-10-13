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
    <div data-scroll-reveal className={cn("mb-12 flex flex-col gap-3", align === "center" && "items-center text-center")}>
      <p className="text-xs font-bold uppercase tracking-[0.1em] text-[var(--color-secondary)]">{eyebrow}</p>
      <div className={cn("flex w-full items-end justify-between gap-4", align === "center" && "justify-center")}>
        <div>
          <h2 className="max-w-4xl text-3xl font-semibold leading-tight text-[var(--color-primary)] sm:text-4xl">{title}</h2>
          {description ? (
            <p className="mt-3 max-w-3xl text-base leading-7 text-[var(--color-text)]">{description}</p>
          ) : null}
        </div>
        {action}
      </div>
    </div>
  );
}
