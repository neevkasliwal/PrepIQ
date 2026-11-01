"use client";

import React, { useState } from "react";
import { useAppStore } from "@/store/useAppStore";
import { EXAM_CONFIGURATIONS } from "@/mocks/examConfigurations";
import { RotateCcw, Sparkles, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export const DemoBanner: React.FC = () => {
  const { selectedExamId, resetDemoData, currentUser } = useAppStore();
  const [resetting, setResetting] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  const activeConfig = EXAM_CONFIGURATIONS[selectedExamId] || EXAM_CONFIGURATIONS["jee-main"];

  const handleReset = () => {
    setResetting(true);
    setTimeout(() => {
      resetDemoData();
      setResetting(false);
      setResetSuccess(true);
      setTimeout(() => setResetSuccess(false), 2500);
    }, 400);
  };

  return (
    <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white text-xs px-4 py-2 flex items-center justify-between border-b border-indigo-700/50 shadow-inner z-40 sticky top-0">
      <div className="flex items-center space-x-3 overflow-x-auto py-0.5">
        <span className="text-slate-300 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Active Student: <strong className="text-white font-medium">{currentUser.name}</strong>
        </span>
        <span className="text-slate-500 hidden sm:inline">•</span>
        <span className="text-slate-300 hidden sm:inline">
          Target: <strong className="text-blue-300 font-medium">{activeConfig.name} ({activeConfig.currentYear})</strong>
        </span>
        <span className="text-slate-500 hidden md:inline">•</span>
        <span className="text-emerald-400 hidden lg:inline flex items-center gap-1 font-mono">
          <Sparkles className="w-3 h-3 text-emerald-400" />
          Real-time Engine Active
        </span>
      </div>

      <div className="flex items-center space-x-2 shrink-0">
        <Button
          size="sm"
          variant="outline"
          onClick={handleReset}
          disabled={resetting}
          className="h-6 px-2.5 text-[11px] bg-white/10 hover:bg-white/20 text-white border-white/20 transition-all gap-1.5"
        >
          {resetSuccess ? (
            <>
              <Check className="w-3 h-3 text-emerald-400" />
              <span className="text-emerald-300 font-medium">Demo Restored</span>
            </>
          ) : (
            <>
              <RotateCcw className={`w-3 h-3 ${resetting ? "animate-spin text-blue-300" : ""}`} />
              <span>{resetting ? "Resetting..." : "Reset Demo Data"}</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

