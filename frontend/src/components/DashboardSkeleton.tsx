import React from 'react';

export const DashboardSkeleton = () => {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Summary Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-20 bg-[var(--mauve-shadow)]/20 rounded-xl border border-[var(--border)]" />
        ))}
      </div>

      {/* Charts Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 h-[360px] bg-[var(--mauve-shadow)]/20 rounded-xl border border-[var(--border)]" />
        <div className="lg:col-span-1 h-[360px] bg-[var(--mauve-shadow)]/20 rounded-xl border border-[var(--border)]" />
        <div className="lg:col-span-1 h-[360px] bg-[var(--mauve-shadow)]/20 rounded-xl border border-[var(--border)]" />
      </div>

      {/* Bottom section Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 h-[400px] bg-[var(--azure-mist)]/50 rounded-2xl border border-[var(--border)]/10" />
        <div className="h-[400px] bg-[var(--azure-mist)]/50 rounded-2xl border border-[var(--border)]/10" />
      </div>
    </div>
  );
};
