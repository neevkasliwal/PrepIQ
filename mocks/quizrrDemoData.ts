export interface SubjectDetail {
  id: string;
  title: string;
  shortName: string;
  color: string;
  markScored: number;
  totalScore: number;
  positiveScore: number;
  negativeScore: number;
  percentile: string;
  accuracy: number;
  timeSpentMinutes: number;
  correct: number;
  incorrect: number;
  unattempted: number;
  totalQuestions: number;
}

export interface QuizrrAnalysisData {
  testTitle: string;
  examName: string;
  totalMarks: number;
  totalQuestions: number;
  durationMinutes: number;
  overallScore: number;
  overallRank: number;
  totalRanks: number;
  overallPercentile: string;
  accuracyPercentage: number;
  attemptedQuestions: number;
  timeTakenMinutes: number;
  positiveScore: number;
  marksLost: number;
  consolationText: string;
  percentileDescription: string;
  subjects: Record<string, SubjectDetail>;
  qualityOfTime: {
    timeSpentCorrect: number;
    timeSpentIncorrect: number;
    timeSpentUnattempted: number;
    intervals: { interval: string; correct: number; incorrect: number; total: number }[];
  };
  attemptQuality: {
    perfect: number;
    overtime: number;
    wasted: number;
    confused: number;
    subjectWise: Record<string, { perfect: number; overtime: number; wasted: number; confused: number }>;
  };
  difficultyAnalysis: {
    easy: { correct: number; incorrect: number; unattempted: number; total: number };
    moderate: { correct: number; incorrect: number; unattempted: number; total: number };
    tough: { correct: number; incorrect: number; unattempted: number; total: number };
    subjectWise: Record<string, {
      easy: { correct: number; incorrect: number; unattempted: number };
      moderate: { correct: number; incorrect: number; unattempted: number };
      tough: { correct: number; incorrect: number; unattempted: number };
    }>;
  };
  subjectMovement: {
    title: string;
    subjectName: string;
    color: string;
    timeSpentSeconds: number;
    questionsAttemptedBeforeSwitch: number;
    isOpenedAgain: boolean;
  }[];
  questionsLog: {
    questionNumber: number;
    subject: "Physics" | "Chemistry" | "Mathematics";
    chapter: string;
    questionType: "SINGLE_CORRECT" | "NUMERICAL";
    difficulty: "EASY" | "MODERATE" | "TOUGH";
    status: "CORRECT" | "INCORRECT" | "UNATTEMPTED";
    marksAwarded: number;
    timeTakenSeconds: number;
    benchmarkTimeSeconds: number;
    attemptCategory: "PERFECT" | "CONFUSED" | "WASTED" | "UNATTEMPTED";
    studentAnswer: string;
    correctAnswer: string;
    statement: string;
    solution: string[];
    mistakeType?: "Calculation Error" | "Misread Statement" | "Concept Gap";
  }[];
}

