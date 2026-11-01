"use client";

import React from "react";
import Link from "next/link";
import {
  GraduationCap,
  Sparkles,
  ArrowRight,
  HelpCircle,
  FolderOpen,
  BarChart3,
  CheckCircle2,
  Cpu,
  BookOpenCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { EXAMINATIONS_LIST } from "@/mocks/examinations";

export default function HomePage() {
  return (
    <div className="max-w-6xl mx-auto py-8 space-y-12">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950 text-white p-8 md:p-12 border border-indigo-800/40 shadow-2xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-blue-200">
            <Sparkles className="w-3.5 h-3.5 text-blue-300" />
            <span>Interactive Educational SaaS Prototype (Part 1: Frontend)</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            AI-Powered Competitive Examination Preparation Platform
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            PrepIQ connects student textbooks, verified previous-year questions, real-time CBT examination simulation, and adaptive diagnostic analytics into one cohesive preparation system.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link href="/dashboard">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-semibold gap-2 shadow-lg shadow-primary/30">
                <span>Enter Demo Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/pyqs">
              <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/20 gap-2">
                <HelpCircle className="w-4 h-4 text-blue-300" />
                <span>Explore PYQ Intelligence</span>
              </Button>
            </Link>
            <Link href="/tests/cbt/test-jee-full-01">
              <Button size="lg" variant="secondary" className="bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 font-semibold gap-2">
                <Cpu className="w-4 h-4 text-emerald-400" />
                <span>Launch Live CBT Engine</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Workflow Architecture Grid */}
      <div className="space-y-4">
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">The PrepIQ Learning Continuum</h2>
          <p className="text-xs text-muted-foreground">End-to-end preparation architecture configured for multi-exam scalability</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-5 rounded-xl border border-border bg-card shadow-sm space-y-2">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center font-bold">1</div>
            <h3 className="font-semibold text-sm">Upload & Structure</h3>
            <p className="text-xs text-muted-foreground">Upload textbooks & notes; simulated OCR extracts subjects, chapters, and key concepts.</p>
          </div>
          <div className="p-5 rounded-xl border border-border bg-card shadow-sm space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">2</div>
            <h3 className="font-semibold text-sm">PYQ Intelligence</h3>
            <p className="text-xs text-muted-foreground">Filter authentic NTA/IIT questions examination-wise, chapter-wise, and year-wise.</p>
          </div>
          <div className="p-5 rounded-xl border border-border bg-card shadow-sm space-y-2">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-600 flex items-center justify-center font-bold">3</div>
            <h3 className="font-semibold text-sm">CBT Simulation</h3>
            <p className="text-xs text-muted-foreground">Timed NTA-style computer-based test with palette, mark for review, and section rules.</p>
          </div>
          <div className="p-5 rounded-xl border border-border bg-card shadow-sm space-y-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">4</div>
            <h3 className="font-semibold text-sm">Diagnostic Analytics</h3>
            <p className="text-xs text-muted-foreground">Identify weak chapters, analyze time management, and generate targeted practice.</p>
          </div>
        </div>
      </div>

      {/* Supported Multi-Exam Configurations */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-foreground">Configured Examination Registries</h2>
            <p className="text-xs text-muted-foreground">Dynamic marking schemes, section limits, and duration configurations</p>
          </div>
          <Link href="/references" className="text-xs text-primary font-medium hover:underline flex items-center gap-1">
            <span>View Official Syllabi</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {EXAMINATIONS_LIST.map((exam) => (
            <Link
              key={exam.id}
              href={`/pyqs?exam=${exam.id}`}
              className="p-5 rounded-xl border border-border bg-card hover:border-primary/50 transition-all hover:shadow-md group block"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-primary px-2 py-0.5 rounded bg-primary/10">
                  {exam.shortName}
                </span>
                <span className="text-[11px] text-muted-foreground font-mono">{exam.availableYearsCount} Years PYQs</span>
              </div>
              <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                {exam.name}
              </h3>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{exam.tagline}</p>
              <div className="mt-3 pt-3 border-t border-border/80 flex items-center justify-between text-[11px] text-muted-foreground">
                <span>{exam.conductingBody}</span>
                <span className="font-medium text-foreground">{exam.totalQuestionsDemo} Demo Items</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

