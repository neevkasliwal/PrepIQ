"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppStore } from "@/store/useAppStore";
import { cn } from "@/utils/cn";
import {
  LayoutDashboard,
  FolderOpen,
  HelpCircle,
  Sparkles,
  FileText,
  BarChart3,
  AlertOctagon,
  Bookmark,
  Sigma,
  History,
  BotMessageSquare,
  BookOpenCheck,
  Settings,
  LogOut
} from "lucide-react";

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string | number;
  highlight?: boolean;
}

export const AppSidebar: React.FC = () => {
  const pathname = usePathname();
  const { documents, bookmarks, currentUser } = useAppStore((state) => ({
    documents: state.documents,
    bookmarks: state.bookmarks,
    currentUser: state.currentUser,
  }));

  const navGroups: { label: string; items: NavItem[] }[] = [
    {
      label: "PREPARATION WORKFLOW",
      items: [
        { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
        { name: "My Library", href: "/library", icon: FolderOpen, badge: documents.length },
        { name: "Previous Year (PYQ)", href: "/pyqs", icon: HelpCircle, highlight: true },
        { name: "Generate Questions", href: "/generate", icon: Sparkles },
        { name: "My Tests & Builder", href: "/tests", icon: FileText }
      ]
    },
    {
      label: "INTELLIGENCE & ANALYSIS",
      items: [
        { name: "Analytics", href: "/analytics", icon: BarChart3 },
        { name: "Weak Areas", href: "/weak-areas", icon: AlertOctagon, badge: "2 Active" },
        { name: "Previous Attempts", href: "/history", icon: History },
        { name: "AI Mentor", href: "/mentor", icon: BotMessageSquare, highlight: true }
      ]
    },
    {
      label: "REVISION & RESOURCES",
      items: [
        { name: "Bookmarks & Notebooks", href: "/bookmarks", icon: Bookmark, badge: bookmarks.length },
        { name: "Formula Cards", href: "/formulas", icon: Sigma },
        { name: "References & Syllabi", href: "/references", icon: BookOpenCheck },
        { name: "Settings & Controls", href: "/settings", icon: Settings }
      ]
    }
  ];

  return (
    <aside className="w-64 border-r border-border bg-card/60 backdrop-blur-md flex flex-col h-full select-none shrink-0 transition-all duration-200">
      {/* Nav list */}
      <div className="flex-1 overflow-y-auto pt-4 pb-3 px-3 space-y-5">
        {navGroups.map((group) => (
          <div key={group.label} className="space-y-1">
            <h4 className="text-[10px] font-semibold tracking-wider text-muted-foreground/80 px-2.5 mb-1.5 uppercase font-mono">
              {group.label}
            </h4>
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium transition-all group",
                      isActive
                        ? "bg-primary text-primary-foreground shadow-sm shadow-primary/25 font-semibold"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/60"
                    )}
                  >
                    <div className="flex items-center space-x-2.5 truncate">
                      <Icon
                        className={cn(
                          "w-4 h-4 shrink-0 transition-colors",
                          isActive
                            ? "text-primary-foreground"
                            : item.highlight
                            ? "text-primary group-hover:text-primary"
                            : "text-muted-foreground group-hover:text-foreground"
                        )}
                      />
                      <span className="truncate">{item.name}</span>
                    </div>

                    {item.badge !== undefined && (
                      <span
                        className={cn(
                          "text-[10px] px-1.5 py-0.5 rounded-full font-mono font-medium ml-2 shrink-0",
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-muted text-muted-foreground"
                        )}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Footer / Student Status */}
      <div className="p-3 border-t border-border/80 bg-background/50 flex items-center justify-between gap-1">
        <Link
          href="/settings"
          className="flex items-center space-x-2.5 p-1.5 rounded-lg hover:bg-accent/50 transition-colors text-left flex-1 min-w-0"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center text-white text-xs font-bold shadow-inner shrink-0">
            AS
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-foreground truncate">{currentUser.name}</p>
            <p className="text-[10px] text-muted-foreground truncate">{currentUser.targetExamId.toUpperCase()} Aspirant</p>
          </div>
        </Link>

        <Link href="/login" title="Sign Out / Switch Account">
          <button
            type="button"
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent/60 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </Link>
      </div>
    </aside>
  );
};

