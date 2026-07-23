"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Eye, EyeOff, LockKeyhole, Mail, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/auth-context";

type AuthVariant = "login" | "register" | "forgot" | "reset";

type AuthFormValues = {
  name?: string;
  email: string;
  password: string;
  confirmPassword?: string;
  remember?: boolean;
};

const loginSchema = z.object({
  email: z.string().email("Please enter a valid student email."),
  password: z.string().min(8, "Password must be at least 8 characters."),
  remember: z.boolean().optional(),
});

const registerSchema = z
  .object({
    name: z.string().min(2, "Please enter your full name."),
    email: z.string().email("Please enter a valid student email."),
    password: z.string().min(8, "Password must be at least 8 characters."),
    confirmPassword: z.string().min(8, "Please confirm your password."),
  })
  .refine((value) => value.password === value.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  });

const forgotSchema = z.object({
  email: z.string().email("Please enter a valid student email."),
});

const resetSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters."),
    confirmPassword: z.string().min(8, "Please confirm your password."),
  })
  .refine((value) => value.password === value.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  });

const variantCopy: Record<AuthVariant, { eyebrow: string; title: string; subtitle: string; primary: string; secondary: string; tertiary: string }> = {
  login: {
    eyebrow: "Student Access",
    title: "Welcome back to Physics with Asim.",
    subtitle: "Continue your concept-first learning journey with live progress, assignments, and exam-ready study tools.",
    primary: "Sign in to Dashboard",
    secondary: "Create Account",
    tertiary: "Forgot your password?",
  },
  register: {
    eyebrow: "New Student",
    title: "Create your student account.",
    subtitle: "Set up your profile and start building a disciplined, high-performing physics learning routine.",
    primary: "Create Account",
    secondary: "Already have an account?",
    tertiary: "Secure Onboarding",
  },
  forgot: {
    eyebrow: "Password Recovery",
    title: "Reset your access securely.",
    subtitle: "We'll send a secure recovery link to your account email so you can regain portal access quickly.",
    primary: "Send Recovery Link",
    secondary: "Back to Login",
    tertiary: "Self-Service Reset",
  },
  reset: {
    eyebrow: "Password Update",
    title: "Choose a new password.",
    subtitle: "Create a fresh password with enough strength to keep your student dashboard protected.",
    primary: "Update Password",
    secondary: "Return to Login",
    tertiary: "Security First",
  },
};

