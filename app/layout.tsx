import type { Metadata } from "next";
import { AppShell } from "@/components/layout/AppShell";
import "./globals.css";

export const metadata: Metadata = {
  title: "PrepIQ — AI-Powered Competitive Exam Preparation Platform",
  description: "Next-generation computer-based testing, PYQ intelligence, study material synthesis, and diagnostic performance analytics for JEE Main, JEE Adv, COMEDK, MHT-CET, GATE, and NEET.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}

