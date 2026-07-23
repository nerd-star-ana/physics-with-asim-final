import type { Metadata } from "next";

import { StudentAuthPanel } from "@/components/auth/student-auth-panel";

export const metadata: Metadata = {
  title: "Forgot Password",
  description: "Reset your Physics with Asim student portal password.",
};

export default function ForgotPasswordPage() {
  return <StudentAuthPanel variant="forgot" />;
}
