import type { Metadata } from "next";

import { StudentAuthPanel } from "@/components/auth/student-auth-panel";

export const metadata: Metadata = {
  title: "Student Registration",
  description: "Create your student account with Physics with Asim and start your structured physics learning journey.",
};

export default function RegisterPage() {
  return <StudentAuthPanel variant="register" />;
}
