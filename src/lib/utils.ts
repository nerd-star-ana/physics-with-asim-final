import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const navigationItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/resources", label: "Resources" },
  { href: "/teaching-levels", label: "Teaching Levels" },
  { href: "/contact", label: "Contact" },
];

export const featureCards = [
  {
    title: "Concept-Based Teaching",
    description: "Every lesson starts from the idea, not the formula, so students build intuition that sticks.",
  },
  {
    title: "Exam-Focused Learning",
    description: "Our sessions translate complex physics into exam-ready structure and confidence.",
  },
  {
    title: "Interactive Lessons",
    description: "Visual demos, immediate feedback, and focused questions keep students fully engaged.",
  },
  {
    title: "Flexible Online Classes",
    description: "Learn from anywhere with a structured rhythm that fits busy school schedules.",
  },
  {
    title: "Structured Learning Path",
    description: "We map each topic from foundation to mastery with predictable progression.",
  },
  {
    title: "Personal Guidance",
    description: "Students receive tailored support that adapts to their pace and confidence level.",
  },
];

export const teachingLevels = [
  "Cambridge IGCSE Physics",
  "Cambridge O Level Physics",
  "Edexcel International GCSE Physics",
  "Edexcel O Level Physics",
  "Cambridge AS Level Physics",
  "Cambridge A Level Physics",
  "Edexcel AS Level Physics",
  "Edexcel A Level Physics",
];
