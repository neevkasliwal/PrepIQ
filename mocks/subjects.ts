import { Subject } from "@/types";

export const SUBJECTS: Subject[] = [
  // JEE Main / Advanced Subjects
  { id: "sub-phy", examId: "jee-main", name: "Physics", slug: "physics", color: "#3b82f6", iconName: "Atom" },
  { id: "sub-chem", examId: "jee-main", name: "Chemistry", slug: "chemistry", color: "#10b981", iconName: "FlaskConical" },
  { id: "sub-math", examId: "jee-main", name: "Mathematics", slug: "mathematics", color: "#f59e0b", iconName: "Binary" },

  // COMEDK Subjects
  { id: "sub-comedk-phy", examId: "comedk", name: "Physics", slug: "physics", color: "#3b82f6", iconName: "Atom" },
  { id: "sub-comedk-chem", examId: "comedk", name: "Chemistry", slug: "chemistry", color: "#10b981", iconName: "FlaskConical" },
  { id: "sub-comedk-math", examId: "comedk", name: "Mathematics", slug: "mathematics", color: "#f59e0b", iconName: "Binary" },

  // GATE CS Subjects
  { id: "sub-gate-ga", examId: "gate", name: "General Aptitude", slug: "general-aptitude", color: "#8b5cf6", iconName: "Brain" },
  { id: "sub-gate-ds", examId: "gate", name: "Data Structures & Algorithms", slug: "dsa", color: "#06b6d4", iconName: "Network" },
  { id: "sub-gate-os", examId: "gate", name: "Operating Systems", slug: "os", color: "#ec4899", iconName: "Cpu" },

  // NEET Subjects
  { id: "sub-neet-phy", examId: "neet", name: "Physics", slug: "physics", color: "#3b82f6", iconName: "Atom" },
  { id: "sub-neet-chem", examId: "neet", name: "Chemistry", slug: "chemistry", color: "#10b981", iconName: "FlaskConical" },
  { id: "sub-neet-bio", examId: "neet", name: "Biology", slug: "biology", color: "#22c55e", iconName: "Dna" },
];

