"use client";

import React from "react";
import Link from "next/link";
import { useAppStore } from "@/store/useAppStore";
import { EXAM_CONFIGURATIONS } from "@/mocks/examConfigurations";
import { MOCK_RECOMMENDATIONS } from "@/mocks/recommendations";
import {
  GraduationCap,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Target,
  Clock,
  CheckCircle2,
  AlertTriangle,
  FolderOpen,
  HelpCircle,
  FileText,
  BarChart2,
  Bookmark,
  BookOpen,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

export default function DashboardPage() {
  const { currentUser, selectedExamId, testAttempts, documents, bookmarks, pyqs } = useAppStore();

  const activeConfig = EXAM_CONFIGURATIONS[selectedExamId] || EXAM_CONFIGURATIONS["jee-main"];

  // Compute live consistent statistics from saved attempts
  const testsAttemptedCount = testAttempts.length;
  const totalCorrect = testAttempts.reduce((acc, curr) => acc + curr.correctCount, 0);
  const totalAttempted = testAttempts.reduce((acc, curr) => acc + curr.attemptedCount, 0);
  const overallAccuracy = totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0;
  const totalScoreEarned = testAttempts.reduce((acc, curr) => acc + curr.totalScore, 0);
  const totalMaxScore = testAttempts.reduce((acc, curr) => acc + curr.maxScore, 0);
  const averagePercentage = totalMaxScore > 0 ? Math.round((totalScoreEarned / totalMaxScore) * 100) : 0;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-8">
      {/* 1. Welcome & Primary Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-900 text-white p-6 md:p-8 border border-indigo-800/40 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-white/10 text-blue-200 text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5 text-blue-300" />
              <span>Diagnostic Phase: {currentUser.preparationStage}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome back, {currentUser.name}!
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Targeting <strong className="text-white">{activeConfig.name}</strong> ({activeConfig.currentYear}) with a goal score of{" "}
              <strong className="text-amber-300">{currentUser.targetScore} / {activeConfig.totalMarks} Marks</strong>.
              Your recent CBT attempts demonstrate high chemistry proficiency, with priority revision needed in mechanics.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5 shrink-0">
            <Link href="/tests">
              <Button className="bg-primary hover:bg-primary/90 text-white font-semibold text-xs gap-2 shadow-md">
                <FileText className="w-3.5 h-3.5" />
                <span>Launch Mock Test</span>
              </Button>
            </Link>
            <Link href="/library">
              <Button variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/20 text-xs gap-2">
                <FolderOpen className="w-3.5 h-3.5" />
                <span>Upload Material</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Top Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3.5">
        <Card className="p-4 space-y-1">
          <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Tests Attempted</span>
          <div className="text-2xl font-black text-foreground font-mono">{testsAttemptedCount}</div>
          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            <span>2 CBT Drills Logged</span>
          </div>
        </Card>

        <Card className="p-4 space-y-1">
          <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Average Accuracy</span>
          <div className="text-2xl font-black text-primary font-mono">{overallAccuracy}%</div>
          <div className="text-[11px] text-muted-foreground">
            {totalCorrect} correct of {totalAttempted}
          </div>
        </Card>

        <Card className="p-4 space-y-1">
          <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Score Performance</span>
          <div className="text-2xl font-black text-foreground font-mono">{averagePercentage}%</div>
          <div className="text-[11px] text-muted-foreground">
            {totalScoreEarned} / {totalMaxScore} marks total
          </div>
        </Card>

        <Card className="p-4 space-y-1">
          <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Saved Bookmarks</span>
          <div className="text-2xl font-black text-foreground font-mono">{bookmarks.length}</div>
          <div className="text-[11px] text-blue-600 dark:text-blue-400">
            Across 4 Notebooks
          </div>
        </Card>

        <Card className="p-4 space-y-1 col-span-2 md:col-span-1">
          <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Daily Goal</span>
          <div className="text-2xl font-black text-emerald-600 font-mono">
            {currentUser.dailyCompletedQuestions} / {currentUser.dailyGoalQuestions}
          </div>
          <Progress
            value={(currentUser.dailyCompletedQuestions / currentUser.dailyGoalQuestions) * 100}
            className="h-1.5 mt-1"
          />
        </Card>
      </div>

      {/* 3. Quick Action Ribbon */}
      <div className="flex flex-wrap gap-2 pt-1">
        <Link href="/pyqs">
          <Button variant="secondary" size="sm" className="text-xs gap-1.5 h-8">
            <HelpCircle className="w-3.5 h-3.5 text-primary" />
            <span>Explore PYQs by Chapter</span>
          </Button>
        </Link>
        <Link href="/generate">
          <Button variant="secondary" size="sm" className="text-xs gap-1.5 h-8">
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span>Generate Targeted Questions</span>
          </Button>
        </Link>
        <Link href="/weak-areas">
          <Button variant="secondary" size="sm" className="text-xs gap-1.5 h-8">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
            <span>Review 2 Weak Chapters</span>
          </Button>
        </Link>
        <Link href="/mentor">
          <Button variant="secondary" size="sm" className="text-xs gap-1.5 h-8">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            <span>Consult AI Mentor</span>
          </Button>
        </Link>
      </div>

      {/* 4. Main Two-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Subject Performance, Recent Tests, Weak Areas */}
        <div className="lg:col-span-2 space-y-6">
          {/* Subject Mastery Breakdown */}
          <Card>
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base">Subject Mastery Breakdown</CardTitle>
                <p className="text-xs text-muted-foreground">Derived from saved computer-based examinations</p>
              </div>
              <Link href="/analytics" className="text-xs text-primary font-medium hover:underline flex items-center gap-1">
                <span>Detailed Analytics</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">Chemistry (Organic & Bonding)</span>
                  <span className="font-mono font-bold">100% Accuracy (12/12 Marks)</span>
                </div>
                <Progress value={100} indicatorColor="bg-emerald-500" className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-blue-600 dark:text-blue-400">Physics (Mechanics & Electrostatics)</span>
                  <span className="font-mono font-bold">80% Accuracy (15/24 Marks)</span>
                </div>
                <Progress value={80} indicatorColor="bg-blue-500" className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-amber-600 dark:text-amber-400">Mathematics (Vectors & Calculus)</span>
                  <span className="font-mono font-bold">66.7% Accuracy (7/12 Marks)</span>
                </div>
                <Progress value={66.7} indicatorColor="bg-amber-500" className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Recent Test Attempts */}
          <Card>
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base">Recent Examination Attempts</CardTitle>
                <p className="text-xs text-muted-foreground">Historical test records with instant review</p>
              </div>
              <Link href="/history" className="text-xs text-primary font-medium hover:underline flex items-center gap-1">
                <span>View All History</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {testAttempts.map((att) => (
                  <div key={att.id} className="p-4 flex items-center justify-between hover:bg-muted/40 transition-colors">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-xs text-foreground">{att.testTitle}</span>
                        <Badge variant="outline" className="text-[10px] font-mono">
                          {att.examId.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                        <span>Score: <strong className="text-foreground">{att.totalScore}/{att.maxScore}</strong></span>
                        <span>•</span>
                        <span>Accuracy: <strong className="text-emerald-600">{att.accuracyPercentage}%</strong></span>
                        <span>•</span>
                        <span>Time: <strong>{Math.round(att.durationSeconds / 60)} min</strong></span>
                      </div>
                    </div>
                    <Link href={`/history/${att.id}`}>
                      <Button size="sm" variant="outline" className="text-xs h-7 px-2.5">
                        Review Solutions
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Weakest Chapters Callout */}
          <Card className="border-rose-200 dark:border-rose-950/60 bg-rose-50/30 dark:bg-rose-950/20">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-bold text-rose-700 dark:text-rose-400 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Priority Weak Chapters Requiring Revision</span>
                </CardTitle>
                <Link href="/weak-areas" className="text-xs text-rose-600 hover:underline">
                  Analyze Weaknesses →
                </Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 pt-1">
              <div className="flex items-center justify-between p-3 rounded-lg bg-card border border-border text-xs">
                <div>
                  <div className="font-semibold text-foreground">Laws of Motion & Friction</div>
                  <div className="text-[11px] text-muted-foreground">Missed 1 question on angle of repose vs inclination</div>
                </div>
                <Link href="/generate?chapter=chap-lom&subject=sub-phy">
                  <Button size="sm" variant="outline" className="h-7 text-xs border-rose-300 text-rose-700 hover:bg-rose-50">
                    Practice Chapter
                  </Button>
                </Link>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-card border border-border text-xs">
                <div>
                  <div className="font-semibold text-foreground">Definite Integrals & Properties</div>
                  <div className="text-[11px] text-muted-foreground">Algebraic slip on King&apos;s property upper limit</div>
                </div>
                <Link href="/generate?chapter=chap-defint&subject=sub-math">
                  <Button size="sm" variant="outline" className="h-7 text-xs border-amber-300 text-amber-700 hover:bg-amber-50">
                    Practice Chapter
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right 1 Col: AI Recommendations, Uploaded Docs, Bookmarks */}
        <div className="space-y-6">
          {/* Recommended Practice Actions */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                <span>Recommended for You</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {MOCK_RECOMMENDATIONS.map((rec) => (
                <div key={rec.id} className="p-3 rounded-xl border border-border bg-muted/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge variant={rec.priority === "HIGH" ? "destructive" : "secondary"} className="text-[10px]">
                      {rec.badge}
                    </Badge>
                    <span className="text-[11px] text-muted-foreground flex items-center gap-1 font-mono">
                      <Clock className="w-3 h-3" />
                      {rec.estimatedMinutes}m
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-foreground leading-snug">{rec.title}</h4>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{rec.subtitle}</p>
                  </div>
                  <Link href={rec.targetRoute} className="inline-block w-full">
                    <Button size="sm" variant="outline" className="w-full text-xs h-7 mt-1 font-medium">
                      {rec.actionText}
                    </Button>
                  </Link>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recently Uploaded Study Material */}
          <Card>
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-semibold">Active Study Materials</CardTitle>
              <Link href="/library" className="text-xs text-primary hover:underline">
                View All
              </Link>
            </CardHeader>
            <CardContent className="space-y-2.5">
              {documents.slice(0, 3).map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-2.5 rounded-lg border border-border text-xs">
                  <div className="space-y-0.5 truncate pr-2">
                    <p className="font-medium text-foreground truncate">{doc.title}</p>
                    <p className="text-[10px] text-muted-foreground font-mono">
                      {doc.fileSize} • {doc.extractedChapters.length} Chapters Extracted
                    </p>
                  </div>
                  <Badge variant="success" className="text-[10px] shrink-0">
                    Ready
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

