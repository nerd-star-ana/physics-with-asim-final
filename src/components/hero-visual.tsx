export function HeroVisual() {
  return (
    <div className="relative isolate overflow-hidden rounded-[32px] border border-sky-200/60 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.28),transparent_35%),linear-gradient(160deg,#0f172a,#0b1120)] p-8 shadow-[0_18px_70px_rgba(1,19,44,0.35)] dark:border-sky-900/70">
      <div className="absolute inset-0 opacity-50 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="relative flex min-h-[420px] items-center justify-center">
        <div className="absolute h-64 w-64 rounded-full border border-cyan-300/40" />
        <div className="absolute h-44 w-44 rounded-full border border-cyan-200/20" />
        <div className="absolute h-72 w-72 rounded-full border border-sky-300/30" />
        <div className="absolute h-24 w-24 rounded-full bg-sky-400/80 blur-2xl" />
        <div className="relative flex h-64 w-64 items-center justify-center rounded-full bg-slate-950/60 ring-1 ring-white/10">
          <div className="absolute h-24 w-24 rounded-full border border-cyan-200/80" />
          <div className="absolute h-[140px] w-[140px] rounded-full border border-sky-300/50" />
          <div className="absolute h-[200px] w-[200px] rounded-full border border-cyan-200/25" />
          <div className="z-10 rounded-full bg-[linear-gradient(135deg,#1d4ed8,#38bdf8)] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-900/40">
            Physics in Motion
          </div>
        </div>
      </div>
    </div>
  );
}
