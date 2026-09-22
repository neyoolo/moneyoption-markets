import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ReferenceLine,
} from 'recharts';
import {
  TrendingUp,
  TrendingDown,
  Activity,
  BarChart2,
  PieChart,
  Layers,
  Sparkles,
  Info,
  SlidersHorizontal,
} from 'lucide-react';
import { OrderFill } from '../types/market';

interface SentimentVisualizerProps {
  recentFills: OrderFill[];
}

export const SentimentVisualizer: React.FC<SentimentVisualizerProps> = ({ recentFills }) => {
  const [chartType, setChartType] = useState<'bars' | 'cumulative' | 'net'>('bars');
  const [selectedSymbol, setSelectedSymbol] = useState<string>('ALL');

  // Filter fills by symbol if requested
  const filteredFills = useMemo(() => {
    if (selectedSymbol === 'ALL') return recentFills;
    return recentFills.filter((f) => f.symbol === selectedSymbol);
  }, [recentFills, selectedSymbol]);

  // Aggregate time series chronologically (oldest to newest)
  const timeSeriesData = useMemo(() => {
    // recentFills has newest at index 0, so reverse for chronological left-to-right order
    const chronological = [...filteredFills].reverse();

    let cumCalls = 0;
    let cumPuts = 0;

    return chronological.map((fill, index) => {
      const isCall = fill.type === 'CALL';
      const isPut = fill.type === 'PUT';

      const calls = isCall ? fill.contracts : 0;
      const puts = isPut ? fill.contracts : 0;

      cumCalls += calls;
      cumPuts += puts;

      const netDelta = cumCalls - cumPuts;
      const totalSoFar = cumCalls + cumPuts;
      const callRatio = totalSoFar > 0 ? Math.round((cumCalls / totalSoFar) * 100) : 50;

      return {
        key: `${fill.time}-${index}`,
        time: fill.time,
        symbol: fill.symbol,
        type: fill.type,
        strike: fill.strike,
        price: fill.price,
        calls,
        puts,
        cumulativeCalls: cumCalls,
        cumulativePuts: cumPuts,
        netDelta,
        callRatio,
      };
    });
  }, [filteredFills]);

  // Overall aggregate stats
  const stats = useMemo(() => {
    let totalCalls = 0;
    let totalPuts = 0;
    let callNotional = 0;
    let putNotional = 0;

    filteredFills.forEach((f) => {
      if (f.type === 'CALL') {
        totalCalls += f.contracts;
        callNotional += f.contracts * f.price * 100;
      } else {
        totalPuts += f.contracts;
        putNotional += f.contracts * f.price * 100;
      }
    });

    const totalContracts = totalCalls + totalPuts;
    const callPercent = totalContracts > 0 ? Math.round((totalCalls / totalContracts) * 100) : 50;
    const putPercent = 100 - callPercent;
    const putCallRatio = totalCalls > 0 ? +(totalPuts / totalCalls).toFixed(2) : 1.0;

    let sentimentLabel = 'Neutral Flow';
    let sentimentColor = 'text-[#0053d4]';
    let sentimentBg = 'bg-[#EEF4FF]';

    if (callPercent >= 60) {
      sentimentLabel = 'Bullish Call Bias';
      sentimentColor = 'text-[#00C48C]';
      sentimentBg = 'bg-[#00C48C]/15';
    } else if (callPercent <= 40) {
      sentimentLabel = 'Bearish Put Bias';
      sentimentColor = 'text-[#FF3B30]';
      sentimentBg = 'bg-[#FF3B30]/15';
    }

    return {
      totalCalls,
      totalPuts,
      totalContracts,
      callPercent,
      putPercent,
      putCallRatio,
      sentimentLabel,
      sentimentColor,
      sentimentBg,
      callNotional,
      putNotional,
    };
  }, [filteredFills]);

  // Extract unique symbols for filtering
  const availableSymbols = useMemo(() => {
    const symbols = new Set<string>();
    recentFills.forEach((f) => symbols.add(f.symbol));
    return ['ALL', ...Array.from(symbols)];
  }, [recentFills]);

  return (
    <section
      id="sentiment-visualizer-section"
      className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E2E8F4] shadow-sm mb-6 transition-all"
    >
      {/* Header & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-xl bg-[#EEF4FF] text-[#0053d4]">
              <BarChart2 className="w-4 h-4" />
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-[#0b1b38]">
              Options Sentiment Flow Visualizer
            </h2>
            <span
              className={`text-xs px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${stats.sentimentBg} ${stats.sentimentColor}`}
            >
              {stats.sentimentLabel}
            </span>
          </div>
          <p className="text-xs text-[#4A5878]">
            Historical 'Call' vs 'Put' institutional contract executions mapped sequentially over time.
          </p>
        </div>

        {/* View Mode & Filter Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Symbol Filter */}
          <div className="flex items-center bg-[#f1f3ff] p-1 rounded-xl border border-[#E2E8F4] text-xs">
            <span className="text-[10px] text-[#4A5878] font-semibold px-2 uppercase">Symbol:</span>
            {availableSymbols.map((sym) => (
              <button
                key={sym}
                onClick={() => setSelectedSymbol(sym)}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                  selectedSymbol === sym
                    ? 'bg-white text-[#0053d4] shadow-xs'
                    : 'text-[#4A5878] hover:text-[#0b1b38]'
                }`}
              >
                {sym}
              </button>
            ))}
          </div>

          {/* Chart Representation Switcher */}
          <div className="flex items-center bg-[#f1f3ff] p-1 rounded-xl border border-[#E2E8F4] text-xs">
            <button
              onClick={() => setChartType('bars')}
              className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                chartType === 'bars' ? 'bg-[#0053d4] text-white shadow-xs' : 'text-[#4A5878] hover:text-[#0b1b38]'
              }`}
              title="Execution Volume Bars"
            >
              Volume Flow
            </button>
            <button
              onClick={() => setChartType('cumulative')}
              className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                chartType === 'cumulative' ? 'bg-[#0053d4] text-white shadow-xs' : 'text-[#4A5878] hover:text-[#0b1b38]'
              }`}
              title="Cumulative Contract Growth"
            >
              Cumulative Flow
            </button>
            <button
              onClick={() => setChartType('net')}
              className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                chartType === 'net' ? 'bg-[#0053d4] text-white shadow-xs' : 'text-[#4A5878] hover:text-[#0b1b38]'
              }`}
              title="Net Delta Sentiment Line"
            >
              Net Bias
            </button>
          </div>
        </div>
      </div>

      {/* KPI Sentiment Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-[#faf9ff] border border-[#E2E8F4] mb-5">
        {/* Put / Call Ratio */}
        <div>
          <span className="text-[11px] text-[#4A5878] font-semibold block uppercase tracking-wider">
            Put / Call Ratio (PCR)
          </span>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-xl font-bold font-mono text-[#0b1b38]">
              {stats.putCallRatio}
            </span>
            <span
              className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                stats.putCallRatio < 0.8
                  ? 'bg-[#00C48C]/15 text-[#008f65]'
                  : stats.putCallRatio > 1.1
                  ? 'bg-[#FF3B30]/15 text-[#cf271e]'
                  : 'bg-slate-200 text-slate-700'
              }`}
            >
              {stats.putCallRatio < 0.8 ? 'Bullish' : stats.putCallRatio > 1.1 ? 'Bearish' : 'Neutral'}
            </span>
          </div>
        </div>

        {/* Call Volume */}
        <div>
          <span className="text-[11px] text-[#4A5878] font-semibold block uppercase tracking-wider">
            Call Contracts (Bullish)
          </span>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="text-xl font-bold font-mono text-[#00C48C]">
              {stats.totalCalls} lots
            </span>
            <span className="text-xs font-semibold text-[#008f65]">({stats.callPercent}%)</span>
          </div>
        </div>

        {/* Put Volume */}
        <div>
          <span className="text-[11px] text-[#4A5878] font-semibold block uppercase tracking-wider">
            Put Contracts (Bearish)
          </span>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="text-xl font-bold font-mono text-[#FF3B30]">
              {stats.totalPuts} lots
            </span>
            <span className="text-xs font-semibold text-[#cf271e]">({stats.putPercent}%)</span>
          </div>
        </div>

        {/* Net Flow Ratio Progress */}
        <div>
          <span className="text-[11px] text-[#4A5878] font-semibold block uppercase tracking-wider">
            Market Bias Gauge
          </span>
          <div className="mt-1.5">
            <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden flex">
              <div
                style={{ width: `${stats.callPercent}%` }}
                className="bg-[#00C48C] h-full transition-all duration-500"
                title={`Calls: ${stats.callPercent}%`}
              />
              <div
                style={{ width: `${stats.putPercent}%` }}
                className="bg-[#FF3B30] h-full transition-all duration-500"
                title={`Puts: ${stats.putPercent}%`}
              />
            </div>
            <div className="flex justify-between text-[10px] text-[#4A5878] font-semibold mt-1">
              <span className="text-[#00C48C]">{stats.callPercent}% Calls</span>
              <span className="text-[#FF3B30]">{stats.putPercent}% Puts</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Visualizer Chart */}
      <div className="w-full h-64 sm:h-72">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'bars' ? (
            /* Bar Chart: Call vs Put volume over chronological execution time */
            <BarChart data={timeSeriesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
                formatter={(val: any, name: any) => [
                  `${val} contracts`,
                  name === 'calls' ? 'CALL Flow' : 'PUT Flow',
                ]}
                labelFormatter={(label, payload) => {
                  if (payload && payload.length > 0) {
                    const item = payload[0].payload;
                    return `${label} • ${item.symbol} ${item.strike} (${item.type})`;
                  }
                  return label;
                }}
              />
              <Legend
                verticalAlign="top"
                align="right"
                iconType="circle"
                wrapperStyle={{ fontSize: '11px', paddingBottom: '8px' }}
                formatter={(value) => (value === 'calls' ? 'Call Activity' : 'Put Activity')}
              />
              <Bar dataKey="calls" fill="#00C48C" radius={[4, 4, 0, 0]} maxBarSize={32} />
              <Bar dataKey="puts" fill="#FF3B30" radius={[4, 4, 0, 0]} maxBarSize={32} />
            </BarChart>
          ) : chartType === 'cumulative' ? (
            /* Area Chart: Cumulative Call vs Put volume accumulation over time */
            <AreaChart data={timeSeriesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorCalls" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00C48C" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#00C48C" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="colorPuts" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF3B30" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#FF3B30" stopOpacity={0.0} />
                </linearGradient>
              </defs>
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
                formatter={(val: any, name: any) => [
                  `${val} lots`,
                  name === 'cumulativeCalls' ? 'Cumulative CALLs' : 'Cumulative PUTs',
                ]}
              />
              <Legend
                verticalAlign="top"
                align="right"
                iconType="circle"
                wrapperStyle={{ fontSize: '11px', paddingBottom: '8px' }}
                formatter={(value) => (value === 'cumulativeCalls' ? 'Cumulative Calls' : 'Cumulative Puts')}
              />
              <Area
                type="monotone"
                dataKey="cumulativeCalls"
                stroke="#00C48C"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#colorCalls)"
              />
              <Area
                type="monotone"
                dataKey="cumulativePuts"
                stroke="#FF3B30"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#colorPuts)"
              />
            </AreaChart>
          ) : (
            /* Line Chart: Net Sentiment Delta (Calls - Puts) */
            <LineChart data={timeSeriesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F4" />
              <XAxis dataKey="time" stroke="#737687" fontSize={11} tickLine={false} />
              <YAxis stroke="#737687" fontSize={11} tickLine={false} />
              <ReferenceLine y={0} stroke="#4A5878" strokeDasharray="3 3" label={{ value: 'Neutral Delta (0)', fill: '#737687', fontSize: 10 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0b1b38',
                  borderRadius: '12px',
                  border: 'none',
                  color: '#fff',
                  fontSize: '12px',
                }}
                formatter={(val: any) => [
                  `${val > 0 ? '+' : ''}${val} contracts`,
                  val >= 0 ? 'Net Bullish Delta' : 'Net Bearish Delta',
                ]}
              />
              <Line
                type="monotone"
                dataKey="netDelta"
                stroke="#1e6bff"
                strokeWidth={3}
                dot={{ r: 4, fill: '#0053d4' }}
                activeDot={{ r: 7, fill: '#00C48C' }}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Visualizer Insights Footer */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#4A5878] mt-3 pt-3 border-t border-slate-100">
        <div className="flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-[#0053d4]" />
          <span>
            Real-time feed maps institutional order flows directly from the live execution queue.
          </span>
        </div>
        <div className="flex items-center gap-3 font-mono text-[11px]">
          <span className="text-[#00C48C]">● Calls: +${(stats.callNotional / 1000).toFixed(1)}k notional</span>
          <span className="text-[#FF3B30]">● Puts: +${(stats.putNotional / 1000).toFixed(1)}k notional</span>
        </div>
      </div>
    </section>
  );
};
