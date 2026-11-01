import { Topic } from "@/types";

export const TOPICS: Topic[] = [
  // Laws of Motion
  { id: "top-lom-1", chapterId: "chap-lom", name: "Newton's Second Law & Constraint Motion", importance: "HIGH" },
  { id: "top-lom-2", chapterId: "chap-lom", name: "Frictional Forces & Incline Planes", importance: "HIGH" },
  { id: "top-lom-3", chapterId: "chap-lom", name: "Banking of Roads & Circular Dynamics", importance: "MEDIUM" },

  // Work, Energy & Power
  { id: "top-wep-1", chapterId: "chap-wep", name: "Work-Energy Theorem", importance: "HIGH" },
  { id: "top-wep-2", chapterId: "chap-wep", name: "Potential Energy & Equilibrium", importance: "MEDIUM" },
  { id: "top-wep-3", chapterId: "chap-wep", name: "Elastic and Inelastic Collisions", importance: "HIGH" },

  // Electrostatics
  { id: "top-elec-1", chapterId: "chap-electro", name: "Coulomb's Law & Electric Dipole", importance: "MEDIUM" },
  { id: "top-elec-2", chapterId: "chap-electro", name: "Gauss's Law and Flux Calculation", importance: "HIGH" },
  { id: "top-elec-3", chapterId: "chap-electro", name: "Capacitor Networks with Dielectrics", importance: "HIGH" },

  // Chemical Bonding
  { id: "top-bond-1", chapterId: "chap-chem-bond", name: "VSEPR Theory & Hybridization", importance: "HIGH" },
  { id: "top-bond-2", chapterId: "chap-chem-bond", name: "Molecular Orbital Theory (MOT) & Bond Order", importance: "HIGH" },
  { id: "top-bond-3", chapterId: "chap-chem-bond", name: "Hydrogen Bonding & Dipole Moment", importance: "MEDIUM" },

  // Carbonyl Compounds
  { id: "top-carb-1", chapterId: "chap-carbonyl", name: "Nucleophilic Addition & Cannizzaro Reaction", importance: "HIGH" },
  { id: "top-carb-2", chapterId: "chap-carbonyl", name: "Aldol Condensation & Cross-Aldol", importance: "HIGH" },

  // Vectors & 3D Geometry
  { id: "top-vec-1", chapterId: "chap-vec3d", name: "Dot, Cross & Scalar Triple Products", importance: "HIGH" },
  { id: "top-vec-2", chapterId: "chap-vec3d", name: "Shortest Distance Between Skew Lines", importance: "HIGH" },
  { id: "top-vec-3", chapterId: "chap-vec3d", name: "Equation of Plane & Line Intersections", importance: "HIGH" },

  // Definite Integrals
  { id: "top-int-1", chapterId: "chap-defint", name: "King's Rule & Definite Integral Properties", importance: "HIGH" },
  { id: "top-int-2", chapterId: "chap-defint", name: "Leibnitz Rule for Differentiation under Integral", importance: "HIGH" },
  { id: "top-int-3", chapterId: "chap-defint", name: "Linear Differential Equations & Integrating Factor", importance: "HIGH" },

  // GATE CS Trees
  { id: "top-gate-tree-1", chapterId: "chap-gate-trees", name: "AVL Trees & Rotations", importance: "HIGH" },
  { id: "top-gate-tree-2", chapterId: "chap-gate-trees", name: "Binary Tree Traversals (Inorder, Preorder, Postorder)", importance: "HIGH" }
];

