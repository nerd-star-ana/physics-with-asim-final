"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "@/context/auth-context";

export type ClassColor = "blue" | "green" | "purple" | "orange" | "red";

export type Classroom = {
  id: string;
  name: string;
  code: string;
  color: ClassColor;
  teacher: string;
  studentCount: number;
  whatsappUrl: string;
  meetUrl: string;
  zoomUrl: string;
  googleClassroomUrl?: string;
  timetable: string;
  startDate: string;
  endDate: string;
  status: "active" | "archived";
};

export type StudentRecord = {
  id: string;
  name: string;
  email: string;
  classId: string;
  status: "active" | "suspended";
  attendanceRate: number;
  assignmentsSubmitted: number;
  averageGrade: number;
  studyHours: number;
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  loginActivity: string;
  joinDate: string;
};

export type AssignmentSubmission = {
  id: string;
  assignmentId: string;
  studentId: string;
  studentName: string;
  submittedAt: string;
  status: "pending" | "graded" | "late" | "resubmit_requested";
  grade?: number;
  totalMarks: number;
  feedback?: string;
  submissionText?: string;
  fileUrl?: string;
};

export type Assignment = {
  id: string;
  title: string;
  description: string;
  instructions: string;
  totalMarks: number;
  dueDate: string;
  assignedClassIds: string[]; // empty means all
  assignedStudentIds: string[]; // empty means all in class
  attachments: string[];
  latePolicy: string;
  maxAttempts: number;
  submissions: AssignmentSubmission[];
};

export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
  marks: number;
};

export type QuizAttempt = {
  id: string;
  quizId: string;
  studentId: string;
  studentName: string;
  score: number;
  totalMarks: number;
  percentage: number;
  passed: boolean;
  completedAt: string;
};

export type Quiz = {
  id: string;
  title: string;
  description: string;
  durationMinutes: number;
  passingPercentage: number;
  totalMarks: number;
  assignedClassIds: string[];
  questions: QuizQuestion[];
  attempts: QuizAttempt[];
  status: "published" | "draft";
};

export type Resource = {
  id: string;
  title: string;
  type: "past_paper" | "notes" | "formula_sheet" | "worksheet" | "powerpoint" | "video";
  qualification: "Cambridge A-Level" | "Cambridge O-Level" | "IGCSE Physics";
  year?: string;
  session?: string;
  variant?: string;
  fileUrl: string;
  visibility: "public" | "school" | "class" | "student";
  assignedClassIds: string[];
  pinned: boolean;
  createdAt: string;
};

export type LiveClass = {
  id: string;
  topic: string;
  date: string;
  time: string;
  durationMinutes: number;
  assignedClassId: string;
  platform: "zoom" | "google_meet" | "teams";
  joinLink: string;
  password?: string;
  attendanceRequired: boolean;
  status: "upcoming" | "live" | "completed";
};

export type Announcement = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  author: string;
  pinned: boolean;
  priority: "high" | "normal" | "low";
  targetScope: "everyone" | "class" | "student";
  targetClassIds: string[];
  attachments?: string[];
};

export type AttendanceEntry = {
  date: string; // YYYY-MM-DD
  classId: string;
  records: Record<string, "present" | "absent" | "late" | "excused">; // studentId -> status
};

export type LMSNotification = {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  targetStudentId?: string;
  type: "assignment" | "quiz" | "announcement" | "resource" | "grade" | "live";
};

