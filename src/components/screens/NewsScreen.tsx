import React, { useState } from 'react';
import {
  Newspaper,
  TrendingUp,
  Globe2,
  Zap,
  Calendar,
  Sparkles,
  PhoneCall,
  Activity,
  ArrowRight,
  ShieldCheck,
  Radio,
} from 'lucide-react';
import { MarketNews } from '../MarketNews';
import { MarketTicker, OrderFill } from '../../types/market';

interface NewsScreenProps {
  tickers: MarketTicker[];
  onExecuteTrade?: (fill: Omit<OrderFill, 'id' | 'time'>) => void;
  onOpenCallDesk?: () => void;
  onOpenAlertModal?: (symbol?: string) => void;
}

export const NewsScreen: React.FC<NewsScreenProps> = ({
  tickers,
  onExecuteTrade,
  onOpenCallDesk,
  onOpenAlertModal,
}) => {
  const [selectedTickerFilter, setSelectedTickerFilter] = useState<string>('All');

  return (
    <div id="news-screen-container" className="w-full max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-16 space-y-6 animate-in fade-in duration-300">
      {/* Hero Header & Live Financial Intelligence Banner */}
      <div className="bg-gradient-to-br from-[#0053d4] via-[#0047b8] to-[#0b1b38] rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-lg border border-blue-400/20">
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-blue-100">
              <Radio className="w-3.5 h-3.5 text-[#00C48C] animate-pulse" />
              <span>FBS Real-Time Financial Wire & Analysis</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Global Market News & Options Flow
            </h1>
            <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed">
              Actionable headlines, central bank rate probabilities, and technical breakout levels curated for your active trading desk contracts.
            </p>
          </div>

          {/* Quick Desk Actions */}
          <div className="flex flex-wrap items-center gap-3">
            {onOpenCallDesk && (
              <button
                onClick={onOpenCallDesk}
                className="px-4 py-2.5 rounded-xl bg-white text-[#0053d4] hover:bg-blue-50 font-bold text-xs flex items-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call Dealing Desk</span>
              </button>
            )}
            {onOpenAlertModal && (
              <button
                onClick={() => onOpenAlertModal()}
                className="px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 border border-white/30 text-white font-bold text-xs flex items-center gap-2 backdrop-blur-xs transition-all cursor-pointer"
              >
                <Zap className="w-4 h-4 text-[#00C48C]" />
                <span>Set News Alert</span>
              </button>
            )}
          </div>
        </div>

        {/* Mini Flash Ticker Badges in Hero */}
        <div className="mt-6 pt-5 border-t border-white/15 flex items-center gap-2 overflow-x-auto no-scrollbar text-xs">
          <span className="text-blue-200/80 font-bold uppercase tracking-wider text-[11px] whitespace-nowrap">
            Active Assets:
          </span>
          {tickers.map((t) => (
            <button
              key={t.symbol}
              onClick={() => setSelectedTickerFilter(t.symbol)}
              className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-white font-mono text-xs flex items-center gap-2 whitespace-nowrap cursor-pointer transition-all"
            >
              <span className="font-bold">{t.symbol}</span>
              <span
                className={`font-semibold ${
                  t.changePercent >= 0 ? 'text-[#00C48C]' : 'text-rose-300'
                }`}
              >
                {t.changePercent >= 0 ? '+' : ''}
                {t.changePercent.toFixed(1)}%
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Daily Market Briefing Highlights (FBS Style Flash Calendar) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#0053d4]/10 text-[#0053d4] flex items-center justify-center flex-shrink-0">
            <Globe2 className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              Central Bank Outlook
            </span>
            <p className="text-xs font-semibold text-slate-800 mt-0.5">
              Fed funds swap pricing 82% odds of 25bps easing in next rate cycle.
            </p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#00C48C]/15 text-[#008f65] flex items-center justify-center flex-shrink-0">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              Index Gamma Regime
            </span>
            <p className="text-xs font-semibold text-slate-800 mt-0.5">
              SPX 0DTE call skew elevated with dealers holding positive gamma buffer.
            </p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center flex-shrink-0">
            <Calendar className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              Economic Catalyst
            </span>
            <p className="text-xs font-semibold text-slate-800 mt-0.5">
              US Core PCE Price Index & Eurozone Flash PMI scheduled 08:30 EST.
            </p>
          </div>
        </div>
      </div>

      {/* Main Interactive Market News Wire Feed */}
      <MarketNews
        tickers={tickers}
        initialTickerFilter={selectedTickerFilter}
        onSelectTicker={(sym) => setSelectedTickerFilter(sym)}
        onOpenAlertModal={onOpenAlertModal}
        compact={false}
      />
    </div>
  );
};
