import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  SlidersHorizontal, 
  FileSpreadsheet, 
  ArrowUpDown, 
  Eye, 
  CheckCircle2, 
  Clock, 
  MapPin,
  Calendar,
  Layers,
  ChevronDown
} from 'lucide-react';
import { SAMPLE_COMPLAINTS } from '../data/complaintsData';
import { ComplaintRecord } from '../types';
import { DemoDataNotice } from '../components/common/DemoDataNotice';

export const ComplaintsRecordsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [priorityFilter, setPriorityFilter] = useState<string>('All');
  const [departmentFilter, setDepartmentFilter] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'id' | 'priority' | 'date'>('id');
  const [selectedComplaint, setSelectedComplaint] = useState<ComplaintRecord | null>(SAMPLE_COMPLAINTS[0]);

  // Filtered array
  const filteredRecords = SAMPLE_COMPLAINTS.filter((comp) => {
    const matchesSearch = 
      comp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comp.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comp.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comp.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = categoryFilter === 'All' || comp.category === categoryFilter;
    const matchesPriority = priorityFilter === 'All' || comp.predictedPriority === priorityFilter;
    const matchesDept = departmentFilter === 'All' || comp.recommendedDepartment === departmentFilter;

    return matchesSearch && matchesCategory && matchesPriority && matchesDept;
  });

  const categories = ['All', 'Roads & Infrastructure', 'Water Supply', 'Electrical & Lighting', 'Sanitation & Drainage', 'Solid Waste Management'];
  const priorities = ['All', 'High', 'Medium', 'Low'];
  const departments = ['All', 'Public Works Department (PWD)', 'Municipal Water Board', 'Power Distribution & Lighting', 'Drainage & Sewerage Authority', 'Municipal Solid Waste Management'];

  return (
    <div className="space-y-8 animate-fade-in max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-indigo-midnight/10 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-midnight/10 text-indigo-midnight">
              Registry
            </span>
            <span className="text-xs text-indigo-midnight/60">Sample Batch: 8 Detailed Audited Records</span>
          </div>
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-indigo-midnight mt-1">
            Complaint Records & Triage Registry
          </h2>
          <p className="text-sm text-indigo-midnight/70 mt-1">
            Search, filter, and inspect incoming municipal grievances and their associated explainability profiles.
          </p>
        </div>

        <button
          onClick={() => navigate('/app/analyze')}
          className="px-4 py-2.5 rounded-xl bg-plum hover:bg-plum-light text-cream-vanilla text-xs sm:text-sm font-semibold shadow-soft transition-all self-start sm:self-auto"
        >
          Submit New Complaint
        </button>
      </div>

      <DemoDataNotice 
        variant="banner" 
        customText="Sample Demonstration Registry — Illustrative mock complaints for Hackathon Challenge 04 evaluation." 
      />

      {/* Search and Filters Bar */}
      <div className="bg-cream-card rounded-2xl border border-indigo-midnight/15 p-4 sm:p-5 shadow-soft space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {/* Search bar */}
          <div className="relative md:col-span-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-indigo-midnight/50" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search keyword, ID, location..."
              className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-cream-warm border border-indigo-midnight/20 text-indigo-midnight focus:bg-white focus:outline-none focus:ring-1 focus:ring-plum"
            />
          </div>

          {/* Category Dropdown */}
          <div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl text-xs bg-cream-warm border border-indigo-midnight/20 text-indigo-midnight focus:bg-white focus:outline-none focus:ring-1 focus:ring-plum"
            >
              {categories.map((c) => (
                <option key={c} value={c}>Category: {c}</option>
              ))}
            </select>
          </div>

          {/* Priority Dropdown */}
          <div>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl text-xs bg-cream-warm border border-indigo-midnight/20 text-indigo-midnight focus:bg-white focus:outline-none focus:ring-1 focus:ring-plum"
            >
              {priorities.map((p) => (
                <option key={p} value={p}>Priority: {p}</option>
              ))}
            </select>
          </div>

          {/* Department Dropdown */}
          <div>
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl text-xs bg-cream-warm border border-indigo-midnight/20 text-indigo-midnight focus:bg-white focus:outline-none focus:ring-1 focus:ring-plum"
            >
              {departments.map((d) => (
                <option key={d} value={d}>Dept: {d}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-indigo-midnight/70 pt-1 border-t border-indigo-midnight/10">
          <span>Showing <strong className="text-indigo-midnight">{filteredRecords.length}</strong> matching records</span>
          {(searchTerm || categoryFilter !== 'All' || priorityFilter !== 'All' || departmentFilter !== 'All') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setCategoryFilter('All');
                setPriorityFilter('All');
                setDepartmentFilter('All');
              }}
              className="text-plum hover:underline font-semibold"
            >
              Reset all filters
            </button>
          )}
        </div>
      </div>

      {/* Master Detail Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left List Column */}
        <div className="lg:col-span-7 space-y-3">
          {filteredRecords.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-cream-card border border-indigo-midnight/15 text-indigo-midnight/60">
              <FileSpreadsheet className="w-10 h-10 mx-auto text-indigo-midnight/40 mb-2" />
              <p className="font-semibold text-sm">No complaints matched your filter criteria</p>
              <p className="text-xs mt-1">Try resetting search filters or keywords.</p>
            </div>
          ) : (
            filteredRecords.map((comp) => (
              <div
                key={comp.id}
                onClick={() => setSelectedComplaint(comp)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  selectedComplaint?.id === comp.id
                    ? 'bg-cream-vanilla/90 border-plum shadow-md scale-[1.01]'
                    : 'bg-cream-card border-indigo-midnight/15 hover:border-indigo-midnight/30'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-indigo-midnight">{comp.id}</span>
                      <span className="text-[10px] text-indigo-midnight/60">• {comp.dateReported.split(' ')[0]}</span>
                    </div>
                    <h4 className="font-bold text-sm text-indigo-midnight leading-snug">
                      {comp.title}
                    </h4>
                    <p className="text-xs text-indigo-midnight/70 line-clamp-2 leading-relaxed">
                      {comp.description}
                    </p>
                  </div>

                  <span className={`px-2.5 py-0.5 rounded text-[11px] font-bold shrink-0 ${
                    comp.predictedPriority === 'High'
                      ? 'bg-rose-100 text-rose-800 border border-rose-300'
                      : comp.predictedPriority === 'Medium'
                      ? 'bg-amber-100 text-amber-800 border border-amber-300'
                      : 'bg-blue-100 text-blue-800 border border-blue-300'
                  }`}>
                    {comp.predictedPriority}
                  </span>
                </div>

                <div className="mt-3 pt-2.5 border-t border-indigo-midnight/10 flex flex-wrap items-center justify-between text-[11px] text-indigo-midnight/70 gap-2">
                  <span className="truncate max-w-[220px]">{comp.recommendedDepartment}</span>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[10px] text-indigo-midnight/60">{comp.confidenceScore}% conf</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/app/explainability?complaintId=${comp.id}`);
                      }}
                      className="text-plum hover:underline font-semibold flex items-center gap-1"
                    >
                      <SlidersHorizontal className="w-3 h-3" />
                      <span>Audit Features</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Right Detail Pane */}
        <div className="lg:col-span-5">
          {selectedComplaint ? (
            <div className="sticky top-24 bg-cream-card rounded-2xl border border-indigo-midnight/15 p-6 shadow-soft space-y-5">
              <div className="flex items-start justify-between gap-3 border-b border-indigo-midnight/10 pb-4">
                <div>
                  <span className="text-[10px] font-mono font-bold text-indigo-midnight/60">{selectedComplaint.id}</span>
                  <h3 className="font-editorial text-xl font-bold text-indigo-midnight leading-snug mt-0.5">
                    {selectedComplaint.title}
                  </h3>
                </div>
                <span className={`px-2.5 py-1 rounded text-xs font-bold shrink-0 ${
                  selectedComplaint.predictedPriority === 'High'
                    ? 'bg-rose-100 text-rose-800 border border-rose-300'
                    : selectedComplaint.predictedPriority === 'Medium'
                    ? 'bg-amber-100 text-amber-800 border border-amber-300'
                    : 'bg-blue-100 text-blue-800 border border-blue-300'
                }`}>
                  {selectedComplaint.predictedPriority} Priority
                </span>
              </div>

              {/* Full narrative */}
              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-midnight/60">
                  Citizen Submission:
                </span>
                <p className="text-xs text-indigo-midnight/85 leading-relaxed bg-cream-warm p-3.5 rounded-xl border border-indigo-midnight/10">
                  "{selectedComplaint.description}"
                </p>
              </div>

              {/* Metadata details */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-indigo-midnight/60 block">Category:</span>
                  <span className="font-semibold text-indigo-midnight">{selectedComplaint.category}</span>
                </div>
                <div>
                  <span className="text-indigo-midnight/60 block">Routing Target:</span>
                  <span className="font-semibold text-indigo-midnight truncate">{selectedComplaint.recommendedDepartment}</span>
                </div>
                <div>
                  <span className="text-indigo-midnight/60 block">Reported Timestamp:</span>
                  <span className="font-mono text-indigo-midnight">{selectedComplaint.dateReported}</span>
                </div>
                <div>
                  <span className="text-indigo-midnight/60 block">Location:</span>
                  <span className="font-medium text-indigo-midnight truncate">{selectedComplaint.location}</span>
                </div>
              </div>

              {/* Key Features attribution snapshot */}
              <div className="pt-2 border-t border-indigo-midnight/10 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold uppercase tracking-wider text-indigo-midnight/70">
                    Contributing Factors:
                  </span>
                  <button
                    onClick={() => navigate(`/app/explainability?complaintId=${selectedComplaint.id}`)}
                    className="text-plum hover:underline font-semibold text-xs flex items-center gap-1"
                  >
                    <span>Full SHAP Chart</span>
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-1.5">
                  {selectedComplaint.features.slice(0, 3).map((f, i) => (
                    <div key={i} className="p-2 rounded-lg bg-cream-warm border border-indigo-midnight/10 flex items-center justify-between text-xs">
                      <span className="font-medium text-indigo-midnight">"{f.feature}"</span>
                      <span className={`font-mono font-bold ${f.contribution >= 0 ? 'text-rose-700' : 'text-blue-700'}`}>
                        {f.contribution > 0 ? `+${f.contribution}` : f.contribution}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Review status */}
              <div className="p-3 rounded-xl bg-indigo-midnight/5 border border-indigo-midnight/10 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span className="font-semibold text-indigo-midnight">Audit Status: {selectedComplaint.reviewStatus}</span>
                </div>
                <button
                  onClick={() => navigate('/app/analyze')}
                  className="text-plum font-semibold hover:underline"
                >
                  Override
                </button>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center rounded-2xl bg-cream-card border border-indigo-midnight/15 text-indigo-midnight/60">
              Select a complaint from the list to view its audit record.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
