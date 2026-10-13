export function HeroVisual() {
  return (
    <div className="relative isolate overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-8">
      <div className="absolute inset-0 opacity-60 [background-image:linear-gradient(rgba(24,59,99,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(24,59,99,0.05)_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="relative flex min-h-[360px] items-center justify-center">
        <div className="absolute h-64 w-64 rounded-full border border-[var(--color-primary)]/20" />
        <div className="absolute h-44 w-44 rounded-full border border-[var(--color-secondary)]/25" />
        <div className="absolute h-72 w-72 rounded-full border border-[var(--color-primary)]/15" />
        <div className="relative flex h-64 w-64 items-center justify-center rounded-full bg-[var(--color-surface)] ring-1 ring-[var(--color-border)]">
          <div className="absolute h-24 w-24 rounded-full border border-[var(--color-accent)]/50" />
          <div className="absolute h-[140px] w-[140px] rounded-full border border-[var(--color-primary)]/30" />
          <div className="absolute h-[200px] w-[200px] rounded-full border border-[var(--color-secondary)]/20" />
          <div className="z-10 rounded-md bg-[var(--color-accent)] px-5 py-3 text-sm font-semibold text-[var(--color-button-primary-text)]">
            Physics in Motion
          </div>
        </div>
      </div>
    </div>
  );
}
