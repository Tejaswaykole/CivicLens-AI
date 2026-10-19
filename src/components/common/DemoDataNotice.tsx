import React from 'react';
import { ShieldAlert, Info } from 'lucide-react';

interface DemoNoticeProps {
  variant?: 'banner' | 'badge' | 'card';
  className?: string;
  customText?: string;
}

export const DemoDataNotice: React.FC<DemoNoticeProps> = ({ 
  variant = 'banner', 
  className = '',
  customText
}) => {
  if (variant === 'badge') {
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide bg-plum-subtle text-plum border border-plum/20 ${className}`}>
        <Info className="w-3.5 h-3.5" />
        {customText || "DEMO PROTOTYPE DATA"}
      </span>
    );
  }

  if (variant === 'card') {
    return (
      <div className={`p-3.5 rounded-lg border border-amber-300/60 bg-amber-50/80 text-amber-900 text-xs flex items-start gap-2.5 ${className}`}>
        <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold tracking-wide uppercase text-[11px] text-amber-800">
            Interactive Prototype — Demonstration Results
          </p>
          <p className="mt-0.5 text-amber-700 leading-relaxed">
            {customText || "Results, feature attributions, and evaluation metrics shown are illustrative demonstration outputs powered by local deterministic logic. No live machine learning model or persistent database is connected."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full py-1.5 px-4 bg-indigo-midnight text-cream-vanilla/90 border-b border-indigo-light/40 text-xs flex items-center justify-center gap-2 select-none shadow-sm ${className}`}>
      <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
      <span className="font-medium tracking-wider uppercase text-[11px] text-amber-300">Hackathon Challenge 04 Prototype:</span>
      <span className="text-cream-vanilla/80 hidden sm:inline">
        {customText || "All classifications, priorities, and explanations are illustrative demonstration outputs."}
      </span>
      <span className="text-cream-vanilla/80 sm:hidden">
        Illustrative Demonstration Mode
      </span>
    </div>
  );
};
