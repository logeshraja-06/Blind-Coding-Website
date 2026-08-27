/**
 * BLINDCODE Frontend API Client
 * Connects to the Express backend (configured via VITE_API_URL or relative /api)
 * Strict production standard: NO fake success fallbacks, NO invented scores.
 * The backend remains the single source of truth.
 */

const getSanitizedApiUrl = () => {
  const envUrl = (import.meta.env.VITE_API_URL || '/api').trim().replace(/\/$/, '');
  if (envUrl === '/api' || envUrl === '') return '/api';
  return envUrl.endsWith('/api') ? envUrl : `${envUrl}/api`;
};

export const API_BASE_URL = getSanitizedApiUrl();

export const api = {
  // 1. Student Registration
  async registerStudent(studentData) {
    try {
      const res = await fetch(`${API_BASE_URL}/students/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(studentData),
      });
      const data = await res.json();
      return data;
    } catch (err) {
      console.error('Backend connection error during registration:', err);
      return {
        success: false,
        message: 'Unable to reach the assessment server. Please check your network connection and verify the server is running.',
      };
    }
  },

  // 2. Check Register Number
  async checkRegisterNumber(registerNumber) {
    try {
      const res = await fetch(`${API_BASE_URL}/students/check/${encodeURIComponent(registerNumber)}`);
      return await res.json();
    } catch (err) {
      console.error('Error checking register number:', err);
      return { success: false, message: 'Could not reach server to verify registration status.' };
    }
  },

  // 3. Start Quiz Countdown & Retrieve Server StartedAt & Shuffled Assigned Questions
  async startQuiz(registerNumber) {
    try {
      const res = await fetch(`${API_BASE_URL}/quiz/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ registerNumber }),
      });
      return await res.json();
    } catch (err) {
      console.error('Error starting quiz on server:', err);
      return {
        success: false,
        message: 'Could not connect to the assessment server to start your quiz. Please ensure the server is active.',
      };
    }
  },

  // 4. Fetch Sanitized Questions (Ordered per student if registerNumber passed)
  async getQuestions(registerNumber = null) {
    try {
      const url = registerNumber
        ? `${API_BASE_URL}/quiz/questions?registerNumber=${encodeURIComponent(registerNumber)}`
        : `${API_BASE_URL}/quiz/questions`;
      const res = await fetch(url);
      const data = await res.json();
      if (data && data.success && data.questions) {
        return data.questions;
      }
      return null;
    } catch (err) {
      console.error('Failed to retrieve assessment questions from server:', err);
      return null;
    }
  },

  // 5. Save Single Answer
  async saveAnswer(registerNumber, questionId, selectedOption) {
    try {
      const res = await fetch(`${API_BASE_URL}/quiz/save-answer`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ registerNumber, questionId, selectedOption }),
      });
      return await res.json();
    } catch (err) {
      console.error('Error saving answer to server:', err);
      return { success: false, message: 'Network error saving answer to server.' };
    }
  },

  // 6. Log Activity (Tab Switch / Fullscreen Exit)
  async logActivity(registerNumber, activityType) {
    try {
      const res = await fetch(`${API_BASE_URL}/quiz/activity`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ registerNumber, activityType }),
      });
      return await res.json();
    } catch (err) {
      console.warn('Activity logging network issue:', err);
      return {
        success: false,
        message: 'Network issue logging activity telemetry to server.',
      };
    }
  },

  // 7. Submit Assessment (Server computes score strictly — NO FAKE FALLBACKS)
  async submitQuiz(registerNumber, isAutoSubmit = false) {
    try {
      const res = await fetch(`${API_BASE_URL}/quiz/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ registerNumber, isAutoSubmit }),
      });
      const data = await res.json();
      return data;
    } catch (err) {
      console.error('Submission failed due to network error:', err);
      return {
        success: false,
        message: 'Submission network error. Your answers are saved locally. Please retry submission.',
      };
    }
  },

  // 8. Get Candidate Result
  async getStudentResult(registerNumber) {
    try {
      const res = await fetch(`${API_BASE_URL}/quiz/result/${encodeURIComponent(registerNumber)}`);
      return await res.json();
    } catch (err) {
      console.error('Error retrieving candidate result:', err);
      return { success: false, message: 'Unable to retrieve assessment result.' };
    }
  },

  // 9. Get Public Quiz Configuration
  async getQuizConfig() {
    try {
      const res = await fetch(`${API_BASE_URL}/quiz/config`);
      const data = await res.json();
      if (data && data.success && data.config) {
        return data.config;
      }
    } catch (err) {
      console.warn('Config fetch error, using institutional defaults:', err);
    }
    return {
      eventTitle: 'BLIND CODING',
      quizDurationMinutes: 60,
      totalQuestions: 25,
      quizAvailability: 'ACTIVE',
      maxActivityWarnings: 2,
      fullscreenRequired: true,
      tabSwitchMonitoring: true,
    };
  },

  // ================= ADMIN APIS =================

  // Admin Login
  async adminLogin(email, password) {
    const res = await fetch(`${API_BASE_URL}/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return await res.json();
  },

  // Admin Dashboard Stats
  async getAdminStats(token) {
    const res = await fetch(`${API_BASE_URL}/admin/dashboard`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return await res.json();
  },

  // Admin Participants
  async getAdminParticipants(token, params = {}) {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE_URL}/admin/participants?${query}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return await res.json();
  },

  // Admin Quiz Activity Monitor
  async getAdminActivity(token) {
    const res = await fetch(`${API_BASE_URL}/admin/activity`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return await res.json();
  },

  // Admin Leaderboard
  async getAdminLeaderboard(token) {
    const res = await fetch(`${API_BASE_URL}/admin/leaderboard`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return await res.json();
  },

  // Admin Questions Bank
  async getAdminQuestions(token) {
    const res = await fetch(`${API_BASE_URL}/admin/questions`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return await res.json();
  },

  // Add Question
  async addAdminQuestion(token, questionData) {
    const res = await fetch(`${API_BASE_URL}/admin/questions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(questionData),
    });
    return await res.json();
  },

  // Admin Settings (GET)
  async getAdminSettings(token) {
    const res = await fetch(`${API_BASE_URL}/admin/settings`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return await res.json();
  },

  // Admin Settings (PUT)
  async updateAdminSettings(token, settingsPayload) {
    const res = await fetch(`${API_BASE_URL}/admin/settings`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(settingsPayload),
    });
    return await res.json();
  },

  // Admin Detailed Participant Review
  async getParticipantReview(token, participantId) {
    const res = await fetch(`${API_BASE_URL}/admin/participants/${participantId}/review`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return await res.json();
  },
};
