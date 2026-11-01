import { FormulaCard } from "@/types";

export const MOCK_FORMULA_CARDS: FormulaCard[] = [
  {
    id: "fc-lom-friction",
    name: "Maximum Static Friction & Angle of Repose",
    formulaLatex: "f_{s,\\max} = \\mu_s N, \\quad \\tan \\theta_r = \\mu_s",
    explanation: "Static friction self-adjusts up to its limiting value $f_{s,\\max}$. Once the component of external force along the contact plane exceeds this threshold, relative sliding initiates. The angle of repose $\\theta_r$ is the maximum angle of an inclined plane at which a block placed on it remains in equilibrium without sliding.",
    variableDefinitions: [
      { symbol: "f_{s,\\max}", meaning: "Limiting (maximum) static frictional force (Newtons)" },
      { symbol: "\\mu_s", meaning: "Coefficient of static friction between surfaces (dimensionless)" },
      { symbol: "N", meaning: "Normal contact force exerted perpendicular to the surface" },
      { symbol: "\\theta_r", meaning: "Angle of repose of the inclined plane" }
    ],
    subjectId: "sub-phy",
    chapterId: "chap-lom",
    topicId: "top-lom-2",
    relatedQuestionIds: ["pyq-jee-2024-phy-01", "gen-doc-hcv-lom-01"],
    isBookmarked: true
  },
  {
    id: "fc-wep-work-energy",
    name: "Work-Kinetic Energy Theorem",
    formulaLatex: "W_{\\text{total}} = W_c + W_{nc} + W_{\\text{ext}} = \\Delta K = \\frac{1}{2}m v_f^2 - \\frac{1}{2}m v_i^2",
    explanation: "The total work performed on a particle by all forces (conservative, non-conservative, and external forces combined) equals the net change in its kinetic energy in an inertial reference frame.",
    variableDefinitions: [
      { symbol: "W_{\\text{total}}", meaning: "Net algebraic work done by all acting forces (Joules)" },
      { symbol: "W_c", meaning: "Work done by conservative forces ($-\\Delta U$)" },
      { symbol: "W_{nc}", meaning: "Work done by non-conservative forces such as friction" },
      { symbol: "\\Delta K", meaning: "Change in translational kinetic energy" }
    ],
    subjectId: "sub-phy",
    chapterId: "chap-wep",
    topicId: "top-wep-1",
    relatedQuestionIds: ["pyq-jee-2024-phy-02"],
    isBookmarked: false
  },
  {
    id: "fc-elec-capacitance-dielectric",
    name: "Capacitance with Inhomogeneous Dielectrics (Series)",
    formulaLatex: "C_{eq} = \\frac{\\varepsilon_0 A}{\\sum \\frac{d_i}{K_i}} = \\frac{\\varepsilon_0 A}{\\frac{d_1}{K_1} + \\frac{d_2}{K_2}}",
    explanation: "When dielectric slabs are stacked parallel to the plates, the electric field is modified in each segment, equivalent to individual capacitors connected in series with common charge $Q$.",
    variableDefinitions: [
      { symbol: "C_{eq}", meaning: "Equivalent capacitance of the composite system (Farads)" },
      { symbol: "\\varepsilon_0", meaning: "Permittivity of free space ($8.854 \\times 10^{-12}\\text{ F/m}$)" },
      { symbol: "A", meaning: "Area of the conducting capacitor plates" },
      { symbol: "K_i", meaning: "Dielectric constant (relative permittivity) of slab $i$" },
      { symbol: "d_i", meaning: "Thickness of dielectric layer $i$" }
    ],
    subjectId: "sub-phy",
    chapterId: "chap-electro",
    topicId: "top-elec-3",
    relatedQuestionIds: ["pyq-jee-2024-phy-03"],
    isBookmarked: true
  },
  {
    id: "fc-math-skew-lines",
    name: "Shortest Distance Between Two Skew Lines",
    formulaLatex: "d = \\frac{\\left| (\\vec{a}_2 - \\vec{a}_1) \\cdot (\\vec{b}_1 \\times \\vec{b}_2) \\right|}{\\left| \\vec{b}_1 \\times \\vec{b}_2 \\right|}",
    explanation: "For two non-parallel, non-intersecting lines in three-dimensional space $\\vec{r}_1 = \\vec{a}_1 + \\lambda \\vec{b}_1$ and $\\vec{r}_2 = \\vec{a}_2 + \\mu \\vec{b}_2$, the shortest distance is the projection of vector joining their position vectors onto the common perpendicular unit normal.",
    variableDefinitions: [
      { symbol: "\\vec{a}_1, \\vec{a}_2", meaning: "Position vectors of arbitrary known points lying on line 1 and 2" },
      { symbol: "\\vec{b}_1, \\vec{b}_2", meaning: "Direction vectors of line 1 and line 2" },
      { symbol: "\\vec{b}_1 \\times \\vec{b}_2", meaning: "Vector mutually perpendicular to both lines" },
      { symbol: "d", meaning: "Minimum Euclidean separation between lines" }
    ],
    subjectId: "sub-math",
    chapterId: "chap-vec3d",
    topicId: "top-vec-2",
    relatedQuestionIds: ["pyq-jee-2024-math-01"],
    isBookmarked: true
  },
  {
    id: "fc-math-kings-rule",
    name: "King's Rule in Definite Integration",
    formulaLatex: "\\int_{a}^{b} f(x) dx = \\int_{a}^{b} f(a + b - x) dx",
    explanation: "A fundamental symmetry property of Riemann integrals. It allows simplification of trigonometric and symmetric polynomial integrands by adding the transformed integral to the original integral.",
    variableDefinitions: [
      { symbol: "a, b", meaning: "Lower and upper limits of definite integration" },
      { symbol: "f(x)", meaning: "Continuous integrand function on $[a, b]$" }
    ],
    subjectId: "sub-math",
    chapterId: "chap-defint",
    topicId: "top-int-1",
    relatedQuestionIds: ["pyq-jee-2024-math-02", "gen-math-int-var-01"],
    isBookmarked: false
  }
];

