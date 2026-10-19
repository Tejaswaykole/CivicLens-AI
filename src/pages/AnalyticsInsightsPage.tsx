import React from 'react';
import { 
  BarChart3, 
  Target, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  TrendingUp, 
  FileCheck2, 
  HelpCircle,
  Clock,
  Layers
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, LineChart, Line, CartesianGrid } from 'recharts';
import { 
  CATEGORY_DISTRIBUTION, 
  PRIORITY_DISTRIBUTION, 
  DEPARTMENT_DISTRIBUTION,
  MODEL_EVALUATION_METRICS 
} from '../data/complaintsData';
import { DemoDataNotice } from '../components/common/DemoDataNotice';

export const AnalyticsInsightsPage: React.FC = () => {
  const trendData = [
    { day: 'Mon', high: 8, medium: 12, low: 5 },
    { day: 'Tue', high: 11, medium: 15, low: 7 },
    { day: 'Wed', high: 9, medium: 14, low: 6 },
    { day: 'Thu', high: 14, medium: 18, low: 9 },
    { day: 'Fri', high: 16, medium: 22, low: 11 },
    { day: 'Sat', high: 12, medium: 16, low: 8 },
    { day: 'Sun', high: 7, medium: 9, low: 4 },
  ];

  return (
    <div className="space-y-8 animate-fade-in max-w-7xl mx-auto">
      {/* Header */}
      <div className="border-b border-indigo-midnight/10 pb-6">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-midnight/10 text-indigo-midnight">
            Civic Intelligence
          </span>
          <span className="text-xs text-indigo-midnight/60">Cross-Department Operational Analysis</span>
        </div>
        <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-indigo-midnight mt-1">
          Analytics & Model Evaluation
        </h2>
        <p className="text-sm text-indigo-midnight/70 mt-1 max-w-3xl">
          Track intake volumes across municipal divisions alongside benchmark validation metrics for priority classification algorithms.
        </p>
      </div>

      <DemoDataNotice 
        variant="banner" 
        customText="ILLUSTRATIVE METRICS — NOT ACTUAL LIVE MODEL PERFORMANCE. These values represent target evaluation benchmarks for Hackathon Challenge 04." 
      />

      {/* SECTION 1: COMPLAINT ANALYTICS */}
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-indigo-midnight" />
          <h3 className="font-editorial text-xl font-bold text-indigo-midnight">
            Municipal Complaint Volume Analytics
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Weekly Intake Trend */}
          <div className="lg:col-span-7 bg-cream-card rounded-2xl border border-indigo-midnight/15 p-6 shadow-soft space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-editorial text-base font-bold text-indigo-midnight">
                  Weekly Complaint Ingestion by Priority
                </h4>
                <p className="text-xs text-indigo-midnight/65">
                  Visualizing diurnal patterns and weekend volume drop-offs
                </p>
              </div>
              <span className="text-[10px] font-mono font-bold text-indigo-midnight/60">
                LAST 7 DAYS
              </span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#282B4A15" />
                  <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#282B4A' }} stroke="#282B4A40" />
                  <YAxis tick={{ fontSize: 11, fill: '#282B4A' }} stroke="#282B4A40" />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-indigo-midnight text-cream-vanilla p-3 rounded-xl shadow-lg text-xs space-y-1 border border-indigo-light/30">
                            <p className="font-bold text-amber-200">{payload[0].payload.day}</p>
                            <p className="text-rose-400">High: {payload[0].payload.high}</p>
                            <p className="text-amber-400">Medium: {payload[0].payload.medium}</p>
                            <p className="text-blue-400">Low: {payload[0].payload.low}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Line type="monotone" dataKey="high" stroke="#DC2626" strokeWidth={2.5} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="medium" stroke="#D97706" strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="low" stroke="#2563EB" strokeWidth={1.5} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="flex items-center justify-center gap-6 pt-2 border-t border-indigo-midnight/10 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-600" />
                <span className="text-indigo-midnight font-medium">High Urgency</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span className="text-indigo-midnight font-medium">Medium</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                <span className="text-indigo-midnight font-medium">Low</span>
              </div>
            </div>
          </div>

          {/* Department Dispatch Times */}
          <div className="lg:col-span-5 bg-cream-card rounded-2xl border border-indigo-midnight/15 p-6 shadow-soft space-y-4">
            <div>
              <h4 className="font-editorial text-base font-bold text-indigo-midnight">
                Departmental Caseload & SLA Target
              </h4>
              <p className="text-xs text-indigo-midnight/65">
                Average resolution turnaround by assigned municipal unit
              </p>
            </div>

            <div className="space-y-3">
              {DEPARTMENT_DISTRIBUTION.map((dept, i) => (
                <div key={i} className="p-3 rounded-xl bg-cream-vanilla/60 border border-indigo-midnight/10 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-indigo-midnight">{dept.department}</p>
                    <p className="text-indigo-midnight/60 text-[11px] mt-0.5">{dept.count} Active Cases</p>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-semibold text-plum">{dept.avgResolutionTime}</span>
                    <span className="block text-[10px] text-indigo-midnight/50">Target SLA</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: MODEL EVALUATION CONCEPT */}
      <div className="space-y-6 pt-4 border-t border-indigo-midnight/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-indigo-midnight" />
            <h3 className="font-editorial text-xl font-bold text-indigo-midnight">
              Model Evaluation Framework & Benchmark Concept
            </h3>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-amber-200/80 text-amber-900 border border-amber-300">
            Concept Specifications
          </span>
        </div>

        {/* Metric Cards Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-cream-card border border-indigo-midnight/15 space-y-1">
            <span className="text-[11px] font-semibold text-indigo-midnight/60 uppercase">Macro Precision</span>
            <div className="text-2xl font-bold font-editorial text-indigo-midnight">{MODEL_EVALUATION_METRICS.macroPrecision}</div>
            <p className="text-[11px] text-indigo-midnight/60">Cross-category purity</p>
          </div>

          <div className="p-4 rounded-xl bg-cream-card border border-indigo-midnight/15 space-y-1">
            <span className="text-[11px] font-semibold text-indigo-midnight/60 uppercase">Macro Recall</span>
            <div className="text-2xl font-bold font-editorial text-indigo-midnight">{MODEL_EVALUATION_METRICS.macroRecall}</div>
            <p className="text-[11px] text-indigo-midnight/60">Completeness across classes</p>
          </div>

          <div className="p-4 rounded-xl bg-cream-card border border-indigo-midnight/15 space-y-1">
            <span className="text-[11px] font-semibold text-indigo-midnight/60 uppercase">Macro F1-Score</span>
            <div className="text-2xl font-bold font-editorial text-indigo-midnight">{MODEL_EVALUATION_METRICS.macroF1}</div>
            <p className="text-[11px] text-indigo-midnight/60">Harmonic balance index</p>
          </div>

          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 space-y-1">
            <span className="text-[11px] font-semibold text-rose-800 uppercase">High Priority Recall</span>
            <div className="text-2xl font-bold font-editorial text-rose-700">{MODEL_EVALUATION_METRICS.highPriorityRecall}</div>
            <p className="text-[11px] text-rose-800/80">Safety critical threshold</p>
          </div>
        </div>

        {/* Confusion Matrix Table */}
        <div className="bg-cream-card rounded-2xl border border-indigo-midnight/15 p-6 shadow-soft space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h4 className="font-editorial text-base font-bold text-indigo-midnight">
                Benchmark Confusion Matrix (N = 148 Evaluation Cases)
              </h4>
              <p className="text-xs text-indigo-midnight/65">
                Testing whether severe civic safety threats ever get wrongly downgraded
              </p>
            </div>
            <span className="text-[10px] font-mono text-indigo-midnight/60">3x3 MULTICLASS MATRIX</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-center text-xs border-collapse">
              <thead>
                <tr>
                  <th className="p-3 text-left font-bold text-indigo-midnight/60 uppercase text-[10px]">Actual \ Predicted</th>
                  <th className="p-3 font-bold text-rose-700 bg-rose-50/50">Pred High</th>
                  <th className="p-3 font-bold text-amber-700 bg-amber-50/50">Pred Medium</th>
                  <th className="p-3 font-bold text-blue-700 bg-blue-50/50">Pred Low</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-indigo-midnight/10 font-mono">
                {MODEL_EVALUATION_METRICS.confusionMatrix.map((row, i) => (
                  <tr key={i} className="hover:bg-cream-vanilla/40">
                    <td className="p-3 text-left font-bold text-indigo-midnight font-sans">
                      Actual {row.actual}
                    </td>
                    <td className={`p-3 font-bold ${row.actual === 'High' ? 'bg-emerald-100 text-emerald-900 font-extrabold text-sm' : 'text-indigo-midnight'}`}>
                      {row.predHigh}
                    </td>
                    <td className={`p-3 font-bold ${row.actual === 'Medium' ? 'bg-emerald-100 text-emerald-900 font-extrabold text-sm' : 'text-indigo-midnight'}`}>
                      {row.predMedium}
                    </td>
                    <td className={`p-3 font-bold ${row.actual === 'Low' ? 'bg-emerald-100 text-emerald-900 font-extrabold text-sm' : 'text-indigo-midnight'}`}>
                      {row.predLow}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Asymmetric Risk Note */}
          <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-950 space-y-1">
            <p className="font-bold">Asymmetric Error Philosophy in Civic Governance:</p>
            <p className="text-amber-900 leading-relaxed">
              In public works, a <strong>False High</strong> (over-triaging a medium pothole) costs an unnecessary inspection fee. But a <strong>False Low</strong> (ignoring an exposed live wire because of confusing citizen phrasing) could cause catastrophic loss of life. Hence, the classifier loss function is intentionally tuned to penalize False Low predictions by 4x.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
