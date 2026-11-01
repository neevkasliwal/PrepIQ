"use client";

import React, { useState, useEffect, Suspense, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAppStore } from "@/store/useAppStore";
import { SUBJECTS } from "@/mocks/subjects";
import { CHAPTERS } from "@/mocks/chapters";
import { QuestionItem, Test } from "@/types";
import { MathView } from "@/components/ui/math-view";
import { synthesizeChapterQuestions } from "@/utils/chapterQuestionSynthesizer";
import { getExamMarking } from "@/utils/scoringEngine";
import {
  Sparkles,
  Zap,
  Sliders,
  Cpu,
  BookOpen,
  Award,
  CheckCircle2,
  XCircle,
  Eye,
  EyeOff,
  RotateCcw,
  HelpCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

function QuestionGeneratorContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    selectedExamId,
    documents,
    pyqs,
    generatedQuestions,
    addTest
  } = useAppStore();

  const urlParentPyq = searchParams.get("parentPyq");
  const urlChapter = searchParams.get("chapter");
  const urlDoc = searchParams.get("doc");
  const urlSubject = searchParams.get("subject");

  // Form states
  const [selectedSubject, setSelectedSubject] = useState<string>(urlSubject || "sub-phy");
  const [selectedChapter, setSelectedChapter] = useState<string>(urlChapter || "chap-lom");
  const [selectedDocId, setSelectedDocId] = useState<string>(urlDoc || "NONE");
  const [parentPyqId, setParentPyqId] = useState<string>(urlParentPyq || "NONE");
  const [difficulty, setDifficulty] = useState<string>("MEDIUM");
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [generationMode, setGenerationMode] = useState<string>(
    urlParentPyq ? "SIMILAR_PYQ" : urlDoc ? "DOCUMENT_BASED" : "TOPIC_WISE"
  );

  // Generation state
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationProgress, setGenerationProgress] = useState<number>(0);
  const [previewQuestions, setPreviewQuestions] = useState<QuestionItem[]>([]);

  // Interactive user attempt states for generated questions
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [numericalInputs, setNumericalInputs] = useState<Record<string, string>>({});
  const [revealedSolutions, setRevealedSolutions] = useState<Record<string, boolean>>({});

  // Current exam marking scheme
  const markingScheme = getExamMarking(selectedExamId, selectedSubject);

  // Synchronize available subjects when exam changes
  useEffect(() => {
    const available = SUBJECTS.filter(
      (s) => s.examId === selectedExamId || (selectedExamId === "jee-adv" && s.examId === "jee-main")
    );
    if (available.length > 0 && !available.some((s) => s.id === selectedSubject)) {
      const defaultSub = available[0].id;
      setSelectedSubject(defaultSub);
      const firstChap = CHAPTERS.find((c) => c.subjectId === defaultSub);
      if (firstChap) {
        setSelectedChapter(firstChap.id);
      }
    }
  }, [selectedExamId, selectedSubject]);

  // Synchronize chapter when subject changes
  const handleSubjectChange = (newSubId: string) => {
    setSelectedSubject(newSubId);
    const relevantChaps = CHAPTERS.filter((c) => c.subjectId === newSubId);
    if (relevantChaps.length > 0) {
      setSelectedChapter(relevantChaps[0].id);
    }
  };

  // Update when URL params change
  useEffect(() => {
    if (urlSubject) setSelectedSubject(urlSubject);
    if (urlChapter) setSelectedChapter(urlChapter);
    if (urlDoc) {
      setSelectedDocId(urlDoc);
      setGenerationMode("DOCUMENT_BASED");
    }
    if (urlParentPyq) {
      setParentPyqId(urlParentPyq);
      setGenerationMode("SIMILAR_PYQ");
    }
  }, [urlChapter, urlSubject, urlDoc, urlParentPyq]);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setGenerationProgress(20);

    // Reset interactive states when new batch is generated
    setUserAnswers({});
    setNumericalInputs({});
    setRevealedSolutions({});

    const stepInterval = setInterval(() => {
      setGenerationProgress((p) => {
        if (p >= 90) {
          clearInterval(stepInterval);
          return 90;
        }
        return p + 25;
      });
    }, 200);

    setTimeout(() => {
      clearInterval(stepInterval);
      setGenerationProgress(100);
      setIsGenerating(false);

      // Find the name of the selected chapter
      const currentChapObj = CHAPTERS.find((c) => c.id === selectedChapter);
      const chapterTitle = currentChapObj ? currentChapObj.name : "Target Chapter";

      // Synthesize strictly from this chapter
      const matched = synthesizeChapterQuestions(
        selectedChapter,
        chapterTitle,
        selectedSubject,
        selectedExamId,
        questionCount,
        difficulty as any,
        pyqs,
        generatedQuestions
      );

      setPreviewQuestions(matched);
    }, 900);
  };

  const handleSelectOption = (questionId: string, optIndex: number) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: optIndex
    }));
  };

  const handleNumericalSubmit = (questionId: string, val: string) => {
    setNumericalInputs((prev) => ({
      ...prev,
      [questionId]: val
    }));
    // Mark as answered
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: 1
    }));
  };

  const toggleSolution = (questionId: string) => {
    setRevealedSolutions((prev) => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  const resetQuestionAttempt = (questionId: string) => {
    setUserAnswers((prev) => {
      const next = { ...prev };
      delete next[questionId];
      return next;
    });
    setNumericalInputs((prev) => {
      const next = { ...prev };
      delete next[questionId];
      return next;
    });
    setRevealedSolutions((prev) => {
      const next = { ...prev };
      delete next[questionId];
      return next;
    });
  };

  const toggleAllSolutions = () => {
    const allRevealed = previewQuestions.every((q) => revealedSolutions[q.id]);
    const nextState: Record<string, boolean> = {};
    previewQuestions.forEach((q) => {
      nextState[q.id] = !allRevealed;
    });
    setRevealedSolutions(nextState);
  };

  // Practice stats summary
  const practiceStats = useMemo(() => {
    let attempted = 0;
    let correct = 0;
    let incorrect = 0;
    let score = 0;

    previewQuestions.forEach((q) => {
      const userAns = userAnswers[q.id];
      if (userAns !== undefined) {
        attempted++;
        let isRight = false;
        if (q.questionType === "NUMERICAL") {
          const inputVal = Number(numericalInputs[q.id]);
          const expected = Number(q.numericalAnswer);
          isRight = !isNaN(inputVal) && !isNaN(expected) && Math.abs(inputVal - expected) <= 0.05;
        } else {
          isRight = userAns === q.correctOption;
        }

        if (isRight) {
          correct++;
          score += markingScheme.positive;
        } else {
          incorrect++;
          score -= markingScheme.negative;
        }
      }
    });

    return { attempted, correct, incorrect, score };
  }, [previewQuestions, userAnswers, numericalInputs, markingScheme]);

  const handleCreateTestFromGenerated = () => {
    if (previewQuestions.length === 0) return;

    const currentChapObj = CHAPTERS.find((c) => c.id === selectedChapter);
    const chapterTitle = currentChapObj ? currentChapObj.name : "Target Chapter";

    const newTestId = `test-gen-${Date.now()}`;
    const newTest: Test = {
      id: newTestId,
      title: `${chapterTitle} — Practice Drill (${previewQuestions.length}Q)`,
      examId: selectedExamId,
      testType: "CUSTOM_PRACTICE",
      durationMinutes: previewQuestions.length * 3,
      totalMarks: previewQuestions.length * markingScheme.positive,
      questions: previewQuestions,
      subjectIds: [selectedSubject],
      description: `Targeted practice on ${chapterTitle} under ${selectedExamId.toUpperCase()} marking rules (+${markingScheme.positive} / -${markingScheme.negative}).`,
      createdAt: new Date().toISOString()
    };

    addTest(newTest);
    router.push(`/tests/cbt/${newTestId}`);
  };

  const activeChapterName = CHAPTERS.find((c) => c.id === selectedChapter)?.name || "Chapter";

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            AI Question Generation Engine
          </h1>
          <Badge variant="purple" className="text-[10px] font-mono">
            Interactive Practice Mode
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground mt-0.5">
          Generate questions strictly from your selected chapter. Attempt each problem first, receive real-time correct/incorrect feedback with exam marks, and reveal solutions on demand.
        </p>
      </div>

      {/* Main 2-Col Grid: Config vs Output */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Col: Config Form */}
        <Card className="lg:col-span-1 p-5 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-border">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
              <Sliders className="w-4 h-4 text-primary" />
              <span>Generation Parameters</span>
            </h3>
            <span className="text-[10px] text-muted-foreground font-mono">Exam: {selectedExamId.toUpperCase()}</span>
          </div>

          <form onSubmit={handleGenerate} className="space-y-3.5">
            {/* Examination Marking Scheme Indicator */}
            <div className="p-2.5 bg-muted/40 rounded-lg border border-border/70 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="w-3.5 h-3.5 text-primary" />
                <div>
                  <span className="text-[10px] uppercase font-bold text-muted-foreground block">
                    Marking Scheme
                  </span>
                  <span className="text-xs font-semibold text-foreground">
                    {markingScheme.label}
                  </span>
                </div>
              </div>
              <Badge variant="outline" className="text-xs font-mono font-bold border-emerald-500/40 text-emerald-600 dark:text-emerald-400">
                +{markingScheme.positive} / -{markingScheme.negative}
              </Badge>
            </div>

            {/* Generation Mode */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-muted-foreground uppercase">Generation Mode</label>
              <select
                value={generationMode}
                onChange={(e) => setGenerationMode(e.target.value)}
                className="w-full text-xs p-2 rounded-lg border border-input bg-background focus:ring-1 focus:ring-primary"
              >
                <option value="TOPIC_WISE">Topic-wise Conceptual Drill</option>
                <option value="SIMILAR_PYQ">Similar Question Variation (Parent PYQ)</option>
                <option value="DOCUMENT_BASED">Uploaded Document (Textbook Extraction)</option>
                <option value="WEAK_AREA">Weak-Area Diagnostic Drill</option>
              </select>
            </div>

            {/* Subject Selector */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-muted-foreground uppercase">Target Subject</label>
              <select
                value={selectedSubject}
                onChange={(e) => handleSubjectChange(e.target.value)}
                className="w-full text-xs p-2 rounded-lg border border-input bg-background focus:ring-1 focus:ring-primary"
              >
                {SUBJECTS.filter(
                  (s) => s.examId === selectedExamId || (selectedExamId === "jee-adv" && s.examId === "jee-main")
                ).map((s) => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>

            {/* Chapter Selector (Strictly filtered by selected subject) */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-semibold text-muted-foreground uppercase">
                  Target Chapter (Strict Isolation)
                </label>
                <span className="text-[10px] text-primary flex items-center gap-1 font-mono">
                  <BookOpen className="w-3 h-3" />
                  Only this chapter
                </span>
              </div>
              <select
                value={selectedChapter}
                onChange={(e) => setSelectedChapter(e.target.value)}
                className="w-full text-xs p-2 rounded-lg border border-input bg-background focus:ring-1 focus:ring-primary truncate font-medium"
              >
                {CHAPTERS.filter((c) => c.subjectId === selectedSubject).map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            {/* If Document Based Mode: Select Uploaded Document */}
            {generationMode === "DOCUMENT_BASED" && (
              <div className="space-y-1 animate-in fade-in-50">
                <label className="text-[11px] font-semibold text-muted-foreground uppercase">Source Study Document</label>
                <select
                  value={selectedDocId}
                  onChange={(e) => setSelectedDocId(e.target.value)}
                  className="w-full text-xs p-2 rounded-lg border border-input bg-background focus:ring-1 focus:ring-primary truncate"
                >
                  <option value="NONE">Select Uploaded PDF...</option>
                  {documents.map((d) => (
                    <option key={d.id} value={d.id}>{d.title}</option>
                  ))}
                </select>
              </div>
            )}

            {/* If Similar PYQ Mode: Select Parent PYQ */}
            {generationMode === "SIMILAR_PYQ" && (
              <div className="space-y-1 animate-in fade-in-50">
                <label className="text-[11px] font-semibold text-muted-foreground uppercase">Parent Reference PYQ</label>
                <select
                  value={parentPyqId}
                  onChange={(e) => setParentPyqId(e.target.value)}
                  className="w-full text-xs p-2 rounded-lg border border-input bg-background focus:ring-1 focus:ring-primary truncate"
                >
                  <option value="NONE">Select Base PYQ...</option>
                  {pyqs.map((q) => (
                    <option key={q.id} value={q.id}>
                      {q.sourceReference || q.id}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Difficulty & Count */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-muted-foreground uppercase">Difficulty</label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="w-full text-xs p-2 rounded-lg border border-input bg-background focus:ring-1 focus:ring-primary"
                >
                  <option value="EASY">Easy</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HARD">Hard</option>
                </select>
              </div>

              {/* Quantity: 5, 10, 15, 20, 25 */}
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-muted-foreground uppercase">Quantity</label>
                <select
                  value={questionCount}
                  onChange={(e) => setQuestionCount(Number(e.target.value))}
                  className="w-full text-xs p-2 rounded-lg border border-input bg-background focus:ring-1 focus:ring-primary font-medium"
                >
                  <option value={5}>5 Questions</option>
                  <option value={10}>10 Questions</option>
                  <option value={15}>15 Questions</option>
                  <option value={20}>20 Questions</option>
                  <option value={25}>25 Questions</option>
                </select>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isGenerating}
              className="w-full text-xs gap-2 mt-2"
            >
              <Zap className="w-4 h-4 text-amber-400" />
              <span>{isGenerating ? `Synthesizing ${questionCount} Questions...` : `Generate ${questionCount} Practice Questions`}</span>
            </Button>
          </form>

          {isGenerating && (
            <div className="space-y-2 pt-2 animate-in fade-in-50">
              <div className="flex justify-between text-[11px] text-muted-foreground">
                <span>Filtering strictly to {activeChapterName}...</span>
                <span className="font-mono">{generationProgress}%</span>
              </div>
              <Progress value={generationProgress} className="h-1.5" />
            </div>
          )}
        </Card>

        {/* Right 2 Cols: Generated Questions Output & Interactive Practice */}
        <div className="lg:col-span-2 space-y-4">
          {/* Top Bar above Preview */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                <span>Practice Questions ({previewQuestions.length})</span>
              </h3>
              {previewQuestions.length > 0 && (
                <Badge variant="secondary" className="text-[10px] font-mono">
                  {activeChapterName}
                </Badge>
              )}
            </div>

            {previewQuestions.length > 0 && (
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={toggleAllSolutions}
                  className="text-xs h-8 gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>
                    {previewQuestions.every((q) => revealedSolutions[q.id])
                      ? "Hide All Answers"
                      : "Reveal All Answers"}
                  </span>
                </Button>

                <Button
                  size="sm"
                  onClick={handleCreateTestFromGenerated}
                  className="text-xs h-8 gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
                >
                  <Cpu className="w-3.5 h-3.5" />
                  <span>Start CBT Test ({previewQuestions.length * markingScheme.positive} Marks)</span>
                </Button>
              </div>
            )}
          </div>

          {/* Interactive Progress Score Tracker */}
          {previewQuestions.length > 0 && (
            <div className="p-3 bg-muted/30 border border-border rounded-xl flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3">
                <span className="font-semibold text-foreground">
                  Practiced: <strong className="font-mono">{practiceStats.attempted}</strong> / {previewQuestions.length}
                </span>
                <span className="text-emerald-600 dark:text-emerald-400 font-mono font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> {practiceStats.correct} Correct
                </span>
                <span className="text-rose-600 dark:text-rose-400 font-mono font-semibold flex items-center gap-1">
                  <XCircle className="w-3.5 h-3.5" /> {practiceStats.incorrect} Incorrect
                </span>
              </div>

              <div className="flex items-center gap-1.5 font-mono">
                <span className="text-muted-foreground text-[11px] uppercase">Net Score:</span>
                <Badge
                  variant={practiceStats.score >= 0 ? "success" : "destructive"}
                  className="font-bold text-xs"
                >
                  {practiceStats.score >= 0 ? `+${practiceStats.score}` : practiceStats.score} Marks
                </Badge>
              </div>
            </div>
          )}

          {/* Question List */}
          {previewQuestions.length === 0 ? (
            <Card className="p-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto">
                <Sparkles className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-semibold text-foreground">No questions generated yet</h4>
              <p className="text-xs text-muted-foreground max-w-md mx-auto">
                Select your target chapter on the left and choose a quantity (up to 25 questions). You will be able to answer each question yourself, check if it is correct or incorrect, and view step-by-step solutions on demand.
              </p>
            </Card>
          ) : (
            <div className="space-y-4">
              {previewQuestions.map((q, idx) => {
                const userSelectedOpt = userAnswers[q.id];
                const isAttempted = userSelectedOpt !== undefined;
                const isSolutionShown = !!revealedSolutions[q.id];
                const isCorrect = userSelectedOpt === q.correctOption;

                return (
                  <Card key={q.id} className="p-5 space-y-3.5 border-border shadow-xs hover:border-border/80 transition-all">
                    {/* Top Row: Q Number, Marking, Tags */}
                    <div className="flex items-center justify-between pb-2 border-b border-border">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant="outline" className="text-[10px] font-mono font-bold">
                          Question {idx + 1}
                        </Badge>

                        {/* Marking Scheme Badge */}
                        <Badge variant="outline" className="text-[10px] font-mono border-emerald-500/40 text-emerald-600 dark:text-emerald-400 font-semibold">
                          +{markingScheme.positive} / -{markingScheme.negative} Marks
                        </Badge>

                        {/* Question Provenance Badge */}
                        <Badge
                          variant={
                            q.provenance === "ORIGINAL_PYQ"
                              ? "info"
                              : q.provenance === "GENERATED_SIMILAR"
                              ? "purple"
                              : "secondary"
                          }
                          className="text-[10px]"
                        >
                          {q.provenance === "ORIGINAL_PYQ"
                            ? "Authentic PYQ"
                            : q.provenance === "GENERATED_SIMILAR"
                            ? "PYQ Variation"
                            : "Topic Drill"}
                        </Badge>

                        <Badge variant="warning" className="text-[10px]">
                          {q.difficulty}
                        </Badge>
                      </div>

                      {q.sourceReference && (
                        <span className="text-[10px] text-muted-foreground font-mono truncate max-w-[200px]">
                          {q.sourceReference}
                        </span>
                      )}
                    </div>

                    {/* Question Statement with KaTeX */}
                    <div className="text-xs text-foreground font-medium leading-relaxed">
                      <MathView content={q.statement} />
                    </div>

                    {/* Multiple Choice Options: Interactive Attempt */}
                    {q.options && q.options.length > 0 && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                        {q.options.map((opt) => {
                          const isSelectedByStudent = userSelectedOpt === opt.index;
                          const isTheCorrectOption = opt.index === q.correctOption;

                          // Decide styling based on whether the user attempted or solution was revealed
                          let styleClasses = "border-border bg-card text-foreground hover:bg-muted/50 cursor-pointer";

                          if (isAttempted) {
                            if (isSelectedByStudent && isTheCorrectOption) {
                              // Student picked the correct option!
                              styleClasses = "border-2 border-emerald-500 bg-emerald-50/80 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-100 font-semibold shadow-xs";
                            } else if (isSelectedByStudent && !isTheCorrectOption) {
                              // Student picked the wrong option
                              styleClasses = "border-2 border-rose-500 bg-rose-50/80 dark:bg-rose-950/40 text-rose-950 dark:text-rose-100 font-semibold shadow-xs";
                            } else if (!isSelectedByStudent && isTheCorrectOption) {
                              // Show correct answer to help the student learn
                              styleClasses = "border-2 border-emerald-500/70 bg-emerald-50/40 dark:bg-emerald-950/20 text-emerald-900 dark:text-emerald-200 font-medium";
                            } else {
                              styleClasses = "border-border/60 bg-muted/20 text-muted-foreground opacity-60";
                            }
                          } else if (isSolutionShown) {
                            // Solution revealed without attempting
                            if (isTheCorrectOption) {
                              styleClasses = "border-2 border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-100 font-semibold";
                            } else {
                              styleClasses = "border-border/60 bg-muted/20 text-muted-foreground opacity-60";
                            }
                          }

                          return (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() => handleSelectOption(q.id, opt.index)}
                              className={`p-2.5 rounded-lg border text-left text-xs flex items-center justify-between gap-2 transition-all ${styleClasses}`}
                            >
                              <div className="flex items-center gap-2">
                                <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0 ${
                                  isAttempted && isSelectedByStudent
                                    ? isTheCorrectOption
                                      ? "bg-emerald-500 text-white"
                                      : "bg-rose-500 text-white"
                                    : "bg-muted text-muted-foreground"
                                }`}>
                                  {opt.label}
                                </span>
                                <MathView content={opt.text} />
                              </div>

                              {/* Small status indicator next to option */}
                              {isAttempted && isSelectedByStudent && isTheCorrectOption && (
                                <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold shrink-0">
                                  ✓ Your Answer (Correct)
                                </span>
                              )}
                              {isAttempted && isSelectedByStudent && !isTheCorrectOption && (
                                <span className="text-[11px] text-rose-600 dark:text-rose-400 font-semibold shrink-0">
                                  ✗ Your Answer (Incorrect)
                                </span>
                              )}
                              {isAttempted && !isSelectedByStudent && isTheCorrectOption && (
                                <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold shrink-0">
                                  ✓ Correct Option
                                </span>
                              )}
                              {!isAttempted && isSolutionShown && isTheCorrectOption && (
                                <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold shrink-0">
                                  ✓ Correct Option
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {/* Numerical Input Type */}
                    {q.questionType === "NUMERICAL" && (
                      <div className="p-3 bg-muted/20 border border-border rounded-lg space-y-2 max-w-md">
                        <label className="text-[11px] font-semibold text-muted-foreground block">
                          Enter your numerical answer:
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="number"
                            step="any"
                            placeholder="e.g. 15"
                            value={numericalInputs[q.id] || ""}
                            onChange={(e) => setNumericalInputs((prev) => ({ ...prev, [q.id]: e.target.value }))}
                            className="flex-1 px-3 py-1.5 text-xs rounded-md border border-input bg-background font-mono focus:ring-1 focus:ring-primary"
                          />
                          <Button
                            size="sm"
                            type="button"
                            onClick={() => handleNumericalSubmit(q.id, numericalInputs[q.id] || "")}
                            className="text-xs h-8"
                          >
                            Check
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Feedback & Action Bar */}
                    <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-border/60">
                      {/* Left: Attempt Result Feedback */}
                      <div>
                        {isAttempted ? (
                          isCorrect ? (
                            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                              <CheckCircle2 className="w-4 h-4" />
                              <span>Correct! +{markingScheme.positive.toFixed(2)} Marks awarded</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-600 dark:text-rose-400">
                              <XCircle className="w-4 h-4" />
                              <span>
                                Incorrect. Penalty: -{markingScheme.negative.toFixed(2)} Marks
                                {q.options && ` (Correct Answer: Option ${q.options.find((o) => o.index === q.correctOption)?.label})`}
                              </span>
                            </div>
                          )
                        ) : (
                          <div className="text-[11px] text-muted-foreground flex items-center gap-1">
                            <HelpCircle className="w-3.5 h-3.5 text-primary" />
                            <span>Select an option above to test your answer</span>
                          </div>
                        )}
                      </div>

                      {/* Right: Buttons to Reveal Solution / Try Again */}
                      <div className="flex items-center gap-2">
                        {isAttempted && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => resetQuestionAttempt(q.id)}
                            className="text-xs h-7 text-muted-foreground hover:text-foreground"
                          >
                            <RotateCcw className="w-3 h-3 mr-1" />
                            <span>Try Again</span>
                          </Button>
                        )}

                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => toggleSolution(q.id)}
                          className="text-xs h-7 gap-1.5 font-medium border-border hover:bg-muted"
                        >
                          {isSolutionShown ? (
                            <>
                              <EyeOff className="w-3.5 h-3.5 text-muted-foreground" />
                              <span>Hide Solution</span>
                            </>
                          ) : (
                            <>
                              <Eye className="w-3.5 h-3.5 text-primary" />
                              <span>Show Answer & Solution</span>
                            </>
                          )}
                        </Button>
                      </div>
                    </div>

                    {/* Step-by-Step Solution (Revealed on demand or when requested) */}
                    {isSolutionShown && q.stepByStepSolution && q.stepByStepSolution.length > 0 && (
                      <div className="p-3.5 bg-muted/40 rounded-lg space-y-2 text-xs border border-border/80 animate-in fade-in-50">
                        <div className="flex items-center justify-between pb-1 border-b border-border/60">
                          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                            Verified Solution Walkthrough
                          </span>
                          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                            Correct Option: {q.options?.find((o) => o.index === q.correctOption)?.label || q.correctOption}
                          </span>
                        </div>
                        <div className="space-y-1.5 text-muted-foreground text-[11px]">
                          {q.stepByStepSolution.map((s, sIdx) => (
                            <div key={sIdx} className="flex items-start gap-1.5">
                              <span className="font-mono text-primary font-bold">{sIdx + 1}.</span>
                              <MathView content={s} />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function GenerateQuestionsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-xs text-muted-foreground">Loading Question Generator...</div>}>
      <QuestionGeneratorContent />
    </Suspense>
  );
}
