import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import { GLOBAL_FEATURE_IMPORTANCE } from '../../data/complaintsData';

export const GlobalImportanceChart: React.FC = () => {
  return (
    <div className="bg-cream-card rounded-2xl border border-indigo-midnight/15 p-5 sm:p-6 shadow-soft space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="font-editorial text-base sm:text-lg font-bold text-indigo-midnight">
            Global Feature Importance (Corpus Level)
          </h3>
          <p className="text-xs text-indigo-midnight/70 mt-0.5">
            Statistical weight of recurring n-grams across 10,000+ benchmark municipal complaints.
          </p>
        </div>
        <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-indigo-midnight/10 text-indigo-midnight">
          Model Aggregates
        </span>
      </div>

      <div className="h-72 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={GLOBAL_FEATURE_IMPORTANCE}
            margin={{ top: 5, right: 30, left: 60, bottom: 5 }}
          >
            <XAxis 
              type="number" 
              domain={[-0.7, 1.0]} 
              tick={{ fontSize: 11, fill: '#282B4A' }}
              stroke="#282B4A40"
            />
            <YAxis 
              type="category" 
              dataKey="feature" 
              tick={{ fontSize: 11, fill: '#282B4A' }} 
              width={160}
              stroke="#282B4A40"
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload as typeof GLOBAL_FEATURE_IMPORTANCE[0];
                  return (
                    <div className="bg-indigo-midnight text-cream-vanilla p-3 rounded-xl shadow-xl text-xs max-w-xs border border-indigo-light/30">
                      <p className="font-bold text-amber-200">{data.feature}</p>
                      <p className="text-cream-vanilla/70 text-[11px] mt-0.5">Category: {data.category}</p>
                      <p className="mt-1 font-mono">
                        Global Importance: <span className="font-bold">{data.importance}</span>
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="importance" radius={[4, 4, 4, 4]}>
              {GLOBAL_FEATURE_IMPORTANCE.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.importance >= 0 ? '#381932' : '#3A3E66'} 
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="text-[11px] text-indigo-midnight/60 italic pt-1">
        * In a production ML pipeline, these coefficients represent average absolute SHAP values across evaluation test folds.
      </p>
    </div>
  );
};
