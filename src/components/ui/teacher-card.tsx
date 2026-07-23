import { GraduationCap } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface TeacherCardProps {
  name: string;
  role: string;
  description: string;
}

export function TeacherCard({ name, role, description }: TeacherCardProps) {
  return (
    <Card className="h-full border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <CardHeader>
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300">
          <GraduationCap className="h-6 w-6" />
        </div>
        <CardTitle className="text-xl font-bold text-slate-950 dark:text-white">{name}</CardTitle>
        <p className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">{role}</p>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-sm leading-6 text-slate-700 dark:text-slate-300">{description}</CardDescription>
      </CardContent>
    </Card>
  );
}
