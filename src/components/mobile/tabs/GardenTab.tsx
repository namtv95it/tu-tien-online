import React, { useState } from 'react';
import { useGameStore } from '../../../store/gameStore';
import { InventoryItem } from '../../../types/game';
import { XianxiaFrame } from '../art/XianxiaFrame';
import { Sprout, Droplets, Sparkles, X, Plus } from 'lucide-react';

export const GardenTab: React.FC = () => {
  const garden = useGameStore((state) => state.garden);
  const inventory = useGameStore((state) => state.inventory);
  const plantSeed = useGameStore((state) => state.plantSeed);
  const waterPlot = useGameStore((state) => state.waterPlot);
  const harvestPlot = useGameStore((state) => state.harvestPlot);

  const [selectedPlotId, setSelectedPlotId] = useState<number | null>(null);

  const availableSeeds = inventory.filter((i) => i.type === 'SEED' && i.quantity > 0);
  const readyCount = garden.filter((p) => p.harvestReady).length;

  const handleSelectSeed = (seed: InventoryItem) => {
    if (selectedPlotId !== null) {
      plantSeed(selectedPlotId, seed);
      setSelectedPlotId(null);
    }
  };

  return (
    <div className="space-y-3 pb-20 animate-in fade-in duration-200">
      {/* Header bar */}
      <div className="flex justify-between items-center px-1">
        <div className="flex items-center gap-1.5 font-bold text-xs text-amber-300">
          <Sprout className="w-4 h-4 text-emerald-400" />
          Dược Thảo Điền
        </div>

        {readyCount > 0 ? (
          <span className="text-[10px] font-bold text-emerald-300 bg-emerald-950/70 border border-emerald-500/50 px-2 py-0.5 rounded-full animate-bounce">
            ✨ {readyCount} Ô đã chín!
          </span>
        ) : (
          <span className="text-[10px] text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
            {garden.filter((p) => p.unlocked).length} Ô Điền
          </span>
        )}
      </div>

      {/* Visual Garden Plots Grid */}
      <div className="grid grid-cols-2 gap-2.5">
        {garden.filter((p) => p.unlocked).map((plot) => (
          <XianxiaFrame
            key={plot.id}
            variant={plot.harvestReady ? 'cyan' : 'default'}
            className="flex flex-col justify-between min-h-[140px]"
          >
            <div>
              {/* Header */}
              <div className="flex justify-between items-center mb-1">
                <span className="text-[11px] font-bold text-amber-300">Ô #{plot.id + 1}</span>
                <span className="text-[10px] text-cyan-300 font-mono flex items-center gap-0.5">
                  <Droplets className="w-3 h-3 text-cyan-400" /> {Math.floor(plot.moisture)}%
                </span>
              </div>

              {/* Plant Visual State */}
              {plot.seedId ? (
                <div className="my-1.5 text-center">
                  {/* Plant Stage Art */}
                  <div className="text-3xl my-1 filter drop-shadow">
                    {plot.harvestReady ? '🌸' : plot.progress > 50 ? '🌿' : '🌱'}
                  </div>

                  <div className="text-xs font-bold text-emerald-300 truncate">
                    {plot.seedName}
                  </div>

                  {/* Progress bar */}
                  <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800 mt-1">
                    <div
                      className={`h-full transition-all duration-300 ${
                        plot.harvestReady ? 'bg-emerald-400' : 'bg-amber-400'
                      }`}
                      style={{ width: `${plot.progress}%` }}
                    />
                  </div>
                </div>
              ) : (
                <div className="my-3 text-center">
                  <span className="text-2xl opacity-40">🟫</span>
                  <div className="text-[10px] text-slate-500 mt-0.5">Đất trống</div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="pt-2 border-t border-slate-800/80">
              {plot.harvestReady ? (
                <button
                  onClick={() => harvestPlot(plot.id)}
                  className="w-full py-1.5 bg-gradient-to-r from-emerald-600 to-green-500 text-slate-950 font-bold text-xs rounded-lg transition shadow animate-pulse flex items-center justify-center gap-1"
                >
                  <Sparkles className="w-3 h-3" /> Thu Hoạch
                </button>
              ) : plot.seedId ? (
                <button
                  onClick={() => waterPlot(plot.id)}
                  className="w-full py-1.5 bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs rounded-lg transition flex items-center justify-center gap-1 border border-cyan-800"
                >
                  <Droplets className="w-3 h-3" /> Tưới Nước
                </button>
              ) : (
                <button
                  onClick={() => setSelectedPlotId(plot.id)}
                  className="w-full py-1.5 bg-amber-600/20 hover:bg-amber-600/30 text-amber-300 text-xs rounded-lg transition flex items-center justify-center gap-1 border border-amber-600/40"
                >
                  <Plus className="w-3 h-3" /> Gieo Hạt
                </button>
              )}
            </div>
          </XianxiaFrame>
        ))}
      </div>

      {/* Seed Selection Modal */}
      {selectedPlotId !== null && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 backdrop-blur-sm p-3">
          <div className="xianxia-card rounded-t-2xl max-w-md w-full p-4 border border-amber-500/50 shadow-2xl animate-in slide-in-from-bottom duration-200">
            <div className="flex justify-between items-center pb-2 border-b border-amber-600/30 mb-3">
              <span className="font-bold text-xs text-amber-300">
                Gieo Hạt Vào Ô #{selectedPlotId + 1}
              </span>
              <button onClick={() => setSelectedPlotId(null)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            {availableSeeds.length > 0 ? (
              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {availableSeeds.map((seed) => (
                  <button
                    key={seed.id}
                    onClick={() => handleSelectSeed(seed)}
                    className="w-full p-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-lg flex items-center justify-between text-left transition"
                  >
                    <div>
                      <div className="font-semibold text-xs text-amber-200">{seed.name}</div>
                      <div className="text-[10px] text-slate-400 line-clamp-1">{seed.description}</div>
                    </div>
                    <div className="text-xs font-mono text-emerald-400 font-bold bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                      x{seed.quantity}
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="py-4 text-center text-xs text-slate-400">
                Túi đã hết hạt giống linh thảo!
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
