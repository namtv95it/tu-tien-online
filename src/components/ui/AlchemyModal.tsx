import React from 'react';
import { useGameStore } from '../../store/gameStore';
import { ALCHEMY_RECIPES } from '../../data/gameData';
import { Flame, X, CheckCircle2, AlertTriangle, Sparkles, ArrowRight } from 'lucide-react';

export const AlchemyModal: React.FC = () => {
  const activeTab = useGameStore((state) => state.activeTab);
  const setActiveTab = useGameStore((state) => state.setActiveTab);
  const alchemyBatch = useGameStore((state) => state.alchemyBatch);
  const inventory = useGameStore((state) => state.inventory);
  const character = useGameStore((state) => state.character);
  const startAlchemyBatch = useGameStore((state) => state.startAlchemyBatch);
  const adjustHeat = useGameStore((state) => state.adjustHeat);
  const advanceAlchemyPhase = useGameStore((state) => state.advanceAlchemyPhase);
  const cancelAlchemy = useGameStore((state) => state.cancelAlchemy);

  if (activeTab !== 'alchemy') return null;

  const handleClose = () => {
    cancelAlchemy();
    setActiveTab(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4">
      <div className="xianxia-panel rounded-xl max-w-2xl w-full p-6 relative border border-yellow-500/50 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex justify-between items-center pb-3 border-b border-yellow-500/20 mb-4">
          <div className="flex items-center gap-2 text-yellow-300 font-bold text-lg tracking-wide">
            <Flame className="w-6 h-6 text-orange-500 animate-pulse" />
            Đan Phòng - Thần Nông Đan Lô
          </div>
          <button
            onClick={handleClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* State: Not in active batch -> Choose Recipe */}
        {!alchemyBatch.active && (
          <div>
            <div className="flex justify-between items-center text-xs text-slate-400 mb-3">
              <span>Chọn Đan Phương để khai lò luyện chế:</span>
              <span className="text-yellow-400">Trình độ đan đạo: Cấp {character.alchemyMastery.toFixed(1)}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[420px] overflow-y-auto pr-1">
              {ALCHEMY_RECIPES.map((recipe) => {
                const canCraft = recipe.ingredients.every((ing) => {
                  const item = inventory.find((it) => it.defId === ing.defId);
                  return item && item.quantity >= ing.quantity;
                });
                const canLevel = character.alchemyMastery >= recipe.requiredMastery;

                return (
                  <div
                    key={recipe.id}
                    className={`bg-slate-900/90 border rounded-lg p-3.5 flex flex-col justify-between transition ${
                      canCraft && canLevel
                        ? 'border-slate-700 hover:border-yellow-500/60'
                        : 'border-slate-800/80 opacity-60'
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-sm text-yellow-200">{recipe.name}</span>
                        <span className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                          Cấp {recipe.requiredMastery}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mb-2.5 leading-relaxed">{recipe.description}</p>

                      {/* Ingredients */}
                      <div className="text-[11px] space-y-1 mb-3 bg-slate-950/60 p-2 rounded border border-slate-800">
                        <div className="text-slate-400 font-medium">Dược liệu cần có:</div>
                        {recipe.ingredients.map((ing) => {
                          const currentQty = inventory.find((it) => it.defId === ing.defId)?.quantity || 0;
                          const hasEnough = currentQty >= ing.quantity;
                          return (
                            <div key={ing.defId} className="flex justify-between">
                              <span className={hasEnough ? 'text-slate-300' : 'text-red-400'}>
                                {ing.name}
                              </span>
                              <span className={hasEnough ? 'text-emerald-400 font-mono' : 'text-red-400 font-mono'}>
                                {currentQty}/{ing.quantity}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <button
                      disabled={!canCraft || !canLevel}
                      onClick={() => startAlchemyBatch(recipe.id)}
                      className={`w-full py-2 rounded text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
                        canCraft && canLevel
                          ? 'bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white shadow-md'
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
          </div>
        )}

        {/* State: Active Batch -> Interactive 3-Phase Minigame */}
        {alchemyBatch.active && alchemyBatch.recipe && (
          <div className="bg-slate-950/80 p-5 rounded-xl border border-yellow-600/40">
            {/* Phase header */}
            <div className="flex justify-between items-center pb-3 border-b border-slate-800 mb-4">
              <div>
                <span className="text-xs text-orange-400 font-medium tracking-wider">ĐANG LUYỆN CHẾ</span>
                <h3 className="text-base font-bold text-yellow-200">{alchemyBatch.recipe.name}</h3>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    alchemyBatch.phase === 'HEATING'
                      ? 'bg-orange-500/20 text-orange-400 border border-orange-500/40 animate-pulse'
                      : alchemyBatch.phase === 'CONDENSATION'
                      ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
                      : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                  }`}
                >
                  {alchemyBatch.phase === 'HEATING' && 'Pha 2: Khống Hỏa'}
                  {alchemyBatch.phase === 'CONDENSATION' && 'Pha 3: Ngưng Đan'}
                  {alchemyBatch.phase === 'RESULT' && 'Hoàn Tất'}
                </span>
              </div>
            </div>

            {/* Heating Phase */}
            {alchemyBatch.phase === 'HEATING' && (
              <div className="space-y-4">
                <p className="text-xs text-slate-300">
                  Điều chỉnh ngọn lửa sao cho nhiệt độ lò nằm trong vùng thích hợp (Mục tiêu: {alchemyBatch.targetTemp}°C).
                </p>

                {/* Fire Temperature Gauge */}
                <div className="bg-slate-900 p-4 rounded-lg border border-slate-800">
                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span>Nhiệt độ hiện tại: <strong className="text-yellow-300 font-mono text-sm">{alchemyBatch.currentTemp}°C</strong></span>
                    <span>Điểm hỏa hầu: <strong className="text-emerald-400 font-mono">{alchemyBatch.heatScore}/100</strong></span>
                  </div>

                  {/* Temperature Bar */}
                  <div className="relative w-full h-5 bg-slate-950 rounded-full overflow-hidden border border-slate-700">
                    {/* Safe zone overlay */}
                    <div
                      className="absolute top-0 bottom-0 bg-emerald-500/30 border-x border-emerald-400"
                      style={{
                        left: `${Math.max(0, alchemyBatch.targetTemp - alchemyBatch.recipe.fireTolerance)}%`,
                        width: `${alchemyBatch.recipe.fireTolerance * 2}%`,
                      }}
                    />
                    {/* Current fire marker */}
                    <div
                      className="h-full bg-gradient-to-r from-orange-500 to-amber-400 transition-all duration-150"
                      style={{ width: `${alchemyBatch.currentTemp}%` }}
                    />
                  </div>
                </div>

                {/* Heat Adjustment Controls */}
                <div className="flex gap-3">
                  <button
                    onClick={() => adjustHeat(-6)}
                    className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-cyan-300 font-bold text-xs rounded transition border border-cyan-800"
                  >
                    ❄️ Giảm Lửa (-6°C)
                  </button>
                  <button
                    onClick={() => adjustHeat(6)}
                    className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-orange-400 font-bold text-xs rounded transition border border-orange-800"
                  >
                    🔥 Thúc Hỏa (+6°C)
                  </button>
                </div>

                <button
                  onClick={advanceAlchemyPhase}
                  className="w-full mt-2 py-2.5 bg-gradient-to-r from-yellow-600 to-amber-500 hover:from-yellow-500 hover:to-amber-400 text-slate-950 font-bold text-xs rounded transition flex items-center justify-center gap-1.5 shadow-lg"
                >
                  <ArrowRight className="w-4 h-4" />
                  Dược Lực Đã Dung Hợp - Tiến Vào Ngưng Đan
                </button>
              </div>
            )}

            {/* Condensation Phase */}
            {alchemyBatch.phase === 'CONDENSATION' && (
              <div className="space-y-4 text-center py-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-cyan-950/80 border-2 border-cyan-400 flex items-center justify-center animate-spin">
                  ☯️
                </div>
                <div>
                  <h4 className="text-sm font-bold text-cyan-300">Linh Khí Đang Ngưng Kết</h4>
                  <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                    Áp dụng công thức phẩm chất GDD dựa trên độ tinh khiết, điểm hỏa hầu ({alchemyBatch.heatScore} điểm) và tu vi đan sư.
                  </p>
                </div>

                <button
                  onClick={advanceAlchemyPhase}
                  className="w-full py-3 bg-gradient-to-r from-cyan-600 to-emerald-500 hover:from-cyan-500 hover:to-emerald-400 text-white font-bold text-sm rounded-lg transition shadow-lg flex items-center justify-center gap-2 animate-bounce"
                >
                  <Sparkles className="w-4 h-4" />
                  KHAI LÔ THU ĐAN!
                </button>
              </div>
            )}

            {/* Result Phase */}
            {alchemyBatch.phase === 'RESULT' && (
              <div className="space-y-4 text-center py-2">
                {alchemyBatch.resultQuality === 'HỎNG MẺ' ? (
                  <div className="bg-red-950/50 p-4 rounded-lg border border-red-800 text-red-300">
                    <AlertTriangle className="w-8 h-8 mx-auto text-red-400 mb-1" />
                    <h4 className="font-bold text-sm">Mẻ Đan Bị Hỏng!</h4>
                    <p className="text-xs text-red-200/80 mt-1">
                      Do hỏa hầu sai lệch, dược liệu hóa thành tro tàn. Tích lũy chút kinh nghiệm đan đạo.
                    </p>
                  </div>
                ) : (
                  <div className="bg-emerald-950/50 p-4 rounded-lg border border-emerald-600 text-emerald-200">
                    <CheckCircle2 className="w-8 h-8 mx-auto text-emerald-400 mb-1" />
                    <h4 className="font-bold text-base text-yellow-300">{alchemyBatch.resultPillName}</h4>
                    <p className="text-xs text-emerald-300/90 mt-1">
                      Thành công ngưng kết đan hoàn! Đan dược đã được chuyển vào Túi Trữ Vật.
                    </p>
                  </div>
                )}

                <button
                  onClick={cancelAlchemy}
                  className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded transition"
                >
                  Thu Công / Luyện Mẻ Tiếp Theo
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
