import React from 'react';
import { X, ShieldCheck, CheckCircle2, RefreshCw, Key, PhoneCall } from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  virtualBalance: number;
  onResetBalance: () => void;
  onOpenCallDesk: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  userName,
  virtualBalance,
  onResetBalance,
  onOpenCallDesk,
}) => {
  if (!isOpen) return null;

  return (
    <div
      id="profile-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        id="profile-modal"
        className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-[#E2E8F4] relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#0053d4] to-[#1e6bff] text-white flex items-center justify-center font-bold text-lg shadow-md">
            {userName.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-base font-bold text-[#0b1b38]">{userName}</h3>
              <span className="p-0.5 rounded-full bg-[#00C48C]/20 text-[#00C48C]">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </span>
            </div>
            <span className="text-xs text-[#4A5878]">Institutional Trader ID: MOM-849102</span>
          </div>
        </div>

        {/* Balance Card */}
        <div className="p-4 rounded-2xl bg-[#F8FAFF] border border-[#E2E8F4] mb-4">
          <div className="flex items-center justify-between text-xs text-[#4A5878] mb-1">
            <span>Virtual Paper Equity</span>
            <span className="text-[#00C48C] font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00C48C]"></span> Active Simulator
            </span>
          </div>
          <div className="text-2xl font-bold font-mono text-[#0b1b38]">
            ${virtualBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <div className="mt-2 pt-2 border-t border-slate-200 flex items-center justify-between text-xs">
            <button
              onClick={onResetBalance}
              className="text-[#0053d4] hover:text-[#003fa5] font-semibold flex items-center gap-1 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset to $100,000</span>
            </button>
            <span className="text-[#4A5878]">Buying Power: 4x Margin</span>
          </div>
        </div>

        {/* Desk Specs List */}
        <div className="space-y-2 mb-5 text-xs">
          <div className="flex justify-between py-2 border-b border-slate-100">
            <span className="text-[#4A5878]">Execution Routing</span>
            <span className="font-semibold text-[#0b1b38]">Equinix NY4 Cross-Connect</span>
          </div>
          <div className="flex justify-between py-2 border-b border-slate-100">
            <span className="text-[#4A5878]">Assigned Dealing Floor</span>
            <span className="font-semibold text-[#0b1b38]">Wall Street Desk 04</span>
          </div>
          <div className="flex justify-between py-2 border-b border-slate-100">
            <span className="text-[#4A5878]">SLA Response Time</span>
            <span className="font-semibold text-[#00C48C]">&lt; 30 seconds guaranteed</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-[#4A5878]">Regulatory Protection</span>
            <span className="font-semibold text-[#0b1b38] flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#0053d4]" />
              SIPC Insured Custody
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2">
          <button
            onClick={() => {
              onClose();
              onOpenCallDesk();
            }}
            className="w-full h-11 rounded-xl bg-[#0053d4] hover:bg-[#003fa5] text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Connect to Dealing Desk Hotline</span>
          </button>
          <button
            onClick={onClose}
            className="w-full h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#4A5878] font-semibold text-xs transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
