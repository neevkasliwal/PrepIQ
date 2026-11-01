"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAppStore } from "@/store/useAppStore";
import { MOCK_REFERENCES } from "@/mocks/references";
import { ExamReference } from "@/types";
import {
  BookOpenCheck,
  Search,
  ExternalLink,
  ShieldCheck,
  Calendar,
  Building,
  FileText,
  Filter
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ReferencesPage() {
  const { selectedExamId } = useAppStore();
  const [selectedType, setSelectedType] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredReferences = MOCK_REFERENCES.filter((ref) => {
    if (selectedType !== "ALL" && ref.sourceType !== selectedType) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match = (ref.title + " " + ref.description + " " + ref.sourceOrganization).toLowerCase();
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
              Official Examination References & Syllabi
            </h1>
            <Badge variant="success" className="text-[10px] font-mono gap-1">
              <ShieldCheck className="w-3 h-3" />
              <span>Traceability Verified</span>
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Trace examination question provenance, official answer key revisions, and syllabus boundaries from authorized bodies.
          </p>
        </div>
      </div>

      {/* Official Portals Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <a
          href="https://nta.ac.in/"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-xl border border-border bg-card hover:border-primary/50 text-left transition-all hover:shadow-xs group block"
        >
          <div className="flex items-center justify-between">
            <span className="font-bold text-xs text-primary">NTA Official</span>
            <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary" />
          </div>
          <p className="text-[11px] text-muted-foreground mt-1 truncate">National Testing Agency</p>
        </a>

        <a
          href="https://jeeadv.ac.in/"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-xl border border-border bg-card hover:border-primary/50 text-left transition-all hover:shadow-xs group block"
        >
          <div className="flex items-center justify-between">
            <span className="font-bold text-xs text-indigo-600">JEE Advanced</span>
            <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary" />
          </div>
          <p className="text-[11px] text-muted-foreground mt-1 truncate">IIT Joint Admission Board</p>
        </a>

        <a
          href="https://www.comedk.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-xl border border-border bg-card hover:border-primary/50 text-left transition-all hover:shadow-xs group block"
        >
          <div className="flex items-center justify-between">
            <span className="font-bold text-xs text-emerald-600">COMEDK</span>
            <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary" />
          </div>
          <p className="text-[11px] text-muted-foreground mt-1 truncate">Karnataka Collegiate Board</p>
        </a>

        <a
          href="https://cetcell.mahacet.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-xl border border-border bg-card hover:border-primary/50 text-left transition-all hover:shadow-xs group block"
        >
          <div className="flex items-center justify-between">
            <span className="font-bold text-xs text-amber-600">State CET Cell</span>
            <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary" />
          </div>
          <p className="text-[11px] text-muted-foreground mt-1 truncate">Maharashtra State Cell</p>
        </a>

        <a
          href="https://gate2026.iitg.ac.in/"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-xl border border-border bg-card hover:border-primary/50 text-left transition-all hover:shadow-xs group block col-span-2 sm:col-span-1"
        >
          <div className="flex items-center justify-between">
            <span className="font-bold text-xs text-cyan-600">GATE 2026</span>
            <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary" />
          </div>
          <p className="text-[11px] text-muted-foreground mt-1 truncate">IIT Guwahati Portal</p>
        </a>
      </div>

      {/* Filter and Search Bar */}
      <Card className="p-3.5 bg-card/60 backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
            <button
              onClick={() => setSelectedType("ALL")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all border ${
                selectedType === "ALL"
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card hover:bg-accent text-muted-foreground border-border"
              }`}
            >
              All Types
            </button>
            <button
              onClick={() => setSelectedType("OFFICIAL_BULLETIN")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all border ${
                selectedType === "OFFICIAL_BULLETIN"
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card hover:bg-accent text-muted-foreground border-border"
              }`}
            >
              Information Bulletins
            </button>
            <button
              onClick={() => setSelectedType("OFFICIAL_SYLLABUS")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all border ${
                selectedType === "OFFICIAL_SYLLABUS"
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card hover:bg-accent text-muted-foreground border-border"
              }`}
            >
              Rationalised Syllabi
            </button>
            <button
              onClick={() => setSelectedType("EXAM_PATTERN")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all border ${
                selectedType === "EXAM_PATTERN"
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card hover:bg-accent text-muted-foreground border-border"
              }`}
            >
              Pattern Notices
            </button>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-muted-foreground absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search references by title..."
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-input bg-background focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>
      </Card>

      {/* References Grid */}
      <div className="space-y-3.5">
        {filteredReferences.map((ref) => (
          <Card key={ref.id} className="p-5 space-y-3 hover:border-primary/50 transition-all">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-border">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-[10px] font-mono">
                    {ref.examId.toUpperCase()} {ref.year}
                  </Badge>
                  <Badge variant="purple" className="text-[10px]">
                    {ref.sourceType.replace("_", " ")}
                  </Badge>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-foreground mt-1">{ref.title}</h3>
              </div>

              <a
                href={ref.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0"
              >
                <Button size="sm" variant="outline" className="text-xs h-7 gap-1.5">
                  <span>Visit Authority Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </Button>
              </a>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed">
              {ref.description}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-border text-[11px] text-muted-foreground font-mono">
              <div className="flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5" />
                <span>{ref.sourceOrganization}</span>
              </div>

              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>Last Verified: {ref.verifiedDate}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

