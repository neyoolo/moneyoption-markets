import { MarketNewsItem } from '../types/market';
import { MOCK_MARKET_NEWS } from '../data/mockData';

export interface NewsFilterParams {
  category?: string;
  ticker?: string;
  impact?: string;
  search?: string;
}

// Simulated API latency and live news feed cache
let newsCache: MarketNewsItem[] = [...MOCK_MARKET_NEWS];

export async function fetchMarketNewsApi(params?: NewsFilterParams): Promise<{
  articles: MarketNewsItem[];
  timestamp: string;
  total: number;
}> {
  // Simulate network delay of 350-550ms
  const latency = 350 + Math.floor(Math.random() * 200);
  await new Promise((resolve) => setTimeout(resolve, latency));

  let filtered = [...newsCache];

  if (params?.category && params.category !== 'All') {
    filtered = filtered.filter(
      (item) => item.category.toLowerCase() === params.category?.toLowerCase()
    );
  }

  if (params?.ticker && params.ticker !== 'All') {
    filtered = filtered.filter((item) =>
      item.tickerSymbols.some(
        (t) => t.toLowerCase() === params.ticker?.toLowerCase() || params.ticker?.toLowerCase().includes(t.toLowerCase())
      )
    );
  }

  if (params?.impact && params.impact !== 'All') {
    filtered = filtered.filter(
      (item) => item.impact.toLowerCase() === params.impact?.toLowerCase()
    );
  }

  if (params?.search && params.search.trim() !== '') {
    const q = params.search.toLowerCase();
    filtered = filtered.filter(
      (item) =>
        item.headline.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q) ||
        item.tickerSymbols.some((sym) => sym.toLowerCase().includes(q))
    );
  }

  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  return {
    articles: filtered,
    timestamp: timeStr,
    total: filtered.length,
  };
}

export function injectBreakingNewsItem(item: MarketNewsItem) {
  newsCache = [item, ...newsCache];
}
