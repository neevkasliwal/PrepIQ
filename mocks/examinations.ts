import { ExamId } from "@/types";

export interface ExamMetadata {
  id: ExamId;
  name: string;
  shortName: string;
  tagline: string;
  conductingBody: string;
  level: "National" | "State";
  totalQuestionsDemo: number;
  availableYearsCount: number;
  popularSubjects: string[];
  bannerGradient: string;
}

export const EXAMINATIONS_LIST: ExamMetadata[] = [
  {
    id: "jee-main",
    name: "JEE (Main)",
    shortName: "JEE Main",
    tagline: "Premier undergraduate engineering entrance for NITs, IIITs & CFTIs",
    conductingBody: "National Testing Agency (NTA)",
    level: "National",
    totalQuestionsDemo: 180,
    availableYearsCount: 5,
    popularSubjects: ["Physics", "Chemistry", "Mathematics"],
    bannerGradient: "from-blue-600 to-indigo-700"
  },
  {
    id: "jee-adv",
    name: "JEE (Advanced)",
    shortName: "JEE Adv",
    tagline: "Elite engineering examination for admission into 23 Indian Institutes of Technology",
    conductingBody: "Joint Admission Board / IITs",
    level: "National",
    totalQuestionsDemo: 90,
    availableYearsCount: 4,
    popularSubjects: ["Physics", "Chemistry", "Mathematics"],
    bannerGradient: "from-indigo-700 to-purple-800"
  },
  {
    id: "comedk",
    name: "COMEDK UGET",
    shortName: "COMEDK",
    tagline: "Karnataka state private engineering colleges entrance exam",
    conductingBody: "Consortium of Medical, Engineering and Dental Colleges of Karnataka",
    level: "State",
    totalQuestionsDemo: 120,
    availableYearsCount: 3,
    popularSubjects: ["Physics", "Chemistry", "Mathematics"],
    bannerGradient: "from-emerald-600 to-teal-700"
  },
  {
    id: "mht-cet",
    name: "MHT-CET (PCM)",
    shortName: "MHT-CET",
    tagline: "Maharashtra state common entrance test for engineering institutes",
    conductingBody: "State CET Cell Maharashtra",
    level: "State",
    totalQuestionsDemo: 100,
    availableYearsCount: 2,
    popularSubjects: ["Mathematics", "Physics", "Chemistry"],
    bannerGradient: "from-amber-600 to-orange-700"
  },
  {
    id: "gate",
    name: "GATE (CS & IT)",
    shortName: "GATE CS",
    tagline: "Graduate Aptitude Test in Engineering for M.Tech & PSU recruitments",
    conductingBody: "IIT Guwahati (2026 Organizing Institute)",
    level: "National",
    totalQuestionsDemo: 75,
    availableYearsCount: 3,
    popularSubjects: ["Data Structures", "Algorithms", "Operating Systems", "Aptitude"],
    bannerGradient: "from-cyan-700 to-blue-800"
  },
  {
    id: "neet",
    name: "NEET (UG)",
    shortName: "NEET UG",
    tagline: "Unified national entrance for MBBS, BDS and allied medical admissions",
    conductingBody: "National Testing Agency (NTA)",
    level: "National",
    totalQuestionsDemo: 110,
    availableYearsCount: 3,
    popularSubjects: ["Physics", "Chemistry", "Biology"],
    bannerGradient: "from-rose-600 to-pink-700"
  }
];

