import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  value: string;
  label: string;
}

export function StatCard({ value, label }: StatCardProps) {
  return (
    <Card className="h-full overflow-hidden text-center border-slate-200 bg-white/90 dark:border-slate-800 dark:bg-slate-950/80">
      <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#4338ca,#059669,#0891b2)]" />
      <CardContent className="p-6">
        <div className="text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white">{value}</div>
        <p className="mt-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300">{label}</p>
      </CardContent>
    </Card>
  );
}
