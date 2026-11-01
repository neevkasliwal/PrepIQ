"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useAppStore } from "@/store/useAppStore";
import { MathView } from "@/components/ui/math-view";
import {
  BotMessageSquare,
  Sparkles,
  Send,
  User,
  RotateCcw,
  ArrowRight,
  ExternalLink,
  Flame,
  HelpCircle,
  Zap,
  BarChart3
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function MentorPage() {
  const { chatMessages, sendChatMessage, clearChat, isChatTyping, currentUser } = useAppStore();
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedPrompts = [
    "Analyse my last three tests",
    "Find my weakest chapters",
    "Explain my incorrect answers",
    "Generate questions on my weakest topic",
    "Create a seven-day study plan",
    "Show me important PYQs from my weakest chapter"
  ];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendChatMessage(inputText);
    setInputText("");
  };

  const handlePromptClick = (prompt: string) => {
    sendChatMessage(prompt);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, isChatTyping]);

  return (
    <div className="h-[calc(100vh-6.5rem)] flex flex-col max-w-6xl mx-auto space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-border shrink-0">
        <div className="flex items-center space-x-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-primary-600 flex items-center justify-center text-white shadow-sm">
            <BotMessageSquare className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold tracking-tight text-foreground">
                PrepIQ AI Mentor
              </h1>
              <Badge variant="purple" className="text-[10px] font-mono">
                Context-Aware Assistant
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              Synthesizing diagnostics, PYQ patterns, and study materials for {currentUser.name} ({currentUser.targetExamId.toUpperCase()})
            </p>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={clearChat}
          className="text-xs h-7 gap-1 text-muted-foreground hover:text-foreground"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset Session</span>
        </Button>
      </div>

      {/* Main Conversation Stream */}
      <div className="flex-1 overflow-y-auto space-y-4 p-4 rounded-2xl bg-card border border-border shadow-xs">
        {chatMessages.map((msg) => {
          const isBot = msg.sender === "assistant";

          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isBot ? "" : "flex-row-reverse"}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-xs ${
                  isBot
                    ? "bg-gradient-to-tr from-indigo-600 to-primary text-white shadow-sm"
                    : "bg-slate-800 text-white"
                }`}
              >
                {isBot ? <Sparkles className="w-4 h-4" /> : "AS"}
              </div>

              <div
                className={`max-w-2xl p-4 rounded-2xl text-xs sm:text-sm leading-relaxed space-y-3 ${
                  isBot
                    ? "bg-muted/40 border border-border text-foreground shadow-xs"
                    : "bg-primary text-primary-foreground font-medium"
                }`}
              >
                <div className="math-content">
                  <MathView content={msg.content} />
                </div>

                {/* Suggested Action Buttons if present */}
                {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-border/80">
                    {msg.suggestedActions.map((action, aIdx) => (
                      <Link key={aIdx} href={action.route}>
                        <Button
                          size="sm"
                          variant="secondary"
                          className="h-7 text-xs gap-1.5 font-semibold bg-background hover:bg-accent border border-border shadow-xs"
                        >
                          <span>{action.label}</span>
                          <ArrowRight className="w-3 h-3" />
                        </Button>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isChatTyping && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs">
              <Sparkles className="w-4 h-4 animate-spin" />
            </div>
            <div className="p-3 rounded-2xl bg-muted/40 border border-border text-xs text-muted-foreground flex items-center gap-1.5 font-mono">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span>Analyzing diagnostic attempts & syllabus taxonomy...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompt Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 shrink-0">
        <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider shrink-0 mr-1">
          Suggestions:
        </span>
        {suggestedPrompts.map((p, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handlePromptClick(p)}
            className="px-2.5 py-1 rounded-full border border-border bg-card hover:bg-accent text-foreground text-[11px] whitespace-nowrap transition-colors cursor-pointer shadow-2xs"
          >
            {p}
          </button>
        ))}
      </div>

      {/* Input Bar */}
      <form onSubmit={handleSend} className="relative flex items-center gap-2 shrink-0">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask AI Mentor about test performance, weak chapters, or request a tailored study plan..."
          className="flex-1 px-4 py-2.5 text-xs rounded-xl border border-input bg-card focus:outline-none focus:ring-2 focus:ring-primary shadow-xs"
        />
        <Button type="submit" size="sm" className="h-9 px-4 gap-1.5 bg-primary text-white shrink-0">
          <span>Send</span>
          <Send className="w-3.5 h-3.5" />
        </Button>
      </form>
    </div>
  );
}

