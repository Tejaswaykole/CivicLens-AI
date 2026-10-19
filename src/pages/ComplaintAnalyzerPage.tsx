import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  RotateCcw, 
  Send, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Eye, 
  SlidersHorizontal,
  Building2,
  ShieldCheck,
  FileText
} from 'lucide-react';
import { SAMPLE_COMPLAINTS } from '../data/complaintsData';
import { analyzeLocalComplaintText, AnalysisOutcome } from '../utils/analyzerEngine';
import { LocalExplanationChart } from '../components/explainability/LocalExplanationChart';
import { HumanReviewPanel } from '../components/complaints/HumanReviewPanel';
import { DemoDataNotice } from '../components/common/DemoDataNotice';

export const ComplaintAnalyzerPage: React.FC = () => {
  const navigate = useNavigate();
  const [complaintText, setComplaintText] = useState(
    SAMPLE_COMPLAINTS[0].description
  );
  const [selectedSampleIndex, setSelectedSampleIndex] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisOutcome | null>(
    analyzeLocalComplaintText(SAMPLE_COMPLAINTS[0].description)
  );

  const handleSelectSample = (idx: number) => {
    setSelectedSampleIndex(idx);
    const text = SAMPLE_COMPLAINTS[idx].description;
    setComplaintText(text);
    // Instant live responsive preview
    setAnalysisResult(analyzeLocalComplaintText(text));
  };

  const handleRunAnalysis = () => {
    if (!complaintText.trim()) return;
    setIsAnalyzing(true);
    // Simulate brief algorithmic processing latency for demonstration credibility
    setTimeout(() => {
      const res = analyzeLocalComplaintText(complaintText);
      setAnalysisResult(res);
      setIsAnalyzing(false);
    }, 450);
  };

  const handleClear = () => {
    setComplaintText('');
    setAnalysisResult(null);
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl mx-auto">
      {/* Banner */}
      <DemoDataNotice 
        variant="card"
        customText="Deterministic Demonstration Engine: This interactive analyzer parses text with local heuristics to illustrate how TF-IDF and classification pipelines operate. No live model or external cloud API is invoked."
      />

      {/* Main Analyzer Card */}
      <div className="bg-cream-card rounded-2xl border border-indigo-midnight/15 p-6 sm:p-8 shadow-soft space-y-6">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-indigo-midnight/10 text-indigo-midnight">
            Interactive Testbed
          </span>
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-indigo-midnight mt-1">
            Complaint Text Analyzer & Priority Predictor
          </h2>
          <p className="text-xs sm:text-sm text-indigo-midnight/70 mt-1">
            Type your own civic complaint or choose one of the pre-loaded municipal benchmark scenarios below to test automated categorization, priority prediction, and explainability.
          </p>
        </div>

        {/* Sample selector pill buttons */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-indigo-midnight uppercase tracking-wider">
            Quick-Load Municipal Scenarios:
          </label>
          <div className="flex flex-wrap gap-2">
            {SAMPLE_COMPLAINTS.slice(0, 5).map((comp, idx) => (
              <button
                key={comp.id}
                type="button"
                onClick={() => handleSelectSample(idx)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                  selectedSampleIndex === idx
                    ? 'bg-plum text-cream-vanilla border-plum shadow-sm'
                    : 'bg-cream-vanilla text-indigo-midnight border-indigo-midnight/20 hover:border-indigo-midnight/40'
                }`}
              >
                {idx + 1}. {comp.title}
              </button>
            ))}
          </div>
        </div>

        {/* Text Area Input */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-indigo-midnight/70">
            <span className="font-semibold">Citizen Grievance Description:</span>
            <span className="font-mono">{complaintText.length} characters</span>
          </div>
          <textarea
            rows={4}
            value={complaintText}
            onChange={(e) => {
              setComplaintText(e.target.value);
              setSelectedSampleIndex(-1);
            }}
            placeholder="Type or paste a civic complaint here... (e.g. 'A deep crater in front of the maternity hospital is stalling ambulances and traffic.')"
            className="w-full p-4 rounded-xl border border-indigo-midnight/20 bg-cream-warm text-indigo-midnight focus:bg-white focus:outline-none focus:ring-2 focus:ring-plum text-sm leading-relaxed placeholder:text-indigo-midnight/40"
          />
        </div>

        {/* Actions Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-indigo-midnight/10">
          <button
            type="button"
            onClick={handleClear}
            className="px-4 py-2 rounded-xl text-xs font-medium text-indigo-midnight/70 hover:text-indigo-midnight hover:bg-cream-vanilla transition-colors flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Clear Input</span>
          </button>

          <button
            type="button"
            disabled={isAnalyzing || !complaintText.trim()}
            onClick={handleRunAnalysis}
            className="px-6 py-2.5 rounded-xl bg-plum hover:bg-plum-light disabled:opacity-50 text-cream-vanilla text-sm font-semibold shadow-soft flex items-center gap-2 transition-all hover:scale-[1.02]"
          >
            {isAnalyzing ? (
              <>
                <span className="w-4 h-4 border-2 border-cream-vanilla border-t-transparent rounded-full animate-spin" />
                <span>Evaluating Tokens...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Analyze Complaint</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Analysis Results Display */}
      {analysisResult && (
        <div className="space-y-6">
          <div className="bg-cream-card rounded-2xl border border-indigo-midnight/15 p-6 sm:p-8 shadow-soft space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-indigo-midnight/10 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
                  Analysis Complete
                </span>
                <h3 className="font-editorial text-xl font-bold text-indigo-midnight mt-1">
                  Algorithmic Triage & Routing Output
                </h3>
              </div>
              <button
                onClick={() => navigate('/app/explainability')}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-cream-vanilla hover:bg-cream-warm border border-indigo-midnight/20 text-indigo-midnight text-xs font-semibold transition-all self-start sm:self-auto"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-midnight/70" />
                <span>Full Explainability Suite</span>
                <ArrowRight className="w-3 h-3 text-indigo-midnight/50" />
              </button>
            </div>

            {/* Three key outcome badges */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Category */}
              <div className="p-4 rounded-xl bg-cream-vanilla/60 border border-indigo-midnight/10 space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-midnight/60">
                  Predicted Category
                </span>
                <p className="text-base font-bold text-indigo-midnight">
                  {analysisResult.category}
                </p>
                <p className="text-[11px] text-indigo-midnight/60">
                  Automated taxonomy classification
                </p>
              </div>

              {/* Priority */}
              <div className="p-4 rounded-xl bg-cream-vanilla/60 border border-indigo-midnight/10 space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-midnight/60">
                  Predicted Priority
                </span>
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                    analysisResult.priority === 'High'
                      ? 'bg-rose-100 text-rose-800 border border-rose-300'
                      : analysisResult.priority === 'Medium'
                      ? 'bg-amber-100 text-amber-800 border border-amber-300'
                      : 'bg-blue-100 text-blue-800 border border-blue-300'
                  }`}>
                    {analysisResult.priority} Urgency
                  </span>
                  <span className="text-xs font-mono text-indigo-midnight/70">
                    ({analysisResult.confidenceScore}% conf.)
                  </span>
                </div>
                <p className="text-[11px] text-indigo-midnight/60">
                  Urgency score based on risk keywords
                </p>
              </div>

              {/* Recommended Department */}
              <div className="p-4 rounded-xl bg-cream-vanilla/60 border border-indigo-midnight/10 space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-midnight/60">
                  Routing Authority
                </span>
                <p className="text-base font-bold text-indigo-midnight truncate">
                  {analysisResult.recommendedDepartment}
                </p>
                <p className="text-[11px] text-indigo-midnight/60">
                  Departmental SLA Dispatch Queue
                </p>
              </div>
            </div>

            {/* Severity Assessment Summary */}
            <div className="p-4 rounded-xl bg-indigo-midnight/5 border border-indigo-midnight/10 space-y-1 text-xs">
              <span className="font-bold text-indigo-midnight uppercase tracking-wider text-[11px]">
                Safety & Urgency Rationale:
              </span>
              <p className="text-indigo-midnight/80 leading-relaxed">
                {analysisResult.severityAssessment}
              </p>
            </div>
          </div>

          {/* Embedded Local Explanation Chart */}
          <LocalExplanationChart 
            features={analysisResult.features}
            title="Local Feature Contribution for this Submission"
            subtitle="Tokens from the text above that increased or decreased the predicted urgency"
          />

          {/* Human Review Demonstration Panel */}
          <HumanReviewPanel
            originalPriority={analysisResult.priority}
            complaintTitle={complaintText.slice(0, 60) + (complaintText.length > 60 ? '...' : '')}
            department={analysisResult.recommendedDepartment}
            onReviewSubmitted={(status, priority, notes) => {
              console.log("Logged Review Decision:", { status, priority, notes });
            }}
          />
        </div>
      )}
    </div>
  );
};
