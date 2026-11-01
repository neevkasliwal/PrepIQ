"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAppStore } from "@/store/useAppStore";
import { UploadedDocument, ExtractedChapter } from "@/types";
import {
  FolderOpen,
  UploadCloud,
  FileText,
  Search,
  CheckCircle2,
  Clock,
  Sparkles,
  Trash2,
  ExternalLink,
  BookOpen,
  AlertCircle,
  Zap,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function LibraryPage() {
  const { documents, addDocument, updateDocumentStatus, deleteDocument, selectedExamId } = useAppStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDoc, setSelectedDoc] = useState<UploadedDocument | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const filteredDocs = documents.filter((doc) =>
    doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.fileName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const newDocId = `doc-${Date.now()}`;
    const newDoc: UploadedDocument = {
      id: newDocId,
      title: file.name.replace(/\.[^/.]+$/, ""),
      fileName: file.name,
      fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      fileSizeBytes: file.size,
      uploadedAt: new Date().toISOString(),
      status: "PROCESSING",
      processingProgress: 15,
      examId: selectedExamId,
      subjectId: "sub-phy",
      extractedChapters: [],
      sourceNotes: "Simulated document upload for demo presentation.",
      isDemoSample: false
    };

    addDocument(newDoc);
    setIsUploading(true);

    // Simulated 3-stage processing
    let prog = 25;
    const interval = setInterval(() => {
      prog += 25;
      setUploadProgress(prog);
      updateDocumentStatus(newDocId, "PROCESSING", prog);

      if (prog >= 100) {
        clearInterval(interval);
        setIsUploading(false);
        setUploadProgress(0);

        // Populate realistic extracted chapters
        const simulatedChapters: ExtractedChapter[] = [
          {
            id: `chap-${Date.now()}-1`,
            name: "Newton's Laws of Motion & Friction Dynamics",
            topicCount: 4,
            keyConcepts: ["Free Body Force Resolution", "Static vs Kinetic Friction", "Pseudo Forces in Accelerating Frames"],
            estimatedQuestions: 35
          },
          {
            id: `chap-${Date.now()}-2`,
            name: "Work, Energy & Conservative Force Fields",
            topicCount: 3,
            keyConcepts: ["Work-Kinetic Energy Theorem", "Potential Energy Gradient"],
            estimatedQuestions: 28
          }
        ];

        // Update to completed
        const updated = {
          ...newDoc,
          status: "COMPLETED" as const,
          processingProgress: 100,
          extractedChapters: simulatedChapters
        };
        // Replace in store
        deleteDocument(newDocId);
        addDocument(updated);
      }
    }, 600);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">My Library</h1>
            <Badge variant="purple" className="text-[10px] font-mono">
              OCR & Syllabus Extractor
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Upload textbooks, coaching modules and notes. PrepIQ identifies syllabus chapters and generates examination questions.
          </p>
        </div>

        {/* Upload Trigger */}
        <div className="relative">
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            id="file-upload"
            onChange={handleFileUpload}
            className="hidden"
            disabled={isUploading}
          />
          <label htmlFor="file-upload">
            <Button
              asChild
              disabled={isUploading}
              className="gap-2 cursor-pointer shadow-sm text-xs h-9"
            >
              <span>
                <UploadCloud className="w-4 h-4" />
                <span>{isUploading ? `Extracting (${uploadProgress}%)...` : "Upload PDF Study Material"}</span>
              </span>
            </Button>
          </label>
        </div>
      </div>

      {/* Demo Notice Banner */}
      <div className="p-3 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 flex items-start gap-3 text-xs text-blue-900 dark:text-blue-200">
        <Sparkles className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <strong className="font-semibold">Simulated Document Processing:</strong> When uploading any PDF, PrepIQ demonstrates the intended workflow by parsing document metadata and producing structured chapters and conceptual taxonomies. In Part 2, this interfaces with your production OCR and embedding pipeline.
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search documents by title or filename..."
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-input bg-card focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <span className="text-xs text-muted-foreground font-mono">
          {filteredDocs.length} {filteredDocs.length === 1 ? "Document" : "Documents"} Available
        </span>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDocs.map((doc) => {
          const isProcessing = doc.status === "PROCESSING";

          return (
            <Card
              key={doc.id}
              className="flex flex-col justify-between hover:border-primary/50 transition-all hover:shadow-md"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    {doc.status === "COMPLETED" ? (
                      <Badge variant="success" className="text-[10px] gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Ready</span>
                      </Badge>
                    ) : (
                      <Badge variant="warning" className="text-[10px] gap-1">
                        <Clock className="w-3 h-3 animate-spin" />
                        <span>Processing</span>
                      </Badge>
                    )}
                  </div>
                </div>
                <CardTitle className="text-sm font-semibold mt-2 line-clamp-1">{doc.title}</CardTitle>
                <p className="text-[11px] text-muted-foreground truncate">{doc.fileName}</p>
              </CardHeader>

              <CardContent className="space-y-3 pt-0">
                {isProcessing ? (
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[10px] text-muted-foreground">
                      <span>Extracting Syllabus Hierarchy...</span>
                      <span>{doc.processingProgress}%</span>
                    </div>
                    <Progress value={doc.processingProgress} className="h-1.5" />
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-1 border-t border-border">
                      <span>File Size: <strong className="text-foreground">{doc.fileSize}</strong></span>
                      <span>Chapters: <strong className="text-primary font-mono">{doc.extractedChapters.length}</strong></span>
                    </div>

                    <div className="p-2 rounded-lg bg-muted/40 space-y-1">
                      <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider block">
                        Extracted Taxonomy
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {doc.extractedChapters.slice(0, 2).map((c) => (
                          <span
                            key={c.id}
                            className="text-[10px] bg-card px-2 py-0.5 rounded border border-border text-foreground truncate max-w-[200px]"
                          >
                            {c.name}
                          </span>
                        ))}
                        {doc.extractedChapters.length > 2 && (
                          <span className="text-[10px] text-muted-foreground px-1 py-0.5">
                            +{doc.extractedChapters.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedDoc(doc)}
                    className="text-xs h-7 px-2 text-primary hover:text-primary gap-1"
                  >
                    <span>View Details</span>
                    <ExternalLink className="w-3 h-3" />
                  </Button>

                  <div className="flex items-center gap-1">
                    <Link href={`/generate?doc=${doc.id}`}>
                      <Button size="sm" variant="outline" className="text-xs h-7 px-2.5 gap-1">
                        <Zap className="w-3 h-3 text-amber-500" />
                        <span>Generate</span>
                      </Button>
                    </Link>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteDocument(doc.id)}
                      className="h-7 w-7 text-muted-foreground hover:text-destructive"
                      title="Delete document"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Document Detail Modal */}
      {selectedDoc && (
        <Dialog open={!!selectedDoc} onOpenChange={() => setSelectedDoc(null)}>
          <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-lg font-bold flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                <span>{selectedDoc.title}</span>
              </DialogTitle>
              <p className="text-xs text-muted-foreground">{selectedDoc.sourceNotes}</p>
            </DialogHeader>

            <div className="space-y-4 py-2">
              <div className="grid grid-cols-3 gap-3 p-3 bg-muted/40 rounded-xl text-xs">
                <div>
                  <span className="text-[10px] text-muted-foreground block">File Size</span>
                  <strong className="font-mono">{selectedDoc.fileSize}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-muted-foreground block">Uploaded Date</span>
                  <strong className="font-mono">{new Date(selectedDoc.uploadedAt).toLocaleDateString()}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-muted-foreground block">Extraction Status</span>
                  <span className="text-emerald-600 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Verified
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Extracted Chapters & Concept Maps ({selectedDoc.extractedChapters.length})
                </h4>

                <div className="space-y-2.5">
                  {selectedDoc.extractedChapters.map((chap) => (
                    <div key={chap.id} className="p-3 rounded-xl border border-border bg-card space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-foreground">{chap.name}</span>
                        <span className="text-[11px] font-mono text-primary bg-primary/10 px-2 py-0.5 rounded">
                          ~{chap.estimatedQuestions} Exam Questions Available
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {chap.keyConcepts.map((concept, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] bg-accent/80 text-accent-foreground px-2 py-0.5 rounded-full"
                          >
                            {concept}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-border">
                <Link href={`/generate?doc=${selectedDoc.id}`}>
                  <Button size="sm" className="gap-1.5 text-xs">
                    <Zap className="w-3.5 h-3.5" />
                    <span>Create Test from this Document</span>
                  </Button>
                </Link>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

