import * as React from "react";

import { cn } from "@/lib/utils";

const badgeVariants = {
  default:
    "border border-[var(--color-border)] bg-[var(--color-surface-alt)] text-[var(--color-primary)] font-semibold",
};

function Badge({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("inline-flex items-center rounded-md px-3 py-1 text-xs", badgeVariants.default, className)} {...props} />;
}

export { Badge };
