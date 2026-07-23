"use client";

import { Button } from "@/components/ui/button";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center justify-center px-4 py-20 text-center">
      <h1 className="text-4xl font-semibold text-slate-950 dark:text-white">Something went wrong</h1>
      <p className="mt-4 text-slate-600 dark:text-slate-300">
        A temporary issue interrupted the page. Please retry this view to continue exploring the Physics with Asim platform.
      </p>
      <div className="mt-6">
        <Button onClick={reset}>Try again</Button>
      </div>
    </div>
  );
}
