import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export function Section({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return <section className={cn("mx-auto max-w-7xl px-5 py-14 sm:px-6 sm:py-16 lg:px-8", className)} {...props} />;
}
