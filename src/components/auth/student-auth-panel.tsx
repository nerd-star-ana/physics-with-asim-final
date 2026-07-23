"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Eye, EyeOff, LockKeyhole, User, Sparkles, AlertCircle, Shield, GraduationCap } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth, DEMO_ACCOUNTS } from "@/context/auth-context";

type AuthVariant = "login" | "register" | "forgot" | "reset";

type AuthFormValues = {
  name?: string;
  usernameOrEmail: string;
  email?: string;
  password: string;
  confirmPassword?: string;
  remember?: boolean;
};

const loginSchema = z.object({
  usernameOrEmail: z.string().min(1, "Please enter your username or email address."),
  password: z.string().min(1, "Please enter your password."),
  remember: z.boolean().optional(),
});

const registerSchema = z
  .object({
    name: z.string().min(2, "Please enter your full name."),
    email: z.string().email("Please enter a valid email address."),
    password: z.string().min(4, "Password must be at least 4 characters."),
    confirmPassword: z.string().min(4, "Please confirm your password."),
  })
  .refine((value) => value.password === value.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  });

const forgotSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
});

const resetSchema = z
  .object({
    password: z.string().min(4, "Password must be at least 4 characters."),
    confirmPassword: z.string().min(4, "Please confirm your password."),
  })
  .refine((value) => value.password === value.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  });

