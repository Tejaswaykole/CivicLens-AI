import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  TrendingUp, 
  Map, 
  Clock, 
  ArrowLeft, 
  Compass, 
  ShieldAlert, 
  Building2,
  Calendar,
  AlertTriangle
} from 'lucide-react';
import { DEMO_PREDICT_HOTSPOTS } from '../data/complaintsData';
import { DemoDataNotice } from '../components/common/DemoDataNotice';

export const CivicLensPredictPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8 animate-fade-in max-w-6xl mx-auto">
      {/* Back button */}
      <div>
        <button
          onClick={() => navigate('/app')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-midnight/70 hover:text-indigo-midnight bg-cream-card px-3 py-1.5 rounded-lg border border-indigo-midnight/15 shadow-sm transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Dashboard</span>
        </button>
      </div>

      {/* Hero Banner */}
      <div className="rounded-3xl bg-gradient-to-br from-indigo-midnight via-indigo-dark to-plum p-8 sm:p-10 text-cream-vanilla relative overflow-hidden shadow-soft-lg border border-indigo-light/30">
        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-300/30 text-amber-200 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>CivicLens Predict — Conceptual Roadmap</span>
            <span className="bg-amber-400 text-indigo-midnight text-[9px] px-1.5 py-0.5 rounded font-black">
              COMING SOON
            </span>
          </div>

          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-cream-vanilla leading-tight">
            What if we could anticipate recurring civic issues?
          </h2>

          <p className="text-sm sm:text-base text-cream-vanilla/80 leading-relaxed font-light">
            Explore how historical complaint patterns, spatio-temporal clustering, and seasonal infrastructure stressors could empower municipalities to anticipate public service bottlenecks before citizen distress escalates.
          </p>
        </div>
      </div>

      <DemoDataNotice 
        variant="card"
        customText="COMING SOON — CONCEPTUAL ROADMAP: This preview illustrates future research and engineering directions. No predictive forecasts or live models are currently executed."
      />

      {/* Three Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Pillar 1 */}
        <div className="p-6 rounded-2xl bg-cream-card border border-indigo-midnight/15 shadow-soft space-y-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-midnight text-cream-vanilla flex items-center justify-center">
            <Clock className="w-5 h-5 text-amber-300" />
          </div>
          <h4 className="font-editorial text-lg font-bold text-indigo-midnight">
            1. Recurring Issue Intelligence
          </h4>
          <p className="text-xs text-indigo-midnight/70 leading-relaxed">
            Flags civic assets that fail repeatedly within 90-day intervals (e.g. repeated temporary cold-mix pothole fills) so public works directors can approve structural repaving instead of stopgap patching.
          </p>
        </div>

        {/* Pillar 2 */}
        <div className="p-6 rounded-2xl bg-cream-card border border-indigo-midnight/15 shadow-soft space-y-3">
          <div className="w-10 h-10 rounded-xl bg-plum text-cream-vanilla flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-amber-300" />
          </div>
          <h4 className="font-editorial text-lg font-bold text-indigo-midnight">
            2. Emerging Trend Detection
          </h4>
          <p className="text-xs text-indigo-midnight/70 leading-relaxed">
            Monitors rolling 7-day velocity spikes in specific grievance categories (e.g. water turbidity) to issue early alerts for municipal water mains contamination before widespread illness outbreaks.
          </p>
        </div>

        {/* Pillar 3 */}
        <div className="p-6 rounded-2xl bg-cream-card border border-indigo-midnight/15 shadow-soft space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-400/30 text-indigo-midnight flex items-center justify-center">
            <Map className="w-5 h-5 text-indigo-midnight" />
          </div>
          <h4 className="font-editorial text-lg font-bold text-indigo-midnight">
            3. Geographic Pattern Analysis
          </h4>
          <p className="text-xs text-indigo-midnight/70 leading-relaxed">
            Correlates grievance GPS coordinates with elevation maps, flood plains, and utility conduit grids to identify vulnerable urban micro-zones requiring preventative civil reinforcement.
          </p>
        </div>
      </div>

      {/* Conceptual Hotspot Mock Feed */}
      <div className="bg-cream-card rounded-2xl border border-indigo-midnight/15 p-6 shadow-soft space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-indigo-midnight/10 pb-4">
          <div>
            <h4 className="font-editorial text-lg font-bold text-indigo-midnight">
              Simulated Proactive Action Recommendations
            </h4>
            <p className="text-xs text-indigo-midnight/65">
              How predictive intelligence would suggest pre-emptive interventions to ward engineers
            </p>
          </div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-midnight/10 text-indigo-midnight">
            Conceptual Simulation
          </span>
        </div>

        <div className="space-y-3">
          {DEMO_PREDICT_HOTSPOTS.map((hotspot, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-cream-vanilla/60 border border-indigo-midnight/10 space-y-2 text-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="font-bold text-indigo-midnight font-mono text-[11px]">{hotspot.ward}</span>
                <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold border border-amber-300 w-fit">
                  {hotspot.confidence}
                </span>
              </div>
              <p className="font-semibold text-indigo-midnight text-sm">
                "{hotspot.clusterIssue}"
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-indigo-midnight/80">
                <div>
                  <span className="text-indigo-midnight/60 font-semibold block">Predictive Signal:</span>
                  <span>{hotspot.predictiveSignal}</span>
                </div>
                <div>
                  <span className="text-plum font-semibold block">Suggested Proactive Action:</span>
                  <span className="font-medium text-indigo-midnight">{hotspot.proactiveAction}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