// Initial Mock Seed Data
const INITIAL_CLASSES: Classroom[] = [
  {
    id: "cls_1",
    name: "Physics A-Level Batch A",
    code: "PHY-A1",
    color: "blue",
    teacher: "Sir Asim",
    studentCount: 24,
    whatsappUrl: "https://chat.whatsapp.com/demo-a-level-batch-a",
    meetUrl: "https://meet.google.com/phy-asim-a1",
    zoomUrl: "https://zoom.us/j/9876543210",
    timetable: "Mon & Wed • 5:00 PM - 6:30 PM",
    startDate: "2026-01-10",
    endDate: "2026-06-30",
    status: "active",
  },
  {
    id: "cls_2",
    name: "Physics A-Level Batch B",
    code: "PHY-A2",
    color: "green",
    teacher: "Sir Asim",
    studentCount: 18,
    whatsappUrl: "https://chat.whatsapp.com/demo-a-level-batch-b",
    meetUrl: "https://meet.google.com/phy-asim-a2",
    zoomUrl: "https://zoom.us/j/9876543211",
    timetable: "Tue & Thu • 6:00 PM - 7:30 PM",
    startDate: "2026-01-12",
    endDate: "2026-06-30",
    status: "active",
  },
  {
    id: "cls_3",
    name: "Physics O-Level Morning",
    code: "PHY-O1",
    color: "purple",
    teacher: "Sir Asim",
    studentCount: 30,
    whatsappUrl: "https://chat.whatsapp.com/demo-o-level-morn",
    meetUrl: "https://meet.google.com/phy-asim-o1",
    zoomUrl: "https://zoom.us/j/9876543212",
    timetable: "Mon, Wed & Fri • 9:00 AM - 10:15 AM",
    startDate: "2026-01-05",
    endDate: "2026-06-30",
    status: "active",
  },
  {
    id: "cls_4",
    name: "Physics O-Level Evening",
    code: "PHY-O2",
    color: "orange",
    teacher: "Sir Asim",
    studentCount: 22,
    whatsappUrl: "https://chat.whatsapp.com/demo-o-level-eve",
    meetUrl: "https://meet.google.com/phy-asim-o2",
    zoomUrl: "https://zoom.us/j/9876543213",
    timetable: "Tue & Sat • 4:00 PM - 5:30 PM",
    startDate: "2026-01-15",
    endDate: "2026-06-30",
    status: "active",
  },
  {
    id: "cls_5",
    name: "Summer Crash Course 2026",
    code: "PHY-CC",
    color: "red",
    teacher: "Sir Asim",
    studentCount: 15,
    whatsappUrl: "https://chat.whatsapp.com/demo-crash-course",
    meetUrl: "https://meet.google.com/phy-asim-cc",
    zoomUrl: "https://zoom.us/j/9876543214",
    timetable: "Daily • 11:00 AM - 12:30 PM",
    startDate: "2026-06-01",
    endDate: "2026-08-15",
    status: "active",
  },
];

const INITIAL_STUDENTS: StudentRecord[] = [
  {
    id: "std_1",
    name: "Ahmed Khan",
    email: "ahmed.khan@student.edu",
    classId: "cls_1", // Blue class
    status: "active",
    attendanceRate: 94,
    assignmentsSubmitted: 12,
    averageGrade: 88,
    studyHours: 46,
    parentName: "Tariq Khan",
    parentPhone: "+92 300 1234567",
    parentEmail: "tariq.khan@gmail.com",
    loginActivity: "10 minutes ago",
    joinDate: "2026-01-10",
  },
  {
    id: "std_2",
    name: "Fatima Zahra",
    email: "fatima.z@student.edu",
    classId: "cls_1",
    status: "active",
    attendanceRate: 98,
    assignmentsSubmitted: 14,
    averageGrade: 95,
    studyHours: 62,
    parentName: "Zahra Hussain",
    parentPhone: "+92 321 9876543",
    parentEmail: "zahra.hussain@gmail.com",
    loginActivity: "1 hour ago",
    joinDate: "2026-01-10",
  },
  {
    id: "std_3",
    name: "Zain Ali",
    email: "zain.a@student.edu",
    classId: "cls_2", // Green class
    status: "active",
    attendanceRate: 85,
    assignmentsSubmitted: 9,
    averageGrade: 76,
    studyHours: 31,
    parentName: "Ali Raza",
    parentPhone: "+92 333 4567890",
    parentEmail: "ali.raza@gmail.com",
    loginActivity: "Yesterday",
    joinDate: "2026-01-12",
  },
  {
    id: "std_4",
    name: "Ayesha Malik",
    email: "ayesha.m@student.edu",
    classId: "cls_3", // Purple class
    status: "active",
    attendanceRate: 92,
    assignmentsSubmitted: 11,
    averageGrade: 84,
    studyHours: 39,
    parentName: "Malik Usman",
    parentPhone: "+92 302 5551234",
    parentEmail: "usman.malik@gmail.com",
    loginActivity: "3 hours ago",
    joinDate: "2026-01-05",
  },
  {
    id: "std_5",
    name: "Bilal Siddiqui",
    email: "bilal.s@student.edu",
    classId: "cls_4", // Orange class
    status: "active",
    attendanceRate: 78,
    assignmentsSubmitted: 8,
    averageGrade: 71,
    studyHours: 24,
    parentName: "Siddiqui Ahmed",
    parentPhone: "+92 312 8889900",
    parentEmail: "siddiqui.a@gmail.com",
    loginActivity: "2 days ago",
    joinDate: "2026-01-15",
  },
];

