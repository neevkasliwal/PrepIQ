"use client";

import React from "react";
import Link from "next/link";
import { useAppStore } from "@/store/useAppStore";
import {
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Zap,
  HelpCircle,
  FileText,
  RotateCcw,
  CheckCircle2,
  BookOpen,
  Sigma,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export default function WeakAreasPage() {
  const { selectedExamId } = useAppStore();

  const weakChapters = [
    {
      id: "chap-lom",
      name: "Laws of Motion & Friction",
      subject: "Physics",
      subjectColor: "text-blue-500",
      accuracy: 66.7,
      totalAttempts: 3,
      correctCount: 2,
      incorrectCount: 1,
      errorPattern: "Calculated normal force without checking if plane inclination was less than the angle of repose (tan 30° = 0.577 < μs = 0.600).",
      relatedFormulaId: "fc-lom-friction",
      targetSubjectId: "sub-phy",
      keyConcept: "Static friction threshold & Angle of Repose",
      suggestedActionText: "Practice 5 Curated Friction Problems"
    },
    {
      id: "chap-defint",
      name: "Definite Integrals & Differential Equations",
      subject: "Mathematics",
      subjectColor: "text-amber-500",
      accuracy: 66.7,
      totalAttempts: 3,
      correctCount: 2,
      incorrectCount: 1,
      errorPattern: "Omitted division by 2 after adding integrals I + I = 2I in King's symmetry property.",
      relatedFormulaId: "fc-math-kings-rule",
      targetSubjectId: "sub-math",
      keyConcept: "King's property symmetry & Leibnitz Rule",
      suggestedActionText: "Practice 5 Definite Integrals"
    }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Weak-Area Diagnostics & Remediation
            </h1>
            <Badge variant="destructive" className="text-[10px] font-mono">
              2 Active Focus Areas
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Derived from diagnostic test attempts. PrepIQ isolates recurring conceptual errors and recommends surgical practice drills.
          </p>
        </div>

        <Link href="/generate">
          <Button size="sm" className="gap-1.5 text-xs bg-primary text-white">
            <Zap className="w-3.5 h-3.5" />
            <span>Generate Remedial Practice Drill</span>
          </Button>
        </Link>
      </div>

      {/* Priority Alert Box */}
      <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3.5 text-xs">
        <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="font-semibold text-foreground text-sm block">
            Targeted Remediation Protocol Activated
          </strong>
          <p className="text-muted-foreground leading-relaxed">
            Aarav, your conceptual foundation in Organic Chemistry is already operating at <strong>100% accuracy</strong>. Remedying the 2 chapters below will prevent approximately <strong>10 marks in negative penalties</strong> in upcoming full CBT tests.
          </p>
        </div>
      </div>

      {/* Weak Chapters Detailed Cards */}
      <div className="space-y-4">
        {weakChapters.map((item, idx) => (
          <Card key={item.id} className="p-5 space-y-4 border-l-4 border-l-rose-500">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-border">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-muted-foreground">0{idx + 1}.</span>
                  <h3 className="text-base font-bold text-foreground">{item.name}</h3>
                  <Badge variant="outline" className={`text-[10px] ${item.subjectColor} font-semibold`}>
                    {item.subject}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">Focus Concept: <strong className="text-foreground">{item.keyConcept}</strong></p>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono">
                <div>
                  <span className="text-[10px] text-muted-foreground block">Chapter Accuracy</span>
                  <span className="text-sm font-bold text-rose-600">{item.accuracy}%</span>
                </div>
                <div>
                  <span className="text-[10px] text-muted-foreground block">Outcomes</span>
                  <span className="text-xs text-foreground font-semibold">{item.correctCount} Correct / {item.incorrectCount} Misstep</span>
                </div>
              </div>
            </div>

            {/* Error Pattern Diagnosis */}
            <div className="p-3.5 rounded-xl bg-muted/40 border border-border space-y-1 text-xs">
              <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider block">
                Observed Diagnostic Error Pattern
              </span>
              <p className="text-foreground/90 leading-relaxed">
                {item.errorPattern}
              </p>
            </div>

            {/* Remedial Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-border text-xs">
              <div className="flex flex-wrap items-center gap-2">
                <Link href={`/generate?chapter=${item.id}&subject=${item.targetSubjectId}`}>
                  <Button size="sm" className="h-7 text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-semibold gap-1">
                    <Zap className="w-3 h-3" />
                    <span>{item.suggestedActionText}</span>
                  </Button>
                </Link>

                <Link href={`/pyqs?chapter=${item.id}`}>
                  <Button size="sm" variant="outline" className="h-7 text-xs gap-1">
                    <HelpCircle className="w-3 h-3 text-primary" />
                    <span>Explore Chapter PYQs</span>
                  </Button>
                </Link>

                <Link href="/formulas">
                  <Button size="sm" variant="ghost" className="h-7 text-xs gap-1 text-muted-foreground hover:text-foreground">
                    <Sigma className="w-3 h-3" />
                    <span>Review Formula Card</span>
                  </Button>
                </Link>
              </div>

              <Link href="/history/attempt-demo-01" className="text-xs text-primary hover:underline flex items-center gap-1">
                <span>Inspect Test Mistake</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

