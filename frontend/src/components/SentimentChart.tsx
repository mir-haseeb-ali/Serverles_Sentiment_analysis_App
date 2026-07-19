import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { DashboardData } from '@/src/types';
import { motion } from 'motion/react';

interface SentimentChartProps {
  data: DashboardData;
}

export const SentimentChart: React.FC<SentimentChartProps> = ({ data }) => {
  const chartData = [
    { name: 'Positive', value: data.sentiment_distribution.Positive, color: '#86bbbd' }, 
    { name: 'Neutral', value: data.sentiment_distribution.Neutral, color: '#6a6b83' }, 
    { name: 'Negative', value: data.sentiment_distribution.Negative, color: '#d66464' }, 
  ].filter(item => item.value > 0);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass p-5 rounded-xl h-[360px] flex flex-col"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">Sentiment Distribution</h3>
      </div>
      
      <div className="flex-1 w-full relative">
        <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
          <span className="text-2xl font-black text-[var(--text-main)]">{data.sentiment_distribution.Positive.toFixed(0)}%</span>
          <span className="text-[10px] font-bold text-[var(--accent-cyan)] uppercase">Positive</span>
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={95}
              paddingAngle={2}
              dataKey="value"
              animationDuration={1000}
              stroke="none"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ backgroundColor: '#1c1c24', border: '1px solid rgba(106, 107, 131, 0.4)', borderRadius: '8px' }}
              itemStyle={{ color: '#e2e8f0', fontSize: '11px' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        {chartData.map((item) => (
          <div key={item.name} className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase">{item.name}</span>
            </div>
            <span className="text-xs font-bold text-[var(--text-main)] ml-3">{item.value.toFixed(1)}%</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
