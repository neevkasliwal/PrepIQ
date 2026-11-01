"use client";

import React, { useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useAppStore } from "@/store/useAppStore";
import { TestAttempt, QuestionItem } from "@/types";
import { MathView } from "@/components/ui/math-view";
import {
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Clock,
  Check,
  X,
  Bookmark,
  Sparkles,
  BarChart3,
  RotateCcw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function AttemptDetailPage() {
  const params = useParams();
  const attemptId = params.attemptId as string;

  const { testAttempts, tests, pyqs, generatedQuestions, toggleQuestionBookmark } = useAppStore();

  const attempt: TestAttempt | undefined = useMemo(() => {
    return testAttempts.find((a) => a.id === attemptId) || testAttempts[0];
  }, [testAttempts, attemptId]);

  const test = useMemo(() => {
    if (!attempt) return undefined;
    return tests.find((t) => t.id === attempt.testId);
  }, [tests, attempt]);

  // Combine questions in test or fall back to questions from store
  const allQuestionsMap = useMemo(() => {
    const map = new Map<string, QuestionItem>();
    pyqs.forEach((q) => map.set(q.id, q));
    generatedQuestions.forEach((q) => map.set(q.id, q));
    test?.questions.forEach((q) => map.set(q.id, q));
    return map;
  }, [pyqs, generatedQuestions, test]);

  if (!attempt) {
    return (
      <div className="p-8 text-center">
        <p>Attempt not found.</p>
        <Link href="/history">
          <Button size="sm" className="mt-4">Back to History</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Top Navigation & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <Link href="/history">
            <Button variant="outline" size="icon" className="h-8 w-8">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-foreground">
                Solution & Response Audit
              </h1>
              <Badge variant="outline" className="text-[10px] font-mono">
                {attempt.examId.toUpperCase()}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">{attempt.testTitle}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/analytics">
            <Button size="sm" variant="outline" className="text-xs gap-1.5 h-8">
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Full Analytics</span>
            </Button>
          </Link>

          <Link href={`/tests/cbt/${attempt.testId}`}>
            <Button size="sm" className="text-xs gap-1.5 h-8 bg-primary text-white">
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reattempt Test</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Attempt Score Overview Bar */}
      <Card className="p-4 bg-muted/30">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center text-xs">
          <div>
            <span className="text-[10px] text-muted-foreground uppercase block font-semibold">Total Score</span>
            <div className="text-xl font-black text-foreground font-mono">
              {attempt.totalScore} <span className="text-xs text-muted-foreground font-normal">/ {attempt.maxScore}</span>
            </div>
          </div>
          <div>
            <span className="text-[10px] text-muted-foreground uppercase block font-semibold">Accuracy</span>
            <div className="text-xl font-black text-emerald-600 font-mono">{attempt.accuracyPercentage}%</div>
          </div>
          <div>
            <span className="text-[10px] text-muted-foreground uppercase block font-semibold">Correct (+4)</span>
            <div className="text-xl font-black text-emerald-600 font-mono">{attempt.correctCount}</div>
          </div>
          <div>
            <span className="text-[10px] text-muted-foreground uppercase block font-semibold">Incorrect (-1)</span>
            <div className="text-xl font-black text-rose-600 font-mono">{attempt.incorrectCount}</div>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <span className="text-[10px] text-muted-foreground uppercase block font-semibold">Duration</span>
            <div className="text-xl font-black text-blue-600 font-mono">{Math.round(attempt.durationSeconds / 60)}m</div>
          </div>
        </div>
      </Card>

      {/* Question Responses Stream */}
      <div className="space-y-5">
        <h3 className="text-sm font-bold text-foreground uppercase tracking-wider text-muted-foreground">
          Item-by-Item Verified Walkthrough ({Object.keys(attempt.responses).length} Questions)
        </h3>

        {Object.entries(attempt.responses).map(([qId, resp], idx) => {
          const q = allQuestionsMap.get(qId);
          if (!q) return null;

          const isUnattempted = resp.selectedOption === undefined && !resp.numericalInput;
          const isCorrect = resp.isCorrect;

          return (
            <Card
              key={qId}
              className={`p-5 space-y-4 border-l-4 ${
                isUnattempted
                  ? "border-l-slate-400"
                  : isCorrect
                  ? "border-l-emerald-500"
                  : "border-l-rose-500"
              }`}
            >
              {/* Question Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-border">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-[10px] font-mono">
                    Question {idx + 1}
                  </Badge>

                  {isUnattempted ? (
                    <Badge variant="secondary" className="text-[10px]">Unattempted (0 Marks)</Badge>
                  ) : isCorrect ? (
                    <Badge variant="success" className="text-[10px] gap-1">
                      <Check className="w-3 h-3" />
                      <span>Correct (+4 Marks)</span>
                    </Badge>
                  ) : (
                    <Badge variant="destructive" className="text-[10px] gap-1">
                      <X className="w-3 h-3" />
                      <span>Incorrect (-1 Mark)</span>
                    </Badge>
                  )}

                  <span className="text-[11px] text-muted-foreground font-mono flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {resp.timeSpentSeconds}s spent
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleQuestionBookmark(q.id)}
                    className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground gap-1"
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${q.bookmarked ? "fill-amber-500 text-amber-500" : ""}`} />
                    <span>{q.bookmarked ? "Bookmarked" : "Bookmark"}</span>
                  </Button>
                </div>
              </div>

              {/* Question Statement */}
              <div className="text-sm text-foreground font-medium leading-relaxed">
                <MathView content={q.statement} />
              </div>

              {/* Options Breakdown */}
              {q.options && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {q.options.map((opt) => {
                    const isStudentChoice = resp.selectedOption === opt.index;
                    const isActualCorrect = q.correctOption === opt.index;

                    let classes = "border-border bg-card text-foreground";
                    if (isActualCorrect) {
                      classes = "border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-100 font-semibold";
                    } else if (isStudentChoice && !isActualCorrect) {
                      classes = "border-rose-500 bg-rose-50/70 dark:bg-rose-950/40 text-rose-900 dark:text-rose-100 font-semibold";
                    }

                    return (
                      <div
                        key={opt.id}
                        className={`p-3 rounded-xl border text-xs flex items-center justify-between gap-2 ${classes}`}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="w-5 h-5 rounded-full bg-muted flex items-center justify-center font-bold text-[10px] shrink-0">
                            {opt.label}
                          </span>
                          <MathView content={opt.text} />
                        </div>

                        {isActualCorrect && (
                          <span className="text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded font-mono font-bold shrink-0">
                            Correct Answer
                          </span>
                        )}
                        {isStudentChoice && !isActualCorrect && (
                          <span className="text-[10px] bg-rose-600 text-white px-2 py-0.5 rounded font-mono font-bold shrink-0">
                            Your Choice
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Numerical Response Breakdown */}
              {q.questionType === "NUMERICAL" && (
                <div className="p-3 bg-muted/40 rounded-xl space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span>Your Numerical Input: <strong className="font-mono text-foreground">{resp.numericalInput || "None"}</strong></span>
                    <span>Official Answer Key: <strong className="font-mono text-emerald-600 font-bold">{q.numericalAnswer}</strong></span>
                  </div>
                </div>
              )}

              {/* Step-by-Step Verified Solution */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-border space-y-2 text-xs">
                <span className="font-bold text-foreground text-xs flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Step-by-Step Verified Solution</span>
                </span>

                <div className="space-y-1.5 text-muted-foreground leading-relaxed pt-1">
                  {q.stepByStepSolution.map((step, sIdx) => (
                    <div key={sIdx} className="flex items-start gap-1.5">
                      <span className="font-mono text-muted-foreground">{sIdx + 1}.</span>
                      <MathView content={step} />
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-border text-[10px] text-muted-foreground flex items-center justify-between font-mono">
                  <span>Source: {q.sourceReference}</span>
                  <span>Status: Verified Official Key</span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

