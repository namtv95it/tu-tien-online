import React from 'react';
import { useGameStore } from '../../store/gameStore';
import { ABODE_CATALOG } from '../../data/gameData';
import { Hammer, RotateCw, X, Coins } from 'lucide-react';

export const BuildModePanel: React.FC = () => {
  const isBuildMode = useGameStore((state) => state.isBuildMode);
  const toggleBuildMode = useGameStore((state) => state.toggleBuildMode);
  const selectedDefId = useGameStore((state) => state.selectedDefId);
  const setSelectedDefId = useGameStore((state) => state.setSelectedDefId);
  const rotateBuildObject = useGameStore((state) => state.rotateBuildObject);
  const character = useGameStore((state) => state.character);

  if (!isBuildMode) return null;

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40 w-full max-w-4xl px-4 pointer-events-auto animate-in slide-in-from-bottom-6 duration-200">
      <div className="xianxia-panel rounded-xl p-4 border border-yellow-500/60 shadow-2xl">
        <div className="flex justify-between items-center mb-3 pb-2 border-b border-yellow-500/20">
          <div className="flex items-center gap-2 text-yellow-300 font-bold text-sm">
            <Hammer className="w-4 h-4 text-yellow-400" />
            Chế Độ Kiến Thiết Động Phủ (Lưới 0.5m)
          </div>
          <div className="flex items-center gap-4">
            <div className="text-xs flex items-center gap-1 text-slate-300">
              <Coins className="w-3.5 h-3.5 text-yellow-400" />
              Linh thạch: <span className="text-yellow-400 font-bold font-mono">{character.coins}</span>
            </div>
            <button
              onClick={rotateBuildObject}
              className="py-1 px-3 bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs rounded border border-cyan-800 flex items-center gap-1 transition"
            >
              <RotateCw className="w-3.5 h-3.5" /> Xoay 90°
            </button>
            <button
              onClick={toggleBuildMode}
              className="py-1 px-3 bg-red-950/80 hover:bg-red-900 text-red-200 text-xs rounded border border-red-800 flex items-center gap-1 transition"
            >
              <X className="w-3.5 h-3.5" /> Thoát Xây Dựng
            </button>
          </div>
        </div>

        {/* Catalog Carousel */}
        <div className="flex gap-2.5 overflow-x-auto pb-1">
          {ABODE_CATALOG.map((def) => {
            const isSelected = selectedDefId === def.defId;
            const canAfford = character.coins >= def.costCoins;

            return (
              <button
                key={def.defId}
                onClick={() => setSelectedDefId(def.defId)}
                className={`min-w-[140px] flex-1 p-2.5 rounded-lg border text-left transition flex flex-col justify-between ${
                  isSelected
                    ? 'bg-yellow-500/20 border-yellow-400 text-yellow-200'
                    : 'bg-slate-900/80 border-slate-700/80 hover:border-slate-500 text-slate-300'
                }`}
              >
                <div>
                  <div className="font-semibold text-xs truncate">{def.name}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">{def.description}</div>
                </div>
                <div className="mt-2 text-[11px] font-mono flex items-center gap-1">
                  <span className={canAfford ? 'text-yellow-400 font-bold' : 'text-red-400 font-bold'}>
                    💎 {def.costCoins}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        <div className="text-[11px] text-slate-400 text-center mt-2.5">
          Di chuột trên mặt đất để xem vị trí, nhấp chuột trái để đặt công trình. Nhấp vào đồ đã đặt để thu hồi.
        </div>
      </div>
    </div>
  );
};
