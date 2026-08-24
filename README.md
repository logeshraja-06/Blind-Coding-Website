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

### Frontend (`client` / `src`)
* **React 19** with **Vite**
* **Tailwind CSS** (Custom brand palette: Tea Green `#C8D696`, Vanilla `#F6E6A5`, Celtic Blue `#3971B8`, Ivory `#FBFCEE`, Drab Dark `#343B1B`)
* **Framer Motion** for micro-interactions and animations
* **React Router DOM v7**
* **Lucide React Icons**
* **Google Fonts**: *Comfortaa* (Headings/Branding) & *Poppins* (Body/Forms)

### Backend (`server`)
* **Node.js & Express.js**
* **MongoDB & Mongoose** (with automated zero-config in-memory persistence layer)
* **JWT (JSON Web Tokens)** & **bcryptjs** password hashing
* **PDF & CSV/Excel Streaming Reports**

---

## 🔒 Key Security & Privacy Features

1. **Server-Side Scoring**: The `correctAnswer` is NEVER transmitted to student-facing APIs (`/api/quiz/questions`). All scores are strictly computed on the backend upon submission.
2. **Compulsory Numeric Register Number**: Every student must enter their official college register number (e.g. `953710`). Duplicate attempts are automatically blocked.
3. **Private Result Screen**: Students see only their own score (`22 / 25`), percentage (`88%`), and performance grade. No answer keys, explanations, or other candidates' scores are visible to participants.
4. **Admin-Only Leaderboard**: The official ranking and merit podium (ranked by score, then fastest completion time) is strictly accessible through protected admin JWT routes.

---

## 🚀 How to Run Locally

### 1. Start the Backend API Server
```powershell
node server/server.js
```
The server will start on `http://localhost:5000` with the pre-seeded questions, default admin (`admin@cse.techforce.edu` / `Admin@2026`), and demo data.

### 2. Start the Frontend Development Server
```powershell
npm run dev
```
Open `http://localhost:5173/` in your browser.

---

## 📁 Project Structure

```text
Blind-Coding-Website/
├── public/                      # Static assets & Tech Force logo
├── src/                         # React Frontend
│   ├── assets/logo/             # TechForceLogo vector component & assets
│   ├── components/
│   │   ├── common/              # FloatingCodeBg, AnimatedCounter
│   │   ├── layout/              # Navbar, Footer, PageTransition
│   │   ├── ui/                  # Button, Card, Input, Modal, Badge, ProgressBar
│   │   ├── quiz/                # QuizHeader, QuestionCard, OptionItem, QuestionNavigator
│   │   └── admin/               # AdminSidebar
│   ├── context/                 # AuthContext, QuizContext, ToastContext
│   ├── data/                    # 25 Curated questions & initial participants
│   ├── pages/                   # Home, Register, Welcome, Quiz, Result
│   │   └── admin/               # AdminLogin, AdminDashboard, AdminParticipants, AdminResults, etc.
│   ├── services/api.js          # Client API service
│   ├── App.jsx                  # React Router setup
│   └── index.css                # Custom theme & typography
├── server/                      # Node.js + Express Backend
│   ├── config/db.js             # DB Connection & Memory Store
│   ├── controllers/             # studentController, quizController, adminController, exportController
│   ├── middleware/              # JWT protectAdmin middleware
│   ├── models/                  # Student, Question, QuizAttempt, Admin
│   ├── routes/                  # studentRoutes, quizRoutes, adminRoutes, exportRoutes
│   ├── utils/seedData.js        # Initial database seeders
│   ├── server.js                # Express entrypoint
│   └── .env                     # Server environment variables
├── package.json
└── README.md
```

---

## 🔑 Default Administrator Credentials
* **Email**: `admin@cse.techforce.edu`
* **Password**: `Admin@2026`
* **Admin URL**: `http://localhost:5173/admin/login`

---

© 2025–2026 Department of Computer Science & Engineering • TECH FORCE Association & CSI Student Chapter.