export function StudentAuthPanel({ variant }: { variant: AuthVariant }) {
  const router = useRouter();
  const { login, register: authRegister, forgotPassword, resetPassword } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const { register, handleSubmit, setError, formState: { errors } } = useForm<AuthFormValues>({
    defaultValues: {
      remember: true,
    },
  });

  const copy = variantCopy[variant];

  const passwordFieldType = showPassword ? "text" : "password";
  const confirmPasswordFieldType = showConfirmPassword ? "text" : "password";

  const featureList = useMemo(
    () => [
      "Course progress tracking",
      "Weekly exam-ready study flow",
      "Direct instructor Q&A",
    ],
    [],
  );

  const onSubmit = async (values: AuthFormValues) => {
    setIsSubmitting(true);
    setSuccessMessage(null);

    if (variant === "login") {
      const result = loginSchema.safeParse(values);
      if (!result.success) {
        result.error.issues.forEach((issue) => {
          const field = issue.path[0] as keyof AuthFormValues;
          if (field) setError(field, { message: issue.message });
        });
        setIsSubmitting(false);
        return;
      }
      const res = await login(values.email, values.password);
      if (res.success) {
        setSuccessMessage("Sign in successful! Redirecting to student dashboard...");
        setTimeout(() => router.push("/dashboard"), 800);
      }
    } else if (variant === "register") {
      const result = registerSchema.safeParse(values);
      if (!result.success) {
        result.error.issues.forEach((issue) => {
          const field = issue.path[0] as keyof AuthFormValues;
          if (field) setError(field, { message: issue.message });
        });
        setIsSubmitting(false);
        return;
      }
      const res = await authRegister(values.name || "Student", values.email, values.password);
      if (res.success) {
        setSuccessMessage("Account created! Redirecting to student dashboard...");
        setTimeout(() => router.push("/dashboard"), 800);
      }
    } else if (variant === "forgot") {
      const result = forgotSchema.safeParse(values);
      if (!result.success) {
        result.error.issues.forEach((issue) => {
          const field = issue.path[0] as keyof AuthFormValues;
          if (field) setError(field, { message: issue.message });
        });
        setIsSubmitting(false);
        return;
      }
      const res = await forgotPassword(values.email);
      if (res.success) {
        setSuccessMessage("Recovery instructions sent to your email address.");
      }
    } else if (variant === "reset") {
      const result = resetSchema.safeParse(values);
      if (!result.success) {
        result.error.issues.forEach((issue) => {
          const field = issue.path[0] as keyof AuthFormValues;
          if (field) setError(field, { message: issue.message });
        });
        setIsSubmitting(false);
        return;
      }
      const res = await resetPassword(values.password);
      if (res.success) {
        setSuccessMessage("Password updated successfully! You can now log in.");
        setTimeout(() => router.push("/login"), 1000);
      }
    }

    setIsSubmitting(false);
  };

  const isRegister = variant === "register";
  const isForgot = variant === "forgot";
  const isReset = variant === "reset";

  const showNameField = isRegister;
  const showConfirmPasswordField = isRegister || isReset;

  return (
    <div className="page-shell min-h-[calc(100vh-8rem)] py-8">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="relative overflow-hidden rounded-[32px] border border-indigo-200/80 bg-[linear-gradient(135deg,#0b1120_0%,#1e1b4b_50%,#0f172a_100%)] p-6 text-white shadow-xl dark:border-indigo-900/60"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.25),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.2),transparent_35%)]" />
          <div className="relative space-y-6">
            <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.36em] text-indigo-300">
              <Sparkles className="h-4 w-4" />
              Physics with Asim
            </div>

            <div className="max-w-xl space-y-4">
              <p className="text-sm font-medium uppercase tracking-[0.4em] text-indigo-300">{copy.eyebrow}</p>
              <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">{copy.title}</h1>
              <p className="max-w-lg text-base text-slate-200">{copy.subtitle}</p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {featureList.map((item) => (
                <div key={item} className="rounded-2xl border border-white/15 bg-white/10 p-3 text-sm text-indigo-100 backdrop-blur-md">
                  {item}
                </div>
              ))}
            </div>

            <div className="grid gap-4 rounded-[24px] border border-white/10 bg-slate-950/40 p-4 backdrop-blur-md sm:grid-cols-2">
              <div>
                <div className="text-3xl font-semibold text-white">98%</div>
                <p className="text-sm text-indigo-200">Exam confidence rate</p>
              </div>
              <div>
                <div className="text-3xl font-semibold text-white">12+</div>
                <p className="text-sm text-indigo-200">Modules & revision packs</p>
              </div>
            </div>
          </div>
        </motion.div>

        <Card className="p-2">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="rounded-[28px] bg-white p-5 dark:bg-slate-950/60 sm:p-6"
          >
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.38em] text-indigo-600 dark:text-indigo-400">{copy.tertiary}</p>
                <h2 className="mt-2 text-2xl font-bold text-slate-950 dark:text-white">{copy.eyebrow}</h2>
              </div>
              <div className="rounded-full bg-indigo-50 p-2.5 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300">
                <LockKeyhole className="h-5 w-5" />
              </div>
            </div>

            <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
              {showNameField && (
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-900 dark:text-slate-100" htmlFor="name">
                    Full Name
                  </label>
                  <Input
                    id="name"
                    aria-invalid={Boolean(errors.name)}
                    placeholder="Ahmed Khan"
                    {...register("name")}
                  />
                  {errors.name && <p className="text-sm font-medium text-rose-600">{errors.name.message}</p>}
                </div>
              )}

              {!isReset && (
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-900 dark:text-slate-100" htmlFor="email">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <Input
                      id="email"
                      type="email"
                      aria-invalid={Boolean(errors.email)}
                      className="pl-9 text-slate-900 dark:text-slate-100"
                      placeholder="student@physicswithasim.com"
                      {...register("email")}
                    />
                  </div>
                  {errors.email && <p className="text-sm font-medium text-rose-600">{errors.email.message}</p>}
                </div>
              )}

              {!isForgot && (
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-900 dark:text-slate-100" htmlFor="password">
                    {isReset ? "New Password" : "Password"}
                  </label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={passwordFieldType}
                      aria-invalid={Boolean(errors.password)}
                      className="pr-10 text-slate-900 dark:text-slate-100"
                      placeholder="••••••••"
                      {...register("password")}
                    />
                    <button
                      type="button"
                      aria-label="Toggle password visibility"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
                      onClick={() => setShowPassword((value) => !value)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.password && <p className="text-sm font-medium text-rose-600">{errors.password.message}</p>}
                </div>
              )}

              {showConfirmPasswordField && (
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-900 dark:text-slate-100" htmlFor="confirmPassword">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={confirmPasswordFieldType}
                      aria-invalid={Boolean(errors.confirmPassword)}
                      className="pr-10 text-slate-900 dark:text-slate-100"
                      placeholder="••••••••"
                      {...register("confirmPassword")}
                    />
                    <button
                      type="button"
                      aria-label="Toggle confirm password visibility"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
                      onClick={() => setShowConfirmPassword((value) => !value)}
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="text-sm font-medium text-rose-600">{errors.confirmPassword.message}</p>}
                </div>
              )}

              {variant === "login" && (
                <div className="flex items-center justify-between gap-3 text-sm">
                  <label className="inline-flex items-center gap-2 font-medium text-slate-700 dark:text-slate-300">
                    <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" {...register("remember")} />
                    Remember me
                  </label>
                  <Link href="/forgot-password" className="font-semibold text-indigo-600 hover:underline dark:text-indigo-400">
                    Forgot password?
                  </Link>
                </div>
              )}

              <Button type="submit" className="w-full bg-indigo-600 font-semibold text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600" disabled={isSubmitting}>
                {isSubmitting ? "Processing..." : copy.primary}
                <ArrowRight className="h-4 w-4" />
              </Button>

              <AnimatePresence>
                {successMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800 dark:border-emerald-900/70 dark:bg-emerald-950/40 dark:text-emerald-200"
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                      <span>{successMessage}</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>

            <div className="mt-5 flex items-center justify-between gap-2 text-sm text-slate-700 dark:text-slate-300">
              <span>
                {isRegister ? "Already have an account?" : variant === "forgot" ? "Remembered password?" : variant === "reset" ? "Back to login?" : "Need a student account?"}
              </span>
              <Link href={isRegister ? "/login" : isForgot ? "/login" : isReset ? "/login" : "/register"} className="font-bold text-indigo-600 hover:underline dark:text-indigo-400">
                {isRegister ? "Sign in" : isForgot ? "Sign in" : isReset ? "Sign in" : "Create Account"}
              </Link>
            </div>
          </motion.div>
        </Card>
      </div>
    </div>
  );
}
