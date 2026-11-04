import React, { useState } from 'react';
import { useGameStore } from '../../../store/gameStore';
import { InventoryItem } from '../../../types/game';
import { Sprout, Droplets, Sparkles, X, Plus } from 'lucide-react';

export const GardenTab: React.FC = () => {
  const garden = useGameStore((state) => state.garden);
  const inventory = useGameStore((state) => state.inventory);
  const plantSeed = useGameStore((state) => state.plantSeed);
  const waterPlot = useGameStore((state) => state.waterPlot);
  const harvestPlot = useGameStore((state) => state.harvestPlot);

  const [selectedPlotId, setSelectedPlotId] = useState<number | null>(null);

  const availableSeeds = inventory.filter((i) => i.type === 'SEED' && i.quantity > 0);

  const handleSelectSeed = (seed: InventoryItem) => {
    if (selectedPlotId !== null) {
      plantSeed(selectedPlotId, seed);
      setSelectedPlotId(null);
    }
  };

  return (
    <div className="space-y-3 pb-20 animate-in fade-in duration-200">
      <div className="flex justify-between items-center px-1">
        <div>
          <h3 className="font-bold text-sm text-yellow-300 flex items-center gap-1.5">
            <Sprout className="w-4 h-4 text-emerald-400" />
            Linh Điền Dược Thảo Viên
          </h3>
          <p className="text-[11px] text-slate-400">Trồng và chăm sóc linh thảo thời gian thực</p>
        </div>
        <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
          {garden.filter((p) => p.unlocked).length} Ô Điền
        </span>
      </div>

      {/* Plots Grid */}
      <div className="grid grid-cols-2 gap-2.5">
        {garden.filter((p) => p.unlocked).map((plot) => (
          <div
            key={plot.id}
            className={`bg-slate-900/90 border rounded-xl p-3 flex flex-col justify-between transition ${
              plot.harvestReady
                ? 'border-emerald-500/80 shadow-[0_0_12px_rgba(52,211,153,0.2)]'
                : 'border-slate-700/70'
            }`}
          >
            <div>
              {/* Header */}
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold text-xs text-yellow-300">Ô #{plot.id + 1}</span>
                <span className="text-[10px] text-cyan-300 font-mono flex items-center gap-0.5">
                  <Droplets className="w-3 h-3 text-cyan-400" /> {Math.floor(plot.moisture)}%
                </span>
              </div>

              {/* Plant State */}
              {plot.seedId ? (
                <div className="my-2">
                  <div className="text-xs font-semibold text-emerald-300 truncate">
                    🌿 {plot.seedName}
                  </div>
                  <div className="mt-1 flex justify-between text-[10px] text-slate-400 mb-0.5">
                    <span>Sinh trưởng</span>
                    <span className="font-mono">{Math.floor(plot.progress)}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                    <div
                      className={`h-full transition-all duration-300 ${
                        plot.harvestReady ? 'bg-emerald-400' : 'bg-yellow-400'
                      }`}
                      style={{ width: `${plot.progress}%` }}
                    />
                  </div>
                </div>
              ) : (
                <div className="my-4 text-center">
                  <span className="text-2xl opacity-60">🟫</span>
                  <p className="text-[11px] text-slate-500 mt-0.5">Đất màu trống</p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="mt-2 pt-2 border-t border-slate-800/80">
              {plot.harvestReady ? (
                <button
                  onClick={() => harvestPlot(plot.id)}
                  className="w-full py-1.5 bg-gradient-to-r from-emerald-600 to-green-500 text-slate-950 font-bold text-xs rounded-lg transition shadow-md animate-pulse flex items-center justify-center gap-1"
                >
                  <Sparkles className="w-3.5 h-3.5" /> Thu Hoạch
                </button>
              ) : plot.seedId ? (
                <button
                  onClick={() => waterPlot(plot.id)}
                  className="w-full py-1.5 bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs rounded-lg transition flex items-center justify-center gap-1 border border-cyan-800"
                >
                  <Droplets className="w-3.5 h-3.5" /> Tưới Nước
                </button>
              ) : (
                <button
                  onClick={() => setSelectedPlotId(plot.id)}
                  className="w-full py-1.5 bg-yellow-600/20 hover:bg-yellow-600/30 text-yellow-300 text-xs rounded-lg transition flex items-center justify-center gap-1 border border-yellow-600/40"
                >
                  <Plus className="w-3.5 h-3.5" /> Gieo Hạt
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Seed Selection Modal */}
      {selectedPlotId !== null && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 backdrop-blur-sm p-3">
          <div className="xianxia-panel rounded-t-2xl max-w-md w-full p-4 border border-yellow-500/50 shadow-2xl animate-in slide-in-from-bottom duration-200">
            <div className="flex justify-between items-center pb-2.5 border-b border-yellow-600/30 mb-3">
              <span className="font-bold text-sm text-yellow-300">
                Gieo Hạt Vào Ô Điền #{selectedPlotId + 1}
              </span>
              <button
                onClick={() => setSelectedPlotId(null)}
                className="p-1 rounded text-slate-400 hover:text-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {availableSeeds.length > 0 ? (
              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {availableSeeds.map((seed) => (
                  <button
                    key={seed.id}
                    onClick={() => handleSelectSeed(seed)}
                    className="w-full p-2.5 bg-slate-900/90 hover:bg-slate-800 border border-slate-700 rounded-xl flex items-center justify-between text-left transition"
                  >
                    <div>
                      <div className="font-semibold text-xs text-yellow-200">{seed.name}</div>
                      <div className="text-[10px] text-slate-400 line-clamp-1">{seed.description}</div>
                    </div>
                    <div className="text-xs font-mono text-emerald-400 font-bold bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                      x{seed.quantity}
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="py-6 text-center text-xs text-slate-400">
                Túi trữ vật đã hết hạt giống linh thảo!
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
