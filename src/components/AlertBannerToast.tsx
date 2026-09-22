import React from 'react';
import { BellRing, X, ArrowUpRight, ArrowDownRight, CheckCircle2 } from 'lucide-react';
import { PriceAlert } from '../types/market';

interface AlertBannerToastProps {
  activeTriggeredAlert: PriceAlert | null;
  onDismiss: () => void;
  onViewAlerts: () => void;
}

export const AlertBannerToast: React.FC<AlertBannerToastProps> = ({
  activeTriggeredAlert,
  onDismiss,
  onViewAlerts,
}) => {
  if (!activeTriggeredAlert) return null;

  return (
    <div
      id="alert-banner-toast"
      className="fixed bottom-20 md:bottom-8 right-4 md:right-8 z-50 max-w-sm w-full bg-[#0b1b38] text-white rounded-2xl p-4 shadow-2xl border border-[#00C48C]/50 animate-slideIn flex flex-col gap-2"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="p-2 rounded-xl bg-[#00C48C]/20 text-[#00C48C] flex-shrink-0 animate-bounce">
            <BellRing className="w-5 h-5" />
          </span>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#00C48C] bg-[#00C48C]/15 px-1.5 py-0.5 rounded">
                Target Reached
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {activeTriggeredAlert.triggeredAt || 'Just now'}
              </span>
            </div>
            <h4 className="text-sm font-bold text-white mt-0.5">
              {activeTriggeredAlert.symbol} hit target!
            </h4>
          </div>
        </div>

        <button
          onClick={onDismiss}
          className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="bg-slate-900/80 rounded-xl p-2.5 text-xs text-slate-300 font-mono flex items-center justify-between border border-slate-800">
        <span>Target:</span>
        <span className="text-[#00C48C] font-bold">
          {activeTriggeredAlert.condition === 'above' ? '≥' : '≤'} $
          {activeTriggeredAlert.targetPrice.toLocaleString(undefined, {
            minimumFractionDigits: 2,
          })}
        </span>
      </div>

      <div className="flex items-center gap-2 pt-1">
        <button
          onClick={() => {
            onDismiss();
            onViewAlerts();
          }}
          className="flex-1 py-1.5 px-3 rounded-lg bg-[#00C48C] hover:bg-[#00a877] text-slate-950 font-bold text-xs flex items-center justify-center gap-1 transition-colors"
        >
          <span>View Alerts</span>
        </button>
        <button
          onClick={onDismiss}
          className="py-1.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-colors"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
};
