import React from 'react';
import { useGameStore } from '../../store/gameStore';
import { MobileTab } from '../../types/game';
import { ASSETS } from '../../utils/assets';

interface TabItem {
  id: MobileTab;
  label: string;
  image: string;
  badge?: boolean;
}

const TABS: TabItem[] = [
  { id: 'dong-phu', label: 'Động phủ', image: ASSETS.nav.dongPhu, badge: true },
  { id: 'tu-luyen', label: 'Tu luyện', image: ASSETS.nav.tuLuyen },
  { id: 'luyen-dan', label: 'Luyện đan', image: ASSETS.nav.luyenDan, badge: true },
  { id: 'linh-dien', label: 'Linh điền', image: ASSETS.nav.linhDien },
  { id: 'phuong-thi', label: 'Phường thị', image: ASSETS.nav.phuongThi },
];

export const BottomNav: React.FC = () => {
  const activeTab = useGameStore((state) => state.activeTab);
  const setActiveTab = useGameStore((state) => state.setActiveTab);

  return (
    <nav className="relative z-30 w-full bg-[#08101a]/95 backdrop-blur-md border-t border-amber-600/40 px-1 py-1 select-none shadow-[0_-5px_25px_rgba(0,0,0,0.8)]">
      <div className="flex justify-around items-center">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex flex-col items-center justify-center transition-all py-1 px-1.5 ${
                isActive
                  ? 'scale-105'
                  : 'text-amber-100/70 hover:text-amber-100 opacity-75 hover:opacity-100'
              }`}
            >
              {isActive ? (
                <div className="relative px-2.5 py-1 rounded-t-xl bg-gradient-to-t from-amber-600/40 via-amber-500/20 to-transparent border-t-2 border-x border-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.4)] flex flex-col items-center">
                  {tab.badge && (
                    <span className="absolute -top-1 right-1.5 w-2.5 h-2.5 rounded-full bg-rose-500 border border-slate-900 shadow" />
                  )}
                  <img
                    src={tab.image}
                    alt={tab.label}
                    className="w-9 h-9 object-contain drop-shadow-[0_2px_8px_rgba(245,158,11,0.5)]"
                  />
                  <span className="text-[10px] font-bold text-amber-200 mt-0.5 whitespace-nowrap">
                    {tab.label}
                  </span>
                </div>
              ) : (
                <div className="relative px-2 py-1 flex flex-col items-center">
                  {tab.badge && (
                    <span className="absolute top-0 right-1.5 w-2 h-2 rounded-full bg-rose-500/90 shadow" />
                  )}
                  <img
                    src={tab.image}
                    alt={tab.label}
                    className="w-8 h-8 object-contain opacity-85 hover:opacity-100 transition-opacity drop-shadow"
                  />
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
