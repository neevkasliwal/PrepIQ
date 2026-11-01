"use client";

import React, { useState } from "react";
import { useAppStore } from "@/store/useAppStore";
import { EXAMINATIONS_LIST } from "@/mocks/examinations";
import { ExamId } from "@/types";
import {
  Settings,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  User,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Moon,
  Sun,
  GraduationCap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function SettingsPage() {
  const {
    currentUser,
    setUser,
    selectedExamId,
    setSelectedExam,
    theme,
    setTheme,
    resetDemoData
  } = useAppStore();

  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [targetScore, setTargetScore] = useState(currentUser.targetScore);
  const [stage, setStage] = useState(currentUser.preparationStage);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({
      name,
      email,
      targetScore,
      preparationStage: stage as any,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleConfirmReset = () => {
    resetDemoData();
    setIsResetConfirmOpen(false);
  };

  const toggleTheme = (val: "light" | "dark") => {
    setTheme(val);
    if (typeof document !== "undefined") {
      if (val === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Settings & Presentation Controls
          </h1>
          <Badge variant="warning" className="text-[10px] font-mono">
            Demo Management
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground mt-0.5">
          Manage student profile parameters, target examination configurations, visual themes, and presentation reset controls.
        </p>
      </div>

      {/* Demo Controls Section */}
      <Card className="border-amber-200 dark:border-amber-900 bg-amber-50/20 dark:bg-amber-950/20 p-5 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-amber-200 dark:border-amber-800">
          <div className="space-y-0.5">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>College Project Demonstration Controls</span>
            </h3>
            <p className="text-xs text-muted-foreground">
              Instant controls for college faculty presentations to restore pristine state without backend dependency.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div className="p-3 bg-card rounded-xl border border-border space-y-2">
            <span className="text-xs font-semibold text-foreground block">Full Demo Data Reset</span>
            <p className="text-[11px] text-muted-foreground">
              Re-initializes all test attempts, uploaded textbooks, generated questions, and bookmarks to baseline.
            </p>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsResetConfirmOpen(true)}
              className="text-xs border-rose-300 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 w-full gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset to Clean Demonstration State</span>
            </Button>
          </div>

          <div className="p-3 bg-card rounded-xl border border-border space-y-2">
            <span className="text-xs font-semibold text-foreground block">Active Simulation Engine</span>
            <p className="text-[11px] text-muted-foreground">
              Running with persistent local state. All mock scoring, timing, and responses calculate accurately in real time.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-600 font-medium font-mono pt-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>Status: Online & Fully Interactive</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Target Examination Switcher */}
      <Card className="p-5 space-y-4">
        <CardTitle className="text-sm font-bold flex items-center gap-2 pb-2 border-b border-border">
          <GraduationCap className="w-4 h-4 text-primary" />
          <span>Active Target Examination</span>
        </CardTitle>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {EXAMINATIONS_LIST.map((exam) => {
            const isSelected = exam.id === selectedExamId;
            return (
              <button
                key={exam.id}
                type="button"
                onClick={() => setSelectedExam(exam.id)}
                className={`p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                  isSelected
                    ? "border-primary bg-primary/5 text-primary font-bold shadow-xs"
                    : "border-border bg-card hover:bg-accent text-foreground"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{exam.name}</span>
                  {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-primary" />}
                </div>
                <div className="text-[10px] text-muted-foreground font-mono mt-0.5">{exam.conductingBody}</div>
              </button>
            );
          })}
        </div>
      </Card>

      {/* Profile & Target Score Settings */}
      <Card className="p-5 space-y-4">
        <CardTitle className="text-sm font-bold flex items-center gap-2 pb-2 border-b border-border">
          <User className="w-4 h-4 text-primary" />
          <span>Student Preparation Profile</span>
        </CardTitle>

        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-foreground">Student Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full text-xs p-2 rounded-lg border border-input bg-background focus:ring-1 focus:ring-primary"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-foreground">Registered Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-xs p-2 rounded-lg border border-input bg-background focus:ring-1 focus:ring-primary"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-foreground">Target Score Goal (Marks)</label>
              <input
                type="number"
                value={targetScore}
                onChange={(e) => setTargetScore(Number(e.target.value))}
                className="w-full text-xs p-2 rounded-lg border border-input bg-background focus:ring-1 focus:ring-primary font-mono"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-foreground">Preparation Phase</label>
              <select
                value={stage}
                onChange={(e) => setStage(e.target.value as any)}
                className="w-full text-xs p-2 rounded-lg border border-input bg-background focus:ring-1 focus:ring-primary"
              >
                <option value="Beginner">Beginner (Syllabus initiation)</option>
                <option value="Intermediate">Intermediate (Concepts covered)</option>
                <option value="Advanced">Advanced (High-yield PYQs)</option>
                <option value="Revision">Revision (Grand CBT Mocks)</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-border">
            {savedSuccess ? (
              <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Preferences Saved Successfully</span>
              </span>
            ) : (
              <div />
            )}

            <Button type="submit" size="sm" className="text-xs h-8">
              Save Profile Preferences
            </Button>
          </div>
        </form>
      </Card>

      {/* Visual Theme */}
      <Card className="p-5 space-y-3">
        <CardTitle className="text-sm font-bold flex items-center gap-2 pb-2 border-b border-border">
          <Moon className="w-4 h-4 text-primary" />
          <span>Interface Appearance</span>
        </CardTitle>

        <div className="flex items-center gap-3">
          <Button
            variant={theme === "light" ? "default" : "outline"}
            size="sm"
            onClick={() => toggleTheme("light")}
            className="text-xs gap-1.5"
          >
            <Sun className="w-4 h-4" />
            <span>Light Mode</span>
          </Button>

          <Button
            variant={theme === "dark" ? "default" : "outline"}
            size="sm"
            onClick={() => toggleTheme("dark")}
            className="text-xs gap-1.5"
          >
            <Moon className="w-4 h-4" />
            <span>Dark Mode</span>
          </Button>
        </div>
      </Card>

      {/* Reset Confirmation Dialog */}
      <Dialog open={isResetConfirmOpen} onOpenChange={setIsResetConfirmOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-base font-bold text-rose-600 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              <span>Confirm Demo State Reset</span>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-3 py-2 text-xs">
            <p className="text-muted-foreground">
              This will restore all default test attempts, sample documents (HC Verma, NCERT Chemistry), original bookmarks, and reset test history back to the starting demonstration baseline.
            </p>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
              <Button size="sm" variant="outline" onClick={() => setIsResetConfirmOpen(false)}>
                Cancel
              </Button>
              <Button size="sm" variant="destructive" onClick={handleConfirmReset}>
                Reset All Demo Data
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

