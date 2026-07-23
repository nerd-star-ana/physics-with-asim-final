"use client";

import { useState } from "react";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock,
  PlayCircle,
  Search,
  Video,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Course {
  id: string;
  code: string;
  title: string;
  category: "A Level" | "AS Level" | "IGCSE";
  level: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  instructor: string;
  thumbnail: string;
  badge: string;
  description: string;
  lessons: { id: string; title: string; duration: string; completed: boolean }[];
}

const coursesData: Course[] = [
  {
    id: "phys-9702-a2",
    code: "PHYS-9702-A2",
    title: "A2 Physics: Electromagnetic Induction & Waves",
    category: "A Level",
    level: "A2 Level",
    progress: 78,
    totalLessons: 24,
    completedLessons: 18,
    instructor: "Sir Asim",
    thumbnail: "from-indigo-600 to-slate-900",
    badge: "In Progress",
    description: "Deep dive into Faraday's law, Lenz's law, magnetic flux linkage, AC generators, and wave optics for Cambridge 9702 Paper 4.",
    lessons: [
      { id: "l1", title: "Magnetic Flux Density & Solenoid Fields", duration: "45 mins", completed: true },
      { id: "l2", title: "Faraday's & Lenz's Law Worked Examples", duration: "52 mins", completed: true },
      { id: "l3", title: "Transformer Efficiency & Eddy Current Losses", duration: "38 mins", completed: true },
      { id: "l4", title: "AC Root Mean Square & Oscilloscope Reading", duration: "50 mins", completed: false },
      { id: "l5", title: "Capacitor Discharge Differential Equations", duration: "60 mins", completed: false },
    ],
  },
  {
    id: "phys-9702-as",
    code: "PHYS-9702-AS",
    title: "AS Physics: Quantum & Wave-Particle Duality",
    category: "AS Level",
    level: "AS Level",
    progress: 92,
    totalLessons: 18,
    completedLessons: 16,
    instructor: "Sir Asim",
    thumbnail: "from-cyan-600 to-blue-900",
    badge: "Exam Ready",
    description: "Master photon energy equations, photoelectric effect threshold frequencies, line spectra, and de Broglie wavelengths.",
    lessons: [
      { id: "l1", title: "Quantization of Energy & Photons", duration: "40 mins", completed: true },
      { id: "l2", title: "Photoelectric Effect Experiment Setup", duration: "48 mins", completed: true },
      { id: "l3", title: "Work Function & Stopping Potential", duration: "55 mins", completed: true },
      { id: "l4", title: "Emission & Absorption Line Spectra", duration: "42 mins", completed: true },
      { id: "l5", title: "De Broglie Electron Diffraction Seminar", duration: "50 mins", completed: false },
    ],
  },
  {
    id: "phys-mech-ex",
    code: "PHYS-MECH-EX",
    title: "Mechanics & Gravitational Fields Masterclass",
    category: "A Level",
    level: "AS & A2 Level",
    progress: 64,
    totalLessons: 20,
    completedLessons: 13,
    instructor: "Sir Asim",
    thumbnail: "from-emerald-600 to-teal-950",
    badge: "In Progress",
    description: "Comprehensive kinematics equations, Newton's laws, circular motion, angular velocity, and Kepler's 3rd law calculation drills.",
    lessons: [
      { id: "l1", title: "Projectiles & Two-Dimensional Kinematics", duration: "45 mins", completed: true },
      { id: "l2", title: "Work, Energy, & Power Conservation", duration: "50 mins", completed: true },
      { id: "l3", title: "Centripetal Acceleration & Gravitational Force", duration: "55 mins", completed: true },
      { id: "l4", title: "Gravitational Potential Energy & Satellites", duration: "48 mins", completed: false },
      { id: "l5", title: "Escape Velocity Derivation & Past Papers", duration: "52 mins", completed: false },
    ],
  },
  {
    id: "phys-therm-01",
    code: "PHYS-THERM-01",
    title: "Thermal Physics & Ideal Gases",
    category: "AS Level",
    level: "AS Level",
    progress: 100,
    totalLessons: 15,
    completedLessons: 15,
    instructor: "Sir Asim",
    thumbnail: "from-amber-600 to-orange-950",
    badge: "Completed",
    description: "Specific heat capacity, latent heat, kinetic theory of gases, Boltzmann constant, and ideal gas state equation PV = NkT.",
    lessons: [
      { id: "l1", title: "Temperature Scales & Thermal Equilibrium", duration: "35 mins", completed: true },
      { id: "l2", title: "Specific Heat Capacity Experiments", duration: "45 mins", completed: true },
      { id: "l3", title: "Boyle's Law & Charles's Law Derivations", duration: "40 mins", completed: true },
      { id: "l4", title: "Kinetic Theory Molecular Speed Distribution", duration: "50 mins", completed: true },
      { id: "l5", title: "Internal Energy of Monatomic Gases", duration: "45 mins", completed: true },
    ],
  },
  {
    id: "phys-igcse-01",
    code: "PHYS-0625-IG",
    title: "IGCSE Physics: Electricity & Magnetism Basics",
    category: "IGCSE",
    level: "IGCSE / O Level",
    progress: 45,
    totalLessons: 16,
    completedLessons: 7,
    instructor: "Sir Asim",
    thumbnail: "from-purple-600 to-indigo-950",
    badge: "In Progress",
    description: "Fundamental electric charge, current, voltage, resistance circuits, Ohm's law, and electromagnetic relay applications.",
    lessons: [
      { id: "l1", title: "Electrostatics & Charge Induction", duration: "30 mins", completed: true },
      { id: "l2", title: "Current, Voltage, & Series-Parallel Circuits", duration: "45 mins", completed: true },
      { id: "l3", title: "Ohm's Law & Resistor Color Codes", duration: "40 mins", completed: true },
      { id: "l4", title: "Electrical Energy, Power, & Fuses", duration: "35 mins", completed: false },
    ],
  },
];

