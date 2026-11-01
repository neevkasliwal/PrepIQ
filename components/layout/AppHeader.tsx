"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAppStore } from "@/store/useAppStore";
import { EXAMINATIONS_LIST } from "@/mocks/examinations";
import { ExamId } from "@/types";
import {
  ChevronDown,
  Moon,
  Sun,
  Search,
  Bell,
  Sparkles,
  Layers,
  Check,
  GraduationCap
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const AppHeader: React.FC = () => {
  const { selectedExamId, setSelectedExam, theme, setTheme, currentUser } = useAppStore();
  const [examDropdownOpen, setExamDropdownOpen] = useState(false);

  const activeExam =
    EXAMINATIONS_LIST.find((e) => e.id === selectedExamId) || EXAMINATIONS_LIST[0];

  const handleSelectExam = (id: ExamId) => {
    setSelectedExam(id);
    setExamDropdownOpen(false);
  };

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    if (typeof document !== "undefined") {
      if (nextTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  };

  return (
    <header className="h-14 border-b border-border bg-card/40 backdrop-blur-md px-4 flex items-center justify-between sticky top-8 z-30 select-none">
      {/* Left: Brand Title & Active Exam Switcher */}
      <div className="flex items-center space-x-3.5">
        <Link href="/dashboard" className="flex items-center space-x-2.5 group shrink-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-600 to-indigo-600 flex items-center justify-center text-white shadow-sm shadow-primary/20 group-hover:scale-105 transition-transform">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-bold text-base tracking-tight text-foreground font-sans">PrepIQ</span>
              <span className="text-[10px] bg-primary/10 text-primary font-bold px-1.5 py-0.2 rounded border border-primary/20">
                PRO
              </span>
            </div>
            <p className="text-[10px] text-muted-foreground leading-none hidden md:block">Exam Intelligence Platform</p>
          </div>
        </Link>

        <div className="h-6 w-px bg-border hidden sm:block" />

        <div className="relative">
          <button
            onClick={() => setExamDropdownOpen(!examDropdownOpen)}
            className="flex items-center space-x-2 bg-accent/60 hover:bg-accent border border-border px-3 py-1.5 rounded-lg text-xs font-medium text-foreground transition-all cursor-pointer shadow-2xs"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-semibold">{activeExam.name}</span>
            <span className="text-[10px] text-muted-foreground bg-background px-1.5 py-0.5 rounded border border-border/80">
              {activeExam.level}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
          </button>

          {/* Dropdown Menu */}
          {examDropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setExamDropdownOpen(false)}
              />
              <div className="absolute left-0 mt-1.5 w-72 bg-popover text-popover-foreground border border-border rounded-xl shadow-xl z-50 p-1.5 space-y-1 animate-in fade-in-80 zoom-in-95">
                <div className="px-2.5 py-1.5 border-b border-border text-[11px] font-semibold text-muted-foreground">
                  Select Target Examination
                </div>
                <div className="max-h-72 overflow-y-auto space-y-0.5">
                  {EXAMINATIONS_LIST.map((exam) => {
                    const isSelected = exam.id === selectedExamId;
                    return (
                      <button
                        key={exam.id}
                        onClick={() => handleSelectExam(exam.id)}
                        className={`w-full text-left px-2.5 py-2 rounded-lg text-xs flex items-center justify-between transition-colors ${
                          isSelected
                            ? "bg-primary text-primary-foreground font-semibold"
                            : "hover:bg-accent text-foreground"
                        }`}
                      >
                        <div>
                          <div className="font-medium">{exam.name}</div>
                          <div
                            className={`text-[10px] truncate max-w-[200px] ${
                              isSelected ? "text-primary-foreground/80" : "text-muted-foreground"
                            }`}
                          >
                            {exam.conductingBody}
                          </div>
                        </div>
                        {isSelected && <Check className="w-4 h-4 text-primary-foreground" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>

        <div className="hidden md:flex items-center space-x-1.5 text-xs text-muted-foreground">
          <span className="px-2 py-0.5 bg-muted rounded text-[11px]">
            Goal: {currentUser.targetScore} Marks
          </span>
          <span className="px-2 py-0.5 bg-muted rounded text-[11px]">
            Stage: {currentUser.preparationStage}
          </span>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-2">
        {/* Theme Switcher */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="h-8 w-8 text-muted-foreground hover:text-foreground"
          title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
          {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4 text-slate-700" />}
        </Button>

        {/* AI Mentor Quick Trigger */}
        <Button
          size="sm"
          variant="outline"
          className="h-8 px-2.5 text-xs bg-primary/5 hover:bg-primary/10 text-primary border-primary/20 gap-1.5"
          onClick={() => (window.location.href = "/mentor")}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">AI Mentor</span>
        </Button>
      </div>
    </header>
  );
};

