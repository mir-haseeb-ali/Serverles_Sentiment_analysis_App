import React, { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="relative w-full max-w-xl mx-auto"
    >
      <div className="relative flex items-center">
        <div className="absolute left-3 text-[var(--text-muted)]/50">
          <Search size={18} />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Analyze product sentiment..."
          disabled={isLoading}
          className={cn(
            "w-full pl-10 pr-24 py-2 bg-[var(--mauve-shadow)]/20 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-1 focus:ring-[var(--accent-cyan)]/40 transition-all text-sm h-10 text-[var(--text-main)] placeholder:text-[var(--text-muted)]/40",
            isLoading && "opacity-50 cursor-not-allowed"
          )}
        />
        <button
          type="submit"
          disabled={isLoading || !query.trim()}
          className="absolute right-1 px-3 py-1 bg-[var(--vintage-grape)] hover:bg-[var(--vintage-grape)]/80 text-[var(--pearl-aqua)] font-bold text-[10px] rounded focus:outline-none transition-all disabled:opacity-50 h-8 shadow-md shadow-[var(--vintage-grape)]/20"
        >
          {isLoading ? <Loader2 className="animate-spin" size={12} /> : null}
          {isLoading ? 'ANALYZING...' : 'ANALYZE'}
        </button>
      </div>
    </form>
  );
};
