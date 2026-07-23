import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-indigo-600 text-white shadow-md shadow-indigo-600/20 hover:bg-indigo-700 hover:-translate-y-0.5 dark:bg-indigo-500 dark:text-white dark:hover:bg-indigo-600",
        secondary:
          "border border-slate-200 bg-slate-100/90 text-slate-900 hover:bg-slate-200/80 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-100 dark:hover:bg-slate-800",
        ghost: "text-slate-800 hover:bg-slate-100/80 dark:text-slate-200 dark:hover:bg-slate-900",
        outline: "border border-indigo-200 bg-white text-indigo-700 hover:bg-indigo-50 dark:border-indigo-800 dark:bg-slate-950 dark:text-indigo-300 dark:hover:bg-indigo-950/50",
      },
      size: {
        default: "h-11 px-5",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-6 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

export { Button, buttonVariants };
