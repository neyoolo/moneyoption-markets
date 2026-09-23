import React, { useState } from 'react';
import {
  ShieldCheck,
  Zap,
  Globe,
  Lock,
  PhoneCall,
  Mail,
  MapPin,
  ExternalLink,
  CheckCircle,
  Newspaper,
  TrendingUp,
  Activity,
  ArrowRight,
} from 'lucide-react';
import marketLogo from '../services/money market logo no bg.png';

interface FooterProps {
  setActiveTab: (tab: 'home' | 'news' | 'how-to-trade' | 'about' | 'contact') => void;
  onOpenCallDesk: () => void;
  onOpenAlertModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  setActiveTab,
  onOpenCallDesk,
  onOpenAlertModal,
}) => {
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes('@')) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmailInput('');
      setSubscribed(false);
    }, 4000);
  };

  return (
    <footer id="website-footer" className="bg-[#071328] text-slate-300 border-t border-[#162746] pt-14 pb-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top Newsletter & Fast Action Section */}
        <div className="bg-[#0b1c3c] rounded-2xl p-6 sm:p-8 border border-[#1b3464] shadow-xl mb-12 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex flex-col max-w-xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1e6bff]/15 text-[#50d9fe] text-xs font-semibold w-fit mx-auto lg:mx-0 mb-2">
              <Newspaper className="w-3.5 h-3.5" />
              <span>Daily Pre-Market Intelligence Briefing</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Get the MoneyOption Institutional Morning Wire
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Curated macroeconomic sentiment, CBOE volatility skew, and 0DTE options flow analysis delivered daily at 08:30 AM EST.
            </p>
          </div>

          <div className="w-full lg:w-auto">
            {subscribed ? (
              <div className="flex items-center gap-2 bg-[#00C48C]/20 border border-[#00C48C]/40 text-[#00C48C] px-5 py-3 rounded-xl text-sm font-semibold">
                <CheckCircle className="w-5 h-5 flex-shrink-0" />
                <span>Subscribed! You will receive tomorrow's opening bell wire.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 w-full max-w-md">
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Enter your institutional email..."
                  required
                  className="bg-[#050e1f] border border-[#234175] text-white placeholder-slate-500 text-sm px-4 py-2.5 rounded-xl focus:outline-none focus:border-[#1e6bff] flex-grow"
                />
                <button
                  type="submit"
                  className="bg-[#0053d4] hover:bg-[#003fa5] text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 flex-shrink-0 cursor-pointer shadow-md hover:shadow-blue-500/20"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Main 5-Column Sitemap */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12 text-xs">
          {/* Column 1: Brand & Headquarter */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1 flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <img
                alt="MoneyOption Markets Logo"
                className="h-16 w-40 object-contain"
                src={marketLogo}
              />
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Institutional derivatives brokerage and proprietary dealing desk infrastructure connecting market makers, family offices, and professional options traders.
            </p>
            <div className="flex flex-col gap-1.5 text-[11px] text-slate-400 mt-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#50d9fe] flex-shrink-0" />
                <span>Victoria Island Financial District, Lagos, Nigeria</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-[#00C48C] flex-shrink-0" />
                <span>Lagos Data Centre Low-Latency Hub</span>
              </div>
            </div>
          </div>

          {/* Column 2: Navigation & Core Screens */}
          <div className="flex flex-col gap-2.5">
            <span className="font-bold text-white uppercase tracking-wider text-[11px] border-b border-slate-700/50 pb-1.5">
              Website Navigation
            </span>
            <button
              onClick={() => {
                setActiveTab('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-left text-slate-400 hover:text-white transition-colors cursor-pointer flex items-center justify-between"
            >
              <span>Market Dashboard</span>
              <span className="text-[10px] text-[#00C48C]">Live</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('news');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-left text-slate-400 hover:text-white transition-colors cursor-pointer flex items-center justify-between"
            >
              <span>Market News &amp; Wire</span>
              <span className="text-[9px] px-1 bg-[#0053d4] text-white rounded">FBS</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('how-to-trade');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-left text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              Trading Strategies
            </button>
            <button
              onClick={() => {
                setActiveTab('about');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-left text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              About Dealing Desk
            </button>
            <button
              onClick={() => {
                setActiveTab('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-left text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              Contact &amp; Phone Desk
            </button>
          </div>

          {/* Column 3: Markets & Contracts */}
          <div className="flex flex-col gap-2.5">
            <span className="font-bold text-white uppercase tracking-wider text-[11px] border-b border-slate-700/50 pb-1.5">
              Active Markets
            </span>
            <span className="text-slate-400">S&amp;P 500 (SPX 0DTE)</span>
            <span className="text-slate-400">Nasdaq 100 Index (NDX)</span>
            <span className="text-slate-400">G10 Spot FX (EUR/USD, GBP/USD)</span>
            <span className="text-slate-400">Spot Gold Bullion (XAU/USD)</span>
            <span className="text-slate-400">Bitcoin CME &amp; Spot (BTC/USD)</span>
            <span className="text-slate-400">Nigerian Fixed Income &amp; Global Yields</span>
          </div>

          {/* Column 4: Platform & Execution */}
          <div className="flex flex-col gap-2.5">
            <span className="font-bold text-white uppercase tracking-wider text-[11px] border-b border-slate-700/50 pb-1.5">
              Execution Architecture
            </span>
            <button
              onClick={onOpenCallDesk}
              className="text-left text-slate-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <PhoneCall className="w-3 h-3 text-[#00C48C]" />
              <span>Direct Phone Dealing Desk</span>
            </button>
            {onOpenAlertModal && (
              <button
                onClick={onOpenAlertModal}
                className="text-left text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                Price Alert Notification Engine
              </button>
            )}
            <span className="text-slate-400">Low-Latency Lagos Routing</span>
            <span className="text-slate-400">FIX Protocol 4.4 Gateways</span>
            <span className="text-slate-400">Paper Trading Simulation Sandbox</span>
          </div>

          {/* Column 5: Legal & Security */}
          <div className="flex flex-col gap-2.5">
            <span className="font-bold text-white uppercase tracking-wider text-[11px] border-b border-slate-700/50 pb-1.5">
              Custody &amp; Compliance
            </span>
            <div className="flex items-center gap-1.5 text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-[#00C48C]" />
              <span>Segregated Tier-1 Bank Custody</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-400">
              <Lock className="w-3.5 h-3.5 text-[#50d9fe]" />
              <span>256-Bit SSL End-to-End Encryption</span>
            </div>
            <span className="text-slate-400">Best Execution Disclosures</span>
            <span className="text-slate-400">AML / KYC Institutional Screening</span>
            <span className="text-slate-400">SOC-2 Type II Certified Infrastructure</span>
          </div>
        </div>

        {/* Regulatory Risk Disclaimer Bar */}
        <div className="border-t border-[#162746] pt-6 pb-6 text-[10px] text-slate-500 leading-relaxed">
          <p className="mb-2">
            <strong className="text-slate-400">IMPORTANT DERIVATIVES RISK DISCLOSURE:</strong> Trading options, 0DTE contracts, foreign exchange, and complex financial instruments carries a substantial level of risk to your capital and may result in losses that exceed initial margin deposits. Past performance is not indicative of future returns. Market volatility, execution latency, and liquidity constraints can affect order fills. Please ensure that you fully understand the risks involved and seek independent financial or legal advice before executing live contracts.
          </p>
          <p>
            MoneyOption Markets LLC provides market execution, proprietary trading simulation, and dealing desk communication channels. Paper trading accounts utilize simulated liquidity and are designed for strategy analysis and educational risk modeling.
          </p>
        </div>

        {/* Bottom Bar: Copyright & System Health Status */}
        <div className="border-t border-[#162746] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span>&copy; {new Date().getFullYear()} MoneyOption Markets LLC. All rights reserved.</span>
            <span>•</span>
            <span className="text-slate-500">Global Financial Identifier: MOM-NG-LAG</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-[#091730] px-3 py-1 rounded-full border border-[#1b3464]">
              <span className="w-2 h-2 rounded-full bg-[#00C48C] animate-pulse"></span>
              <span className="text-[11px] text-slate-300 font-mono">Lagos Desk: 15.8ms • Systems Normal</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