const INITIAL_ASSIGNMENTS: Assignment[] = [
  {
    id: "asg_1",
    title: "A-Level Mechanics & Newton's Second Law Problem Set",
    description: "Solve problems 1 through 15 involving inclined planes, tension in connected bodies, and friction.",
    instructions: "Show step-by-step vector breakdowns. Submit as a single clean PDF file.",
    totalMarks: 50,
    dueDate: "2026-07-28",
    assignedClassIds: ["cls_1", "cls_2"], // Assigned to A-Level Batches
    assignedStudentIds: [],
    attachments: ["Mechanics_Worksheet_A_Level.pdf"],
    latePolicy: "10% deduction per day late",
    maxAttempts: 2,
    submissions: [
      {
        id: "sub_1",
        assignmentId: "asg_1",
        studentId: "std_1",
        studentName: "Ahmed Khan",
        submittedAt: "2026-07-22 14:30",
        status: "graded",
        grade: 46,
        totalMarks: 50,
        feedback: "Excellent work on resolved forces on the 30-degree incline. Minor math error in Q12.",
        submissionText: "Attached my handwritten solution scan.",
        fileUrl: "/docs/ahmed_mechanics_sub.pdf",
      },
    ],
  },
  {
    id: "asg_2",
    title: "O-Level Thermal Physics & Specific Heat Capacity Calculation",
    description: "Complete numerical exercises on heat energy required for phase changes.",
    instructions: "Include units in every step of calculation.",
    totalMarks: 30,
    dueDate: "2026-07-30",
    assignedClassIds: ["cls_3", "cls_4"],
    assignedStudentIds: [],
    attachments: ["Thermal_Physics_Handout.pdf"],
    latePolicy: "No submission accepted after 48 hours",
    maxAttempts: 1,
    submissions: [],
  },
];

const INITIAL_QUIZZES: Quiz[] = [
  {
    id: "qz_1",
    title: "Electric Fields & Potential Gradient Checkpoint",
    description: "Test your understanding of uniform electric fields, Coulomb's Law, and field lines.",
    durationMinutes: 20,
    passingPercentage: 70,
    totalMarks: 20,
    assignedClassIds: ["cls_1", "cls_2"],
    status: "published",
    questions: [
      {
        id: "q1",
        question: "What is the electric field strength E inside a charged parallel plate capacitor with voltage V and distance d?",
        options: ["E = V * d", "E = V / d", "E = d / V", "E = V^2 / d"],
        correctOptionIndex: 1,
        explanation: "Electric field strength in a uniform field is given by E = V/d (Volts per meter).",
        marks: 5,
      },
      {
        id: "q2",
        question: "An electron experiences a force F in an electric field E. What is the acceleration of the electron (mass m)?",
        options: ["a = F * m", "a = e * E / m", "a = m / (e * E)", "a = e * m / E"],
        correctOptionIndex: 1,
        explanation: "Force F = e*E, and by Newton's Second Law F = m*a => a = e*E / m.",
        marks: 5,
      },
      {
        id: "q3",
        question: "Electric field lines always point from:",
        options: ["Negative to Positive charge", "Positive to Negative charge", "High potential to low potential", "Both B and C"],
        correctOptionIndex: 3,
        explanation: "Electric field lines point away from positive charges towards negative charges, which corresponds to high potential to low potential.",
        marks: 10,
      },
    ],
    attempts: [
      {
        id: "att_1",
        quizId: "qz_1",
        studentId: "std_1",
        studentName: "Ahmed Khan",
        score: 20,
        totalMarks: 20,
        percentage: 100,
        passed: true,
        completedAt: "2026-07-20 16:15",
      },
    ],
  },
];

