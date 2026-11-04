import React, { useEffect, useRef } from 'react';
import { MobileHeader } from './components/mobile/MobileHeader';
import { Scene2D } from './components/mobile/Scene2D';
import { BottomNav } from './components/mobile/BottomNav';
import { NotificationToast } from './components/mobile/NotificationToast';
import { CultivationTab } from './components/mobile/tabs/CultivationTab';
import { GardenTab } from './components/mobile/tabs/GardenTab';
import { AlchemyTab } from './components/mobile/tabs/AlchemyTab';
import { AbodeTab } from './components/mobile/tabs/AbodeTab';
import { InventoryTab } from './components/mobile/tabs/InventoryTab';
import { useGameStore } from './store/gameStore';

export const App: React.FC = () => {
  const initGame = useGameStore((state) => state.initGame);
  const activeTab = useGameStore((state) => state.activeTab);
  const tickGameLoop = useGameStore((state) => state.tickGameLoop);

  const lastTickTime = useRef(Date.now());

  useEffect(() => {
    initGame();

    // 1-second game loop for realtime garden & cultivation progression
    const interval = setInterval(() => {
      const now = Date.now();
      const delta = (now - lastTickTime.current) / 1000;
      lastTickTime.current = now;
      tickGameLoop(Math.min(delta, 5));
    }, 1000);

    return () => clearInterval(interval);
  }, [initGame, tickGameLoop]);

  return (
    <div className="w-full min-h-screen bg-[#04070c] flex justify-center text-slate-100 select-none antialiased">
      {/* Mobile-First Portrait Frame (max-w-md) */}
      <div className="w-full max-w-md min-h-screen bg-[#080d14] flex flex-col justify-between relative shadow-[0_0_50px_rgba(0,0,0,0.8)] border-x border-slate-900">
        {/* Top Header */}
        <MobileHeader />

        {/* 2D Scenic Atmosphere */}
        <Scene2D />

        {/* Dynamic Tab Content Area */}
        <main className="flex-1 px-3.5 py-3 overflow-y-auto">
          {activeTab === 'cultivation' && <CultivationTab />}
          {activeTab === 'garden' && <GardenTab />}
          {activeTab === 'alchemy' && <AlchemyTab />}
          {activeTab === 'abode' && <AbodeTab />}
          {activeTab === 'inventory' && <InventoryTab />}
        </main>

        {/* Fixed Bottom Navigation Bar */}
        <BottomNav />

        {/* Notification Toast */}
        <NotificationToast />
      </div>
    </div>
  );
};

export default App;
