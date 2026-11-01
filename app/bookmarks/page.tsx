"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAppStore } from "@/store/useAppStore";
import { MathView } from "@/components/ui/math-view";
import {
  Bookmark,
  Plus,
  Folder,
  Trash2,
  ExternalLink,
  HelpCircle,
  Eye,
  EyeOff,
  CheckCircle2,
  Sparkles,
  BookOpen
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function BookmarksPage() {
  const { notebooks, bookmarks, removeBookmark, createNotebook } = useAppStore();
  const [selectedNotebookId, setSelectedNotebookId] = useState<string>("ALL");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newColor, setNewColor] = useState("#3b82f6");
  const [revealedSolutions, setRevealedSolutions] = useState<Record<string, boolean>>({});

  const filteredBookmarks = selectedNotebookId === "ALL"
    ? bookmarks
    : bookmarks.filter((b) => b.notebookId === selectedNotebookId);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    createNotebook(newTitle, newDesc, newColor);
    setIsCreateOpen(false);
    setNewTitle("");
    setNewDesc("");
  };

  const toggleSolution = (id: string) => {
    setRevealedSolutions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Bookmarks & Smart Notebooks
            </h1>
            <Badge variant="secondary" className="text-[10px] font-mono">
              Revision Vault
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Organize challenging previous-year questions and textbook extracts into topic-wise revision collections.
          </p>
        </div>

        <Button onClick={() => setIsCreateOpen(true)} className="gap-2 text-xs h-9">
          <Plus className="w-4 h-4" />
          <span>New Smart Notebook</span>
        </Button>
      </div>

      {/* Notebooks Horizontal Selector Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <button
          type="button"
          onClick={() => setSelectedNotebookId("ALL")}
          className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
            selectedNotebookId === "ALL"
              ? "border-primary bg-primary/5 text-primary shadow-xs"
              : "border-border bg-card hover:bg-accent text-foreground"
          }`}
        >
          <Folder className="w-4 h-4 mb-1.5 text-primary" />
          <div className="font-semibold text-xs truncate">All Notebooks</div>
          <div className="text-[10px] text-muted-foreground font-mono">{bookmarks.length} Items</div>
        </button>

        {notebooks.map((nb) => {
          const isSelected = selectedNotebookId === nb.id;
          const count = bookmarks.filter((b) => b.notebookId === nb.id).length;

          return (
            <button
              key={nb.id}
              type="button"
              onClick={() => setSelectedNotebookId(nb.id)}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                isSelected
                  ? "border-primary bg-primary/5 text-primary shadow-xs"
                  : "border-border bg-card hover:bg-accent text-foreground"
              }`}
            >
              <div
                className="w-3 h-3 rounded-full mb-2"
                style={{ backgroundColor: nb.color }}
              />
              <div className="font-semibold text-xs truncate">{nb.title}</div>
              <div className="text-[10px] text-muted-foreground font-mono">{count} Items</div>
            </button>
          );
        })}
      </div>

      {/* Bookmarked Questions Stream */}
      <div className="space-y-4">
        {filteredBookmarks.length === 0 ? (
          <Card className="p-10 text-center space-y-2">
            <Bookmark className="w-8 h-8 text-muted-foreground mx-auto" />
            <h3 className="text-sm font-semibold">No questions in this notebook</h3>
            <p className="text-xs text-muted-foreground">Save questions while exploring PYQs or taking CBT tests.</p>
          </Card>
        ) : (
          filteredBookmarks.map((bm, idx) => {
            const q = bm.question;
            const isRevealed = !!revealedSolutions[bm.id];

            return (
              <Card key={bm.id} className="p-5 space-y-3.5 hover:border-primary/40 transition-all">
                <div className="flex items-center justify-between pb-2 border-b border-border">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-[10px] font-mono">
                      Saved #{idx + 1}
                    </Badge>
                    <Badge variant="info" className="text-[10px]">
                      {q.sourceReference || q.examId.toUpperCase()}
                    </Badge>
                    <Badge variant="warning" className="text-[10px]">
                      {q.difficulty}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeBookmark(bm.id)}
                      className="text-xs text-rose-600 hover:text-rose-700 hover:bg-rose-50 h-7 px-2 gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </Button>
                  </div>
                </div>

                <div className="text-xs sm:text-sm text-foreground font-medium leading-relaxed">
                  <MathView content={q.statement} />
                </div>

                {bm.notes && (
                  <div className="p-2.5 rounded-lg bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 text-xs text-amber-900 dark:text-amber-200">
                    <strong className="font-semibold block text-[10px] uppercase tracking-wider mb-0.5">
                      Student Revision Note
                    </strong>
                    <MathView content={bm.notes} />
                  </div>
                )}

                <div className="flex items-center justify-between pt-2 border-t border-border text-xs">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => toggleSolution(bm.id)}
                    className="text-xs h-7 px-2.5 text-primary hover:text-primary gap-1.5"
                  >
                    {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    <span>{isRevealed ? "Hide Solution" : "View Step-by-Step Solution"}</span>
                  </Button>

                  <Link href={`/generate?parentPyq=${q.id}`}>
                    <Button size="sm" variant="outline" className="text-xs h-7 gap-1">
                      <Sparkles className="w-3 h-3 text-primary" />
                      <span>Generate Similar</span>
                    </Button>
                  </Link>
                </div>

                {isRevealed && (
                  <div className="p-4 rounded-xl bg-muted/40 border border-border space-y-2 text-xs animate-in fade-in-50">
                    <span className="font-bold text-foreground flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Verified Solution</span>
                    </span>
                    <div className="space-y-1.5 text-muted-foreground pt-1">
                      {q.stepByStepSolution.map((s, sIdx) => (
                        <div key={sIdx} className="flex items-start gap-1.5">
                          <span className="font-mono">{sIdx + 1}.</span>
                          <MathView content={s} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </Card>
            );
          })
        )}
      </div>

      {/* Create Notebook Dialog */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-base font-bold">Create Smart Notebook</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleCreate} className="space-y-4 py-2">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-foreground">Notebook Title</label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. Challenging Optics PYQs"
                className="w-full text-xs p-2 rounded-lg border border-input bg-background focus:ring-1 focus:ring-primary"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-foreground">Description</label>
              <textarea
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                placeholder="Target conceptual scope..."
                className="w-full text-xs p-2 rounded-lg border border-input bg-background focus:ring-1 focus:ring-primary h-20"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
              <Button type="button" variant="outline" size="sm" onClick={() => setIsCreateOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" size="sm" className="bg-primary text-white">
                Create Notebook
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

