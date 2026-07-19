import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DashboardData } from '@/src/types';
import { motion } from 'motion/react';

interface AspectAnalysisProps {
  data: DashboardData;
}

export const AspectAnalysis: React.FC<AspectAnalysisProps> = ({ data }) => {
  const chartData = Object.entries(data.aspect_analysis).map(([aspect, values]) => {
    const v = values as any;
    return {
      name: aspect.charAt(0).toUpperCase() + aspect.slice(1),
      positive: v["Positive%"],
      neutral: v["Neutral%"],
      negative: v["Negative%"],
      mentions: v.mentions
    };
  });

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.1 }}
      className="glass p-5 rounded-xl h-[360px] flex flex-col"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">Feature Aspect Analysis</h3>
      </div>
      
      <div className="flex-1 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 0, right: 10, left: 10, bottom: 0 }}
          >
            <XAxis type="number" hide />
            <YAxis 
              dataKey="name" 
              type="category" 
              stroke="var(--text-muted)" 
              fontSize={11}
              width={75}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip 
              cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
              contentStyle={{ backgroundColor: '#1c1c24', border: '1px solid rgba(106, 107, 131, 0.4)', borderRadius: '8px' }}
              itemStyle={{ fontSize: '11px', color: '#e2e8f0' }}
            />
            <Bar dataKey="positive" name="Positive" fill="#86bbbd" stackId="a" barSize={10} radius={[2, 2, 2, 2]} />
            <Bar dataKey="neutral" name="Neutral" fill="#6a6b83" stackId="a" />
            <Bar dataKey="negative" name="Negative" fill="#d66464" stackId="a" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 flex gap-4">
        <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-cyan)]" /><span className="text-[10px] font-bold text-[var(--text-muted)] uppercase">POS</span></div>
        <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-[var(--text-muted)]" /><span className="text-[10px] font-bold text-[var(--text-muted)] uppercase">NEU</span></div>
        <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-red)]" /><span className="text-[10px] font-bold text-[var(--text-muted)] uppercase">NEG</span></div>
      </div>
    </motion.div>
  );
};
