import React from 'react';
import { useGameStore } from '../../../store/gameStore';
import { ALCHEMY_RECIPES } from '../../../data/gameData';
import { XianxiaFrame } from '../art/XianxiaFrame';
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
      {/* Title */}
      <div className="flex justify-between items-center px-1">
        <div className="flex items-center gap-1.5 font-bold text-xs text-amber-300">
          <Flame className="w-4 h-4 text-orange-400" />
          Thần Nông Đan Lô
        </div>
        <span className="text-[10px] text-amber-400 font-mono bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
          Đan Đạo Cấp {character.alchemyMastery.toFixed(1)}
        </span>
      </div>

      {/* State 1: Choose recipe */}
      {!alchemyBatch.active && (
        <div className="space-y-2">
          {ALCHEMY_RECIPES.map((recipe) => {
            const canLevel = character.alchemyMastery >= recipe.requiredMastery;
            const canCraft = recipe.ingredients.every((ing) => {
              const item = inventory.find((it) => it.defId === ing.defId);
              return item && item.quantity >= ing.quantity;
            });

            return (
              <XianxiaFrame key={recipe.id} className="p-3">
                <div className="flex justify-between items-start mb-1.5">
                  <div>
                    <h4 className="font-bold text-xs text-amber-200 flex items-center gap-1.5">
                      <span>💊</span> {recipe.name}
                    </h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">{recipe.description}</p>
                  </div>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 shrink-0">
                    Cấp {recipe.requiredMastery}
                  </span>
                </div>

                {/* Compact ingredient chips */}
                <div className="flex flex-wrap gap-1.5 my-2">
                  {recipe.ingredients.map((ing) => {
                    const curQty = inventory.find((it) => it.defId === ing.defId)?.quantity || 0;
                    const has = curQty >= ing.quantity;
                    return (
                      <span
                        key={ing.defId}
                        className={`text-[10px] px-2 py-0.5 rounded border font-mono ${
                          has
                            ? 'bg-slate-900 text-emerald-400 border-emerald-800'
                            : 'bg-red-950/40 text-red-400 border-red-900'
                        }`}
                      >
                        {ing.name} ({curQty}/{ing.quantity})
                      </span>
                    );
                  })}
                </div>

                <button
                  disabled={!canCraft || !canLevel}
                  onClick={() => startAlchemyBatch(recipe.id)}
                  className={`w-full py-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                    canCraft && canLevel
                      ? 'bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 text-white shadow-md active:scale-95'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  <Flame className="w-3.5 h-3.5" />
                  {canLevel ? (canCraft ? 'Khai Lô Luyện Đan' : 'Thiếu Dược Liệu') : 'Chưa Đủ Cấp'}
                </button>
              </XianxiaFrame>
            );
          })}
        </div>
      )}

      {/* State 2: Interactive Alchemy Cauldron Minigame */}
      {alchemyBatch.active && alchemyBatch.recipe && (
        <XianxiaFrame variant="gold" className="p-4 text-center">
          {/* Cauldron Stage Illustration */}
          <div className="relative w-28 h-28 mx-auto my-1 flex items-center justify-center">
            {/* Spiritual Flame */}
            <div className="absolute -bottom-2 text-3xl animate-flame">🔥</div>
            {/* Bronze Cauldron Icon/Art */}
            <div className="relative text-6xl filter drop-shadow-[0_4px_10px_rgba(245,158,11,0.5)]">
              🏺
            </div>
            {alchemyBatch.phase === 'CONDENSATION' && (
              <div className="absolute inset-0 flex items-center justify-center text-3xl animate-spin">
                ☯️
              </div>
            )}
          </div>

          <div className="font-bold text-xs text-amber-200 mt-1">
            Đang luyện: {alchemyBatch.recipe.name}
          </div>

          {/* Phase: Heating */}
          {alchemyBatch.phase === 'HEATING' && (
            <div className="space-y-3 mt-3">
              {/* Temperature Gauge */}
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <div className="flex justify-between text-[11px] mb-1 font-mono">
                  <span>Nhiệt độ: <strong className="text-amber-300">{alchemyBatch.currentTemp}°C</strong></span>
                  <span>Mục tiêu: <strong className="text-emerald-400">{alchemyBatch.targetTemp}°C</strong></span>
                </div>

                <div className="relative w-full h-4 bg-slate-900 rounded-full overflow-hidden border border-slate-700">
                  {/* Safe Zone */}
                  <div
                    className="absolute top-0 bottom-0 bg-emerald-500/40 border-x border-emerald-400"
                    style={{
                      left: `${Math.max(0, alchemyBatch.targetTemp - alchemyBatch.recipe.fireTolerance)}%`,
                      width: `${alchemyBatch.recipe.fireTolerance * 2}%`,
                    }}
                  />
                  {/* Fire Slider */}
                  <div
                    className="h-full bg-gradient-to-r from-orange-500 to-amber-400 transition-all duration-150"
                    style={{ width: `${alchemyBatch.currentTemp}%` }}
                  />
                </div>
              </div>

              {/* Fire Control Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => adjustHeat(-6)}
                  className="flex-1 py-2.5 bg-slate-900 hover:bg-slate-800 text-cyan-300 font-bold text-xs rounded-xl border border-cyan-800 active:scale-95 transition"
                >
                  ❄️ Giảm Lửa (-6°)
                </button>
                <button
                  onClick={() => adjustHeat(6)}
                  className="flex-1 py-2.5 bg-slate-900 hover:bg-slate-800 text-orange-400 font-bold text-xs rounded-xl border border-orange-800 active:scale-95 transition"
                >
                  🔥 Thúc Hỏa (+6°)
                </button>
              </div>

              <button
                onClick={advanceAlchemyPhase}
                className="w-full py-2 bg-gradient-to-r from-amber-600 to-yellow-500 hover:from-amber-500 text-slate-950 font-bold text-xs rounded-xl transition shadow flex items-center justify-center gap-1.5"
              >
                <ArrowRight className="w-3.5 h-3.5" /> Dược Lực Đã Hòa - Ngưng Đan
              </button>
            </div>
          )}

          {/* Phase: Condensation */}
          {alchemyBatch.phase === 'CONDENSATION' && (
            <div className="space-y-3 mt-3">
              <p className="text-xs text-cyan-300 font-medium">Linh khí ngưng tụ, chạm để đúc đan hoàn!</p>
              <button
                onClick={advanceAlchemyPhase}
                className="w-full py-3 bg-gradient-to-r from-cyan-600 to-emerald-500 text-white font-black text-xs rounded-xl transition shadow-lg animate-bounce flex items-center justify-center gap-1.5 tracking-wider"
              >
                <Sparkles className="w-4 h-4" /> XUẤT LÒ THU ĐAN!
              </button>
            </div>
          )}

          {/* Phase: Result */}
          {alchemyBatch.phase === 'RESULT' && (
            <div className="space-y-2.5 mt-3">
              {alchemyBatch.resultQuality === 'HỎNG MẺ' ? (
                <div className="p-3 rounded-xl bg-red-950/60 border border-red-800 text-red-300 text-xs">
                  <AlertTriangle className="w-6 h-6 mx-auto mb-1 text-red-400" />
                  <strong>Luyện đan thất bại!</strong> Dược liệu hóa thành tro tàn.
                </div>
              ) : (
                <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-600 text-emerald-200 text-xs">
                  <CheckCircle2 className="w-6 h-6 mx-auto mb-1 text-emerald-400" />
                  <strong className="text-sm text-amber-300 block">{alchemyBatch.resultPillName}</strong>
                  Đã chuyển vào Túi Trữ Vật!
                </div>
              )}

              <button
                onClick={cancelAlchemy}
                className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl transition"
              >
                Luyện Mẻ Tiếp Theo
              </button>
            </div>
          )}
        </XianxiaFrame>
      )}
    </div>
  );
};
