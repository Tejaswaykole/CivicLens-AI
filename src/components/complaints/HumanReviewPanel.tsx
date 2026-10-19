import React, { useState } from 'react';
import { CheckCircle2, AlertTriangle, ArrowRight, UserCheck, Clock, MessageSquare, ShieldCheck } from 'lucide-react';

interface HumanReviewPanelProps {
  originalPriority: 'High' | 'Medium' | 'Low';
  complaintTitle: string;
  department: string;
  initialNotes?: string;
  onReviewSubmitted?: (status: string, priority: 'High' | 'Medium' | 'Low', notes: string) => void;
}

export const HumanReviewPanel: React.FC<HumanReviewPanelProps> = ({
  originalPriority,
  complaintTitle,
  department,
  initialNotes = '',
  onReviewSubmitted
}) => {
  const [selectedPriority, setSelectedPriority] = useState<'High' | 'Medium' | 'Low'>(originalPriority);
  const [notes, setNotes] = useState(initialNotes);
  const [submittedStatus, setSubmittedStatus] = useState<string | null>(null);

  const handleAction = (status: 'Accepted' | 'Priority Modified' | 'Further Review Requested') => {
    setSubmittedStatus(status);
    if (onReviewSubmitted) {
      onReviewSubmitted(status, selectedPriority, notes);
    }
  };

  return (
    <div className="bg-cream-card rounded-2xl border border-indigo-midnight/15 p-5 sm:p-6 shadow-soft space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-indigo-midnight/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-indigo-midnight" />
            <h3 className="font-editorial text-base sm:text-lg font-bold text-indigo-midnight">
              Human-in-the-Loop Review
            </h3>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-indigo-midnight/10 text-indigo-midnight">
              Decision Oversight
            </span>
          </div>
          <p className="text-xs text-indigo-midnight/70 mt-0.5">
            AI recommendations assist public officials, but final priority designation remains strictly under human authority.
          </p>
        </div>

        {submittedStatus && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold animate-fade-in border border-emerald-300">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Decision Logged: {submittedStatus}</span>
          </div>
        )}
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Machine Prediction Box */}
        <div className="p-4 rounded-xl bg-cream-vanilla/60 border border-indigo-midnight/10 space-y-2">
          <span className="text-[11px] uppercase font-bold tracking-wider text-indigo-midnight/60">
            AI Algorithmic Proposal
          </span>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-indigo-midnight">Suggested Priority</span>
            <span className={`px-2.5 py-1 rounded text-xs font-bold ${
              originalPriority === 'High' 
                ? 'bg-rose-100 text-rose-800 border border-rose-300' 
                : originalPriority === 'Medium'
                ? 'bg-amber-100 text-amber-800 border border-amber-300'
                : 'bg-blue-100 text-blue-800 border border-blue-300'
            }`}>
              {originalPriority} Priority
            </span>
          </div>
          <div className="flex items-center justify-between text-xs text-indigo-midnight/80 pt-1">
            <span>Routing Unit</span>
            <span className="font-semibold">{department}</span>
          </div>
        </div>

        {/* Reviewer Priority Override */}
        <div className="p-4 rounded-xl bg-indigo-midnight/5 border border-indigo-midnight/15 space-y-2">
          <span className="text-[11px] uppercase font-bold tracking-wider text-indigo-midnight/60">
            Human Reviewer Determination
          </span>
          <div className="flex items-center gap-2 pt-1">
            {(['High', 'Medium', 'Low'] as const).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setSelectedPriority(p)}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                  selectedPriority === p
                    ? p === 'High'
                      ? 'bg-rose-700 text-cream-vanilla border-rose-800 shadow-sm'
                      : p === 'Medium'
                      ? 'bg-amber-600 text-cream-vanilla border-amber-700 shadow-sm'
                      : 'bg-blue-700 text-cream-vanilla border-blue-800 shadow-sm'
                    : 'bg-cream-warm text-indigo-midnight border-indigo-midnight/20 hover:border-indigo-midnight/40'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
          {selectedPriority !== originalPriority && (
            <p className="text-[11px] text-amber-800 font-medium flex items-center gap-1 pt-1">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              Overriding machine recommendation from {originalPriority} to {selectedPriority}
            </p>
          )}
        </div>
      </div>

      {/* Reviewer notes textarea */}
      <div className="space-y-1.5">
        <label className="block text-xs font-semibold text-indigo-midnight flex items-center gap-1.5">
          <MessageSquare className="w-3.5 h-3.5 text-indigo-midnight/70" />
          <span>Official Rationale / Dispatch Instruction (Optional)</span>
        </label>
        <textarea
          rows={2}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="e.g. Verified with ground supervisor; prioritizing emergency barricades due to pedestrian school rush."
          className="w-full text-xs p-3 rounded-xl border border-indigo-midnight/20 bg-cream-warm focus:bg-white focus:outline-none focus:ring-2 focus:ring-plum text-indigo-midnight placeholder:text-indigo-midnight/40"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-indigo-midnight/10">
        <p className="text-[11px] text-indigo-midnight/55 italic">
          * Local prototype session: Actions update UI state and are not persisted to a live government database.
        </p>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleAction('Further Review Requested')}
            className="px-3 py-1.5 rounded-lg border border-indigo-midnight/20 hover:bg-cream-vanilla text-indigo-midnight text-xs font-semibold transition-colors flex items-center gap-1.5"
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Escalate for Field Audit</span>
          </button>

          {selectedPriority !== originalPriority ? (
            <button
              type="button"
              onClick={() => handleAction('Priority Modified')}
              className="px-4 py-1.5 rounded-lg bg-plum hover:bg-plum-light text-cream-vanilla text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-300" />
              <span>Confirm Override to {selectedPriority}</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => handleAction('Accepted')}
              className="px-4 py-1.5 rounded-lg bg-indigo-midnight hover:bg-indigo-light text-cream-vanilla text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Accept AI Recommendation</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
