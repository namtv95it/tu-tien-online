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

      {/* Mobile-First Frame (aspect-[941/1672], max-w-[430px]) */}
      <div className="w-full max-w-[430px] aspect-[941/1672] h-screen max-h-[96vh] md:rounded-3xl bg-[#070d17] relative shadow-[0_0_60px_rgba(0,0,0,0.9)] md:border md:border-amber-500/40 overflow-hidden">
        {/* Dynamic Tab Content Area matching designs */}
        <main className="w-full h-full relative overflow-hidden">
          {activeTab === 'dong-phu' && <DongPhuView />}
          {activeTab === 'tu-luyen' && <TuLuyenView />}
          {activeTab === 'luyen-dan' && <LuyenDanView />}
          {activeTab === 'linh-dien' && <LinhDienView />}
          {activeTab === 'phuong-thi' && <PhuongThiView />}
        </main>

        {/* Top Header Floating Overlay */}
        <MobileHeader />

        {/* Fixed Bottom Navigation Bar Floating Overlay */}
        <BottomNav />

        {/* Notification Toast */}
        <NotificationToast />
      </div>
    </div>
  );
};

export default App;
