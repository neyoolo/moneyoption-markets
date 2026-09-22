import React, { useState, useEffect, useTransition } from 'react';
import {
  Newspaper,
  TrendingUp,
  TrendingDown,
  Minus,
  RefreshCw,
  Search,
  ExternalLink,
  Clock,
  Flame,
  Filter,
  CheckCircle2,
  ChevronRight,
  BookOpen,
  X,
  Share2,
  Bell,
  Sparkles,
} from 'lucide-react';
import { MarketNewsItem, MarketTicker } from '../types/market';
import { fetchMarketNewsApi } from '../services/newsService';

interface MarketNewsProps {
  tickers?: MarketTicker[];
  initialTickerFilter?: string;
  onSelectTicker?: (symbol: string) => void;
  onOpenAlertModal?: (symbol?: string) => void;
  compact?: boolean; // For dashboard widget view vs full tab view
  onViewAllNews?: () => void;
}

export const MarketNews: React.FC<MarketNewsProps> = ({
  tickers = [],
  initialTickerFilter,
  onSelectTicker,
  onOpenAlertModal,
  compact = false,
  onViewAllNews,
}) => {
  const [articles, setArticles] = useState<MarketNewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedTicker, setSelectedTicker] = useState<string>(initialTickerFilter || 'All');
  const [selectedImpact, setSelectedImpact] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [lastFetched, setLastFetched] = useState<string>('');
  const [apiLatency, setApiLatency] = useState<number>(420);
  const [activeArticleModal, setActiveArticleModal] = useState<MarketNewsItem | null>(null);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  const categories = ['All', 'Indices', 'Forex', 'Commodities', 'Crypto', 'Macro'];
  const impacts = ['All', 'HIGH', 'MEDIUM', 'LOW'];

  const loadNews = async (cat = selectedCategory, tick = selectedTicker, imp = selectedImpact, query = searchQuery) => {
    setLoading(true);
    const startTime = performance.now();
    try {
      const res = await fetchMarketNewsApi({
        category: cat,
        ticker: tick,
        impact: imp,
        search: query,
      });
      setArticles(res.articles);
      setLastFetched(res.timestamp);
      setApiLatency(Math.round(performance.now() - startTime));
    } catch (err) {
      console.error('Error fetching market news:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNews(selectedCategory, selectedTicker, selectedImpact, searchQuery);
  }, [selectedCategory, selectedTicker, selectedImpact]);

  // Handle search debounce
  useEffect(() => {
    const handler = setTimeout(() => {
      loadNews(selectedCategory, selectedTicker, selectedImpact, searchQuery);
    }, 280);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  const handleCopyLink = () => {
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const getSentimentBadge = (sentiment: MarketNewsItem['sentiment']) => {
    switch (sentiment) {
      case 'BULLISH':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold bg-[#E6F9F3] text-[#008f65] border border-[#00C48C]/30">
            <TrendingUp className="w-3 h-3 text-[#00C48C]" />
            Bullish
          </span>
        );
      case 'BEARISH':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold bg-[#FFF1F2] text-[#E11D48] border border-[#E11D48]/30">
            <TrendingDown className="w-3 h-3 text-[#E11D48]" />
            Bearish
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
            <Minus className="w-3 h-3 text-slate-500" />
            Neutral
          </span>
        );
    }
  };

  const getImpactBadge = (impact: MarketNewsItem['impact']) => {
    switch (impact) {
      case 'HIGH':
        return (
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-extrabold uppercase bg-red-500 text-white tracking-wider shadow-xs">
            <Flame className="w-2.5 h-2.5 fill-white" />
            High Impact
          </span>
        );
      case 'MEDIUM':
        return (
          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-extrabold uppercase bg-amber-500 text-white tracking-wider">
            Med Impact
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase bg-slate-200 text-slate-700 tracking-wider">
            Low
          </span>
        );
    }
  };

  return (
    <div
      id="market-news-container"
      className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col transition-all"
    >
      {/* FBS Styled Header */}
      <div className="p-3 sm:p-5 border-b border-slate-100 bg-gradient-to-r from-[#fafcff] via-white to-[#f5f8ff] flex flex-wrap items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#0053d4]/10 border border-[#0053d4]/20 flex items-center justify-center text-[#0053d4] shadow-xs">
            <Newspaper className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-[#0b1b38] flex flex-wrap items-center gap-1.5">
                FBS Market Intelligence
              </h2>
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#E6F9F3] text-[#008f65] border border-[#00C48C]/30">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00C48C] animate-ping" />
                LIVE WIRE
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Institutional headline coverage & derivatives analysis for active tickers
            </p>
          </div>
        </div>

        {/* Refresh button and feed latency indicator */}
        <div className="flex items-center gap-2.5">
          {lastFetched && (
            <div className="hidden sm:flex flex-col items-end text-[11px] text-slate-600">
              <span className="font-mono">Updated: {lastFetched}</span>
              <span className="text-[10px] text-slate-600 font-mono">
                API latency: <strong className="text-[#008f65] font-semibold">{apiLatency}ms</strong>
              </span>
            </div>
          )}

          <button
            onClick={() => loadNews()}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 hover:text-[#0053d4] bg-slate-100 hover:bg-[#EEF4FF] border border-slate-200 hover:border-[#b3c5ff] transition-all cursor-pointer disabled:opacity-50"
            title="Fetch latest market headlines"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-[#0053d4]' : ''}`} />
            <span>{loading ? 'Refreshing...' : 'Refresh'}</span>
          </button>

          {compact && onViewAllNews && (
            <button
              onClick={onViewAllNews}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold text-[#0053d4] bg-[#EEF4FF] hover:bg-[#dce7ff] transition-all cursor-pointer"
            >
              <span>Full Feed</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Control Bar: Categories, Active Tickers & Search */}
      <div className="p-3 sm:p-4 bg-[#fafbfe] border-b border-slate-100 flex flex-col gap-3">
        {/* Category Pills & Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
          {/* Categories */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#0053d4] text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:text-[#0b1b38] border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" />
            <input
              type="text"
              placeholder="Search ticker, Fed, gold, CPI..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-7 py-1.5 text-xs bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#0053d4]/30 focus:border-[#0053d4] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Active Ticker Selectors */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar text-xs">
          <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider whitespace-nowrap flex items-center gap-1">
            <Filter className="w-3 h-3 text-[#0053d4]" /> Ticker:
          </span>
          <button
            onClick={() => setSelectedTicker('All')}
            className={`px-2.5 py-0.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedTicker === 'All'
                ? 'bg-slate-900 text-white'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            All Tickers
          </button>
          {tickers.map((t) => {
            const isSelected = selectedTicker === t.symbol;
            return (
              <button
                key={t.symbol}
                onClick={() => setSelectedTicker(isSelected ? 'All' : t.symbol)}
                className={`px-2.5 py-0.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#0053d4] text-white'
                    : 'bg-white text-slate-700 border border-slate-200 hover:border-[#0053d4]/40 hover:bg-[#f5f8ff]'
                }`}
              >
                <span>{t.symbol}</span>
                <span
                  className={`text-[10px] font-mono ${
                    isSelected ? 'text-blue-100' : t.changePercent >= 0 ? 'text-[#008f65]' : 'text-[#E11D48]'
                  }`}
                >
                  {t.changePercent >= 0 ? '+' : ''}
                  {t.changePercent.toFixed(1)}%
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content Feed */}
      <div className="p-4 sm:p-5">
        {loading ? (
          // Skeleton loading cards
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 animate-pulse flex flex-col gap-3"
              >
                <div className="flex justify-between items-center">
                  <div className="w-20 h-4 bg-slate-200 rounded" />
                  <div className="w-16 h-4 bg-slate-200 rounded" />
                </div>
                <div className="w-3/4 h-5 bg-slate-200 rounded" />
                <div className="w-full h-12 bg-slate-200 rounded" />
                <div className="w-1/2 h-3 bg-slate-200 rounded mt-2" />
              </div>
            ))}
          </div>
        ) : articles.length === 0 ? (
          // Empty State
          <div className="py-12 text-center flex flex-col items-center justify-center">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
              <Newspaper className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-slate-800">No Headlines Found</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm">
              No recent wire items match your search for "{searchQuery}" or selected category filters.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedTicker('All');
                setSelectedImpact('All');
                setSearchQuery('');
              }}
              className="mt-3 px-3.5 py-1.5 text-xs font-semibold text-[#0053d4] bg-[#EEF4FF] hover:bg-[#dce7ff] rounded-xl transition-all cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          // News Articles Grid
          <div
            className={`grid grid-cols-1 ${
              compact ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3'
            } gap-4`}
          >
            {articles.slice(0, compact ? 4 : articles.length).map((item) => (
              <article
                key={item.id}
                onClick={() => setActiveArticleModal(item)}
                className="group relative bg-white rounded-xl border border-slate-200 hover:border-[#0053d4]/40 hover:shadow-md transition-all duration-200 p-4 flex flex-col justify-between cursor-pointer"
              >
                {/* Top meta: Impact, Sentiment & Time */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {getImpactBadge(item.impact)}
                      {getSentimentBadge(item.sentiment)}
                    </div>
                    <span className="flex items-center gap-1 text-[11px] text-slate-600 font-mono">
                      <Clock className="w-3 h-3" />
                      {item.publishedAt}
                    </span>
                  </div>

                  {/* Headline */}
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#0053d4] transition-colors line-clamp-2 leading-snug">
                    {item.headline}
                  </h3>

                  {/* Summary */}
                  <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                    {item.summary}
                  </p>
                </div>

                {/* Footer Meta & Actions */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  {/* Ticker Badges */}
                  <div className="flex items-center gap-1 flex-wrap">
                    {item.tickerSymbols.map((sym) => (
                      <span
                        key={sym}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTicker(sym);
                          if (onSelectTicker) onSelectTicker(sym);
                        }}
                        className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-100 hover:bg-[#EEF4FF] hover:text-[#0053d4] text-slate-700 transition-colors"
                        title={`Filter news by ${sym}`}
                      >
                        #{sym}
                      </span>
                    ))}
                    <span className="text-[11px] text-slate-600 font-medium ml-1">
                      {item.source}
                    </span>
                  </div>

                  {/* Alert quick trigger */}
                  {onOpenAlertModal && item.tickerSymbols[0] && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenAlertModal(item.tickerSymbols[0]);
                      }}
                      className="p-1 rounded-md text-slate-600 hover:text-[#0053d4] hover:bg-slate-100 transition-all cursor-pointer"
                      title={`Set alert for ${item.tickerSymbols[0]}`}
                    >
                      <Bell className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Article Detail Reading Modal */}
      {activeArticleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-100 flex items-start justify-between gap-4 bg-gradient-to-r from-slate-50 to-white">
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  {getImpactBadge(activeArticleModal.impact)}
                  {getSentimentBadge(activeArticleModal.sentiment)}
                  <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-[#EEF4FF] text-[#0053d4]">
                    {activeArticleModal.category}
                  </span>
                  <span className="text-xs text-slate-600 flex items-center gap-1 font-mono">
                    <Clock className="w-3 h-3" /> {activeArticleModal.publishedAt} • {activeArticleModal.readTime}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-1 leading-snug">
                  {activeArticleModal.headline}
                </h3>
              </div>
              <button
                onClick={() => setActiveArticleModal(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors flex-shrink-0 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-slate-700 text-sm leading-relaxed">
              {/* Executive Summary Box */}
              <div className="p-3.5 rounded-xl bg-[#f0f5ff] border border-[#d6e4ff] text-slate-800">
                <p className="text-xs font-bold uppercase tracking-wider text-[#0053d4] mb-1">
                  Executive Desk Briefing:
                </p>
                <p className="text-xs sm:text-sm font-medium leading-relaxed">
                  {activeArticleModal.summary}
                </p>
              </div>

              {/* Full Article Content */}
              <div className="text-xs sm:text-sm space-y-3 text-slate-700 leading-relaxed font-normal">
                <p>{activeArticleModal.content}</p>
                <p>
                  Options liquidity providers and clearing houses advise monitoring open interest changes into the afternoon settlement. Order book depth shows concentrated algorithmic limit orders around psychological levels.
                </p>
              </div>

              {/* Related Ticker Direct Triggers */}
              <div className="pt-3 border-t border-slate-100">
                <p className="text-xs font-bold text-slate-500 mb-2">Affected Market Assets:</p>
                <div className="flex flex-wrap gap-2">
                  {activeArticleModal.tickerSymbols.map((sym) => {
                    const matchedTicker = tickers.find((t) => t.symbol === sym);
                    return (
                      <div
                        key={sym}
                        className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3 min-w-[150px]"
                      >
                        <div>
                          <span className="font-mono font-bold text-xs text-slate-900 block">{sym}</span>
                          {matchedTicker && (
                            <span
                              className={`text-[11px] font-mono ${
                                matchedTicker.changePercent >= 0 ? 'text-[#008f65]' : 'text-[#E11D48]'
                              }`}
                            >
                              ${matchedTicker.price.toFixed(matchedTicker.category === 'forex' ? 4 : 2)} (
                              {matchedTicker.changePercent >= 0 ? '+' : ''}
                              {matchedTicker.changePercent.toFixed(1)}%)
                            </span>
                          )}
                        </div>
                        {onOpenAlertModal && (
                          <button
                            onClick={() => {
                              setActiveArticleModal(null);
                              onOpenAlertModal(sym);
                            }}
                            className="px-2 py-1 rounded-lg text-[11px] font-semibold bg-[#EEF4FF] text-[#0053d4] hover:bg-[#dce7ff] flex items-center gap-1 cursor-pointer"
                          >
                            <Bell className="w-3 h-3" />
                            Alert
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3 text-xs">
              <span className="text-slate-600 font-medium">Source: {activeArticleModal.source}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyLink}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  {copiedLink ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#008f65]" />
                      <span>Link Copied</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5" />
                      <span>Share</span>
                    </>
                  )}
                </button>
                <button
                  onClick={() => setActiveArticleModal(null)}
                  className="px-4 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold transition-all cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
