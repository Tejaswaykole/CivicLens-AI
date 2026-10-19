import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CinematicStoryPage } from './pages/CinematicStoryPage';
import { AppShell } from './components/layout/AppShell';
import { DashboardPage } from './pages/DashboardPage';
import { ComplaintAnalyzerPage } from './pages/ComplaintAnalyzerPage';
import { ComplaintsRecordsPage } from './pages/ComplaintsRecordsPage';
import { ExplainabilityPage } from './pages/ExplainabilityPage';
import { AnalyticsInsightsPage } from './pages/AnalyticsInsightsPage';
import { ModelInformationPage } from './pages/ModelInformationPage';
import { ResponsibleAiPage } from './pages/ResponsibleAiPage';
import { CivicLensPredictPage } from './pages/CivicLensPredictPage';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Route 1: Cinematic Story Walkthrough */}
        <Route path="/" element={<CinematicStoryPage />} />

        {/* Route 2+: Operational Application Shell */}
        <Route path="/app" element={<AppShell />}>
          <Route index element={<DashboardPage />} />
          <Route path="analyze" element={<ComplaintAnalyzerPage />} />
          <Route path="complaints" element={<ComplaintsRecordsPage />} />
          <Route path="explainability" element={<ExplainabilityPage />} />
          <Route path="analytics" element={<AnalyticsInsightsPage />} />
          <Route path="model" element={<ModelInformationPage />} />
          <Route path="responsible-ai" element={<ResponsibleAiPage />} />
          <Route path="predict" element={<CivicLensPredictPage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
