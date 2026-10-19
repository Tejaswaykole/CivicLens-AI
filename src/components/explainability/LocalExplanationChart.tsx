import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, ReferenceLine } from 'recharts';
import { FeatureContribution } from '../../types';

interface LocalExplanationChartProps {
  features: FeatureContribution[];
  title?: string;
  subtitle?: string;
}

export const LocalExplanationChart: React.FC<LocalExplanationChartProps> = ({
  features,
  title = "Local Feature Attribution (LIME / SHAP Conceptual)",
  subtitle = "Tokens that pushed algorithmic priority higher (+) or lower (-)"
}) => {
  // Sort descending by absolute contribution
  const sortedData = [...features].sort((a, b) => Math.abs(b.contribution) - Math.abs(a.contribution));

  return (
    <div className="bg-cream-card rounded-2xl border border-indigo-midnight/15 p-5 sm:p-6 shadow-soft space-y-4">
      <div>
        <div className="flex items-center justify-between">
          <h3 className="font-editorial text-base sm:text-lg font-bold text-indigo-midnight">
            {title}
          </h3>
          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-indigo-midnight/10 text-indigo-midnight">
            Local Instance
          </span>
        </div>
        <p className="text-xs text-indigo-midnight/70 mt-0.5">
          {subtitle}
        </p>
      </div>

      {/* Chart container */}
      <div className="h-64 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={sortedData}
            margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
          >
            <XAxis 
              type="number" 
              domain={[-0.6, 0.6]} 
              tick={{ fontSize: 11, fill: '#282B4A' }}
              stroke="#282B4A40"
            />
            <YAxis 
              type="category" 
              dataKey="feature" 
              tick={{ fontSize: 11, fill: '#282B4A' }} 
              width={130}
              stroke="#282B4A40"
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload as FeatureContribution;
                  return (
                    <div className="bg-indigo-midnight text-cream-vanilla p-3 rounded-xl shadow-xl text-xs max-w-xs border border-indigo-light/30">
                      <p className="font-bold text-amber-200">{data.feature}</p>
                      <p className="mt-1">
                        Impact Weight: <span className="font-mono font-semibold">{data.contribution > 0 ? `+${data.contribution}` : data.contribution}</span>
                      </p>
                      <p className="text-cream-vanilla/70 text-[11px] mt-1 italic">
                        {data.description}
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <ReferenceLine x={0} stroke="#282B4A" strokeWidth={1.5} />
            <Bar dataKey="contribution" radius={[4, 4, 4, 4]}>
              {sortedData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.contribution >= 0 ? '#DC2626' : '#2563EB'} 
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Detailed breakdown list */}
      <div className="pt-2 border-t border-indigo-midnight/10 space-y-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-midnight/60">
          Token Rationale Glossary
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          {sortedData.map((f, i) => (
            <div key={i} className="p-2.5 rounded-lg bg-cream-vanilla/50 border border-indigo-midnight/10 flex items-start gap-2">
              <span className={`w-2 h-2 rounded-full mt-1 shrink-0 ${f.contribution >= 0 ? 'bg-rose-600' : 'bg-blue-600'}`} />
              <div>
                <p className="font-semibold text-indigo-midnight">
                  {f.feature} <span className="font-mono text-[10px] text-indigo-midnight/70">({f.contribution > 0 ? `+${f.contribution}` : f.contribution})</span>
                </p>
                <p className="text-[11px] text-indigo-midnight/70 leading-snug mt-0.5">
                  {f.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
