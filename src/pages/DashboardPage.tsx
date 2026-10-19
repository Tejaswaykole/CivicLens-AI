import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FileSpreadsheet, 
  AlertTriangle, 
  Layers, 
  ShieldCheck, 
  Sparkles, 
  ArrowUpRight, 
  CheckCircle2, 
  Clock, 
  ExternalLink,
  ChevronRight,
  TrendingUp,
  SlidersHorizontal
} from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis } from 'recharts';
import { SAMPLE_COMPLAINTS, CATEGORY_DISTRIBUTION, PRIORITY_DISTRIBUTION } from '../data/complaintsData';
import { DemoDataNotice } from '../components/common/DemoDataNotice';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-indigo-midnight/10 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-midnight/10 text-indigo-midnight">
              Operational Command
            </span>
            <span className="text-xs text-indigo-midnight/60">Demo Snapshot: 150 Ingested Records</span>
          </div>
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-indigo-midnight mt-1">
            Public Grievance Intelligence
          </h2>
          <p className="text-sm text-indigo-midnight/70 mt-1">
            Real-time complaint triage, explainable priority categorization, and department dispatch status.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/app/analyze')}
            className="px-4 py-2.5 rounded-xl bg-plum hover:bg-plum-light text-cream-vanilla text-sm font-semibold shadow-soft flex items-center gap-2 transition-all hover:scale-[1.02]"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Analyze a Complaint</span>
          </button>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="p-5 rounded-2xl bg-cream-card border border-indigo-midnight/15 shadow-soft flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between text-indigo-midnight/60 text-xs font-semibold uppercase tracking-wider">
            <span>Total Grievances</span>
            <FileSpreadsheet className="w-4 h-4 text-indigo-midnight" />
          </div>
          <div>
            <div className="text-3xl font-bold font-editorial text-indigo-midnight">150</div>
            <p className="text-xs text-indigo-midnight/60 mt-0.5">Illustrative Demo Batch</p>
          </div>
          <div className="pt-2 border-t border-indigo-midnight/10 flex items-center justify-between text-xs text-indigo-midnight/70">
            <span>Logged Today</span>
            <span className="font-mono font-semibold">+18 records</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="p-5 rounded-2xl bg-cream-card border border-indigo-midnight/15 shadow-soft flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between text-rose-800 text-xs font-semibold uppercase tracking-wider">
            <span>Predicted High Priority</span>
            <AlertTriangle className="w-4 h-4 text-rose-600" />
          </div>
          <div>
            <div className="text-3xl font-bold font-editorial text-rose-700">52</div>
            <p className="text-xs text-rose-800/80 mt-0.5">34.6% of total intake</p>
          </div>
          <div className="pt-2 border-t border-indigo-midnight/10 flex items-center justify-between text-xs text-indigo-midnight/70">
            <span>Avg Response Target</span>
            <span className="font-mono font-semibold text-rose-700">&lt; 4 Hours</span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="p-5 rounded-2xl bg-cream-card border border-indigo-midnight/15 shadow-soft flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between text-indigo-midnight/60 text-xs font-semibold uppercase tracking-wider">
            <span>Active Categories</span>
            <Layers className="w-4 h-4 text-indigo-midnight" />
          </div>
          <div>
            <div className="text-3xl font-bold font-editorial text-indigo-midnight">6 Units</div>
            <p className="text-xs text-indigo-midnight/60 mt-0.5">Municipal routing taxonomy</p>
          </div>
          <div className="pt-2 border-t border-indigo-midnight/10 flex items-center justify-between text-xs text-indigo-midnight/70">
            <span>Top Intake Area</span>
            <span className="font-semibold text-indigo-midnight">Roads (32%)</span>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="p-5 rounded-2xl bg-cream-card border border-indigo-midnight/15 shadow-soft flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between text-emerald-800 text-xs font-semibold uppercase tracking-wider">
            <span>Model Evaluation Concept</span>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div>
            <div className="text-3xl font-bold font-editorial text-emerald-700">85.9%</div>
            <p className="text-xs text-emerald-800/80 mt-0.5">Illustrative Macro F1-Score</p>
          </div>
          <div className="pt-2 border-t border-indigo-midnight/10 flex items-center justify-between text-xs text-indigo-midnight/70">
            <span>High-Priority Recall</span>
            <span className="font-mono font-semibold text-emerald-700">93.2% Target</span>
          </div>
        </div>
      </div>

      {/* Visual Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Category Breakdown Chart */}
        <div className="lg:col-span-7 bg-cream-card rounded-2xl border border-indigo-midnight/15 p-6 shadow-soft space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-editorial text-lg font-bold text-indigo-midnight">
                Intake Volume by Category
              </h3>
              <p className="text-xs text-indigo-midnight/65">
                Demonstration distribution across core municipal departments
              </p>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-midnight/10 text-indigo-midnight">
              Taxonomy
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={CATEGORY_DISTRIBUTION}
                margin={{ top: 10, right: 10, left: -20, bottom: 25 }}
              >
                <XAxis 
                  dataKey="name" 
                  angle={-15} 
                  textAnchor="end" 
                  interval={0} 
                  tick={{ fontSize: 10, fill: '#282B4A' }} 
                  stroke="#282B4A40"
                />
                <YAxis tick={{ fontSize: 11, fill: '#282B4A' }} stroke="#282B4A40" />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload as typeof CATEGORY_DISTRIBUTION[0];
                      return (
                        <div className="bg-indigo-midnight text-cream-vanilla p-2.5 rounded-xl shadow-lg text-xs border border-indigo-light/30">
                          <p className="font-bold">{data.name}</p>
                          <p className="text-amber-200 mt-0.5">{data.count} Complaints ({data.percentage}%)</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                  {CATEGORY_DISTRIBUTION.map((entry, index) => (
                    <Cell key={`bar-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Priority Breakdown Donut */}
        <div className="lg:col-span-5 bg-cream-card rounded-2xl border border-indigo-midnight/15 p-6 shadow-soft space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-editorial text-lg font-bold text-indigo-midnight">
                Predicted Priority Triage
              </h3>
              <p className="text-xs text-indigo-midnight/65">
                Proportion of automated urgency classifications
              </p>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-midnight/10 text-indigo-midnight">
              Tiers
            </span>
          </div>

          <div className="h-48 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={PRIORITY_DISTRIBUTION}
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={5}
                  dataKey="count"
                >
                  {PRIORITY_DISTRIBUTION.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload as typeof PRIORITY_DISTRIBUTION[0];
                      return (
                        <div className="bg-indigo-midnight text-cream-vanilla p-2 rounded-lg text-xs">
                          <span className="font-semibold">{data.name}: </span>
                          <span>{data.count} cases ({data.percentage}%)</span>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Priority Legend */}
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-indigo-midnight/10 text-xs">
            {PRIORITY_DISTRIBUTION.map((p, i) => (
              <div key={i} className="text-center">
                <div className="flex items-center justify-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.color }} />
                  <span className="font-semibold text-indigo-midnight">{p.name.split(' ')[0]}</span>
                </div>
                <p className="text-[11px] text-indigo-midnight/60 font-mono mt-0.5">{p.percentage}% ({p.count})</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Coming Soon Hero Card: CivicLens Predict */}
      <div 
        onClick={() => navigate('/app/predict')}
        className="cursor-pointer rounded-2xl bg-gradient-to-r from-indigo-midnight via-indigo-dark to-plum p-6 sm:p-8 text-cream-vanilla shadow-soft-lg border border-indigo-light/30 relative overflow-hidden group transition-all hover:scale-[1.01]"
      >
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none group-hover:scale-110 transition-transform">
          <Sparkles className="w-48 h-48 text-amber-200" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-300/30 text-amber-200 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>CivicLens Predict — Conceptual Roadmap</span>
              <span className="bg-amber-400 text-indigo-midnight text-[9px] px-1.5 py-0.2 rounded font-black">COMING SOON</span>
            </div>
            <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-cream-vanilla tracking-tight">
              From responding to civic crises, to anticipating them.
            </h3>
            <p className="text-xs sm:text-sm text-cream-vanilla/75 leading-relaxed">
              Explore how spatio-temporal complaint density, historical weather data, and infrastructure aging models will empower city councils to proactively fix issues before citizens file a ticket.
            </p>
          </div>

          <div className="shrink-0">
            <span className="px-5 py-2.5 rounded-xl bg-cream-vanilla text-indigo-midnight font-bold text-xs group-hover:bg-amber-200 transition-colors shadow-md inline-flex items-center gap-2">
              <span>Preview Roadmap</span>
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </div>

      {/* Recent Complaints Table */}
      <div className="bg-cream-card rounded-2xl border border-indigo-midnight/15 p-6 shadow-soft space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-editorial text-lg font-bold text-indigo-midnight">
              Recent Grievance Feed & Algorithmic Triage
            </h3>
            <p className="text-xs text-indigo-midnight/65">
              Inspecting the latest municipal submissions, predicted priorities, and human verification status.
            </p>
          </div>
          <button
            onClick={() => navigate('/app/complaints')}
            className="text-xs font-semibold text-plum hover:text-plum-light flex items-center gap-1 self-start sm:self-auto transition-colors"
          >
            <span>View All 150 Complaints</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border border-indigo-midnight/10">
          <table className="w-full text-left text-xs">
            <thead className="bg-cream-vanilla/80 text-indigo-midnight uppercase tracking-wider text-[10px] font-bold border-b border-indigo-midnight/10">
              <tr>
                <th className="py-3 px-4">ID</th>
                <th className="py-3 px-4">Complaint Summary</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Predicted Priority</th>
                <th className="py-3 px-4">Recommended Dept</th>
                <th className="py-3 px-4">Review Status</th>
                <th className="py-3 px-4 text-right">Explainability</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-indigo-midnight/5 text-indigo-midnight/80">
              {SAMPLE_COMPLAINTS.slice(0, 5).map((comp) => (
                <tr key={comp.id} className="hover:bg-cream-vanilla/40 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-indigo-midnight">
                    {comp.id}
                  </td>
                  <td className="py-3 px-4 max-w-xs font-medium text-indigo-midnight truncate">
                    {comp.title}
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded bg-indigo-midnight/5 text-indigo-midnight font-medium">
                      {comp.category}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                      comp.predictedPriority === 'High'
                        ? 'bg-rose-100 text-rose-800 border border-rose-300'
                        : comp.predictedPriority === 'Medium'
                        ? 'bg-amber-100 text-amber-800 border border-amber-300'
                        : 'bg-blue-100 text-blue-800 border border-blue-300'
                    }`}>
                      {comp.predictedPriority}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-medium text-indigo-midnight/90 truncate max-w-[180px]">
                    {comp.recommendedDepartment}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center gap-1 font-semibold ${
                      comp.reviewStatus === 'Accepted' ? 'text-emerald-700' : 'text-amber-700'
                    }`}>
                      {comp.reviewStatus === 'Accepted' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                      <span>{comp.reviewStatus}</span>
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => navigate(`/app/explainability?complaintId=${comp.id}`)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-cream-vanilla hover:bg-cream-warm border border-indigo-midnight/20 text-indigo-midnight text-[11px] font-semibold transition-colors"
                      title="Inspect token feature attributions"
                    >
                      <SlidersHorizontal className="w-3 h-3 text-indigo-midnight/70" />
                      <span>Inspect</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
