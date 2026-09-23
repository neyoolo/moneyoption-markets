import React, { useState } from 'react';
import {
  User,
  PhoneCall,
  Sparkles,
  Bell,
  Newspaper,
  Menu,
  X,
  TrendingUp,
  Building2,
  Headphones,
  Activity,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import marketLogo from '../services/money market logo no bg.png';

interface NavbarProps {
  activeTab: 'home' | 'news' | 'how-to-trade' | 'about' | 'contact';
  setActiveTab: (tab: 'home' | 'news' | 'how-to-trade' | 'about' | 'contact') => void;
  onOpenGetStarted: () => void;
  onOpenCallDesk: () => void;
  onOpenProfile: () => void;
  onOpenAlertModal?: () => void;
  activeAlertsCount?: number;
  virtualBalance: number;
}

interface NavItem {
  id: 'home' | 'news' | 'how-to-trade' | 'about' | 'contact';
  label: string;
  icon: React.ElementType;
  badge?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenGetStarted,
  onOpenCallDesk,
  onOpenProfile,
  onOpenAlertModal,
  activeAlertsCount = 0,
  virtualBalance,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: NavItem[] = [
    { id: 'home', label: 'Dashboard', icon: Activity, badge: '' },
    { id: 'news', label: 'Market News', icon: Newspaper, badge: '' },
    { id: 'how-to-trade', label: 'How to Trade', icon: TrendingUp },
    { id: 'about', label: 'About Desk', icon: Building2 },
    { id: 'contact', label: 'Contact', icon: Headphones },
  ];

  const handleNavClick = (tab: 'home' | 'news' | 'how-to-trade' | 'about' | 'contact') => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      id="main-header"
      className="sticky top-0 w-full z-40 bg-white/95 backdrop-blur-xl border-b border-[#E2E8F4] shadow-[0_2px_12px_rgba(11,28,58,0.04)] transition-all"
    >
      <div className="max-w-7xl mx-auto h-16 px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* Brand & Subtitle */}
        <div
          id="brand-container"
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 min-w-0 cursor-pointer group select-none"
        >
          <img
            alt="MoneyOption Markets Logo"
            className="h-11 w-28 sm:h-12 sm:w-32 object-contain flex-shrink-0 transition-transform group-hover:scale-105"
            src={marketLogo}
          />
          {/* <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-[13px] sm:text-[14px] leading-tight text-[#0b1b38] tracking-wider uppercase font-extrabold truncate">
                MONEYOPTION MARKETS
              </span>
              <span className="hidden xl:inline-block px-1.5 py-0.5 rounded text-[9px] font-bold bg-[#EEF4FF] text-[#0053d4] border border-[#d2e0ff]">
                INSTITUTIONAL
              </span>
            </div>
            <span className="text-[10px] sm:text-[11px] leading-tight text-[#4A5878] truncate font-medium">
              Dealing Desk &amp; Execution Command
            </span>
          </div> */}
        </div>

        {/* Desktop Website Navigation Links */}
        <nav id="desktop-navigation" className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-tab-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`px-3.5 py-2 rounded-xl text-xs xl:text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'text-[#0053d4] bg-[#EEF4FF] shadow-xs'
                    : 'text-[#4A5878] hover:text-[#0b1b38] hover:bg-slate-100/70'
                }`}
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span
                    className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold uppercase tracking-tight ${
                      isActive
                        ? 'bg-[#0053d4] text-white'
                        : 'bg-[#00C48C]/15 text-[#008f65]'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Controls & Account Badge */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          {/* Price Alerts Bell Button */}
          {onOpenAlertModal && (
            <button
              id="header-alerts-btn"
              onClick={onOpenAlertModal}
              className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-slate-100 hover:bg-[#EEF4FF] text-slate-600 hover:text-[#0053d4] border border-slate-200 hover:border-[#b3c5ff] transition-all cursor-pointer"
              title="Set and manage price alerts"
              aria-label="Price Alerts"
            >
              <Bell className="w-4 h-4" />
              {activeAlertsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#00C48C] text-slate-950 font-bold rounded-full text-[9px] flex items-center justify-center shadow-xs">
                  {activeAlertsCount}
                </span>
              )}
            </button>
          )}

          {/* Quick Call Desk Button */}
          {/* <button
            id="header-call-btn"
            onClick={onOpenCallDesk}
            className="hidden sm:flex items-center gap-1.5 h-9 px-3 rounded-xl bg-[#EEF4FF] hover:bg-[#dbe6ff] text-[#0053d4] font-semibold text-xs border border-[#d2e0ff] transition-all cursor-pointer"
            title="Direct link to Dealing Desk"
          >
            <PhoneCall className="w-3.5 h-3.5 text-[#0053d4]" />
            <span>Desk Hotline</span>
          </button> */}

          {/* Paper Trading Balance Chip */}
          {/* <div
            onClick={onOpenProfile}
            className="hidden md:flex flex-col text-right px-2.5 py-1 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 cursor-pointer transition-colors"
            title="Click to view Account & Balance Settings"
          >
            <span className="text-[9px] text-[#4A5878] uppercase font-bold tracking-wider">Demo Equity</span>
            <span className="text-xs font-mono font-bold text-[#00C48C]">
              ${virtualBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
          </div> */}

          {/* Get Started CTA Button */}
          {/* <button
            id="header-get-started-btn"
            onClick={onOpenGetStarted}
            className="h-9 px-3.5 sm:px-4 rounded-xl bg-[#0053d4] hover:bg-[#003fa5] active:scale-[0.98] text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 transition-all shadow-md shadow-blue-500/20 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 hidden sm:inline" />
            <span></span>
          </button> */}

          {/* User Profile Avatar */}
          {/* <button
            id="header-profile-btn"
            onClick={onOpenProfile}
            className="w-9 h-9 rounded-xl bg-[#0b1b38] hover:bg-[#1a2d52] flex items-center justify-center text-white transition-all shadow-xs cursor-pointer"
            title="Institutional Account Settings"
            aria-label="Account Settings"
          >
            <User className="w-4 h-4" />
          </button> */}

          {/* Mobile Hamburger Menu Toggle */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden flex items-center justify-center w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu (Responsive Website Format) */}
      {mobileMenuOpen && (
        <div id="mobile-nav-drawer" className="lg:hidden bg-white border-b border-[#E2E8F4] px-4 pt-3 pb-6 shadow-xl animate-fadeIn">
          <div className="flex flex-col gap-1.5 mb-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#EEF4FF] text-[#0053d4]'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#0053d4]' : 'text-slate-500'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#00C48C]/15 text-[#008f65] font-bold">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick Mobile Action Bar */}
          <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-100">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCallDesk();
              }}
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#EEF4FF] text-[#0053d4] text-xs font-semibold border border-[#d2e0ff]"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Call Desk</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenGetStarted();
              }}
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#0053d4] text-white text-xs font-semibold shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Open Account</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

