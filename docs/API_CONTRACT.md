# PrepIQ — REST API Architecture & Contract Specification

This document details the backend service specifications for **PrepIQ**. While Part 1 utilizes a simulated frontend service layer and persistent client store, the system is designed to plug directly into these RESTful endpoints in Part 2.

---

## Base URL
```
Production: https://api.prepiq.edu/v1
Development: http://localhost:8080/v1
```

## Global Headers
- `Authorization: Bearer <JWT_ACCESS_TOKEN>`
- `Content-Type: application/json`
- `X-PrepIQ-Client: web-v1.0.0`

---

## 1. Authentication & User Profile

### `POST /auth/login`
- **Auth**: None
- **Payload**:
```json
{
  "email": "aarav.sharma@prepiq.edu",
  "password": "SecurePassword123!"
}
```
- **Success (200 OK)**:
```json
{
  "user": {
    "id": "user-aarav-sharma",
    "name": "Aarav Sharma",
    "email": "aarav.sharma@prepiq.edu",
    "targetExamId": "jee-main",
    "examYear": 2025,
    "targetScore": 260,
    "preparationStage": "Advanced"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```
- **Error (401 Unauthorized)**:
```json
{ "code": "INVALID_CREDENTIALS", "message": "The email or password entered is incorrect." }
```

### `GET /auth/me`
- **Auth**: Required
- **Response**: Current `UserProfile` object.

---

## 2. Examination Configurations

### `GET /exams`
- **Auth**: Optional
- **Response**: List of supported examination metadata (`id`, `name`, `abbreviation`, `level`, `conductingAuthority`).

### `GET /exams/{examId}/config`
- **Auth**: Optional
- **Response**: Full `ExamConfiguration` object including subject hierarchies, section definitions, marking schemes (+4/-1 or non-negative), time limits, and instructions.

---

## 3. Previous Year Questions (PYQ)

### `GET /pyqs`
- **Query Parameters**:
  - `examId` (string, e.g. `jee-main`)
  - `year` (integer, e.g. `2024`)
  - `subjectId` (string, e.g. `sub-phy`)
  - `chapterId` (string, e.g. `chap-lom`)
  - `difficulty` (`EASY` | `MEDIUM` | `HARD`)
  - `page` (int), `limit` (int)
- **Response (200 OK)**:
```json
{
  "data": [
    {
      "id": "pyq-jee-2024-phy-01",
      "examId": "jee-main",
      "year": 2024,
      "sessionOrShift": "27 Jan Shift 1",
      "subjectId": "sub-phy",
      "chapterId": "chap-lom",
      "questionType": "SINGLE_CORRECT",
      "difficulty": "MEDIUM",
      "statement": "A block of mass m = 5 kg...",
      "options": [{ "id": "opt-1", "label": "A", "text": "15 m/s" }],
      "correctOption": 0,
      "stepByStepSolution": ["Step 1...", "Step 2..."],
      "sourceReference": "NTA JEE Main 2024 (27 Jan Shift 1, Q.04)",
      "verificationStatus": "VERIFIED",
      "provenance": "ORIGINAL_PYQ"
    }
  ],
  "total": 42,
  "page": 1
}
```

---

## 4. Question Generation & AI Augmentation

### `POST /questions/generate`
- **Auth**: Required
- **Payload**:
```json
{
  "examId": "jee-main",
  "subjectId": "sub-phy",
  "chapterId": "chap-lom",
  "sourceDocumentId": "doc-hcv-mech-1",
  "parentPyqId": "pyq-jee-2024-phy-01",
  "count": 5,
  "difficulty": "MEDIUM"
}
```
- **Response (201 Created)**:
```json
{
  "generationId": "gen-batch-9812",
  "questions": [
    {
      "id": "gen-phy-lom-var-01",
      "provenance": "GENERATED_SIMILAR",
      "parentPyqId": "pyq-jee-2024-phy-01",
      "statement": "A block of mass m = 4 kg...",
      "options": [...],
      "correctOption": 0
    }
  ]
}
```

---

## 5. Documents & Study Materials

### `POST /documents/upload`
- **Auth**: Required
- **Payload**: `multipart/form-data` with `file`, `examId`, `subjectId`.
- **Response (202 Accepted)**:
```json
{
  "documentId": "doc-hcv-mech-1",
  "status": "PROCESSING",
  "estimatedTimeSeconds": 8
}
```

### `GET /documents/{documentId}/chapters`
- **Auth**: Required
- **Response**: Extracted chapter taxonomy with key concept tags and question count estimation.

---

## 6. CBT Test Engine & Attempts

### `POST /attempts/start`
- **Auth**: Required
- **Payload**: `{ "testId": "test-jee-full-01" }`
- **Response**: `{ "attemptId": "attempt-101", "serverStartTime": "2024-10-26T09:00:00Z" }`

### `POST /attempts/{attemptId}/response`
- **Auth**: Required
- **Payload**:
```json
{
  "questionId": "pyq-jee-2024-phy-01",
  "state": "ANSWERED",
  "selectedOption": 0,
  "timeSpentSeconds": 145
}
```

### `POST /attempts/{attemptId}/submit`
- **Auth**: Required
- **Payload**: `{ "forceSubmit": false }`
- **Response (200 OK)**:
```json
{
  "attemptId": "attempt-101",
  "totalScore": 34,
  "maxScore": 48,
  "accuracyPercentage": 81.8,
  "subjectBreakdown": {
    "Physics": { "score": 15, "maxScore": 24, "accuracy": 80.0 },
    "Chemistry": { "score": 12, "maxScore": 12, "accuracy": 100.0 },
    "Mathematics": { "score": 7, "maxScore": 12, "accuracy": 66.7 }
  }
}
```

---

## 7. Performance Analytics & AI Mentor

### `GET /analytics/overview`
- **Auth**: Required
- **Response**: Tests attempted, average score, subject accuracies, weak chapters list, and score progression.

### `POST /mentor/chat`
- **Auth**: Required
- **Payload**: `{ "message": "Find my weakest chapters", "activeContextExamId": "jee-main" }`
- **Response**:
```json
{
  "reply": "Based on error analysis from your saved attempts...",
  "suggestedActions": [
    { "label": "Practice Weak Areas", "route": "/weak-areas" }
  ]
}
```

