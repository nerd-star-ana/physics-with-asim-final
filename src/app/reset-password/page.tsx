import type { Metadata } from "next";

import { StudentAuthPanel } from "@/components/auth/student-auth-panel";

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Set a new password for your Physics with Asim student portal account.",
};

export default function ResetPasswordPage() {
  return <StudentAuthPanel variant="reset" />;
}
