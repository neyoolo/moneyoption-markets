import React, { useState, useEffect } from 'react';
import {
  Bell,
  BellRing,
  X,
  TrendingUp,
  TrendingDown,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Volume2,
  Sparkles,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';
import { MarketTicker, PriceAlert } from '../types/market';
import {
  requestNotificationPermission,
  getNotificationPermission,
  triggerBrowserNotification,
} from '../utils/notification';

interface SetAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  tickers: MarketTicker[];
  alerts: PriceAlert[];
  onAddAlert: (newAlert: Omit<PriceAlert, 'id' | 'createdAt' | 'triggered' | 'notified'>) => void;
  onDeleteAlert: (id: string) => void;
  initialSymbol?: string;
}

export const SetAlertModal: React.FC<SetAlertModalProps> = ({
  isOpen,
  onClose,
  tickers,
  alerts,
  onAddAlert,
  onDeleteAlert,
  initialSymbol,
}) => {
  const [selectedSymbol, setSelectedSymbol] = useState<string>(initialSymbol || tickers[0]?.symbol || 'SPX 0DTE');
  const [condition, setCondition] = useState<'above' | 'below'>('above');
  const [targetPrice, setTargetPrice] = useState<string>('');
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Sync selected symbol if initialSymbol changes
  useEffect(() => {
    if (initialSymbol) {
      setSelectedSymbol(initialSymbol);
    }
  }, [initialSymbol]);

  // Check notification permission on mount
  useEffect(() => {
    setPermission(getNotificationPermission());
  }, [isOpen]);

  const selectedTicker = tickers.find((t) => t.symbol === selectedSymbol) || tickers[0];

  // Initialize target price when selected ticker changes
  useEffect(() => {
    if (selectedTicker && !targetPrice) {
      // Default to +0.5% above current price
      const defaultTarget =
        selectedTicker.category === 'forex'
          ? (selectedTicker.price * 1.002).toFixed(4)
          : (selectedTicker.price * 1.005).toFixed(2);
      setTargetPrice(defaultTarget);
    }
  }, [selectedTicker]);

  if (!isOpen) return null;

  const handleRequestPermission = async () => {
    const perm = await requestNotificationPermission();
    setPermission(perm);
    if (perm === 'granted') {
      triggerBrowserNotification(
        '🔔 MoneyOption Alerts Active',
        'Browser notifications are now enabled for real-time market price levels.'
      );
    }
  };

  const handleQuickPercent = (pct: number) => {
    if (!selectedTicker) return;
    const newPrice = selectedTicker.price * (1 + pct / 100);
    setCondition(pct >= 0 ? 'above' : 'below');
    setTargetPrice(
      selectedTicker.category === 'forex'
        ? newPrice.toFixed(4)
        : newPrice.toFixed(2)
    );
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsedTarget = parseFloat(targetPrice);
    if (isNaN(parsedTarget) || parsedTarget <= 0) return;

    // If permission is still default, prompt for it
    if (permission === 'default') {
      const perm = await requestNotificationPermission();
      setPermission(perm);
    }

    onAddAlert({
      symbol: selectedSymbol,
      targetPrice: parsedTarget,
      condition,
      createdPrice: selectedTicker?.price || parsedTarget,
    });

    setSuccessToast(`Alert Armed: ${selectedSymbol} ${condition === 'above' ? '≥' : '≤'} ${parsedTarget}`);
    setTimeout(() => setSuccessToast(null), 3500);
  };

  const handleTestNotification = () => {
    triggerBrowserNotification(
      `🎯 Test Alert Triggered: ${selectedSymbol}`,
      `Current price is testing notifications. Target condition reached!`
    );
    setSuccessToast('Test alert triggered with audio chime!');
    setTimeout(() => setSuccessToast(null), 3000);
  };

  return (
    <div
      id="set-alert-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        id="set-alert-modal"
        className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-[#E2E8F4] relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEF4FF] text-[#0053d4] text-xs font-semibold mb-2">
            <BellRing className="w-3.5 h-3.5 text-[#00C48C]" />
            <span>Market Price Alert Engine</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#0b1b38] tracking-tight">
            Set Ticker Price Alert
          </h2>
          <p className="text-xs sm:text-sm text-[#4A5878] mt-0.5">
            Monitor real-time ticker tape fluctuations and receive desktop browser notifications.
          </p>
        </div>

        {/* Success Toast */}
        {successToast && (
          <div className="mb-4 p-3 rounded-xl bg-[#00C48C]/15 border border-[#00C48C]/30 text-[#008f65] text-xs font-semibold flex items-center justify-between animate-slideIn">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>{successToast}</span>
            </div>
            <button onClick={() => setSuccessToast(null)} className="text-[#008f65] hover:text-[#005a40]">
              &times;
            </button>
          </div>
        )}

        {/* Browser Permission Status Pill */}
        <div className="mb-5 p-3 rounded-2xl bg-[#faf9ff] border border-[#E2E8F4] flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 min-w-0">
            {permission === 'granted' ? (
              <span className="p-1 rounded-full bg-[#00C48C]/20 text-[#00C48C] flex-shrink-0">
                <CheckCircle2 className="w-4 h-4" />
              </span>
            ) : permission === 'denied' ? (
              <span className="p-1 rounded-full bg-amber-500/20 text-amber-600 flex-shrink-0">
                <AlertCircle className="w-4 h-4" />
              </span>
            ) : (
              <span className="p-1 rounded-full bg-[#1e6bff]/20 text-[#1e6bff] flex-shrink-0">
                <Bell className="w-4 h-4" />
              </span>
            )}
            <div className="truncate">
              <span className="font-bold text-[#0b1b38]">
                {permission === 'granted'
                  ? 'Browser Notifications Enabled'
                  : permission === 'denied'
                  ? 'In-App Audio & Banner Alerts'
                  : 'Browser Notifications Required'}
              </span>
              <p className="text-[11px] text-[#4A5878] truncate">
                {permission === 'granted'
                  ? 'Target levels will trigger native OS desktop banners.'
                  : permission === 'denied'
                  ? 'Browser permission blocked; in-app chimes will fire.'
                  : 'Click below to grant Notifications permission.'}
              </p>
            </div>
          </div>

          {permission !== 'granted' && (
            <button
              type="button"
              onClick={handleRequestPermission}
              className="px-3 py-1.5 rounded-xl bg-[#0053d4] hover:bg-[#003fa5] text-white text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex-shrink-0 ml-2"
            >
              Enable
            </button>
          )}
        </div>

        {/* Alert Setup Form */}
        <form onSubmit={handleFormSubmit} className="flex flex-col gap-4 mb-6">
          {/* Asset Selection */}
          <div>
            <label className="block text-xs font-semibold text-[#1A1F36] mb-1.5">
              Select Ticker Asset
            </label>
            <select
              value={selectedSymbol}
              onChange={(e) => {
                const newSym = e.target.value;
                setSelectedSymbol(newSym);
                const t = tickers.find((tick) => tick.symbol === newSym);
                if (t) {
                  setTargetPrice(
                    t.category === 'forex'
                      ? (t.price * 1.002).toFixed(4)
                      : (t.price * 1.005).toFixed(2)
                  );
                }
              }}
              className="w-full h-11 px-3.5 rounded-xl border border-[#E2E8F4] bg-slate-50/70 text-sm font-semibold focus:outline-none focus:bg-white focus:border-[#1e6bff] transition-all"
            >
              {tickers.map((ticker) => (
                <option key={ticker.symbol} value={ticker.symbol}>
                  {ticker.symbol} — {ticker.name} (Current: ${ticker.price.toFixed(ticker.category === 'forex' ? 4 : 2)})
                </option>
              ))}
            </select>
          </div>

          {/* Current Spot Price Display */}
          {selectedTicker && (
            <div className="p-3 rounded-xl bg-[#EEF4FF]/50 border border-[#b3c5ff]/40 flex items-center justify-between text-xs">
              <span className="text-[#4A5878]">Current Market Price:</span>
              <span className="font-mono font-bold text-sm text-[#0053d4]">
                ${selectedTicker.price.toFixed(selectedTicker.category === 'forex' ? 4 : 2)}
              </span>
            </div>
          )}

          {/* Condition: Rises Above vs Drops Below */}
          <div>
            <label className="block text-xs font-semibold text-[#1A1F36] mb-1.5">
              Trigger Condition
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setCondition('above')}
                className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  condition === 'above'
                    ? 'border-[#00C48C] bg-[#00C48C]/10 text-[#008f65] shadow-xs'
                    : 'border-[#E2E8F4] bg-white text-[#4A5878] hover:bg-slate-50'
                }`}
              >
                <TrendingUp className="w-4 h-4" />
                <span>Price Rises (≥)</span>
              </button>

              <button
                type="button"
                onClick={() => setCondition('below')}
                className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  condition === 'below'
                    ? 'border-[#FF3B30] bg-[#FF3B30]/10 text-[#cf271e] shadow-xs'
                    : 'border-[#E2E8F4] bg-white text-[#4A5878] hover:bg-slate-50'
                }`}
              >
                <TrendingDown className="w-4 h-4" />
                <span>Price Drops (≤)</span>
              </button>
            </div>
          </div>

          {/* Target Price Input */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-[#1A1F36]">
                Target Price Level ($)
              </label>
              <div className="flex items-center gap-1">
                {[-1.0, -0.5, 0.5, 1.0].map((pct) => (
                  <button
                    key={pct}
                    type="button"
                    onClick={() => handleQuickPercent(pct)}
                    className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-slate-100 hover:bg-[#EEF4FF] hover:text-[#0053d4] text-slate-600 transition-colors"
                  >
                    {pct > 0 ? `+${pct}%` : `${pct}%`}
                  </button>
                ))}
              </div>
            </div>
            <div className="relative">
              <input
                type="number"
                step="any"
                required
                value={targetPrice}
                onChange={(e) => setTargetPrice(e.target.value)}
                placeholder="Enter target price..."
                className="w-full h-11 pl-4 pr-16 rounded-xl border border-[#E2E8F4] bg-slate-50/70 text-sm font-mono font-bold focus:outline-none focus:bg-white focus:border-[#1e6bff] transition-all"
              />
              <span className="absolute right-3.5 top-3 text-xs font-semibold text-[#4A5878] uppercase">
                USD
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-1">
            <button
              type="submit"
              className="flex-1 h-11 rounded-xl bg-[#1e6bff] hover:bg-[#0053d4] active:scale-[0.98] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md shadow-[#1e6bff]/25 transition-all cursor-pointer"
            >
              <Bell className="w-4 h-4" />
              <span>Arm Price Alert</span>
            </button>
            <button
              type="button"
              onClick={handleTestNotification}
              className="px-3.5 h-11 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#4A5878] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              title="Test browser notification sound & banner"
            >
              <Volume2 className="w-4 h-4" />
              <span className="hidden sm:inline">Test Alert</span>
            </button>
          </div>
        </form>

        {/* Existing Alerts Section */}
        <div className="pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#0b1b38] flex items-center gap-1.5">
              <Bell className="w-3.5 h-3.5 text-[#0053d4]" />
              <span>Active &amp; Triggered Alerts ({alerts.length})</span>
            </h3>
            {alerts.length > 0 && (
              <span className="text-[11px] text-[#4A5878]">
                {alerts.filter((a) => !a.triggered).length} armed
              </span>
            )}
          </div>

          {alerts.length === 0 ? (
            <div className="py-6 text-center text-xs text-[#737687] bg-slate-50 rounded-2xl border border-dashed border-slate-200">
              No price alerts currently armed. Set a target price above to monitor real-time ticks.
            </div>
          ) : (
            <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-1">
              {alerts.map((alert) => {
                const currentT = tickers.find((t) => t.symbol === alert.symbol);
                const currentPrice = currentT?.price || alert.createdPrice;
                const distPercent =
                  currentPrice > 0
                    ? (((alert.targetPrice - currentPrice) / currentPrice) * 100).toFixed(2)
                    : '0';

                return (
                  <div
                    key={alert.id}
                    className={`p-3 rounded-xl border text-xs flex items-center justify-between transition-all ${
                      alert.triggered
                        ? 'bg-[#00C48C]/10 border-[#00C48C]/40 text-[#008f65]'
                        : 'bg-white border-[#E2E8F4] text-[#0b1b38]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span
                        className={`p-1.5 rounded-lg flex-shrink-0 ${
                          alert.triggered
                            ? 'bg-[#00C48C]/20 text-[#00C48C]'
                            : alert.condition === 'above'
                            ? 'bg-[#00C48C]/15 text-[#008f65]'
                            : 'bg-[#FF3B30]/15 text-[#cf271e]'
                        }`}
                      >
                        {alert.triggered ? (
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        ) : alert.condition === 'above' ? (
                          <TrendingUp className="w-3.5 h-3.5" />
                        ) : (
                          <TrendingDown className="w-3.5 h-3.5" />
                        )}
                      </span>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-sm">{alert.symbol}</span>
                          <span className="font-mono text-xs">
                            {alert.condition === 'above' ? '≥' : '≤'} ${alert.targetPrice.toFixed(alert.symbol.includes('EUR') ? 4 : 2)}
                          </span>
                        </div>
                        <div className="text-[11px] text-[#4A5878]">
                          {alert.triggered ? (
                            <span className="text-[#00C48C] font-semibold">
                              Triggered at {alert.triggeredAt || 'just now'}
                            </span>
                          ) : (
                            <span>
                              Current: ${currentPrice.toFixed(alert.symbol.includes('EUR') ? 4 : 2)} ({distPercent > '0' ? `+${distPercent}%` : `${distPercent}%`})
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => onDeleteAlert(alert.id)}
                      className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer flex-shrink-0"
                      title="Remove Alert"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
