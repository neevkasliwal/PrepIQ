import { QuestionItem } from "@/types";

export const MOCK_GENERATED_QUESTIONS: QuestionItem[] = [
  // 1. Generated variation of pyq-jee-2024-phy-01 (Laws of motion)
  {
    id: "gen-phy-lom-var-01",
    examId: "jee-main",
    subjectId: "sub-phy",
    chapterId: "chap-lom",
    topicId: "top-lom-1",
    questionType: "SINGLE_CORRECT",
    difficulty: "MEDIUM",
    statement: "A block of mass $m = 4\\text{ kg}$ is initially at rest on a smooth horizontal floor. A time-varying force $F(t) = 8t + 2\\text{ N}$ acts in the positive x-direction. The velocity of the block at $t = 3\\text{ s}$ is:",
    options: [
      { id: "opt-1", index: 0, label: "A", text: "$10.5\\text{ m/s}$" },
      { id: "opt-2", index: 1, label: "B", text: "$14.0\\text{ m/s}$" },
      { id: "opt-3", index: 2, label: "C", text: "$12.5\\text{ m/s}$" },
      { id: "opt-4", index: 3, label: "D", text: "$9.0\\text{ m/s}$" }
    ],
    correctOption: 0,
    stepByStepSolution: [
      "Acceleration $a(t) = \\frac{F(t)}{m} = \\frac{8t + 2}{4} = 2t + 0.5\\text{ m/s}^2$.",
      "Velocity $v(t) = \\int_{0}^{3} (2t + 0.5) dt = \\left[ t^2 + 0.5t \\right]_0^3$.",
      "$v(3) = 3^2 + 0.5(3) = 9 + 1.5 = 10.5\\text{ m/s}$."
    ],
    provenance: "GENERATED_SIMILAR",
    parentPyqId: "pyq-jee-2024-phy-01",
    verificationStatus: "VERIFIED",
    isDemonstrationSample: true
  },

  // 2. Generated variation of pyq-jee-2024-math-02 (Definite Integrals)
  {
    id: "gen-math-int-var-01",
    examId: "jee-main",
    subjectId: "sub-math",
    chapterId: "chap-defint",
    topicId: "top-int-1",
    questionType: "SINGLE_CORRECT",
    difficulty: "EASY",
    statement: "Evaluate the definite integral $I = \\int_{0}^{\\pi/2} \\frac{\\sqrt{\\sin x}}{\\sqrt{\\sin x} + \\sqrt{\\cos x}} dx$:",
    options: [
      { id: "opt-1", index: 0, label: "A", text: "$\\frac{\\pi}{4}$" },
      { id: "opt-2", index: 1, label: "B", text: "$\\frac{\\pi}{2}$" },
      { id: "opt-3", index: 2, label: "C", text: "$\\pi$" },
      { id: "opt-4", index: 3, label: "D", text: "$0$" }
    ],
    correctOption: 0,
    stepByStepSolution: [
      "Using King's property: $\\int_{a}^{b} f(x)dx = \\int_{a}^{b} f(a+b-x)dx$.",
      "Replacing $x$ by $\\pi/2 - x$ gives $I = \\int_{0}^{\\pi/2} \\frac{\\sqrt{\\cos x}}{\\sqrt{\\cos x} + \\sqrt{\\sin x}} dx$.",
      "Adding both equations: $2I = \\int_{0}^{\\pi/2} 1 dx = \\frac{\\pi}{2} \\implies I = \\frac{\\pi}{4}$."
    ],
    provenance: "GENERATED_SIMILAR",
    parentPyqId: "pyq-jee-2024-math-02",
    verificationStatus: "VERIFIED",
    isDemonstrationSample: true
  },

  // 3. Document-based question from HC Verma Mechanics
  {
    id: "gen-doc-hcv-lom-01",
    examId: "jee-main",
    subjectId: "sub-phy",
    chapterId: "chap-lom",
    topicId: "top-lom-2",
    questionType: "SINGLE_CORRECT",
    difficulty: "HARD",
    statement: "A block of mass $m = 2\\text{ kg}$ is kept on an inclined plane of inclination $\\theta = 30^\\circ$. The coefficient of static friction is $\\mu_s = 0.6$. The minimum horizontal force $F$ applied perpendicular to the incline to keep the block from sliding down is: (Take $g = 10\\text{ m/s}^2$)",
    options: [
      { id: "opt-1", index: 0, label: "A", text: "$6.67\\text{ N}$" },
      { id: "opt-2", index: 1, label: "B", text: "$10.0\\text{ N}$" },
      { id: "opt-3", index: 2, label: "C", text: "$5.0\\text{ N}$" },
      { id: "opt-4", index: 3, label: "D", text: "Block does not slide even without external force" }
    ],
    correctOption: 3,
    stepByStepSolution: [
      "The angle of repose $\\theta_r$ satisfies $\\tan \\theta_r = \\mu_s = 0.6$.",
      "Here, $\\tan(30^\\circ) = \\frac{1}{\\sqrt{3}} \\approx 0.577$.",
      "Since $\\tan(30^\\circ) < \\mu_s$ ($0.577 < 0.600$), the component of gravity down the incline ($mg \\sin 30^\\circ = 10\\text{ N}$) is strictly less than maximum static friction ($f_{s,max} = \\mu_s mg \\cos 30^\\circ = 0.6 \\times 20 \\times 0.866 = 10.39\\text{ N}$).",
      "Hence, the block remains stationary without any external assisting force."
    ],
    provenance: "DOCUMENT_BASED",
    sourceDocumentId: "doc-hcv-mech-1",
    sourcePage: 94,
    verificationStatus: "VERIFIED",
    isDemonstrationSample: true
  },

  // 4. Topic Practice: Electrostatics
  {
    id: "gen-top-elec-01",
    examId: "jee-main",
    subjectId: "sub-phy",
    chapterId: "chap-electro",
    topicId: "top-elec-2",
    questionType: "SINGLE_CORRECT",
    difficulty: "MEDIUM",
    statement: "A point charge $q$ is placed at the center of a cube of edge length $L$. The electric flux emerging through any one face of the cube is:",
    options: [
      { id: "opt-1", index: 0, label: "A", text: "$\\frac{q}{6\\varepsilon_0}$" },
      { id: "opt-2", index: 1, label: "B", text: "$\\frac{q}{\\varepsilon_0}$" },
      { id: "opt-3", index: 2, label: "C", text: "$\\frac{q}{24\\varepsilon_0}$" },
      { id: "opt-4", index: 3, label: "D", text: "$\\frac{q}{8\\varepsilon_0}$" }
    ],
    correctOption: 0,
    stepByStepSolution: [
      "By Gauss's Law, the total electric flux passing through the closed cube is $\\Phi_{total} = \\frac{q_{enclosed}}{\\varepsilon_0} = \\frac{q}{\\varepsilon_0}$.",
      "By geometric symmetry, the charge is equidistant from all $6$ identical faces.",
      "Therefore, the flux passing through any single face is $\\Phi_{face} = \\frac{\\Phi_{total}}{6} = \\frac{q}{6\\varepsilon_0}$."
    ],
    provenance: "TOPIC_PRACTICE",
    verificationStatus: "VERIFIED",
    isDemonstrationSample: true
  },

  // 5. Topic Practice: Coordination Chemistry
  {
    id: "gen-chem-coord-01",
    examId: "jee-main",
    subjectId: "sub-chem",
    chapterId: "chap-coord",
    topicId: "top-bond-1",
    questionType: "SINGLE_CORRECT",
    difficulty: "MEDIUM",
    statement: "The spin-only magnetic moment of $[\\text{Fe}(\\text{H}_2\\text{O})_6]^{2+}$ complex is approximately:",
    options: [
      { id: "opt-1", index: 0, label: "A", text: "$4.90\\text{ BM}$" },
      { id: "opt-2", index: 1, label: "B", text: "$5.92\\text{ BM}$" },
      { id: "opt-3", index: 2, label: "C", text: "$2.84\\text{ BM}$" },
      { id: "opt-4", index: 3, label: "D", text: "$0.00\\text{ BM}$" }
    ],
    correctOption: 0,
    stepByStepSolution: [
      "In $[\\text{Fe}(\\text{H}_2\\text{O})_6]^{2+}$, iron is in $+2$ oxidation state: $\\text{Fe}^{2+} = [\\text{Ar}] 3d^6$.",
      "$\\text{H}_2\\text{O}$ is a weak field ligand, so no electron pairing occurs (high spin).",
      "Configuration: $t_{2g}^4 e_g^2 \\implies n = 4$ unpaired electrons.",
      "Spin-only magnetic moment $\\mu = \\sqrt{n(n+2)} = \\sqrt{4(6)} = \\sqrt{24} \\approx 4.90\\text{ BM}$."
    ],
    provenance: "TOPIC_PRACTICE",
    verificationStatus: "VERIFIED",
    isDemonstrationSample: true
  }
];

