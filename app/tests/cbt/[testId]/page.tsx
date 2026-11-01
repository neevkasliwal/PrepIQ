"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import confetti from "canvas-confetti";
import { useAppStore } from "@/store/useAppStore";
import { EXAM_CONFIGURATIONS } from "@/mocks/examConfigurations";
import { OFFICIAL_PYQ_PAPERS } from "@/mocks/previousYearPapers";
import { Test, QuestionItem, QuestionState, QuestionResponse, TestAttempt } from "@/types";
import { MathView } from "@/components/ui/math-view";
import { getExamMarking } from "@/utils/scoringEngine";
import {
  Clock,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  Send,
  ArrowRight,
  BarChart3,
  Trophy,
  Check,
  X,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function CBTExamPage() {
  const router = useRouter();
  const params = useParams();
  const testId = params.testId as string;

  const { tests, selectedExamId, saveTestAttempt, currentUser } = useAppStore();

  const test: Test | undefined = useMemo(() => {
    const fromStore = tests.find((t) => t.id === testId);
    if (fromStore) return fromStore;

    for (const papers of Object.values(OFFICIAL_PYQ_PAPERS)) {
      const match = papers.find((p) => p.id === testId);
      if (match) {
        return {
          id: match.id,
          title: match.title,
          examId: match.examId,
          testType: "PYQ_PAPER",
          durationMinutes: match.durationMinutes,
          totalMarks: match.totalMarks,
          questions: match.questions,
          subjectIds: ["sub-phy", "sub-chem", "sub-math"],
          description: match.description,
          createdAt: new Date().toISOString()
        };
      }
    }
    return tests[0];
  }, [tests, testId]);

  const examConfig = EXAM_CONFIGURATIONS[test?.examId || selectedExamId] || EXAM_CONFIGURATIONS["jee-main"];

  // Exam Engine State
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedSubject, setSelectedSubject] = useState<string>("ALL");
  const [timeLeftSeconds, setTimeLeftSeconds] = useState<number>((test?.durationMinutes || 60) * 60);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [completedAttempt, setCompletedAttempt] = useState<TestAttempt | null>(null);

  // Responses dictionary: questionId -> QuestionResponse
  const [responses, setResponses] = useState<Record<string, QuestionResponse>>(() => {
    const initial: Record<string, QuestionResponse> = {};
    test?.questions.forEach((q, idx) => {
      initial[q.id] = {
        questionId: q.id,
        state: idx === 0 ? "NOT_ANSWERED" : "NOT_VISITED",
        timeSpentSeconds: 0,
      };
    });
    return initial;
  });

  // Track time spent per question
  useEffect(() => {
    if (isFinished) return;

    const timer = setInterval(() => {
      setTimeLeftSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitTest(true);
          return 0;
        }
        return prev - 1;
      });

      // Update time spent on active question
      const activeQ = test?.questions[currentIndex];
      if (activeQ) {
        setResponses((prev) => {
          const current = prev[activeQ.id] || { questionId: activeQ.id, state: "NOT_ANSWERED", timeSpentSeconds: 0 };
          return {
            ...prev,
            [activeQ.id]: {
              ...current,
              timeSpentSeconds: (current.timeSpentSeconds || 0) + 1,
            },
          };
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [currentIndex, isFinished, test]);

  // Current question object
  const currentQuestion: QuestionItem | undefined = test?.questions[currentIndex];
  const currentResponse: QuestionResponse | undefined = currentQuestion ? responses[currentQuestion.id] : undefined;

  // Question navigation helpers
  const goToQuestion = (idx: number) => {
    if (idx < 0 || idx >= (test?.questions.length || 0)) return;

    const targetQ = test?.questions[idx];
    if (targetQ) {
      setResponses((prev) => {
        const targetResp = prev[targetQ.id];
        if (targetResp && targetResp.state === "NOT_VISITED") {
          return {
            ...prev,
            [targetQ.id]: { ...targetResp, state: "NOT_ANSWERED" },
          };
        }
        return prev;
      });
    }

    setCurrentIndex(idx);
  };

  const handleSelectOption = (optIndex: number) => {
    if (!currentQuestion) return;
    setResponses((prev) => ({
      ...prev,
      [currentQuestion.id]: {
        ...prev[currentQuestion.id],
        selectedOption: optIndex,
        state:
          prev[currentQuestion.id]?.state === "MARKED_FOR_REVIEW"
            ? "ANSWERED_AND_MARKED"
            : "ANSWERED",
      },
    }));
  };

  const handleNumericalInput = (val: string) => {
    if (!currentQuestion) return;
    setResponses((prev) => ({
      ...prev,
      [currentQuestion.id]: {
        ...prev[currentQuestion.id],
        numericalInput: val,
        state: val.trim() ? "ANSWERED" : "NOT_ANSWERED",
      },
    }));
  };

  const handleClearResponse = () => {
    if (!currentQuestion) return;
    setResponses((prev) => ({
      ...prev,
      [currentQuestion.id]: {
        ...prev[currentQuestion.id],
        selectedOption: undefined,
        numericalInput: undefined,
        state: "NOT_ANSWERED",
      },
    }));
  };

  const handleMarkForReviewAndNext = () => {
    if (!currentQuestion) return;
    const hasAnswer =
      currentResponse?.selectedOption !== undefined ||
      (currentResponse?.numericalInput && currentResponse.numericalInput.trim() !== "");

    setResponses((prev) => ({
      ...prev,
      [currentQuestion.id]: {
        ...prev[currentQuestion.id],
        state: hasAnswer ? "ANSWERED_AND_MARKED" : "MARKED_FOR_REVIEW",
      },
    }));

    if (currentIndex < (test?.questions.length || 0) - 1) {
      goToQuestion(currentIndex + 1);
    }
  };

  const handleSaveAndNext = () => {
    if (!currentQuestion) return;
    const hasAnswer =
      currentResponse?.selectedOption !== undefined ||
      (currentResponse?.numericalInput && currentResponse.numericalInput.trim() !== "");

    setResponses((prev) => ({
      ...prev,
      [currentQuestion.id]: {
        ...prev[currentQuestion.id],
        state: hasAnswer ? "ANSWERED" : "NOT_ANSWERED",
      },
    }));

    if (currentIndex < (test?.questions.length || 0) - 1) {
      goToQuestion(currentIndex + 1);
    }
  };

  // Palette counts
  const paletteSummary = useMemo(() => {
    let answered = 0;
    let notAnswered = 0;
    let notVisited = 0;
    let marked = 0;
    let markedAnswered = 0;

    Object.values(responses).forEach((r) => {
      if (r.state === "ANSWERED") answered++;
      else if (r.state === "NOT_ANSWERED") notAnswered++;
      else if (r.state === "NOT_VISITED") notVisited++;
      else if (r.state === "MARKED_FOR_REVIEW") marked++;
      else if (r.state === "ANSWERED_AND_MARKED") markedAnswered++;
    });

    return { answered, notAnswered, notVisited, marked, markedAnswered };
  }, [responses]);

  // Scoring and Submission
  const handleSubmitTest = (force = false) => {
    if (!test) return;

    let correctCount = 0;
    let incorrectCount = 0;
    let unattemptedCount = 0;
    let totalScore = 0;

    // Evaluated responses
    const evaluatedResponses: Record<string, QuestionResponse> = {};

    test.questions.forEach((q) => {
      const resp = responses[q.id];
      const qMarking = getExamMarking(test.examId, q.subjectId);
      let isCorrect = false;
      let scoreAwarded = 0;

      if (!resp || (resp.selectedOption === undefined && !resp.numericalInput)) {
        unattemptedCount++;
        scoreAwarded = 0;
      } else {
        if (q.questionType === "NUMERICAL") {
          const studentVal = Number(resp.numericalInput);
          const expectedVal = Number(q.numericalAnswer);
          isCorrect = !isNaN(studentVal) && !isNaN(expectedVal) && Math.abs(studentVal - expectedVal) <= 0.05;
        } else {
          isCorrect = resp.selectedOption === q.correctOption;
        }

        if (isCorrect) {
          correctCount++;
          scoreAwarded = qMarking.positive;
        } else {
          scoreAwarded = -qMarking.negative;
          incorrectCount++;
        }
      }

      totalScore += scoreAwarded;
      evaluatedResponses[q.id] = {
        ...resp,
        isCorrect,
        scoreAwarded,
      };
    });

    const attemptedCount = correctCount + incorrectCount;
    const accuracy = attemptedCount > 0 ? Math.round((correctCount / attemptedCount) * 100) : 0;
    const maxScore = test.questions.reduce(
      (acc, q) => acc + getExamMarking(test.examId, q.subjectId).positive,
      0
    );

    const newAttempt: TestAttempt = {
      id: `attempt-${Date.now()}`,
      testId: test.id,
      testTitle: test.title,
      examId: test.examId,
      startedAt: new Date(Date.now() - (test.durationMinutes * 60 - timeLeftSeconds) * 1000).toISOString(),
      submittedAt: new Date().toISOString(),
      durationSeconds: test.durationMinutes * 60 - timeLeftSeconds,
      totalQuestions: test.questions.length,
      attemptedCount,
      correctCount,
      incorrectCount,
      unattemptedCount,
      markedForReviewCount: paletteSummary.marked + paletteSummary.markedAnswered,
      totalScore,
      maxScore,
      accuracyPercentage: accuracy,
      responses: evaluatedResponses,
      subjectWiseScore: {
        Physics: {
          subjectName: "Physics",
          attempted: attemptedCount,
          correct: correctCount,
          incorrect: incorrectCount,
          score: totalScore,
          maxScore,
          accuracy,
        },
      },
    };

    saveTestAttempt(newAttempt);
    setCompletedAttempt(newAttempt);
    setIsFinished(true);
    setIsSubmitModalOpen(false);

    // Confetti celebration
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (e) {
      // safe fallback
    }
  };

  // Format time MM:SS or HH:MM:SS
  const formatTimer = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    if (h > 0) {
      return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
    }
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  if (!test) {
    return (
      <div className="p-8 text-center text-white">
        <p>Test not found.</p>
        <Link href="/tests">
          <Button size="sm" className="mt-4">Back to Tests</Button>
        </Link>
      </div>
    );
  }

  // If Test is completed, show Result Summary Screen
  if (isFinished && completedAttempt) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 flex items-center justify-center">
        <Card className="max-w-2xl w-full p-6 sm:p-8 bg-slate-900 border-slate-800 text-slate-100 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-400 items-center justify-center mb-1 border border-emerald-500/20">
              <Trophy className="w-8 h-8" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              CBT Examination Completed!
            </h1>
            <p className="text-xs text-slate-400">{test.title}</p>
          </div>

          {/* Performance Overview Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 text-center space-y-0.5">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Total Score</span>
              <div className="text-2xl font-black text-amber-400 font-mono">
                {completedAttempt.totalScore} <span className="text-xs text-slate-400">/ {completedAttempt.maxScore}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 text-center space-y-0.5">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Accuracy</span>
              <div className="text-2xl font-black text-emerald-400 font-mono">
                {completedAttempt.accuracyPercentage}%
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 text-center space-y-0.5">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Correct</span>
              <div className="text-2xl font-black text-white font-mono">
                {completedAttempt.correctCount} / {completedAttempt.totalQuestions}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 text-center space-y-0.5">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Time Taken</span>
              <div className="text-2xl font-black text-blue-400 font-mono">
                {Math.round(completedAttempt.durationSeconds / 60)}m
              </div>
            </div>
          </div>

          {/* Breakdown Pills */}
          {(() => {
            let positiveEarned = 0;
            let negativeLost = 0;
            Object.values(completedAttempt.responses).forEach((r) => {
              if (r.isCorrect) {
                positiveEarned += r.scoreAwarded || 0;
              } else if (r.scoreAwarded && r.scoreAwarded < 0) {
                negativeLost += Math.abs(r.scoreAwarded);
              }
            });
            return (
              <div className="flex items-center justify-around p-3 bg-slate-950/60 rounded-xl border border-slate-800 text-xs">
                <div className="flex items-center gap-1.5 text-emerald-400 font-mono">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{completedAttempt.correctCount} Correct (+{positiveEarned})</span>
                </div>
                <div className="flex items-center gap-1.5 text-rose-400 font-mono">
                  <AlertCircle className="w-4 h-4" />
                  <span>{completedAttempt.incorrectCount} Incorrect (-{negativeLost})</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-400 font-mono">
                  <RotateCcw className="w-4 h-4" />
                  <span>{completedAttempt.unattemptedCount} Unattempted (0)</span>
                </div>
              </div>
            );
          })()}

          {/* Navigation Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link href={`/history/${completedAttempt.id}`} className="flex-1">
              <Button size="lg" className="w-full bg-primary hover:bg-primary/90 text-white font-semibold text-xs gap-2">
                <span>Review Step-by-Step Solutions</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>

            <Link href="/analytics" className="flex-1">
              <Button size="lg" variant="outline" className="w-full bg-slate-800 hover:bg-slate-700 border-slate-700 text-white font-semibold text-xs gap-2">
                <BarChart3 className="w-4 h-4 text-primary" />
                <span>Open Diagnostic Analytics</span>
              </Button>
            </Link>
          </div>

          <div className="text-center">
            <Link href="/tests" className="text-xs text-slate-400 hover:text-white underline">
              Return to Examination Catalog
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  // Active CBT Examination View (Distraction-Free)
  return (
    <div className="h-screen flex flex-col bg-slate-900 text-slate-100 select-none overflow-hidden font-sans">
      {/* 1. CBT Header Bar */}
      <header className="h-12 border-b border-slate-800 bg-slate-950 px-4 flex items-center justify-between shrink-0">
        <div className="flex items-center space-x-3 truncate">
          <span className="font-mono text-xs font-bold text-blue-400 bg-blue-950/80 px-2.5 py-0.5 rounded border border-blue-800/60">
            {examConfig.abbreviation} CBT
          </span>
          <span className="font-semibold text-xs text-slate-200 truncate hidden sm:inline">
            {test.title}
          </span>
        </div>

        {/* Center/Right Timer & Submit */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-slate-900 px-3 py-1 rounded-lg border border-slate-700 font-mono">
            <Clock className={`w-4 h-4 ${timeLeftSeconds < 300 ? "text-rose-500 animate-pulse" : "text-amber-400"}`} />
            <span className={`text-xs font-bold ${timeLeftSeconds < 300 ? "text-rose-400 font-black" : "text-amber-300"}`}>
              {formatTimer(timeLeftSeconds)}
            </span>
          </div>

          <Button
            size="sm"
            onClick={() => setIsSubmitModalOpen(true)}
            className="h-7 px-3 text-xs bg-rose-600 hover:bg-rose-700 text-white font-semibold shadow-xs"
          >
            Submit Test
          </Button>
        </div>
      </header>

      {/* 2. Main CBT Workplace (Question Area + Question Palette Sidebar) */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Question Presentation Area */}
        <div className="flex-1 flex flex-col justify-between overflow-y-auto p-4 md:p-6 bg-slate-900">
          <div className="space-y-4 max-w-4xl">
            {/* Question Header: Number, Marks, Type */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white bg-slate-800 px-3 py-1 rounded-lg border border-slate-700">
                  Question {currentIndex + 1}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {currentQuestion?.questionType.replace("_", " ")}
                </span>
              </div>

              {(() => {
                const qMarking = getExamMarking(test?.examId || selectedExamId, currentQuestion?.subjectId);
                return (
                  <div className="flex items-center gap-2 text-xs font-mono">
                    <span className="text-emerald-400 font-semibold bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-900/50">
                      +{qMarking.positive.toFixed(2)}
                    </span>
                    <span className="text-rose-400 font-semibold bg-rose-950/40 px-2 py-0.5 rounded border border-rose-900/50">
                      -{qMarking.negative.toFixed(2)}
                    </span>
                  </div>
                );
              })()}
            </div>

            {/* Question Statement with KaTeX */}
            <div className="text-sm sm:text-base text-slate-100 font-medium leading-relaxed py-2">
              {currentQuestion && <MathView content={currentQuestion.statement} />}
            </div>

            {/* Answer Options */}
            {currentQuestion?.options && currentQuestion.options.length > 0 && (
              <div className="space-y-2.5 pt-2">
                {currentQuestion.options.map((opt) => {
                  const isSelected = currentResponse?.selectedOption === opt.index;

                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => handleSelectOption(opt.index)}
                      className={`w-full p-3.5 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-start gap-3 cursor-pointer ${
                        isSelected
                          ? "border-blue-500 bg-blue-950/60 text-white font-medium shadow-sm"
                          : "border-slate-800 bg-slate-950/50 text-slate-300 hover:bg-slate-800/60"
                      }`}
                    >
                      <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                          isSelected
                            ? "bg-blue-500 text-white"
                            : "bg-slate-800 text-slate-400"
                        }`}
                      >
                        {opt.label}
                      </span>
                      <div className="pt-0.5 min-w-0">
                        <MathView content={opt.text} />
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Numerical Answer Type Input */}
            {currentQuestion?.questionType === "NUMERICAL" && (
              <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl space-y-2 max-w-sm">
                <label className="text-xs font-semibold text-slate-300 block">
                  Numerical Entry (Section B):
                </label>
                <input
                  type="number"
                  step="any"
                  placeholder="Enter numerical answer..."
                  value={currentResponse?.numericalInput || ""}
                  onChange={(e) => handleNumericalInput(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-700 bg-slate-900 text-white font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-[10px] text-slate-500 block">
                  Round to nearest integer or 2 decimal places as per examination instructions.
                </span>
              </div>
            )}
          </div>

          {/* 3. Bottom Action Bar */}
          <div className="pt-4 mt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleMarkForReviewAndNext}
                className="text-xs h-8 bg-purple-950/50 hover:bg-purple-900/60 text-purple-300 border-purple-800/80 font-medium"
              >
                Mark for Review & Next
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearResponse}
                className="text-xs h-8 text-slate-400 hover:text-white"
              >
                Clear Response
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={currentIndex === 0}
                onClick={() => goToQuestion(currentIndex - 1)}
                className="text-xs h-8 bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700"
              >
                <ChevronLeft className="w-3.5 h-3.5 mr-1" />
                <span>Previous</span>
              </Button>

              <Button
                size="sm"
                onClick={handleSaveAndNext}
                className="text-xs h-8 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-sm"
              >
                <span>Save & Next</span>
                <ChevronRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </div>
          </div>
        </div>

        {/* Right: Question Palette Sidebar */}
        <aside className="w-72 md:w-80 border-l border-slate-800 bg-slate-950 p-4 flex flex-col justify-between shrink-0 select-none overflow-y-auto">
          <div className="space-y-4">
            {/* Student Profile Snapshot in CBT */}
            <div className="flex items-center space-x-2.5 pb-3 border-b border-slate-800">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-bold text-xs text-white">
                AS
              </div>
              <div>
                <p className="text-xs font-bold text-white leading-none">{currentUser.name}</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Roll No: 2025-JEE-9812</p>
              </div>
            </div>

            {/* Palette Status Legend */}
            <div className="grid grid-cols-2 gap-2 text-[10px] font-medium text-slate-300">
              <div className="flex items-center gap-1.5">
                <span className="w-4 h-4 rounded bg-emerald-600 text-white flex items-center justify-center font-bold text-[9px]">
                  {paletteSummary.answered}
                </span>
                <span>Answered</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-4 h-4 rounded bg-rose-600 text-white flex items-center justify-center font-bold text-[9px]">
                  {paletteSummary.notAnswered}
                </span>
                <span>Not Answered</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-4 h-4 rounded bg-purple-600 text-white flex items-center justify-center font-bold text-[9px]">
                  {paletteSummary.marked}
                </span>
                <span>Marked for Review</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-4 h-4 rounded bg-slate-700 text-slate-300 flex items-center justify-center font-bold text-[9px]">
                  {paletteSummary.notVisited}
                </span>
                <span>Not Visited</span>
              </div>
            </div>

            {/* Question Palette Grid */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Question Palette ({test.questions.length})
              </span>

              <div className="grid grid-cols-5 gap-2 max-h-60 overflow-y-auto pr-1">
                {test.questions.map((q, qIdx) => {
                  const state = responses[q.id]?.state || "NOT_VISITED";
                  const isCurrent = currentIndex === qIdx;

                  let colorClass = "bg-slate-700 text-slate-300 hover:bg-slate-600";
                  if (state === "ANSWERED") {
                    colorClass = "bg-emerald-600 text-white hover:bg-emerald-500 font-bold";
                  } else if (state === "NOT_ANSWERED") {
                    colorClass = "bg-rose-600 text-white hover:bg-rose-500 font-bold";
                  } else if (state === "MARKED_FOR_REVIEW") {
                    colorClass = "bg-purple-600 text-white hover:bg-purple-500 font-bold";
                  } else if (state === "ANSWERED_AND_MARKED") {
                    colorClass = "bg-purple-600 text-white border-2 border-emerald-400 font-bold";
                  }

                  return (
                    <button
                      key={q.id}
                      type="button"
                      onClick={() => goToQuestion(qIdx)}
                      className={`h-9 rounded-lg text-xs font-mono transition-all flex items-center justify-center relative cursor-pointer ${colorClass} ${
                        isCurrent ? "ring-2 ring-white ring-offset-2 ring-offset-slate-900 scale-105" : ""
                      }`}
                    >
                      {qIdx + 1}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Quick Submit Test Button */}
          <div className="pt-3 border-t border-slate-800">
            <Button
              onClick={() => setIsSubmitModalOpen(true)}
              className="w-full text-xs h-9 bg-rose-600 hover:bg-rose-700 text-white font-semibold shadow-sm"
            >
              Submit CBT Examination
            </Button>
          </div>
        </aside>
      </div>

      {/* Submission Confirmation Modal */}
      <Dialog open={isSubmitModalOpen} onOpenChange={setIsSubmitModalOpen}>
        <DialogContent className="max-w-md bg-slate-900 border-slate-800 text-slate-100">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-white flex items-center gap-2">
              <Send className="w-5 h-5 text-rose-500" />
              <span>Confirm Test Submission</span>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2 text-xs">
            <p className="text-slate-300">
              Are you sure you want to conclude this computer-based examination? You will not be able to modify your responses after submitting.
            </p>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2 font-mono">
              <div className="flex justify-between">
                <span className="text-slate-400">Total Questions:</span>
                <span className="text-white font-bold">{test.questions.length}</span>
              </div>
              <div className="flex justify-between text-emerald-400">
                <span>Answered:</span>
                <span className="font-bold">{paletteSummary.answered + paletteSummary.markedAnswered}</span>
              </div>
              <div className="flex justify-between text-rose-400">
                <span>Not Answered:</span>
                <span className="font-bold">{paletteSummary.notAnswered}</span>
              </div>
              <div className="flex justify-between text-purple-400">
                <span>Marked for Review:</span>
                <span className="font-bold">{paletteSummary.marked}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Not Visited:</span>
                <span className="font-bold">{paletteSummary.notVisited}</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsSubmitModalOpen(false)}
                className="bg-slate-800 hover:bg-slate-700 text-white border-slate-700 text-xs"
              >
                Return to Exam
              </Button>
              <Button
                size="sm"
                onClick={() => handleSubmitTest(false)}
                className="bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs"
              >
                Yes, Submit Final Responses
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
