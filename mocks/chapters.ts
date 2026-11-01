import { Chapter } from "@/types";

export const CHAPTERS: Chapter[] = [
  // Physics (JEE Main)
  { id: "chap-lom", subjectId: "sub-phy", examId: "jee-main", name: "Laws of Motion & Friction", order: 1, totalPYQs: 42, averageWeightagePercent: 4.8 },
  { id: "chap-wep", subjectId: "sub-phy", examId: "jee-main", name: "Work, Energy & Power", order: 2, totalPYQs: 36, averageWeightagePercent: 4.2 },
  { id: "chap-rot", subjectId: "sub-phy", examId: "jee-main", name: "Rotational Dynamics & COM", order: 3, totalPYQs: 48, averageWeightagePercent: 5.4 },
  { id: "chap-thermo-phy", subjectId: "sub-phy", examId: "jee-main", name: "Thermodynamics & KTG", order: 4, totalPYQs: 52, averageWeightagePercent: 6.2 },
  { id: "chap-electro", subjectId: "sub-phy", examId: "jee-main", name: "Electrostatics & Capacitors", order: 5, totalPYQs: 64, averageWeightagePercent: 7.1 },
  { id: "chap-curr", subjectId: "sub-phy", examId: "jee-main", name: "Current Electricity", order: 6, totalPYQs: 58, averageWeightagePercent: 6.5 },
  { id: "chap-optics", subjectId: "sub-phy", examId: "jee-main", name: "Ray Optics & Optical Instruments", order: 7, totalPYQs: 44, averageWeightagePercent: 5.0 },
  { id: "chap-modphy", subjectId: "sub-phy", examId: "jee-main", name: "Modern Physics & Atoms", order: 8, totalPYQs: 68, averageWeightagePercent: 8.0 },

  // Chemistry (JEE Main)
  { id: "chap-chem-bond", subjectId: "sub-chem", examId: "jee-main", name: "Chemical Bonding & Molecular Structure", order: 1, totalPYQs: 54, averageWeightagePercent: 6.8 },
  { id: "chap-equil", subjectId: "sub-chem", examId: "jee-main", name: "Chemical & Ionic Equilibrium", order: 2, totalPYQs: 46, averageWeightagePercent: 5.2 },
  { id: "chap-thermo-chem", subjectId: "sub-chem", examId: "jee-main", name: "Chemical Thermodynamics", order: 3, totalPYQs: 40, averageWeightagePercent: 4.6 },
  { id: "chap-coord", subjectId: "sub-chem", examId: "jee-main", name: "Coordination Compounds", order: 4, totalPYQs: 58, averageWeightagePercent: 6.9 },
  { id: "chap-carbonyl", subjectId: "sub-chem", examId: "jee-main", name: "Aldehydes, Ketones & Carboxylic Acids", order: 5, totalPYQs: 62, averageWeightagePercent: 7.4 },
  { id: "chap-electrochem", subjectId: "sub-chem", examId: "jee-main", name: "Electrochemistry", order: 6, totalPYQs: 45, averageWeightagePercent: 5.1 },

  // Mathematics (JEE Main)
  { id: "chap-matrices", subjectId: "sub-math", examId: "jee-main", name: "Matrices & Determinants", order: 1, totalPYQs: 56, averageWeightagePercent: 6.6 },
  { id: "chap-limits", subjectId: "sub-math", examId: "jee-main", name: "Limits, Continuity & Differentiability", order: 2, totalPYQs: 50, averageWeightagePercent: 5.8 },
  { id: "chap-defint", subjectId: "sub-math", examId: "jee-main", name: "Definite Integrals & Differential Equations", order: 3, totalPYQs: 64, averageWeightagePercent: 7.5 },
  { id: "chap-vec3d", subjectId: "sub-math", examId: "jee-main", name: "Vectors & 3-Dimensional Geometry", order: 4, totalPYQs: 70, averageWeightagePercent: 8.4 },
  { id: "chap-conics", subjectId: "sub-math", examId: "jee-main", name: "Coordinate Geometry (Circles & Conics)", order: 5, totalPYQs: 60, averageWeightagePercent: 7.2 },
  { id: "chap-prob", subjectId: "sub-math", examId: "jee-main", name: "Probability & Permutations", order: 6, totalPYQs: 48, averageWeightagePercent: 5.6 },

  // GATE CS Chapters
  { id: "chap-gate-trees", subjectId: "sub-gate-ds", examId: "gate", name: "Trees & Binary Search Trees", order: 1, totalPYQs: 32, averageWeightagePercent: 4.5 },
  { id: "chap-gate-graphs", subjectId: "sub-gate-ds", examId: "gate", name: "Graph Traversals & Shortest Paths", order: 2, totalPYQs: 28, averageWeightagePercent: 4.2 },
  { id: "chap-gate-sync", subjectId: "sub-gate-os", examId: "gate", name: "Process Synchronization & Semaphores", order: 1, totalPYQs: 26, averageWeightagePercent: 3.8 }
];

