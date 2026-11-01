"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/store/useAppStore";
import { EXAMINATIONS_LIST } from "@/mocks/examinations";
import { ExamId } from "@/types";
import {
  GraduationCap,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Target,
  BookOpen,
  Calendar,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export default function OnboardingPage() {
  const router = useRouter();
  const { currentUser, setUser, setSelectedExam } = useAppStore();

  const [step, setStep] = useState(1);
  const [name, setName] = useState(currentUser.name || "Aarav Sharma");
  const [targetExam, setTargetExam] = useState<ExamId>(currentUser.targetExamId || "jee-main");
  const [examYear, setExamYear] = useState<number>(currentUser.examYear || 2025);
  const [targetScore, setTargetScore] = useState<number>(currentUser.targetScore || 260);
  const [stage, setStage] = useState<"Beginner" | "Intermediate" | "Advanced" | "Revision">(
    currentUser.preparationStage || "Advanced"
  );
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(
    currentUser.selectedSubjects || ["Physics", "Chemistry", "Mathematics"]
  );

  const availableSubjectsMap: Record<string, string[]> = {
    "jee-main": ["Physics", "Chemistry", "Mathematics"],
    "jee-adv": ["Physics", "Chemistry", "Mathematics"],
    "comedk": ["Physics", "Chemistry", "Mathematics"],
    "mht-cet": ["Mathematics", "Physics", "Chemistry"],
    "gate": ["General Aptitude", "Data Structures & Algorithms", "Operating Systems", "Databases"],
    "neet": ["Physics", "Chemistry", "Biology (Botany & Zoology)"]
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Save and finish
      setUser({
        name,
        targetExamId: targetExam,
        examYear,
        targetScore,
        preparationStage: stage,
        selectedSubjects,
      });
      setSelectedExam(targetExam);
      router.push("/dashboard");
    }
  };

  const toggleSubject = (sub: string) => {
    if (selectedSubjects.includes(sub)) {
      if (selectedSubjects.length > 1) {
        setSelectedSubjects(selectedSubjects.filter((s) => s !== sub));
      }
    } else {
      setSelectedSubjects([...selectedSubjects, sub]);
    }
  };

  return (
    <div className="w-full max-w-2xl bg-card rounded-2xl border border-border shadow-2xl p-6 sm:p-8 space-y-6">
      {/* Top Header */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">PrepIQ Student Personalization</h2>
              <p className="text-xs text-muted-foreground">Tailor your diagnostic study path & examination targets</p>
            </div>
          </div>
          <span className="text-xs font-mono text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
            Step {step} of 3
          </span>
        </div>
        <Progress value={(step / 3) * 100} className="h-1.5" />
      </div>

      {/* Step 1: Student Identity & Target Exam */}
      {step === 1 && (
        <div className="space-y-5 animate-in fade-in-50">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">What should we call you?</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary focus:outline-none"
              placeholder="e.g. Aarav Sharma"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-foreground">Select Primary Target Examination</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {EXAMINATIONS_LIST.map((exam) => (
                <button
                  key={exam.id}
                  type="button"
                  onClick={() => {
                    setTargetExam(exam.id);
                    setSelectedSubjects(availableSubjectsMap[exam.id] || ["Physics", "Chemistry"]);
                  }}
                  className={`p-3 text-left rounded-xl border transition-all ${
                    targetExam === exam.id
                      ? "border-primary bg-primary/5 text-primary shadow-xs"
                      : "border-border hover:bg-accent/60 text-foreground"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs">{exam.name}</span>
                    {targetExam === exam.id && <CheckCircle2 className="w-4 h-4 text-primary" />}
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-1">{exam.conductingBody}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Year, Stage & Subjects */}
      {step === 2 && (
        <div className="space-y-5 animate-in fade-in-50">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Target Year</label>
              <select
                value={examYear}
                onChange={(e) => setExamYear(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary focus:outline-none"
              >
                <option value={2025}>2025</option>
                <option value={2026}>2026</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Preparation Phase</label>
              <select
                value={stage}
                onChange={(e) => setStage(e.target.value as any)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary focus:outline-none"
              >
                <option value="Beginner">Beginner (Starting syllabus)</option>
                <option value="Intermediate">Intermediate (50%+ syllabus done)</option>
                <option value="Advanced">Advanced (Problem solving / PYQs)</option>
                <option value="Revision">Revision (Grand Mock Tests)</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-foreground">Active Subjects in Scope</label>
            <div className="flex flex-wrap gap-2">
              {(availableSubjectsMap[targetExam] || []).map((sub) => {
                const isChecked = selectedSubjects.includes(sub);
                return (
                  <button
                    key={sub}
                    type="button"
                    onClick={() => toggleSubject(sub)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                      isChecked
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-muted text-muted-foreground border-border hover:bg-accent"
                    }`}
                  >
                    {sub}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Target Score & Goal Summary */}
      {step === 3 && (
        <div className="space-y-5 animate-in fade-in-50">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-foreground">Target Score Goal</label>
              <span className="text-xs font-bold text-primary font-mono">{targetScore} Marks</span>
            </div>
            <input
              type="range"
              min={100}
              max={300}
              step={5}
              value={targetScore}
              onChange={(e) => setTargetScore(Number(e.target.value))}
              className="w-full accent-primary"
            />
            <div className="flex justify-between text-[10px] text-muted-foreground">
              <span>100 (Cutoff baseline)</span>
              <span>220 (NIT Top Branches)</span>
              <span>280+ (Top 99.9% Percentile)</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-accent/40 border border-border space-y-2 text-xs">
            <h4 className="font-semibold text-foreground flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-primary" />
              <span>Target Profile Summary</span>
            </h4>
            <div className="grid grid-cols-2 gap-2 text-muted-foreground text-[11px]">
              <div>Aspirant: <strong className="text-foreground">{name}</strong></div>
              <div>Examination: <strong className="text-foreground">{targetExam.toUpperCase()}</strong></div>
              <div>Session: <strong className="text-foreground">{examYear}</strong></div>
              <div>Phase: <strong className="text-foreground">{stage}</strong></div>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        {step > 1 ? (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setStep(step - 1)}
            className="gap-1.5 text-xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Previous</span>
          </Button>
        ) : (
          <div />
        )}

        <Button size="sm" onClick={handleNext} className="gap-1.5 text-xs">
          <span>{step === 3 ? "Complete & Launch Dashboard" : "Next Step"}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Button>
      </div>
    </div>
  );
}

