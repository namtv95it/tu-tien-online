import React from 'react';
import { useGameStore } from '../../store/gameStore';
import { MobileTab } from '../../types/game';

interface NavItem {
  id: MobileTab;
  label: string;
  icon: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'cultivation', label: 'Tu Luyện', icon: '🧘' },
  { id: 'garden', label: 'Linh Điền', icon: '🌿' },
  { id: 'alchemy', label: 'Lò Đan', icon: '🏺' },
  { id: 'abode', label: 'Động Phủ', icon: '🏯' },
  { id: 'inventory', label: 'Túi Đồ', icon: '🎒' },
];

export const BottomNav: React.FC = () => {
  const activeTab = useGameStore((state) => state.activeTab);
  const setActiveTab = useGameStore((state) => state.setActiveTab);
  const garden = useGameStore((state) => state.garden);

  // Check if any plant is ready to harvest
  const hasHarvestReady = garden.some((p) => p.harvestReady);

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-[#0d1420]/95 backdrop-blur-md border-t border-yellow-600/30 px-2 py-1.5 z-40 select-none shadow-[0_-4px_15px_rgba(0,0,0,0.5)]">
      <div className="flex justify-around items-center">
        {NAV_ITEMS.map((item) => {
          const isActive = activeTab === item.id;
          const showBadge = item.id === 'garden' && hasHarvestReady;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`relative flex flex-col items-center justify-center py-1 px-2.5 rounded-lg transition-all ${
                isActive
                  ? 'text-yellow-300 scale-105 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {/* Badge for ready harvest */}
              {showBadge && (
                <span className="absolute top-0 right-2 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              )}

              <span className="text-xl mb-0.5">{item.icon}</span>
              <span className="text-[10px] tracking-tight">{item.label}</span>

              {/* Active gold underline dot */}
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 mt-0.5 shadow-sm" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

