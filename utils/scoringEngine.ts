import { ExamId } from "@/types";

export interface MarkingSchemeInfo {
  positive: number;
  negative: number;
  allowsNegative: boolean;
  label: string;
}

export function getExamMarking(examId: string, subjectId?: string): MarkingSchemeInfo {
  if (examId === "comedk") {
    return {
      positive: 1,
      negative: 0,
      allowsNegative: false,
      label: "+1 / 0 (No Negative Marking)"
    };
  }
  if (examId === "mht-cet") {
    if (subjectId?.toLowerCase().includes("math")) {
      return {
        positive: 2,
        negative: 0,
        allowsNegative: false,
        label: "+2 / 0 (Paper I Mathematics - No Neg)"
      };
    }
    return {
      positive: 1,
      negative: 0,
      allowsNegative: false,
      label: "+1 / 0 (Paper II Physics & Chemistry - No Neg)"
    };
  }
  if (examId === "jee-adv") {
    return {
      positive: 4,
      negative: 2,
      allowsNegative: true,
      label: "+4 / -2 (Multi-choice Advanced Pattern)"
    };
  }
  if (examId === "gate") {
    return {
      positive: 1.5,
      negative: 0.5,
      allowsNegative: true,
      label: "+1.5 / -0.5 (Standard 1 & 2 Mark Scheme)"
    };
  }
  // JEE Main & NEET
  return {
    positive: 4,
    negative: 1,
    allowsNegative: true,
    label: "+4 / -1 (NTA Standard Marking)"
  };
}

