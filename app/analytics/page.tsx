"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useAppStore } from "@/store/useAppStore";
import { QUIZRR_DEMO_DATA, QuizrrAnalysisData } from "@/mocks/quizrrDemoData";
import { MathView } from "@/components/ui/math-view";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  AreaChart,
  Area
} from "recharts";
import {
  LayoutDashboard,
  BarChart2,
  Clock,
  CheckSquare,
  Gauge,
  Milestone,
  GitCommit,
  ListOrdered,
  AlertOctagon,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Eye,
  BookOpen,
  TrendingUp,
  Trophy,
  ArrowRight,
  Filter,
  Check,
  X,
  Target
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type AnalysisTab =
  | "OVERVIEW"
  | "PERFORMANCE"
  | "TIME"
  | "ATTEMPT"
  | "DIFFICULTY"
  | "MOVEMENT"
  | "JOURNEY"
  | "QUESTIONS"
  | "MISTAKES";

export default function AnalyticsPage() {
  const { testAttempts } = useAppStore();

  // Active Tab state (default to OVERVIEW)
  const [activeTab, setActiveTab] = useState<AnalysisTab>("OVERVIEW");

  // Active question filter in "Qs by Qs Analysis"
  const [qsSubjectFilter, setQsSubjectFilter] = useState<string>("ALL");
  const [qsStatusFilter, setQsStatusFilter] = useState<string>("ALL");

  // Selected question for solution modal
  const [selectedSolutionQuestion, setSelectedSolutionQuestion] = useState<any | null>(null);

  // We use the authentic Quizrr Demo dataset as the primary benchmark
  const data: QuizrrAnalysisData = QUIZRR_DEMO_DATA;

  // Filtered questions for Qs by Qs Analysis
  const filteredQuestions = useMemo(() => {
    return data.questionsLog.filter((q) => {
      const matchSub = qsSubjectFilter === "ALL" || q.subject.toUpperCase() === qsSubjectFilter.toUpperCase();
      const matchStatus = qsStatusFilter === "ALL" || q.status === qsStatusFilter;
      return matchSub && matchStatus;
    });
  }, [data.questionsLog, qsSubjectFilter, qsStatusFilter]);

  // Mistakes list
  const mistakeQuestions = useMemo(() => {
    return data.questionsLog.filter((q) => q.status === "INCORRECT");
  }, [data.questionsLog]);

  return (
    <div className="space-y-5 max-w-7xl mx-auto pb-12 font-sans">
      {/* 1. Quizrr / MathonGo Top Header & Breadcrumbs */}
      <div className="p-4 sm:p-5 bg-card border border-border rounded-xl shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border/70">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
              <span className="text-primary font-bold">Quizrr Powered</span>
              <span>/</span>
              <span>{data.examName}</span>
              <span>/</span>
              <span className="text-foreground font-medium">{data.testTitle}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-foreground flex items-center gap-2">
              <span>Detailed Test Analysis</span>
              <Badge className="bg-emerald-600 hover:bg-emerald-700 text-white font-mono text-[10px]">
                {data.overallPercentile} Percentile
              </Badge>
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setActiveTab("MISTAKES")}
              className={`text-xs gap-1.5 h-8 font-semibold ${
                activeTab === "MISTAKES" ? "border-rose-500 bg-rose-50/50 dark:bg-rose-950/30 text-rose-600" : ""
              }`}
            >
              <AlertOctagon className="w-3.5 h-3.5 text-rose-500" />
              <span>My Mistakes ({mistakeQuestions.length})</span>
            </Button>

            <Link href="/tests">
              <Button size="sm" className="text-xs h-8 gap-1.5 bg-primary text-primary-foreground font-medium">
                <span>Attempt Another Test</span>
                <ArrowRight className="w-3 h-3" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Quick Highlights Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-6 gap-2.5 text-center">
          <div className="p-2.5 rounded-lg bg-muted/40 border border-border/60">
            <span className="text-[10px] text-muted-foreground uppercase font-bold block">Score</span>
            <span className="text-base sm:text-lg font-black text-foreground font-mono">
              {data.overallScore} <span className="text-xs text-muted-foreground font-normal">/ {data.totalMarks}</span>
            </span>
          </div>

          <div className="p-2.5 rounded-lg bg-muted/40 border border-border/60">
            <span className="text-[10px] text-muted-foreground uppercase font-bold block">All India Rank</span>
            <span className="text-base sm:text-lg font-black text-primary font-mono">
              AIR {data.overallRank} <span className="text-[10px] text-muted-foreground font-normal">/ {data.totalRanks.toLocaleString()}</span>
            </span>
          </div>

          <div className="p-2.5 rounded-lg bg-muted/40 border border-border/60">
            <span className="text-[10px] text-muted-foreground uppercase font-bold block">Accuracy</span>
            <span className="text-base sm:text-lg font-black text-emerald-600 dark:text-emerald-400 font-mono">
              {data.accuracyPercentage}%
            </span>
          </div>

          <div className="p-2.5 rounded-lg bg-muted/40 border border-border/60">
            <span className="text-[10px] text-muted-foreground uppercase font-bold block">Attempted</span>
            <span className="text-base sm:text-lg font-black text-foreground font-mono">
              {data.attemptedQuestions} <span className="text-xs text-muted-foreground font-normal">/ {data.totalQuestions}</span>
            </span>
          </div>

          <div className="p-2.5 rounded-lg bg-muted/40 border border-border/60">
            <span className="text-[10px] text-muted-foreground uppercase font-bold block">Time Taken</span>
            <span className="text-base sm:text-lg font-black text-foreground font-mono">
              {data.timeTakenMinutes}m <span className="text-xs text-muted-foreground font-normal">/ {data.durationMinutes}m</span>
            </span>
          </div>

          <div className="p-2.5 rounded-lg bg-muted/40 border border-border/60">
            <span className="text-[10px] text-muted-foreground uppercase font-bold block">Negative Marks</span>
            <span className="text-base sm:text-lg font-black text-rose-600 dark:text-rose-400 font-mono">
              -{data.marksLost}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Official 8 MathonGo / Quizrr Navigation Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none border-b border-border text-xs">
        <button
          type="button"
          onClick={() => setActiveTab("OVERVIEW")}
          className={`px-3 py-2 rounded-lg font-semibold flex items-center gap-1.5 whitespace-nowrap transition-colors ${
            activeTab === "OVERVIEW"
              ? "bg-primary text-primary-foreground shadow-xs"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          }`}
        >
          <LayoutDashboard className="w-3.5 h-3.5" />
          <span>Overview</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("PERFORMANCE")}
          className={`px-3 py-2 rounded-lg font-semibold flex items-center gap-1.5 whitespace-nowrap transition-colors ${
            activeTab === "PERFORMANCE"
              ? "bg-primary text-primary-foreground shadow-xs"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          }`}
        >
          <BarChart2 className="w-3.5 h-3.5" />
          <span>Performance Analysis</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("TIME")}
          className={`px-3 py-2 rounded-lg font-semibold flex items-center gap-1.5 whitespace-nowrap transition-colors ${
            activeTab === "TIME"
              ? "bg-primary text-primary-foreground shadow-xs"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>Time Analysis</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("ATTEMPT")}
          className={`px-3 py-2 rounded-lg font-semibold flex items-center gap-1.5 whitespace-nowrap transition-colors ${
            activeTab === "ATTEMPT"
              ? "bg-primary text-primary-foreground shadow-xs"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          }`}
        >
          <CheckSquare className="w-3.5 h-3.5" />
          <span>Attempt Analysis</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("DIFFICULTY")}
          className={`px-3 py-2 rounded-lg font-semibold flex items-center gap-1.5 whitespace-nowrap transition-colors ${
            activeTab === "DIFFICULTY"
              ? "bg-primary text-primary-foreground shadow-xs"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          }`}
        >
          <Gauge className="w-3.5 h-3.5" />
          <span>Difficulty Analysis</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("MOVEMENT")}
          className={`px-3 py-2 rounded-lg font-semibold flex items-center gap-1.5 whitespace-nowrap transition-colors ${
            activeTab === "MOVEMENT"
              ? "bg-primary text-primary-foreground shadow-xs"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          }`}
        >
          <Milestone className="w-3.5 h-3.5" />
          <span>Subject Movement</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("JOURNEY")}
          className={`px-3 py-2 rounded-lg font-semibold flex items-center gap-1.5 whitespace-nowrap transition-colors ${
            activeTab === "JOURNEY"
              ? "bg-primary text-primary-foreground shadow-xs"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          }`}
        >
          <GitCommit className="w-3.5 h-3.5" />
          <span>Question Journey</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("QUESTIONS")}
          className={`px-3 py-2 rounded-lg font-semibold flex items-center gap-1.5 whitespace-nowrap transition-colors ${
            activeTab === "QUESTIONS"
              ? "bg-primary text-primary-foreground shadow-xs"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          }`}
        >
          <ListOrdered className="w-3.5 h-3.5" />
          <span>Qs by Qs Analysis</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("MISTAKES")}
          className={`px-3 py-2 rounded-lg font-semibold flex items-center gap-1.5 whitespace-nowrap transition-colors ${
            activeTab === "MISTAKES"
              ? "bg-rose-600 text-white shadow-xs"
              : "text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40"
          }`}
        >
          <AlertOctagon className="w-3.5 h-3.5" />
          <span>My Mistakes</span>
        </button>
      </div>

      {/* 3. TAB CONTENT ROUTER */}

      {/* ======================================================== */}
      {/* TAB 1: OVERVIEW */}
      {/* ======================================================== */}
      {activeTab === "OVERVIEW" && (
        <div className="space-y-6 animate-in fade-in-50 duration-200">
          {/* Percentile Prediction Hero */}
          <Card className="p-6 bg-gradient-to-br from-indigo-950/20 via-background to-blue-950/20 border-primary/20 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-primary">
                  Predicted National Percentile
                </span>
                <div className="text-4xl sm:text-5xl font-black text-foreground font-mono flex items-baseline gap-2">
                  <span>{data.overallPercentile}</span>
                  <span className="text-xs text-muted-foreground font-sans font-normal">
                    (Top 0.1% Club)
                  </span>
                </div>
              </div>
              <div className="p-3 bg-muted/40 rounded-xl border border-border text-xs text-muted-foreground max-w-sm">
                <p className="font-medium text-foreground">{data.consolationText}</p>
                <p className="text-[11px] mt-0.5">{data.percentileDescription}</p>
              </div>
            </div>
          </Card>

          {/* 3 Subject Performance Cards with Authentic Quizrr Colors */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Physics Card (#37B24D) */}
            <Card className="p-5 border-l-4 border-l-[#37B24D] space-y-3 bg-card shadow-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#37B24D]" />
                  <h3 className="font-bold text-foreground text-sm">Physics</h3>
                </div>
                <Badge variant="outline" className="text-xs font-mono font-bold text-[#37B24D] border-[#37B24D]/40">
                  {data.subjects.physics.percentile} %ile
                </Badge>
              </div>

              <div className="flex items-baseline justify-between pt-1">
                <div className="text-2xl font-black text-foreground font-mono">
                  {data.subjects.physics.markScored} <span className="text-xs text-muted-foreground font-normal">/ 100</span>
                </div>
                <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 font-mono">
                  {data.subjects.physics.accuracy}% Accuracy
                </div>
              </div>

              <div className="grid grid-cols-3 gap-1.5 text-center text-xs pt-1 border-t border-border/60">
                <div className="p-1.5 rounded bg-muted/40">
                  <span className="text-[10px] text-muted-foreground block">Correct</span>
                  <span className="font-bold text-emerald-600">{data.subjects.physics.correct}</span>
                </div>
                <div className="p-1.5 rounded bg-muted/40">
                  <span className="text-[10px] text-muted-foreground block">Wrong</span>
                  <span className="font-bold text-rose-600">{data.subjects.physics.incorrect}</span>
                </div>
                <div className="p-1.5 rounded bg-muted/40">
                  <span className="text-[10px] text-muted-foreground block">Time</span>
                  <span className="font-bold font-mono">{data.subjects.physics.timeSpentMinutes}m</span>
                </div>
              </div>
            </Card>

            {/* Chemistry Card (#FF8C33) */}
            <Card className="p-5 border-l-4 border-l-[#FF8C33] space-y-3 bg-card shadow-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#FF8C33]" />
                  <h3 className="font-bold text-foreground text-sm">Chemistry</h3>
                </div>
                <Badge variant="outline" className="text-xs font-mono font-bold text-[#FF8C33] border-[#FF8C33]/40">
                  {data.subjects.chemistry.percentile} %ile
                </Badge>
              </div>

              <div className="flex items-baseline justify-between pt-1">
                <div className="text-2xl font-black text-foreground font-mono">
                  {data.subjects.chemistry.markScored} <span className="text-xs text-muted-foreground font-normal">/ 100</span>
                </div>
                <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 font-mono">
                  {data.subjects.chemistry.accuracy}% Accuracy
                </div>
              </div>

              <div className="grid grid-cols-3 gap-1.5 text-center text-xs pt-1 border-t border-border/60">
                <div className="p-1.5 rounded bg-muted/40">
                  <span className="text-[10px] text-muted-foreground block">Correct</span>
                  <span className="font-bold text-emerald-600">{data.subjects.chemistry.correct}</span>
                </div>
                <div className="p-1.5 rounded bg-muted/40">
                  <span className="text-[10px] text-muted-foreground block">Wrong</span>
                  <span className="font-bold text-rose-600">{data.subjects.chemistry.incorrect}</span>
                </div>
                <div className="p-1.5 rounded bg-muted/40">
                  <span className="text-[10px] text-muted-foreground block">Time</span>
                  <span className="font-bold font-mono">{data.subjects.chemistry.timeSpentMinutes}m</span>
                </div>
              </div>
            </Card>

            {/* Mathematics Card (#0086FF) */}
            <Card className="p-5 border-l-4 border-l-[#0086FF] space-y-3 bg-card shadow-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#0086FF]" />
                  <h3 className="font-bold text-foreground text-sm">Mathematics</h3>
                </div>
                <Badge variant="outline" className="text-xs font-mono font-bold text-[#0086FF] border-[#0086FF]/40">
                  {data.subjects.mathematics.percentile} %ile
                </Badge>
              </div>

              <div className="flex items-baseline justify-between pt-1">
                <div className="text-2xl font-black text-foreground font-mono">
                  {data.subjects.mathematics.markScored} <span className="text-xs text-muted-foreground font-normal">/ 100</span>
                </div>
                <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 font-mono">
                  {data.subjects.mathematics.accuracy}% Accuracy
                </div>
              </div>

              <div className="grid grid-cols-3 gap-1.5 text-center text-xs pt-1 border-t border-border/60">
                <div className="p-1.5 rounded bg-muted/40">
                  <span className="text-[10px] text-muted-foreground block">Correct</span>
                  <span className="font-bold text-emerald-600">{data.subjects.mathematics.correct}</span>
                </div>
                <div className="p-1.5 rounded bg-muted/40">
                  <span className="text-[10px] text-muted-foreground block">Wrong</span>
                  <span className="font-bold text-rose-600">{data.subjects.mathematics.incorrect}</span>
                </div>
                <div className="p-1.5 rounded bg-muted/40">
                  <span className="text-[10px] text-muted-foreground block">Time</span>
                  <span className="font-bold font-mono">{data.subjects.mathematics.timeSpentMinutes}m</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Performance Summary Matrix Table */}
          <Card className="p-5 space-y-3">
            <h3 className="font-bold text-sm text-foreground">Section-wise Performance Breakdown</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="border-b border-border bg-muted/40 text-[11px] font-semibold text-muted-foreground uppercase">
                    <th className="py-2.5 px-3">Subject</th>
                    <th className="py-2.5 px-3">Attempted / Total</th>
                    <th className="py-2.5 px-3">Correct</th>
                    <th className="py-2.5 px-3">Incorrect</th>
                    <th className="py-2.5 px-3">Unattempted</th>
                    <th className="py-2.5 px-3">Accuracy</th>
                    <th className="py-2.5 px-3">Time Spent</th>
                    <th className="py-2.5 px-3 text-right">Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {Object.values(data.subjects).map((sub) => (
                    <tr key={sub.id} className="hover:bg-muted/30">
                      <td className="py-3 px-3 font-semibold flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: sub.color }} />
                        {sub.title}
                      </td>
                      <td className="py-3 px-3 font-mono">{sub.correct + sub.incorrect} / {sub.totalQuestions}</td>
                      <td className="py-3 px-3 font-mono text-emerald-600 font-bold">{sub.correct}</td>
                      <td className="py-3 px-3 font-mono text-rose-600 font-bold">{sub.incorrect}</td>
                      <td className="py-3 px-3 font-mono text-muted-foreground">{sub.unattempted}</td>
                      <td className="py-3 px-3 font-mono font-semibold">{sub.accuracy}%</td>
                      <td className="py-3 px-3 font-mono">{sub.timeSpentMinutes}m</td>
                      <td className="py-3 px-3 text-right font-mono font-bold text-foreground">
                        {sub.markScored} / {sub.totalScore}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-muted/20 font-bold border-t-2 border-border">
                    <td className="py-3 px-3 font-black text-foreground">Total / Overall</td>
                    <td className="py-3 px-3 font-mono">{data.attemptedQuestions} / {data.totalQuestions}</td>
                    <td className="py-3 px-3 font-mono text-emerald-600">57</td>
                    <td className="py-3 px-3 font-mono text-rose-600">2</td>
                    <td className="py-3 px-3 font-mono text-muted-foreground">16</td>
                    <td className="py-3 px-3 font-mono text-emerald-600">{data.accuracyPercentage}%</td>
                    <td className="py-3 px-3 font-mono">{data.timeTakenMinutes}m</td>
                    <td className="py-3 px-3 text-right font-mono font-black text-primary">
                      {data.overallScore} / {data.totalMarks}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 2: PERFORMANCE ANALYSIS */}
      {/* ======================================================== */}
      {activeTab === "PERFORMANCE" && (
        <div className="space-y-6 animate-in fade-in-50 duration-200">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Score Comparison Chart */}
            <Card className="lg:col-span-2 p-5 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-border">
                <div>
                  <h3 className="font-bold text-sm text-foreground">Marks Scored vs Total Available</h3>
                  <p className="text-xs text-muted-foreground">Direct subject score compared against maximum marks</p>
                </div>
                <Badge variant="outline" className="text-xs font-mono font-bold text-primary">
                  {data.overallScore} / {data.totalMarks}
                </Badge>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { name: "Physics", scored: 90, total: 100, fill: "#37B24D" },
                      { name: "Chemistry", scored: 91, total: 100, fill: "#FF8C33" },
                      { name: "Mathematics", scored: 77, total: 100, fill: "#0086FF" },
                      { name: "Overall", scored: 226, total: 300, fill: "#364FC7" }
                    ]}
                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const d = payload[0].payload;
                          return (
                            <div className="p-2.5 bg-popover text-popover-foreground rounded-lg border border-border shadow-md text-xs font-mono">
                              <p className="font-bold font-sans">{d.name}</p>
                              <p className="text-emerald-600 font-semibold">Scored: {d.scored} Marks</p>
                              <p className="text-muted-foreground">Total: {d.total} Marks</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar dataKey="scored" radius={[6, 6, 0, 0]}>
                      {[
                        { fill: "#37B24D" },
                        { fill: "#FF8C33" },
                        { fill: "#0086FF" },
                        { fill: "#364FC7" }
                      ].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Score Potential Card */}
            <Card className="p-5 space-y-4 bg-muted/20 border-border">
              <div className="flex items-center gap-2 pb-2 border-b border-border">
                <Trophy className="w-4 h-4 text-amber-500" />
                <h3 className="font-bold text-sm text-foreground">Score Potential Calculator</h3>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-lg bg-card border border-border space-y-1">
                  <span className="text-[10px] text-muted-foreground uppercase font-semibold">Current Score</span>
                  <div className="text-2xl font-black text-foreground font-mono">226 / 300</div>
                </div>

                <div className="p-3 rounded-lg bg-card border border-border space-y-1">
                  <span className="text-[10px] text-rose-500 uppercase font-semibold">Marks Lost in Negatives</span>
                  <div className="text-2xl font-black text-rose-600 dark:text-rose-400 font-mono">-2 Marks</div>
                  <p className="text-[11px] text-muted-foreground">2 incorrect questions cost -1 mark penalty each</p>
                </div>

                <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 space-y-1">
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 uppercase font-bold">
                    Potential Score Without Negatives
                  </span>
                  <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
                    228 / 300
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    Projected rank increase: <strong className="text-foreground">AIR 77 → AIR 54</strong>
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 3: TIME ANALYSIS */}
      {/* ======================================================== */}
      {activeTab === "TIME" && (
        <div className="space-y-6 animate-in fade-in-50 duration-200">
          {/* Quality of Time Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="p-5 border-l-4 border-l-emerald-500 space-y-1">
              <span className="text-[11px] font-bold text-muted-foreground uppercase">Time on Correct Questions</span>
              <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
                {data.qualityOfTime.timeSpentCorrect} mins
              </div>
              <p className="text-xs text-muted-foreground">71% of test time spent productively</p>
            </Card>

            <Card className="p-5 border-l-4 border-l-rose-500 space-y-1">
              <span className="text-[11px] font-bold text-muted-foreground uppercase">Time on Incorrect Questions</span>
              <div className="text-3xl font-black text-rose-600 dark:text-rose-400 font-mono">
                {data.qualityOfTime.timeSpentIncorrect} mins
              </div>
              <p className="text-xs text-muted-foreground">Only 2% wasted on faulty attempts</p>
            </Card>

            <Card className="p-5 border-l-4 border-l-blue-500 space-y-1">
              <span className="text-[11px] font-bold text-muted-foreground uppercase">Time on Unattempted Questions</span>
              <div className="text-3xl font-black text-blue-600 dark:text-blue-400 font-mono">
                {data.qualityOfTime.timeSpentUnattempted} mins
              </div>
              <p className="text-xs text-muted-foreground">27% spent reading, filtering & skipping</p>
            </Card>
          </div>

          {/* Time Journey Across 30m Intervals */}
          <Card className="p-5 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-border">
              <div>
                <h3 className="font-bold text-sm text-foreground">Time Journey by 30-Minute Blocks</h3>
                <p className="text-xs text-muted-foreground">Question solving pace and strike rate across the examination duration</p>
              </div>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.qualityOfTime.intervals} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="interval" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Bar dataKey="correct" fill="#10b981" name="Correct Solved" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="incorrect" fill="#ef4444" name="Incorrect" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 4: ATTEMPT ANALYSIS */}
      {/* ======================================================== */}
      {activeTab === "ATTEMPT" && (
        <div className="space-y-6 animate-in fade-in-50 duration-200">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            <Card className="p-4 bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-500/30 space-y-1">
              <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase">
                Perfect Attempts
              </span>
              <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
                {data.attemptQuality.perfect}
              </div>
              <p className="text-[11px] text-muted-foreground">Correct & within ideal benchmark</p>
            </Card>

            <Card className="p-4 bg-amber-50/50 dark:bg-amber-950/20 border-amber-500/30 space-y-1">
              <span className="text-[10px] font-bold text-amber-700 dark:text-amber-400 uppercase">
                Confused / Hesitant
              </span>
              <div className="text-3xl font-black text-amber-600 dark:text-amber-400 font-mono">
                {data.attemptQuality.confused}
              </div>
              <p className="text-[11px] text-muted-foreground">Multiple visits or option toggled</p>
            </Card>

            <Card className="p-4 bg-blue-50/50 dark:bg-blue-950/20 border-blue-500/30 space-y-1">
              <span className="text-[10px] font-bold text-blue-700 dark:text-blue-400 uppercase">
                Overtime Attempts
              </span>
              <div className="text-3xl font-black text-blue-600 dark:text-blue-400 font-mono">
                {data.attemptQuality.overtime}
              </div>
              <p className="text-[11px] text-muted-foreground">Correct but exceeded target time</p>
            </Card>

            <Card className="p-4 bg-rose-50/50 dark:bg-rose-950/20 border-rose-500/30 space-y-1">
              <span className="text-[10px] font-bold text-rose-700 dark:text-rose-400 uppercase">
                Wasted Attempts
              </span>
              <div className="text-3xl font-black text-rose-600 dark:text-rose-400 font-mono">
                {data.attemptQuality.wasted}
              </div>
              <p className="text-[11px] text-muted-foreground">Wrong after prolonged time spent</p>
            </Card>
          </div>

          {/* Subject-Wise Attempt Quality Table */}
          <Card className="p-5 space-y-3">
            <h3 className="font-bold text-sm text-foreground">Attempt Quality by Subject</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-border bg-muted/40 text-[11px] font-semibold text-muted-foreground uppercase">
                    <th className="py-2.5 px-3">Subject</th>
                    <th className="py-2.5 px-3">Perfect Attempts</th>
                    <th className="py-2.5 px-3">Confused Attempts</th>
                    <th className="py-2.5 px-3">Overtime</th>
                    <th className="py-2.5 px-3">Wasted Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr className="hover:bg-muted/30">
                    <td className="py-3 px-3 font-semibold text-[#37B24D]">Physics</td>
                    <td className="py-3 px-3 font-mono text-emerald-600 font-bold">20 questions (83%)</td>
                    <td className="py-3 px-3 font-mono text-muted-foreground">0</td>
                    <td className="py-3 px-3 font-mono text-muted-foreground">0</td>
                    <td className="py-3 px-3 font-mono text-muted-foreground">0</td>
                  </tr>
                  <tr className="hover:bg-muted/30">
                    <td className="py-3 px-3 font-semibold text-[#FF8C33]">Chemistry</td>
                    <td className="py-3 px-3 font-mono text-emerald-600 font-bold">19 questions (95%)</td>
                    <td className="py-3 px-3 font-mono text-muted-foreground">0</td>
                    <td className="py-3 px-3 font-mono text-muted-foreground">0</td>
                    <td className="py-3 px-3 font-mono text-muted-foreground">0</td>
                  </tr>
                  <tr className="hover:bg-muted/30">
                    <td className="py-3 px-3 font-semibold text-[#0086FF]">Mathematics</td>
                    <td className="py-3 px-3 font-mono text-emerald-600 font-bold">7 questions (47%)</td>
                    <td className="py-3 px-3 font-mono text-amber-600 font-bold">3 questions</td>
                    <td className="py-3 px-3 font-mono text-muted-foreground">0</td>
                    <td className="py-3 px-3 font-mono text-muted-foreground">0</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 5: DIFFICULTY ANALYSIS */}
      {/* ======================================================== */}
      {activeTab === "DIFFICULTY" && (
        <div className="space-y-6 animate-in fade-in-50 duration-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-5 border-t-4 border-t-emerald-500 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-foreground">Easy Tier</h3>
                <Badge variant="success" className="text-xs font-mono">100% Accuracy</Badge>
              </div>
              <div className="text-2xl font-black text-foreground font-mono">
                {data.difficultyAnalysis.easy.correct} Correct
              </div>
              <p className="text-xs text-muted-foreground">
                0 Incorrect, {data.difficultyAnalysis.easy.unattempted} Unattempted of {data.difficultyAnalysis.easy.total} total
              </p>
            </Card>

            <Card className="p-5 border-t-4 border-t-amber-500 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-foreground">Moderate Tier</h3>
                <Badge variant="warning" className="text-xs font-mono">90.9% Accuracy</Badge>
              </div>
              <div className="text-2xl font-black text-foreground font-mono">
                {data.difficultyAnalysis.moderate.correct} Correct
              </div>
              <p className="text-xs text-muted-foreground">
                {data.difficultyAnalysis.moderate.incorrect} Incorrect, {data.difficultyAnalysis.moderate.unattempted} Unattempted of {data.difficultyAnalysis.moderate.total} total
              </p>
            </Card>

            <Card className="p-5 border-t-4 border-t-rose-500 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-foreground">Tough Tier</h3>
                <Badge variant="destructive" className="text-xs font-mono">100% Accuracy</Badge>
              </div>
              <div className="text-2xl font-black text-foreground font-mono">
                {data.difficultyAnalysis.tough.correct} Correct
              </div>
              <p className="text-xs text-muted-foreground">
                0 Incorrect, {data.difficultyAnalysis.tough.unattempted} Unattempted of {data.difficultyAnalysis.tough.total} total
              </p>
            </Card>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 6: SUBJECT MOVEMENT */}
      {/* ======================================================== */}
      {activeTab === "MOVEMENT" && (
        <div className="space-y-6 animate-in fade-in-50 duration-200">
          <Card className="p-5 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-border">
              <div>
                <h3 className="font-bold text-sm text-foreground">Chronological Examination Flow</h3>
                <p className="text-xs text-muted-foreground">
                  The exact sequence of subject transitions and Section switches made during the 3-hour examination
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {data.subjectMovement.map((step, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 rounded-xl border border-border/70 bg-card hover:bg-muted/30 transition-all"
                >
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 text-white font-mono"
                    style={{ backgroundColor: step.color }}
                  >
                    {idx + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between flex-wrap gap-1">
                      <h4 className="font-bold text-xs text-foreground">{step.title}</h4>
                      <span className="text-[10px] text-muted-foreground font-mono">
                        Time Spent: {Math.round(step.timeSpentSeconds / 60)} mins
                      </span>
                    </div>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      Solved <strong className="text-foreground">{step.questionsAttemptedBeforeSwitch} questions</strong> before switching to the next section.
                      {step.isOpenedAgain && (
                        <span className="text-primary font-semibold ml-1.5">(Revisited section)</span>
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 7: QUESTION JOURNEY */}
      {/* ======================================================== */}
      {activeTab === "JOURNEY" && (
        <div className="space-y-6 animate-in fade-in-50 duration-200">
          <Card className="p-5 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-border">
              <div>
                <h3 className="font-bold text-sm text-foreground">Step-by-Step Question Progression</h3>
                <p className="text-xs text-muted-foreground">Every question visited, response time, and outcome in order</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2.5">
              {data.questionsLog.map((q) => (
                <button
                  key={q.questionNumber}
                  type="button"
                  onClick={() => setSelectedSolutionQuestion(q)}
                  className={`p-3 rounded-lg border text-left text-xs transition-all flex flex-col justify-between ${
                    q.status === "CORRECT"
                      ? "border-emerald-500/50 bg-emerald-50/40 dark:bg-emerald-950/20 hover:border-emerald-500"
                      : q.status === "INCORRECT"
                      ? "border-rose-500/50 bg-rose-50/40 dark:bg-rose-950/20 hover:border-rose-500"
                      : "border-border bg-card hover:bg-muted/50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-foreground">Q.{q.questionNumber}</span>
                    {q.status === "CORRECT" ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    ) : q.status === "INCORRECT" ? (
                      <X className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
                    ) : (
                      <span className="text-[10px] text-muted-foreground font-mono">Skip</span>
                    )}
                  </div>
                  <div className="pt-2 text-[10px] text-muted-foreground font-mono flex justify-between">
                    <span>{q.subject.slice(0, 4)}</span>
                    <span>{q.timeTakenSeconds}s</span>
                  </div>
                </button>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 8: QS BY QS ANALYSIS */}
      {/* ======================================================== */}
      {activeTab === "QUESTIONS" && (
        <div className="space-y-4 animate-in fade-in-50 duration-200">
          {/* Filters Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-card border border-border rounded-xl">
            <div className="flex items-center gap-2 flex-wrap text-xs">
              <span className="font-semibold text-muted-foreground flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" /> Subject:
              </span>
              {["ALL", "Physics", "Chemistry", "Mathematics"].map((sub) => (
                <button
                  key={sub}
                  type="button"
                  onClick={() => setQsSubjectFilter(sub)}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                    qsSubjectFilter === sub
                      ? "bg-primary text-primary-foreground font-semibold"
                      : "bg-muted/60 text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="font-semibold text-muted-foreground">Status:</span>
              {["ALL", "CORRECT", "INCORRECT", "UNATTEMPTED"].map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setQsStatusFilter(st)}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                    qsStatusFilter === st
                      ? "bg-primary text-primary-foreground font-semibold"
                      : "bg-muted/60 text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Questions Table */}
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-border bg-muted/40 text-[11px] font-semibold text-muted-foreground uppercase">
                    <th className="py-3 px-3">Q#</th>
                    <th className="py-3 px-3">Subject & Chapter</th>
                    <th className="py-3 px-3">Type</th>
                    <th className="py-3 px-3">Your Answer</th>
                    <th className="py-3 px-3">Correct Key</th>
                    <th className="py-3 px-3">Score</th>
                    <th className="py-3 px-3">Time</th>
                    <th className="py-3 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredQuestions.map((q) => (
                    <tr key={q.questionNumber} className="hover:bg-muted/30">
                      <td className="py-3 px-3 font-mono font-bold text-foreground">
                        Q.{q.questionNumber}
                      </td>
                      <td className="py-3 px-3">
                        <span className="font-semibold text-foreground block">{q.chapter}</span>
                        <span className="text-[10px] text-muted-foreground">{q.subject}</span>
                      </td>
                      <td className="py-3 px-3 font-mono text-[10px] text-muted-foreground">
                        {q.questionType.replace("_", " ")}
                      </td>
                      <td className="py-3 px-3 font-mono font-medium">
                        {q.studentAnswer}
                      </td>
                      <td className="py-3 px-3 font-mono text-emerald-600 font-bold">
                        {q.correctAnswer}
                      </td>
                      <td className="py-3 px-3 font-mono">
                        {q.status === "CORRECT" ? (
                          <span className="text-emerald-600 font-bold">+{q.marksAwarded}</span>
                        ) : q.status === "INCORRECT" ? (
                          <span className="text-rose-600 font-bold">{q.marksAwarded}</span>
                        ) : (
                          <span className="text-muted-foreground">0</span>
                        )}
                      </td>
                      <td className="py-3 px-3 font-mono text-muted-foreground">
                        {q.timeTakenSeconds}s
                      </td>
                      <td className="py-3 px-3 text-right">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedSolutionQuestion(q)}
                          className="text-xs h-7 gap-1"
                        >
                          <Eye className="w-3 h-3 text-primary" />
                          <span>View Solution</span>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 9: MY MISTAKES */}
      {/* ======================================================== */}
      {activeTab === "MISTAKES" && (
        <div className="space-y-6 animate-in fade-in-50 duration-200">
          <Card className="p-5 border-l-4 border-l-rose-500 space-y-2 bg-rose-50/20 dark:bg-rose-950/10">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-foreground flex items-center gap-2">
                <AlertOctagon className="w-4 h-4 text-rose-500" />
                <span>My Mistakes & Error Diagnosis</span>
              </h3>
              <Badge variant="destructive" className="text-xs font-mono">
                {mistakeQuestions.length} Questions Lost Marks
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              Review questions where marks were lost due to negative marking. Understand the root cause (Calculation, Concept Gap, or Statement Misread) to avoid repeating them.
            </p>
          </Card>

          <div className="space-y-4">
            {mistakeQuestions.map((q) => (
              <Card key={q.questionNumber} className="p-5 border-rose-500/30 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-border">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="outline" className="text-xs font-mono font-bold">
                      Q.{q.questionNumber} ({q.subject})
                    </Badge>
                    <Badge variant="destructive" className="text-[10px]">
                      {q.mistakeType || "Conceptual Error"}
                    </Badge>
                    <span className="text-xs font-semibold text-rose-600 font-mono">
                      Penalty: {q.marksAwarded} Mark
                    </span>
                  </div>

                  <span className="text-xs text-muted-foreground font-mono">
                    Time Spent: {q.timeTakenSeconds}s
                  </span>
                </div>

                <div className="text-xs text-foreground font-medium leading-relaxed">
                  <MathView content={q.statement} />
                </div>

                <div className="p-3 bg-muted/40 rounded-lg space-y-1.5 text-xs">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
                    Diagnostic Solution Walkthrough
                  </span>
                  <div className="space-y-1 text-muted-foreground text-[11px]">
                    {q.solution.map((s, idx) => (
                      <div key={idx} className="flex items-start gap-1.5">
                        <span className="font-mono text-primary font-bold">{idx + 1}.</span>
                        <MathView content={s} />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-border/70">
                  <span className="text-xs font-mono text-rose-600">
                    Your Selection: <strong>{q.studentAnswer}</strong> | Correct: <strong className="text-emerald-600">{q.correctAnswer}</strong>
                  </span>

                  <div className="flex items-center gap-2">
                    <Link href={`/generate?chapter=${q.chapter.toLowerCase().includes("electro") ? "chap-electro" : "chap-vec3d"}`}>
                      <Button size="sm" className="text-xs h-7 bg-primary text-primary-foreground gap-1">
                        <Sparkles className="w-3 h-3" />
                        <span>Practice Similar Questions</span>
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* 4. Solution Modal View */}
      {selectedSolutionQuestion && (
        <Dialog open={!!selectedSolutionQuestion} onOpenChange={() => setSelectedSolutionQuestion(null)}>
          <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto p-6 space-y-4">
            <DialogHeader>
              <DialogTitle className="text-base font-bold flex items-center justify-between">
                <span>
                  Question {selectedSolutionQuestion.questionNumber} — {selectedSolutionQuestion.subject} ({selectedSolutionQuestion.chapter})
                </span>
                <Badge
                  variant={selectedSolutionQuestion.status === "CORRECT" ? "success" : "destructive"}
                  className="text-xs font-mono"
                >
                  {selectedSolutionQuestion.status}
                </Badge>
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-lg bg-muted/30 border border-border leading-relaxed text-foreground">
                <MathView content={selectedSolutionQuestion.statement} />
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-2.5 rounded-lg border border-border bg-card">
                  <span className="text-[10px] text-muted-foreground uppercase block">Your Answer</span>
                  <span className={`font-bold ${selectedSolutionQuestion.status === "CORRECT" ? "text-emerald-600" : "text-rose-600"}`}>
                    {selectedSolutionQuestion.studentAnswer}
                  </span>
                </div>

                <div className="p-2.5 rounded-lg border border-emerald-500/40 bg-emerald-50/30 dark:bg-emerald-950/20">
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 uppercase block font-semibold">
                    Official Answer Key
                  </span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    {selectedSolutionQuestion.correctAnswer}
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-muted/40 border border-border space-y-2">
                <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider block">
                  Step-by-Step Verified Solution Walkthrough
                </span>
                <div className="space-y-1.5 text-muted-foreground text-[11px]">
                  {selectedSolutionQuestion.solution.map((step: string, sIdx: number) => (
                    <div key={sIdx} className="flex items-start gap-1.5">
                      <span className="font-mono text-primary font-bold">{sIdx + 1}.</span>
                      <MathView content={step} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
