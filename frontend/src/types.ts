export interface SentimentDistribution {
  Positive: number;
  Negative: number;
  Neutral: number;
}

export interface AspectData {
  "Positive%": number;
  "Negative%": number;
  "Neutral%": number;
  mentions: number;
}

export interface AspectAnalysis {
  [key: string]: AspectData;
}

export interface VideoInfo {
  videoId: string;
  title: string;
  channel: string;
}

export interface DashboardData {
  product: string;
  rating: number;
  confidence: string;
  summary: string;
  data_reliability: string;
  total_analyzed: number;
  sentiment_distribution: SentimentDistribution;
  aspect_analysis: AspectAnalysis;
  trending_keywords: string[];
  top_comments: string[];
  videos: VideoInfo[];
  meta: {
    videos_scanned: number;
    comments_collected: number;
  };
}
