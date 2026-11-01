import { mockFetch } from "./apiClient";
import {
  UserProfile,
  ExamConfiguration,
  QuestionItem,
  Test,
  TestAttempt,
  UploadedDocument,
  ExamReference,
  FormulaCard,
  Notebook,
  BookmarkItem,
  ExamId
} from "@/types";

import { DEFAULT_DEMO_USER } from "@/mocks/users";
import { EXAM_CONFIGURATIONS } from "@/mocks/examConfigurations";
import { EXAMINATIONS_LIST } from "@/mocks/examinations";
import { SUBJECTS } from "@/mocks/subjects";
import { CHAPTERS } from "@/mocks/chapters";
import { TOPICS } from "@/mocks/topics";
import { MOCK_PYQS } from "@/mocks/pyqs";
import { MOCK_GENERATED_QUESTIONS } from "@/mocks/questions";
import { MOCK_DOCUMENTS } from "@/mocks/documents";
import { MOCK_TESTS } from "@/mocks/tests";
import { MOCK_TEST_ATTEMPTS } from "@/mocks/testAttempts";
import { MOCK_REFERENCES } from "@/mocks/references";
import { MOCK_FORMULA_CARDS } from "@/mocks/formulaCards";
import { MOCK_NOTEBOOKS, MOCK_BOOKMARKS } from "@/mocks/notebooks";

// 1. Auth Service
export const authService = {
  getCurrentUser: async (): Promise<UserProfile> => {
    return mockFetch<UserProfile>("/auth/me", { mockFallback: () => DEFAULT_DEMO_USER });
  },
  login: async (email: string, password?: string): Promise<UserProfile> => {
    return mockFetch<UserProfile>("/auth/login", {
      method: "POST",
      body: { email, password },
      mockFallback: () => ({ ...DEFAULT_DEMO_USER, email })
    });
  },
  updateProfile: async (updates: Partial<UserProfile>): Promise<UserProfile> => {
    return mockFetch<UserProfile>("/auth/profile", {
      method: "PATCH",
      body: updates,
      mockFallback: () => ({ ...DEFAULT_DEMO_USER, ...updates })
    });
  }
};

// 2. Exam Service
export const examService = {
  getExams: async () => {
    return mockFetch("/exams", { mockFallback: () => EXAMINATIONS_LIST });
  },
  getConfiguration: async (examId: ExamId): Promise<ExamConfiguration> => {
    return mockFetch<ExamConfiguration>(`/exams/${examId}/config`, {
      mockFallback: () => EXAM_CONFIGURATIONS[examId] || EXAM_CONFIGURATIONS["jee-main"]
    });
  },
  getSubjects: async (examId: ExamId) => {
    return mockFetch(`/exams/${examId}/subjects`, {
      mockFallback: () => SUBJECTS.filter((s) => s.examId === examId || (examId === "jee-adv" && s.examId === "jee-main"))
    });
  },
  getChapters: async (subjectId?: string, examId?: ExamId) => {
    return mockFetch("/chapters", {
      mockFallback: () =>
        CHAPTERS.filter((c) => {
          if (subjectId && c.subjectId !== subjectId) return false;
          if (examId && c.examId !== examId) return false;
          return true;
        })
    });
  },
  getTopics: async (chapterId?: string) => {
    return mockFetch("/topics", {
      mockFallback: () => (chapterId ? TOPICS.filter((t) => t.chapterId === chapterId) : TOPICS)
    });
  }
};

// 3. PYQ Service
export const pyqService = {
  getQuestions: async (filters?: {
    examId?: ExamId;
    year?: number;
    subjectId?: string;
    chapterId?: string;
    difficulty?: string;
    search?: string;
  }): Promise<QuestionItem[]> => {
    return mockFetch<QuestionItem[]>("/pyqs", {
      mockFallback: () => {
        let list = [...MOCK_PYQS];
        if (filters?.examId) list = list.filter((q) => q.examId === filters.examId);
        if (filters?.year) list = list.filter((q) => q.year === filters.year);
        if (filters?.subjectId) list = list.filter((q) => q.subjectId === filters.subjectId);
        if (filters?.chapterId) list = list.filter((q) => q.chapterId === filters.chapterId);
        if (filters?.difficulty) list = list.filter((q) => q.difficulty === filters.difficulty);
        if (filters?.search) {
          const s = filters.search.toLowerCase();
          list = list.filter((q) => q.statement.toLowerCase().includes(s));
        }
        return list;
      }
    });
  },
  getQuestionById: async (id: string): Promise<QuestionItem | undefined> => {
    return mockFetch(`/pyqs/${id}`, {
      mockFallback: () => MOCK_PYQS.find((q) => q.id === id)
    });
  }
};

