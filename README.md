# PrepIQ — AI-Powered Competitive Examination Preparation Platform
### College Project Demonstration Prototype (Part 1: Frontend Architecture)

PrepIQ is a next-generation competitive examination preparation platform designed for serious aspirants of **JEE Main**, **JEE Advanced**, **COMEDK UGET**, **MHT-CET PCM**, **GATE CS**, and **NEET UG**.

It unifies **uploaded study materials**, **previous-year questions (PYQs)**, **computer-based testing (CBT)**, and **diagnostic performance analytics** into a single cohesive learning continuum.

---

## 1. Quick Start & Execution

### Prerequisites
- Node.js `v18+` or `v20+`
- npm `v9+` or `v10+`

### Installation
```bash
# Clone the repository and navigate to the project directory
cd CBT

# Install all dependencies (Next.js, React, Tailwind, Recharts, KaTeX, Zustand, Radix UI)
npm install

# Launch the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to interact with the platform.

### Production Build Verification
```bash
# Verify strict TypeScript typing and compile production assets
npm run build

# Start the optimized production server
npm run start
```

---

## 2. Product Architecture & Navigation

The platform features an extensible multi-examination architecture organized into 13 core sections:

1. **Dashboard (`/dashboard`)**: Central cockpit displaying target examination, score goals, live analytics, subject mastery progress, weak chapter callouts, and daily goal pacing.
2. **My Library (`/library`)**: Document management supporting simulated drag-and-drop PDF uploads, syllabus taxonomy extraction, and concept mapping.
3. **Previous Year Questions (`/pyqs`)**: MARKS-inspired PYQ explorer with chapter-wise and paper-wise filtering, step-by-step LaTeX solutions, official answer key attributions, and "Generate Similar" augmentation.
4. **Question Generation Engine (`/generate`)**: Provenance-aware generation engine allowing students to synthesize practice questions from parent PYQs, uploaded textbooks, or weak topics.
5. **My Tests & Custom Builder (`/tests`)**: Catalog of grand mock tests and an interactive builder to construct custom chapter-wise drills.
6. **Live CBT Examination Interface (`/tests/cbt/[testId]`)**: Distraction-free, full-screen examination environment with countdown timer, question palette (Answered, Not Answered, Marked for Review, Not Visited), section navigation, instant evaluation, and confetti celebration.
7. **Performance Analytics (`/analytics`)**: Detailed visual dashboards powered by Recharts (subject mastery bars, chapter-level diagnostic accuracy, score progression curve, outcome distribution).
8. **Weak Areas (`/weak-areas`)**: In-depth conceptual diagnosis identifying error patterns (e.g. angle of repose vs inclination, King's rule division slips) with surgical remedial drills.
9. **Bookmarks & Smart Notebooks (`/bookmarks`)**: Vault for saving challenging questions with student revision annotations across custom notebooks.
10. **Formula Cards (`/formulas`)**: Curated revision cards with LaTeX KaTeX mathematical formulas, explanations, and explicit variable definitions.
11. **Previous Attempts (`/history`)**: Complete audit trail of past tests with deep item-by-item response reviews (`/history/[attemptId]`).
12. **AI Mentor (`/mentor`)**: Context-aware educational assistant referencing the student's exact performance metrics, recent mistakes, and study plan.
13. **References & Exam Resources (`/references`)**: Direct links to official conducting authorities (NTA, IITs, COMEDK, State CET Cell, IIT Guwahati).
14. **Settings & Demo Controls (`/settings`)**: Presentation control panel with a single-click "Reset Demo Data" button, profile customization, and dark/light mode toggles.

---

## 3. End-to-End Demonstration Workflows

PrepIQ is preloaded with consistent demonstration data for aspirant **Aarav Sharma**:

- **Workflow A (Document to Practice Test)**: Open *My Library* → Upload PDF study material → Observe simulated extraction → Click "Generate Questions" from document → Launch CBT test.
- **Workflow B (PYQ-Based Preparation)**: Open *PYQs* → Select *Physics* → *Laws of Motion* → Attempt question → Reveal step-by-step solution → Click "Generate Similar Question" → View synthesized variation.
- **Workflow C (Custom Chapter Drill)**: Open *My Tests* → Click "Build Custom Test" → Select chapters and question sources → Attempt timed CBT exam → Submit and view instantaneous scoring.
- **Workflow D (Diagnostic Analytics)**: Open *Analytics* → Inspect subject comparisons and score progression → Open *Weak Areas* → Review exact diagnostic error pattern.
- **Workflow E (AI Mentor Guidance)**: Open *AI Mentor* → Click "Analyse my last three tests" or "Find my weakest chapters" → Review tailored recommendations and click direct action routes.

---

## 4. Completed Frontend Deliverables (Part 1)

- [x] Complete Next.js 14 App Router and strict TypeScript configuration
- [x] Premium SaaS design system with light/dark theme support
- [x] Multi-examination configuration registry (JEE Main, JEE Adv, COMEDK, MHT-CET, GATE, NEET)
- [x] Interactive student onboarding & mock authentication
- [x] Document library with simulated PDF extraction
- [x] PYQ intelligence explorer with step-by-step verified solutions
- [x] AI Question generator with provenance labeling (`ORIGINAL_PYQ`, `GENERATED_SIMILAR`, `DOCUMENT_BASED`)
- [x] Full-fledged CBT examination engine with palette, timer, mark-for-review, and instant scoring
- [x] Recharts performance analytics and weak-area diagnosis
- [x] Bookmarks and smart notebooks with local persistence
- [x] Formula revision cards with KaTeX LaTeX rendering
- [x] Contextual AI Mentor chat assistant
- [x] Official examination references and syllabi
- [x] Persistent state via Zustand with one-click "Reset Demo Data"
- [x] REST API client specification document (`docs/API_CONTRACT.md`)

---

## 5. Features Prepared for Part 2 Backend Integration

The frontend architecture has been decoupled via the service layer (`services/`) and TypeScript interfaces (`types/`):

1. **Production Authentication**: Replace mock auth with OAuth 2.0 / JWT backend verification.
2. **Real Document OCR & PDF Extraction**: Connect `/documents/upload` to an asynchronous document processing pipeline.
3. **LLM Question Generation API**: Connect `/questions/generate` to a fine-tuned question synthesis service.
4. **Persistent Multi-User Database**: Migrate client localStorage to PostgreSQL / MongoDB.
5. **Real Examination Security**: Implement server-side timer verification and proctoring.

