// Central TypeScript Definitions for PrepIQ

export type ExamId = "jee-main" | "jee-adv" | "comedk" | "mht-cet" | "gate" | "neet";

export type QuestionType = "SINGLE_CORRECT" | "MULTIPLE_CORRECT" | "NUMERICAL" | "INTEGER";

export type QuestionDifficulty = "EASY" | "MEDIUM" | "HARD";

export type QuestionProvenance = 
  | "ORIGINAL_PYQ" 
  | "GENERATED_SIMILAR" 
  | "TOPIC_PRACTICE" 
  | "DOCUMENT_BASED";

export type VerificationStatus = "VERIFIED" | "NEEDS_REVIEW" | "UNVERIFIED";

export interface MarkingRule {
  positive: number;
  negative: number;
  partial?: boolean;
  decimalPlaces?: number;
}

export interface SectionConfig {
  id: string;
  name: string;
  questionType: QuestionType;
  totalQuestions: number;
  requiredQuestions?: number; // e.g. JEE Main section B: 5 out of 10
  marking: MarkingRule;
}

export interface SubjectConfig {
  id: string;
  name: string;
  code: string;
  color: string;
  sections: SectionConfig[];
}

export interface ExamConfiguration {
  id: ExamId;
  name: string;
  abbreviation: string;
  currentYear: number;
  conductingAuthority: string;
  durationMinutes: number;
  totalMarks: number;
  totalQuestions: number;
  subjects: SubjectConfig[];
  instructions: string[];
  allowsSectionSwitching: boolean;
  numericalTolerance?: number;
  isVerifiedPattern: boolean;
  availableYears: number[];
}

export interface Subject {
  id: string;
  examId: ExamId;
  name: string;
  slug: string;
  color: string;
  iconName: string;
}

export interface Chapter {
  id: string;
  subjectId: string;
  examId: ExamId;
  name: string;
  order: number;
  totalPYQs: number;
  averageWeightagePercent: number;
}

export interface Topic {
  id: string;
  chapterId: string;
  name: string;
  importance: "HIGH" | "MEDIUM" | "LOW";
}

export interface QuestionOption {
  id: string;
  index: number;
  label: string; // 'A', 'B', 'C', 'D'
  text: string;
  textLatex?: string;
  isCorrect?: boolean;
}

export interface QuestionItem {
  id: string;
  examId: ExamId;
  subjectId: string;
  chapterId: string;
  topicId: string;
  questionType: QuestionType;
  difficulty: QuestionDifficulty;
  statement: string;
  statementLatex?: string;
  options?: QuestionOption[];
  correctOption?: number; // 0-based index or letter
  correctOptions?: number[]; // For MSQ
  numericalAnswer?: number | string;
  numericalRange?: [number, number];
  stepByStepSolution: string[];
  explanationLatex?: string;
  provenance: QuestionProvenance;
  parentPyqId?: string;
  sourceDocumentId?: string;
  sourcePage?: number;
  year?: number;
  sessionOrShift?: string;
  sourcePaperName?: string;
  sourceReference?: string;
  answerKeyReference?: string;
  verificationStatus: VerificationStatus;
  bookmarked?: boolean;
  isDemonstrationSample?: boolean;
}

export interface Test {
  id: string;
  title: string;
  examId: ExamId;
  testType: "FULL_LENGTH" | "CHAPTER_WISE" | "PYQ_PAPER" | "CUSTOM_PRACTICE";
  durationMinutes: number;
  totalMarks: number;
  questions: QuestionItem[];
  subjectIds: string[];
  chapterIds?: string[];
  description: string;
  createdAt: string;
  isDefaultMock?: boolean;
}

export type QuestionState = 
  | "NOT_VISITED" 
  | "NOT_ANSWERED" 
  | "ANSWERED" 
  | "MARKED_FOR_REVIEW" 
  | "ANSWERED_AND_MARKED";

export interface QuestionResponse {
  questionId: string;
  state: QuestionState;
  selectedOption?: number;
  selectedOptions?: number[];
  numericalInput?: string;
  timeSpentSeconds: number;
  isCorrect?: boolean;
  scoreAwarded?: number;
}

export interface TestAttempt {
  id: string;
  testId: string;
  testTitle: string;
  examId: ExamId;
  startedAt: string;
  submittedAt: string;
  durationSeconds: number;
  totalQuestions: number;
  attemptedCount: number;
  correctCount: number;
  incorrectCount: number;
  unattemptedCount: number;
  markedForReviewCount: number;
  totalScore: number;
  maxScore: number;
  accuracyPercentage: number;
  responses: Record<string, QuestionResponse>;
  subjectWiseScore: Record<
    string,
    {
      subjectName: string;
      attempted: number;
      correct: number;
      incorrect: number;
      score: number;
      maxScore: number;
      accuracy: number;
    }
  >;
}

export type DocumentProcessingStatus = "UPLOADED" | "PROCESSING" | "COMPLETED" | "FAILED";

export interface ExtractedChapter {
  id: string;
  name: string;
  topicCount: number;
  keyConcepts: string[];
  estimatedQuestions: number;
}

export interface UploadedDocument {
  id: string;
  title: string;
  fileName: string;
  fileSize: string;
  fileSizeBytes: number;
  uploadedAt: string;
  status: DocumentProcessingStatus;
  processingProgress: number;
  examId: ExamId;
  subjectId: string;
  extractedChapters: ExtractedChapter[];
  sourceNotes?: string;
  isDemoSample?: boolean;
}

export interface ExamReference {
  id: string;
  title: string;
  examId: ExamId;
  year: number;
  sourceOrganization: string;
  sourceType: 
    | "OFFICIAL_NOTIFICATION" 
    | "OFFICIAL_SYLLABUS" 
    | "EXAM_PATTERN" 
    | "ANSWER_KEY" 
    | "OFFICIAL_BULLETIN" 
    | "PREVIOUS_PAPER";
  officialUrl: string;
  verifiedDate: string;
  subjectId?: string;
  chapterId?: string;
  description: string;
  isOfficial: boolean;
}

export interface FormulaCard {
  id: string;
  name: string;
  formulaLatex: string;
  explanation: string;
  variableDefinitions: { symbol: string; meaning: string }[];
  subjectId: string;
  chapterId: string;
  topicId: string;
  relatedQuestionIds: string[];
  isBookmarked?: boolean;
}

export interface BookmarkItem {
  id: string;
  questionId: string;
  question: QuestionItem;
  notebookId: string;
  savedAt: string;
  notes?: string;
}

export interface Notebook {
  id: string;
  title: string;
  description: string;
  color: string;
  itemCount: number;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "assistant";
  content: string;
  timestamp: string;
  suggestedPrompts?: string[];
  suggestedActions?: {
    label: string;
    route: string;
  }[];
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  targetExamId: ExamId;
  examYear: number;
  targetScore: number;
  preparationStage: "Beginner" | "Intermediate" | "Advanced" | "Revision";
  selectedSubjects: string[];
  joinedDate: string;
  dailyGoalQuestions: number;
  dailyCompletedQuestions: number;
}
