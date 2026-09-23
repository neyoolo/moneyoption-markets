import { MarketNewsItem } from '../types/market';
import { MOCK_MARKET_NEWS } from '../data/mockData';

export interface NewsFilterParams {
  category?: string;
  ticker?: string;
  impact?: string;
  search?: string;
}

const GOOGLE_NEWS_RSS = 'https://news.google.com/rss/search';

// Keep the last successful feed available while a new request is loading.
let newsCache: MarketNewsItem[] = [...MOCK_MARKET_NEWS];

const CATEGORY_QUERIES: Record<string, string> = {
  All: 'financial markets stocks forex commodities crypto economy',
  Indices: 'stock market index futures S&P Nasdaq Dow Jones',
  Forex: 'forex currency exchange rates EUR USD GBP JPY',
  Commodities: 'gold oil commodities futures',
  Crypto: 'cryptocurrency bitcoin ethereum crypto market',
  Macro: 'Federal Reserve inflation interest rates economic data',
};

function cleanText(value: string | undefined): string {
  return (value || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

function relativeTime(dateValue: string): string {
  const ageMinutes = Math.max(0, Math.floor((Date.now() - new Date(dateValue).getTime()) / 60000));
  if (ageMinutes < 1) return 'Just now';
  if (ageMinutes < 60) return `${ageMinutes}m ago`;
  const ageHours = Math.floor(ageMinutes / 60);
  if (ageHours < 24) return `${ageHours}h ago`;
  return `${Math.floor(ageHours / 24)}d ago`;
}

function inferSentiment(text: string): MarketNewsItem['sentiment'] {
  if (/rally|rise|surge|gain|bull|higher|growth|beat|optimis/i.test(text)) return 'BULLISH';
  if (/fall|drop|slump|bear|lower|loss|recession|cut|risk|sell/i.test(text)) return 'BEARISH';
  return 'NEUTRAL';
}

function inferCategory(text: string): MarketNewsItem['category'] {
  if (/bitcoin|ethereum|crypto|blockchain/i.test(text)) return 'Crypto';
  if (/forex|currency|dollar|euro|yen|sterling|pound/i.test(text)) return 'Forex';
  if (/gold|oil|copper|commodity|natural gas|silver/i.test(text)) return 'Commodities';
  if (/fed|inflation|rate|economy|jobs|gdp|central bank|pce|cpi/i.test(text)) return 'Macro';
  return 'Indices';
}

function inferTickers(text: string): string[] {
  const knownTickers = ['SPX', 'SPY', 'NDX', 'QQQ', 'DXY', 'EUR/USD', 'GBP/USD', 'USD/JPY', 'XAU/USD', 'BTC/USD', 'ETH/USD'];
  return knownTickers.filter((ticker) => text.toUpperCase().includes(ticker.replace('/', '')) || text.toUpperCase().includes(ticker));
}

function parseLiveFeed(xml: string): MarketNewsItem[] {
  const document = new DOMParser().parseFromString(xml, 'text/xml');
  if (document.querySelector('parsererror')) throw new Error('Invalid news feed response');

  return Array.from(document.querySelectorAll('item')).slice(0, 30).map((item, index) => {
    const headline = cleanText(item.querySelector('title')?.textContent) || 'Market update';
    const description = cleanText(item.querySelector('description')?.textContent);
    const published = item.querySelector('pubDate')?.textContent || new Date().toISOString();
    const source = cleanText(item.querySelector('source')?.textContent) || 'Google News';
    const combinedText = `${headline} ${description}`;
    const category = inferCategory(combinedText);
    const sentiment = inferSentiment(combinedText);

    return {
      id: `live-${published}-${index}`,
      headline,
      summary: description || 'Live market coverage from the financial news wire.',
      content: description,
      category,
      tickerSymbols: inferTickers(combinedText),
      impact: /fed|rate|inflation|jobs|earnings|war|oil/i.test(combinedText) ? 'HIGH' : sentiment === 'NEUTRAL' ? 'LOW' : 'MEDIUM',
      sentiment,
      source,
      publishedAt: relativeTime(published),
      readTime: '3 min read',
    };
  });
}

async function fetchLiveNews(category = 'All', ticker = 'All', search = ''): Promise<MarketNewsItem[]> {
  const query = [
    CATEGORY_QUERIES[category] || CATEGORY_QUERIES.All,
    ticker !== 'All' ? ticker : '',
    search.trim(),
  ].filter(Boolean).join(' ');
  const url = `${GOOGLE_NEWS_RSS}?q=${encodeURIComponent(query)}&hl=en-US&gl=US&ceid=US:en`;
  const response = await fetch(url, { headers: { Accept: 'application/rss+xml, application/xml, text/xml' } });
  if (!response.ok) throw new Error(`News feed returned ${response.status}`);
  return parseLiveFeed(await response.text());
}

export async function fetchMarketNewsApi(params?: NewsFilterParams): Promise<{
  articles: MarketNewsItem[];
  timestamp: string;
  total: number;
}> {
  try {
    const liveArticles = await fetchLiveNews(params?.category, params?.ticker, params?.search);
    if (liveArticles.length > 0) newsCache = liveArticles;
  } catch (error) {
    console.warn('Live market news unavailable; using cached feed.', error);
  }

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
