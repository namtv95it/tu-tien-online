import React from 'react';
import { useGameStore } from '../../store/gameStore';
import { Sparkles, Backpack, Save, Compass } from 'lucide-react';

export const HUD: React.FC = () => {
  const character = useGameStore((state) => state.character);
  const toggleMeditation = useGameStore((state) => state.toggleMeditation);
  const attemptBreakthrough = useGameStore((state) => state.attemptBreakthrough);
  const setNotification = useGameStore((state) => state.setNotification);
  const setActiveTab = useGameStore((state) => state.setActiveTab);

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
      case 'WOOD': return 'Thiên Mộc Linh Căn';
      case 'WATER': return 'Thiên Thủy Linh Căn';
      default: return 'Ngũ Hành Cân Bằng';
    }
  };

  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4 z-10">
      {/* Top Bar: Character Info & Cultivation Progress */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        {/* Character Card */}
        <div className="pointer-events-auto xianxia-panel rounded-lg p-3.5 flex items-center gap-3.5 min-w-[280px]">
          {/* Avatar Icon */}
          <div className="relative w-14 h-14 rounded-full border-2 border-yellow-500/80 bg-slate-900 flex items-center justify-center text-2xl shadow-inner">
            ☯️
            {character.isMeditating && (
              <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-cyan-500"></span>
              </span>
            )}
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-yellow-300 tracking-wide text-base">{character.name}</span>
              <span className="text-xs px-2 py-0.5 rounded bg-yellow-500/20 text-yellow-300 border border-yellow-500/40">
                {character.realm} {character.realmLevel > 0 ? `Tầng ${character.realmLevel}` : ''}
              </span>
            </div>

            <div className="text-xs text-emerald-400 mt-0.5">
              {getAffinityName(character.affinity)}
            </div>

            {/* Qi bar */}
            <div className="mt-2">
              <div className="flex justify-between text-[11px] text-cyan-300 mb-0.5">
                <span>Linh Lực</span>
                <span>{Math.floor(character.qi)} / {character.maxQi}</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden border border-cyan-800/50">
                <div
                  className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400 transition-all duration-300"
                  style={{ width: `${(character.qi / character.maxQi) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Central Cultivation Progress Bar */}
        <div className="pointer-events-auto xianxia-panel rounded-lg p-3 min-w-[320px] max-w-[420px] mx-auto text-center">
          <div className="flex justify-between items-center text-xs mb-1">
            <span className="text-yellow-400/90 font-medium tracking-wider flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
              Tiến Độ Tu Vi
            </span>
            <span className="text-slate-300 font-mono">
              {Math.floor(character.cultivation)} / {character.cultivationThreshold} ({cultivationPercent}%)
            </span>
          </div>

          {/* Progress bar */}
          <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden border border-yellow-600/40 p-0.5">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                canBreakthrough
                  ? 'bg-gradient-to-r from-yellow-500 via-amber-300 to-yellow-500 animate-pulse'
                  : 'bg-gradient-to-r from-amber-600 to-yellow-500'
              }`}
              style={{ width: `${cultivationPercent}%` }}
            />
          </div>

          {/* Breakthrough Button when ready */}
          {canBreakthrough && (
            <button
              onClick={handleBreakthrough}
              className="mt-2.5 w-full py-1.5 px-3 bg-gradient-to-r from-yellow-600 to-amber-500 hover:from-yellow-500 hover:to-amber-400 text-slate-950 font-bold text-xs rounded transition transform active:scale-95 shadow-lg border border-yellow-300 animate-bounce"
            >
              ⚡ CẢM ỨNG THIÊN KIẾP - ĐỘT PHÁ CẢNH GIỚI ⚡
            </button>
          )}
        </div>

        {/* Currency & Quick Stats */}
        <div className="pointer-events-auto xianxia-panel rounded-lg p-3 flex items-center gap-3">
          <div className="text-right">
            <div className="text-[11px] text-slate-400">Linh Thạch Vụn</div>
            <div className="text-sm font-bold text-yellow-300 font-mono">💎 {character.coins}</div>
          </div>
        </div>
      </div>

      {/* Bottom Area: Controls & Action Bar */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-3">
        {/* Controls Guide */}
        <div className="pointer-events-auto bg-slate-950/70 border border-slate-800 text-slate-400 text-[11px] p-2.5 rounded-lg backdrop-blur">
          <div className="font-semibold text-slate-300 mb-1 flex items-center gap-1">
            <Compass className="w-3.5 h-3.5 text-cyan-400" /> Thao Tác Phím
          </div>
          <div><kbd className="px-1 py-0.5 bg-slate-800 text-slate-200 rounded">W A S D</kbd> Di chuyển</div>
          <div><kbd className="px-1 py-0.5 bg-slate-800 text-slate-200 rounded">Shift</kbd> Chạy nhanh</div>
          <div><kbd className="px-1 py-0.5 bg-slate-800 text-slate-200 rounded">Click Bồ Đoàn</kbd> Tọa thiền / Thu công</div>
        </div>

        {/* Action Buttons */}
        <div className="pointer-events-auto flex items-center gap-2.5">
          {/* Tọa thiền Button */}
          <button
            onClick={toggleMeditation}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-medium transition shadow-md ${
              character.isMeditating
                ? 'bg-cyan-600/30 border-cyan-400 text-cyan-200 hover:bg-cyan-600/40'
                : 'xianxia-panel text-yellow-300 hover:border-yellow-400'
            }`}
          >
            <span className="text-base">🧘</span>
            {character.isMeditating ? 'Thu Công (Đứng Dậy)' : 'Tọa Thiền Tụ Khí'}
          </button>

          {/* Inventory Button */}
          <button
            onClick={() => setActiveTab('inventory')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg xianxia-panel text-slate-200 hover:border-yellow-400 text-sm font-medium transition shadow-md"
          >
            <Backpack className="w-4 h-4 text-emerald-400" />
            Túi Trữ Vật
          </button>

          {/* Save/Load Button */}
          <button
            onClick={() => setActiveTab('abode')}
            className="flex items-center gap-2 px-3 py-2.5 rounded-lg xianxia-panel text-slate-300 hover:border-yellow-400 text-sm font-medium transition shadow-md"
            title="Lưu trữ & Khôi phục dữ liệu"
          >
            <Save className="w-4 h-4 text-yellow-400" />
          </button>
        </div>
      </div>
    </div>
  );
};

