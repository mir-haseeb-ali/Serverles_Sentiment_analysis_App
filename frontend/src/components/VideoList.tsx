import React from 'react';
import { Youtube, ExternalLink } from 'lucide-react';
import { VideoInfo } from '@/src/types';
import { motion } from 'motion/react';

interface VideoListProps {
  videos: VideoInfo[];
}

export const VideoList: React.FC<VideoListProps> = ({ videos }) => {
  return (
    <div className="glass rounded-xl p-5 h-full overflow-hidden flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <Youtube size={16} className="text-[var(--accent-red)]" />
        <h3 className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">Analyzed Sources</h3>
      </div>
      
      <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
        {videos.map((video, i) => (
          <motion.a
            key={video.videoId}
            href={`https://www.youtube.com/watch?v=${video.videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex items-center gap-3 p-2 bg-[var(--mauve-shadow)]/20 border border-[var(--border)] rounded-lg hover:bg-[var(--mauve-shadow)]/40 hover:border-[var(--accent-cyan)]/30 transition-all group"
          >
            <div className="min-w-12 h-8 bg-[var(--vintage-grape)]/30 rounded flex items-center justify-center border border-[var(--border)]/20 overflow-hidden relative">
              <img 
                src={`https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`} 
                alt={video.title}
                className="w-full h-full object-cover transition-all"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-[11px] font-bold text-[var(--text-main)] truncate group-hover:text-[var(--accent-cyan)] transition-colors">
                {video.title}
              </h4>
              <p className="text-[9px] text-[var(--text-muted)] truncate font-bold uppercase tracking-tighter opacity-80">{video.channel} • VERIFIED</p>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );
};
