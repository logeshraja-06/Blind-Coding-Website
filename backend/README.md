# BLINDCODE — Backend Architecture Specification

This directory is prepared for Phase 2 MERN backend integration. The React frontend in `src/` communicates via `src/services/api.js`, which is pre-configured to point to these endpoints whenever `VITE_API_BASE_URL` is provided.

## Planned Endpoints:

### 1. Participants & Registration
- `POST /api/participants/register` - Register a student and assign a unique token
- `GET /api/participants/me` - Retrieve current participant session

### 2. Quiz & Questions
- `GET /api/quiz/questions` - Fetch active 25 quiz questions (without answers exposed)
- `POST /api/quiz/submit` - Validate answers server-side, calculate score, and record completion timestamp

### 3. Admin & Exports
- `GET /api/admin/stats` - Consolidated metrics (total registered, completed, average score)
- `GET /api/admin/participants` - Paginated candidate list with filter & search
- `GET /api/admin/results` - Live sorted leaderboard
- `GET /api/admin/export/pdf` - Stream generated PDF merit report
- `GET /api/admin/export/xlsx` - Stream generated XLSX roster

## Data Models:
- `models/Participant.js` (name, regNo, dept, year, class, section, status)
- `models/Question.js` (question, codeSnippet, options, correctAnswer, explanation, category, difficulty)
- `models/Submission.js` (participantId, answersMap, score, timeTakenSeconds, submittedAt)
