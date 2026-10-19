import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Cpu, 
  Workflow, 
  Binary, 
  Layers, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  ShieldAlert,
  FileCode,
  BookOpen
} from 'lucide-react';
import { PROPOSED_PIPELINE } from '../data/complaintsData';
import { DemoDataNotice } from '../components/common/DemoDataNotice';

export const ModelInformationPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8 animate-fade-in max-w-6xl mx-auto">
      {/* Header */}
      <div className="border-b border-indigo-midnight/10 pb-6">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-midnight/10 text-indigo-midnight">
            System Architecture
          </span>
          <span className="text-xs text-indigo-midnight/60">Proposed ML Engineering Blueprint</span>
        </div>
        <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-indigo-midnight mt-1">
          Machine Learning Pipeline & Technical Specifications
        </h2>
        <p className="text-sm text-indigo-midnight/70 mt-1 max-w-3xl">
          Visualizing the proposed computational pipeline from citizen free-text intake, token vectorization, calibrated classification, and LIME/SHAP local explainability.
        </p>
      </div>

      <DemoDataNotice 
        variant="card"
        customText="Technical Architectural Blueprint: This page articulates the proposed machine learning pipeline design submitted for Challenge 04. No trained weights are currently stored on the client."
      />

      {/* Visual Pipeline Stages */}
      <div className="space-y-4">
        <h3 className="font-editorial text-xl font-bold text-indigo-midnight flex items-center gap-2">
          <Workflow className="w-5 h-5 text-indigo-midnight" />
          <span>Proposed 5-Stage Processing Pipeline</span>
        </h3>

        <div className="space-y-4">
          {PROPOSED_PIPELINE.map((stage) => (
            <div 
              key={stage.step}
              className="p-5 sm:p-6 rounded-2xl bg-cream-card border border-indigo-midnight/15 shadow-soft flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-plum text-cream-vanilla flex items-center justify-center font-bold text-sm shrink-0 shadow-sm">
                  0{stage.step}
                </div>
                <div>
                  <h4 className="font-editorial text-base font-bold text-indigo-midnight">
                    {stage.title}
                  </h4>
                  <p className="text-xs text-indigo-midnight/75 mt-1 leading-relaxed max-w-2xl">
                    {stage.description}
                  </p>
                </div>
              </div>

              <div className="shrink-0 px-3 py-1.5 rounded-lg bg-indigo-midnight/5 border border-indigo-midnight/10 text-xs font-mono font-semibold text-indigo-midnight">
                {stage.tool}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Deep Dive Cards on Proposed Technologies */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        {/* TF-IDF Card */}
        <div className="p-6 rounded-2xl bg-cream-card border border-indigo-midnight/15 shadow-soft space-y-3">
          <div className="flex items-center gap-2">
            <Binary className="w-5 h-5 text-indigo-midnight" />
            <h4 className="font-editorial text-lg font-bold text-indigo-midnight">
              TF-IDF (Term Frequency - Inverse Document Frequency)
            </h4>
          </div>
          <p className="text-xs text-indigo-midnight/80 leading-relaxed">
            Why not deep Transformer LLMs? For municipal grievance triage on municipal cloud budgets, TF-IDF n-grams (1-3) provide superior computational latency (&lt;10ms), zero GPU dependency, and crystal-clear coefficient transparency directly readable by human audit teams.
          </p>
          <ul className="text-xs text-indigo-midnight/70 space-y-1 list-disc pl-4">
            <li>Vocabulary capped to top 5,000 municipal tokens</li>
            <li>Sub-linear term scaling applied to prevent single word spam</li>
            <li>Fast deterministic indexing</li>
          </ul>
        </div>

        {/* Linear Classifier Card */}
        <div className="p-6 rounded-2xl bg-cream-card border border-indigo-midnight/15 shadow-soft space-y-3">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-indigo-midnight" />
            <h4 className="font-editorial text-lg font-bold text-indigo-midnight">
              Linear SVM & Calibrated Logistic Regression
            </h4>
          </div>
          <p className="text-xs text-indigo-midnight/80 leading-relaxed">
            High-dimensional sparse text vectors separate exceptionally well with linear hyperplanes. Platt scaling (sigmoid calibration) produces genuine posterior probabilities, allowing the UI to display authentic confidence scores.
          </p>
          <ul className="text-xs text-indigo-midnight/70 space-y-1 list-disc pl-4">
            <li>L2 regularization prevents overfitting on noisy slang</li>
            <li>Weighted loss addresses class imbalance (fewer High priority cases)</li>
            <li>Interpretable weight coefficients per feature token</li>
          </ul>
        </div>
      </div>

      {/* Try in analyzer button */}
      <div className="p-6 rounded-2xl bg-indigo-midnight text-cream-vanilla flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="font-editorial text-lg font-bold">
            Experience the Pipeline in Action
          </h4>
          <p className="text-xs text-cream-vanilla/70 mt-0.5">
            Switch to the Complaint Analyzer to test custom inputs against our deterministic demonstration engine.
          </p>
        </div>
        <button
          onClick={() => navigate('/app/analyze')}
          className="px-5 py-2.5 rounded-xl bg-cream-vanilla text-indigo-midnight font-bold text-xs hover:bg-amber-200 transition-colors shadow-md shrink-0 flex items-center gap-2"
        >
          <span>Open Analyzer Testbed</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
