import type { Metadata } from "next";

import { StudentDashboard } from "@/components/dashboard/student-dashboard";

export const metadata: Metadata = {
  title: "Student Dashboard",
  description: "Track your Physics with Asim learning progress, assignments, upcoming live sessions, and topic analytics.",
};

export default function DashboardPage() {
  return <StudentDashboard />;
}
