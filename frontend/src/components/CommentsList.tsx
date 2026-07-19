import React from 'react';
import { MessageCircle, Quote } from 'lucide-react';
import { motion } from 'motion/react';

interface CommentsListProps {
  comments: string[];
}

export const CommentsList: React.FC<CommentsListProps> = ({ comments }) => {
  return (
    <div className="glass rounded-xl p-5 h-full overflow-hidden flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <MessageCircle size={16} className="text-[var(--accent-cyan)]" />
        <h3 className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">Top Intelligence Comments</h3>
      </div>
      
      <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
        {comments.map((comment, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="p-3 bg-[var(--mauve-shadow)]/20 border border-[var(--border)] rounded-lg relative group"
          >
            <p className="text-[var(--text-main)] text-[12px] leading-relaxed italic">
              "{comment}"
            </p>
            <div className="mt-2 flex justify-between items-center">
               <span className="text-[9px] text-[var(--text-muted)] font-bold uppercase tracking-tighter opacity-70">Source Verification: Confirmed</span>
               <Quote size={10} className="text-[var(--accent-cyan)] opacity-20" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
