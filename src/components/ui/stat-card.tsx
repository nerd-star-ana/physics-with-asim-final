import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  value: string;
  label: string;
}

export function StatCard({ value, label }: StatCardProps) {
  return (
    <Card className="h-full overflow-hidden text-center">
      <div className="absolute inset-x-0 top-0 h-1 bg-[var(--color-accent)]" />
      <CardContent className="p-6">
        <div className="text-3xl font-bold text-[var(--color-primary)]">{value}</div>
        <p className="mt-1.5 text-xs font-semibold text-[var(--color-text)]">{label}</p>
      </CardContent>
    </Card>
  );
}
