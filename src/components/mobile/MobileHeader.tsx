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

  const getAffinityBadge = (aff: string) => {
    switch (aff) {
      case 'WOOD': return { name: 'Mộc Linh Căn', color: 'text-emerald-400 border-emerald-500/40 bg-emerald-950/40' };
      case 'WATER': return { name: 'Thủy Linh Căn', color: 'text-cyan-400 border-cyan-500/40 bg-cyan-950/40' };
      default: return { name: 'Ngũ Hành', color: 'text-amber-400 border-amber-500/40 bg-amber-950/40' };
    }
  };

  const aff = getAffinityBadge(character.affinity);

  return (
    <header className="w-full bg-[#070d17]/95 backdrop-blur-md border-b border-amber-500/30 px-3.5 pt-3 pb-2.5 text-slate-200 select-none shadow-lg">
      {/* Top row: Avatar, Name, Realm, Coins */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          {/* Avatar frame */}
          <div className="relative w-11 h-11 rounded-full p-0.5 bg-gradient-to-tr from-amber-600 to-amber-300 shadow-md">
            <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center text-xl">
              ☯️
            </div>
            {character.isMeditating && (
              <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-400"></span>
              </span>
            )}
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="font-bold text-sm tracking-wide xianxia-gold-text">{character.name}</h2>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full font-bold bg-amber-500/20 text-amber-300 border border-amber-500/50">
                {character.realm} {character.realmLevel > 0 ? `T${character.realmLevel}` : ''}
              </span>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
              <span className={`px-1.5 py-0.2 rounded border font-medium ${aff.color}`}>
                {aff.name}
              </span>
              <span>Đan Cấp {character.alchemyMastery.toFixed(1)}</span>
            </div>
          </div>
        </div>

        {/* Currency & Qi Bar */}
        <div className="flex flex-col items-end gap-1">
          <div className="flex items-center gap-1 text-xs text-amber-300 font-mono font-bold bg-amber-950/40 px-2 py-0.5 rounded-full border border-amber-600/40 shadow-inner">
            <Coins className="w-3.5 h-3.5 text-amber-400" />
            <span>{character.coins}</span>
          </div>

          {/* Qi pill */}
          <div className="flex items-center gap-1 text-[10px] text-cyan-300 font-mono">
            <Zap className="w-3 h-3 text-cyan-400" />
            <span>{Math.floor(character.qi)}/{character.maxQi}</span>
          </div>
        </div>
      </div>

      {/* Tu Vi Progress Bar */}
      <div className="mt-2.5">
        <div className="flex justify-between items-center text-[10px] mb-1 font-mono">
          <span className="text-amber-400 font-sans font-semibold flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-400" /> Tu Vi
          </span>
          <span className="text-slate-300">
            {Math.floor(character.cultivation)} / {character.cultivationThreshold} ({cultivationPercent}%)
          </span>
        </div>

        <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-amber-700/40 p-0.5">
          <div
            className={`h-full rounded-full transition-all duration-300 ${
              canBreakthrough
                ? 'bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-400 animate-pulse'
                : 'bg-gradient-to-r from-amber-600 to-amber-400'
            }`}
            style={{ width: `${cultivationPercent}%` }}
          />
        </div>

        {/* Breakthrough Gold Banner when ready */}
        {canBreakthrough && (
          <button
            onClick={handleBreakthrough}
            className="w-full mt-2 py-1.5 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:brightness-110 text-slate-950 font-black text-xs rounded-lg transition shadow-lg border border-amber-200 animate-bounce flex items-center justify-center gap-1.5 tracking-wider"
          >
            ⚡ CẢM ỨNG THIÊN KIẾP - ĐỘT PHÁ CẢNH GIỚI! ⚡
          </button>
        )}
      </div>
    </header>
  );
};
