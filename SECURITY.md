# BLIND CODING 2026 — Security & Activity Monitoring Architecture

## 🛡️ Overview

The **BLIND CODING** platform incorporates browser-level activity monitoring, server-side scoring verification, attempt serialization, and JWT-authenticated administrative oversight.

---

## ⚠️ Realistic Security Model & Browser Limitations

> **Important Disclosure**: A standard web application running inside consumer web browsers (Google Chrome, Microsoft Edge, Safari, Firefox) operates under standard sandboxing permissions.

1. **What the Platform Monitors**:
   - **Tab-Switching & Window Blur**: Monitored via HTML5 Page Visibility API (`visibilitychange`, `document.hidden`) and Window Focus/Blur listeners.
   - **Fullscreen Integrity**: Detects exit transitions from `document.fullscreenElement` and vendor-prefixed APIs.
   - **Server-Side Activity Logs**: Chronologically registers timestamps and warning totals per candidate on the backend.
   - **Single-Attempt Enforcement**: Prevents duplicate attempts per numeric Register Number.
   - **Server-Side Scoring**: Withholds `correctAnswer` and explanation keys from student-facing payloads.

2. **Technical Limitations of Standard Browsers**:
   - Web applications cannot override native OS key combinations (e.g. `Alt + Tab`, `Win + D`, `Cmd + Tab`), force-prevent application switching, intercept external device usage, or prevent closing the browser window.
   - True environmental lockdown requires hardware-level kiosk mode or dedicated managed clients such as **Safe Exam Browser (SEB)**.

---

## 🔒 Implemented Security Protections

- **Server-Controlled Timers**: Quiz duration is verified against the server-issued `startedAt` timestamp, rendering client-side clock modifications ineffective.
- **Activity Warning System**: Automatically counts tab switches and fullscreen exits. If warnings exceed `maxActivityWarnings` (default: 3), the attempt is locked and submitted automatically.
- **Answer Key Masking**: The `/api/quiz/questions` endpoint filters out solution data. Scoring is computed only during final submission.
- **Administrator Access**: All administrative endpoints require valid cryptographic JWT tokens with bcrypt password verification.

---

© 2025–2026 Department of Computer Science & Engineering • TECH FORCE Association