const INITIAL_RESOURCES: Resource[] = [
  {
    id: "res_1",
    title: "Sir Asim's Complete A-Level Physics Master Formula Sheet (2026 Syllabus)",
    type: "formula_sheet",
    qualification: "Cambridge A-Level",
    fileUrl: "/resources/ALevel_Formula_Sheet_Sir_Asim.pdf",
    visibility: "class",
    assignedClassIds: ["cls_1", "cls_2"],
    pinned: true,
    createdAt: "2026-01-10",
  },
  {
    id: "res_2",
    title: "2025 Summer Paper 4 Variant 2 Solved Past Paper with Examiner Comments",
    type: "past_paper",
    qualification: "Cambridge A-Level",
    year: "2025",
    session: "May/June",
    variant: "Variant 2",
    fileUrl: "/resources/9702_s25_qp_42_solved.pdf",
    visibility: "class",
    assignedClassIds: ["cls_1"],
    pinned: true,
    createdAt: "2026-02-15",
  },
  {
    id: "res_3",
    title: "O-Level Light & Refraction Comprehensive Revision Booklet",
    type: "notes",
    qualification: "Cambridge O-Level",
    fileUrl: "/resources/OLevel_Light_Refraction_Booklet.pdf",
    visibility: "class",
    assignedClassIds: ["cls_3", "cls_4"],
    pinned: false,
    createdAt: "2026-03-01",
  },
];

const INITIAL_LIVE_CLASSES: LiveClass[] = [
  {
    id: "live_1",
    topic: "Live Problem Solving Session: A2 Simple Harmonic Motion & Resonance",
    date: "2026-07-25",
    time: "17:00",
    durationMinutes: 90,
    assignedClassId: "cls_1", // Blue class
    platform: "zoom",
    joinLink: "https://zoom.us/j/9876543210",
    password: "PHYSICS2026",
    attendanceRequired: true,
    status: "upcoming",
  },
  {
    id: "live_2",
    topic: "O-Level Electricity & Circuit Diagrams Interactive Webinar",
    date: "2026-07-26",
    time: "10:00",
    durationMinutes: 75,
    assignedClassId: "cls_3",
    platform: "google_meet",
    joinLink: "https://meet.google.com/phy-asim-o1",
    attendanceRequired: true,
    status: "upcoming",
  },
];

const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: "anc_1",
    title: "📢 Upcoming Mid-Term Mock Examinations Schedule & Guidelines",
    content: "Assalam-o-Alaikum Students! The mid-term mock examinations for all A-Level and O-Level batches start next week. Please ensure you review Sir Asim's Master Formula Sheets uploaded in your resource tab.",
    createdAt: "2026-07-21",
    author: "Sir Asim",
    pinned: true,
    priority: "high",
    targetScope: "everyone",
    targetClassIds: [],
  },
  {
    id: "anc_2",
    title: "🔹 Batch A Special Revision Note on Nuclear Physics",
    content: "Physics A-Level Batch A: An extra problem sheet on Mass Defect and Binding Energy has been assigned. Please submit before Monday's live session.",
    createdAt: "2026-07-22",
    author: "Sir Asim",
    pinned: false,
    priority: "normal",
    targetScope: "class",
    targetClassIds: ["cls_1"],
  },
];

