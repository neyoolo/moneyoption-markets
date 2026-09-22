import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, ArrowRight, Zap, TrendingUp } from 'lucide-react';

interface GetStartedModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccountCreated: (name: string, balance: number) => void;
}

export const GetStartedModal: React.FC<GetStartedModalProps> = ({ isOpen, onClose, onAccountCreated }) => {
  const [accountType, setAccountType] = useState<'demo' | 'institutional'>('demo');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('SPX 0DTE Options');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      onAccountCreated(fullName || 'Institutional Trader', accountType === 'demo' ? 100000 : 250000);
      onClose();
      setSubmitted(false);
    }, 1200);
  };

  return (
    <div
      id="get-started-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        id="get-started-modal"
        className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#E2E8F4] relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEF4FF] text-[#0053d4] text-xs font-semibold mb-2">
            <Zap className="w-3.5 h-3.5 text-[#00C48C]" />
            <span>Instant Execution Provisioning</span>
          </div>
          <h2 className="text-2xl font-bold text-[#0b1b38] tracking-tight">
            Open Trading Portal
          </h2>
          <p className="text-sm text-[#4A5878] mt-1">
            Access institutional liquidity, options pricing, and real-time dealing desk support.
          </p>
        </div>

        {submitted ? (
          <div className="py-12 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-[#00C48C]/20 text-[#00C48C] flex items-center justify-center mb-4">
              <CheckCircle2 className="w-10 h-10 animate-bounce" />
            </div>
            <h3 className="text-xl font-bold text-[#0b1b38]">Welcome to MoneyOption Markets!</h3>
            <p className="text-sm text-[#4A5878] mt-1 max-w-sm">
              Your institutional paper trading environment has been activated with $100,000.00 virtual capital.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Account Mode Selection */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setAccountType('demo')}
                className={`p-3.5 rounded-2xl border text-left transition-all ${
                  accountType === 'demo'
                    ? 'border-[#1e6bff] bg-[#EEF4FF] shadow-xs'
                    : 'border-[#E2E8F4] bg-white hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0053d4]">
                    Paper Demo
                  </span>
                  <TrendingUp className="w-4 h-4 text-[#0053d4]" />
                </div>
                <div className="text-sm font-bold text-[#0b1b38]">$100,000 Virtual</div>
                <div className="text-[11px] text-[#4A5878]">Zero financial risk</div>
              </button>

              <button
                type="button"
                onClick={() => setAccountType('institutional')}
                className={`p-3.5 rounded-2xl border text-left transition-all ${
                  accountType === 'institutional'
                    ? 'border-[#1e6bff] bg-[#EEF4FF] shadow-xs'
                    : 'border-[#E2E8F4] bg-white hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#00677d]">
                    Live Institutional
                  </span>
                  <ShieldCheck className="w-4 h-4 text-[#00677d]" />
                </div>
                <div className="text-sm font-bold text-[#0b1b38]">NY4 Direct Feed</div>
                <div className="text-[11px] text-[#4A5878]">DMA & Floor Broker</div>
              </button>
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold text-[#1A1F36] mb-1.5">
                Full Legal Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Alexander Vance"
                className="w-full h-11 px-3.5 rounded-xl border border-[#E2E8F4] bg-slate-50/60 text-sm focus:outline-none focus:bg-white focus:border-[#1e6bff] transition-all"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-[#1A1F36] mb-1.5">
                Corporate or Personal Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex@capitalfund.com"
                className="w-full h-11 px-3.5 rounded-xl border border-[#E2E8F4] bg-slate-50/60 text-sm focus:outline-none focus:bg-white focus:border-[#1e6bff] transition-all"
              />
            </div>

            {/* Product Focus */}
            <div>
              <label className="block text-xs font-semibold text-[#1A1F36] mb-1.5">
                Primary Trading Asset Focus
              </label>
              <select
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
                className="w-full h-11 px-3.5 rounded-xl border border-[#E2E8F4] bg-slate-50/60 text-sm focus:outline-none focus:bg-white focus:border-[#1e6bff] transition-all"
              >
                <option value="SPX 0DTE Options">S&P 500 (SPX) Daily 0DTE Options</option>
                <option value="Nasdaq 100 Mini Options">Nasdaq 100 (NDX) Volatility Options</option>
                <option value="Institutional FX Options">Institutional EUR/USD & Currency Derivatives</option>
                <option value="Commodity Gold Derivatives">Spot Gold (XAU/USD) Flow</option>
                <option value="Multi-Asset Dealing Desk">Full Dealing Desk Multi-Asset Suite</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full h-12 mt-2 rounded-xl bg-[#1e6bff] hover:bg-[#0053d4] active:scale-[0.99] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#1e6bff]/25 transition-all cursor-pointer"
            >
              <span>{accountType === 'demo' ? 'Launch Instant Demo Portal' : 'Request Dealing Desk Verification'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#4A5878]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#00C48C]" />
              <span>Compliant with CFTC, NFA & FINRA institutional data isolation.</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
