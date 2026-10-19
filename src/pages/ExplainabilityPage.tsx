import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Lightbulb, 
  HelpCircle, 
  Layers, 
  SlidersHorizontal, 
  AlertTriangle, 
  Cpu, 
  FileCheck, 
  Scale, 
  ArrowRightLeft,
  Info
} from 'lucide-react';
import { SAMPLE_COMPLAINTS } from '../data/complaintsData';
import { LocalExplanationChart } from '../components/explainability/LocalExplanationChart';
import { GlobalImportanceChart } from '../components/explainability/GlobalImportanceChart';
import { ScenarioComparison } from '../components/complaints/ScenarioComparison';
import { DemoDataNotice } from '../components/common/DemoDataNotice';

export const ExplainabilityPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialId = searchParams.get('complaintId') || SAMPLE_COMPLAINTS[0].id;

  const [selectedId, setSelectedId] = useState(initialId);
  const [activeTab, setActiveTab] = useState<'local' | 'global' | 'methods' | 'whatif'>('local');

  const selectedComplaint = SAMPLE_COMPLAINTS.find(c => c.id === selectedId) || SAMPLE_COMPLAINTS[0];

  return (
    <div className="space-y-8 animate-fade-in max-w-6xl mx-auto">
      {/* Header */}
      <div className="border-b border-indigo-midnight/10 pb-6">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-midnight/10 text-indigo-midnight">
            Hackathon Challenge Core
          </span>
          <span className="text-xs text-indigo-midnight/60">Interpretability & Trust Layer</span>
        </div>
        <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-indigo-midnight mt-1">
          Understand the Decision
        </h2>
        <p className="text-sm text-indigo-midnight/70 mt-1 max-w-3xl">
          Explore how an explainable AI system inspects the exact linguistic factors, geographic signals, and token combinations influencing complaint prioritization.
        </p>
      </div>

      <DemoDataNotice 
        variant="card"
        customText="Illustrative Attribution Weights: The SHAP and LIME-style feature values shown below are generated for prototype demonstration to show how public officials will audit black-box decisions. They do not constitute outputs from a live python kernel."
      />

      {/* Tabs Bar */}
      <div className="flex border-b border-indigo-midnight/15 space-x-2 sm:space-x-4 overflow-x-auto pb-px">
        {[
          { id: 'local', label: 'Local Explanation (Single Case)', icon: SlidersHorizontal },
          { id: 'global', label: 'Global Feature Importance', icon: Layers },
          { id: 'whatif', label: 'What-If Sensitivity Simulator', icon: ArrowRightLeft },
          { id: 'methods', label: 'Explainability Methods & Limits', icon: HelpCircle },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 py-3 px-3 sm:px-4 text-xs sm:text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? 'border-plum text-plum font-bold'
                : 'border-transparent text-indigo-midnight/60 hover:text-indigo-midnight hover:border-indigo-midnight/30'
            }`}
          >
            <tab.icon className="w-4 h-4 shrink-0" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* TAB 1: LOCAL EXPLANATION */}
      {activeTab === 'local' && (
        <div className="space-y-6">
          {/* Complaint Selector Strip */}
          <div className="p-4 rounded-xl bg-cream-card border border-indigo-midnight/15 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-midnight/70">
              Select Complaint Record to Audit:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
              {SAMPLE_COMPLAINTS.slice(0, 4).map((comp) => (
                <button
                  key={comp.id}
                  onClick={() => setSelectedId(comp.id)}
                  className={`p-3 rounded-xl text-left transition-all border ${
                    selectedId === comp.id
                      ? 'bg-plum text-cream-vanilla border-plum shadow-md'
                      : 'bg-cream-vanilla/60 text-indigo-midnight border-indigo-midnight/10 hover:border-indigo-midnight/30'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono">
                    <span className="font-bold">{comp.id}</span>
                    <span className={`px-1.5 py-0.5 rounded font-bold ${
                      comp.predictedPriority === 'High' 
                        ? (selectedId === comp.id ? 'bg-rose-500 text-white' : 'bg-rose-100 text-rose-800')
                        : (selectedId === comp.id ? 'bg-amber-400 text-indigo-midnight' : 'bg-amber-100 text-amber-800')
                    }`}>
                      {comp.predictedPriority}
                    </span>
                  </div>
                  <p className="font-medium text-xs mt-1 truncate">
                    {comp.title}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Selected Complaint Narrative Card */}
          <div className="p-5 rounded-2xl bg-cream-card border border-indigo-midnight/15 shadow-soft space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-indigo-midnight/10 pb-3">
              <div>
                <span className="text-[10px] font-mono text-indigo-midnight/60">{selectedComplaint.id} • {selectedComplaint.dateReported}</span>
                <h3 className="font-editorial text-lg font-bold text-indigo-midnight">
                  {selectedComplaint.title}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                  selectedComplaint.predictedPriority === 'High'
                    ? 'bg-rose-100 text-rose-800 border border-rose-300'
                    : 'bg-blue-100 text-blue-800 border border-blue-300'
                }`}>
                  Predicted {selectedComplaint.predictedPriority} Priority
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-indigo-midnight/85 leading-relaxed bg-cream-vanilla/50 p-3.5 rounded-xl border border-indigo-midnight/10">
              "{selectedComplaint.description}"
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
              <div>
                <span className="text-indigo-midnight/60 block">Category:</span>
                <span className="font-semibold text-indigo-midnight">{selectedComplaint.category}</span>
              </div>
              <div>
                <span className="text-indigo-midnight/60 block">Location:</span>
                <span className="font-semibold text-indigo-midnight truncate">{selectedComplaint.location}</span>
              </div>
              <div>
                <span className="text-indigo-midnight/60 block">Assigned Dept:</span>
                <span className="font-semibold text-indigo-midnight truncate">{selectedComplaint.recommendedDepartment}</span>
              </div>
            </div>
          </div>

          {/* Local Feature Attribution Chart */}
          <LocalExplanationChart 
            features={selectedComplaint.features}
            title={`Local Token Attribution: ${selectedComplaint.id}`}
            subtitle="Demonstration SHAP values: Red pushes priority toward High, Blue pulls toward Low/Routine"
          />
        </div>
      )}

      {/* TAB 2: GLOBAL FEATURE IMPORTANCE */}
      {activeTab === 'global' && (
        <div className="space-y-6">
          <GlobalImportanceChart />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-cream-card border border-indigo-midnight/15 shadow-soft space-y-2">
              <h4 className="font-editorial text-base font-bold text-indigo-midnight">
                High-Urgency Amplifiers (+)
              </h4>
              <p className="text-xs text-indigo-midnight/70 leading-relaxed">
                Tokens like <span className="font-mono font-semibold text-rose-700">"school"</span>, <span className="font-mono font-semibold text-rose-700">"exposed wire"</span>, and <span className="font-mono font-semibold text-rose-700">"swerving"</span> consistently act as high-positive weight multipliers in the TF-IDF feature space due to their correlation with immediate casualty risks.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-cream-card border border-indigo-midnight/15 shadow-soft space-y-2">
              <h4 className="font-editorial text-base font-bold text-indigo-midnight">
                Mitigating Context Dampeners (-)
              </h4>
              <p className="text-xs text-indigo-midnight/70 leading-relaxed">
                Tokens like <span className="font-mono font-semibold text-blue-700">"decorative"</span>, <span className="font-mono font-semibold text-blue-700">"partial visibility"</span>, and <span className="font-mono font-semibold text-blue-700">"single bin"</span> reduce the urgency score, indicating to public officials that alternative safeguards exist.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: WHAT-IF SENSITIVITY SIMULATOR */}
      {activeTab === 'whatif' && (
        <div className="space-y-6">
          <ScenarioComparison 
            initialOriginalText={selectedComplaint.description}
          />
        </div>
      )}

      {/* TAB 4: EXPLANATION METHODS & LIMITS */}
      {activeTab === 'methods' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* LIME Card */}
            <div className="p-6 rounded-2xl bg-cream-card border border-indigo-midnight/15 shadow-soft space-y-3">
              <div className="w-10 h-10 rounded-xl bg-plum/10 text-plum flex items-center justify-center font-bold font-mono">
                LIME
              </div>
              <h4 className="font-editorial text-lg font-bold text-indigo-midnight">
                Local Interpretable Model-agnostic Explanations
              </h4>
              <p className="text-xs text-indigo-midnight/70 leading-relaxed">
                LIME tests what happens when you perturb individual words in the grievance. By fitting a surrogate linear model around the complaint neighborhood, it approximates which tokens swayed the decision for this specific case.
              </p>
              <div className="pt-2 text-[11px] font-mono text-indigo-midnight/60">
                Scope: Local decision fidelity
              </div>
            </div>

            {/* SHAP Card */}
            <div className="p-6 rounded-2xl bg-cream-card border border-indigo-midnight/15 shadow-soft space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-midnight/10 text-indigo-midnight flex items-center justify-center font-bold font-mono">
                SHAP
              </div>
              <h4 className="font-editorial text-lg font-bold text-indigo-midnight">
                SHapley Additive exPlanations
              </h4>
              <p className="text-xs text-indigo-midnight/70 leading-relaxed">
                Rooted in cooperative game theory, SHAP computes fair payout shares for each token. It ensures that the sum of feature attributions equals the difference between the actual prediction and base rate expectation.
              </p>
              <div className="pt-2 text-[11px] font-mono text-indigo-midnight/60">
                Scope: Game-theoretic consistency
              </div>
            </div>

            {/* Global Importance Card */}
            <div className="p-6 rounded-2xl bg-cream-card border border-indigo-midnight/15 shadow-soft space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-200/50 text-amber-900 flex items-center justify-center font-bold font-mono">
                GFI
              </div>
              <h4 className="font-editorial text-lg font-bold text-indigo-midnight">
                Global Feature Importance
              </h4>
              <p className="text-xs text-indigo-midnight/70 leading-relaxed">
                Aggregates coefficient magnitudes across the entire model corpus to reveal systematic model biases, ensuring terms like "ward name" or "demographics" are not artificially skewing prioritization.
              </p>
              <div className="pt-2 text-[11px] font-mono text-indigo-midnight/60">
                Scope: Corpus-level auditing
              </div>
            </div>
          </div>

          {/* Critical Limitations Box */}
          <div className="p-5 rounded-2xl bg-rose-50/80 border border-rose-200 text-rose-950 space-y-2">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
              <h4 className="font-editorial text-base font-bold text-rose-900">
                Scientific Caution: Feature Attribution is Not Causality
              </h4>
            </div>
            <p className="text-xs text-rose-900/80 leading-relaxed">
              Attribution tools reveal which words the statistical algorithm relied on. They do not prove real-world causality, nor do they guarantee that the prediction is legally or operationally correct. If a citizen's complaint is poorly phrased, the model may misinterpret genuine emergency conditions. Human judgment and field inspection remain indispensable.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
