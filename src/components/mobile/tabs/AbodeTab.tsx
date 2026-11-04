import React from 'react';
import { useGameStore } from '../../../store/gameStore';
import { Sparkles, ArrowUpCircle } from 'lucide-react';

export const AbodeTab: React.FC = () => {
  const character = useGameStore((state) => state.character);
  const facilities = useGameStore((state) => state.facilities);
  const buildFacility = useGameStore((state) => state.buildFacility);
  const upgradeAbodeTier = useGameStore((state) => state.upgradeAbodeTier);

  const getTierInfo = (tier: number) => {
    switch (tier) {
      case 2:
        return { name: 'Tiểu Động Phủ', nextCost: 250, nextName: 'Linh Phủ' };
      case 3:
        return { name: 'Linh Phủ Viên Mãn', nextCost: 0, nextName: 'Đã tối đa' };
      default:
        return { name: 'Thảo Lư Thanh Tịnh', nextCost: 100, nextName: 'Tiểu Động Phủ' };
    }
  };

  const currentTier = getTierInfo(character.abodeTier);

  return (
    <div className="space-y-3 pb-20 animate-in fade-in duration-200">
      {/* Abode Tier Overview Card */}
      <div className="xianxia-panel rounded-xl p-4 border border-yellow-500/50 shadow-md">
        <div className="flex justify-between items-center mb-2">
          <div>
            <span className="text-[10px] text-yellow-400 font-bold uppercase tracking-wider">CẢNH GIỚI ĐỘNG PHỦ</span>
            <h3 className="font-bold text-base text-yellow-200">{currentTier.name}</h3>
          </div>
          <span className="text-xs px-2.5 py-1 rounded bg-yellow-500/20 text-yellow-300 border border-yellow-500/40 font-mono">
            Cấp {character.abodeTier}/3
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed mb-3">
          Nâng cấp động phủ giúp tăng thêm ô đất linh điền, tăng dung lượng linh lực tối đa và mở rộng hiệu suất bế quan ngoại tuyến.
        </p>

        {character.abodeTier < 3 ? (
          <button
            onClick={upgradeAbodeTier}
            className="w-full py-2.5 bg-gradient-to-r from-yellow-600 to-amber-500 hover:from-yellow-500 text-slate-950 font-bold text-xs rounded-xl transition shadow flex items-center justify-center gap-1.5"
          >
            <ArrowUpCircle className="w-4 h-4" />
            Thăng Cấp Lên {currentTier.nextName} ({currentTier.nextCost} 💎)
          </button>
        ) : (
          <div className="py-2 text-center text-xs text-emerald-400 font-semibold bg-emerald-950/40 rounded-lg border border-emerald-800">
            ✨ Động Phủ đã đạt cảnh giới tối cao!
          </div>
        )}
      </div>

      {/* Facilities List */}
      <div>
        <h4 className="text-xs font-bold text-yellow-300 px-1 mb-2 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
          Kiến Thiết Công Trình & Hiệu Ứng Phúc Lợi
        </h4>

        <div className="space-y-2">
          {facilities.map((fac) => (
            <div
              key={fac.id}
              className={`p-3 rounded-xl border flex items-center justify-between transition ${
                fac.built
                  ? 'bg-slate-900/90 border-emerald-600/50 shadow-[0_0_8px_rgba(52,211,153,0.1)]'
                  : 'bg-slate-900/60 border-slate-700/70'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{fac.icon}</span>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-xs text-yellow-200">{fac.name}</span>
                    {fac.built && (
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                        Đã xây
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-emerald-400 font-medium">{fac.buffDescription}</div>
                  <div className="text-[10px] text-slate-400 line-clamp-1">{fac.description}</div>
                </div>
              </div>

              {!fac.built && (
                <button
                  onClick={() => buildFacility(fac.id)}
                  disabled={character.coins < fac.cost}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                    character.coins >= fac.cost
                      ? 'bg-yellow-600/80 hover:bg-yellow-500 text-slate-950 shadow'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  Xây ({fac.cost} 💎)
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
