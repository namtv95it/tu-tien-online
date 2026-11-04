import React from 'react';
import { useGameStore } from '../../store/gameStore';
import { MobileTab } from '../../types/game';

interface TabItem {
  id: MobileTab;
  label: string;
  icon: string;
  badge?: boolean;
}

const TABS: TabItem[] = [
  { id: 'dong-phu', label: 'Động phủ', icon: '🏯', badge: true },
  { id: 'tu-luyen', label: 'Tu luyện', icon: '🧘' },
  { id: 'luyen-dan', label: 'Luyện đan', icon: '🏺', badge: true },
  { id: 'linh-dien', label: 'Linh điền', icon: '🌿' },
  { id: 'phuong-thi', label: 'Phường thị', icon: '🏮' },
];

export const BottomNav: React.FC = () => {
  const activeTab = useGameStore((state) => state.activeTab);
  const setActiveTab = useGameStore((state) => state.setActiveTab);

  return (
    <nav className="relative z-30 w-full bg-[#08101a]/95 backdrop-blur-md border-t border-amber-600/40 px-1 py-1.5 select-none shadow-[0_-5px_25px_rgba(0,0,0,0.8)]">
      <div className="flex justify-around items-center">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex flex-col items-center justify-center transition-all ${
                isActive
                  ? 'scale-105'
                  : 'text-amber-100/70 hover:text-amber-100 opacity-80'
              }`}
            >
              {/* Active Golden Arch Plaque as in design */}
              {isActive ? (
                <div className="relative px-3 py-1 rounded-t-xl bg-gradient-to-t from-amber-600/40 via-amber-500/20 to-transparent border-t-2 border-x border-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.4)] flex flex-col items-center">
                  {/* Red dot if applicable */}
                  {tab.badge && (
                    <span className="absolute -top-1 right-2 w-2 h-2 rounded-full bg-rose-500 border border-slate-900" />
                  )}
                  <span className="text-xl filter drop-shadow">{tab.icon}</span>
                  <span className="text-[10px] font-bold text-amber-200 mt-0.5 whitespace-nowrap">
                    {tab.label}
                  </span>
                </div>
              ) : (
                <div className="px-2 py-1 flex flex-col items-center">
                  {tab.badge && (
                    <span className="absolute top-0 right-3 w-1.5 h-1.5 rounded-full bg-rose-500" />
                  )}
                  <span className="text-lg opacity-85">{tab.icon}</span>
                  <span className="text-[10px] font-medium text-slate-300 mt-0.5 whitespace-nowrap">
                    {tab.label}
                  </span>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
