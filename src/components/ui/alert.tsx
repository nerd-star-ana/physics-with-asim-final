import * as React from "react";

import { cn } from "@/lib/utils";

const Alert = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-2xl border border-sky-200 bg-sky-50/80 p-4 text-sm text-slate-700 dark:border-sky-900 dark:bg-sky-950/40 dark:text-slate-100",
        className,
      )}
      {...props}
    />
  ),
);
Alert.displayName = "Alert";

export { Alert };
