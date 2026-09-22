import React from 'react';
import {
  Building2,
  ShieldCheck,
  Zap,
  Globe,
  Award,
  CheckCircle,
  PhoneCall,
  MapPin,
  Lock,
  Cpu,
} from 'lucide-react';

interface AboutScreenProps {
  onOpenCallDesk: () => void;
  onOpenContact: () => void;
}

export const AboutScreen: React.FC<AboutScreenProps> = ({ onOpenCallDesk, onOpenContact }) => {
  return (
    <div id="about-screen" className="flex flex-col w-full max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-16">
      {/* Title */}
      <div className="mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEF4FF] text-[#0053d4] text-xs font-semibold mb-1.5">
          <Building2 className="w-3.5 h-3.5 text-[#00C48C]" />
          <span>Institutional Architecture &amp; Custody</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#0b1b38] tracking-tight">
          About MoneyOption Markets
        </h1>
        <p className="text-xs sm:text-sm text-[#4A5878]">
          Powering institutional traders, proprietary desks, and private wealth with next-generation execution.
        </p>
      </div>

      {/* Hero Visual Card: NYC Dealing Desk */}
      <div className="relative w-full rounded-3xl overflow-hidden shadow-lg border border-[#E2E8F4] mb-8">
        <div className="h-64 sm:h-80 w-full relative">
          <img
            className="w-full h-full object-cover"
            alt="NYC Dealing Desk & Execution Command"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQNN3mFDDyghJxHssXkbe4wSuWdQS81mlIQi6bhzlxcihdbzc3dLKvUMiFqfr7KdvdEOnyRnCO1fmDCwM0GNVMfp8FMEuQuspEeOqcLC7TESAwMwCNWrIXV3T7WfZadL66zcNmmigeJ-KRVWSzrwiDqBxR3lpD3mX8DXS9o7MlQxJCATuJgR58so8jk00wTD8sjeJuGpG8tZmWyTkvjXQi1SBg5L0WGTWivwQtkNmIwDsXHHSOTZfb"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b1b38] via-[#0b1b38]/50 to-transparent flex flex-col justify-end p-6 sm:p-8 text-white">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold w-fit mb-2">
              <MapPin className="w-3.5 h-3.5 text-[#50d9fe]" />
              <span>Wall Street Financial District • Suite 500, NYC</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold">
              NYC Dealing Desk &amp; Execution Command
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 max-w-2xl mt-1">
              Direct physical cross-connects to the Equinix NY4 data center ensure your option orders bypass public internet congestion, executing in sub-20 milliseconds.
            </p>
          </div>
        </div>
      </div>

      {/* 4 Pillars Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="p-5 rounded-2xl bg-white border border-[#E2E8F4] shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-[#EEF4FF] text-[#0053d4] flex items-center justify-center mb-3">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-[#0b1b38] mb-1">Strict Regulatory Custody</h3>
          <p className="text-xs text-[#4A5878] leading-relaxed">
            100% segregated client accounts held at AA-rated Tier-1 institutions, subject to regular external audits.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#E2E8F4] shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-[#E6F8FB] text-[#00677d] flex items-center justify-center mb-3">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-[#0b1b38] mb-1">FPGA Hardware Routing</h3>
          <p className="text-xs text-[#4A5878] leading-relaxed">
            Field-programmable gate array technology handles microsecond order parsing with deterministic execution.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#E2E8F4] shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-[#EEF4FF] text-[#0053d4] flex items-center justify-center mb-3">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-[#0b1b38] mb-1">Human Floor Brokers</h3>
          <p className="text-xs text-[#4A5878] leading-relaxed">
            Skip automated bot scripts. Licensed option desk specialists answer live hotline inquiries in under 30 seconds.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#E2E8F4] shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-[#faf9ff] text-[#4e5d7f] flex items-center justify-center mb-3">
            <Globe className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-[#0b1b38] mb-1">24/7 Global Desk</h3>
          <p className="text-xs text-[#4A5878] leading-relaxed">
            Seamless continuous handover between New York, London, and Tokyo trading shifts for uninterrupted liquidity.
          </p>
        </div>
      </div>

      {/* Global Data Centers & Dealing Hubs */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E8F4] shadow-sm mb-8">
        <h3 className="text-lg font-bold text-[#0b1b38] mb-1">
          Global Dealing Desk Hubs &amp; Low-Latency Cross Connects
        </h3>
        <p className="text-xs text-[#4A5878] mb-6">
          Institutional infrastructure footprint connected via dedicated dark fiber loops.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-[#faf9ff] border border-[#E2E8F4]">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-sm text-[#0b1b38]">New York (HQ)</span>
              <span className="text-[10px] font-bold text-[#00C48C] bg-[#00C48C]/15 px-2 py-0.5 rounded-full">Primary</span>
            </div>
            <div className="text-xs text-[#4A5878] space-y-1">
              <div>Facility: Equinix NY4 (Secaucus)</div>
              <div>Latency: &lt; 14.8 ms</div>
              <div>Desk: 24/7 Option Execution</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#faf9ff] border border-[#E2E8F4]">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-sm text-[#0b1b38]">London</span>
              <span className="text-[10px] font-bold text-[#0053d4] bg-[#EEF4FF] px-2 py-0.5 rounded-full">Active</span>
            </div>
            <div className="text-xs text-[#4A5878] space-y-1">
              <div>Facility: Equinix LD4 (Slough)</div>
              <div>Latency: &lt; 16.5 ms</div>
              <div>Desk: European Indices &amp; FX</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#faf9ff] border border-[#E2E8F4]">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-sm text-[#0b1b38]">Tokyo</span>
              <span className="text-[10px] font-bold text-[#0053d4] bg-[#EEF4FF] px-2 py-0.5 rounded-full">Active</span>
            </div>
            <div className="text-xs text-[#4A5878] space-y-1">
              <div>Facility: Equinix TY3 (Otemachi)</div>
              <div>Latency: &lt; 18.2 ms</div>
              <div>Desk: Asian Equities &amp; Rates</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#faf9ff] border border-[#E2E8F4]">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-sm text-[#0b1b38]">Singapore</span>
              <span className="text-[10px] font-bold text-[#0053d4] bg-[#EEF4FF] px-2 py-0.5 rounded-full">Active</span>
            </div>
            <div className="text-xs text-[#4A5878] space-y-1">
              <div>Facility: Equinix SG1 (Ayer Rajah)</div>
              <div>Latency: &lt; 19.4 ms</div>
              <div>Desk: Commodities &amp; Hedging</div>
            </div>
          </div>
        </div>
      </div>

      {/* Leadership & Direct Contact CTA */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0b1b38] text-white flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#50d9fe]">
            <Lock className="w-3.5 h-3.5" />
            <span>256-Bit Financial Encryption &amp; SIPC Insured</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold">
            Speak directly with our NYC institutional trading desk
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            Have questions regarding volume pricing tiers, FIX API integration, or custody structures? Our licensed desk partners are ready to assist.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onOpenCallDesk}
            className="h-12 px-6 rounded-xl bg-[#1e6bff] hover:bg-[#0053d4] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#1e6bff]/30 transition-all cursor-pointer whitespace-nowrap"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Call Floor Desk</span>
          </button>
          <button
            onClick={onOpenContact}
            className="h-12 px-6 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer whitespace-nowrap border border-slate-700"
          >
            <span>Contact Support Screen</span>
          </button>
        </div>
      </div>
    </div>
  );
};
