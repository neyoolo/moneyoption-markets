import React from 'react';
import { MarketTicker } from '../types/market';
import { TrendingUp, TrendingDown, Activity, Bell } from 'lucide-react';

interface MarketTickerBarProps {
  tickers: MarketTicker[];
  deskLatency: number;
  onOpenAlertModal?: (symbol?: string) => void;
  activeAlertsCount?: number;
}

export const MarketTickerBar: React.FC<MarketTickerBarProps> = ({
  tickers,
  deskLatency,
  onOpenAlertModal,
  activeAlertsCount = 0,
}) => {
  return (
    <div id="market-ticker-bar" className="w-full bg-[#0b1b38] text-white text-xs border-b border-[#1e2e4e] py-1.5 px-4 overflow-hidden relative z-40 select-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left Live Status & Alerts Trigger */}
        <div className="flex items-center gap-2.5 flex-shrink-0">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00C48C] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00C48C]"></span>
          </span>
          <span className="font-semibold text-slate-200 uppercase tracking-wider text-[11px] hidden sm:inline">
            Live Dealing Desk Feed
          </span>
          <span className="text-[11px] text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded flex items-center gap-1">
            <Activity className="w-3 h-3 text-[#00C48C]" />
            <span>{deskLatency.toFixed(1)}ms</span>
          </span>

          {/* Set Alert Button in Ticker Tape */}
          {onOpenAlertModal && (
            <button
              onClick={() => onOpenAlertModal()}
              className="text-[11px] font-semibold bg-[#1e6bff]/20 hover:bg-[#1e6bff]/40 text-[#4fa1ff] border border-[#1e6bff]/40 px-2.5 py-0.5 rounded-full flex items-center gap-1 transition-all cursor-pointer"
              title="Set Price Alert for any asset"
            >
              <Bell className="w-3 h-3 text-[#00C48C]" />
              <span className="hidden xs:inline">Set Alert</span>
              {activeAlertsCount > 0 && (
                <span className="ml-0.5 px-1.5 py-0.2 bg-[#00C48C] text-slate-950 font-bold rounded-full text-[9px]">
                  {activeAlertsCount}
                </span>
              )}
            </button>
          )}
        </div>

        {/* Slow, seamless price and currency-pair marquee */}
        <div className="min-w-0 flex-1 overflow-hidden text-[11px] font-mono" aria-label="Live market prices">
          <div className="ticker-marquee flex w-max hover:[animation-play-state:paused]">
            {[0, 1].map((copy) => (
              <div
                key={copy}
                className="flex shrink-0 items-center gap-6 pr-6"
                aria-hidden={copy === 1}
              >
                {tickers.map((ticker) => {
                  const isPositive = ticker.change >= 0;
                  const formattedPrice = ticker.category === 'forex'
                    ? ticker.price.toFixed(4)
                    : ticker.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

                  return (
                    <button
                      key={`${ticker.symbol}-${copy}`}
                      type="button"
                      onClick={() => onOpenAlertModal?.(ticker.symbol)}
                      className="group flex shrink-0 cursor-pointer items-center gap-1.5 rounded px-1.5 py-0.5 text-left transition-transform hover:scale-105 hover:bg-slate-800/60"
                      title={`Click to set price alert for ${ticker.symbol} ($${formattedPrice})`}
                    >
                      <span className="flex items-center gap-1 font-bold text-slate-300 transition-colors group-hover:text-[#4fa1ff]">
                        <span>{ticker.symbol}</span>
                        <Bell className="h-2.5 w-2.5 text-[#00C48C] opacity-0 transition-opacity group-hover:opacity-100" />
                      </span>
                      <span className="font-medium text-white">{formattedPrice}</span>
                      <span
                        className={`inline-flex items-center rounded px-1 text-[10px] font-semibold ${
                          isPositive ? 'bg-[#00C48C]/15 text-[#00C48C]' : 'bg-[#FF3B30]/15 text-[#FF3B30]'
                        }`}
                      >
                        {isPositive ? <TrendingUp className="mr-0.5 h-2.5 w-2.5" /> : <TrendingDown className="mr-0.5 h-2.5 w-2.5" />}
                        {isPositive ? '+' : ''}
                        {ticker.changePercent.toFixed(2)}%
                      </span>
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

