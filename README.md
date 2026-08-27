# TECH FORCE presents BLIND CODING 2026
### MERN Stack Quiz Event Management Platform

A production-quality MERN Stack Quiz Event Management Platform engineered for the **Department of Computer Science and Engineering**, organized by the **CSE Association and CSI Student Chapter** under the banner of **TECH FORCE**.

---

## 🎯 Official Event Information

* **Organizing Department**: DEPARTMENT OF COMPUTER SCIENCE AND ENGINEERING
* **Academic Year**: 2025–2026
* **Organizers**: CSE Association and CSI Student Chapter
* **Event Name**: BLIND CODING
* **Tagline**: *Think Fast. Trust Your Logic. Code Beyond What You See.*
* **Event Date**: 31.07.2026 — Friday
* **Eligibility**: CSE Students (All Years)
* **Student Coordinators**:
  * **Mr. S. Logesh Raja** — IV Year CSE
  * **Mr. K. V. Hari Krishnan** — IV Year CSE
* **Faculty Coordinators**:
  * **Mrs. S. Somiya** — ASP/CSE
  * **Mrs. S. Ramya** — AP/CSE

---

## 💻 Tech Stack

### Frontend (`frontend/`)
* **React 19** with **Vite**
* **Tailwind CSS** (Custom brand palette: Tea Green `#C8D696`, Vanilla `#F6E6A5`, Celtic Blue `#3971B8`, Ivory `#FBFCEE`, Drab Dark `#343B1B`)
* **Framer Motion** for micro-interactions and transitions
* **React Router DOM v7**
* **Lucide React Icons**
* **Google Fonts**: *Comfortaa* (Headings/Branding) & *Poppins* (Body/Forms)

### Backend (`backend/`)
* **Node.js & Express.js**
* **MongoDB & Mongoose** (with automated zero-config in-memory persistence layer)
* **JWT (JSON Web Tokens)** & **bcryptjs** password hashing
* **PDF & CSV/Excel Streaming Reports**

---

## 🔒 Key Security & Integrity Features

1. **Randomized Question & Option Shuffling**: Questions and their options are dynamically randomized per candidate via the **Fisher-Yates** algorithm upon quiz start and locked for the session attempt.
2. **Server-Side Scoring**: The `correctAnswer` is NEVER transmitted to student-facing APIs (`/api/quiz/questions`). All scores are strictly computed on the backend upon submission.
3. **Mandatory Fullscreen & Tab Switch Monitoring**: Browser visibility and fullscreen exit states are tracked with server-side warning enforcement and auto-submission on exceeding limits.
4. **Compulsory Numeric Register Number**: Every student enters their official college register number (e.g. `953710`). Duplicate attempts are automatically blocked.
5. **Private Result Screen**: Students see only their own score (`22 / 25`), percentage (`88%`), and performance grade. No answer keys or other candidates' scores are visible to participants.
6. **Admin-Only Leaderboard**: The official ranking and merit podium (ranked by score, then fastest completion time) is strictly accessible through protected admin JWT routes.

---

## 🚀 How to Run Locally

### 1. Start the Backend API Server
```powershell
cd backend
npm install
npm run dev
```
The server will start on `http://localhost:5000` with pre-seeded structured questions and configured admin authentication parameters.

### 2. Start the Frontend Development Server
```powershell
cd frontend
npm install
npm run dev
```
Open `http://localhost:5173/` in your browser.

---

## 📁 Project Structure

```text
Blind-Coding-Website/
├── frontend/                    # React Frontend Application
│   ├── public/                  # Static assets & Tech Force logo
│   ├── src/                     # Source code
│   │   ├── assets/logo/         # TechForceLogo component & assets
│   │   ├── components/
│   │   │   ├── common/          # FloatingCodeBg, AnimatedCounter
│   │   │   ├── layout/          # Navbar, Footer, PageTransition
│   │   │   ├── ui/              # Button, Card, Input, Modal, Badge, ProgressBar
│   │   │   ├── quiz/            # QuizHeader, QuestionCard, OptionItem, QuestionNavigator, ActivityWarningModal
│   │   │   └── admin/           # AdminSidebar
│   │   ├── context/             # AuthContext, QuizContext, ToastContext
│   │   ├── data/                # 25 Curated questions & initial participants
│   │   ├── pages/               # Home, Register, Welcome, Quiz, Result
│   │   │   └── admin/           # AdminLogin, AdminDashboard, AdminParticipants, AdminActivity, AdminResults, etc.
│   │   ├── services/api.js      # Client API service
│   │   ├── App.jsx              # React Router setup
│   │   └── index.css            # Custom theme & typography
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
├── backend/                     # Node.js + Express Backend
│   ├── config/db.js             # DB Connection & Memory Store
│   ├── controllers/             # studentController, quizController, adminController, exportController
│   ├── middleware/              # JWT protectAdmin middleware
│   ├── models/                  # Student, Question, QuizAttempt, Admin, EventConfig
│   ├── routes/                  # studentRoutes, quizRoutes, adminRoutes, exportRoutes
│   ├── utils/                   # seedData.js, shuffle.js
│   ├── server.js                # Express entrypoint
│   ├── package.json
│   └── .env                     # Server environment variables
├── SECURITY.md                  # Security & browser activity monitoring documentation
└── README.md                    # Root project documentation
```

---

## 🔑 Administrator Access Setup
* **Admin URL**: `http://localhost:5173/admin/login`
* **Default Admin Credentials**: Configurable via `DEFAULT_ADMIN_EMAIL` and `DEFAULT_ADMIN_PASSWORD` environment variables (see `backend/.env`).

---

© 2025–2026 Department of Computer Science & Engineering • TECH FORCE Association & CSI Student Chapter.
