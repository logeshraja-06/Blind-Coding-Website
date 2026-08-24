import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { QuizProvider } from './context/QuizContext';

// Pages
import { Home } from './pages/Home';
import { Register } from './pages/Register';
import { Welcome } from './pages/Welcome';
import { Quiz } from './pages/Quiz';
import { Result } from './pages/Result';

// Admin Pages
import { AdminLayout } from './pages/admin/AdminLayout';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminParticipants } from './pages/admin/AdminParticipants';
import { AdminResults } from './pages/admin/AdminResults';
import { AdminQuestions } from './pages/admin/AdminQuestions';
import { AdminExports } from './pages/admin/AdminExports';
import { AdminSettings } from './pages/admin/AdminSettings';

function App() {
  return (
    <ToastProvider>
      <QuizProvider>
        <BrowserRouter>
          <Routes>
            {/* Student Experience Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/result" element={<Result />} />

            {/* Admin Management Dashboard Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="participants" element={<AdminParticipants />} />
              <Route path="results" element={<AdminResults />} />
              <Route path="questions" element={<AdminQuestions />} />
              <Route path="exports" element={<AdminExports />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>

            {/* Catch-all Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </QuizProvider>
    </ToastProvider>
  );
}

export default App;