const variantCopy: Record<AuthVariant, { eyebrow: string; title: string; subtitle: string; primary: string; secondary: string; tertiary: string }> = {
  login: {
    eyebrow: "Account Portal Access",
    title: "Welcome to Physics with Asim.",
    subtitle: "Sign in to access your customized learning space, assignment submissions, live classes, or teacher command center.",
    primary: "Sign in to Portal",
    secondary: "Create Account",
    tertiary: "Secure Login",
  },
  register: {
    eyebrow: "New Student Onboarding",
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
  const { user, isAuthenticated, isLoading, login, register: authRegister, forgotPassword, resetPassword } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const { register, handleSubmit, setValue, watch, setError, formState: { errors } } = useForm<AuthFormValues>({
    defaultValues: {
      usernameOrEmail: "",
      email: "",
      password: "",
      remember: true,
    },
  });

  const watchedUsername = watch("usernameOrEmail");

  // Dynamic role detection based on input
  const cleanUsername = watchedUsername ? watchedUsername.trim().toLowerCase() : "";
  const detectedRole =
    cleanUsername === "asim" || cleanUsername.includes("asim@")
      ? "teacher"
      : cleanUsername.startsWith("student") || Object.keys(DEMO_ACCOUNTS).includes(cleanUsername)
      ? "student"
      : null;

  // Auto redirect if already logged in
  useEffect(() => {
    if (!isLoading && isAuthenticated && user) {
      if (user.role === "teacher") {
        router.replace("/teacher");
      } else {
        router.replace("/dashboard");
      }
    }
  }, [isAuthenticated, isLoading, user, router]);

  const copy = variantCopy[variant];
  const passwordFieldType = showPassword ? "text" : "password";
  const confirmPasswordFieldType = showConfirmPassword ? "text" : "password";

  const featureList = useMemo(
    () => [
      "Role-protected portal routing",
      "Teacher & Student demo modes",
      "Live exam-ready progress tracking",
    ],
    [],
  );

  const handleQuickLoginSelect = (username: string) => {
    setValue("usernameOrEmail", username);
    setValue("password", "123");
    setErrorMessage(null);
  };

  const onSubmit = async (values: AuthFormValues) => {
    setIsSubmitting(true);
    setSuccessMessage(null);
    setErrorMessage(null);

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
      const res = await login(values.usernameOrEmail, values.password);
      if (res.success && res.user) {
        setSuccessMessage(`Welcome back, ${res.user.name}! Redirecting to your portal...`);
        const targetPath = res.user.role === "teacher" ? "/teacher" : "/dashboard";
        setTimeout(() => router.push(targetPath), 600);
      } else {
        setErrorMessage(res.message || "Invalid credentials. Please try again.");
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
      const res = await authRegister(values.name || "Student", values.email || values.usernameOrEmail, values.password);
      if (res.success) {
        setSuccessMessage("Account created! Redirecting to student dashboard...");
        setTimeout(() => router.push("/dashboard"), 800);
      } else {
        setErrorMessage(res.message || "Could not create account.");
      }
    } else if (variant === "forgot") {
      const result = forgotSchema.safeParse({ email: values.email || values.usernameOrEmail });
      if (!result.success) {
        setError("usernameOrEmail", { message: "Please enter a valid email address." });
        setIsSubmitting(false);
        return;
      }
      const res = await forgotPassword(values.email || values.usernameOrEmail);
      if (res.success) {
        setSuccessMessage(res.message || "Recovery instructions sent.");
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
              <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">{copy.title}</h1>
              <p className="max-w-lg text-sm text-slate-200 leading-relaxed">{copy.subtitle}</p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {featureList.map((item) => (
                <div key={item} className="rounded-2xl border border-white/15 bg-white/10 p-3 text-xs text-indigo-100 backdrop-blur-md font-medium">
                  {item}
                </div>
              ))}
            </div>

            <div className="grid gap-4 rounded-[24px] border border-white/10 bg-slate-950/40 p-4 backdrop-blur-md sm:grid-cols-2">
              <div className="space-y-1">
                <div className="text-2xl font-bold text-amber-400 flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  <span>Teacher Suite</span>
                </div>
                <p className="text-xs text-slate-300">
                  Login as <code className="bg-slate-800 px-1.5 py-0.5 rounded text-amber-300 font-mono">asim</code> / <code className="bg-slate-800 px-1.5 py-0.5 rounded text-amber-300 font-mono">123</code>
                </p>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold text-cyan-400 flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  <span>Student Portal</span>
                </div>
                <p className="text-xs text-slate-300">
                  Login as <code className="bg-slate-800 px-1.5 py-0.5 rounded text-cyan-300 font-mono">student1</code>..<code className="bg-slate-800 px-1.5 py-0.5 rounded text-cyan-300 font-mono">5</code> / <code className="bg-slate-800 px-1.5 py-0.5 rounded text-cyan-300 font-mono">123</code>
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <Card className="p-2 border-slate-200/80 dark:border-slate-800">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="rounded-[28px] bg-white p-5 dark:bg-slate-950/60 sm:p-6"
          >
            <div className="flex items-center justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-xs font-black text-white">
                    A
                  </span>
                  <span className="text-xs font-bold tracking-widest text-slate-900 dark:text-white uppercase">Physics With Asim</span>
                </div>
                <h2 className="mt-2 text-2xl font-bold text-slate-950 dark:text-white">{copy.eyebrow}</h2>
              </div>
              <div className="rounded-full bg-indigo-50 p-2.5 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300">
                <LockKeyhole className="h-5 w-5" />
              </div>
            </div>

            {/* Role Detector Badge */}
            {variant === "login" && (
              <div className="mt-4 flex items-center justify-between rounded-xl bg-slate-100 p-2.5 dark:bg-slate-900 text-xs">
                <span className="font-semibold text-slate-600 dark:text-slate-400">Target Role:</span>
                {detectedRole === "teacher" ? (
                  <span className="flex items-center gap-1.5 rounded-lg bg-amber-500/20 px-2.5 py-1 font-extrabold text-amber-700 dark:text-amber-300 border border-amber-500/30">
                    👑 Teacher Account (/teacher)
                  </span>
                ) : detectedRole === "student" ? (
                  <span className="flex items-center gap-1.5 rounded-lg bg-indigo-500/20 px-2.5 py-1 font-extrabold text-indigo-700 dark:text-indigo-300 border border-indigo-500/30">
                    🎓 Student Account (/dashboard)
                  </span>
                ) : (
                  <span className="font-medium text-slate-500 italic">Enter username to detect role</span>
                )}
              </div>
            )}

            {/* Quick Demo Fill Buttons for Testing */}
            {variant === "login" && (
              <div className="mt-4 space-y-2 rounded-2xl border border-indigo-100 bg-indigo-50/50 p-3 dark:border-indigo-950/60 dark:bg-indigo-950/20">
                <div className="text-[11px] font-bold uppercase tracking-wider text-indigo-900 dark:text-indigo-300 flex items-center justify-between">
                  <span>⚡ Quick Demo Fill (Password: 123)</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleQuickLoginSelect("asim")}
                    className="rounded-lg bg-amber-500/15 hover:bg-amber-500/30 text-amber-800 dark:text-amber-200 border border-amber-500/30 px-2.5 py-1 text-xs font-bold transition flex items-center gap-1"
                  >
                    👑 Teacher (asim)
                  </button>
                  {["student1", "student2", "student3", "student4", "student5"].map((std) => (
                    <button
                      key={std}
                      type="button"
                      onClick={() => handleQuickLoginSelect(std)}
                      className="rounded-lg bg-indigo-500/15 hover:bg-indigo-500/30 text-indigo-800 dark:text-indigo-200 border border-indigo-500/30 px-2.5 py-1 text-xs font-semibold transition"
                    >
                      🎓 {std}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <form className="mt-5 space-y-4" onSubmit={handleSubmit(onSubmit)}>
              {showNameField && (
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-900 dark:text-slate-100" htmlFor="name">
                    Full Name
                  </label>
                  <Input
                    id="name"
                    aria-invalid={Boolean(errors.name)}
                    placeholder="Ahmed Khan"
                    {...register("name")}
                  />
                  {errors.name && <p className="text-xs font-medium text-rose-600">{errors.name.message}</p>}
                </div>
              )}

              {!isReset && (
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-900 dark:text-slate-100" htmlFor="usernameOrEmail">
                    {variant === "login" ? "Username or Email Address" : "Email Address"}
                  </label>
                  <div className="relative">
                    <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <Input
                      id="usernameOrEmail"
                      aria-invalid={Boolean(errors.usernameOrEmail)}
                      className="pl-9 text-slate-900 dark:text-slate-100"
                      placeholder={variant === "login" ? "e.g. asim, student1, or student@physics.com" : "student@physics.com"}
                      {...register("usernameOrEmail")}
                    />
                  </div>
                  {errors.usernameOrEmail && <p className="text-xs font-medium text-rose-600">{errors.usernameOrEmail.message}</p>}
                </div>
              )}

              {!isForgot && (
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-900 dark:text-slate-100" htmlFor="password">
                      {isReset ? "New Password" : "Password"}
                    </label>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      type={passwordFieldType}
                      aria-invalid={Boolean(errors.password)}
                      className="pr-10 text-slate-900 dark:text-slate-100"
                      placeholder="Enter '123' for demo accounts"
                      {...register("password")}
                    />
                    <button
                      type="button"
                      aria-label="Toggle password visibility"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                      onClick={() => setShowPassword((value) => !value)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.password && <p className="text-xs font-medium text-rose-600">{errors.password.message}</p>}
                </div>
              )}

              {showConfirmPasswordField && (
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-900 dark:text-slate-100" htmlFor="confirmPassword">
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
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                      onClick={() => setShowConfirmPassword((value) => !value)}
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="text-xs font-medium text-rose-600">{errors.confirmPassword.message}</p>}
                </div>
              )}

              {variant === "login" && (
                <div className="flex items-center justify-between gap-3 text-xs">
                  <label className="inline-flex items-center gap-2 font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
                    <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" {...register("remember")} />
                    Keep me signed in
                  </label>
                  <Link href="/forgot-password" className="font-semibold text-indigo-600 hover:underline dark:text-indigo-400">
                    Forgot password?
                  </Link>
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-indigo-600 font-bold text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 h-11 text-sm shadow-md shadow-indigo-600/20"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Authenticating..." : copy.primary}
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>

              <AnimatePresence>
                {errorMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-2.5 text-xs text-rose-800 dark:border-rose-900/70 dark:bg-rose-950/40 dark:text-rose-200"
                  >
                    <div className="flex items-center gap-2 font-medium">
                      <AlertCircle className="h-4 w-4 text-rose-600 shrink-0 dark:text-rose-400" />
                      <span>{errorMessage}</span>
                    </div>
                  </motion.div>
                )}

                {successMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="rounded-xl border border-emerald-200 bg-emerald-50 px-3.5 py-2.5 text-xs text-emerald-800 dark:border-emerald-900/70 dark:bg-emerald-950/40 dark:text-emerald-200"
                  >
                    <div className="flex items-center gap-2 font-medium">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 dark:text-emerald-400" />
                      <span>{successMessage}</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>

            <div className="mt-5 flex items-center justify-between gap-2 text-xs text-slate-600 dark:text-slate-400 pt-3 border-t border-slate-100 dark:border-slate-800">
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

