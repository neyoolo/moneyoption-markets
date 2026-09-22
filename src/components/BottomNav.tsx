import React from 'react';
import { Home, TrendingUp, Building2, Headphones, Newspaper } from 'lucide-react';

interface BottomNavProps {
  activeTab: 'home' | 'news' | 'how-to-trade' | 'about' | 'contact';
  setActiveTab: (tab: 'home' | 'news' | 'how-to-trade' | 'about' | 'contact') => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  return (
    <nav
      id="mobile-bottom-nav"
      className="fixed bottom-0 left-0 right-0 z-50 pb-[env(safe-area-inset-bottom,0px)] bg-white/90 backdrop-blur-xl border-t border-[#E2E8F4] shadow-[0_-2px_12px_rgba(11,28,58,0.06)]"
    >
      <div className="flex justify-around items-center h-16 max-w-md mx-auto px-1">
        {/* Home Tab */}
        <button
          id="bottom-nav-home"
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] transition-all cursor-pointer ${
            activeTab === 'home'
              ? 'text-[#1e6bff] font-bold scale-105'
              : 'text-[#4A5878] hover:text-[#0b1b38]'
          }`}
        >
          <Home className="w-5 h-5 mb-1" />
          <span className="text-[10px] tracking-tight">Home</span>
        </button>

        {/* Market News Tab - directly beside Home */}
        <button
          id="bottom-nav-news"
          onClick={() => setActiveTab('news')}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] transition-all cursor-pointer ${
            activeTab === 'news'
              ? 'text-[#1e6bff] font-bold scale-105'
              : 'text-[#4A5878] hover:text-[#0b1b38]'
          }`}
        >
          <div className="relative">
            <Newspaper className="w-5 h-5 mb-1" />
            <span className="absolute -top-0.5 -right-1 w-2 h-2 rounded-full bg-[#00C48C] animate-pulse" />
          </div>
          <span className="text-[10px] tracking-tight">News</span>
        </button>

        {/* How to Trade Tab */}
        <button
          id="bottom-nav-how-to-trade"
          onClick={() => setActiveTab('how-to-trade')}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] transition-all cursor-pointer ${
            activeTab === 'how-to-trade'
              ? 'text-[#1e6bff] font-bold scale-105'
              : 'text-[#4A5878] hover:text-[#0b1b38]'
          }`}
        >
          <TrendingUp className="w-5 h-5 mb-1" />
          <span className="text-[10px] tracking-tight">Trade</span>
        </button>

        {/* About Tab */}
        <button
          id="bottom-nav-about"
          onClick={() => setActiveTab('about')}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] transition-all cursor-pointer ${
            activeTab === 'about'
              ? 'text-[#1e6bff] font-bold scale-105'
              : 'text-[#4A5878] hover:text-[#0b1b38]'
          }`}
        >
          <Building2 className="w-5 h-5 mb-1" />
          <span className="text-[10px] tracking-tight">About</span>
        </button>

        {/* Contact Tab */}
        <button
          id="bottom-nav-contact"
          onClick={() => setActiveTab('contact')}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] transition-all cursor-pointer ${
            activeTab === 'contact'
              ? 'text-[#1e6bff] font-bold scale-105'
              : 'text-[#4A5878] hover:text-[#0b1b38]'
          }`}
        >
          <div className="relative">
            <Headphones className="w-5 h-5 mb-1" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#00C48C] animate-pulse"></span>
          </div>
          <span className="text-[10px] tracking-tight">Contact</span>
        </button>
      </div>
    </nav>
  );
};
