import React from 'react';
import { useGameStore } from '../../store/gameStore';

export const MobileHeader: React.FC = () => {
  const character = useGameStore((state) => state.character);
  const activeTab = useGameStore((state) => state.activeTab);

  const cultivationPercent = Math.min(
    100,
    Math.floor((character.cultivation / character.cultivationThreshold) * 100)
  );

  return (
    <header className="relative z-30 w-full px-2.5 pt-2 pb-1.5 bg-gradient-to-b from-[#0b1420]/95 via-[#0b1420]/80 to-transparent select-none text-slate-100">
      {/* Top Main Row */}
      <div className="flex items-center justify-between gap-1.5">
        {/* Left: Chibi Avatar & Realm Info */}
        <div className="flex items-center gap-2">
          {/* Avatar with Level Badge */}
          <div className="relative w-12 h-12 shrink-0">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-amber-300 shadow-md bg-slate-900 flex items-center justify-center">
              <span className="text-2xl">👦🏻</span>
            </div>
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[9px] px-1.5 py-0.2 rounded-full bg-slate-950 text-amber-300 border border-amber-400 font-mono font-bold whitespace-nowrap shadow">
              Lv.{character.level}
            </span>
          </div>

          <div>
            <h2 className="font-bold text-xs text-amber-100 tracking-wide">{character.name}</h2>
            {/* Realm Tag with lotus icon & progress bar */}
            <div className="flex items-center gap-1 mt-0.5">
              <span className="text-[10px] text-cyan-300 flex items-center gap-0.5 font-medium">
                🪷 {character.realm} tầng {character.realmLevel}
              </span>
            </div>
            {/* Tiny blue progress bar under realm */}
            <div className="w-24 h-1 bg-slate-900/90 rounded-full overflow-hidden border border-cyan-800/60 mt-0.5">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-cyan-300 transition-all duration-300"
                style={{ width: `${cultivationPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Right: Currencies matching design */}
        <div className="flex flex-col items-end gap-1 font-mono text-[11px]">
          {/* Currency Row 1: Jade Token & Silver Spirit Stones */}
          <div className="flex items-center gap-1.5">
            {/* Jade Token */}
            <div className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-slate-950/70 border border-emerald-500/40 text-emerald-300">
              <span>🟢</span>
              <span className="font-bold">{character.jadeTokens.toLocaleString()}</span>
              <span className="text-amber-400 font-sans font-bold text-[10px] ml-0.5">+</span>
            </div>

            {/* Spirit Stones */}
            <div className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-slate-950/70 border border-slate-600/60 text-slate-200">
              <span>🪙</span>
              <span className="font-bold">{character.spiritStones.toLocaleString()}</span>
              <span className="text-amber-400 font-sans font-bold text-[10px] ml-0.5">+</span>
            </div>

            {/* Gold Ingots */}
            <div className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-slate-950/70 border border-amber-500/50 text-amber-300">
              <span>🟡</span>
              <span className="font-bold">{character.goldIngots}</span>
              <span className="text-amber-400 font-sans font-bold text-[10px] ml-0.5">+</span>
            </div>
          </div>

          {/* Currency Row 2: Stamina (Thể lực) */}
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-950/70 border border-emerald-600/40 text-[10px]">
            <span className="text-emerald-400">⚡ Thể lực</span>
            <span className="font-bold text-slate-100">{character.stamina}/{character.maxStamina}</span>
            <span className="text-amber-400 font-sans font-bold text-[10px] ml-0.5">+</span>
          </div>
        </div>
      </div>

      {/* Sub Header Action Icons (Mail, Notice, Settings) when on relevant tabs */}
      {activeTab !== 'tu-luyen' && (
        <div className="flex justify-end gap-3 px-1 pt-1 text-[10px] text-amber-200/90 font-medium">
          <div className="relative flex flex-col items-center cursor-pointer">
            <span className="text-sm">✉️</span>
            <span className="absolute -top-0.5 right-0 w-2 h-2 rounded-full bg-rose-500" />
            <span className="text-[9px]">Thư</span>
          </div>
          <div className="flex flex-col items-center cursor-pointer">
            <span className="text-sm">📜</span>
            <span className="text-[9px]">Thông báo</span>
          </div>
          <div className="flex flex-col items-center cursor-pointer">
            <span className="text-sm">⚙️</span>
            <span className="text-[9px]">Cài đặt</span>
          </div>
        </div>
      )}
    </header>
  );
};
