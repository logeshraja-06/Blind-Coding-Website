# BLINDCODE — Backend API Specification & Documentation

The **BLINDCODE** backend is an Express.js & MongoDB (with High-Speed In-Memory fallback) REST API server supporting student registration, secure quiz delivery, Fisher-Yates question & option shuffling, activity telemetry, timer enforcement, and administrative oversight.

---

## 🚀 How to Run Backend

```bash
cd backend
npm install
npm run dev
# Server will run on http://localhost:5000
```

---

## 📡 API Endpoints Summary

### 1. Student Registration & Check
- `POST /api/students/register` — Register student or restore active attempt `[Implemented]`
- `GET /api/students/check/:registerNumber` — Verify student registration status `[Implemented]`

### 2. Quiz Delivery & Assessment
- `GET /api/quiz/config` — Public event configuration & availability `[Implemented]`
- `POST /api/quiz/start` — Start quiz countdown, assign randomized questions & options `[Implemented]`
- `GET /api/quiz/questions` — Fetch sanitized active questions (zero answer leakage) `[Implemented]`
- `PATCH /api/quiz/save-answer` — Real-time auto-save for student selected option `[Implemented]`
- `POST /api/quiz/activity` — Log tab switches and fullscreen exits `[Implemented]`
- `POST /api/quiz/submit` — Finalize attempt, compute score server-side `[Implemented]`
- `GET /api/quiz/result/:registerNumber` — Candidate private scorecard `[Implemented]`

### 3. Admin Management & Monitoring (Protected by JWT)
- `POST /api/admin/login` — Administrator authentication `[Implemented]`
- `GET /api/admin/dashboard` — Live metric overview and year-wise breakdown `[Implemented]`
- `GET /api/admin/participants` — Filtered and paginated participant list `[Implemented]`
- `GET /api/admin/activity` — Candidate activity log monitor & warning counts `[Implemented]`
- `GET /api/admin/leaderboard` — Official score-ranked leaderboard `[Implemented]`
- `GET /api/admin/questions` — Master question bank management `[Implemented]`
- `POST /api/admin/questions` — Add new question to bank `[Implemented]`
- `GET /api/admin/settings` — Read live event settings `[Implemented]`
- `PUT /api/admin/settings` — Update event schedule, warnings, and duration `[Implemented]`

### 4. Reports & Exports
- `GET /api/export/pdf` — Stream official PDF merit report `[Implemented]`
- `GET /api/export/xlsx` — Stream participant dataset in Excel XLSX format `[Implemented]`

---

## 🗄️ Core Data Models
- `models/Student.js` — Student profile
- `models/QuizAttempt.js` — Timestamps, score, assigned questions/option order, activity logs
- `models/Question.js` — Question bank with stable option IDs
- `models/Admin.js` — Admin credentials
- `models/EventConfig.js` — Live event configuration and security thresholds