const INITIAL_NOTIFICATIONS: LMSNotification[] = [
  {
    id: "notif_1",
    title: "New Assignment Assigned",
    message: "Sir Asim assigned: Mechanics & Newton's Second Law Problem Set due on July 28.",
    timestamp: "2 hours ago",
    read: false,
    targetStudentId: "std_1",
    type: "assignment",
  },
  {
    id: "notif_2",
    title: "Grade Released",
    message: "Your submission for Mechanics Problem Set scored 46/50 (92%).",
    timestamp: "1 day ago",
    read: false,
    targetStudentId: "std_1",
    type: "grade",
  },
  {
    id: "notif_3",
    title: "Live Class Scheduled",
    message: "A-Level Live Session scheduled for July 25 at 5:00 PM.",
    timestamp: "2 days ago",
    read: true,
    targetStudentId: "std_1",
    type: "live",
  },
];

type LMSContextType = {
  // Role & Current User Selection
  activeRole: "teacher" | "student";
  setActiveRole: (role: "teacher" | "student") => void;
  activeStudentId: string;
  setActiveStudentId: (studentId: string) => void;
  activeStudent: StudentRecord | undefined;
  activeStudentClass: Classroom | undefined;

  // Classroom Management
  classes: Classroom[];
  addClass: (newClass: Omit<Classroom, "id">) => void;
  updateClass: (id: string, updated: Partial<Classroom>) => void;
  deleteClass: (id: string) => void;
  duplicateClass: (id: string) => void;

  // Student Management
  students: StudentRecord[];
  addStudent: (newStudent: Omit<StudentRecord, "id" | "attendanceRate" | "assignmentsSubmitted" | "averageGrade" | "studyHours" | "loginActivity" | "joinDate">) => void;
  updateStudent: (id: string, updated: Partial<StudentRecord>) => void;
  transferStudentClass: (studentId: string, newClassId: string) => void;
  toggleStudentStatus: (studentId: string) => void;

  // Assignments
  assignments: Assignment[];
  addAssignment: (newAsg: Omit<Assignment, "id" | "submissions">) => void;
  gradeSubmission: (assignmentId: string, submissionId: string, grade: number, feedback: string) => void;
  submitAssignment: (assignmentId: string, studentId: string, studentName: string, text: string) => void;

  // Quizzes
  quizzes: Quiz[];
  addQuiz: (newQuiz: Omit<Quiz, "id" | "attempts">) => void;
  recordQuizAttempt: (quizId: string, studentId: string, studentName: string, score: number, totalMarks: number) => void;

  // Resources
  resources: Resource[];
  addResource: (newRes: Omit<Resource, "id" | "createdAt">) => void;

  // Live Classes
  liveClasses: LiveClass[];
  addLiveClass: (newLive: Omit<LiveClass, "id">) => void;

  // Announcements
  announcements: Announcement[];
  addAnnouncement: (newAnc: Omit<Announcement, "id" | "createdAt" | "author">) => void;

  // Notifications
  notifications: LMSNotification[];
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;

  // Attendance
  attendanceRecords: AttendanceEntry[];
  saveAttendance: (date: string, classId: string, records: Record<string, "present" | "absent" | "late" | "excused">) => void;

  // Student Helpers (Filter by active student's class)
  getStudentAssignedAssignments: () => Assignment[];
  getStudentAssignedQuizzes: () => Quiz[];
  getStudentAssignedResources: () => Resource[];
  getStudentAssignedLiveClasses: () => LiveClass[];
  getStudentAssignedAnnouncements: () => Announcement[];
};

const LMSContext = createContext<LMSContextType | undefined>(undefined);

