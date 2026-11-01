"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useAppStore } from "@/store/useAppStore";
import { SUBJECTS } from "@/mocks/subjects";
import { CHAPTERS } from "@/mocks/chapters";
import { QuestionItem, ExamId, QuestionDifficulty } from "@/types";
import { MathView } from "@/components/ui/math-view";
import {
  HelpCircle,
  Search,
  Filter,
  CheckCircle2,
  Bookmark,
  Sparkles,
  BookOpen,
  ArrowRight,
  ExternalLink,
  RotateCcw,
  Eye,
  EyeOff,
  Layers,
  Flame,
  Check,
  X,
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function PYQPage() {
  const { pyqs, toggleQuestionBookmark, selectedExamId, setSelectedExam } = useAppStore();

  // Mode: "CHAPTER_WISE" | "PAPER_WISE"
  const [viewMode, setViewMode] = useState<"CHAPTER_WISE" | "PAPER_WISE">("CHAPTER_WISE");

  // Filter state
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>("ALL");
  const [selectedChapterId, setSelectedChapterId] = useState<string>("ALL");
  const [selectedYear, setSelectedYear] = useState<string>("ALL");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("ALL");
  const [onlyBookmarked, setOnlyBookmarked] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Interactive Question State (Selected answer & Reveal solution toggles)
  const [revealedSolutions, setRevealedSolutions] = useState<Record<string, boolean>>({});
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number | string>>({});
  const [activeModalQuestion, setActiveModalQuestion] = useState<QuestionItem | null>(null);

  // Available subjects for the active examination
  const availableSubjects = useMemo(() => {
    return SUBJECTS.filter((s) => s.examId === selectedExamId || (selectedExamId === "jee-adv" && s.examId === "jee-main"));
  }, [selectedExamId]);

  // Available chapters for the active subject
  const availableChapters = useMemo(() => {
    return CHAPTERS.filter((c) => {
      if (selectedSubjectId !== "ALL" && c.subjectId !== selectedSubjectId) return false;
      return c.examId === selectedExamId || (selectedExamId === "jee-adv" && c.examId === "jee-main");
    });
  }, [selectedExamId, selectedSubjectId]);

  // Filtered PYQs
  const filteredQuestions = useMemo(() => {
    return pyqs.filter((q) => {
      // Must match exam
      if (q.examId !== selectedExamId) return false;
      if (selectedSubjectId !== "ALL" && q.subjectId !== selectedSubjectId) return false;
      if (selectedChapterId !== "ALL" && q.chapterId !== selectedChapterId) return false;
      if (selectedYear !== "ALL" && q.year !== Number(selectedYear)) return false;
      if (selectedDifficulty !== "ALL" && q.difficulty !== selectedDifficulty) return false;
      if (onlyBookmarked && !q.bookmarked) return false;
      if (searchQuery.trim()) {
        const text = (q.statement + " " + (q.sourceReference || "")).toLowerCase();
        if (!text.includes(searchQuery.toLowerCase())) return false;
      }
      return true;
    });
  }, [pyqs, selectedExamId, selectedSubjectId, selectedChapterId, selectedYear, selectedDifficulty, onlyBookmarked, searchQuery]);

  const toggleSolution = (qId: string) => {
    setRevealedSolutions((prev) => ({ ...prev, [qId]: !prev[qId] }));
  };

  const handleSelectOption = (qId: string, optIndex: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optIndex }));
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* 1. Header & Workflow Mode */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Previous Year Questions (PYQ) Intelligence
            </h1>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Original examination questions organized by year, shift, subject, and topic with step-by-step verified solutions.
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center p-1 bg-muted rounded-xl border border-border">
          <button
            onClick={() => setViewMode("CHAPTER_WISE")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              viewMode === "CHAPTER_WISE"
                ? "bg-card text-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Chapter-wise Practice
          </button>
          <button
            onClick={() => setViewMode("PAPER_WISE")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              viewMode === "PAPER_WISE"
                ? "bg-card text-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Paper-wise Replay
          </button>
        </div>
      </div>

      {/* Paper-wise Banner (when in Paper-wise mode) */}
      {viewMode === "PAPER_WISE" && (
        <Card className="border-indigo-200 dark:border-indigo-900 bg-indigo-50/40 dark:bg-indigo-950/20">
          <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-indigo-700 dark:text-indigo-400 uppercase tracking-wider font-mono">
                Full Official Shift Paper Mode
              </span>
              <h3 className="text-sm font-semibold text-foreground">
                NTA JEE Main 2024 (27 Jan Shift 1) Official Paper Replay
              </h3>
              <p className="text-xs text-muted-foreground">
                Attempt the authentic 300-mark paper under real CBT test constraints with countdown timer and scoring rules.
              </p>
            </div>
            <Link href="/tests/cbt/test-pyq-paper-2024-jan27">
              <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs gap-1.5 shrink-0">
                <span>Start Timed Exam Simulation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}

      {/* 4. Comprehensive Filter Bar */}
      <Card className="p-3.5 bg-card/60 backdrop-blur-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2.5">
          {/* Subject Filter */}
          <div>
            <label className="text-[10px] font-semibold text-muted-foreground uppercase block mb-1">Subject</label>
            <select
              value={selectedSubjectId}
              onChange={(e) => {
                setSelectedSubjectId(e.target.value);
                setSelectedChapterId("ALL");
              }}
              className="w-full text-xs p-1.5 rounded-lg border border-input bg-background focus:ring-1 focus:ring-primary"
            >
              <option value="ALL">All Subjects</option>
              {availableSubjects.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          {/* Chapter Filter */}
          <div>
            <label className="text-[10px] font-semibold text-muted-foreground uppercase block mb-1">Chapter</label>
            <select
              value={selectedChapterId}
              onChange={(e) => setSelectedChapterId(e.target.value)}
              className="w-full text-xs p-1.5 rounded-lg border border-input bg-background focus:ring-1 focus:ring-primary truncate"
            >
              <option value="ALL">All Chapters</option>
              {availableChapters.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Year Filter */}
          <div>
            <label className="text-[10px] font-semibold text-muted-foreground uppercase block mb-1">Year</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full text-xs p-1.5 rounded-lg border border-input bg-background focus:ring-1 focus:ring-primary"
            >
              <option value="ALL">All Years</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
            </select>
          </div>

          {/* Difficulty Filter */}
          <div>
            <label className="text-[10px] font-semibold text-muted-foreground uppercase block mb-1">Difficulty</label>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full text-xs p-1.5 rounded-lg border border-input bg-background focus:ring-1 focus:ring-primary"
            >
              <option value="ALL">All Levels</option>
              <option value="EASY">Easy</option>
              <option value="MEDIUM">Medium</option>
              <option value="HARD">Hard</option>
            </select>
          </div>

          {/* Search Bar */}
          <div>
            <label className="text-[10px] font-semibold text-muted-foreground uppercase block mb-1">Search Statement</label>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-muted-foreground absolute left-2.5 top-2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Friction, integral..."
                className="w-full pl-8 pr-2 py-1 text-xs rounded-lg border border-input bg-background focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>
        </div>

        {/* Quick Toggles */}
        <div className="flex items-center justify-between pt-3 mt-3 border-t border-border text-xs">
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-1.5 cursor-pointer text-muted-foreground hover:text-foreground">
              <input
                type="checkbox"
                checked={onlyBookmarked}
                onChange={(e) => setOnlyBookmarked(e.target.checked)}
                className="rounded accent-primary"
              />
              <span>Bookmarked Only</span>
            </label>
          </div>

          <span className="font-mono text-muted-foreground text-[11px]">
            Showing {filteredQuestions.length} Demonstration PYQs
          </span>
        </div>
      </Card>

      {/* 5. Question Stream */}
      <div className="space-y-4">
        {filteredQuestions.length === 0 ? (
          <Card className="p-8 text-center space-y-2">
            <HelpCircle className="w-8 h-8 text-muted-foreground mx-auto" />
            <h3 className="text-sm font-semibold text-foreground">No questions matching your filters</h3>
            <p className="text-xs text-muted-foreground">Try clearing selected chapter, difficulty, or search terms.</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSelectedSubjectId("ALL");
                setSelectedChapterId("ALL");
                setSelectedYear("ALL");
                setSelectedDifficulty("ALL");
                setOnlyBookmarked(false);
                setSearchQuery("");
              }}
              className="text-xs mt-2"
            >
              Reset All Filters
            </Button>
          </Card>
        ) : (
          filteredQuestions.map((q, index) => {
            const isRevealed = !!revealedSolutions[q.id];
            const studentChoice = selectedAnswers[q.id];
            const hasChosen = studentChoice !== undefined;

            return (
              <Card key={q.id} className="p-5 space-y-4 hover:border-border transition-all">
                {/* Question Metadata Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/80 pb-2.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="outline" className="text-[10px] font-mono">
                      Q.{index + 1}
                    </Badge>
                    <Badge variant="info" className="text-[10px] font-semibold">
                      {q.sourceReference || `${q.examId.toUpperCase()} ${q.year}`}
                    </Badge>
                    <Badge
                      variant={
                        q.difficulty === "EASY"
                          ? "success"
                          : q.difficulty === "HARD"
                          ? "destructive"
                          : "warning"
                      }
                      className="text-[10px]"
                    >
                      {q.difficulty}
                    </Badge>
                    <span className="text-[10px] text-muted-foreground font-mono">
                      {q.questionType.replace("_", " ")}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleQuestionBookmark(q.id)}
                      className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground gap-1"
                    >
                      <Bookmark
                        className={`w-3.5 h-3.5 ${
                          q.bookmarked ? "fill-amber-500 text-amber-500" : ""
                        }`}
                      />
                      <span>{q.bookmarked ? "Saved" : "Save"}</span>
                    </Button>

                    <Link href={`/generate?parentPyq=${q.id}&chapter=${q.chapterId}`}>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-7 px-2.5 text-xs text-primary border-primary/20 hover:bg-primary/5 gap-1"
                      >
                        <Sparkles className="w-3 h-3 text-primary" />
                        <span>Generate Similar</span>
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Question Statement */}
                <div className="text-sm text-foreground font-medium leading-relaxed">
                  <MathView content={q.statement} />
                </div>

                {/* Multiple Choice Options */}
                {q.options && q.options.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                    {q.options.map((opt) => {
                      const isSelected = studentChoice === opt.index;
                      const isCorrect = q.correctOption === opt.index;

                      let optClasses = "border-border hover:bg-accent/60 text-foreground";
                      if (hasChosen && isSelected) {
                        optClasses = isCorrect
                          ? "border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-100 font-semibold"
                          : "border-rose-500 bg-rose-50/60 dark:bg-rose-950/40 text-rose-900 dark:text-rose-100 font-semibold";
                      } else if (isRevealed && isCorrect) {
                        optClasses = "border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-100 font-semibold";
                      }

                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => handleSelectOption(q.id, opt.index)}
                          className={`p-3 rounded-xl border text-left text-xs transition-all flex items-start gap-2.5 ${optClasses}`}
                        >
                          <span className="w-5 h-5 rounded-full bg-muted flex items-center justify-center font-bold text-[11px] shrink-0">
                            {opt.label}
                          </span>
                          <div className="flex-1 min-w-0 pt-0.5">
                            <MathView content={opt.text} />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Numerical Input Box (if Numerical Type) */}
                {q.questionType === "NUMERICAL" && (
                  <div className="p-3 bg-muted/40 rounded-xl max-w-sm space-y-1.5">
                    <label className="text-[11px] font-semibold text-muted-foreground block">
                      Enter Numerical Value (Section B Format):
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        placeholder="e.g. 18"
                        value={typeof studentChoice === "number" || typeof studentChoice === "string" ? studentChoice : ""}
                        onChange={(e) => setSelectedAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))}
                        className="px-3 py-1.5 text-xs rounded-lg border border-input bg-card font-mono w-36"
                      />
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => toggleSolution(q.id)}
                        className="text-xs h-7"
                      >
                        Check Answer
                      </Button>
                    </div>
                  </div>
                )}

                {/* Action Ribbon: Reveal Solution / Source Attribution */}
                <div className="flex items-center justify-between pt-2 border-t border-border text-xs">
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => toggleSolution(q.id)}
                      className="text-xs h-7 px-2.5 gap-1.5 text-primary hover:text-primary"
                    >
                      {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      <span>{isRevealed ? "Hide Detailed Solution" : "Reveal Step-by-Step Solution"}</span>
                    </Button>
                  </div>

                  <span className="text-[11px] text-muted-foreground font-mono hidden sm:inline">
                    Status: <strong className="text-emerald-600 font-semibold">{q.verificationStatus}</strong>
                  </span>
                </div>

                {/* Step-by-Step Verified Solution Box */}
                {isRevealed && (
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-3 animate-in fade-in-50 text-xs">
                    <div className="flex items-center justify-between pb-2 border-b border-border">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span className="font-bold text-foreground">Official Step-by-Step Explanation</span>
                      </div>
                      <Badge variant="success" className="text-[10px]">
                        Correct: Option {q.options ? q.options[q.correctOption || 0]?.label : q.numericalAnswer}
                      </Badge>
                    </div>

                    <div className="space-y-2 text-foreground/90 leading-relaxed font-sans">
                      {q.stepByStepSolution.map((step, sIdx) => (
                        <div key={sIdx} className="flex items-start gap-2">
                          <span className="text-[10px] font-mono text-muted-foreground mt-0.5">
                            {sIdx + 1}.
                          </span>
                          <div>
                            <MathView content={step} />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-border text-[10px] text-muted-foreground flex items-center justify-between font-mono">
                      <span>Source: {q.sourceReference}</span>
                      <span>Verified: {q.answerKeyReference}</span>
                    </div>
                  </div>
                )}
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}

