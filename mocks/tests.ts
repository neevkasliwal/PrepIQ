import { Test } from "@/types";
import { MOCK_PYQS } from "./pyqs";
import { MOCK_GENERATED_QUESTIONS } from "./questions";

export const MOCK_TESTS: Test[] = [
  {
    id: "test-jee-full-01",
    title: "JEE Main 2025 All-India Grand Mock Test 01",
    examId: "jee-main",
    testType: "FULL_LENGTH",
    durationMinutes: 180,
    totalMarks: 300,
    subjectIds: ["sub-phy", "sub-chem", "sub-math"],
    description: "Standard full-length simulation aligned with latest NTA pattern. Tests comprehensive syllabus across Physics, Chemistry, and Mathematics.",
    createdAt: "2024-10-10T10:00:00Z",
    isDefaultMock: true,
    questions: [
      MOCK_PYQS[0], // Physics LOM
      MOCK_PYQS[1], // Physics WEP
      MOCK_PYQS[2], // Physics Electrostatics Numerical
      MOCK_GENERATED_QUESTIONS[0], // Physics LOM Var
      MOCK_GENERATED_QUESTIONS[2], // Physics HCV Doc
      MOCK_GENERATED_QUESTIONS[3], // Physics Gauss Law
      MOCK_PYQS[3], // Chem Bonding
      MOCK_PYQS[4], // Chem Carbonyl
      MOCK_GENERATED_QUESTIONS[4], // Chem Coordination
      MOCK_PYQS[5], // Math Vectors 3D
      MOCK_PYQS[6], // Math Definite Int
      MOCK_GENERATED_QUESTIONS[1]  // Math Integral Var
    ]
  },
  {
    id: "test-phy-lom-wep",
    title: "Mechanics Chapter Test: Laws of Motion & Work-Energy",
    examId: "jee-main",
    testType: "CHAPTER_WISE",
    durationMinutes: 45,
    totalMarks: 60,
    subjectIds: ["sub-phy"],
    chapterIds: ["chap-lom", "chap-wep"],
    description: "Focused chapter diagnostic test focusing on free body diagrams, friction, and work-energy theorem.",
    createdAt: "2024-10-15T15:00:00Z",
    isDefaultMock: false,
    questions: [
      MOCK_PYQS[0],
      MOCK_PYQS[1],
      MOCK_GENERATED_QUESTIONS[0],
      MOCK_GENERATED_QUESTIONS[2]
    ]
  },
  {
    id: "test-pyq-paper-2024-jan27",
    title: "NTA JEE Main 2024 (27 Jan Shift 1) Simulated Exam",
    examId: "jee-main",
    testType: "PYQ_PAPER",
    durationMinutes: 180,
    totalMarks: 300,
    subjectIds: ["sub-phy", "sub-chem", "sub-math"],
    description: "Original shift replay under strict CBT examination conditions with countdown timer and instant evaluation.",
    createdAt: "2024-10-18T09:00:00Z",
    isDefaultMock: false,
    questions: [
      MOCK_PYQS[0],
      MOCK_PYQS[3],
      MOCK_PYQS[5],
      MOCK_PYQS[6]
    ]
  },
  {
    id: "test-math-calc-3d",
    title: "Mathematics Mastery: Calculus & 3D Geometry",
    examId: "jee-main",
    testType: "CUSTOM_PRACTICE",
    durationMinutes: 60,
    totalMarks: 80,
    subjectIds: ["sub-math"],
    chapterIds: ["chap-vec3d", "chap-defint"],
    description: "High-scoring topics test created using student custom selection from PYQs and generated variations.",
    createdAt: "2024-10-24T18:30:00Z",
    isDefaultMock: false,
    questions: [
      MOCK_PYQS[5],
      MOCK_PYQS[6],
      MOCK_GENERATED_QUESTIONS[1]
    ]
  }
];

