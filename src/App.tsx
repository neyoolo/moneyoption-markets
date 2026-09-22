import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { MarketTickerBar } from './components/MarketTickerBar';
import { DashboardScreen } from './components/screens/DashboardScreen';
import { NewsScreen } from './components/screens/NewsScreen';
import { HowToTradeScreen } from './components/screens/HowToTradeScreen';
import { AboutScreen } from './components/screens/AboutScreen';
import { ContactScreen } from './components/screens/ContactScreen';
import { CallDeskModal } from './components/CallDeskModal';
import { GetStartedModal } from './components/GetStartedModal';
import { ProfileModal } from './components/ProfileModal';
import { SetAlertModal } from './components/SetAlertModal';
import { AlertBannerToast } from './components/AlertBannerToast';
import { INITIAL_TICKERS, INITIAL_RECENT_FILLS } from './data/mockData';
import { MarketTicker, OrderFill, PriceAlert } from './types/market';
import { triggerBrowserNotification } from './utils/notification';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'news' | 'how-to-trade' | 'about' | 'contact'>('home');
  const [tickers, setTickers] = useState<MarketTicker[]>(INITIAL_TICKERS);
  const [recentFills, setRecentFills] = useState<OrderFill[]>(INITIAL_RECENT_FILLS);
  const [deskLatency, setDeskLatency] = useState<number>(16.2);
  const [virtualBalance, setVirtualBalance] = useState<number>(100000.0);
  const [userName, setUserName] = useState<string>('Alexander Vance');

  // Modal states
  const [isCallDeskOpen, setIsCallDeskOpen] = useState(false);
  const [isGetStartedOpen, setIsGetStartedOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Price Alerts state
  const [isSetAlertOpen, setIsSetAlertOpen] = useState(false);
  const [alertInitialSymbol, setAlertInitialSymbol] = useState<string | undefined>(undefined);
  const [activeTriggeredAlert, setActiveTriggeredAlert] = useState<PriceAlert | null>(null);
  const [alerts, setAlerts] = useState<PriceAlert[]>(() => {
    try {
      const saved = localStorage.getItem('moneyoption_alerts');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [
      {
        id: 'ALT-1',
        symbol: 'SPX 0DTE',
        targetPrice: 5945.0,
        condition: 'above',
        createdPrice: 5938.5,
        createdAt: '10:15:00',
        triggered: false,
      },
      {
        id: 'ALT-2',
        symbol: 'NDX 100',
        targetPrice: 21100.0,
        condition: 'below',
        createdPrice: 21155.0,
        createdAt: '10:14:00',
        triggered: false,
      },
    ];
  });

  // Persist alerts to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('moneyoption_alerts', JSON.stringify(alerts));
    } catch (e) {}
  }, [alerts]);

  // Real-time stochastic price updates simulator (every 2.5s)
  useEffect(() => {
    const interval = setInterval(() => {
      setTickers((prevTickers) =>
        prevTickers.map((ticker) => {
          // 60% chance to wiggle price
          if (Math.random() > 0.4) {
            const variancePercent = (Math.random() - 0.48) * 0.003; // small stochastic wiggle
            const delta = ticker.price * variancePercent;
            const newPrice = Math.max(0.01, ticker.price + delta);
            const newChange = ticker.change + delta;
            const newChangePercent = ticker.changePercent + variancePercent * 100;
            return {
              ...ticker,
              price: newPrice,
              change: newChange,
              changePercent: newChangePercent,
            };
          }
          return ticker;
        })
      );

      // Fluctuate latency slightly (14.0ms - 18.5ms)
      setDeskLatency(14.5 + Math.random() * 3.5);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  // Periodic random institutional fills feed simulator (every 7s)
  useEffect(() => {
    const interval = setInterval(() => {
      const symbols = ['SPX', 'NDX', 'EUR/USD', 'XAU/USD', 'BTC/USD'];
      const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
      const types: ('CALL' | 'PUT')[] = ['CALL', 'PUT'];
      const randomType = types[Math.floor(Math.random() * types.length)];
      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0];

      const newFill: OrderFill = {
        id: `FL-${Math.floor(1000 + Math.random() * 9000)}`,
        time: timeStr,
        symbol: randomSymbol,
        type: randomType,
        strike:
          randomSymbol === 'SPX'
            ? 5920 + Math.floor(Math.random() * 30)
            : randomSymbol === 'NDX'
            ? 21100 + Math.floor(Math.random() * 80)
            : 2750,
        price: +(Math.random() * 25 + 5).toFixed(2),
        contracts: Math.floor(Math.random() * 50 + 5),
        executionMs: Math.floor(12 + Math.random() * 8),
      };

      setRecentFills((prev) => [newFill, ...prev.slice(0, 24)]);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  // Check price alerts against live ticker fluctuations
  useEffect(() => {
    setAlerts((prevAlerts) => {
      let changed = false;
      const updated = prevAlerts.map((alert) => {
        if (alert.triggered) return alert;

        const currentTicker = tickers.find((t) => t.symbol === alert.symbol);
        if (!currentTicker) return alert;

        let isTriggered = false;
        if (alert.condition === 'above' && currentTicker.price >= alert.targetPrice) {
          isTriggered = true;
        } else if (alert.condition === 'below' && currentTicker.price <= alert.targetPrice) {
          isTriggered = true;
        }

        if (isTriggered) {
          changed = true;
          const now = new Date();
          const timeStr = now.toTimeString().split(' ')[0];
          const triggeredAlert: PriceAlert = {
            ...alert,
            triggered: true,
            triggeredAt: timeStr,
            notified: true,
          };

          // Trigger browser notification and audio chime
          triggerBrowserNotification(
            `🎯 Price Alert: ${alert.symbol}`,
            `${alert.symbol} target of $${alert.targetPrice.toLocaleString(undefined, {
              minimumFractionDigits: alert.symbol.includes('EUR') ? 4 : 2,
            })} reached! (Current: $${currentTicker.price.toFixed(
              currentTicker.category === 'forex' ? 4 : 2
            )})`
          );

          // Trigger in-app toast banner
          setActiveTriggeredAlert(triggeredAlert);

          return triggeredAlert;
        }

        return alert;
      });

      return changed ? updated : prevAlerts;
    });
  }, [tickers]);

  // Handle trade simulation execution
  const handleExecuteTrade = (fillData: Omit<OrderFill, 'id' | 'time'>) => {
    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0];
    const newFill: OrderFill = {
      ...fillData,
      id: `USR-${Math.floor(1000 + Math.random() * 9000)}`,
      time: timeStr,
    };

    setRecentFills((prev) => [newFill, ...prev.slice(0, 24)]);

    // Deduct premium or calculate margin
    const tradeCost = fillData.contracts * fillData.price * 100;
    setVirtualBalance((prev) => Math.max(0, prev - tradeCost * 0.05)); // 5% simulated option premium outlay
  };

  const handleAccountCreated = (name: string, balance: number) => {
    setUserName(name);
    setVirtualBalance(balance);
  };

  const handleAddAlert = (
    newAlertData: Omit<PriceAlert, 'id' | 'createdAt' | 'triggered' | 'notified'>
  ) => {
    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0];
    const newAlert: PriceAlert = {
      ...newAlertData,
      id: `ALT-${Date.now().toString().slice(-4)}`,
      createdAt: timeStr,
      triggered: false,
    };
    setAlerts((prev) => [newAlert, ...prev]);
  };

  const handleDeleteAlert = (id: string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  };

  const handleOpenAlertModal = (symbol?: string) => {
    setAlertInitialSymbol(symbol);
    setIsSetAlertOpen(true);
  };

  const renderCurrentScreen = () => {
    switch (activeTab) {
      case 'home':
        return (
          <DashboardScreen
            tickers={tickers}
            recentFills={recentFills}
            deskLatency={deskLatency}
            virtualBalance={virtualBalance}
            onExecuteTrade={handleExecuteTrade}
            onOpenCallDesk={() => setIsCallDeskOpen(true)}
            onOpenAlertModal={handleOpenAlertModal}
            onNavigateToNews={() => setActiveTab('news')}
          />
        );
      case 'news':
        return (
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 pt-4 pb-24 md:pb-12">
            <NewsScreen
              tickers={tickers}
              onExecuteTrade={handleExecuteTrade}
              onOpenCallDesk={() => setIsCallDeskOpen(true)}
              onOpenAlertModal={handleOpenAlertModal}
            />
          </div>
        );
      case 'how-to-trade':
        return (
          <HowToTradeScreen
            onOpenCallDesk={() => setIsCallDeskOpen(true)}
            onNavigateHome={() => setActiveTab('home')}
          />
        );
      case 'about':
        return (
          <AboutScreen
            onOpenCallDesk={() => setIsCallDeskOpen(true)}
            onOpenContact={() => setActiveTab('contact')}
          />
        );
      case 'contact':
      default:
        return <ContactScreen onOpenCallDesk={() => setIsCallDeskOpen(true)} />;
    }
  };

  return (
    <div
      id="app-root"
      className="min-h-screen w-full min-w-0 overflow-x-hidden bg-[#faf9ff] text-[#0b1b38] flex flex-col font-['Inter',sans-serif] selection:bg-blue-100 selection:text-blue-900"
    >
      {/* Top Real-time Financial Ticker Tape with Alert Action */}
      <MarketTickerBar
        tickers={tickers}
        deskLatency={deskLatency}
        onOpenAlertModal={handleOpenAlertModal}
        activeAlertsCount={alerts.filter((a) => !a.triggered).length}
      />

      {/* Full Institutional Website Layout */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenGetStarted={() => setIsGetStartedOpen(true)}
        onOpenCallDesk={() => setIsCallDeskOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenAlertModal={handleOpenAlertModal}
        activeAlertsCount={alerts.filter((a) => !a.triggered).length}
        virtualBalance={virtualBalance}
      />

      {/* Screen Content */}
      <main className="flex-1 flex flex-col">
        {renderCurrentScreen()}
      </main>

      {/* Institutional Multi-Column Website Footer */}
      <Footer
        setActiveTab={setActiveTab}
        onOpenCallDesk={() => setIsCallDeskOpen(true)}
        onOpenAlertModal={handleOpenAlertModal}
      />

      {/* Global Modals */}
      <CallDeskModal
        isOpen={isCallDeskOpen}
        onClose={() => setIsCallDeskOpen(false)}
      />

      <GetStartedModal
        isOpen={isGetStartedOpen}
        onClose={() => setIsGetStartedOpen(false)}
        onAccountCreated={handleAccountCreated}
      />

      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        userName={userName}
        virtualBalance={virtualBalance}
        onResetBalance={() => setVirtualBalance(100000)}
        onOpenCallDesk={() => {
          setIsProfileOpen(false);
          setIsCallDeskOpen(true);
        }}
      />

      {/* Price Alert Engine Modal */}
      <SetAlertModal
        isOpen={isSetAlertOpen}
        onClose={() => setIsSetAlertOpen(false)}
        tickers={tickers}
        alerts={alerts}
        onAddAlert={handleAddAlert}
        onDeleteAlert={handleDeleteAlert}
        initialSymbol={alertInitialSymbol}
      />

      {/* Triggered Price Alert Banner Toast */}
      <AlertBannerToast
        activeTriggeredAlert={activeTriggeredAlert}
        onDismiss={() => setActiveTriggeredAlert(null)}
        onViewAlerts={() => {
          setActiveTriggeredAlert(null);
          setIsSetAlertOpen(true);
        }}
      />
    </div>
  );
}
