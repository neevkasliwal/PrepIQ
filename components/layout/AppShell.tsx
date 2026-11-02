"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import { AppSidebar } from "./AppSidebar";
import { AppHeader } from "./AppHeader";
import { useAppStore } from "@/store/useAppStore";

export const AppShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const theme = useAppStore((state) => state.theme);

  useEffect(() => {
    if (typeof document !== "undefined") {
      if (theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, [theme]);

  // Check if CBT exam or auth/onboarding
  const isCBTExam = pathname.includes("/tests/cbt/");
  const isAuthOrOnboarding =
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/forgot-password" ||
    pathname === "/onboarding";

  if (isCBTExam) {
    // Pure distraction-free CBT interface
    return <div className="min-h-screen bg-slate-900 text-slate-100">{children}</div>;
  }

  if (isAuthOrOnboarding) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <main className="flex-1 flex items-center justify-center p-4">{children}</main>
      </div>
    );
  }

  // Standard Dashboard Layout
  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      <div className="flex-1 flex h-full overflow-hidden">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <AppHeader />
          <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-slate-50/50 dark:bg-slate-950/40">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

