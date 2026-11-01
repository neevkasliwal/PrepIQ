import { ExamConfiguration } from "@/types";

export const EXAM_CONFIGURATIONS: Record<string, ExamConfiguration> = {
  "jee-main": {
    id: "jee-main",
    name: "JEE (Main) — Joint Entrance Examination",
    abbreviation: "JEE Main",
    currentYear: 2025,
    conductingAuthority: "National Testing Agency (NTA)",
    durationMinutes: 180,
    totalMarks: 300,
    totalQuestions: 90,
    allowsSectionSwitching: true,
    numericalTolerance: 0.05,
    isVerifiedPattern: true,
    availableYears: [2024, 2023, 2022, 2021, 2020],
    instructions: [
      "The examination consists of three subjects: Physics, Chemistry, and Mathematics.",
      "Each subject has two sections: Section A (20 Multiple Choice Questions) and Section B (10 Numerical Value Questions).",
      "In Section B, candidates must attempt any 5 questions out of 10.",
      "Section A marking scheme: +4 marks for correct response, -1 mark for incorrect response, 0 for unattempted.",
      "Section B marking scheme: +4 marks for correct response, -1 mark for incorrect response, 0 for unattempted.",
      "Candidates can navigate between questions and subjects freely using the question palette.",
      "Responses can be marked for review and can be edited anytime before final submission."
    ],
    subjects: [
      {
        id: "phy-jee",
        name: "Physics",
        code: "PHY",
        color: "#3b82f6",
        sections: [
          {
            id: "phy-sec-a",
            name: "Section A (MCQ)",
            questionType: "SINGLE_CORRECT",
            totalQuestions: 20,
            requiredQuestions: 20,
            marking: { positive: 4, negative: 1 }
          },
          {
            id: "phy-sec-b",
            name: "Section B (Numerical)",
            questionType: "NUMERICAL",
            totalQuestions: 10,
            requiredQuestions: 5,
            marking: { positive: 4, negative: 1, decimalPlaces: 2 }
          }
        ]
      },
      {
        id: "chem-jee",
        name: "Chemistry",
        code: "CHEM",
        color: "#10b981",
        sections: [
          {
            id: "chem-sec-a",
            name: "Section A (MCQ)",
            questionType: "SINGLE_CORRECT",
            totalQuestions: 20,
            requiredQuestions: 20,
            marking: { positive: 4, negative: 1 }
          },
          {
            id: "chem-sec-b",
            name: "Section B (Numerical)",
            questionType: "NUMERICAL",
            totalQuestions: 10,
            requiredQuestions: 5,
            marking: { positive: 4, negative: 1, decimalPlaces: 2 }
          }
        ]
      },
      {
        id: "math-jee",
        name: "Mathematics",
        code: "MATH",
        color: "#f59e0b",
        sections: [
          {
            id: "math-sec-a",
            name: "Section A (MCQ)",
            questionType: "SINGLE_CORRECT",
            totalQuestions: 20,
            requiredQuestions: 20,
            marking: { positive: 4, negative: 1 }
          },
          {
            id: "math-sec-b",
            name: "Section B (Numerical)",
            questionType: "NUMERICAL",
            totalQuestions: 10,
            requiredQuestions: 5,
            marking: { positive: 4, negative: 1, decimalPlaces: 2 }
          }
        ]
      }
    ]
  },
  "jee-adv": {
    id: "jee-adv",
    name: "JEE (Advanced)",
    abbreviation: "JEE Adv",
    currentYear: 2025,
    conductingAuthority: "Joint Admission Board (IITs)",
    durationMinutes: 180,
    totalMarks: 180,
    totalQuestions: 51,
    allowsSectionSwitching: true,
    isVerifiedPattern: true,
    availableYears: [2024, 2023, 2022, 2021],
    instructions: [
      "The paper is divided into three sections: Physics, Chemistry, and Mathematics.",
      "Each section contains multiple-choice questions with one or more correct options, numerical value questions, and match-list items.",
      "Partial marking applies to multiple-correct questions as specified in each section."
    ],
    subjects: [
      {
        id: "phy-adv",
        name: "Physics",
        code: "PHY",
        color: "#3b82f6",
        sections: [
          {
            id: "phy-adv-msq",
            name: "Section 1 (MSQ)",
            questionType: "MULTIPLE_CORRECT",
            totalQuestions: 6,
            marking: { positive: 4, negative: 2, partial: true }
          },
          {
            id: "phy-adv-num",
            name: "Section 2 (Non-Negative Integer)",
            questionType: "NUMERICAL",
            totalQuestions: 6,
            marking: { positive: 3, negative: 0 }
          }
        ]
      },
      {
        id: "chem-adv",
        name: "Chemistry",
        code: "CHEM",
        color: "#10b981",
        sections: [
          {
            id: "chem-adv-msq",
            name: "Section 1 (MSQ)",
            questionType: "MULTIPLE_CORRECT",
            totalQuestions: 6,
            marking: { positive: 4, negative: 2, partial: true }
          },
          {
            id: "chem-adv-num",
            name: "Section 2 (Non-Negative Integer)",
            questionType: "NUMERICAL",
            totalQuestions: 6,
            marking: { positive: 3, negative: 0 }
          }
        ]
      },
      {
        id: "math-adv",
        name: "Mathematics",
        code: "MATH",
        color: "#f59e0b",
        sections: [
          {
            id: "math-adv-msq",
            name: "Section 1 (MSQ)",
            questionType: "MULTIPLE_CORRECT",
            totalQuestions: 6,
            marking: { positive: 4, negative: 2, partial: true }
          },
          {
            id: "math-adv-num",
            name: "Section 2 (Non-Negative Integer)",
            questionType: "NUMERICAL",
            totalQuestions: 6,
            marking: { positive: 3, negative: 0 }
          }
        ]
      }
    ]
  },
  "comedk": {
    id: "comedk",
    name: "COMEDK UGET",
    abbreviation: "COMEDK",
    currentYear: 2025,
    conductingAuthority: "Consortium of Medical, Engineering and Dental Colleges of Karnataka",
    durationMinutes: 180,
    totalMarks: 180,
    totalQuestions: 180,
    allowsSectionSwitching: true,
    isVerifiedPattern: true,
    availableYears: [2024, 2023, 2022],
    instructions: [
      "Total 180 questions: 60 questions each in Physics, Chemistry, and Mathematics.",
      "All questions are Multiple Choice with a single correct option.",
      "Each correct answer earns +1 mark.",
      "There is NO negative marking in COMEDK UGET."
    ],
    subjects: [
      {
        id: "phy-comedk",
        name: "Physics",
        code: "PHY",
        color: "#3b82f6",
        sections: [
          {
            id: "phy-comedk-sec",
            name: "Physics Section",
            questionType: "SINGLE_CORRECT",
            totalQuestions: 60,
            marking: { positive: 1, negative: 0 }
          }
        ]
      },
      {
        id: "chem-comedk",
        name: "Chemistry",
        code: "CHEM",
        color: "#10b981",
        sections: [
          {
            id: "chem-comedk-sec",
            name: "Chemistry Section",
            questionType: "SINGLE_CORRECT",
            totalQuestions: 60,
            marking: { positive: 1, negative: 0 }
          }
        ]
      },
      {
        id: "math-comedk",
        name: "Mathematics",
        code: "MATH",
        color: "#f59e0b",
        sections: [
          {
            id: "math-comedk-sec",
            name: "Mathematics Section",
            questionType: "SINGLE_CORRECT",
            totalQuestions: 60,
            marking: { positive: 1, negative: 0 }
          }
        ]
      }
    ]
  },
  "mht-cet": {
    id: "mht-cet",
    name: "MHT-CET (PCM)",
    abbreviation: "MHT-CET",
    currentYear: 2025,
    conductingAuthority: "State Common Entrance Test Cell, Maharashtra",
    durationMinutes: 180,
    totalMarks: 200,
    totalQuestions: 150,
    allowsSectionSwitching: false,
    isVerifiedPattern: true,
    availableYears: [2024, 2023],
    instructions: [
      "Paper I consists of Mathematics (50 questions, 2 marks each = 100 marks) for 90 minutes.",
      "Paper II consists of Physics & Chemistry (100 questions, 1 mark each = 100 marks) for 90 minutes.",
      "There is NO negative marking in MHT-CET.",
      "Section 1 must be submitted before moving to Section 2."
    ],
    subjects: [
      {
        id: "math-mht",
        name: "Mathematics",
        code: "MATH",
        color: "#f59e0b",
        sections: [
          {
            id: "math-mht-sec",
            name: "Paper I (Mathematics)",
            questionType: "SINGLE_CORRECT",
            totalQuestions: 50,
            marking: { positive: 2, negative: 0 }
          }
        ]
      },
      {
        id: "phy-chem-mht",
        name: "Physics & Chemistry",
        code: "PHY-CHEM",
        color: "#3b82f6",
        sections: [
          {
            id: "phy-mht-sec",
            name: "Paper II (Physics & Chemistry)",
            questionType: "SINGLE_CORRECT",
            totalQuestions: 100,
            marking: { positive: 1, negative: 0 }
          }
        ]
      }
    ]
  },
  "gate": {
    id: "gate",
    name: "GATE — Computer Science & IT (CS)",
    abbreviation: "GATE CS",
    currentYear: 2026,
    conductingAuthority: "Indian Institute of Technology Guwahati (IITG)",
    durationMinutes: 180,
    totalMarks: 100,
    totalQuestions: 65,
    allowsSectionSwitching: true,
    isVerifiedPattern: true,
    availableYears: [2024, 2023, 2022],
    instructions: [
      "General Aptitude (GA): 10 questions carrying 15 marks.",
      "Subject Questions: 55 questions carrying 85 marks.",
      "Question types: Multiple Choice (MCQ), Multiple Select (MSQ), and Numerical Answer Type (NAT).",
      "For 1-mark MCQs: 1/3 mark negative. For 2-mark MCQs: 2/3 mark negative.",
      "There is NO negative marking for MSQ or NAT questions."
    ],
    subjects: [
      {
        id: "ga-gate",
        name: "General Aptitude",
        code: "GA",
        color: "#8b5cf6",
        sections: [
          {
            id: "ga-sec",
            name: "General Aptitude",
            questionType: "SINGLE_CORRECT",
            totalQuestions: 10,
            marking: { positive: 1.5, negative: 0.5 }
          }
        ]
      },
      {
        id: "cs-gate",
        name: "Computer Science Core",
        code: "CS",
        color: "#06b6d4",
        sections: [
          {
            id: "cs-sec",
            name: "Core Technical",
            questionType: "SINGLE_CORRECT",
            totalQuestions: 55,
            marking: { positive: 1.55, negative: 0.5 }
          }
        ]
      }
    ]
  },
  "neet": {
    id: "neet",
    name: "NEET (UG) — National Eligibility cum Entrance Test",
    abbreviation: "NEET UG",
    currentYear: 2025,
    conductingAuthority: "National Testing Agency (NTA)",
    durationMinutes: 200,
    totalMarks: 720,
    totalQuestions: 200,
    allowsSectionSwitching: true,
    isVerifiedPattern: true,
    availableYears: [2024, 2023, 2022],
    instructions: [
      "Physics (35+15), Chemistry (35+15), Botany (35+15), Zoology (35+15).",
      "In Section B of each subject, attempt any 10 questions out of 15.",
      "+4 marks for correct answer, -1 mark for incorrect answer."
    ],
    subjects: [
      {
        id: "phy-neet",
        name: "Physics",
        code: "PHY",
        color: "#3b82f6",
        sections: [
          {
            id: "phy-neet-a",
            name: "Section A",
            questionType: "SINGLE_CORRECT",
            totalQuestions: 35,
            marking: { positive: 4, negative: 1 }
          }
        ]
      },
      {
        id: "bio-neet",
        name: "Biology (Botany & Zoology)",
        code: "BIO",
        color: "#10b981",
        sections: [
          {
            id: "bio-neet-sec",
            name: "Section A",
            questionType: "SINGLE_CORRECT",
            totalQuestions: 70,
            marking: { positive: 4, negative: 1 }
          }
        ]
      }
    ]
  }
};

