import React from 'react';
import { useGameStore } from '../../store/gameStore';

export const Scene2D: React.FC = () => {
  const character = useGameStore((state) => state.character);
  const toggleMeditation = useGameStore((state) => state.toggleMeditation);

  const getAbodeName = (tier: number) => {
    switch (tier) {
      case 2: return 'Tiểu Động Phủ';
      case 3: return 'Linh Phủ Viên Mãn';
      default: return 'Thảo Lư Thanh Tịnh';
    }
  };

  return (
    <div className="relative w-full h-44 sm:h-52 bg-gradient-to-b from-[#09111e] via-[#0e192b] to-[#121a24] overflow-hidden border-b border-yellow-600/30 select-none">
      {/* Moon & Distant Mountain Silhouettes */}
      <div className="absolute top-3 right-6 w-12 h-12 rounded-full bg-gradient-to-tr from-amber-100 to-amber-200/90 shadow-[0_0_25px_rgba(253,230,138,0.4)] opacity-85" />
      
      {/* Mountain outlines in background */}
      <svg className="absolute bottom-0 left-0 w-full h-24 opacity-30 text-slate-800" viewBox="0 0 500 150" preserveAspectRatio="none">
        <path d="M0,150 L50,90 L120,130 L220,60 L340,120 L420,70 L500,150 Z" fill="currentColor" />
      </svg>
      <svg className="absolute bottom-0 left-0 w-full h-16 opacity-45 text-slate-900" viewBox="0 0 500 100" preserveAspectRatio="none">
        <path d="M0,100 L80,50 L180,90 L290,40 L390,80 L500,50 L500,100 Z" fill="currentColor" />
      </svg>

      {/* Decorative Bamboo Leaves on left */}
      <div className="absolute top-2 left-2 text-emerald-600/40 text-4xl transform -rotate-12 pointer-events-none">
        🎋
      </div>

      {/* Center: Meditating Daoist Avatar */}
      <div
        onClick={toggleMeditation}
        className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer group"
      >
        <div className="relative flex items-center justify-center">
          {/* Spiritual Pulsing Aura Ring */}
          {character.isMeditating && (
            <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-cyan-500/20 via-blue-500/30 to-cyan-500/20 animate-pulse blur-md" />
          )}

          {/* Futon / Bồ Đoàn */}
          <div className="absolute -bottom-2 w-20 h-4 bg-amber-900/90 rounded-full border border-amber-600/60 shadow-lg" />

          {/* Daoist Character Silhouette */}
          <div className="relative text-5xl filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] transition-transform group-hover:scale-105">
            🧘
          </div>

          {/* Spiritual Qi Orbs floating */}
          {character.isMeditating && (
            <>
              <span className="absolute -top-3 -left-3 text-cyan-400 text-xs animate-bounce">✨</span>
              <span className="absolute -top-2 -right-3 text-yellow-300 text-xs animate-pulse">✨</span>
            </>
          )}
        </div>

        {/* Status Pill */}
        <div className="mt-3 px-3 py-0.5 rounded-full bg-slate-950/80 border border-yellow-600/40 text-[11px] text-yellow-300 shadow-md flex items-center gap-1.5 backdrop-blur">
          <span className={`w-2 h-2 rounded-full ${character.isMeditating ? 'bg-cyan-400 animate-ping' : 'bg-slate-500'}`} />
          <span>
            {character.isMeditating ? 'Đang Nhập Định Tụ Khí (+0.8/s)' : 'Đang Xuất Định (Chạm để thiền)'}
          </span>
        </div>
      </div>

      {/* Abode Tier Badge on top-left */}
      <div className="absolute top-2.5 left-3 px-2 py-0.5 rounded bg-slate-950/70 border border-slate-700 text-[10px] text-slate-300">
        🏯 {getAbodeName(character.abodeTier)}
      </div>
    </div>
  );
};
