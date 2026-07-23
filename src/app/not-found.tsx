import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center justify-center px-4 py-20 text-center">
      <h1 className="text-4xl font-semibold text-slate-950 dark:text-white">Page not found</h1>
      <p className="mt-4 max-w-xl text-slate-600 dark:text-slate-300">
        The page you requested is not available, but the rest of the Physics with Asim learning experience is ready to explore.
      </p>
      <Link href="/" className="mt-6">
        <Button>Return Home</Button>
      </Link>
    </div>
  );
}