export const QUIZRR_DEMO_DATA: QuizrrAnalysisData = {
  testTitle: "JEE Main 2025 Full Syllabus Mock Test (Demo)",
  examName: "NTA JEE Main",
  totalMarks: 300,
  totalQuestions: 75,
  durationMinutes: 180,
  overallScore: 226,
  overallRank: 77,
  totalRanks: 22019,
  overallPercentile: "99.9+",
  accuracyPercentage: 96.61,
  attemptedQuestions: 59,
  timeTakenMinutes: 111,
  positiveScore: 228,
  marksLost: 2,
  consolationText: "Exceptional Performance! Top 0.1% percentile range among test-takers.",
  percentileDescription: "Calculated dynamically against 22,019 verified aspirants using JEE Main January official percentile distribution curves.",
  subjects: {
    physics: {
      id: "physics",
      title: "Physics",
      shortName: "Phy",
      color: "#37B24D",
      markScored: 90,
      totalScore: 100,
      positiveScore: 92,
      negativeScore: 2,
      percentile: "99.5",
      accuracy: 95.83,
      timeSpentMinutes: 28,
      correct: 23,
      incorrect: 1,
      unattempted: 1,
      totalQuestions: 25
    },
    chemistry: {
      id: "chemistry",
      title: "Chemistry",
      shortName: "Chem",
      color: "#FF8C33",
      markScored: 91,
      totalScore: 100,
      positiveScore: 92,
      negativeScore: 1,
      percentile: "99.9+",
      accuracy: 100.0,
      timeSpentMinutes: 20,
      correct: 20,
      incorrect: 0,
      unattempted: 5,
      totalQuestions: 25
    },
    mathematics: {
      id: "mathematics",
      title: "Mathematics",
      shortName: "Math",
      color: "#0086FF",
      markScored: 77,
      totalScore: 100,
      positiveScore: 80,
      negativeScore: 3,
      percentile: "99.9",
      accuracy: 93.33,
      timeSpentMinutes: 63,
      correct: 14,
      incorrect: 1,
      unattempted: 10,
      totalQuestions: 25
    }
  },
  qualityOfTime: {
    timeSpentCorrect: 79,
    timeSpentIncorrect: 2,
    timeSpentUnattempted: 30,
    intervals: [
      { interval: "0-30m", correct: 23, incorrect: 1, total: 24 },
      { interval: "30-60m", correct: 20, incorrect: 1, total: 21 },
      { interval: "60-90m", correct: 7, incorrect: 0, total: 7 },
      { interval: "90-120m", correct: 7, incorrect: 0, total: 7 },
      { interval: "120-150m", correct: 0, incorrect: 0, total: 0 },
      { interval: "150-180m", correct: 0, incorrect: 0, total: 0 }
    ]
  },
  attemptQuality: {
    perfect: 46,
    overtime: 0,
    wasted: 0,
    confused: 3,
    subjectWise: {
      physics: { perfect: 20, overtime: 0, wasted: 0, confused: 0 },
      chemistry: { perfect: 19, overtime: 0, wasted: 0, confused: 0 },
      mathematics: { perfect: 7, overtime: 0, wasted: 0, confused: 3 }
    }
  },
  difficultyAnalysis: {
    easy: { correct: 24, incorrect: 0, unattempted: 5, total: 29 },
    moderate: { correct: 20, incorrect: 2, unattempted: 9, total: 31 },
    tough: { correct: 13, incorrect: 0, unattempted: 2, total: 15 },
    subjectWise: {
      physics: {
        easy: { correct: 12, incorrect: 0, unattempted: 0 },
        moderate: { correct: 7, incorrect: 1, unattempted: 1 },
        tough: { correct: 4, incorrect: 0, unattempted: 0 }
      },
      chemistry: {
        easy: { correct: 6, incorrect: 0, unattempted: 3 },
        moderate: { correct: 8, incorrect: 0, unattempted: 1 },
        tough: { correct: 6, incorrect: 0, unattempted: 1 }
      },
      mathematics: {
        easy: { correct: 6, incorrect: 0, unattempted: 2 },
        moderate: { correct: 5, incorrect: 1, unattempted: 7 },
        tough: { correct: 3, incorrect: 0, unattempted: 1 }
      }
    }
  },
  subjectMovement: [
    {
      title: "Started with Physics Section A (MCQs)",
      subjectName: "Physics Single Correct",
      color: "#37B24D",
      timeSpentSeconds: 1231,
      questionsAttemptedBeforeSwitch: 20,
      isOpenedAgain: false
    },
    {
      title: "Switched to Physics Section B (Numerical)",
      subjectName: "Physics Numerical",
      color: "#37B24D",
      timeSpentSeconds: 734,
      questionsAttemptedBeforeSwitch: 3,
      isOpenedAgain: true
    },
    {
      title: "Switched to Chemistry Section A (MCQs)",
      subjectName: "Chemistry Single Correct",
      color: "#FF8C33",
      timeSpentSeconds: 789,
      questionsAttemptedBeforeSwitch: 15,
      isOpenedAgain: false
    },
    {
      title: "Switched to Chemistry Section B (Numerical)",
      subjectName: "Chemistry Numerical",
      color: "#FF8C33",
      timeSpentSeconds: 353,
      questionsAttemptedBeforeSwitch: 5,
      isOpenedAgain: true
    },
    {
      title: "Switched to Mathematics Section A (MCQs)",
      subjectName: "Mathematics Single Correct",
      color: "#0086FF",
      timeSpentSeconds: 3319,
      questionsAttemptedBeforeSwitch: 11,
      isOpenedAgain: false
    },
    {
      title: "Switched to Mathematics Section B (Numerical)",
      subjectName: "Mathematics Numerical",
      color: "#0086FF",
      timeSpentSeconds: 220,
      questionsAttemptedBeforeSwitch: 3,
      isOpenedAgain: true
    },
    {
      title: "Final Verification & Quick Revision Round",
      subjectName: "All Subjects Review",
      color: "#364FC7",
      timeSpentSeconds: 600,
      questionsAttemptedBeforeSwitch: 2,
      isOpenedAgain: true
    }
  ],
  questionsLog: [
    {
      questionNumber: 1,
      subject: "Physics",
      chapter: "Laws of Motion & Friction",
      questionType: "SINGLE_CORRECT",
      difficulty: "EASY",
      status: "CORRECT",
      marksAwarded: 4,
      timeTakenSeconds: 30,
      benchmarkTimeSeconds: 65,
      attemptCategory: "PERFECT",
      studentAnswer: "Option D",
      correctAnswer: "Option D",
      statement: "A body of mass $m$ is moving with constant velocity along a straight line. The net external force acting on it is:",
      solution: [
        "By Newton's First Law, acceleration $a = 0$ when velocity is constant.",
        "Net external force $F_{net} = ma = 0$."
      ]
    },
    {
      questionNumber: 2,
      subject: "Physics",
      chapter: "Work, Energy & Power",
      questionType: "SINGLE_CORRECT",
      difficulty: "EASY",
      status: "CORRECT",
      marksAwarded: 4,
      timeTakenSeconds: 36,
      benchmarkTimeSeconds: 70,
      attemptCategory: "PERFECT",
      studentAnswer: "Option B",
      correctAnswer: "Option B",
      statement: "Statement I: Work done by conservative force around a closed loop is zero. Statement II: Frictional force is non-conservative.",
      solution: [
        "Conservative forces have path-independent work, so $\\oint \\vec{F} \\cdot d\\vec{r} = 0$.",
        "Friction dissipates mechanical energy as heat, hence non-conservative. Both statements are true."
      ]
    },
    {
      questionNumber: 3,
      subject: "Physics",
      chapter: "Ray Optics",
      questionType: "SINGLE_CORRECT",
      difficulty: "MODERATE",
      status: "CORRECT",
      marksAwarded: 4,
      timeTakenSeconds: 47,
      benchmarkTimeSeconds: 85,
      attemptCategory: "PERFECT",
      studentAnswer: "Option A",
      correctAnswer: "Option A",
      statement: "A ray incident at angle $A$ on a prism reflects internally. The total deviation angle $\\delta$ is:",
      solution: [
        "Applying geometry of reflection and boundary conditions: $\\delta = \\pi - 2A$."
      ]
    },
    {
      questionNumber: 4,
      subject: "Physics",
      chapter: "Electrostatics",
      questionType: "SINGLE_CORRECT",
      difficulty: "MODERATE",
      status: "INCORRECT",
      marksAwarded: -1,
      timeTakenSeconds: 48,
      benchmarkTimeSeconds: 90,
      attemptCategory: "CONFUSED",
      studentAnswer: "Option B",
      correctAnswer: "Option C",
      mistakeType: "Calculation Error",
      statement: "Three charges $+q, +q, -2q$ are placed at the vertices of an equilateral triangle of side $a$. The electric dipole moment of the system is:",
      solution: [
        "Decompose $-2q$ into $-q$ and $-q$ at vertex $C$.",
        "Two dipoles each of magnitude $p = qa$ are inclined at $60^\\circ$.",
        "Resultant dipole moment $p_{net} = \\sqrt{p^2 + p^2 + 2p^2 \\cos 60^\\circ} = \\sqrt{3}qa$.",
        "Student chose $\\sqrt{2}qa$ by forgetting the equilateral angle of $60^\\circ$."
      ]
    },
    {
      questionNumber: 5,
      subject: "Physics",
      chapter: "Rotational Dynamics",
      questionType: "SINGLE_CORRECT",
      difficulty: "TOUGH",
      status: "CORRECT",
      marksAwarded: 4,
      timeTakenSeconds: 48,
      benchmarkTimeSeconds: 110,
      attemptCategory: "PERFECT",
      studentAnswer: "Option D",
      correctAnswer: "Option D",
      statement: "A rod of length $L$ pivots at one end. The instantaneous acceleration of the free tip upon release from horizontal position is:",
      solution: [
        "Torque about pivot: $\\tau = mg \\frac{L}{2} = I \\alpha = \\left( \\frac{1}{3} mL^2 \\right) \\alpha$.",
        "Angular acceleration $\\alpha = \\frac{3g}{2L}$.",
        "Tangential acceleration of tip: $a_t = \\alpha L = \\frac{3}{2} g$."
      ]
    },
    {
      questionNumber: 26,
      subject: "Chemistry",
      chapter: "Chemical Bonding",
      questionType: "SINGLE_CORRECT",
      difficulty: "EASY",
      status: "CORRECT",
      marksAwarded: 4,
      timeTakenSeconds: 25,
      benchmarkTimeSeconds: 45,
      attemptCategory: "PERFECT",
      studentAnswer: "Option A",
      correctAnswer: "Option A",
      statement: "The geometry of $\\text{XeF}_4$ according to VSEPR theory is:",
      solution: [
        "Xenon has 8 valence electrons. 4 bonding pairs + 2 lone pairs $\\implies sp^3d^2$ hybridization.",
        "The two lone pairs occupy trans axial positions, yielding square planar geometry."
      ]
    },
    {
      questionNumber: 27,
      subject: "Chemistry",
      chapter: "Coordination Compounds",
      questionType: "SINGLE_CORRECT",
      difficulty: "MODERATE",
      status: "CORRECT",
      marksAwarded: 4,
      timeTakenSeconds: 32,
      benchmarkTimeSeconds: 50,
      attemptCategory: "PERFECT",
      studentAnswer: "Option C",
      correctAnswer: "Option C",
      statement: "The spin-only magnetic moment of $[\\text{Fe}(\\text{CN})_6]^{3-}$ is:",
      solution: [
        "$\\text{Fe}^{3+}$ is $3d^5$. Strong field cyanide forces pairing: $t_{2g}^5 e_g^0$.",
        "Unpaired electron $n = 1 \\implies \\mu = \\sqrt{1(3)} = 1.73\\text{ BM}$."
      ]
    },
    {
      questionNumber: 28,
      subject: "Chemistry",
      chapter: "Aldehydes & Ketones",
      questionType: "SINGLE_CORRECT",
      difficulty: "EASY",
      status: "CORRECT",
      marksAwarded: 4,
      timeTakenSeconds: 28,
      benchmarkTimeSeconds: 50,
      attemptCategory: "PERFECT",
      studentAnswer: "Option A",
      correctAnswer: "Option A",
      statement: "Cannizzaro reaction is exhibited by which of the following compounds?",
      solution: [
        "Aldehydes lacking $\\alpha$-hydrogen atoms undergo Cannizzaro reaction. Benzaldehyde lacks $\\alpha$-H."
      ]
    },
    {
      questionNumber: 51,
      subject: "Mathematics",
      chapter: "Definite Integrals",
      questionType: "SINGLE_CORRECT",
      difficulty: "MODERATE",
      status: "CORRECT",
      marksAwarded: 4,
      timeTakenSeconds: 110,
      benchmarkTimeSeconds: 120,
      attemptCategory: "PERFECT",
      studentAnswer: "Option A",
      correctAnswer: "Option A",
      statement: "Evaluate $I = \\int_{0}^{\\pi/2} \\frac{\\sin^4 x}{\\sin^4 x + \\cos^4 x} dx$:",
      solution: [
        "Applying King's property $\\int_{a}^b f(x) dx = \\int_a^b f(a+b-x) dx$ with $a+b = \\pi/2$.",
        "$2I = \\int_0^{\\pi/2} 1 dx = \\frac{\\pi}{2} \\implies I = \\frac{\\pi}{4}$."
      ]
    },
    {
      questionNumber: 52,
      subject: "Mathematics",
      chapter: "Vectors & 3D Geometry",
      questionType: "SINGLE_CORRECT",
      difficulty: "TOUGH",
      status: "INCORRECT",
      marksAwarded: -1,
      timeTakenSeconds: 145,
      benchmarkTimeSeconds: 130,
      attemptCategory: "CONFUSED",
      studentAnswer: "Option C",
      correctAnswer: "Option A",
      mistakeType: "Misread Statement",
      statement: "The shortest distance between lines $\\vec{r}_1 = \\vec{a}_1 + \\lambda \\vec{b}_1$ and $\\vec{r}_2 = \\vec{a}_2 + \\mu \\vec{b}_2$ where $\\vec{b}_1 \\times \\vec{b}_2 = \\vec{0}$ is:",
      solution: [
        "When $\\vec{b}_1 \\times \\vec{b}_2 = \\vec{0}$, lines are parallel, not skew!",
        "Formula for parallel lines: $d = \\frac{|(\\vec{a}_2 - \\vec{a}_1) \\times \\vec{b}|}{|\\vec{b}|}$.",
        "Student used the skew lines formula $|(\\vec{a}_2 - \\vec{a}_1) \\cdot (\\vec{b}_1 \\times \\vec{b}_2)| / |\\vec{b}_1 \\times \\vec{b}_2|$ which divides by 0."
      ]
    },
    {
      questionNumber: 53,
      subject: "Mathematics",
      chapter: "Matrices & Determinants",
      questionType: "SINGLE_CORRECT",
      difficulty: "MODERATE",
      status: "CORRECT",
      marksAwarded: 4,
      timeTakenSeconds: 95,
      benchmarkTimeSeconds: 100,
      attemptCategory: "PERFECT",
      studentAnswer: "Option B",
      correctAnswer: "Option B",
      statement: "If $A$ is a $3 \\times 3$ matrix with $|A| = 4$, then $|\\text{adj}(2A)|$ equals:",
      solution: [
        "$|2A| = 2^3 |A| = 8 \\times 4 = 32$.",
        "$|\\text{adj}(B)| = |B|^{n-1} = (32)^{3-1} = 32^2 = 1024$."
      ]
    }
  ]
};

