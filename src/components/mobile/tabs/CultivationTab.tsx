import React from 'react';
import { useGameStore } from '../../../store/gameStore';
import { Sparkles, Moon, Activity, Heart, Shield, Compass } from 'lucide-react';

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
    <div className="space-y-3.5 pb-20 animate-in fade-in duration-200">
      {/* Primary Meditation Action Card */}
      <div className="xianxia-panel rounded-xl p-4 border border-yellow-500/40 text-center relative overflow-hidden">
        <div className="text-xs text-yellow-400 font-semibold uppercase tracking-wider mb-1 flex items-center justify-center gap-1.5">
          <Sparkles className="w-4 h-4 text-yellow-400" />
          Hành Động Tu Luyện Chủ Động
        </div>
        <p className="text-xs text-slate-300 mb-3.5 leading-relaxed">
          Tọa thiền hấp thu linh khí thiên địa. Khi bận việc có thể đóng trình duyệt, hệ thống tự động bế quan ngoại tuyến.
        </p>

        {/* Large Tap Button */}
        <button
          onClick={toggleMeditation}
          className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm tracking-wide transition shadow-lg flex items-center justify-center gap-2 border ${
            character.isMeditating
              ? 'bg-gradient-to-r from-cyan-700 to-blue-700 hover:from-cyan-600 hover:to-blue-600 border-cyan-400 text-white animate-pulse'
              : 'bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-500 hover:to-amber-500 border-yellow-400 text-slate-950'
          }`}
        >
          <span className="text-lg">🧘</span>
          {character.isMeditating ? 'THU CÔNG XUẤT ĐỊNH' : 'NHẬP ĐỊNH TỌA THIỀN'}
        </button>
      </div>

      {/* Breakthrough banner if ready */}
      {canBreakthrough && (
        <div className="p-3.5 rounded-xl bg-gradient-to-r from-yellow-950/80 to-amber-950/80 border border-yellow-400 shadow-xl text-center animate-pulse">
          <h4 className="font-bold text-sm text-yellow-300 flex items-center justify-center gap-1.5">
            ⚡ TU VI ĐÃ VIÊN MÃN - THIÊN KIẾP GIÁNG LÂM ⚡
          </h4>
          <p className="text-xs text-slate-300 my-1.5">
            Kinh mạch và tâm cảnh đã sẵn sàng, hãy vận khí phá vỡ bình cảnh!
          </p>
          <button
            onClick={handleBreakthrough}
            className="w-full py-2 bg-gradient-to-r from-yellow-500 to-amber-400 hover:from-yellow-400 text-slate-950 font-extrabold text-xs rounded-lg transition shadow"
          >
            ĐỘT PHÁ CẢNH GIỚI TIẾP THEO
          </button>
        </div>
      )}

      {/* 4 Attributes Overview Grid */}
      <div className="grid grid-cols-2 gap-2.5">
        {/* Kinh mạch */}
        <div className="bg-slate-900/80 border border-slate-700/80 rounded-xl p-3">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-slate-300 font-medium flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-blue-400" /> Kinh Mạch
            </span>
            <span className="font-mono text-blue-300 font-bold">{character.meridianStability}/100</span>
          </div>
          <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500" style={{ width: `${character.meridianStability}%` }} />
          </div>
          <p className="text-[10px] text-slate-400 mt-1.5">Giảm rủi ro tẩu hỏa nhập ma</p>
        </div>

        {/* Tâm cảnh */}
        <div className="bg-slate-900/80 border border-slate-700/80 rounded-xl p-3">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-slate-300 font-medium flex items-center gap-1">
              <Heart className="w-3.5 h-3.5 text-rose-400" /> Tâm Cảnh
            </span>
            <span className="font-mono text-rose-300 font-bold">{character.mindState}/100</span>
          </div>
          <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
            <div className="h-full bg-rose-500" style={{ width: `${character.mindState}%` }} />
          </div>
          <p className="text-[10px] text-slate-400 mt-1.5">Tâm hồn thanh tịnh, vô tạp niệm</p>
        </div>

        {/* Thần thức */}
        <div className="bg-slate-900/80 border border-slate-700/80 rounded-xl p-3">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-slate-300 font-medium flex items-center gap-1">
              <Compass className="w-3.5 h-3.5 text-cyan-400" /> Thần Thức
            </span>
            <span className="font-mono text-cyan-300 font-bold">{character.spiritSense}</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1">Cảm nhận thiên địa, điều khiển pháp bảo</p>
        </div>

        {/* Mệt mỏi */}
        <div className="bg-slate-900/80 border border-slate-700/80 rounded-xl p-3">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-slate-300 font-medium flex items-center gap-1">
              <Activity className="w-3.5 h-3.5 text-amber-400" /> Mệt Mỏi
            </span>
            <span className="font-mono text-amber-300 font-bold">{character.fatigue}%</span>
          </div>
          <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
            <div className="h-full bg-amber-500" style={{ width: `${character.fatigue}%` }} />
          </div>
          <p className="text-[10px] text-slate-400 mt-1.5">Tự động hồi phục khi nghỉ ngơi</p>
        </div>
      </div>

      {/* Bế Quan Ngoại Tuyến */}
      <div className="bg-slate-900/90 border border-yellow-700/40 rounded-xl p-3.5">
        <h4 className="text-xs font-bold text-yellow-300 flex items-center gap-1.5 mb-1.5">
          <Moon className="w-4 h-4 text-cyan-400" />
          Cơ Chế Bế Quan Ngoại Tuyến (Lazy Settlement)
        </h4>
        <p className="text-xs text-slate-300 leading-relaxed">
          Đạo hữu có thể tắt trình duyệt bất cứ lúc nào. Khi quay trở lại, hệ thống sẽ tự động đối chiếu thời gian và trả tu vi tích lũy (tối đa <strong>8 giờ/ngày</strong> theo chuẩn GDD).
        </p>
        <div className="mt-2.5 pt-2 border-t border-slate-800 flex justify-between text-[11px] text-slate-400">
          <span>Hiệu suất bế quan: <strong className="text-emerald-400">{character.abodeTier >= 2 ? '120%' : '100%'}</strong></span>
          <span>Trần bế quan: <strong>8 Giờ</strong></span>
        </div>
      </div>
    </div>
  );
};