// 4. Question Generation Service
export const questionService = {
  generateQuestions: async (config: {
    examId: ExamId;
    subjectId: string;
    chapterId?: string;
    topicId?: string;
    sourceDocumentId?: string;
    parentPyqId?: string;
    count: number;
    difficulty: string;
  }): Promise<QuestionItem[]> => {
    return mockFetch<QuestionItem[]>("/questions/generate", {
      method: "POST",
      body: config,
      mockFallback: () => {
        // Return appropriate mock generated questions or variations
        if (config.parentPyqId) {
          const variation = MOCK_GENERATED_QUESTIONS.filter((q) => q.parentPyqId === config.parentPyqId);
          return variation.length > 0 ? variation : [MOCK_GENERATED_QUESTIONS[0]];
        }
        if (config.sourceDocumentId) {
          const docQuestions = MOCK_GENERATED_QUESTIONS.filter((q) => q.sourceDocumentId === config.sourceDocumentId);
          return docQuestions.length > 0 ? docQuestions : [MOCK_GENERATED_QUESTIONS[2]];
        }
        return MOCK_GENERATED_QUESTIONS.slice(0, config.count || 3);
      }
    });
  }
};

// 5. Document Service
export const documentService = {
  getAll: async (): Promise<UploadedDocument[]> => {
    return mockFetch<UploadedDocument[]>("/documents", { mockFallback: () => MOCK_DOCUMENTS });
  },
  upload: async (file: { name: string; size: number }, examId: ExamId, subjectId: string): Promise<UploadedDocument> => {
    return mockFetch<UploadedDocument>("/documents/upload", {
      method: "POST",
      mockFallback: () => ({
        id: `doc-${Date.now()}`,
        title: file.name.replace(/\.[^/.]+$/, ""),
        fileName: file.name,
        fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        fileSizeBytes: file.size,
        uploadedAt: new Date().toISOString(),
        status: "COMPLETED",
        processingProgress: 100,
        examId,
        subjectId,
        extractedChapters: [
          {
            id: "chap-lom",
            name: "Newton's Laws of Motion & Friction",
            topicCount: 4,
            keyConcepts: ["Constraint Relations", "Limiting Friction"],
            estimatedQuestions: 25
          }
        ],
        sourceNotes: "Uploaded student resource (demo processing)",
        isDemoSample: false
      })
    });
  }
};

// 6. Test & Attempt Service
export const testService = {
  getTests: async (examId?: ExamId): Promise<Test[]> => {
    return mockFetch<Test[]>("/tests", {
      mockFallback: () => (examId ? MOCK_TESTS.filter((t) => t.examId === examId) : MOCK_TESTS)
    });
  },
  getTestById: async (testId: string): Promise<Test | undefined> => {
    return mockFetch<Test | undefined>(`/tests/${testId}`, {
      mockFallback: () => MOCK_TESTS.find((t) => t.id === testId)
    });
  }
};

export const attemptService = {
  getAttempts: async (): Promise<TestAttempt[]> => {
    return mockFetch<TestAttempt[]>("/attempts", { mockFallback: () => MOCK_TEST_ATTEMPTS });
  },
  getAttemptById: async (id: string): Promise<TestAttempt | undefined> => {
    return mockFetch<TestAttempt | undefined>(`/attempts/${id}`, {
      mockFallback: () => MOCK_TEST_ATTEMPTS.find((a) => a.id === id)
    });
  }
};

// 7. References Service
export const referenceService = {
  getAll: async (examId?: ExamId): Promise<ExamReference[]> => {
    return mockFetch<ExamReference[]>("/references", {
      mockFallback: () => (examId ? MOCK_REFERENCES.filter((r) => r.examId === examId) : MOCK_REFERENCES)
    });
  }
};

// 8. Formula Cards Service
export const formulaService = {
  getAll: async (subjectId?: string): Promise<FormulaCard[]> => {
    return mockFetch<FormulaCard[]>("/formulas", {
      mockFallback: () => (subjectId ? MOCK_FORMULA_CARDS.filter((f) => f.subjectId === subjectId) : MOCK_FORMULA_CARDS)
    });
  }
};

