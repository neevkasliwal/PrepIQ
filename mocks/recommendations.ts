export interface RecommendationItem {
  id: string;
  type: "TEST" | "REVISION" | "PYQ_SET" | "DOCUMENT_INSIGHT";
  title: string;
  subtitle: string;
  badge: string;
  actionText: string;
  targetRoute: string;
  estimatedMinutes: number;
  priority: "HIGH" | "MEDIUM" | "LOW";
}

export const MOCK_RECOMMENDATIONS: RecommendationItem[] = [
  {
    id: "rec-weak-lom",
    type: "TEST",
    title: "Overcome Weak Area: Frictional Dynamics",
    subtitle: "Your accuracy on Laws of Motion dropped to 66.7%. Practice 5 curated problems from HC Verma and recent NTA shifts.",
    badge: "Priority Fix",
    actionText: "Start Diagnostic Drill",
    targetRoute: "/tests/cbt/test-phy-lom-wep",
    estimatedMinutes: 45,
    priority: "HIGH"
  },
  {
    id: "rec-pyq-2024-replay",
    type: "PYQ_SET",
    title: "NTA 2024 January Shift 1 Complete Replay",
    subtitle: "High correlation with upcoming JEE Main trends. All questions verified against official NTA master answer key.",
    badge: "Recommended PYQ",
    actionText: "Explore Shift Paper",
    targetRoute: "/pyqs?year=2024&shift=27 Jan Shift 1",
    estimatedMinutes: 60,
    priority: "MEDIUM"
  },
  {
    id: "rec-doc-chem-ncert",
    type: "DOCUMENT_INSIGHT",
    title: "NCERT Class 12 Chemistry Organic Chapters Extracted",
    subtitle: "8 chapters and 60 potential examination questions identified from your uploaded document.",
    badge: "New Content",
    actionText: "Generate Questions",
    targetRoute: "/generate?doc=doc-ncert-chem-12",
    estimatedMinutes: 15,
    priority: "MEDIUM"
  }
];

