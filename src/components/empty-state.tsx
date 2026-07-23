import { Inbox } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description: string;
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-[28px] border border-dashed border-slate-300 bg-white/70 px-8 py-14 text-center dark:border-slate-700 dark:bg-slate-950/60">
      <Inbox className="mb-4 h-8 w-8 text-sky-600 dark:text-sky-300" />
      <h3 className="text-lg font-semibold text-slate-950 dark:text-white">{title}</h3>
      <p className="mt-2 max-w-md text-sm text-slate-600 dark:text-slate-300">{description}</p>
    </div>
  );
}
