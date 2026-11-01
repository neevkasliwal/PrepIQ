"use client";

import React from "react";
import Link from "next/link";
import { useAppStore } from "@/store/useAppStore";
import {
  History,
  Clock,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  Play,
  ArrowRight,
  BarChart3,
  Calendar,
  FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function HistoryPage() {
  const { testAttempts } = useAppStore();

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Previous Test Attempts
            </h1>
            <Badge variant="secondary" className="text-[10px] font-mono">
              Audit Trail
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Complete archive of computer-based examinations, sectional scores, question responses, and latency metrics.
          </p>
        </div>

        <Link href="/tests">
          <Button size="sm" className="gap-1.5 text-xs">
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>Attempt New CBT Test</span>
          </Button>
        </Link>
      </div>

      {/* Attempts List */}
      <div className="space-y-3.5">
        {testAttempts.map((att) => (
          <Card key={att.id} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-primary/50 transition-all hover:shadow-sm">
            <div className="space-y-1.5 max-w-xl">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-[10px] font-mono">
                  {att.examId.toUpperCase()}
                </Badge>
                <span className="text-[11px] text-muted-foreground flex items-center gap-1 font-mono">
                  <Calendar className="w-3 h-3" />
                  {new Date(att.submittedAt).toLocaleDateString()}
                </span>
              </div>
              <h3 className="text-base font-bold text-foreground leading-snug">{att.testTitle}</h3>
              <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                <span className="text-emerald-600 font-semibold font-mono flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {att.correctCount} Correct
                </span>
                <span>•</span>
                <span className="text-rose-600 font-semibold font-mono flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {att.incorrectCount} Missteps
                </span>
                <span>•</span>
                <span className="text-slate-500 font-mono">
                  {att.unattemptedCount} Skipped
                </span>
                <span>•</span>
                <span className="font-mono flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {Math.round(att.durationSeconds / 60)} mins
                </span>
              </div>
            </div>

            {/* Score & Actions */}
            <div className="flex items-center justify-between md:justify-end gap-6 pt-3 md:pt-0 border-t md:border-t-0 border-border">
              <div className="text-right">
                <div className="text-xl font-black text-foreground font-mono">
                  {att.totalScore} <span className="text-xs text-muted-foreground font-normal">/ {att.maxScore}</span>
                </div>
                <div className="text-[11px] text-emerald-600 font-semibold font-mono">
                  {att.accuracyPercentage}% Accuracy
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Link href={`/history/${att.id}`}>
                  <Button size="sm" variant="default" className="text-xs h-8 px-3 gap-1.5 shadow-xs">
                    <span>Review Solutions</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>

                <Link href={`/tests/cbt/${att.testId}`}>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs h-8 px-2.5 text-muted-foreground hover:text-foreground"
                    title="Reattempt this test"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

