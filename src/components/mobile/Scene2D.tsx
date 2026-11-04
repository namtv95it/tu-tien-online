import React, { useState } from 'react';
import { useGameStore } from '../../store/gameStore';
import { CultivatorArt } from './art/CultivatorArt';
import { Sparkles } from 'lucide-react';

interface FloatingNumber {
  id: number;
  x: number;
  y: number;
  text: string;
}

export const Scene2D: React.FC = () => {
  const character = useGameStore((state) => state.character);
  const toggleMeditation = useGameStore((state) => state.toggleMeditation);
  const tickGameLoop = useGameStore((state) => state.tickGameLoop);

  const [floaters, setFloaters] = useState<FloatingNumber[]>([]);

  const handleSceneClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Instant Qi gathering tap reward
    tickGameLoop(3); // +3 seconds worth of qi & tu vi

    const id = Date.now() + Math.random();
    setFloaters((prev) => [...prev, { id, x, y, text: '+Tu Vi' }]);
    setTimeout(() => {
      setFloaters((prev) => prev.filter((f) => f.id !== id));
    }, 900);
  };

  const getAbodeName = (tier: number) => {
    switch (tier) {
      case 2: return 'Tiểu Động Phủ';
      case 3: return 'Linh Phủ';
      default: return 'Thảo Lư';
    }
  };

  return (
    <div
      onClick={handleSceneClick}
      className="relative w-full h-64 sm:h-72 bg-gradient-to-b from-[#050b14] via-[#091322] to-[#0c1829] overflow-hidden border-b border-amber-500/30 select-none cursor-pointer group"
    >
      {/* 1. Misty Ink-wash Mountain Backgrounds */}
      <div className="absolute top-4 right-8 w-16 h-16 rounded-full bg-gradient-to-tr from-amber-100 via-amber-200 to-amber-400 shadow-[0_0_35px_rgba(251,191,36,0.35)] opacity-80 pointer-events-none" />

      {/* Layer 1: Distant Mountains */}
      <svg className="absolute bottom-6 left-0 w-full h-36 opacity-25 text-slate-700 pointer-events-none" viewBox="0 0 500 150" preserveAspectRatio="none">
        <path d="M0,150 L60,80 L140,120 L240,50 L350,110 L430,65 L500,150 Z" fill="currentColor" />
      </svg>
      {/* Layer 2: Mid-ground Peaks & Fog */}
      <svg className="absolute bottom-0 left-0 w-full h-24 opacity-40 text-slate-800 pointer-events-none" viewBox="0 0 500 100" preserveAspectRatio="none">
        <path d="M0,100 L90,40 L190,80 L290,30 L400,70 L500,45 L500,100 Z" fill="currentColor" />
      </svg>

      {/* Floating Misty Clouds */}
      <div className="absolute inset-x-0 bottom-4 h-16 bg-gradient-to-t from-[#0c1829] via-[#0c1829]/60 to-transparent pointer-events-none" />

      {/* 2. Top Scene Status Badges */}
      <div className="absolute top-2.5 left-3 right-3 flex justify-between items-center z-20 pointer-events-none">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/70 border border-amber-500/40 text-[11px] text-amber-300 backdrop-blur shadow">
          <span>🏯 {getAbodeName(character.abodeTier)}</span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleMeditation();
          }}
          className={`pointer-events-auto px-3 py-1 rounded-full text-[11px] font-bold border transition shadow flex items-center gap-1.5 backdrop-blur ${
            character.isMeditating
              ? 'bg-cyan-950/80 border-cyan-400 text-cyan-300'
              : 'bg-slate-900/80 border-slate-700 text-slate-300'
          }`}
        >
          <span className={`w-2 h-2 rounded-full ${character.isMeditating ? 'bg-cyan-400 animate-ping' : 'bg-slate-500'}`} />
          {character.isMeditating ? 'Đang Nhập Định' : 'Xuất Định'}
        </button>
      </div>

      {/* 3. Center: Cultivator Vector Art */}
      <div className="absolute inset-0 flex items-center justify-center pt-2">
        <CultivatorArt
          isMeditating={character.isMeditating}
          realmName={`${character.realm} ${character.realmLevel > 0 ? `Tầng ${character.realmLevel}` : ''}`}
        />
      </div>

      {/* 4. Tap Spiritual Floating Numbers */}
      {floaters.map((f) => (
        <div
          key={f.id}
          style={{ left: f.x, top: f.y }}
          className="absolute pointer-events-none z-30 font-bold text-xs text-amber-300 animate-out fade-out slide-out-to-top duration-700 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] flex items-center gap-0.5"
        >
          <Sparkles className="w-3 h-3 text-amber-400" />
          <span>{f.text}</span>
        </div>
      ))}

      {/* 5. Bottom Tap Hint */}
      <div className="absolute bottom-1.5 inset-x-0 text-center pointer-events-none z-10">
        <span className="text-[10px] text-amber-400/60 font-sans tracking-wide">
          • Chạm vào đạo sĩ để vận khí tụ linh •
        </span>
      </div>
    </div>
  );
};
