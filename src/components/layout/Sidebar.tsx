import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Compass, 
  LayoutDashboard, 
  SearchCode, 
  FileSpreadsheet, 
  Lightbulb, 
  BarChart3, 
  Cpu, 
  ShieldCheck, 
  Sparkles,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const navItems = [
    { to: '/app', label: 'Dashboard', icon: LayoutDashboard, end: true },
    { to: '/app/analyze', label: 'Analyze Complaint', icon: SearchCode },
    { to: '/app/complaints', label: 'Complaint Records', icon: FileSpreadsheet },
    { to: '/app/explainability', label: 'Explainable AI', icon: Lightbulb },
    { to: '/app/analytics', label: 'Analytics & Insights', icon: BarChart3 },
    { to: '/app/model', label: 'Model Architecture', icon: Cpu },
    { to: '/app/responsible-ai', label: 'Responsible AI', icon: ShieldCheck },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-indigo-midnight/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside className={`
        fixed top-0 bottom-0 left-0 z-40 w-64 bg-indigo-midnight text-cream-vanilla
        flex flex-col border-r border-indigo-light/30 transition-transform duration-300 ease-in-out
        lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Brand header */}
        <div className="p-6 border-b border-indigo-light/30 flex items-center justify-between">
          <NavLink to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cream-vanilla via-cream-warm to-amber-200 flex items-center justify-center shadow-lg shadow-black/30 group-hover:scale-105 transition-transform">
              <span className="font-serif font-bold text-xl text-indigo-midnight">CL</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif font-bold text-lg tracking-tight text-cream-vanilla">CivicLens</span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-plum text-cream-vanilla tracking-widest uppercase">AI</span>
              </div>
              <p className="text-[11px] text-cream-vanilla/60 font-sans tracking-wide">Explainable Grievance Intel</p>
            </div>
          </NavLink>
        </div>

        {/* Back to story link */}
        <div className="px-4 py-3 bg-indigo-dark/50 border-b border-indigo-light/20">
          <NavLink
            to="/"
            className="flex items-center justify-between text-xs font-medium text-cream-vanilla/70 hover:text-cream-vanilla hover:bg-indigo-light/30 px-3 py-2 rounded-lg transition-colors"
          >
            <span className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-amber-300" />
              <span>Cinematic Story</span>
            </span>
            <ExternalLink className="w-3.5 h-3.5 text-cream-vanilla/40" />
          </NavLink>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-cream-vanilla/40">
            Operations & Explainability
          </div>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={onClose}
              className={({ isActive }) => `
                flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group
                ${isActive 
                  ? 'bg-plum text-cream-vanilla shadow-md shadow-plum/40 font-semibold' 
                  : 'text-cream-vanilla/70 hover:text-cream-vanilla hover:bg-indigo-light/40'
                }
              `}
            >
              <item.icon className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110" />
              <span className="truncate">{item.label}</span>
            </NavLink>
          ))}

          {/* Special Predict Coming Soon link */}
          <div className="pt-4">
            <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-cream-vanilla/40">
              Future Roadmap
            </div>
            <NavLink
              to="/app/predict"
              onClick={onClose}
              className={({ isActive }) => `
                flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all group border border-amber-300/20
                ${isActive 
                  ? 'bg-amber-400/20 text-cream-vanilla border-amber-400/40' 
                  : 'text-amber-200/80 hover:bg-indigo-light/30 hover:text-amber-100'
                }
              `}
            >
              <span className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-amber-300 animate-pulse shrink-0" />
                <span className="truncate">CivicLens Predict</span>
              </span>
              <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-200 font-bold tracking-wider">
                Soon
              </span>
            </NavLink>
          </div>
        </nav>

        {/* Bottom context tag */}
        <div className="p-4 m-3 rounded-xl bg-indigo-dark/80 border border-indigo-light/20 text-xs">
          <p className="font-semibold text-cream-vanilla text-[11px] uppercase tracking-wider text-amber-200">
            Hackathon Challenge 04
          </p>
          <p className="text-cream-vanilla/60 text-[11px] mt-1 leading-snug">
            Which public grievance needs priority, and why?
          </p>
          <div className="mt-3 pt-2.5 border-t border-indigo-light/30 flex items-center justify-between text-[11px] text-cream-vanilla/50">
            <span>Prototype v1.0</span>
            <span className="px-1.5 py-0.5 rounded bg-green-500/20 text-green-300 font-mono text-[10px]">Active Demo</span>
          </div>
        </div>
      </aside>
    </>
  );
};
