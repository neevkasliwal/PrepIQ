import { ExamReference } from "@/types";

export const MOCK_REFERENCES: ExamReference[] = [
  {
    id: "ref-nta-jee-bulletin-2025",
    title: "NTA JEE (Main) 2025 Official Information Bulletin & Pattern Guidelines",
    examId: "jee-main",
    year: 2025,
    sourceOrganization: "National Testing Agency (NTA)",
    sourceType: "OFFICIAL_BULLETIN",
    officialUrl: "https://nta.ac.in/",
    verifiedDate: "2024-10-15",
    subjectId: "sub-phy",
    description: "Official information bulletin detailing the 300-mark paper structure, Section A and Section B rules, negative marking guidelines, and examination schedules.",
    isOfficial: true
  },
  {
    id: "ref-nta-jee-syllabus-2025",
    title: "NTA Rationalised Syllabus for JEE Main (Physics, Chemistry & Mathematics)",
    examId: "jee-main",
    year: 2025,
    sourceOrganization: "National Testing Agency (NTA)",
    sourceType: "OFFICIAL_SYLLABUS",
    officialUrl: "https://jeemain.nta.nic.in/",
    verifiedDate: "2024-10-12",
    description: "Complete chapter-by-chapter and topic-by-topic scope of examination, highlighting reduced curriculum segments and core conceptual boundaries.",
    isOfficial: true
  },
  {
    id: "ref-jee-adv-syllabus-2025",
    title: "JEE (Advanced) 2025 Comprehensive Information Brochure & Syllabi",
    examId: "jee-adv",
    year: 2025,
    sourceOrganization: "Joint Admission Board (IITs)",
    sourceType: "OFFICIAL_SYLLABUS",
    officialUrl: "https://jeeadv.ac.in/",
    verifiedDate: "2024-09-30",
    description: "Detailed syllabus for Paper 1 and Paper 2 with marking conventions, multi-correct partial marking rules, and numerical entry formats.",
    isOfficial: true
  },
  {
    id: "ref-comedk-brochure-2025",
    title: "COMEDK UGET 2025 Candidate Information Brochure",
    examId: "comedk",
    year: 2025,
    sourceOrganization: "Consortium of Medical, Engineering and Dental Colleges of Karnataka",
    sourceType: "OFFICIAL_NOTIFICATION",
    officialUrl: "https://www.comedk.org/",
    verifiedDate: "2024-10-01",
    description: "Prescribed 180-question format without negative marking, eligibility, and Karnataka private collegiate seat distribution framework.",
    isOfficial: true
  },
  {
    id: "ref-mht-cet-pattern-2025",
    title: "MHT-CET (PCM) 2025 Examination Pattern and Marking Scheme",
    examId: "mht-cet",
    year: 2025,
    sourceOrganization: "State Common Entrance Test Cell, Maharashtra",
    sourceType: "EXAM_PATTERN",
    officialUrl: "https://cetcell.mahacet.org/",
    verifiedDate: "2024-09-20",
    description: "Official notifications detailing Paper I (Mathematics 2 marks/Q) and Paper II (Physics & Chemistry 1 mark/Q) timed section mechanics.",
    isOfficial: true
  },
  {
    id: "ref-gate-2026-brochure",
    title: "GATE 2026 Official Organizing Institute Notification & CS/IT Syllabus",
    examId: "gate",
    year: 2026,
    sourceOrganization: "Indian Institute of Technology Guwahati (IITG)",
    sourceType: "OFFICIAL_BULLETIN",
    officialUrl: "https://gate2026.iitg.ac.in/",
    verifiedDate: "2024-08-25",
    description: "Comprehensive information for computer science engineering aspirants, including NAT, MSQ, and MCQ evaluation models and sectional weightages.",
    isOfficial: true
  }
];

