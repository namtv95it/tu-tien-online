import React from 'react';
import { useGameStore } from '../../../store/gameStore';
import { XianxiaFrame } from '../art/XianxiaFrame';
import { Shield, Heart, Compass, Activity, Scroll } from 'lucide-react';

export const CultivationTab: React.FC = () => {
  const character = useGameStore((state) => state.character);
  const toggleMeditation = useGameStore((state) => state.toggleMeditation);
  const attemptBreakthrough = useGameStore((state) => state.attemptBreakthrough);
  const setNotification = useGameStore((state) => state.setNotification);

  const canBreakthrough = character.cultivation >= character.cultivationThreshold;

  const handleBreakthrough = () => {
    const res = attemptBreakthrough();
    setNotification(res.message);
  };

  return (
    <div className="space-y-3 pb-20 animate-in fade-in duration-200">
      {/* 1. Breakthrough Ready Alert */}
      {canBreakthrough && (
        <div className="p-3 rounded-xl bg-gradient-to-r from-amber-600 to-yellow-500 text-slate-950 font-black text-center shadow-lg border border-amber-300 animate-pulse">
          <div className="text-xs tracking-wider">⚡ THIÊN KIẾP ĐÃ ĐẾN ⚡</div>
          <button
            onClick={handleBreakthrough}
            className="w-full mt-1.5 py-1.5 bg-slate-950 text-amber-300 rounded-lg text-xs font-bold hover:bg-slate-900 transition"
          >
            ĐỘT PHÁ CẢNH GIỚI NGAY
          </button>
        </div>
      )}

      {/* 2. Primary Cultivation Controls */}
      <XianxiaFrame variant="gold">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">🧘</span>
            <div>
              <h3 className="font-bold text-xs text-amber-300">
                {character.isMeditating ? 'Đang Tọa Thiền Tụ Khí' : 'Đang Tĩnh Chỉ'}
              </h3>
              <p className="text-[10px] text-slate-400">
                Tốc độ: <span className="text-emerald-400 font-mono font-bold">+0.8 Tu vi/s</span>
              </p>
            </div>
          </div>

          <button
            onClick={toggleMeditation}
            className={`px-4 py-2 rounded-xl text-xs font-bold border transition shadow-md active:scale-95 ${
              character.isMeditating
                ? 'bg-cyan-950/90 border-cyan-400 text-cyan-300 hover:bg-cyan-900'
                : 'bg-amber-500 hover:bg-amber-400 border-amber-300 text-slate-950'
            }`}
          >
            {character.isMeditating ? 'Thu Công' : 'Nhập Định'}
          </button>
        </div>

        {/* Compact 4 Visual Stat Gems */}
        <div className="grid grid-cols-4 gap-1.5 pt-2 border-t border-amber-500/20 text-center">
          {/* Kinh Mạch */}
          <div className="bg-slate-950/70 p-2 rounded-lg border border-slate-800">
            <Shield className="w-3.5 h-3.5 mx-auto text-blue-400 mb-0.5" />
            <div className="text-[10px] text-slate-400">Kinh Mạch</div>
            <div className="font-mono text-xs font-bold text-blue-300">{character.meridianStability}%</div>
          </div>

          {/* Tâm Cảnh */}
          <div className="bg-slate-950/70 p-2 rounded-lg border border-slate-800">
            <Heart className="w-3.5 h-3.5 mx-auto text-rose-400 mb-0.5" />
            <div className="text-[10px] text-slate-400">Tâm Cảnh</div>
            <div className="font-mono text-xs font-bold text-rose-300">{character.mindState}%</div>
          </div>

          {/* Thần Thức */}
          <div className="bg-slate-950/70 p-2 rounded-lg border border-slate-800">
            <Compass className="w-3.5 h-3.5 mx-auto text-cyan-400 mb-0.5" />
            <div className="text-[10px] text-slate-400">Thần Thức</div>
            <div className="font-mono text-xs font-bold text-cyan-300">{character.spiritSense}</div>
          </div>

          {/* Mệt Mỏi */}
          <div className="bg-slate-950/70 p-2 rounded-lg border border-slate-800">
            <Activity className="w-3.5 h-3.5 mx-auto text-amber-400 mb-0.5" />
            <div className="text-[10px] text-slate-400">Mệt Mỏi</div>
            <div className="font-mono text-xs font-bold text-amber-300">{character.fatigue}%</div>
          </div>
        </div>
      </XianxiaFrame>

      {/* 3. Công Pháp Tu Luyện (Cultivation Techniques) */}
      <XianxiaFrame>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
            <Scroll className="w-3.5 h-3.5 text-amber-400" />
            Công Pháp Chủ Tu
          </div>
          <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800 font-mono">
            Đang Vận Hành
          </span>
        </div>

        <div className="space-y-2">
          {/* Method 1 */}
          <div className="p-2.5 rounded-lg bg-slate-950/70 border border-emerald-500/50 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="text-xl">🎋</span>
              <div>
                <div className="font-bold text-xs text-emerald-300">Thanh Mộc Dẫn Khí Quyết</div>
                <div className="text-[10px] text-slate-400">+8% tốc độ hấp thu linh khí khi ở động phủ</div>
              </div>
            </div>
            <span className="text-[10px] font-bold text-emerald-400">Thuần Thục</span>
          </div>

          {/* Method 2 */}
          <div className="p-2.5 rounded-lg bg-slate-950/40 border border-slate-800/80 flex items-center justify-between opacity-75">
            <div className="flex items-center gap-2.5">
              <span className="text-xl">🌊</span>
              <div>
                <div className="font-bold text-xs text-slate-300">Tĩnh Thủy Quy Tức Công</div>
                <div className="text-[10px] text-slate-500">+12% ổn định kinh mạch khi bế quan</div>
              </div>
            </div>
            <span className="text-[10px] text-slate-500">Nhập Môn</span>
          </div>
        </div>
      </XianxiaFrame>

      {/* 4. Sleek Offline Status Pill */}
      <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] text-slate-400">
        <span className="flex items-center gap-1.5 text-cyan-300">
          🌙 Bế quan ngoại tuyến tự động
        </span>
        <span className="font-mono text-amber-400 font-semibold">Tối đa 8h/ngày</span>
      </div>
    </div>
  );
};
