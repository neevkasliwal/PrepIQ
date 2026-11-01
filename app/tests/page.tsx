"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/store/useAppStore";
import { CHAPTERS } from "@/mocks/chapters";
import { SUBJECTS } from "@/mocks/subjects";
import { OFFICIAL_PYQ_PAPERS, OfficialPYQPaper } from "@/mocks/previousYearPapers";
import { Test, QuestionItem, ExamId } from "@/types";
import {
  FileText,
  Clock,
  Sparkles,
  Play,
  Plus,
  Layers,
  CheckCircle2,
  Sliders,
  HelpCircle,
  FolderOpen,
  ArrowRight,
  Cpu,
  BookOpen,
  Award,
  ShieldCheck,
  Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function TestsPage() {
  const router = useRouter();
  const { tests, selectedExamId, pyqs, generatedQuestions, addTest } = useAppStore();

  // Active top-level tab: "PYQ_PAPERS" or "CHAPTER_CUSTOM"
  const [activeCatalogTab, setActiveCatalogTab] = useState<"PYQ_PAPERS" | "CHAPTER_CUSTOM">("PYQ_PAPERS");

  // Custom Test Builder Modal State
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [testTitle, setTestTitle] = useState("Custom Diagnostic Drill");
  const [selectedSubjectId, setSelectedSubjectId] = useState("sub-phy");
  const [selectedChapterIds, setSelectedChapterIds] = useState<string[]>(["chap-lom"]);
  const [includePYQs, setIncludePYQs] = useState(true);
  const [includeGenerated, setIncludeGenerated] = useState(true);
  const [durationMinutes, setDurationMinutes] = useState(30);

  const availableSubjects = SUBJECTS.filter(
    (s) => s.examId === selectedExamId || (selectedExamId === "jee-adv" && s.examId === "jee-main")
  );

  const availableChapters = CHAPTERS.filter(
    (c) => c.subjectId === selectedSubjectId || selectedSubjectId === "ALL"
  );

  // Retrieve the 2 official previous year papers for the selected exam
  const currentExamPYQPapers: OfficialPYQPaper[] = useMemo(() => {
    return OFFICIAL_PYQ_PAPERS[selectedExamId] || OFFICIAL_PYQ_PAPERS["jee-main"];
  }, [selectedExamId]);

  // Chapter-wise & Custom tests
  const chapterAndCustomTests = useMemo(() => {
    return tests.filter(
      (t) => t.testType === "CHAPTER_WISE" || t.testType === "CUSTOM_PRACTICE" || t.testType === "FULL_LENGTH"
    );
  }, [tests]);

  const handleToggleChapter = (chapId: string) => {
    if (selectedChapterIds.includes(chapId)) {
      if (selectedChapterIds.length > 1) {
        setSelectedChapterIds(selectedChapterIds.filter((id) => id !== chapId));
      }
    } else {
      setSelectedChapterIds([...selectedChapterIds, chapId]);
    }
  };

  const handleCreateCustomTest = (e: React.FormEvent) => {
    e.preventDefault();

    // Pool questions from PYQs and generated questions
    let pool: QuestionItem[] = [];
    if (includePYQs) {
      pool = [...pool, ...pyqs.filter((q) => selectedChapterIds.includes(q.chapterId))];
    }
    if (includeGenerated) {
      pool = [...pool, ...generatedQuestions.filter((q) => selectedChapterIds.includes(q.chapterId))];
    }

    if (pool.length === 0) {
      pool = [...pyqs.slice(0, 3)];
    }

    const newTestId = `test-custom-${Date.now()}`;
    const newTest: Test = {
      id: newTestId,
      title: testTitle,
      examId: selectedExamId,
      testType: "CUSTOM_PRACTICE",
      durationMinutes,
      totalMarks: pool.length * 4,
      questions: pool,
      subjectIds: [selectedSubjectId],
      chapterIds: selectedChapterIds,
      description: `Student-configured diagnostic drill targeting ${selectedChapterIds.length} chapter(s).`,
      createdAt: new Date().toISOString()
    };

    addTest(newTest);
    setIsBuilderOpen(false);
    router.push(`/tests/cbt/${newTestId}`);
  };

  const examDisplayNames: Record<ExamId, string> = {
    "jee-main": "JEE Main (NTA)",
    "jee-adv": "JEE Advanced (IIT)",
    "comedk": "COMEDK UGET",
    "mht-cet": "MHT-CET PCM",
    "gate": "GATE CS",
    "neet": "NEET UG (NTA)"
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Examination Catalog & Test Builder
            </h1>
            <Badge variant="purple" className="text-[10px] font-mono">
              Official Papers & CBT Simulator
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Attempt complete official previous year question papers from NTA & examination authorities, or build targeted chapter drills.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          <Link href="/generate">
            <Button variant="outline" size="sm" className="gap-1.5 text-xs h-9">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span>Generate Chapter Drill</span>
            </Button>
          </Link>

          <Button
            size="sm"
            onClick={() => setIsBuilderOpen(true)}
            className="gap-1.5 text-xs h-9 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Build Custom Test</span>
          </Button>
        </div>
      </div>

      {/* 2. Top Navigation Tabs: Previous Year Official Papers vs Chapter Drills */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveCatalogTab("PYQ_PAPERS")}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
              activeCatalogTab === "PYQ_PAPERS"
                ? "bg-primary text-primary-foreground shadow-xs"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Complete Previous Year Papers (Full Mocks)</span>
            <span className="w-5 h-5 rounded-full bg-primary-foreground/20 text-[10px] flex items-center justify-center font-mono">
              2
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveCatalogTab("CHAPTER_CUSTOM")}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
              activeCatalogTab === "CHAPTER_CUSTOM"
                ? "bg-primary text-primary-foreground shadow-xs"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Chapter & Topic Drills ({chapterAndCustomTests.length})</span>
          </button>
        </div>

        <div className="text-xs text-muted-foreground font-mono">
          Target: <strong className="text-foreground">{examDisplayNames[selectedExamId]}</strong>
        </div>
      </div>

      {/* ======================================================== */}
      {/* SECTION 1: COMPLETE PREVIOUS YEAR OFFICIAL PAPERS */}
      {/* ======================================================== */}
      {activeCatalogTab === "PYQ_PAPERS" && (
        <div className="space-y-4 animate-in fade-in-50 duration-200">
          {/* Informational Banner */}
          <div className="p-3.5 bg-muted/30 border border-border/80 rounded-xl flex items-center justify-between flex-wrap gap-2 text-xs">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>
                Showing <strong>2 Official Complete Previous Year Papers</strong> for{" "}
                <strong className="text-primary">{examDisplayNames[selectedExamId]}</strong>.
                Each paper strictly preserves the genuine examination duration, marking rules, and question format.
              </span>
            </div>
            <span className="font-mono text-[11px] text-muted-foreground">
              Official CBT Engine Ready
            </span>
          </div>

          {/* 2 Full Previous Year Papers Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {currentExamPYQPapers.map((paper) => (
              <Card
                key={paper.id}
                className="p-5 flex flex-col justify-between border-border hover:border-primary/50 transition-all hover:shadow-md space-y-4 bg-card"
              >
                <div className="space-y-3.5">
                  {/* Top Authority & Shift Row */}
                  <div className="flex items-center justify-between pb-2 border-b border-border/60">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant="outline" className="text-[10px] font-mono border-primary/30 text-primary font-bold">
                        {paper.authority}
                      </Badge>
                      <Badge variant="secondary" className="text-[10px] font-mono font-semibold">
                        {paper.sessionOrShift}
                      </Badge>
                    </div>

                    <Badge variant="outline" className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 border-emerald-500/30 font-semibold">
                      {paper.markingScheme}
                    </Badge>
                  </div>

                  {/* Paper Title & Description */}
                  <div>
                    <h3 className="text-base font-bold text-foreground leading-snug">
                      {paper.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                      {paper.description}
                    </p>
                  </div>

                  {/* Duration, Total Marks, Questions Bar */}
                  <div className="grid grid-cols-3 gap-2 p-2.5 bg-muted/40 rounded-lg text-center font-mono text-xs">
                    <div>
                      <span className="text-[10px] text-muted-foreground uppercase block font-sans">Duration</span>
                      <span className="font-bold text-foreground flex items-center justify-center gap-1">
                        <Clock className="w-3 h-3 text-primary" /> {paper.durationMinutes} Mins
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] text-muted-foreground uppercase block font-sans">Total Marks</span>
                      <span className="font-bold text-foreground">{paper.totalMarks} Marks</span>
                    </div>

                    <div>
                      <span className="text-[10px] text-muted-foreground uppercase block font-sans">Questions</span>
                      <span className="font-bold text-foreground">{paper.totalQuestions} Questions</span>
                    </div>
                  </div>

                  {/* Subjects Breakdown Pills */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase block tracking-wider">
                      Sectional Distribution
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {paper.subjects.map((sub, sIdx) => (
                        <div
                          key={sIdx}
                          className="px-2.5 py-1 rounded bg-muted/60 border border-border/60 text-[11px] font-mono flex items-center gap-1.5"
                        >
                          <span className="font-semibold text-foreground">{sub.name}:</span>
                          <span className="text-muted-foreground">{sub.questionsCount}Q ({sub.marks}M)</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Instructions Preview */}
                  <div className="p-3 bg-muted/20 border border-border/50 rounded-lg space-y-1 text-[11px] text-muted-foreground">
                    <span className="font-bold text-[10px] uppercase text-muted-foreground block">
                      Instructions Summary:
                    </span>
                    <ul className="list-disc pl-4 space-y-0.5">
                      {paper.instructions.map((inst, iIdx) => (
                        <li key={iIdx}>{inst}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom Action Bar */}
                <div className="pt-3 border-t border-border flex items-center justify-between">
                  <span className="text-[11px] text-muted-foreground font-mono">
                    Includes KaTeX Math & Verified Solutions
                  </span>

                  <Link href={`/tests/cbt/${paper.id}`}>
                    <Button
                      size="sm"
                      className="gap-2 text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-xs px-4"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" />
                      <span>Attempt CBT Paper</span>
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* SECTION 2: CHAPTER & TOPIC DRILLS */}
      {/* ======================================================== */}
      {activeCatalogTab === "CHAPTER_CUSTOM" && (
        <div className="space-y-4 animate-in fade-in-50 duration-200">
          <div className="p-3.5 bg-muted/30 border border-border/80 rounded-xl flex items-center justify-between flex-wrap gap-2 text-xs">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-primary" />
              <span>
                Targeted chapter tests created to master specific high-weightage topics and formulas.
              </span>
            </div>
            <Link href="/generate">
              <Button size="sm" variant="outline" className="text-xs h-7 gap-1">
                <Sparkles className="w-3 h-3 text-primary" />
                <span>Create New Chapter Drill</span>
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {chapterAndCustomTests.map((test) => (
              <Card key={test.id} className="p-5 flex flex-col justify-between hover:border-primary/50 transition-all hover:shadow-md">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge
                      variant={
                        test.testType === "FULL_LENGTH"
                          ? "default"
                          : test.testType === "CHAPTER_WISE"
                          ? "info"
                          : "secondary"
                      }
                      className="text-[10px]"
                    >
                      {test.testType.replace("_", " ")}
                    </Badge>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground font-mono">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {test.durationMinutes} Mins
                      </span>
                      <span>•</span>
                      <span>{test.totalMarks} Marks</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-foreground leading-snug">{test.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{test.description}</p>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-border text-[11px] text-muted-foreground">
                    <span className="font-semibold text-foreground">
                      {test.questions.length} Questions
                    </span>
                    <span>•</span>
                    <span>Pattern: {test.examId.toUpperCase()}</span>
                    {test.isDefaultMock && (
                      <>
                        <span>•</span>
                        <span className="text-emerald-600 font-medium">All-India Benchmarked</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="pt-4 mt-2 flex items-center justify-between border-t border-border">
                  <div className="text-[11px] text-muted-foreground">
                    Format: <strong className="text-foreground">CBT Engine</strong>
                  </div>

                  <Link href={`/tests/cbt/${test.id}`}>
                    <Button size="sm" className="gap-1.5 text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-semibold">
                      <Play className="w-3.5 h-3.5 fill-white" />
                      <span>Start Drill</span>
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* 3. Custom Test Builder Modal */}
      <Dialog open={isBuilderOpen} onOpenChange={setIsBuilderOpen}>
        <DialogContent className="max-w-xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold flex items-center gap-2">
              <Sliders className="w-5 h-5 text-primary" />
              <span>Custom Test Configuration</span>
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleCreateCustomTest} className="space-y-4 py-2">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-foreground">Test Title</label>
              <input
                type="text"
                value={testTitle}
                onChange={(e) => setTestTitle(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-input bg-background focus:ring-1 focus:ring-primary"
                required
              />
            </div>

            {/* Subject Selector */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-foreground">Target Subject</label>
              <select
                value={selectedSubjectId}
                onChange={(e) => {
                  setSelectedSubjectId(e.target.value);
                  const firstChap = CHAPTERS.find((c) => c.subjectId === e.target.value);
                  if (firstChap) setSelectedChapterIds([firstChap.id]);
                }}
                className="w-full text-xs p-2.5 rounded-lg border border-input bg-background focus:ring-1 focus:ring-primary"
              >
                {availableSubjects.map((s) => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>

            {/* Chapters Multiselect */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-foreground">Select Chapter(s)</label>
                <span className="text-[10px] text-muted-foreground font-mono">
                  {selectedChapterIds.length} selected
                </span>
              </div>
              <div className="max-h-44 overflow-y-auto p-2 border border-input rounded-lg space-y-1 bg-background">
                {availableChapters.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => handleToggleChapter(c.id)}
                    className={`w-full text-left text-xs p-2 rounded-md transition-colors flex items-center justify-between ${
                      selectedChapterIds.includes(c.id)
                        ? "bg-primary text-primary-foreground font-semibold"
                        : "hover:bg-muted text-foreground"
                    }`}
                  >
                    <span>{c.name}</span>
                    {selectedChapterIds.includes(c.id) && <Check className="w-3.5 h-3.5" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Duration Selector */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-foreground">Duration (Minutes)</label>
              <select
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(Number(e.target.value))}
                className="w-full text-xs p-2.5 rounded-lg border border-input bg-background focus:ring-1 focus:ring-primary font-mono"
              >
                <option value={15}>15 Minutes (Rapid Drill)</option>
                <option value={30}>30 Minutes (Standard Quiz)</option>
                <option value={45}>45 Minutes (Chapter Test)</option>
                <option value={60}>60 Minutes (Full Unit Practice)</option>
                <option value={180}>180 Minutes (Full Length 3-Hour)</option>
              </select>
            </div>

            {/* Question Sources Checkboxes */}
            <div className="space-y-2 pt-2 border-t border-border">
              <span className="text-xs font-semibold text-foreground block">Question Source Pool</span>
              <div className="flex items-center gap-4 text-xs">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includePYQs}
                    onChange={(e) => setIncludePYQs(e.target.checked)}
                    className="rounded text-primary focus:ring-primary"
                  />
                  <span>Include Official PYQs</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeGenerated}
                    onChange={(e) => setIncludeGenerated(e.target.checked)}
                    className="rounded text-primary focus:ring-primary"
                  />
                  <span>Include AI Generated Variations</span>
                </label>
              </div>
            </div>

            <div className="pt-3 border-t border-border flex items-center justify-end gap-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setIsBuilderOpen(false)}
                className="text-xs"
              >
                Cancel
              </Button>
              <Button type="submit" size="sm" className="text-xs gap-1.5">
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Launch CBT Exam</span>
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
