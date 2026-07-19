import React from 'react';
import { TrendingUp } from 'lucide-react';

interface KeywordsProps {
  keywords: string[];
}

export const Keywords: React.FC<KeywordsProps> = ({ keywords }) => {
  return (
    <div className="glass p-4 rounded-xl">
      <div className="flex items-center gap-2 mb-3">
        <TrendingUp size={14} className="text-[var(--accent-cyan)]" />
        <h3 className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">Top Trending Signal</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {keywords.map((kw, i) => (
          <span 
            key={i} 
            className="px-2.5 py-1 bg-[var(--vintage-grape)]/30 text-[var(--accent-cyan)] text-[10px] font-bold rounded-lg border border-[var(--border)] hover:bg-[var(--vintage-grape)]/50 transition-all cursor-default uppercase tracking-tight shadow-sm"
          >
            {kw}
          </span>
        ))}
      </div>
    </div>
  );
};
