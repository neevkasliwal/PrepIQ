import { Notebook, BookmarkItem } from "@/types";
import { MOCK_PYQS } from "./pyqs";
import { MOCK_GENERATED_QUESTIONS } from "./questions";

export const MOCK_NOTEBOOKS: Notebook[] = [
  {
    id: "nb-phy-pyqs",
    title: "Important Physics PYQs",
    description: "Crucial conceptual questions from JEE Main 2020-2024 covering mechanics, electrostatics, and thermodynamics.",
    color: "#3b82f6",
    itemCount: 2,
    createdAt: "2024-10-15T12:00:00Z"
  },
  {
    id: "nb-math-hard",
    title: "Difficult Mathematics Questions",
    description: "Challenging calculus, 3D geometry and matrix questions requiring multi-step algebraic manipulation.",
    color: "#f59e0b",
    itemCount: 1,
    createdAt: "2024-10-18T16:00:00Z"
  },
  {
    id: "nb-chem-organic",
    title: "Organic Chemistry Revision",
    description: "Named reactions, reagents, Cannizzaro and Aldol reaction mechanisms.",
    color: "#10b981",
    itemCount: 1,
    createdAt: "2024-10-20T11:00:00Z"
  },
  {
    id: "nb-reattempt",
    title: "Questions to Reattempt",
    description: "Questions incorrectly answered during CBT mock tests marked for focused retry.",
    color: "#ef4444",
    itemCount: 1,
    createdAt: "2024-10-26T18:00:00Z"
  }
];

export const MOCK_BOOKMARKS: BookmarkItem[] = [
  {
    id: "bm-01",
    questionId: "pyq-jee-2024-phy-01",
    question: MOCK_PYQS[0],
    notebookId: "nb-phy-pyqs",
    savedAt: "2024-10-25T14:20:00Z",
    notes: "Remember to integrate $F(t) = 6t$ with respect to time rather than using constant acceleration formulas!"
  },
  {
    id: "bm-02",
    questionId: "pyq-jee-2024-phy-03",
    question: MOCK_PYQS[2],
    notebookId: "nb-phy-pyqs",
    savedAt: "2024-10-26T10:15:00Z",
    notes: "Capacitors with dielectric slabs split along thickness are in series. Use harmonic mean of K."
  },
  {
    id: "bm-03",
    questionId: "pyq-jee-2024-math-01",
    question: MOCK_PYQS[5],
    notebookId: "nb-math-hard",
    savedAt: "2024-10-26T12:30:00Z",
    notes: "Standard skew lines formula: $|(\\vec{a}_2 - \\vec{a}_1) \\cdot (\\vec{b}_1 \\times \\vec{b}_2)| / |\\vec{b}_1 \\times \\vec{b}_2|$."
  },
  {
    id: "bm-04",
    questionId: "pyq-jee-2024-chem-02",
    question: MOCK_PYQS[4],
    notebookId: "nb-chem-organic",
    savedAt: "2024-10-26T14:45:00Z",
    notes: "Disproportionation of benzaldehyde without alpha hydrogens yielding benzyl alcohol and sodium benzoate."
  },
  {
    id: "bm-05",
    questionId: "gen-doc-hcv-lom-01",
    question: MOCK_GENERATED_QUESTIONS[2],
    notebookId: "nb-reattempt",
    savedAt: "2024-10-26T19:00:00Z",
    notes: "Mistake made in mock test: checked angle of repose vs inclination before calculating required normal force."
  }
];

