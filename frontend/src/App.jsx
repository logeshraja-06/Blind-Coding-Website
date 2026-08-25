import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { QuizProvider } from './context/QuizContext';

// Pages
import { Home } from './pages/Home';
import { Register } from './pages/Register';
import { Welcome } from './pages/Welcome';
import { Quiz } from './pages/Quiz';
import { Result } from './pages/Result';

// Admin Pages
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminLayout } from './pages/admin/AdminLayout';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminParticipants } from './pages/admin/AdminParticipants';
import { AdminActivity } from './pages/admin/AdminActivity';
import { AdminResults } from './pages/admin/AdminResults';
import { AdminQuestions } from './pages/admin/AdminQuestions';
import { AdminExports } from './pages/admin/AdminExports';
import { AdminSettings } from './pages/admin/AdminSettings';

function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <QuizProvider>
          <BrowserRouter>
            <Routes>
              {/* Student Experience Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/welcome" element={<Welcome />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/result" element={<Result />} />

              {/* Admin Authentication Route */}
              <Route path="/admin/login" element={<AdminLogin />} />

              {/* Protected Admin Management Portal */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="participants" element={<AdminParticipants />} />
                <Route path="activity" element={<AdminActivity />} />
                <Route path="results" element={<AdminResults />} />
                <Route path="leaderboard" element={<AdminResults />} />
                <Route path="questions" element={<AdminQuestions />} />
                <Route path="exports" element={<AdminExports />} />
                <Route path="settings" element={<AdminSettings />} />
              </Route>

              {/* Catch-all Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </QuizProvider>
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;
