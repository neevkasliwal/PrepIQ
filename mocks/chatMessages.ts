import { ChatMessage } from "@/types";

export const INITIAL_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: "msg-welcome",
    sender: "assistant",
    content: `Hello **Aarav**! I am your **PrepIQ AI Mentor**.\n\nI have continuous visibility into your **JEE Main 2025** study materials, previous year questions practice, and your recent CBT mock test attempts.\n\nHere is a quick snapshot of your active preparation:\n- **Recent CBT Attempt**: JEE Main 2025 All-India Grand Mock Test 01 — **Score: 34/48** (Accuracy: **81.8%**)\n- **Strongest Subject**: **Chemistry** (100% accuracy, perfect score on Chemical Bonding & Carbonyls)\n- **Identified Weak Area**: **Laws of Motion (Frictional Inclines)** & **Definite Integrals**\n- **Curated Bookmarks**: 5 questions across 4 Smart Notebooks\n\nHow would you like to direct our revision session today?`,
    timestamp: "Just now",
    suggestedPrompts: [
      "Analyse my last three tests",
      "Find my weakest chapters",
      "Explain my incorrect answers",
      "Generate questions on my weakest topic",
      "Create a seven-day study plan",
      "Show me important PYQs from my weakest chapter"
    ]
  }
];

export const CONTEXTUAL_RESPONSES: Record<string, { content: string; actions?: { label: string; route: string }[] }> = {
  "analyse my last three tests": {
    content: `### Performance Diagnostic Report\n\nAcross your recent test attempts (**Grand Mock Test 01** and **Mechanics Diagnostic Test**):\n\n1. **Overall Cumulative Score**: **45 / 64 marks** (Combined Accuracy: **78.6%**).\n2. **Subject Breakdown**:\n   - **Chemistry**: $\\mathbf{100\\%}$ accuracy. You answered every carbonyl and bonding question accurately with an average response time of **81 seconds**.\n   - **Physics**: $\\mathbf{77.8\\%}$ accuracy. Strong performance on variable force integration, but dropped marks on friction on inclined planes.\n   - **Mathematics**: $\\mathbf{66.7\\%}$ accuracy. You mastered skew line shortest distances, but made an algebraic slip on the definite integral variation.\n\n3. **Time Efficiency**: You spent an average of **128 seconds** per question, which is comfortably within the 120-second target for JEE Main single-choice problems.`,
    actions: [
      { label: "View Full Analytics", route: "/analytics" },
      { label: "Inspect Test History", route: "/history" }
    ]
  },
  "find my weakest chapters": {
    content: `### Identified Priority Areas\n\nBased on error analysis from your saved attempts:\n\n1. **Laws of Motion & Friction** (Physics)\n   - *Accuracy*: **66.7%**\n   - *Error Pattern*: In question \`gen-doc-hcv-lom-01\` from *HC Verma Mechanics*, you calculated normal force without verifying whether the inclination angle was less than the angle of repose ($\\tan 30^\\circ = 0.577 < \\mu_s = 0.6$).\n\n2. **Definite Integrals & Properties** (Mathematics)\n   - *Accuracy*: **66.7%**\n   - *Error Pattern*: Dropped marks on \`gen-math-int-var-01\` by misapplying the upper limit transformation under King's property.\n\n3. **Recommended Action**: Complete a 10-question targeted practice session on *Friction & Inclined Planes* before taking another full mock.`,
    actions: [
      { label: "Practice Weak Areas", route: "/weak-areas" },
      { label: "Generate Targeted Practice", route: "/generate" }
    ]
  },
  "explain my incorrect answers": {
    content: `### Deep Dive: Mistake Analysis from Last Attempt\n\nYou had **2 incorrect responses** in *JEE Main All-India Grand Mock Test 01*:\n\n#### 1. Physics: \`gen-doc-hcv-lom-01\` (HC Verma Mechanics)\n- **Your Choice**: Option B ($10.0\\text{ N}$)\n- **Correct Choice**: Option D (*Block does not slide even without external force*)\n- **Key Takeaway**: The inclination is $\\theta = 30^\\circ$. Note that $\\tan 30^\\circ \\approx 0.577$, whereas the coefficient of static friction is $\\mu_s = 0.600$. Because $\\tan\\theta < \\mu_s$, gravity alone cannot overcome static friction! Always check the angle of repose before writing force equilibrium.\n\n#### 2. Mathematics: \`gen-math-int-var-01\` (Calculus)\n- **Your Choice**: Option B ($\\pi/2$)\n- **Correct Choice**: Option A ($\\pi/4$)\n- **Key Takeaway**: When adding $I + I = 2I = \\int_0^{\\pi/2} 1 dx = \\pi/2$, remember to divide by 2 at the end to get $I = \\pi/4$. A classic pacing slip!`,
    actions: [
      { label: "Review All Solutions", route: "/history/attempt-demo-01" },
      { label: "View in Notebook", route: "/bookmarks" }
    ]
  },
  "generate questions on my weakest topic": {
    content: `I have prepared a custom generation query targeted directly at your primary weakness: **Laws of Motion & Friction**.\n\n- **Target Subject**: Physics\n- **Target Chapter**: Laws of Motion & Friction\n- **Focus Concept**: Angle of Repose & Constraint Force Dynamics\n- **Source Material**: Uploaded *HC Verma Vol 1 (Mechanics)* + NTA PYQ Variations\n- **Suggested Question Count**: 5 Questions (Medium to Hard Difficulty)\n\nClick below to open the configured Question Generator and review the questions!`,
    actions: [
      { label: "Open Generator Config", route: "/generate?chapter=chap-lom&subject=sub-phy" }
    ]
  },
  "create a seven-day study plan": {
    content: `### Personalized 7-Day Strategy for Aarav Sharma\n\n- **Day 1 (Physics Revision)**: Review *HC Verma Chapter 5* on Friction. Re-attempt the 2 bookmarked questions in your notebook.\n- **Day 2 (Mathematics Calculus)**: Practice 15 King's Property & Leibnitz Rule PYQs from 2022-2024.\n- **Day 3 (Targeted Practice Test)**: Attempt a 45-minute customized CBT test on *Mechanics + Vectors*.\n- **Day 4 (Chemistry Maintenance)**: Quick formula review on Coordination Compounds & MOT (1 hour).\n- **Day 5 (Error Log Revision)**: Review all explanations in *Questions to Reattempt* notebook.\n- **Day 6 (Full Mock Test)**: Attempt *JEE Main Full Mock Test 02* under strict CBT conditions.\n- **Day 7 (Diagnostic & Rest)**: Analyze score trend with PrepIQ Analytics and refine revision cards.`,
    actions: [
      { label: "View Formula Cards", route: "/formulas" },
      { label: "Start Recommended Test", route: "/tests" }
    ]
  },
  "show me important pyqs from my weakest chapter": {
    content: `Here are the top-frequency NTA previous year questions for **Laws of Motion & Friction**:\n\n1. **NTA JEE Main 2024 (27 Jan Shift 1)**: Time-dependent force $F(t) = 6t$ acceleration integration.\n2. **NTA JEE Main 2023 (08 Apr Shift 1)**: Two-block friction threshold with variable coefficient.\n3. **NTA JEE Main 2022 (25 Jun Shift 2)**: Pulley-wedge constraint relation with accelerating frame.\n\nAll of these are available with step-by-step verified solutions in the PYQ Explorer!`,
    actions: [
      { label: "Explore Chapter PYQs", route: "/pyqs?chapter=chap-lom" }
    ]
  }
};

