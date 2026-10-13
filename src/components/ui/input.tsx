import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-md border border-[var(--color-input-border)] bg-[var(--color-input-background)] px-4 text-sm text-[var(--color-primary)] outline-none transition focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-accent)]/25",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
