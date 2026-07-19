import React from 'react';
import { Star, ShieldCheck, MessageSquare, Database } from 'lucide-react';
import { DashboardData } from '@/src/types';
import { motion } from 'motion/react';

interface SummaryCardsProps {
  data: DashboardData;
}

export const SummaryCards: React.FC<SummaryCardsProps> = ({ data }) => {
  const cards = [
    {
      label: 'Product',
      value: <span className="text-sm font-bold truncate pr-1">{data.product}</span>,
      icon: null,
      color: "border-[var(--border)]"
    },
    {
      label: 'Rating Score',
      value: (
        <div className="flex items-center gap-1.5">
          <span className="text-xl font-bold">{data.rating}</span>
          <div className="flex text-[var(--accent-yellow)] translate-y-[-1px]">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-[10px]">
                {i < Math.floor(data.rating) ? "★" : "☆"}
              </span>
            ))}
          </div>
        </div>
      ),
      icon: null,
      color: "border-[var(--border)]"
    },
    {
      label: 'Confidence Level',
      value: (
        <div className="flex items-center gap-2">
          <span className="bg-[var(--accent-yellow)]/20 text-[var(--accent-yellow)] text-[10px] px-1.5 py-0.5 rounded font-bold uppercase border border-[var(--accent-yellow)]/30">
            {data.confidence}
          </span>
          <span className="text-[10px] text-[var(--text-muted)] truncate">Reliability: High</span>
        </div>
      ),
      icon: null,
      color: "border-[var(--border)]"
    },
    {
      label: 'Data Integrity',
      value: (
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold">{data.total_analyzed.toLocaleString()}</span>
          <span className="text-[10px] text-[var(--accent-lime)] font-bold tracking-tight">ACTIVE</span>
        </div>
      ),
      icon: null,
      color: "border-[var(--border)]"
    },
    {
      label: 'Videos Analyzed',
      value: (
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold">{data.meta.videos_scanned}</span>
          <span className="text-[10px] text-[var(--pearl-aqua)] font-bold tracking-tight uppercase">Signals</span>
        </div>
      ),
      icon: null,
      color: "border-[var(--border)]"
    }
  ];

  return (
    <div className="grid grid-cols-5 gap-4">
      {cards.map((card, idx) => (
        <motion.div
          key={card.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.05 }}
          className={`glass p-3 rounded-xl border flex flex-col gap-1 h-20 justify-center`}
        >
          <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">{card.label}</span>
          <div className="flex items-center h-8">
            {card.value}
          </div>
        </motion.div>
      ))}
    </div>
  );
};
