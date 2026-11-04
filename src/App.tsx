import React, { useEffect, useRef } from 'react';
import { MobileHeader } from './components/mobile/MobileHeader';
import { BottomNav } from './components/mobile/BottomNav';
import { NotificationToast } from './components/mobile/NotificationToast';
import { TuLuyenView } from './components/mobile/views/TuLuyenView';
import { DongPhuView } from './components/mobile/views/DongPhuView';
import { LinhDienView } from './components/mobile/views/LinhDienView';
import { LuyenDanView } from './components/mobile/views/LuyenDanView';
import { PhuongThiView } from './components/mobile/views/PhuongThiView';
import { useGameStore } from './store/gameStore';

export const App: React.FC = () => {
  const initGame = useGameStore((state) => state.initGame);
  const activeTab = useGameStore((state) => state.activeTab);
  const tickGameLoop = useGameStore((state) => state.tickGameLoop);

  const lastTickTime = useRef(Date.now());

  useEffect(() => {
    initGame();

    // 1-second loop for realtime garden & cultivation
    const interval = setInterval(() => {
      const now = Date.now();
      const delta = (now - lastTickTime.current) / 1000;
      lastTickTime.current = now;
      tickGameLoop(Math.min(delta, 5));
    }, 1000);

    return () => clearInterval(interval);
  }, [initGame, tickGameLoop]);

  return (
    <div className="w-full min-h-screen bg-[#03060c] flex items-center justify-center text-slate-100 select-none antialiased relative overflow-hidden">
      {/* Desktop Background Ambient Mist and Subtle Lights */}
      <div className="hidden md:block absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl animate-pulse-glow" />
      </div>

      {/* Mobile-First Frame (max-w-[430px], rounded and framed on desktop) */}
      <div className="w-full max-w-[430px] min-h-screen md:min-h-0 md:h-[94vh] md:max-h-[920px] md:rounded-3xl bg-[#070d17] flex flex-col justify-between relative shadow-[0_0_60px_rgba(0,0,0,0.9)] md:border md:border-amber-500/40 overflow-hidden">
        {/* Top Header */}
        <MobileHeader />

        {/* Dynamic Tab Content Area matching designs */}
        <main className="flex-1 w-full relative overflow-y-auto overflow-x-hidden">
          {activeTab === 'dong-phu' && <DongPhuView />}
          {activeTab === 'tu-luyen' && <TuLuyenView />}
          {activeTab === 'luyen-dan' && <LuyenDanView />}
          {activeTab === 'linh-dien' && <LinhDienView />}
          {activeTab === 'phuong-thi' && <PhuongThiView />}
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
