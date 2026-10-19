import React from 'react';
import { Menu, Search, Bell, Sparkles, SlidersHorizontal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface TopbarProps {
  onToggleSidebar: () => void;
  title?: string;
  subtitle?: string;
}

export const Topbar: React.FC<TopbarProps> = ({ 
  onToggleSidebar, 
  title = "Public Grievance Intelligence",
  subtitle = "Explore complaint patterns, predicted priorities, and explainable AI insights."
}) => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-30 bg-cream-warm/90 backdrop-blur-md border-b border-indigo-midnight/10 px-4 sm:px-8 py-3.5 transition-all">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Mobile hamburger & title */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="p-2 -ml-2 rounded-lg text-indigo-midnight hover:bg-cream-vanilla lg:hidden focus:outline-none"
            aria-label="Open sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div>
            <h1 className="font-editorial text-lg sm:text-xl font-bold text-indigo-midnight tracking-tight leading-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="text-xs text-indigo-midnight/65 hidden sm:block">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <button
            onClick={() => navigate('/app/analyze')}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-plum hover:bg-plum-light text-cream-vanilla text-xs sm:text-sm font-medium shadow-sm transition-all hover:scale-[1.02]"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Analyze Complaint</span>
          </button>

          <button
            onClick={() => navigate('/app/explainability')}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-indigo-midnight/20 hover:bg-cream-vanilla text-indigo-midnight text-xs font-medium transition-colors"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-midnight/70" />
            <span>Explain Decision</span>
          </button>

          <div className="h-6 w-px bg-indigo-midnight/15 mx-1 hidden sm:block" />

          {/* Demonstration mode pill */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-100/70 text-amber-900 border border-amber-300/40 text-[11px] font-medium">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span>Live Interactive Demo</span>
          </div>
        </div>
      </div>
    </header>
  );
};
