export interface MarketTicker {
  symbol: string;
  name: string;
  category: 'options' | 'forex' | 'indices' | 'crypto';
  price: number;
  change: number;
  changePercent: number;
  volume24h: string;
  high24h: number;
  low24h: number;
  impliedVol: number;
  strikePrices?: number[];
}

export interface MetricCardData {
  title: string;
  value: string;
  change: string;
  positive: boolean;
  subtext: string;
  chartData: { time: string; value: number }[];
}

export interface OrderFill {
  id: string;
  time: string;
  symbol: string;
  type: 'CALL' | 'PUT';
  strike: number;
  price: number;
  contracts: number;
  executionMs: number;
}

export interface TradingStrategy {
  id: string;
  name: string;
  sentiment: 'Bullish' | 'Bearish' | 'Neutral' | 'Volatile';
  description: string;
  riskReward: string;
  maxProfit: string;
  maxLoss: string;
  winProbability: number;
  strikes: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface PriceAlert {
  id: string;
  symbol: string;
  targetPrice: number;
  condition: 'above' | 'below';
  createdPrice: number;
  createdAt: string;
  triggered: boolean;
  triggeredAt?: string;
  notified?: boolean;
}

export interface MarketNewsItem {
  id: string;
  headline: string;
  summary: string;
  content?: string;
  category: 'Forex' | 'Indices' | 'Commodities' | 'Crypto' | 'Macro';
  tickerSymbols: string[];
  impact: 'HIGH' | 'MEDIUM' | 'LOW';
  sentiment: 'BULLISH' | 'BEARISH' | 'NEUTRAL';
  source: string;
  publishedAt: string; // e.g. "4m ago"
  readTime: string;
  imageUrl?: string;
}

