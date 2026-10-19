import React, { useState } from 'react';
import { ArrowLeftRight, Sparkles, RefreshCw, AlertCircle } from 'lucide-react';
import { analyzeLocalComplaintText } from '../../utils/analyzerEngine';

interface ScenarioComparisonProps {
  initialOriginalText?: string;
}

export const ScenarioComparison: React.FC<ScenarioComparisonProps> = ({
  initialOriginalText = "A large pothole has developed near a school entrance on 4th Main Road. Vehicles and school buses are swerving abruptly to avoid it, creating a severe safety risk during morning drop-off hours."
}) => {
  const [originalText, setOriginalText] = useState(initialOriginalText);
  const [modifiedText, setModifiedText] = useState(
    "A small pothole has developed on a quiet dead-end residential lane. Vehicles drive slowly past it with minimal disruption."
  );

  const originalResult = analyzeLocalComplaintText(originalText);
  const modifiedResult = analyzeLocalComplaintText(modifiedText);

  return (
    <div className="bg-cream-card rounded-2xl border border-indigo-midnight/15 p-5 sm:p-6 shadow-soft space-y-6">
      <div className="border-b border-indigo-midnight/10 pb-4">
        <div className="flex items-center gap-2">
          <ArrowLeftRight className="w-5 h-5 text-indigo-midnight" />
          <h3 className="font-editorial text-lg sm:text-xl font-bold text-indigo-midnight">
            What-If Priority Simulator
          </h3>
          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-200/60 text-amber-900 border border-amber-300">
            Interactive Sensitivity Test
          </span>
        </div>
        <p className="text-xs text-indigo-midnight/70 mt-1 leading-relaxed">
          See how changing specific context tokens (e.g. replacing "school entrance + swerving" with "quiet residential dead-end") alters the algorithmic priority attribution in real time.
        </p>
      </div>

      {/* Side-by-side scenarios */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Scenario A: Baseline */}
        <div className="p-4 rounded-xl bg-cream-vanilla/60 border border-indigo-midnight/15 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-midnight/70 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-600" />
              Scenario A (Original Complaint)
            </span>
            <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
              originalResult.priority === 'High'
                ? 'bg-rose-100 text-rose-800 border border-rose-300'
                : originalResult.priority === 'Medium'
                ? 'bg-amber-100 text-amber-800 border border-amber-300'
                : 'bg-blue-100 text-blue-800 border border-blue-300'
            }`}>
              {originalResult.priority} Priority
            </span>
          </div>

          <textarea
            rows={3}
            value={originalText}
            onChange={(e) => setOriginalText(e.target.value)}
            className="w-full text-xs p-3 rounded-lg border border-indigo-midnight/20 bg-cream-warm text-indigo-midnight focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-midnight leading-relaxed"
          />

          <div className="space-y-1.5 pt-1 text-xs">
            <div className="flex justify-between text-indigo-midnight/80">
              <span>Category:</span>
              <span className="font-semibold text-indigo-midnight">{originalResult.category}</span>
            </div>
            <div className="flex justify-between text-indigo-midnight/80">
              <span>Routing:</span>
              <span className="font-semibold text-indigo-midnight truncate max-w-[200px]">{originalResult.recommendedDepartment}</span>
            </div>
            <div className="pt-2">
              <span className="text-[11px] font-bold text-indigo-midnight/60 uppercase">Attributed Factors:</span>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {originalResult.features.map((f, i) => (
                  <span key={i} className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                    f.direction === 'positive' ? 'bg-rose-100 text-rose-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {f.feature} ({f.contribution > 0 ? `+${f.contribution}` : f.contribution})
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scenario B: Counterfactual / Modified */}
        <div className="p-4 rounded-xl bg-indigo-midnight/5 border-2 border-dashed border-indigo-midnight/20 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-midnight/70 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-600" />
              Scenario B (Modified Context)
            </span>
            <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
              modifiedResult.priority === 'High'
                ? 'bg-rose-100 text-rose-800 border border-rose-300'
                : modifiedResult.priority === 'Medium'
                ? 'bg-amber-100 text-amber-800 border border-amber-300'
                : 'bg-blue-100 text-blue-800 border border-blue-300'
            }`}>
              {modifiedResult.priority} Priority
            </span>
          </div>

          <textarea
            rows={3}
            value={modifiedText}
            onChange={(e) => setModifiedText(e.target.value)}
            placeholder="Edit text to simulate how different vocabulary affects priority..."
            className="w-full text-xs p-3 rounded-lg border border-indigo-midnight/20 bg-cream-warm text-indigo-midnight focus:bg-white focus:outline-none focus:ring-1 focus:ring-plum leading-relaxed"
          />

          <div className="space-y-1.5 pt-1 text-xs">
            <div className="flex justify-between text-indigo-midnight/80">
              <span>Category:</span>
              <span className="font-semibold text-indigo-midnight">{modifiedResult.category}</span>
            </div>
            <div className="flex justify-between text-indigo-midnight/80">
              <span>Routing:</span>
              <span className="font-semibold text-indigo-midnight truncate max-w-[200px]">{modifiedResult.recommendedDepartment}</span>
            </div>
            <div className="pt-2">
              <span className="text-[11px] font-bold text-indigo-midnight/60 uppercase">Attributed Factors:</span>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {modifiedResult.features.map((f, i) => (
                  <span key={i} className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                    f.direction === 'positive' ? 'bg-rose-100 text-rose-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {f.feature} ({f.contribution > 0 ? `+${f.contribution}` : f.contribution})
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Analytical takeaway */}
      <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 flex items-start gap-3 text-xs text-amber-900">
        <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-semibold">Explainability Governance Insight:</p>
          <p className="text-amber-800 leading-relaxed">
            A change in algorithmic priority here demonstrates text sensitivity, not necessarily an objective shift in physical road degradation. This highlights why explainable AI must pair with human verification rather than operating on closed autopilot.
          </p>
        </div>
      </div>
    </div>
  );
};
