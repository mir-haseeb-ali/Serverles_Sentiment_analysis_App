/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LineChart, 
  BarChart as BarChartIcon, 
  LayoutDashboard, 
  Settings, 
  Bell, 
  Github,
  AlertCircle,
  RefreshCw
} from 'lucide-react';

import { SearchBar } from './components/SearchBar';
import { SummaryCards } from './components/SummaryCards';
import logoUrl from './assets/images/sentiment_logo_1784449470656.jpg';
import { SentimentChart } from './components/SentimentChart';
import { AspectAnalysis } from './components/AspectAnalysis';
import { CommentsList } from './components/CommentsList';
import { VideoList } from './components/VideoList';
import { Keywords } from './components/Keywords';
import { DashboardSkeleton } from './components/DashboardSkeleton';
import { DashboardData } from './types';

// Mock data to show if API is not configured or fails
const MOCK_DATA: DashboardData = {
  product: "iPhone 15 Pro Max",
  rating: 4.85,
  confidence: "High",
  summary: "Exceptional feedback regarding the new titanium frame and camera system.",
  data_reliability: "Sufficient data for industry-grade analysis",
  total_analyzed: 1450,
  sentiment_distribution: {
    Positive: 82.5,
    Negative: 5.2,
    Neutral: 12.3
  },
  aspect_analysis: {
    "battery": { "Positive%": 85, "Negative%": 5, "Neutral%": 10, mentions: 450 },
    "camera": { "Positive%": 92, "Negative%": 2, "Neutral%": 6, mentions: 620 },
    "performance": { "Positive%": 95, "Negative%": 1, "Neutral%": 4, mentions: 380 },
    "price": { "Positive%": 45, "Negative%": 40, "Neutral%": 15, mentions: 210 }
  },
  trending_keywords: ["titanium", "optical zoom", "usb-c", "dynamic island"],
  top_comments: [
    "The camera zoom is absolutely life-changing for my concert videos.",
    "USB-C was long overdue but implementation is flawless.",
    "Battery life easily lasts me two full days of moderate use.",
    "Actually feels much lighter in the hand than the previous model."
  ],
  videos: [
    { videoId: "mXWlgk_H-N4", title: "iPhone 15 Pro Max: One Month Later!", channel: "Marques Brownlee" },
    { videoId: "XQZ77_Y_mO8", title: "Wait for iPhone 16? 15 Pro Max Review", channel: "Mrwhosetheboss" },
    { videoId: "k_OTo8k9yK4", title: "I used the iPhone 15 Pro Max for 100 Days", channel: "The Tech Chap" },
    { videoId: "77m6X7U_VGE", title: "iPhone 15 Pro Max: The Only Review You Need", channel: "iJustine" },
    { videoId: "L_XWlZ_Zl8o", title: "Long Term Review: iPhone 15 Pro Max", channel: "Unbox Therapy" }
  ],
  meta: {
    videos_scanned: 5,
    comments_collected: 1450
  }
};

