import React from 'react';
import { useGameStore } from '../../../store/gameStore';
import { ALCHEMY_RECIPES } from '../../../data/gameData';
import { Flame, Sparkles, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';

export const AlchemyTab: React.FC = () => {
  const alchemyBatch = useGameStore((state) => state.alchemyBatch);
  const inventory = useGameStore((state) => state.inventory);
  const character = useGameStore((state) => state.character);
  const startAlchemyBatch = useGameStore((state) => state.startAlchemyBatch);
  const adjustHeat = useGameStore((state) => state.adjustHeat);
  const advanceAlchemyPhase = useGameStore((state) => state.advanceAlchemyPhase);
  const cancelAlchemy = useGameStore((state) => state.cancelAlchemy);

  return (
    <div className="space-y-3 pb-20 animate-in fade-in duration-200">
      {/* Cauldron Title banner */}
      <div className="flex justify-between items-center px-1">
        <div>
          <h3 className="font-bold text-sm text-yellow-300 flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-orange-400" />
            Đan Phòng - Thần Nông Đan Lô
          </h3>
          <p className="text-[11px] text-slate-400">Luyện đan 3 pha: Khai Lô • Khống Hỏa • Ngưng Đan</p>
        </div>
        <span className="text-xs text-yellow-400 font-mono bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
          Cấp {character.alchemyMastery.toFixed(1)}
        </span>
      </div>

      {/* State A: Recipe selection */}
      {!alchemyBatch.active && (
        <div className="space-y-2.5">
          {ALCHEMY_RECIPES.map((recipe) => {
            const canLevel = character.alchemyMastery >= recipe.requiredMastery;
            const canCraft = recipe.ingredients.every((ing) => {
              const item = inventory.find((it) => it.defId === ing.defId);
              return item && item.quantity >= ing.quantity;
            });

            return (
              <div
                key={recipe.id}
                className={`bg-slate-900/90 border rounded-xl p-3 flex flex-col justify-between transition ${
                  canCraft && canLevel
                    ? 'border-slate-700 hover:border-yellow-500/60'
                    : 'border-slate-800/80 opacity-70'
                }`}
              >
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-xs text-yellow-200">{recipe.name}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                      Cấp {recipe.requiredMastery}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mb-2 leading-relaxed">{recipe.description}</p>

                  {/* Ingredients needed */}
                  <div className="bg-slate-950/70 p-2 rounded-lg border border-slate-800/80 text-[11px] space-y-1 mb-2.5">
                    {recipe.ingredients.map((ing) => {
                      const curQty = inventory.find((it) => it.defId === ing.defId)?.quantity || 0;
                      const has = curQty >= ing.quantity;
                      return (
                        <div key={ing.defId} className="flex justify-between">
                          <span className={has ? 'text-slate-300' : 'text-red-400'}>{ing.name}</span>
                          <span className={has ? 'text-emerald-400 font-mono' : 'text-red-400 font-mono'}>
                            {curQty}/{ing.quantity}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <button
                  disabled={!canCraft || !canLevel}
                  onClick={() => startAlchemyBatch(recipe.id)}
                  className={`w-full py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
                    canCraft && canLevel
                      ? 'bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 text-white shadow'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  <Flame className="w-3.5 h-3.5" />
                  {canLevel ? (canCraft ? 'Khai Lô Luyện Đan' : 'Thiếu Dược Liệu') : 'Chưa Đủ Cấp'}
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* State B: Active Batch Minigame */}
      {alchemyBatch.active && alchemyBatch.recipe && (
        <div className="xianxia-panel rounded-xl p-4 border border-yellow-500/50 shadow-2xl">
          {/* Header */}
          <div className="flex justify-between items-center pb-2.5 border-b border-slate-800 mb-3">
            <div>
              <span className="text-[10px] text-orange-400 font-bold uppercase tracking-wider">ĐANG LUYỆN CHẾ</span>
              <h4 className="text-sm font-bold text-yellow-200">{alchemyBatch.recipe.name}</h4>
            </div>
            <span className="text-[10px] px-2.5 py-0.5 rounded-full font-semibold bg-orange-500/20 text-orange-400 border border-orange-500/40">
              {alchemyBatch.phase === 'HEATING' && 'Pha 2: Khống Hỏa'}
              {alchemyBatch.phase === 'CONDENSATION' && 'Pha 3: Ngưng Đan'}
              {alchemyBatch.phase === 'RESULT' && 'Xuất Lò'}
            </span>
          </div>

          {/* Phase 2: Heating */}
          {alchemyBatch.phase === 'HEATING' && (
            <div className="space-y-3.5">
              <p className="text-xs text-slate-300">
                Điều chỉnh ngọn lửa sao cho thanh nhiệt độ nằm trong vùng an toàn (Mục tiêu: {alchemyBatch.targetTemp}°C).
              </p>

              {/* Gauge */}
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-center">
                <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                  <span>Nhiệt độ: <strong className="text-yellow-300 font-mono">{alchemyBatch.currentTemp}°C</strong></span>
                  <span>Điểm hỏa hầu: <strong className="text-emerald-400 font-mono">{alchemyBatch.heatScore}/100</strong></span>
                </div>

                <div className="relative w-full h-5 bg-slate-950 rounded-full overflow-hidden border border-slate-700">
                  {/* Safe Zone */}
                  <div
                    className="absolute top-0 bottom-0 bg-emerald-500/30 border-x border-emerald-400"
                    style={{
                      left: `${Math.max(0, alchemyBatch.targetTemp - alchemyBatch.recipe.fireTolerance)}%`,
                      width: `${alchemyBatch.recipe.fireTolerance * 2}%`,
                    }}
                  />
                  {/* Heat bar */}
                  <div
                    className="h-full bg-gradient-to-r from-orange-500 to-amber-400 transition-all duration-150"
                    style={{ width: `${alchemyBatch.currentTemp}%` }}
                  />
                </div>
              </div>

              {/* Touch Buttons */}
              <div className="flex gap-2.5">
                <button
                  onClick={() => adjustHeat(-6)}
                  className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-cyan-300 font-bold text-xs rounded-xl transition border border-cyan-800 active:scale-95"
                >
                  ❄️ Giảm Lửa (-6°C)
                </button>
                <button
                  onClick={() => adjustHeat(6)}
                  className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-orange-400 font-bold text-xs rounded-xl transition border border-orange-800 active:scale-95"
                >
                  🔥 Thúc Hỏa (+6°C)
                </button>
              </div>

              <button
                onClick={advanceAlchemyPhase}
                className="w-full py-2.5 bg-gradient-to-r from-yellow-600 to-amber-500 hover:from-yellow-500 text-slate-950 font-bold text-xs rounded-xl transition shadow flex items-center justify-center gap-1.5"
              >
                <ArrowRight className="w-4 h-4" /> Dược Lực Đã Hòa - Tiến Vào Ngưng Đan
              </button>
            </div>
          )}

          {/* Phase 3: Condensation */}
          {alchemyBatch.phase === 'CONDENSATION' && (
            <div className="space-y-3.5 text-center py-2">
              <div className="text-4xl animate-spin">☯️</div>
              <h5 className="font-bold text-sm text-cyan-300">Linh Khí Đang Hội Tụ</h5>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                Điểm hỏa hầu đạt {alchemyBatch.heatScore} điểm. Bấm nút dưới để ngưng tụ thành đan hoàn!
              </p>
              <button
                onClick={advanceAlchemyPhase}
                className="w-full py-3 bg-gradient-to-r from-cyan-600 to-emerald-500 text-white font-bold text-xs rounded-xl transition shadow-lg animate-bounce flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-4 h-4" /> KHAI LÔ THU ĐAN!
              </button>
            </div>
          )}

          {/* Result Phase */}
          {alchemyBatch.phase === 'RESULT' && (
            <div className="space-y-3 text-center py-2">
              {alchemyBatch.resultQuality === 'HỎNG MẺ' ? (
                <div className="bg-red-950/60 p-3.5 rounded-xl border border-red-800 text-red-300">
                  <AlertTriangle className="w-7 h-7 mx-auto text-red-400 mb-1" />
                  <h5 className="font-bold text-xs">Mẻ Đan Bị Hỏng!</h5>
                  <p className="text-[11px] text-red-200/80 mt-0.5">Dược liệu hóa thành tro tàn do sai lệch nhiệt.</p>
                </div>
              ) : (
                <div className="bg-emerald-950/60 p-3.5 rounded-xl border border-emerald-600 text-emerald-200">
                  <CheckCircle2 className="w-7 h-7 mx-auto text-emerald-400 mb-1" />
                  <h5 className="font-bold text-sm text-yellow-300">{alchemyBatch.resultPillName}</h5>
                  <p className="text-[11px] text-emerald-300/90 mt-0.5">Đan hoàn đã được chuyển vào Túi Trữ Vật!</p>
                </div>
              )}

              <button
                onClick={cancelAlchemy}
                className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl transition"
              >
                Luyện Mẻ Tiếp Theo
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
