"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAppStore } from "@/store/useAppStore";
import { SUBJECTS } from "@/mocks/subjects";
import { MathView } from "@/components/ui/math-view";
import {
  Sigma,
  Search,
  Bookmark,
  Sparkles,
  ExternalLink,
  BookOpen,
  Filter
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function FormulasPage() {
  const { formulaCards, toggleFormulaBookmark } = useAppStore();
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredCards = formulaCards.filter((card) => {
    if (selectedSubjectId !== "ALL" && card.subjectId !== selectedSubjectId) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match = (card.name + " " + card.explanation + " " + card.formulaLatex).toLowerCase();
      if (!match.includes(q)) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Formula & Revision Cards
            </h1>
            <Badge variant="purple" className="text-[10px] font-mono">
              LaTeX KaTeX Rendered
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Curated mathematical relationships, thermodynamic properties, and coordinate equations with explicit variable definitions.
          </p>
        </div>
      </div>

      {/* Filters & Search */}
      <Card className="p-3.5 bg-card/60 backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
            <button
              onClick={() => setSelectedSubjectId("ALL")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all border ${
                selectedSubjectId === "ALL"
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card hover:bg-accent text-muted-foreground border-border"
              }`}
            >
              All Subjects
            </button>
            <button
              onClick={() => setSelectedSubjectId("sub-phy")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all border ${
                selectedSubjectId === "sub-phy"
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card hover:bg-accent text-muted-foreground border-border"
              }`}
            >
              Physics
            </button>
            <button
              onClick={() => setSelectedSubjectId("sub-math")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all border ${
                selectedSubjectId === "sub-math"
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card hover:bg-accent text-muted-foreground border-border"
              }`}
            >
              Mathematics
            </button>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-muted-foreground absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search formula, theorem..."
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-input bg-background focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>
      </Card>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCards.map((fc) => (
          <Card key={fc.id} className="p-5 space-y-4 hover:border-primary/50 transition-all hover:shadow-sm">
            <div className="flex items-center justify-between pb-2 border-b border-border">
              <h3 className="text-sm font-bold text-foreground leading-snug">{fc.name}</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleFormulaBookmark(fc.id)}
                className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground gap-1"
              >
                <Bookmark className={`w-3.5 h-3.5 ${fc.isBookmarked ? "fill-amber-500 text-amber-500" : ""}`} />
                <span>{fc.isBookmarked ? "Saved" : "Save"}</span>
              </Button>
            </div>

            {/* Formula Display Box */}
            <div className="p-4 rounded-xl bg-slate-950 text-white flex items-center justify-center text-center overflow-x-auto shadow-inner">
              <div className="text-base sm:text-lg font-mono py-1">
                <MathView content={`$$${fc.formulaLatex}$$`} />
              </div>
            </div>

            {/* Explanation */}
            <p className="text-xs text-muted-foreground leading-relaxed">
              <MathView content={fc.explanation} />
            </p>

            {/* Variable Definitions Table */}
            <div className="p-3 bg-muted/30 rounded-xl space-y-1.5 text-[11px]">
              <span className="font-semibold text-muted-foreground uppercase text-[10px] tracking-wider block">
                Variable Conventions
              </span>
              <div className="space-y-1 font-mono">
                {fc.variableDefinitions.map((vd, vIdx) => (
                  <div key={vIdx} className="flex items-start gap-2">
                    <span className="text-primary font-bold min-w-16">
                      <MathView content={`$${vd.symbol}$`} />
                    </span>
                    <span className="text-muted-foreground">: {vd.meaning}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