export default function MyCoursesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeCourseModal, setActiveCourseModal] = useState<Course | null>(null);

  const categories = ["All", "A Level", "AS Level", "IGCSE"];

  const filteredCourses = coursesData.filter((c) => {
    const matchesCategory = selectedCategory === "All" || c.category === selectedCategory;
    const matchesSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950 shadow-xs">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-100 px-3 py-1 text-xs font-bold text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">
            <BookOpen className="h-3.5 w-3.5" /> Enrolled Curriculum
          </div>
          <h1 className="mt-2 text-2xl font-bold text-slate-950 dark:text-white sm:text-3xl">
            My Courses
          </h1>
          <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
            Access your active Physics video lectures, problem sets, and lesson recordings.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                "rounded-full px-3 py-1.5 text-xs font-bold transition",
                selectedCategory === cat
                  ? "bg-indigo-600 text-white dark:bg-indigo-500"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800",
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search courses by topic, syllabus code, or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-11 w-full rounded-2xl border border-slate-200 bg-white pl-10 pr-4 text-xs font-medium text-slate-900 focus:border-indigo-500 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
          />
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-2">
        {filteredCourses.map((course) => (
          <Card
            key={course.id}
            className="flex flex-col justify-between overflow-hidden border-slate-200 bg-white transition hover:border-indigo-300 dark:border-slate-800 dark:bg-slate-950 shadow-xs"
          >
            <div>
              {/* Thumbnail header */}
              <div
                className={cn(
                  "relative flex h-36 w-full flex-col justify-between p-4 text-white bg-gradient-to-r",
                  course.thumbnail,
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-black/40 px-3 py-1 text-xs font-bold backdrop-blur-md">
                    {course.code}
                  </span>
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-1 text-xs font-bold backdrop-blur-md",
                      course.badge === "Completed"
                        ? "bg-emerald-500/90 text-white"
                        : course.badge === "Exam Ready"
                        ? "bg-amber-500/90 text-white"
                        : "bg-indigo-500/90 text-white",
                    )}
                  >
                    {course.badge}
                  </span>
                </div>
                <div>
                  <span className="text-xs font-semibold text-indigo-200">{course.level}</span>
                  <h2 className="line-clamp-1 text-lg font-bold text-white">{course.title}</h2>
                </div>
              </div>

              {/* Course Info */}
              <CardContent className="p-5 space-y-4">
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {course.description}
                </p>

                {/* Progress bar */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-slate-700 dark:text-slate-300">
                      {course.completedLessons} / {course.totalLessons} Lessons Completed
                    </span>
                    <span className="text-indigo-600 dark:text-indigo-400">{course.progress}%</span>
                  </div>
                  <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-900">
                    <div
                      className="h-full rounded-full bg-indigo-600 dark:bg-indigo-500 transition-all duration-500"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>

                {/* Recent Lessons Preview */}
                <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-3 dark:border-slate-900 dark:bg-slate-900/50 space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Next Lesson
                  </span>
                  {course.lessons.find((l) => !l.completed) ? (
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-900 dark:text-slate-100">
                      <div className="flex items-center gap-2 truncate pr-2">
                        <PlayCircle className="h-4 w-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                        <span className="truncate">{course.lessons.find((l) => !l.completed)?.title}</span>
                      </div>
                      <span className="text-[11px] text-slate-500 shrink-0">
                        {course.lessons.find((l) => !l.completed)?.duration}
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="h-4 w-4 shrink-0" />
                      <span>All course lessons completed! Certificate awarded.</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </div>

            {/* Bottom Button */}
            <div className="p-5 pt-0">
              <Button
                onClick={() => setActiveCourseModal(course)}
                className="w-full justify-between bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-600"
              >
                <span>Continue Course</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Lesson Drawer/Modal */}
      {activeCourseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-xs">
          <div className="relative w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                  {activeCourseModal.code}
                </span>
                <h2 className="text-xl font-bold text-slate-950 dark:text-white">
                  {activeCourseModal.title}
                </h2>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setActiveCourseModal(null)}
                className="rounded-full"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="rounded-2xl bg-indigo-950 p-4 text-white flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-white">
                <Video className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-sm font-bold">Interactive Video Classroom</h3>
                <p className="text-xs text-indigo-200">
                  Instructor: {activeCourseModal.instructor} · High-definition lecture notes attached
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Syllabus Lessons & Progress
              </h4>
              <div className="space-y-2">
                {activeCourseModal.lessons.map((lesson, idx) => (
                  <div
                    key={lesson.id}
                    className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-3.5 dark:border-slate-800 dark:bg-slate-900/60"
                  >
                    <div className="flex items-center gap-3">
                      {lesson.completed ? (
                        <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                      ) : (
                        <PlayCircle className="h-5 w-5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                      )}
                      <div>
                        <div className="text-xs font-bold text-slate-950 dark:text-white">
                          Lesson {idx + 1}: {lesson.title}
                        </div>
                        <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                          <Clock className="h-3 w-3" /> {lesson.duration}
                        </div>
                      </div>
                    </div>

                    <Button
                      size="sm"
                      variant={lesson.completed ? "outline" : "default"}
                      className="h-8 text-xs font-semibold"
                    >
                      {lesson.completed ? "Review" : "Start"}
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <Button onClick={() => setActiveCourseModal(null)} variant="secondary">
                Close Viewer
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
