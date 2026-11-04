import React from 'react';
import { useGameStore } from '../../store/gameStore';
import { Sparkles, Zap, Coins } from 'lucide-react';

export const MobileHeader: React.FC = () => {
  const character = useGameStore((state) => state.character);
  const attemptBreakthrough = useGameStore((state) => state.attemptBreakthrough);
  const setNotification = useGameStore((state) => state.setNotification);

  const cultivationPercent = Math.min(
    100,
    Math.floor((character.cultivation / character.cultivationThreshold) * 100)
  );

  const canBreakthrough = character.cultivation >= character.cultivationThreshold;

  const handleBreakthrough = () => {
    const res = attemptBreakthrough();
    setNotification(res.message);
  };

  const getAffinityName = (aff: string) => {
    switch (aff) {
      case 'WOOD': return 'Thiên Mộc';
      case 'WATER': return 'Thiên Thủy';
      default: return 'Ngũ Hành';
    }
  };

  return (
    <header className="w-full bg-[#0d1420]/90 backdrop-blur border-b border-yellow-600/30 px-3.5 pt-2.5 pb-2 text-slate-200 select-none shadow-md">
      {/* Top row: Avatar, Name, Realm, Coins */}
      <div className="flex items-center justify-between gap-2.5">
        <div className="flex items-center gap-2.5">
          <div className="relative w-10 h-10 rounded-full bg-slate-900 border border-yellow-500/80 flex items-center justify-center text-xl shadow-inner">
            ☯️
            {character.isMeditating && (
              <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
              </span>
            )}
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-yellow-300 text-sm tracking-wide">{character.name}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-yellow-500/20 text-yellow-400 border border-yellow-500/40 font-medium">
                {character.realm} {character.realmLevel > 0 ? `T${character.realmLevel}` : ''}
              </span>
            </div>
            <div className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
              <span>{getAffinityName(character.affinity)}</span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-400">Đan đạo C{character.alchemyMastery.toFixed(1)}</span>
            </div>
          </div>
        </div>

        {/* Currency & Qi */}
        <div className="text-right flex flex-col items-end gap-0.5">
          <div className="flex items-center gap-1 text-xs text-yellow-400 font-mono font-bold bg-slate-900/80 px-2 py-0.5 rounded border border-yellow-600/30">
            <Coins className="w-3.5 h-3.5 text-yellow-400" />
            <span>{character.coins}</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-cyan-300 font-mono">
            <Zap className="w-3 h-3 text-cyan-400" />
            <span>{Math.floor(character.qi)}/{character.maxQi}</span>
          </div>
        </div>
      </div>

      {/* Cultivation Progress Bar */}
      <div className="mt-2.5">
        <div className="flex justify-between items-center text-[11px] mb-1">
          <span className="text-yellow-400/90 font-medium flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-yellow-400" /> Tiến độ Tu Vi
          </span>
          <span className="text-slate-400 font-mono">
            {Math.floor(character.cultivation)}/{character.cultivationThreshold} ({cultivationPercent}%)
          </span>
        </div>

        <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-yellow-700/40 p-0.5">
          <div
            className={`h-full rounded-full transition-all duration-300 ${
              canBreakthrough
                ? 'bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 animate-pulse'
                : 'bg-gradient-to-r from-amber-600 to-yellow-400'
            }`}
            style={{ width: `${cultivationPercent}%` }}
          />
        </div>

        {/* Breakthrough button banner when ready */}
        {canBreakthrough && (
          <button
            onClick={handleBreakthrough}
            className="w-full mt-2 py-1.5 bg-gradient-to-r from-yellow-500 to-amber-400 hover:from-yellow-400 hover:to-amber-300 text-slate-950 font-bold text-xs rounded transition shadow-lg border border-yellow-200 animate-bounce flex items-center justify-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" /> CẢM ỨNG THIÊN KIẾP - ĐỘT PHÁ CẢNH GIỚI!
          </button>
        )}
      </div>
    </header>
  );
};
