import React from 'react';
import { useGameStore } from '../../../store/gameStore';
import { XianxiaFrame } from '../art/XianxiaFrame';
import { ArrowUpCircle } from 'lucide-react';

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
      {/* Abode Tier Card */}
      <XianxiaFrame variant="gold" className="p-3.5">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🏯</span>
            <div>
              <h3 className="font-bold text-xs text-amber-200">{currentTier.name}</h3>
              <span className="text-[10px] text-emerald-400 font-mono">
                Cấp {character.abodeTier}/3 • Mở rộng {character.abodeTier >= 2 ? '6' : '4'} ô điền
              </span>
            </div>
          </div>

          {character.abodeTier < 3 ? (
            <button
              onClick={upgradeAbodeTier}
              className="py-1.5 px-3 bg-gradient-to-r from-amber-600 to-yellow-500 hover:from-amber-500 text-slate-950 font-bold text-xs rounded-lg transition shadow flex items-center gap-1 active:scale-95"
            >
              <ArrowUpCircle className="w-3.5 h-3.5" />
              Nâng ({currentTier.nextCost} 💎)
            </button>
          ) : (
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
              Viên Mãn
            </span>
          )}
        </div>
      </XianxiaFrame>

      {/* Facilities List */}
      <div className="space-y-2">
        {facilities.map((fac) => (
          <XianxiaFrame
            key={fac.id}
            variant={fac.built ? 'cyan' : 'default'}
            className="p-3 flex items-center justify-between"
          >
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">{fac.icon}</span>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-xs text-amber-200">{fac.name}</span>
                  {fac.built && (
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                      Đã xây
                    </span>
                  )}
                </div>
                <div className="text-[10px] text-emerald-400 font-medium">{fac.buffDescription}</div>
              </div>
            </div>

            {!fac.built && (
              <button
                onClick={() => buildFacility(fac.id)}
                disabled={character.coins < fac.cost}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition active:scale-95 ${
                  character.coins >= fac.cost
                    ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                {fac.cost} 💎
              </button>
            )}
          </XianxiaFrame>
        ))}
      </div>
    </div>
  );
};
