"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  UserProfile,
  ExamId,
  UploadedDocument,
  QuestionItem,
  Test,
  TestAttempt,
  FormulaCard,
  Notebook,
  BookmarkItem,
  ChatMessage,
  QuestionResponse,
  ExamConfiguration
} from "@/types";

import { DEFAULT_DEMO_USER } from "@/mocks/users";
import { EXAM_CONFIGURATIONS } from "@/mocks/examConfigurations";
import { MOCK_DOCUMENTS } from "@/mocks/documents";
import { MOCK_PYQS } from "@/mocks/pyqs";
import { MOCK_GENERATED_QUESTIONS } from "@/mocks/questions";
import { MOCK_TESTS } from "@/mocks/tests";
import { MOCK_TEST_ATTEMPTS } from "@/mocks/testAttempts";
import { MOCK_FORMULA_CARDS } from "@/mocks/formulaCards";
import { MOCK_NOTEBOOKS, MOCK_BOOKMARKS } from "@/mocks/notebooks";
import { INITIAL_CHAT_MESSAGES, CONTEXTUAL_RESPONSES } from "@/mocks/chatMessages";

interface AppState {
  // Demo Mode
  isDemoMode: boolean;
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;

  // User & Exam Context
  currentUser: UserProfile;
  selectedExamId: ExamId;
  setUser: (user: Partial<UserProfile>) => void;
  setSelectedExam: (examId: ExamId) => void;

  // Documents
  documents: UploadedDocument[];
  addDocument: (doc: UploadedDocument) => void;
  updateDocumentStatus: (id: string, status: UploadedDocument["status"], progress?: number) => void;
  deleteDocument: (id: string) => void;

  // Questions & PYQs
  pyqs: QuestionItem[];
  generatedQuestions: QuestionItem[];
  toggleQuestionBookmark: (questionId: string) => void;
  addGeneratedQuestion: (question: QuestionItem) => void;

  // Tests & Attempts
  tests: Test[];
  testAttempts: TestAttempt[];
  addTest: (test: Test) => void;
  saveTestAttempt: (attempt: TestAttempt) => void;

  // Bookmarks & Notebooks
  notebooks: Notebook[];
  bookmarks: BookmarkItem[];
  addBookmark: (question: QuestionItem, notebookId: string, notes?: string) => void;
  removeBookmark: (bookmarkId: string) => void;
  createNotebook: (title: string, description: string, color: string) => void;

  // Formula Cards
  formulaCards: FormulaCard[];
  toggleFormulaBookmark: (id: string) => void;

  // AI Mentor
  chatMessages: ChatMessage[];
  isChatTyping: boolean;
  sendChatMessage: (content: string) => void;
  clearChat: () => void;

  // System Demo Reset
  resetDemoData: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      isDemoMode: true,
      theme: "light",
      setTheme: (theme) => set({ theme }),

      currentUser: DEFAULT_DEMO_USER,
      selectedExamId: "jee-main",

      setUser: (updates) =>
        set((state) => ({
          currentUser: { ...state.currentUser, ...updates },
        })),

      setSelectedExam: (examId) =>
        set((state) => ({
          selectedExamId: examId,
          currentUser: { ...state.currentUser, targetExamId: examId },
        })),

      documents: MOCK_DOCUMENTS,
      addDocument: (doc) =>
        set((state) => ({
          documents: [doc, ...state.documents],
        })),

      updateDocumentStatus: (id, status, progress = 100) =>
        set((state) => ({
          documents: state.documents.map((d) =>
            d.id === id ? { ...d, status, processingProgress: progress } : d
          ),
        })),

      deleteDocument: (id) =>
        set((state) => ({
          documents: state.documents.filter((d) => d.id !== id),
        })),

      pyqs: MOCK_PYQS,
      generatedQuestions: MOCK_GENERATED_QUESTIONS,

      toggleQuestionBookmark: (questionId) => {
        const state = get();
        const existing = state.bookmarks.find((b) => b.questionId === questionId);
        if (existing) {
          state.removeBookmark(existing.id);
        } else {
          const q =
            state.pyqs.find((item) => item.id === questionId) ||
            state.generatedQuestions.find((item) => item.id === questionId);
          if (q) {
            state.addBookmark(q, state.notebooks[0]?.id || "nb-phy-pyqs");
          }
        }
      },

      addGeneratedQuestion: (question) =>
        set((state) => ({
          generatedQuestions: [question, ...state.generatedQuestions],
        })),

      tests: MOCK_TESTS,
      testAttempts: MOCK_TEST_ATTEMPTS,

      addTest: (test) =>
        set((state) => ({
          tests: [test, ...state.tests],
        })),

      saveTestAttempt: (attempt) =>
        set((state) => ({
          testAttempts: [attempt, ...state.testAttempts],
          currentUser: {
            ...state.currentUser,
            dailyCompletedQuestions:
              state.currentUser.dailyCompletedQuestions + attempt.attemptedCount,
          },
        })),

      notebooks: MOCK_NOTEBOOKS,
      bookmarks: MOCK_BOOKMARKS,

