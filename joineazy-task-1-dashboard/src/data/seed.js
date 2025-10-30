import { addDays, formatISO } from "date-fns";

export const users = [
  { id: "u-admin", name: "Prof. Ada", role: "admin", email: "admin@uni.edu" },
  { id: "u-s1", name: "Alex Student", role: "student", email: "s1@uni.edu" },
  { id: "u-s2", name: "Bela Student", role: "student", email: "s2@uni.edu" }
];

const now = new Date();

export const initialAssignments = [
  {
    id: "a-1",
    title: "DSA Sheet Week 1",
    description: "Solve arrays & strings set.",
    dueDate: formatISO(addDays(now, 3), { representation: "date" }),
    driveLink: "https://drive.google.com/drive/folders/DEMO1",
    createdBy: "u-admin",
    createdAt: formatISO(now)
  },
  {
    id: "a-2",
    title: "DBMS ER Diagram",
    description: "Design ERD for bookstore.",
    dueDate: formatISO(addDays(now, 5), { representation: "date" }),
    driveLink: "https://drive.google.com/drive/folders/DEMO2",
    createdBy: "u-admin",
    createdAt: formatISO(now)
  }
];

export const initialSubmissions = [
  // Student 1 submitted first assignment
  { id: "s-1", assignmentId: "a-1", studentId: "u-s1", status: "submitted", submittedAt: formatISO(now) },
  // Others not submitted yet
  { id: "s-2", assignmentId: "a-1", studentId: "u-s2", status: "not_submitted" },
  { id: "s-3", assignmentId: "a-2", studentId: "u-s1", status: "not_submitted" },
  { id: "s-4", assignmentId: "a-2", studentId: "u-s2", status: "not_submitted" }
];
