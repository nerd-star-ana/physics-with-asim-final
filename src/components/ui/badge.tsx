import * as React from "react";

import { cn } from "@/lib/utils";

const badgeVariants = {
  default:
    "border border-indigo-200 bg-indigo-50/90 text-indigo-900 font-bold dark:border-indigo-800/80 dark:bg-indigo-950/80 dark:text-indigo-200",
};

function Badge({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("inline-flex items-center rounded-full px-3 py-1 text-xs tracking-wide", badgeVariants.default, className)} {...props} />;
}

export { Badge };
