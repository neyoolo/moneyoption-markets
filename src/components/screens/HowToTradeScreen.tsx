import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
} from 'recharts';
import {
  TrendingUp,
  ShieldCheck,
  Zap,
  Target,
  ArrowRight,
  Sliders,
  HelpCircle,
  BarChart3,
  PhoneCall,
} from 'lucide-react';
import { TRADING_STRATEGIES } from '../../data/mockData';

interface HowToTradeScreenProps {
  onOpenCallDesk: () => void;
  onNavigateHome: () => void;
}

export const HowToTradeScreen: React.FC<HowToTradeScreenProps> = ({
  onOpenCallDesk,
  onNavigateHome,
}) => {
  const [selectedStrategyId, setSelectedStrategyId] = useState('bull-call-spread');
  const [currentStrikeOffset, setCurrentStrikeOffset] = useState(0);

  const selectedStrategy =
    TRADING_STRATEGIES.find((s) => s.id === selectedStrategyId) || TRADING_STRATEGIES[0];

  // Dynamic payoff curve data generation
  const payoffData = useMemo(() => {
    const basePrice = 5930 + currentStrikeOffset;
    const points = [];

    for (let price = basePrice - 100; price <= basePrice + 100; price += 10) {
      let pnl = 0;
      if (selectedStrategyId === 'bull-call-spread') {
        // Buy call at basePrice - 10, Sell call at basePrice + 20
        const longPayoff = Math.max(0, price - (basePrice - 10)) - 18;
        const shortPayoff = -Math.max(0, price - (basePrice + 20)) + 6;
        pnl = Math.round((longPayoff + shortPayoff) * 100);
      } else if (selectedStrategyId === 'iron-condor') {
        // Range bound profit
        if (price >= basePrice - 30 && price <= basePrice + 30) {
          pnl = 850;
        } else if (price < basePrice - 30) {
          pnl = Math.max(-1200, 850 - (basePrice - 30 - price) * 50);
        } else {
          pnl = Math.max(-1200, 850 - (price - (basePrice + 30)) * 50);
        }
      } else if (selectedStrategyId === 'cash-secured-put') {
        const premium = 450;
        const strike = basePrice - 20;
        pnl = price >= strike ? premium : premium - (strike - price) * 80;
      } else {
        // Straddle
        const debit = 2200;
        const callPayoff = Math.max(0, price - basePrice) * 75;
        const putPayoff = Math.max(0, basePrice - price) * 75;
        pnl = Math.round(callPayoff + putPayoff - debit);
      }

      points.push({
        price,
        pnl,
      });
    }
    return points;
  }, [selectedStrategyId, currentStrikeOffset]);

  return (
    <div id="how-to-trade-screen" className="flex flex-col w-full max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-16">
      {/* Screen Title */}
      <div className="mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEF4FF] text-[#0053d4] text-xs font-semibold mb-1.5">
          <Target className="w-3.5 h-3.5 text-[#00C48C]" />
          <span>Execution Academy &amp; Quantitative Lab</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#0b1b38] tracking-tight">
          Institutional Options &amp; Derivatives Guide
        </h1>
        <p className="text-xs sm:text-sm text-[#4A5878]">
          Master mathematical risk management, strike selection, and dealing desk order routing.
        </p>
      </div>

      {/* 3 Steps Execution Blueprint — UPDATED: contact desk → fill in & agree on terms → proceed with payment */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {/* Step 1: Contact Desk */}
        <div className="p-5 rounded-2xl bg-white border border-[#E2E8F4] shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-[#EEF4FF] text-[#0053d4] font-bold flex items-center justify-center mb-3">
              01
            </div>
            <h3 className="text-base font-bold text-[#0b1b38] mb-1">
              Contact Desk
            </h3>
            <p className="text-xs text-[#4A5878] leading-relaxed">
              Reach out to our senior dealing desk via phone or secure chat. We&apos;ll discuss your objectives, risk profile, and instrument selection (SPX, NDX, commodities, FX).
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-[#0053d4] font-semibold flex items-center gap-1">
            <span>📞 24/7 institutional coverage · +1 (212) 555-0199</span>
          </div>
        </div>

        {/* Step 2: Fill in & Agree on Terms and Conditions */}
        <div className="p-5 rounded-2xl bg-white border border-[#E2E8F4] shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-[#E6F8FB] text-[#00677d] font-bold flex items-center justify-center mb-3">
              02
            </div>
            <h3 className="text-base font-bold text-[#0b1b38] mb-1">
              Fill in &amp; Agree on Terms
            </h3>
            <p className="text-xs text-[#4A5878] leading-relaxed">
              Complete the order ticket with expiry, strikes, and strategy. Review the ISDA/execution agreement, margin requirements, and confirm all terms electronically.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-[#00677d] font-semibold flex items-center gap-1">
            <span>📋 Digital signature · term sheet · risk disclosure</span>
          </div>
        </div>

        {/* Step 3: Proceed with Payment */}
        <div className="p-5 rounded-2xl bg-white border border-[#E2E8F4] shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-[#f1f3ff] text-[#0053d4] font-bold flex items-center justify-center mb-3">
              03
            </div>
            <h3 className="text-base font-bold text-[#0b1b38] mb-1">
              Proceed with Payment
            </h3>
            <p className="text-xs text-[#4A5878] leading-relaxed">
              Fund via wire, USDC, or approved collateral. Once payment is confirmed, your order is routed to Equinix NY4 with sub-20ms execution and zero slippage.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-[#00C48C] font-semibold flex items-center gap-1">
            <span>⚡ Instant routing · tier-1 liquidity · 0% slippage</span>
          </div>
        </div>
      </div>

      {/* Interactive Strategy & Payoff Simulator */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 border border-[#E2E8F4] shadow-sm mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-bold text-[#0b1b38]">
              Interactive Options Payoff Simulator
            </h2>
            <p className="text-xs text-[#4A5878]">
              Select a strategy to visualize its theoretical Profit / Loss curve at expiration.
            </p>
          </div>

          {/* Strategy Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            {TRADING_STRATEGIES.map((strat) => (
              <button
                key={strat.id}
                onClick={() => setSelectedStrategyId(strat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  selectedStrategyId === strat.id
                    ? 'bg-[#0053d4] text-white shadow-xs'
                    : 'bg-[#f1f3ff] text-[#4A5878] hover:text-[#0b1b38]'
                }`}
              >
                {strat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Strategy Parameters Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-[#faf9ff] border border-[#E2E8F4] mb-6">
          <div>
            <span className="text-[11px] text-[#4A5878] block">Market Bias</span>
            <span className="text-sm font-bold text-[#0b1b38]">{selectedStrategy.sentiment}</span>
          </div>
          <div>
            <span className="text-[11px] text-[#4A5878] block">Risk / Reward</span>
            <span className="text-sm font-bold text-[#0053d4]">{selectedStrategy.riskReward}</span>
          </div>
          <div>
            <span className="text-[11px] text-[#4A5878] block">Max Theoretical Profit</span>
            <span className="text-sm font-bold text-[#00C48C]">{selectedStrategy.maxProfit}</span>
          </div>
          <div>
            <span className="text-[11px] text-[#4A5878] block">Win Probability</span>
            <span className="text-sm font-bold text-[#0b1b38]">{selectedStrategy.winProbability}% Historical</span>
          </div>
        </div>

        {/* Strike Slider */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 p-4 rounded-2xl bg-[#EEF4FF]/60 border border-[#b3c5ff]/40">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[#0053d4]" />
            <div>
              <span className="text-xs font-bold text-[#0b1b38] block">
                Target Spot Price Calibration
              </span>
              <span className="text-[11px] text-[#4A5878]">
                Offset spot benchmark by ${currentStrikeOffset > 0 ? '+' : ''}{currentStrikeOffset}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-64">
            <input
              type="range"
              min="-40"
              max="40"
              step="5"
              value={currentStrikeOffset}
              onChange={(e) => setCurrentStrikeOffset(parseInt(e.target.value))}
              className="w-full accent-[#0053d4] cursor-pointer"
            />
            <span className="font-mono text-xs font-bold text-[#0b1b38] w-12 text-right">
              {5930 + currentStrikeOffset}
            </span>
          </div>
        </div>

        {/* Interactive Payoff Chart */}
        <div className="w-full h-72 sm:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={payoffData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F4" />
              <XAxis dataKey="price" stroke="#737687" fontSize={11} tickLine={false} />
              <YAxis stroke="#737687" fontSize={11} tickLine={false} />
              <ReferenceLine y={0} stroke="#4A5878" strokeDasharray="3 3" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0b1b38',
                  borderRadius: '12px',
                  border: 'none',
                  color: '#fff',
                  fontSize: '12px',
                }}
                formatter={(val: any) => [
                  `$${val}`,
                  val >= 0 ? 'Profit (P&L)' : 'Loss (P&L)',
                ]}
              />
              <Line
                type="monotone"
                dataKey="pnl"
                stroke="#1e6bff"
                strokeWidth={3}
                dot={{ r: 3, fill: '#0053d4' }}
                activeDot={{ r: 6, fill: '#00C48C' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#4A5878]">
          <p className="max-w-xl">
            {selectedStrategy.description}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={onNavigateHome}
              className="px-4 py-2 rounded-xl bg-[#0053d4] text-white font-semibold hover:bg-[#003fa5] transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span>Test on Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Quantitative Greeks Breakdown Table */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 border border-[#E2E8F4] shadow-sm">
        <h3 className="text-lg font-bold text-[#0b1b38] mb-1">
          Institutional Greeks Reference Matrix
        </h3>
        <p className="text-xs text-[#4A5878] mb-4">
          Key quantitative risk factors monitored in real-time by the NYC floor dealing desk.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-[#faf9ff] border border-[#E2E8F4]">
            <div className="text-xs font-bold text-[#0053d4] mb-1">DELTA (Δ)</div>
            <div className="text-sm font-semibold text-[#0b1b38] mb-1">Directional Rate</div>
            <p className="text-xs text-[#4A5878]">
              Measures contract price sensitivity per $1 move in underlying asset. ATM calls average ~0.50 delta.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#faf9ff] border border-[#E2E8F4]">
            <div className="text-xs font-bold text-[#00677d] mb-1">GAMMA (Γ)</div>
            <div className="text-sm font-semibold text-[#0b1b38] mb-1">Acceleration Speed</div>
            <p className="text-xs text-[#4A5878]">
              Rate of change of delta. Highest near expiration on 0DTE options, driving extreme convex moves.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#faf9ff] border border-[#E2E8F4]">
            <div className="text-xs font-bold text-[#FF3B30] mb-1">THETA (Θ)</div>
            <div className="text-sm font-semibold text-[#0b1b38] mb-1">Time Premium Decay</div>
            <p className="text-xs text-[#4A5878]">
              Quantifies dollar decay per calendar day. Options sellers capture theta yield as time expires.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#faf9ff] border border-[#E2E8F4]">
            <div className="text-xs font-bold text-[#00C48C] mb-1">VEGA (ν)</div>
            <div className="text-sm font-semibold text-[#0b1b38] mb-1">Implied Volatility</div>
            <p className="text-xs text-[#4A5878]">
              Measures sensitivity to a 1% shift in implied volatility (IV). Critical around FOMC and earnings.
            </p>
          </div>
        </div>

        <div className="mt-6 p-4 rounded-2xl bg-[#0b1b38] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-sm font-bold">Need assistance configuring complex multi-leg orders?</div>
            <div className="text-xs text-slate-300">Our senior floor brokers are on standby 24/7 to structure custom hedge overlays.</div>
          </div>
          <button
            onClick={onOpenCallDesk}
            className="px-4 py-2.5 rounded-xl bg-[#1e6bff] hover:bg-[#0053d4] text-white text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer whitespace-nowrap"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Consult Dealing Desk</span>
          </button>
        </div>
      </div>
    </div>
  );
};