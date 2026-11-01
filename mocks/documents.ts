import { UploadedDocument } from "@/types";

export const MOCK_DOCUMENTS: UploadedDocument[] = [
  {
    id: "doc-hcv-mech-1",
    title: "HC Verma — Concepts of Physics (Vol 1: Mechanics)",
    fileName: "Concepts_of_Physics_Vol1_Mechanics.pdf",
    fileSize: "14.2 MB",
    fileSizeBytes: 14889728,
    uploadedAt: "2024-10-18T14:30:00Z",
    status: "COMPLETED",
    processingProgress: 100,
    examId: "jee-main",
    subjectId: "sub-phy",
    extractedChapters: [
      {
        id: "chap-lom",
        name: "Newton's Laws of Motion & Friction",
        topicCount: 6,
        keyConcepts: ["Free Body Diagrams", "Frictional Force & Angle of Repose", "Pseudo Forces in Non-inertial Frames"],
        estimatedQuestions: 45
      },
      {
        id: "chap-wep",
        name: "Work, Energy and Power",
        topicCount: 5,
        keyConcepts: ["Conservative vs Non-conservative forces", "Work-Kinetic Energy Theorem", "Potential Energy Curves"],
        estimatedQuestions: 38
      },
      {
        id: "chap-rot",
        name: "Rotational Dynamics & Center of Mass",
        topicCount: 7,
        keyConcepts: ["Moment of Inertia Theorems", "Torque and Angular Momentum Conservation", "Rolling without Slipping"],
        estimatedQuestions: 52
      }
    ],
    sourceNotes: "Standard reference text for JEE Main/Advanced Mechanics preparation.",
    isDemoSample: true
  },
  {
    id: "doc-ncert-chem-12",
    title: "NCERT Chemistry Class 12 — Organic Chemistry Part 2",
    fileName: "NCERT_Class12_Chemistry_Part2.pdf",
    fileSize: "18.6 MB",
    fileSizeBytes: 19503513,
    uploadedAt: "2024-10-22T09:15:00Z",
    status: "COMPLETED",
    processingProgress: 100,
    examId: "jee-main",
    subjectId: "sub-chem",
    extractedChapters: [
      {
        id: "chap-carbonyl",
        name: "Aldehydes, Ketones and Carboxylic Acids",
        topicCount: 8,
        keyConcepts: ["Nucleophilic Addition Mechanisms", "Aldol & Cannizzaro Condensation", "Hell-Volhard-Zelinsky Reaction"],
        estimatedQuestions: 60
      },
      {
        id: "chap-coord",
        name: "Coordination Compounds",
        topicCount: 6,
        keyConcepts: ["Werner's Coordination Theory", "Crystal Field Theory (CFT)", "Isomerism in Coordination Polyhedra"],
        estimatedQuestions: 48
      }
    ],
    sourceNotes: "Official NCERT prescribed syllabus text for national board & entrance examinations.",
    isDemoSample: true
  },
  {
    id: "doc-cengage-calc",
    title: "Cengage Mathematics — Differential & Integral Calculus",
    fileName: "Cengage_Calculus_G_Tewani.pdf",
    fileSize: "22.4 MB",
    fileSizeBytes: 23488102,
    uploadedAt: "2024-10-25T16:45:00Z",
    status: "COMPLETED",
    processingProgress: 100,
    examId: "jee-main",
    subjectId: "sub-math",
    extractedChapters: [
      {
        id: "chap-limits",
        name: "Limits, Continuity & Differentiability",
        topicCount: 7,
        keyConcepts: ["L'Hopital's Rule", "Intermediate Value Theorem", "Differentiability at non-smooth points"],
        estimatedQuestions: 55
      },
      {
        id: "chap-defint",
        name: "Definite Integrals & Properties",
        topicCount: 9,
        keyConcepts: ["King & Queen Integral Properties", "Leibnitz Rule of Differentiation", "Reduction Formulae"],
        estimatedQuestions: 65
      }
    ],
    sourceNotes: "Advanced problem-solving manual for JEE Main & Advanced mathematics.",
    isDemoSample: true
  }
];

