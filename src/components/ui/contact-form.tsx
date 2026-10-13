"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name."),
  email: z.string().email("Please enter a valid email address."),
  message: z.string().min(10, "Your message should be at least 10 characters long."),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>();

  const onSubmit = async (values: ContactFormValues) => {
    const parsed = contactSchema.safeParse(values);

    if (!parsed.success) {
      parsed.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof ContactFormValues;
        if (field) {
          setError(field, { message: issue.message });
        }
      });
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 350));
    setSubmitted(true);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-900 dark:text-slate-100" htmlFor="contact-name">
            Your Name
          </label>
          <Input id="contact-name" aria-label="Name" placeholder="e.g. Sarah Ahmed" className="text-slate-900 dark:text-slate-100" {...register("name")} />
          {errors.name ? <p className="mt-1.5 text-xs font-medium text-rose-600">{errors.name.message}</p> : null}
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-900 dark:text-slate-100" htmlFor="contact-email">
            Email Address
          </label>
          <Input id="contact-email" aria-label="Email" type="email" placeholder="you@example.com" className="text-slate-900 dark:text-slate-100" {...register("email")} />
          {errors.email ? <p className="mt-1.5 text-xs font-medium text-rose-600">{errors.email.message}</p> : null}
        </div>
      </div>

      <div>
        <label className="mb-1 block text-xs font-semibold text-slate-900 dark:text-slate-100" htmlFor="contact-message">
          Message
        </label>
        <textarea
          id="contact-message"
          aria-label="Message"
          rows={4}
          className="flex min-h-28 w-full rounded-md border border-slate-200 bg-white px-4 py-3 text-sm font-normal text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:ring-indigo-900"
          placeholder="Share your current physics syllabus, target grade, or trial request details..."
          {...register("message")}
        />
        {errors.message ? <p className="mt-1.5 text-xs font-medium text-rose-600">{errors.message.message}</p> : null}
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
        {isSubmitting ? "Sending..." : "Send Trial Request"}
      </Button>

      {submitted ? (
        <Alert>
          Thank you for reaching out! A member of the Physics with Asim academic team will contact you shortly to schedule your trial lesson.
        </Alert>
      ) : null}
    </form>
  );
}