export function LMSProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [activeRole, setActiveRole] = useState<"teacher" | "student">("teacher");
  const [activeStudentId, setActiveStudentId] = useState<string>("std_1");

  useEffect(() => {
    if (user) {
      if (user.role === "teacher") {
        setActiveRole("teacher");
      } else if (user.role === "student") {
        setActiveRole("student");
        if (user.studentId) {
          setActiveStudentId(user.studentId);
        }
      }
    }
  }, [user]);

  const [classes, setClasses] = useState<Classroom[]>(INITIAL_CLASSES);
  const [students, setStudents] = useState<StudentRecord[]>(INITIAL_STUDENTS);
  const [assignments, setAssignments] = useState<Assignment[]>(INITIAL_ASSIGNMENTS);
  const [quizzes, setQuizzes] = useState<Quiz[]>(INITIAL_QUIZZES);
  const [resources, setResources] = useState<Resource[]>(INITIAL_RESOURCES);
  const [liveClasses, setLiveClasses] = useState<LiveClass[]>(INITIAL_LIVE_CLASSES);
  const [announcements, setAnnouncements] = useState<Announcement[]>(INITIAL_ANNOUNCEMENTS);
  const [notifications, setNotifications] = useState<LMSNotification[]>(INITIAL_NOTIFICATIONS);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceEntry[]>([
    {
      date: "2026-07-22",
      classId: "cls_1",
      records: { std_1: "present", std_2: "present" },
    },
  ]);

  // Derived Active Student info
  const activeStudent = students.find((s) => s.id === activeStudentId);
  const activeStudentClass = classes.find((c) => c.id === activeStudent?.classId);

  // Classroom CRUD
  const addClass = (newClass: Omit<Classroom, "id">) => {
    const id = `cls_${Date.now()}`;
    setClasses((prev) => [...prev, { ...newClass, id }]);
  };

  const updateClass = (id: string, updated: Partial<Classroom>) => {
    setClasses((prev) => prev.map((c) => (c.id === id ? { ...c, ...updated } : c)));
  };

  const deleteClass = (id: string) => {
    setClasses((prev) => prev.filter((c) => c.id !== id));
  };

  const duplicateClass = (id: string) => {
    const existing = classes.find((c) => c.id === id);
    if (!existing) return;
    const duplicated: Classroom = {
      ...existing,
      id: `cls_${Date.now()}`,
      name: `${existing.name} (Copy)`,
      code: `${existing.code}-CP`,
      studentCount: 0,
    };
    setClasses((prev) => [...prev, duplicated]);
  };

  // Student CRUD
  const addStudent = (
    newStudent: Omit<StudentRecord, "id" | "attendanceRate" | "assignmentsSubmitted" | "averageGrade" | "studyHours" | "loginActivity" | "joinDate">
  ) => {
    const id = `std_${Date.now()}`;
    const fullStudent: StudentRecord = {
      ...newStudent,
      id,
      attendanceRate: 100,
      assignmentsSubmitted: 0,
      averageGrade: 0,
      studyHours: 0,
      loginActivity: "Just registered",
      joinDate: new Date().toISOString().split("T")[0],
    };
    setStudents((prev) => [...prev, fullStudent]);
    // update class student count
    setClasses((prev) =>
      prev.map((c) => (c.id === newStudent.classId ? { ...c, studentCount: c.studentCount + 1 } : c))
    );
  };

  const updateStudent = (id: string, updated: Partial<StudentRecord>) => {
    setStudents((prev) => prev.map((s) => (s.id === id ? { ...s, ...updated } : s)));
  };

  const transferStudentClass = (studentId: string, newClassId: string) => {
    setStudents((prev) => {
      const student = prev.find((s) => s.id === studentId);
      if (!student) return prev;
      const oldClassId = student.classId;

      // Adjust counts
      setClasses((cls) =>
        cls.map((c) => {
          if (c.id === oldClassId) return { ...c, studentCount: Math.max(0, c.studentCount - 1) };
          if (c.id === newClassId) return { ...c, studentCount: c.studentCount + 1 };
          return c;
        })
      );

      return prev.map((s) => (s.id === studentId ? { ...s, classId: newClassId } : s));
    });
  };

  const toggleStudentStatus = (studentId: string) => {
    setStudents((prev) =>
      prev.map((s) =>
        s.id === studentId
          ? { ...s, status: s.status === "active" ? "suspended" : "active" }
          : s
      )
    );
  };

  // Assignments
  const addAssignment = (newAsg: Omit<Assignment, "id" | "submissions">) => {
    const id = `asg_${Date.now()}`;
    const assignment: Assignment = {
      ...newAsg,
      id,
      submissions: [],
    };
    setAssignments((prev) => [assignment, ...prev]);

    // Dispatch notification to students in target classes
    const targetClassNames = classes
      .filter((c) => newAsg.assignedClassIds.length === 0 || newAsg.assignedClassIds.includes(c.id))
      .map((c) => c.name)
      .join(", ");

    setNotifications((prev) => [
      {
        id: `notif_${Date.now()}`,
        title: "New Assignment Assigned",
        message: `Sir Asim assigned: ${newAsg.title} (Due: ${newAsg.dueDate}). Target: ${targetClassNames || "All Classes"}`,
        timestamp: "Just now",
        read: false,
        type: "assignment",
      },
      ...prev,
    ]);
  };

  const gradeSubmission = (assignmentId: string, submissionId: string, grade: number, feedback: string) => {
    setAssignments((prev) =>
      prev.map((asg) => {
        if (asg.id !== assignmentId) return asg;
        return {
          ...asg,
          submissions: asg.submissions.map((sub) =>
            sub.id === submissionId
              ? { ...sub, status: "graded", grade, feedback }
              : sub
          ),
        };
      })
    );
  };

  const submitAssignment = (assignmentId: string, studentId: string, studentName: string, text: string) => {
    setAssignments((prev) =>
      prev.map((asg) => {
        if (asg.id !== assignmentId) return asg;
        const existingSubIndex = asg.submissions.findIndex((s) => s.studentId === studentId);
        const newSub: AssignmentSubmission = {
          id: `sub_${Date.now()}`,
          assignmentId,
          studentId,
          studentName,
          submittedAt: new Date().toISOString().replace("T", " ").substring(0, 16),
          status: "pending",
          totalMarks: asg.totalMarks,
          submissionText: text,
        };

        if (existingSubIndex >= 0) {
          const updatedSubs = [...asg.submissions];
          updatedSubs[existingSubIndex] = newSub;
          return { ...asg, submissions: updatedSubs };
        } else {
          return { ...asg, submissions: [...asg.submissions, newSub] };
        }
      })
    );
  };

  // Quizzes
  const addQuiz = (newQuiz: Omit<Quiz, "id" | "attempts">) => {
    const id = `qz_${Date.now()}`;
    const quiz: Quiz = {
      ...newQuiz,
      id,
      attempts: [],
    };
    setQuizzes((prev) => [quiz, ...prev]);
  };

  const recordQuizAttempt = (quizId: string, studentId: string, studentName: string, score: number, totalMarks: number) => {
    const percentage = Math.round((score / totalMarks) * 100);
    const quiz = quizzes.find((q) => q.id === quizId);
    const passingPercentage = quiz?.passingPercentage || 60;
    const passed = percentage >= passingPercentage;

    const attempt: QuizAttempt = {
      id: `att_${Date.now()}`,
      quizId,
      studentId,
      studentName,
      score,
      totalMarks,
      percentage,
      passed,
      completedAt: new Date().toISOString().replace("T", " ").substring(0, 16),
    };

    setQuizzes((prev) =>
      prev.map((q) => (q.id === quizId ? { ...q, attempts: [...q.attempts, attempt] } : q))
    );
  };

  // Resources
  const addResource = (newRes: Omit<Resource, "id" | "createdAt">) => {
    const id = `res_${Date.now()}`;
    const res: Resource = {
      ...newRes,
      id,
      createdAt: new Date().toISOString().split("T")[0],
    };
    setResources((prev) => [res, ...prev]);
  };

  // Live Classes
  const addLiveClass = (newLive: Omit<LiveClass, "id">) => {
    const id = `live_${Date.now()}`;
    setLiveClasses((prev) => [{ ...newLive, id }, ...prev]);
  };

  // Announcements
  const addAnnouncement = (newAnc: Omit<Announcement, "id" | "createdAt" | "author">) => {
    const id = `anc_${Date.now()}`;
    const anc: Announcement = {
      ...newAnc,
      id,
      author: "Sir Asim",
      createdAt: new Date().toISOString().split("T")[0],
    };
    setAnnouncements((prev) => [anc, ...prev]);
  };

  // Notifications
  const markNotificationRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  // Attendance
  const saveAttendance = (date: string, classId: string, records: Record<string, "present" | "absent" | "late" | "excused">) => {
    setAttendanceRecords((prev) => {
      const existingIdx = prev.findIndex((entry) => entry.date === date && entry.classId === classId);
      if (existingIdx >= 0) {
        const updated = [...prev];
        updated[existingIdx] = { date, classId, records };
        return updated;
      } else {
        return [...prev, { date, classId, records }];
      }
    });
  };

  // Student Helper Filters (Determines what Ahmed Khan or another student sees)
  const getStudentAssignedAssignments = () => {
    if (!activeStudent) return [];
    return assignments.filter(
      (a) =>
        a.assignedClassIds.length === 0 || a.assignedClassIds.includes(activeStudent.classId)
    );
  };

  const getStudentAssignedQuizzes = () => {
    if (!activeStudent) return [];
    return quizzes.filter(
      (q) =>
        q.assignedClassIds.length === 0 || q.assignedClassIds.includes(activeStudent.classId)
    );
  };

  const getStudentAssignedResources = () => {
    if (!activeStudent) return [];
    return resources.filter(
      (r) =>
        r.visibility === "public" ||
        r.visibility === "school" ||
        (r.visibility === "class" &&
          (r.assignedClassIds.length === 0 || r.assignedClassIds.includes(activeStudent.classId)))
    );
  };

  const getStudentAssignedLiveClasses = () => {
    if (!activeStudent) return [];
    return liveClasses.filter(
      (l) => !l.assignedClassId || l.assignedClassId === activeStudent.classId
    );
  };

  const getStudentAssignedAnnouncements = () => {
    if (!activeStudent) return [];
    return announcements.filter(
      (a) =>
        a.targetScope === "everyone" ||
        (a.targetScope === "class" &&
          (a.targetClassIds.length === 0 || a.targetClassIds.includes(activeStudent.classId)))
    );
  };

  return (
    <LMSContext.Provider
      value={{
        activeRole,
        setActiveRole,
        activeStudentId,
        setActiveStudentId,
        activeStudent,
        activeStudentClass,

        classes,
        addClass,
        updateClass,
        deleteClass,
        duplicateClass,

        students,
        addStudent,
        updateStudent,
        transferStudentClass,
        toggleStudentStatus,

        assignments,
        addAssignment,
        gradeSubmission,
        submitAssignment,

        quizzes,
        addQuiz,
        recordQuizAttempt,

        resources,
        addResource,

        liveClasses,
        addLiveClass,

        announcements,
        addAnnouncement,

        notifications,
        markNotificationRead,
        markAllNotificationsRead,

        attendanceRecords,
        saveAttendance,

        getStudentAssignedAssignments,
        getStudentAssignedQuizzes,
        getStudentAssignedResources,
        getStudentAssignedLiveClasses,
        getStudentAssignedAnnouncements,
      }}
    >
      {children}
    </LMSContext.Provider>
  );
}

export function useLMS() {
  const context = useContext(LMSContext);
  if (!context) {
    throw new Error("useLMS must be used within an LMSProvider");
  }
  return context;
}