      addBookmark: (question, notebookId, notes) =>
        set((state) => {
          const newBookmark: BookmarkItem = {
            id: `bm-${Date.now()}`,
            questionId: question.id,
            question,
            notebookId,
            savedAt: new Date().toISOString(),
            notes,
          };
          const updatedNotebooks = state.notebooks.map((nb) =>
            nb.id === notebookId ? { ...nb, itemCount: nb.itemCount + 1 } : nb
          );
          const updatedPyqs = state.pyqs.map((q) =>
            q.id === question.id ? { ...q, bookmarked: true } : q
          );
          return {
            bookmarks: [newBookmark, ...state.bookmarks],
            notebooks: updatedNotebooks,
            pyqs: updatedPyqs,
          };
        }),

      removeBookmark: (bookmarkId) =>
        set((state) => {
          const target = state.bookmarks.find((b) => b.id === bookmarkId);
          if (!target) return state;

          const updatedNotebooks = state.notebooks.map((nb) =>
            nb.id === target.notebookId ? { ...nb, itemCount: Math.max(0, nb.itemCount - 1) } : nb
          );
          const updatedPyqs = state.pyqs.map((q) =>
            q.id === target.questionId ? { ...q, bookmarked: false } : q
          );

          return {
            bookmarks: state.bookmarks.filter((b) => b.id !== bookmarkId),
            notebooks: updatedNotebooks,
            pyqs: updatedPyqs,
          };
        }),

      createNotebook: (title, description, color) =>
        set((state) => ({
          notebooks: [
            ...state.notebooks,
            {
              id: `nb-${Date.now()}`,
              title,
              description,
              color,
              itemCount: 0,
              createdAt: new Date().toISOString(),
            },
          ],
        })),

      formulaCards: MOCK_FORMULA_CARDS,
      toggleFormulaBookmark: (id) =>
        set((state) => ({
          formulaCards: state.formulaCards.map((fc) =>
            fc.id === id ? { ...fc, isBookmarked: !fc.isBookmarked } : fc
          ),
        })),

      chatMessages: INITIAL_CHAT_MESSAGES,
      isChatTyping: false,

      sendChatMessage: (content) => {
        const userMsg: ChatMessage = {
          id: `msg-${Date.now()}`,
          sender: "user",
          content,
          timestamp: "Just now",
        };

        set((state) => ({
          chatMessages: [...state.chatMessages, userMsg],
          isChatTyping: true,
        }));

        // Contextual AI Mentor simulation
        setTimeout(() => {
          const lower = content.toLowerCase();
          let matchKey = Object.keys(CONTEXTUAL_RESPONSES).find((key) =>
            lower.includes(key.toLowerCase())
          );

          let replyContent = "";
          let actions: { label: string; route: string }[] | undefined = undefined;

          if (matchKey && CONTEXTUAL_RESPONSES[matchKey]) {
            replyContent = CONTEXTUAL_RESPONSES[matchKey].content;
            actions = CONTEXTUAL_RESPONSES[matchKey].actions;
          } else if (lower.includes("weak") || lower.includes("improve") || lower.includes("mistake")) {
            replyContent = CONTEXTUAL_RESPONSES["find my weakest chapters"].content;
            actions = CONTEXTUAL_RESPONSES["find my weakest chapters"].actions;
          } else if (lower.includes("test") || lower.includes("score") || lower.includes("result")) {
            replyContent = CONTEXTUAL_RESPONSES["analyse my last three tests"].content;
            actions = CONTEXTUAL_RESPONSES["analyse my last three tests"].actions;
          } else {
            replyContent = `Thank you for your question, Aarav. In your active **JEE Main 2025** target, I recommend reinforcing high-weightage chapters (**Vectors & 3D Geometry**, **Laws of Motion**, and **Carbonyl Compounds**).\n\nYou can explore verified PYQs or launch a targeted CBT mock test anytime to sharpen your exam temperament.`;
            actions = [
              { label: "Explore PYQs", route: "/pyqs" },
              { label: "Attempt CBT Mock", route: "/tests" }
            ];
          }

          const botMsg: ChatMessage = {
            id: `msg-${Date.now() + 1}`,
            sender: "assistant",
            content: replyContent,
            timestamp: "Just now",
            suggestedActions: actions,
          };

          set((state) => ({
            chatMessages: [...state.chatMessages, botMsg],
            isChatTyping: false,
          }));
        }, 600);
      },

      clearChat: () =>
        set({
          chatMessages: INITIAL_CHAT_MESSAGES,
        }),

      resetDemoData: () => {
        set({
          currentUser: DEFAULT_DEMO_USER,
          selectedExamId: "jee-main",
          documents: MOCK_DOCUMENTS,
          pyqs: MOCK_PYQS,
          generatedQuestions: MOCK_GENERATED_QUESTIONS,
          tests: MOCK_TESTS,
          testAttempts: MOCK_TEST_ATTEMPTS,
          notebooks: MOCK_NOTEBOOKS,
          bookmarks: MOCK_BOOKMARKS,
          formulaCards: MOCK_FORMULA_CARDS,
          chatMessages: INITIAL_CHAT_MESSAGES,
          isChatTyping: false,
        });
      },
    }),
    {
      name: "prepiq_storage_v1",
      partialize: (state) => ({
        currentUser: state.currentUser,
        selectedExamId: state.selectedExamId,
        documents: state.documents,
        testAttempts: state.testAttempts,
        tests: state.tests,
        bookmarks: state.bookmarks,
        notebooks: state.notebooks,
        formulaCards: state.formulaCards,
        theme: state.theme,
      }),
    }
  )
);

