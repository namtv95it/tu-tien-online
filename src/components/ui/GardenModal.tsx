import React from 'react';
import { useGameStore } from '../../store/gameStore';
import { X, Sprout, Droplets, Sparkles } from 'lucide-react';

export const GardenModal: React.FC = () => {
  const activeTab = useGameStore((state) => state.activeTab);
  const setActiveTab = useGameStore((state) => state.setActiveTab);
  const garden = useGameStore((state) => state.garden);
  const inventory = useGameStore((state) => state.inventory);
  const plantSeed = useGameStore((state) => state.plantSeed);
  const waterPlot = useGameStore((state) => state.waterPlot);
  const harvestPlot = useGameStore((state) => state.harvestPlot);

  if (activeTab !== 'garden') return null;

  const availableSeeds = inventory.filter((i) => i.type === 'SEED' && i.quantity > 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="xianxia-panel rounded-xl max-w-xl w-full p-5 relative border border-yellow-500/40 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex justify-between items-center pb-3 border-b border-yellow-500/20 mb-4">
          <div className="flex items-center gap-2 text-yellow-300 font-bold text-lg">
            <Sprout className="w-5 h-5 text-emerald-400" />
            Vườn Linh Điền - Dược Thảo Viên
          </div>
          <button
            onClick={() => setActiveTab(null)}
            className="p-1 rounded-md text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-slate-300 mb-4 leading-relaxed">
          Đất linh điền màu mỡ giúp linh thảo sinh trưởng tự nhiên theo thời gian thực. Hãy tưới nước để đảm bảo cây không bị khô hạn.
        </p>

        {/* Plots List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[360px] overflow-y-auto pr-1">
          {garden.map((plot) => (
            <div
              key={plot.id}
              className="bg-slate-900/80 border border-slate-700/70 rounded-lg p-3 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold text-xs text-yellow-200">
                    Linh Điền Ô #{plot.id + 1}
                  </span>
                  <span className="text-[11px] text-cyan-400 flex items-center gap-1 font-mono">
                    <Droplets className="w-3 h-3 text-cyan-400" />
                    {Math.floor(plot.moisture)}% ẩm
                  </span>
                </div>

                {plot.seedId ? (
                  <div className="mt-2">
                    <div className="text-xs text-slate-200 font-medium">{plot.seedName}</div>
                    {/* Progress */}
                    <div className="mt-1.5 flex justify-between text-[11px] text-slate-400 mb-0.5">
                      <span>Sinh trưởng</span>
                      <span>{Math.floor(plot.progress)}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                      <div
                        className={`h-full transition-all duration-300 ${
                          plot.harvestReady ? 'bg-emerald-400' : 'bg-yellow-500'
                        }`}
                        style={{ width: `${plot.progress}%` }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="text-xs text-slate-500 italic mt-3 mb-2">Đất trống, chưa gieo hạt</div>
                )}
              </div>

              {/* Action Buttons for plot */}
              <div className="mt-3 pt-2 border-t border-slate-800 flex gap-2">
                {plot.harvestReady ? (
                  <button
                    onClick={() => harvestPlot(plot.id)}
                    className="w-full py-1.5 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs rounded transition flex items-center justify-center gap-1 shadow animate-pulse"
                  >
                    <Sparkles className="w-3.5 h-3.5" /> Thu Hoạch
                  </button>
                ) : plot.seedId ? (
                  <button
                    onClick={() => waterPlot(plot.id)}
                    className="w-full py-1.5 bg-cyan-700/80 hover:bg-cyan-600 text-white text-xs rounded transition flex items-center justify-center gap-1 border border-cyan-600"
                  >
                    <Droplets className="w-3.5 h-3.5" /> Tưới Nước
                  </button>
                ) : (
                  <div className="w-full">
                    {availableSeeds.length > 0 ? (
                      <select
                        onChange={(e) => {
                          const seed = availableSeeds.find((s) => s.defId === e.target.value);
                          if (seed) plantSeed(plot.id, seed);
                        }}
                        defaultValue=""
                        className="w-full py-1 px-2 bg-slate-800 border border-slate-700 rounded text-xs text-yellow-300 focus:outline-none"
                      >
                        <option value="" disabled>🌱 Chọn hạt giống...</option>
                        {availableSeeds.map((seed) => (
                          <option key={seed.id} value={seed.defId}>
                            {seed.name} (còn {seed.quantity})
                          </option>
                        ))}
                      </select>
                    ) : (
                      <span className="text-[11px] text-slate-500 block text-center py-1">Hết hạt giống</span>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-slate-800 flex justify-end">
          <button
            onClick={() => setActiveTab(null)}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs transition"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
