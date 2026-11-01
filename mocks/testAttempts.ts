import { TestAttempt } from "@/types";

export const MOCK_TEST_ATTEMPTS: TestAttempt[] = [
  {
    id: "attempt-demo-01",
    testId: "test-jee-full-01",
    testTitle: "JEE Main 2025 All-India Grand Mock Test 01",
    examId: "jee-main",
    startedAt: "2024-10-26T09:00:00Z",
    submittedAt: "2024-10-26T11:45:30Z",
    durationSeconds: 9930,
    totalQuestions: 12,
    attemptedCount: 11,
    correctCount: 9,
    incorrectCount: 2,
    unattemptedCount: 1,
    markedForReviewCount: 1,
    totalScore: 34,
    maxScore: 48,
    accuracyPercentage: 81.8,
    subjectWiseScore: {
      Physics: {
        subjectName: "Physics",
        attempted: 5,
        correct: 4,
        incorrect: 1,
        score: 15,
        maxScore: 24,
        accuracy: 80.0
      },
      Chemistry: {
        subjectName: "Chemistry",
        attempted: 3,
        correct: 3,
        incorrect: 0,
        score: 12,
        maxScore: 12,
        accuracy: 100.0
      },
      Mathematics: {
        subjectName: "Mathematics",
        attempted: 3,
        correct: 2,
        incorrect: 1,
        score: 7,
        maxScore: 12,
        accuracy: 66.7
      }
    },
    responses: {
      "pyq-jee-2024-phy-01": {
        questionId: "pyq-jee-2024-phy-01",
        state: "ANSWERED",
        selectedOption: 0,
        timeSpentSeconds: 145,
        isCorrect: true,
        scoreAwarded: 4
      },
      "pyq-jee-2024-phy-02": {
        questionId: "pyq-jee-2024-phy-02",
        state: "ANSWERED",
        selectedOption: 0,
        timeSpentSeconds: 110,
        isCorrect: true,
        scoreAwarded: 4
      },
      "pyq-jee-2024-phy-03": {
        questionId: "pyq-jee-2024-phy-03",
        state: "ANSWERED",
        numericalInput: "18",
        timeSpentSeconds: 260,
        isCorrect: true,
        scoreAwarded: 4
      },
      "gen-phy-lom-var-01": {
        questionId: "gen-phy-lom-var-01",
        state: "ANSWERED",
        selectedOption: 0,
        timeSpentSeconds: 95,
        isCorrect: true,
        scoreAwarded: 4
      },
      "gen-doc-hcv-lom-01": {
        questionId: "gen-doc-hcv-lom-01",
        state: "ANSWERED",
        selectedOption: 1, // Chosen B instead of D
        timeSpentSeconds: 190,
        isCorrect: false,
        scoreAwarded: -1
      },
      "gen-top-elec-01": {
        questionId: "gen-top-elec-01",
        state: "NOT_ANSWERED",
        timeSpentSeconds: 40,
        isCorrect: false,
        scoreAwarded: 0
      },
      "pyq-jee-2024-chem-01": {
        questionId: "pyq-jee-2024-chem-01",
        state: "ANSWERED",
        selectedOption: 3,
        timeSpentSeconds: 70,
        isCorrect: true,
        scoreAwarded: 4
      },
      "pyq-jee-2024-chem-02": {
        questionId: "pyq-jee-2024-chem-02",
        state: "ANSWERED",
        selectedOption: 0,
        timeSpentSeconds: 85,
        isCorrect: true,
        scoreAwarded: 4
      },
      "gen-chem-coord-01": {
        questionId: "gen-chem-coord-01",
        state: "ANSWERED",
        selectedOption: 0,
        timeSpentSeconds: 90,
        isCorrect: true,
        scoreAwarded: 4
      },
      "pyq-jee-2024-math-01": {
        questionId: "pyq-jee-2024-math-01",
        state: "ANSWERED",
        selectedOption: 0,
        timeSpentSeconds: 220,
        isCorrect: true,
        scoreAwarded: 4
      },
      "pyq-jee-2024-math-02": {
        questionId: "pyq-jee-2024-math-02",
        state: "ANSWERED",
        selectedOption: 0,
        timeSpentSeconds: 130,
        isCorrect: true,
        scoreAwarded: 4
      },
      "gen-math-int-var-01": {
        questionId: "gen-math-int-var-01",
        state: "ANSWERED_AND_MARKED",
        selectedOption: 1, // Chosen B instead of A
        timeSpentSeconds: 175,
        isCorrect: false,
        scoreAwarded: -1
      }
    }
  },
  {
    id: "attempt-demo-02",
    testId: "test-phy-lom-wep",
    testTitle: "Mechanics Chapter Test: Laws of Motion & Work-Energy",
    examId: "jee-main",
    startedAt: "2024-10-27T16:00:00Z",
    submittedAt: "2024-10-27T16:35:10Z",
    durationSeconds: 2110,
    totalQuestions: 4,
    attemptedCount: 4,
    correctCount: 3,
    incorrectCount: 1,
    unattemptedCount: 0,
    markedForReviewCount: 0,
    totalScore: 11,
    maxScore: 16,
    accuracyPercentage: 75.0,
    subjectWiseScore: {
      Physics: {
        subjectName: "Physics",
        attempted: 4,
        correct: 3,
        incorrect: 1,
        score: 11,
        maxScore: 16,
        accuracy: 75.0
      }
    },
    responses: {
      "pyq-jee-2024-phy-01": {
        questionId: "pyq-jee-2024-phy-01",
        state: "ANSWERED",
        selectedOption: 0,
        timeSpentSeconds: 110,
        isCorrect: true,
        scoreAwarded: 4
      },
      "pyq-jee-2024-phy-02": {
        questionId: "pyq-jee-2024-phy-02",
        state: "ANSWERED",
        selectedOption: 0,
        timeSpentSeconds: 95,
        isCorrect: true,
        scoreAwarded: 4
      },
      "gen-phy-lom-var-01": {
        questionId: "gen-phy-lom-var-01",
        state: "ANSWERED",
        selectedOption: 0,
        timeSpentSeconds: 85,
        isCorrect: true,
        scoreAwarded: 4
      },
      "gen-doc-hcv-lom-01": {
        questionId: "gen-doc-hcv-lom-01",
        state: "ANSWERED",
        selectedOption: 2,
        timeSpentSeconds: 150,
        isCorrect: false,
        scoreAwarded: -1
      }
    }
  }
];

