import React, { useState } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  CartesianGrid,
} from 'recharts';
import {
  TrendingUp,
  TrendingDown,
  Activity,
  Zap,
  ShieldCheck,
  DollarSign,
  Layers,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  RefreshCw,
  PhoneCall,
  SlidersHorizontal,
  Bell,
} from 'lucide-react';
import { MarketTicker, OrderFill } from '../../types/market';
import { HISTORICAL_CHART_TIMEFRAMES } from '../../data/mockData';
import { SentimentVisualizer } from '../SentimentVisualizer';
import { MarketNews } from '../MarketNews';

interface DashboardScreenProps {
  tickers: MarketTicker[];
  recentFills: OrderFill[];
  deskLatency: number;
  virtualBalance: number;
  onExecuteTrade: (fill: Omit<OrderFill, 'id' | 'time'>) => void;
  onOpenCallDesk: () => void;
  onOpenAlertModal?: (symbol?: string) => void;
  onNavigateToNews?: () => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  tickers,
  recentFills,
  deskLatency,
  virtualBalance,
  onExecuteTrade,
  onOpenCallDesk,
  onOpenAlertModal,
  onNavigateToNews,
}) => {
  const [timeframe, setTimeframe] = useState<'1D' | '1W' | '1M' | '1Y'>('1D');
  const [chartMetric, setChartMetric] = useState<'price' | 'volume' | 'latency'>('price');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [tradeSuccessToast, setTradeSuccessToast] = useState<string | null>(null);

  const chartData = HISTORICAL_CHART_TIMEFRAMES[timeframe];

  const filteredTickers =
    selectedCategory === 'all'
      ? tickers
      : tickers.filter((t) => t.category === selectedCategory);

  const handleQuickTrade = (ticker: MarketTicker, type: 'CALL' | 'PUT') => {
    const strike = ticker.strikePrices ? ticker.strikePrices[1] || ticker.price : ticker.price;
    const price = type === 'CALL' ? 14.50 : 12.80;
    const contracts = 5;

    onExecuteTrade({
      symbol: ticker.symbol,
      type,
      strike: Math.round(strike),
      price,
      contracts,
      executionMs: Math.round(deskLatency),
    });

    setTradeSuccessToast(
      `Instant Fill: ${contracts}x ${ticker.symbol} ${Math.round(strike)} ${type} @ $${price.toFixed(2)} (${Math.round(deskLatency)}ms)`
    );

    setTimeout(() => {
      setTradeSuccessToast(null);
    }, 3800);
  };

  return (
    <div id="rd-screen" className="flex flex-col w-full min-w-0 max-w-7xl mx-auto px-3 sm:px-6 pt-4 sm:pt-6 pb-16">
      {/* Toast Notification */}
      {tradeSuccessToast && (
        <div className="fixed top-20 right-4 z-50 bg-[#0b1b38] text-white px-4 py-3 rounded-2xl shadow-xl border border-[#00C48C]/40 flex items-center gap-3 animate-slideIn">
          <span className="p-1 rounded-full bg-[#00C48C]/20 text-[#00C48C]">
            <Zap className="w-4 h-4" />
          </span>
          <span className="text-xs font-mono font-medium">{tradeSuccessToast}</span>
        </div>
      )}

      {/* Website Format: Institutional Hero Overview Banner */}
      <div className="bg-gradient-to-r from-[#0b1b38] via-[#0e2348] to-[#003882] rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl border border-[#1e3a6a] mb-8">
        <div className="relative z-10 flex min-w-0 flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="min-w-0 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[#50d9fe] text-xs font-semibold mb-3 border border-white/10">
              <span className="w-2 h-2 rounded-full bg-[#00C48C] animate-ping" />
              <span>Wall Street Dealing Desk • Equinix NY4 Low-Latency Gateway</span>
            </div>
            <h1 className="text-xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white mb-2 break-words">
              Next-Gen Institutional Options &amp; Derivatives Brokerage
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
              Execute SPX 0DTE contracts, G10 foreign exchange, and equity index derivatives with sub-20ms execution, real-time FBS market intelligence, and dedicated floor dealing support.
            </p>

            {/* Platform Credential Badges */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-5 text-xs text-slate-200">
              <div className="flex items-center gap-1.5 bg-black/20 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-white/10">
                <ShieldCheck className="w-4 h-4 text-[#00C48C]" />
                <span className="font-medium">Tier-1 Segregated Bank Custody</span>
              </div>
              <div className="flex items-center gap-1.5 bg-black/20 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-white/10">
                <Zap className="w-4 h-4 text-[#50d9fe]" />
                <span className="font-medium">Sub-20ms SLA Fill Guarantee</span>
              </div>
              <div className="flex items-center gap-1.5 bg-black/20 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-white/10">
                <Activity className="w-4 h-4 text-[#00C48C]" />
                <span className="font-medium">CBOE Direct Book Feed</span>
              </div>
            </div>
          </div>

          {/* Right Action Box: Floor Desk Hotline & Quick Paper Balance */}
          <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-5 sm:p-6 flex flex-col gap-4 lg:w-80 flex-shrink-0 shadow-inner">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <span className="text-[10px] text-slate-300 uppercase tracking-wider font-bold">Paper Trading Sandbox</span>
                <div className="text-xl font-bold font-mono text-[#00C48C] mt-0.5">
                  ${virtualBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </div>
              </div>
              <span className="px-2 py-1 bg-[#00C48C]/20 border border-[#00C48C]/40 text-[#00C48C] rounded-lg text-[10px] font-bold">
                ACTIVE
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={onOpenCallDesk}
                className="w-full py-2.5 px-4 rounded-xl bg-[#0053d4] hover:bg-[#003fa5] text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#50d9fe]" />
                <span>Call Dealing Desk Floor</span>
              </button>
              {onOpenAlertModal && (
                <button
                  onClick={() => onOpenAlertModal()}
                  className="w-full py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-medium flex items-center justify-center gap-2 transition-all cursor-pointer border border-white/10"
                >
                  <Bell className="w-3.5 h-3.5 text-[#00C48C]" />
                  <span>Configure Price Alert Trigger</span>
                </button>
              )}
            </div>

            <div className="text-[11px] text-slate-300 text-center flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00C48C] animate-pulse" />
              <span>NY4 Cross-Connect: <strong className="font-mono text-white">{deskLatency.toFixed(1)}ms</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Top Welcome & Market Status */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EEF4FF] text-[#0053d4] text-xs font-semibold mb-1.5">
            <span className="w-2 h-2 rounded-full bg-[#00C48C] animate-ping"></span>
            <span>Institutional Dealing Flow • Live Execution Active</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0b1b38] tracking-tight">
            Market Intelligence rd
          </h2>
          <p className="text-xs sm:text-sm text-[#4A5878]">
            Real-time options flow, ultra-low latency execution metrics, and cross-asset liquidity.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <button
            onClick={onOpenCallDesk}
            className="h-10 px-4 rounded-xl bg-[#0b1b38] hover:bg-[#1a2c4e] text-white text-xs font-semibold flex items-center gap-2 shadow-sm transition-all cursor-pointer"
          >
            <PhoneCall className="w-3.5 h-3.5 text-[#50d9fe]" />
            <span>Connect Floor Desk</span>
          </button>
          <div className="bg-white border border-[#E2E8F4] px-3.5 py-1.5 rounded-xl flex items-center gap-2 shadow-xs">
            <Activity className="w-4 h-4 text-[#00C48C]" />
            <div className="text-xs">
              <span className="text-[#4A5878]">NY4 Latency: </span>
              <span className="font-mono font-bold text-[#0b1b38]">{deskLatency.toFixed(1)} ms</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Key Institutional Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        {/* Metric 1 */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E2E8F4] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-[#4A5878] mb-1">
            <span className="font-semibold uppercase tracking-wider text-[11px]">24h Options Flow</span>
            <DollarSign className="w-4 h-4 text-[#0053d4]" />
          </div>
          <div className="text-xl sm:text-2xl font-bold font-mono text-[#0b1b38] my-1">
            $1.428 B
          </div>
          <div className="flex items-center gap-1.5 text-xs">
            <span className="inline-flex items-center text-[#00C48C] font-semibold bg-[#00C48C]/10 px-1.5 py-0.5 rounded">
              <ArrowUpRight className="w-3 h-3 mr-0.5" />
              +14.8%
            </span>
            <span className="text-[#4A5878] text-[11px]">vs prior session</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E2E8F4] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-[#4A5878] mb-1">
            <span className="font-semibold uppercase tracking-wider text-[11px]">Avg Fill Latency</span>
            <Zap className="w-4 h-4 text-[#00C48C]" />
          </div>
          <div className="text-xl sm:text-2xl font-bold font-mono text-[#0b1b38] my-1">
            {deskLatency.toFixed(1)} ms
          </div>
          <div className="flex items-center gap-1.5 text-xs">
            <span className="inline-flex items-center text-[#0053d4] font-semibold bg-[#EEF4FF] px-1.5 py-0.5 rounded">
              99.98%
            </span>
            <span className="text-[#4A5878] text-[11px]">Sub-20ms SLA guarantee</span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E2E8F4] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-[#4A5878] mb-1">
            <span className="font-semibold uppercase tracking-wider text-[11px]">Open Contracts</span>
            <Layers className="w-4 h-4 text-[#00677d]" />
          </div>
          <div className="text-xl sm:text-2xl font-bold font-mono text-[#0b1b38] my-1">
            1,482,900
          </div>
          <div className="flex items-center gap-1.5 text-xs">
            <span className="inline-flex items-center text-[#00C48C] font-semibold bg-[#00C48C]/10 px-1.5 py-0.5 rounded">
              <ArrowUpRight className="w-3 h-3 mr-0.5" />
              +52.1k
            </span>
            <span className="text-[#4A5878] text-[11px]">0DTE SPX concentration</span>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E2E8F4] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-[#4A5878] mb-1">
            <span className="font-semibold uppercase tracking-wider text-[11px]">Desk Liquidity Depth</span>
            <ShieldCheck className="w-4 h-4 text-[#1e6bff]" />
          </div>
          <div className="text-xl sm:text-2xl font-bold font-mono text-[#0b1b38] my-1">
            $480.5 M
          </div>
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-[#00C48C] font-semibold text-[11px]">Tier-1 MM Backed</span>
            <span className="text-[#4A5878] text-[11px]">• 0% Slippage</span>
          </div>
        </div>
      </div>

      {/* Main Interactive Chart Section */}
      <section className="min-w-0 bg-white rounded-3xl p-3 sm:p-6 border border-[#E2E8F4] shadow-sm mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-xl font-bold text-[#0b1b38] break-words">
                SPX 500 Daily Options Flow &amp; Execution Curve
              </h2>
              <span className="text-[11px] bg-[#EEF4FF] text-[#0053d4] px-2 py-0.5 rounded-full font-semibold whitespace-nowrap">
                Live Data Feed
              </span>
            </div>
            <p className="text-xs text-[#4A5878] mt-0.5">
              Historical pricing, contract volume, and latency across institutional trading sessions.
            </p>
          </div>

          <div className="flex max-w-full flex-wrap items-center gap-2 overflow-x-auto">
            {/* Metric Mode Toggle */}
            <div className="bg-[#f1f3ff] p-1 rounded-xl flex items-center text-xs border border-[#E2E8F4]">
              <button
                onClick={() => setChartMetric('price')}
                className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                  chartMetric === 'price' ? 'bg-white text-[#0053d4] shadow-xs' : 'text-[#4A5878]'
                }`}
              >
                Price ($)
              </button>
              <button
                onClick={() => setChartMetric('volume')}
                className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                  chartMetric === 'volume' ? 'bg-white text-[#0053d4] shadow-xs' : 'text-[#4A5878]'
                }`}
              >
                Volume ($M)
              </button>
              <button
                onClick={() => setChartMetric('latency')}
                className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                  chartMetric === 'latency' ? 'bg-white text-[#0053d4] shadow-xs' : 'text-[#4A5878]'
                }`}
              >
                Latency (ms)
              </button>
            </div>

            {/* Timeframe Toggles */}
            <div className="bg-[#f1f3ff] p-1 rounded-xl flex items-center text-xs border border-[#E2E8F4]">
              {(['1D', '1W', '1M', '1Y'] as const).map((tf) => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                    timeframe === tf ? 'bg-[#0053d4] text-white shadow-xs' : 'text-[#4A5878] hover:text-[#0b1b38]'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Recharts Area Container */}
        <div className="w-full min-w-0 h-56 sm:h-80">
          <ResponsiveContainer width="100%" height="100%">
            {chartMetric === 'volume' ? (
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F4" />
                <XAxis dataKey="time" stroke="#737687" fontSize={11} tickLine={false} />
                <YAxis stroke="#737687" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0b1b38',
                    borderRadius: '12px',
                    border: 'none',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                  formatter={(value: any) => [`$${value}M`, 'Executed Volume']}
                />
                <Bar dataKey="volume" fill="#1e6bff" radius={[6, 6, 0, 0]} />
              </BarChart>
            ) : (
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorMetric" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={chartMetric === 'latency' ? '#00C48C' : '#1e6bff'} stopOpacity={0.35} />
                    <stop offset="95%" stopColor={chartMetric === 'latency' ? '#00C48C' : '#1e6bff'} stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F4" />
                <XAxis dataKey="time" stroke="#737687" fontSize={11} tickLine={false} />
                <YAxis
                  domain={chartMetric === 'price' ? ['dataMin - 10', 'dataMax + 10'] : ['auto', 'auto']}
                  stroke="#737687"
                  fontSize={11}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0b1b38',
                    borderRadius: '12px',
                    border: 'none',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                  formatter={(val: any) => [
                    chartMetric === 'price' ? `$${val}` : `${val} ms`,
                    chartMetric === 'price' ? 'Index Level' : 'Floor Latency',
                  ]}
                />
                <Area
                  type="monotone"
                  dataKey={chartMetric}
                  stroke={chartMetric === 'latency' ? '#00C48C' : '#1e6bff'}
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorMetric)"
                />
              </AreaChart>
            )}
          </ResponsiveContainer>
        </div>

        {/* Chart Sub-legend */}
        <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center justify-between gap-3 text-xs text-[#4A5878] mt-4 pt-3 border-t border-slate-100">
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1e6bff]"></span>
              <span>Index / Options Curve</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00C48C]"></span>
              <span>Equinix NY4 Low-Latency Target</span>
            </span>
          </div>
          <span className="text-[11px] font-mono text-slate-500">
            Source: MoneyOption Institutional Dealing Core
          </span>
        </div>
      </section>

      {/* Options Sentiment Analysis Visualizer (Call vs Put Flow over Time) */}
      <SentimentVisualizer recentFills={recentFills} />

      {/* Two Column Grid: Live Tickers & Real-Time Order Flow */}
      

      {/* FBS Style Market News Section */}
      <div className="mt-8">
        <MarketNews
          tickers={tickers}
          onOpenAlertModal={onOpenAlertModal}
          compact={false}
          onViewAllNews={onNavigateToNews}
        />
      </div>
    </div>
  );
};
