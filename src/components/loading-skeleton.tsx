export function LoadingSkeleton() {
  return (
    <div className="space-y-4">
      <div className="h-8 w-56 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="h-56 animate-pulse rounded-[28px] bg-slate-200 dark:bg-slate-800" />
        ))}
      </div>
    </div>
  );
}