export default function App() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [initialSate, setInitialState] = useState(true);

  const performSearch = async (query: string) => {
    setLoading(true);
    setError(null);
    setInitialState(false);

    try {
      // Route through local server proxy to avoid CORS and provide better reliability
      const response = await axios.get(`/api/analyze?query=${encodeURIComponent(query)}`);
      
      if (response.data) {
        setData(response.data);
      } else {
        throw new Error("No intelligence data received from the system.");
      }
    } catch (err: any) {
      console.error("Analysis Error Details:", err);
      const errorDetail = err.response?.data?.message || err.message || "Unknown Failure";
      setError(`Intel Collection Failed: ${errorDetail}`);
      
      // Fallback for demo if backend is entirely missing
      if (!import.meta.env.VITE_API_BASE_URL) {
        setTimeout(() => {
          setData({ ...MOCK_DATA, product: query });
          setError(null);
          setLoading(false);
        }, 1200);
        return;
      }
    } finally {
      setLoading(false);
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="h-screen w-screen bg-[var(--bg)] text-[var(--text-main)] flex overflow-hidden selection:bg-[var(--mauve-shadow)] selection:text-[var(--pearl-aqua)]">
      {/* Sidebar Rail - Fixed Position */}
      <aside className="w-12 h-screen bg-[var(--mauve-shadow)]/40 backdrop-blur-xl border-r border-[var(--border)] flex flex-col items-center py-4 gap-6 shrink-0 z-50">
        <div className="w-8 h-8 bg-[var(--vintage-grape)] rounded-lg overflow-hidden flex items-center justify-center shadow-lg shadow-[var(--vintage-grape)]/40" title="ReviewSense OS">
          <img 
            src={logoUrl} 
            alt="ReviewSense Logo" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <nav className="flex-1 flex flex-col gap-4">
          <button 
            onClick={() => scrollToSection('dashboard-home')}
            className="p-2 text-[var(--accent-cyan)] bg-[var(--accent-cyan)]/10 rounded hover:bg-[var(--accent-cyan)]/20 transition-all border border-[var(--accent-cyan)]/20"
            title="Dashboard Overview"
          >
            <LayoutDashboard size={18} />
          </button>
          <button 
            onClick={() => scrollToSection('analytics-charts')}
            className="p-2 text-[var(--text-muted)]/40 hover:text-[var(--text-main)] transition-colors"
            title="Analytics Charts"
          >
            <BarChartIcon size={18} />
          </button>
          <button 
            onClick={() => scrollToSection('trends-sources')}
            className="p-2 text-[var(--text-muted)]/40 hover:text-[var(--text-main)] transition-colors"
            title="Trends & Sources"
          >
            <LineChart size={18} />
          </button>
          <button 
            onClick={() => scrollToSection('intelligence-feed')}
            className="p-2 text-[var(--text-muted)]/40 hover:text-[var(--text-main)] transition-colors"
            title="User Feedback"
          >
            <Bell size={18} />
          </button>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto relative custom-scrollbar">
        {/* Header Navigation */}
        <header className="sticky top-0 z-50 bg-[var(--bg)]/80 backdrop-blur-xl border-b border-[var(--border)]/20 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src={logoUrl} 
              alt="ReviewSense Logo" 
              className="w-7 h-7 rounded-lg object-cover border border-[var(--border)]/40 shadow-md"
              referrerPolicy="no-referrer"
            />
            <h1 className="text-sm font-bold tracking-tight text-[var(--text-main)] uppercase" id="dashboard-home">
              ReviewSense
            </h1>
          </div>
          
          <SearchBar onSearch={performSearch} isLoading={loading} />

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-2 py-1 rounded bg-[var(--mauve-shadow)]/40 border border-[var(--border)]">
               <div className={`w-1.5 h-1.5 rounded-full ${loading ? 'bg-[var(--accent-red)] animate-pulse' : 'bg-[var(--accent-lime)]'}`} />
               <span className="text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-widest">{loading ? 'SYNCING' : 'SECURE'}</span>
            </div>
          </div>
        </header>

        <div className="compact-grid p-4">
          <AnimatePresence mode="wait">
            {initialSate ? (
              <motion.div
                key="initial"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="col-span-12 flex flex-col items-center justify-center h-[70vh] gap-6"
              >
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="p-5 bg-[var(--mauve-shadow)]/15 border border-[var(--border)] rounded-2xl shadow-2xl max-w-[200px] flex items-center justify-center aspect-square"
                >
                  <img 
                    src={logoUrl} 
                    alt="ReviewSense Platform Logo" 
                    className="w-full h-full rounded-xl object-contain shadow-lg"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
                <div className="text-center space-y-1.5 max-w-sm">
                  <h2 className="text-sm font-bold tracking-widest text-[var(--text-main)] uppercase">Serverless Sentiment Analysis</h2>
                  <p className="font-semibold text-[10px] tracking-widest text-[var(--text-muted)] uppercase">Select a product to initiate real-time signal intelligence</p>
                </div>
              </motion.div>
            ) : loading ? (
              <div className="col-span-12">
                <DashboardSkeleton key="loading" />
              </div>
            ) : error ? (
              <motion.div 
                key="error"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="col-span-12 flex flex-col items-center justify-center h-[70vh] glass rounded-xl p-10 gap-4"
              >
                <AlertCircle size={32} className="text-[var(--accent-red)]" />
                <h3 className="text-lg font-bold text-white uppercase tracking-tighter">Analysis Failure</h3>
                <p className="text-[var(--pearl-aqua)]/60 text-xs text-center max-w-sm uppercase">{error}</p>
                <button 
                  onClick={() => performSearch(data?.product || "iPhone 15 Pro Max")}
                  className="mt-4 px-4 py-2 bg-[var(--vintage-grape)] hover:bg-[var(--vintage-grape)]/80 text-[10px] font-bold text-[var(--pearl-aqua)] rounded transition-colors border border-[var(--accent-cyan)]/20 uppercase shadow-lg shadow-[var(--vintage-grape)]/20"
                >
                  Retry Analysis
                </button>
              </motion.div>
            ) : data && (
              <motion.div
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-12 compact-grid"
              >
                {/* Stats Row */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="col-span-12"
                >
                  <SummaryCards data={data} />
                </motion.div>

                {/* Charts Row */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="col-span-12 lg:col-span-4 translate-y-[-8px]" 
                  id="analytics-charts"
                >
                  <SentimentChart data={data} />
                </motion.div>
                <motion.div 
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   className="col-span-12 lg:col-span-5 translate-y-[-8px]"
                >
                  <AspectAnalysis data={data} />
                </motion.div>
                <div className="col-span-12 lg:col-span-3 space-y-4 translate-y-[-8px]" id="trends-sources">
                   <motion.div
                     initial={{ opacity: 0, x: 20 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     viewport={{ once: true }}
                   >
                     <Keywords keywords={data.trending_keywords} />
                   </motion.div>
                   <motion.div 
                     initial={{ opacity: 0, x: 20 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     viewport={{ once: true }}
                     className="h-[270px]"
                   >
                     <VideoList videos={data.videos} />
                   </motion.div>
                </div>

                {/* Intelligence Feed Section */}
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="col-span-12 space-y-4"
                  id="intelligence-feed"
                >
                  {/* Analysis Summary & Logistics Row */}
                  <div className="glass p-5 rounded-xl flex flex-col md:flex-row gap-8">
                    <div className="flex-1">
                      <h3 className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-4">Analysis Summary</h3>
                      <p className="text-xs text-[var(--text-muted)] leading-relaxed italic border-l-2 border-[var(--accent-cyan)] pl-4">
                        {data.summary}
                      </p>
                      <div className="mt-6 flex items-center gap-6 text-[9px] text-[var(--text-muted)]/60 font-mono font-bold uppercase tracking-tight">
                        <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-lime)]" /> CAPTURE_COMPLETE</span>
                        <span>SAMPLES: {data.meta.comments_collected}</span>
                        <span>CHANNELS: {data.meta.videos_scanned}</span>
                      </div>
                    </div>
                    
                    <div className="w-px bg-[var(--border)]/10 hidden md:block" />
                    
                    <div className="md:w-64 shrink-0">
                      <h3 className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-4">System Logistics</h3>
                      <div className="space-y-4">
                         <div className="space-y-2">
                           <div className="flex justify-between text-[10px]">
                              <span className="text-[var(--text-muted)]/50">ENGINE</span>
                              <span className="text-[var(--text-main)] font-mono">V5.0.0</span>
                           </div>
                           <div className="flex justify-between text-[10px]">
                              <span className="text-[var(--text-muted)]/50">RESOURCE</span>
                              <span className="text-[var(--text-main)] font-mono">LAMBDA_X5</span>
                           </div>
                         </div>
                         
                         <div className="pt-2 border-t border-[var(--border)]">
                            <div className="flex items-center justify-between mb-1.5">
                               <span className="text-[8px] text-[var(--text-muted)]/60 font-bold uppercase tracking-widest">Signal</span>
                               <span className="text-[8px] text-[var(--accent-cyan)] font-mono">ACTIVE</span>
                            </div>
                            <div className="w-full h-1 bg-[var(--blue-slate)]/20 rounded-full overflow-hidden">
                               <motion.div 
                                 initial={{ x: "-100%" }}
                                 animate={{ x: "100%" }}
                                 transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                                 className="w-1/3 h-full bg-gradient-to-r from-transparent via-[var(--accent-cyan)] to-transparent"
                               />
                            </div>
                         </div>
                      </div>
                    </div>
                  </div>

                  {/* Comments Stacked Below */}
                  <div className="h-[400px]">
                    <CommentsList comments={data.top_comments} />
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Area */}
        <footer className="mt-20 border-t border-[var(--border)]/20 py-10 px-8 text-center sm:text-left flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[var(--text-muted)]/50 uppercase tracking-widest font-mono">
           <p>© 2026 PRODUCT INTELLIGENCE SYSTEMS</p>
           <div className="flex gap-8">
             <a href="#" className="hover:text-[var(--accent-cyan)] transition-colors">Privacy</a>
             <a href="#" className="hover:text-[var(--accent-cyan)] transition-colors">Terms</a>
             <a href="#" className="hover:text-[var(--accent-cyan)] transition-colors">API Docs</a>
           </div>
        </footer>
      </main>
    </div>
  );
}
