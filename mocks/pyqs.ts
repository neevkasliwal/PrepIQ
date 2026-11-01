import { QuestionItem } from "@/types";

export const MOCK_PYQS: QuestionItem[] = [
  // 1. JEE Main 2024 Physics - Laws of Motion
  {
    id: "pyq-jee-2024-phy-01",
    examId: "jee-main",
    year: 2024,
    sessionOrShift: "27 Jan Shift 1",
    subjectId: "sub-phy",
    chapterId: "chap-lom",
    topicId: "top-lom-1",
    questionType: "SINGLE_CORRECT",
    difficulty: "MEDIUM",
    statement: "A block of mass $m = 5\\text{ kg}$ is resting on a horizontal frictionless surface. A horizontal force $F(t) = 6t\\text{ N}$ is applied to the block starting at $t = 0$. The velocity of the block at $t = 5\\text{ s}$ is:",
    options: [
      { id: "opt-1", index: 0, label: "A", text: "$15\\text{ m/s}$" },
      { id: "opt-2", index: 1, label: "B", text: "$30\\text{ m/s}$" },
      { id: "opt-3", index: 2, label: "C", text: "$12\\text{ m/s}$" },
      { id: "opt-4", index: 3, label: "D", text: "$25\\text{ m/s}$" }
    ],
    correctOption: 0,
    stepByStepSolution: [
      "Given $F(t) = 6t$ and $m = 5\\text{ kg}$.",
      "Using Newton's Second Law: $a(t) = \\frac{F(t)}{m} = \\frac{6t}{5}\\text{ m/s}^2$.",
      "Velocity is the integral of acceleration with respect to time: $v(t) = \\int_{0}^{t} a(t)dt = \\int_{0}^{5} \\frac{6t}{5} dt$.",
      "$v(5) = \\left[ \\frac{6 t^2}{10} \\right]_0^5 = \\frac{3}{5} \\times 25 = 15\\text{ m/s}$."
    ],
    sourceReference: "NTA JEE Main 2024 (27 Jan Shift 1, Q.04)",
    answerKeyReference: "NTA Official Answer Key 2024 - Physics Section A",
    verificationStatus: "VERIFIED",
    provenance: "ORIGINAL_PYQ",
    bookmarked: true,
    isDemonstrationSample: true
  },

  // 2. JEE Main 2024 Physics - Work, Energy & Power
  {
    id: "pyq-jee-2024-phy-02",
    examId: "jee-main",
    year: 2024,
    sessionOrShift: "29 Jan Shift 2",
    subjectId: "sub-phy",
    chapterId: "chap-wep",
    topicId: "top-wep-1",
    questionType: "SINGLE_CORRECT",
    difficulty: "EASY",
    statement: "A body of mass $2\\text{ kg}$ moves along the x-axis under the influence of a conservative force whose potential energy is given by $U(x) = 4x^2 - 16x + 20\\text{ J}$. The equilibrium position and the work done to move the body from $x = 0$ to $x = 2\\text{ m}$ are:",
    options: [
      { id: "opt-1", index: 0, label: "A", text: "$x = 2\\text{ m},\\; W = 16\\text{ J}$" },
      { id: "opt-2", index: 1, label: "B", text: "$x = 2\\text{ m},\\; W = -16\\text{ J}$" },
      { id: "opt-3", index: 2, label: "C", text: "$x = 4\\text{ m},\\; W = 20\\text{ J}$" },
      { id: "opt-4", index: 3, label: "D", text: "$x = 1\\text{ m},\\; W = 8\\text{ J}$" }
    ],
    correctOption: 0,
    stepByStepSolution: [
      "For equilibrium, $\\frac{dU}{dx} = 0$.",
      "$\\frac{d}{dx}(4x^2 - 16x + 20) = 8x - 16 = 0 \\implies x = 2\\text{ m}$.",
      "Work done by the external agent against conservative force is $W = \\Delta U = U(2) - U(0)$.",
      "$U(0) = 20\\text{ J}$ and $U(2) = 4(4) - 16(2) + 20 = 16 - 32 + 20 = 4\\text{ J}$.",
      "Work done by the conservative force: $W_c = -\\Delta U = -(4 - 20) = 16\\text{ J}$."
    ],
    sourceReference: "NTA JEE Main 2024 (29 Jan Shift 2, Q.11)",
    answerKeyReference: "NTA Official Final Key 2024",
    verificationStatus: "VERIFIED",
    provenance: "ORIGINAL_PYQ",
    bookmarked: false,
    isDemonstrationSample: true
  },

  // 3. JEE Main 2024 Physics - Electrostatics (Numerical)
  {
    id: "pyq-jee-2024-phy-03",
    examId: "jee-main",
    year: 2024,
    sessionOrShift: "30 Jan Shift 1",
    subjectId: "sub-phy",
    chapterId: "chap-electro",
    topicId: "top-elec-3",
    questionType: "NUMERICAL",
    difficulty: "HARD",
    statement: "A parallel plate capacitor with plate area $A = 100\\text{ cm}^2$ and plate separation $d = 2\\text{ mm}$ is filled with two dielectric slabs of equal thickness $d/2 = 1\\text{ mm}$ having dielectric constants $K_1 = 3$ and $K_2 = 6$. The equivalent capacitance of the system is $C_0 \\times 10^{-11}\\text{ F}$. (Take $\\varepsilon_0 = 8.85 \\times 10^{-12}\\text{ F/m}$). The value of $C_0$ rounded to the nearest integer is:",
    numericalAnswer: 18,
    numericalRange: [17, 19],
    stepByStepSolution: [
      "The system can be modeled as two capacitors connected in series: $C_1 = \\frac{K_1 \\varepsilon_0 A}{d/2}$ and $C_2 = \\frac{K_2 \\varepsilon_0 A}{d/2}$.",
      "Equivalent capacitance $\\frac{1}{C_{eq}} = \\frac{1}{C_1} + \\frac{1}{C_2} = \\frac{d}{2\\varepsilon_0 A}\\left( \\frac{1}{K_1} + \\frac{1}{K_2} \\right)$.",
      "$\\frac{1}{K_1} + \\frac{1}{K_2} = \\frac{1}{3} + \\frac{1}{6} = \\frac{3}{6} = \\frac{1}{2}$.",
      "Thus $C_{eq} = \\frac{2 \\varepsilon_0 A}{d (1/2)} = \\frac{4 \\varepsilon_0 A}{d}$.",
      "Substitute: $C_{eq} = \\frac{4 \\times 8.85 \\times 10^{-12} \\times 100 \\times 10^{-4}}{2 \\times 10^{-3}} = 2 \\times 8.85 \\times 10^{-11} = 17.7 \\times 10^{-11}\\text{ F}$.",
      "Rounding to nearest integer gives $18$."
    ],
    sourceReference: "NTA JEE Main 2024 (30 Jan Shift 1, Sec B Q.22)",
    answerKeyReference: "NTA Official Master Key",
    verificationStatus: "VERIFIED",
    provenance: "ORIGINAL_PYQ",
    bookmarked: true,
    isDemonstrationSample: true
  },

  // 4. JEE Main 2024 Chemistry - Chemical Bonding
  {
    id: "pyq-jee-2024-chem-01",
    examId: "jee-main",
    year: 2024,
    sessionOrShift: "27 Jan Shift 1",
    subjectId: "sub-chem",
    chapterId: "chap-chem-bond",
    topicId: "top-bond-2",
    questionType: "SINGLE_CORRECT",
    difficulty: "EASY",
    statement: "According to Molecular Orbital Theory (MOT), which of the following species is diamagnetic and has a fractional bond order?",
    options: [
      { id: "opt-1", index: 0, label: "A", text: "$\\text{O}_2^{2-}$" },
      { id: "opt-2", index: 1, label: "B", text: "$\\text{H}_2^+$" },
      { id: "opt-3", index: 2, label: "C", text: "$\\text{He}_2^+$" },
      { id: "opt-4", index: 3, label: "D", text: "None of these (Paramagnetic species)" }
    ],
    correctOption: 3,
    stepByStepSolution: [
      "Species with fractional bond orders must have an odd number of total electrons (e.g., $\\text{H}_2^+$ has 1 electron, $\\text{He}_2^+$ has 3 electrons).",
      "However, any species with an odd number of electrons inevitably possesses an unpaired electron, making it paramagnetic.",
      "$\\text{O}_2^{2-}$ has 18 electrons (even) and bond order = 1, so it is diamagnetic but its bond order is an integer.",
      "Therefore, no homonuclear diatomic species can be simultaneously diamagnetic and possess a fractional bond order."
    ],
    sourceReference: "NTA JEE Main 2024 (27 Jan Shift 1, Q.38)",
    answerKeyReference: "NTA Official Key 2024",
    verificationStatus: "VERIFIED",
    provenance: "ORIGINAL_PYQ",
    bookmarked: false,
    isDemonstrationSample: true
  },

  // 5. JEE Main 2024 Chemistry - Carbonyl Compounds
  {
    id: "pyq-jee-2024-chem-02",
    examId: "jee-main",
    year: 2024,
    sessionOrShift: "01 Feb Shift 2",
    subjectId: "sub-chem",
    chapterId: "chap-carbonyl",
    topicId: "top-carb-1",
    questionType: "SINGLE_CORRECT",
    difficulty: "MEDIUM",
    statement: "Benzaldehyde on heating with concentrated $\\text{NaOH}$ undergoes Cannizzaro reaction. The products formed are:",
    options: [
      { id: "opt-1", index: 0, label: "A", text: "Benzyl alcohol and Sodium benzoate" },
      { id: "opt-2", index: 1, label: "B", text: "Benzene and Sodium formate" },
      { id: "opt-3", index: 2, label: "C", text: "Benzoic acid and Benzophenone" },
      { id: "opt-4", index: 3, label: "D", text: "Two molecules of Benzyl alcohol" }
    ],
    correctOption: 0,
    stepByStepSolution: [
      "Benzaldehyde ($\\text{C}_6\\text{H}_5\\text{CHO}$) lacks $\\alpha$-hydrogen atoms, which is the key prerequisite for the Cannizzaro reaction.",
      "Under strongly alkaline conditions ($50\\%\\; \\text{NaOH}$), disproportionation (redox) occurs:",
      "$2\\text{C}_6\\text{H}_5\\text{CHO} + \\text{NaOH} \\xrightarrow{\\Delta} \\text{C}_6\\text{H}_5\\text{CH}_2\\text{OH} + \\text{C}_6\\text{H}_5\\text{COONa}$.",
      "One molecule reduces to benzyl alcohol and the other oxidizes to sodium benzoate."
    ],
    sourceReference: "NTA JEE Main 2024 (01 Feb Shift 2, Q.42)",
    answerKeyReference: "NTA Official Answer Key 2024",
    verificationStatus: "VERIFIED",
    provenance: "ORIGINAL_PYQ",
    bookmarked: true,
    isDemonstrationSample: true
  },

  // 6. JEE Main 2024 Mathematics - Vectors & 3D Geometry
  {
    id: "pyq-jee-2024-math-01",
    examId: "jee-main",
    year: 2024,
    sessionOrShift: "27 Jan Shift 2",
    subjectId: "sub-math",
    chapterId: "chap-vec3d",
    topicId: "top-vec-2",
    questionType: "SINGLE_CORRECT",
    difficulty: "HARD",
    statement: "The shortest distance between the skew lines $\\vec{r}_1 = (\\hat{i} + 2\\hat{j} + 3\\hat{k}) + \\lambda(2\\hat{i} + 3\\hat{j} + 4\\hat{k})$ and $\\vec{r}_2 = (2\\hat{i} + 4\\hat{j} + 5\\hat{k}) + \\mu(3\\hat{i} + 4\\hat{j} + 5\\hat{k})$ is:",
    options: [
      { id: "opt-1", index: 0, label: "A", text: "$\\frac{1}{\\sqrt{6}}$" },
      { id: "opt-2", index: 1, label: "B", text: "$\\frac{2}{\\sqrt{3}}$" },
      { id: "opt-3", index: 2, label: "C", text: "$\\frac{1}{\\sqrt{3}}$" },
      { id: "opt-4", index: 3, label: "D", text: "$\\frac{3}{\\sqrt{2}}$" }
    ],
    correctOption: 0,
    stepByStepSolution: [
      "Let $\\vec{a}_1 = \\hat{i} + 2\\hat{j} + 3\\hat{k}$ and $\\vec{b}_1 = 2\\hat{i} + 3\\hat{j} + 4\\hat{k}$.",
      "Let $\\vec{a}_2 = 2\\hat{i} + 4\\hat{j} + 5\\hat{k}$ and $\\vec{b}_2 = 3\\hat{i} + 4\\hat{j} + 5\\hat{k}$.",
      "$\\vec{a}_2 - \\vec{a}_1 = \\hat{i} + 2\\hat{j} + 2\\hat{k}$.",
      "Compute normal vector: $\\vec{b}_1 \\times \\vec{b}_2 = \\begin{vmatrix} \\hat{i} & \\hat{j} & \\hat{k} \\\\ 2 & 3 & 4 \\\\ 3 & 4 & 5 \\end{vmatrix} = \\hat{i}(15 - 16) - \\hat{j}(10 - 12) + \\hat{k}(8 - 9) = -\\hat{i} + 2\\hat{j} - \\hat{k}$.",
      "Magnitude $|\\vec{b}_1 \\times \\vec{b}_2| = \\sqrt{(-1)^2 + 2^2 + (-1)^2} = \\sqrt{6}$.",
      "Dot product: $(\\vec{a}_2 - \\vec{a}_1) \\cdot (\\vec{b}_1 \\times \\vec{b}_2) = (1)(-1) + (2)(2) + (2)(-1) = -1 + 4 - 2 = 1$.",
      "Shortest distance $d = \\frac{|(\\vec{a}_2 - \\vec{a}_1) \\cdot (\\vec{b}_1 \\times \\vec{b}_2)|}{|\\vec{b}_1 \\times \\vec{b}_2|} = \\frac{1}{\\sqrt{6}}$."
    ],
    sourceReference: "NTA JEE Main 2024 (27 Jan Shift 2, Q.67)",
    answerKeyReference: "NTA Master Answer Key 2024",
    verificationStatus: "VERIFIED",
    provenance: "ORIGINAL_PYQ",
    bookmarked: true,
    isDemonstrationSample: true
  },

  // 7. JEE Main 2024 Mathematics - Definite Integrals
  {
    id: "pyq-jee-2024-math-02",
    examId: "jee-main",
    year: 2024,
    sessionOrShift: "29 Jan Shift 1",
    subjectId: "sub-math",
    chapterId: "chap-defint",
    topicId: "top-int-1",
    questionType: "SINGLE_CORRECT",
    difficulty: "MEDIUM",
    statement: "The value of the definite integral $I = \\int_{0}^{\\pi/2} \\frac{\\sin^4 x}{\\sin^4 x + \\cos^4 x} dx$ is:",
    options: [
      { id: "opt-1", index: 0, label: "A", text: "$\\frac{\\pi}{4}$" },
      { id: "opt-2", index: 1, label: "B", text: "$\\frac{\\pi}{2}$" },
      { id: "opt-3", index: 2, label: "C", text: "$\\frac{\\pi}{8}$" },
      { id: "opt-4", index: 3, label: "D", text: "$1$" }
    ],
    correctOption: 0,
    stepByStepSolution: [
      "Let $I = \\int_{0}^{\\pi/2} \\frac{\\sin^4 x}{\\sin^4 x + \\cos^4 x} dx$ (Eq. 1).",
      "Applying King's property $\\int_{a}^{b} f(x) dx = \\int_{a}^{b} f(a+b-x) dx$:",
      "$I = \\int_{0}^{\\pi/2} \\frac{\\sin^4(\\pi/2 - x)}{\\sin^4(\\pi/2 - x) + \\cos^4(\\pi/2 - x)} dx = \\int_{0}^{\\pi/2} \\frac{\\cos^4 x}{\\cos^4 x + \\sin^4 x} dx$ (Eq. 2).",
      "Adding (1) and (2): $2I = \\int_{0}^{\\pi/2} \\frac{\\sin^4 x + \\cos^4 x}{\\sin^4 x + \\cos^4 x} dx = \\int_{0}^{\\pi/2} 1 dx = \\frac{\\pi}{2}$.",
      "Therefore, $I = \\frac{\\pi}{4}$."
    ],
    sourceReference: "NTA JEE Main 2024 (29 Jan Shift 1, Q.72)",
    answerKeyReference: "NTA Final Key 2024",
    verificationStatus: "VERIFIED",
    provenance: "ORIGINAL_PYQ",
    bookmarked: false,
    isDemonstrationSample: true
  },

  // 8. GATE CS 2024 - Trees
  {
    id: "pyq-gate-2024-cs-01",
    examId: "gate",
    year: 2024,
    sessionOrShift: "Session 1",
    subjectId: "sub-gate-ds",
    chapterId: "chap-gate-trees",
    topicId: "top-gate-tree-1",
    questionType: "SINGLE_CORRECT",
    difficulty: "MEDIUM",
    statement: "What is the maximum number of nodes in an AVL tree of height $h = 4$? (Assume height of a single node tree is $0$):",
    options: [
      { id: "opt-1", index: 0, label: "A", text: "$31$" },
      { id: "opt-2", index: 1, label: "B", text: "$20$" },
      { id: "opt-3", index: 2, label: "C", text: "$12$" },
      { id: "opt-4", index: 3, label: "D", text: "$15$" }
    ],
    correctOption: 0,
    stepByStepSolution: [
      "An AVL tree of height $h$ achieves maximum number of nodes when it is a perfectly balanced complete binary tree.",
      "The formula for maximum nodes in a binary tree of height $h$ (with root at height $0$) is $N_{max} = 2^{h+1} - 1$.",
      "For $h = 4$: $N_{max} = 2^{4+1} - 1 = 2^5 - 1 = 32 - 1 = 31$ nodes."
    ],
    sourceReference: "GATE CS 2024 Official Paper (Session 1, Q.22)",
    answerKeyReference: "IIT IISc GATE Joint Answer Key 2024",
    verificationStatus: "VERIFIED",
    provenance: "ORIGINAL_PYQ",
    bookmarked: false,
    isDemonstrationSample: true
  }
];

