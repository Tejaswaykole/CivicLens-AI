import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { DemoDataNotice } from '../common/DemoDataNotice';

export const AppShell: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Dynamic header titles based on route
  const getHeaderMeta = () => {
    switch (location.pathname) {
      case '/app':
        return {
          title: "Public Grievance Intelligence",
          subtitle: "Explore complaint patterns, predicted priorities, and explainable AI insights."
        };
      case '/app/analyze':
        return {
          title: "Complaint Analyzer & Priority Engine",
          subtitle: "Test how incoming civic complaints are categorized and evaluated with explainability."
        };
      case '/app/complaints':
        return {
          title: "Public Complaint Records",
          subtitle: "Inspect historical records, audit predicted priorities, and review official assignments."
        };
      case '/app/explainability':
        return {
          title: "Explainable AI Decision Audit",
          subtitle: "Inspect feature-attribution token weights driving high or low priority predictions."
        };
      case '/app/analytics':
        return {
          title: "Analytics & Model Evaluation",
          subtitle: "Synthesized grievance trends and illustrative performance metrics (Precision, Recall, F1)."
        };
      case '/app/model':
        return {
          title: "Model Architecture & Pipeline",
          subtitle: "Technical blueprint: NLP vectorization, classifier, and local explainability layer."
        };
      case '/app/responsible-ai':
        return {
          title: "Responsible AI & Governance",
          subtitle: "Mitigating algorithmic bias, safeguarding privacy, and preserving human accountability."
        };
      case '/app/predict':
        return {
          title: "CivicLens Predict — Roadmap",
          subtitle: "Anticipating recurring civic vulnerabilities before they turn into emergency grievances."
        };
      default:
        return {
          title: "Public Grievance Intelligence",
          subtitle: "CivicLens AI prototype"
        };
    }
  };

  const meta = getHeaderMeta();

  return (
    <div className="min-h-screen bg-cream-warm flex flex-col font-sans">
      {/* Top persistent notice banner */}
      <DemoDataNotice />

      <div className="flex-1 flex">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 lg:pl-64 transition-all">
          <Topbar 
            onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
            title={meta.title}
            subtitle={meta.subtitle}
          />
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};
