/**
 * BLINDCODE API Service Layer
 * 
 * Designed for immediate frontend mock functionality with localStorage persistence,
 * and structured for seamless drop-in integration with a future Express/MERN backend.
 */

import { QUIZ_QUESTIONS } from '../data/questions';
import { INITIAL_PARTICIPANTS, EVENT_STATS } from '../data/participants';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || null;

export const api = {
  // Participant Registration
  async registerParticipant(participantData) {
    if (API_BASE_URL) {
      const res = await fetch(`${API_BASE_URL}/participants/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(participantData)
      });
      return res.json();
    }

    // Mock local resolution
    const id = `BC-2026-${Math.floor(100 + Math.random() * 900)}`;
    const student = {
      id,
      ...participantData,
      registeredAt: new Date().toISOString()
    };
    localStorage.setItem('blindcode_student', JSON.stringify(student));
    return { success: true, student };
  },

  // Fetch Questions
  async getQuestions() {
    if (API_BASE_URL) {
      const res = await fetch(`${API_BASE_URL}/quiz/questions`);
      return res.json();
    }
    return QUIZ_QUESTIONS;
  },

  // Submit Quiz Results
  async submitQuiz(submissionData) {
    if (API_BASE_URL) {
      const res = await fetch(`${API_BASE_URL}/quiz/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData)
      });
      return res.json();
    }

    // Store in local submission store
    const existing = JSON.parse(localStorage.getItem('blindcode_submissions') || '[]');
    existing.push({
      ...submissionData,
      submittedAt: new Date().toLocaleDateString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    });
    localStorage.setItem('blindcode_submissions', JSON.stringify(existing));
    return { success: true, submission: submissionData };
  },

  // Admin: Get Participants List
  async getParticipants() {
    if (API_BASE_URL) {
      const res = await fetch(`${API_BASE_URL}/admin/participants`);
      return res.json();
    }
    const local = JSON.parse(localStorage.getItem('blindcode_all_participants') || 'null');
    return local || INITIAL_PARTICIPANTS;
  },

  // Admin: Get Event Stats
  async getEventStats() {
    if (API_BASE_URL) {
      const res = await fetch(`${API_BASE_URL}/admin/stats`);
      return res.json();
    }
    return EVENT_STATS;
  }
};
