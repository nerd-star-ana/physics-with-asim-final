import type { Metadata } from "next";

import { StudentAuthPanel } from "@/components/auth/student-auth-panel";

export const metadata: Metadata = {
  title: "Student Login",
  description: "Sign in to access your Physics with Asim LMS student dashboard, course materials, and progress analytics.",
};

export default function LoginPage() {
  return <StudentAuthPanel variant="login" />;
}
