import React from 'react';
import { useGameStore } from '../../store/gameStore';
import { ASSETS } from '../../utils/assets';

export const MobileHeader: React.FC = () => {
  const character = useGameStore((state) => state.character);
  const activeTab = useGameStore((state) => state.activeTab);
  const setNotification = useGameStore((state) => state.setNotification);
  const openModal = useGameStore((state) => state.openModal);
  const isBGMOn = useGameStore((state) => state.isBGMOn);
  const toggleBGM = useGameStore((state) => state.toggleBGM);

  const cultivationPercent = Math.min(
    100,
    Math.floor((character.cultivation / character.cultivationThreshold) * 100)
  );

  return (
    <header className="absolute top-0 left-0 right-0 z-40 w-full px-2.5 pt-2 pb-1.5 bg-gradient-to-b from-[#0b1420]/95 via-[#0b1420]/75 to-transparent select-none text-slate-100">
      {/* Top Main Row */}
      <div className="flex items-center justify-between gap-1.5">
        {/* Left: Chibi Cultivator Avatar & Realm Info */}
        <div className="flex items-center gap-2">
          {/* Avatar with Level Badge */}
          <div
            onClick={() => openModal('INVENTORY')}
            className="relative w-12 h-12 shrink-0 cursor-pointer hover:scale-105 active:scale-95 transition"
            title="Mở Túi Trữ Vật"
          >
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-amber-400/80 shadow-[0_0_10px_rgba(245,158,11,0.3)] bg-gradient-to-b from-slate-800 to-slate-950 flex items-center justify-center">
              <img
                src={ASSETS.ui.avatarTuSi}
                alt={character.name}
                className="w-full h-full object-cover object-top scale-110"
              />
            </div>
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[9px] px-1.5 py-0.2 rounded-full bg-slate-950 text-amber-300 border border-amber-400 font-mono font-bold whitespace-nowrap shadow">
              Lv.{character.level}
            </span>
          </div>

          <div>
            <h2 className="font-bold text-xs text-amber-100 tracking-wide">{character.name}</h2>
            {/* Realm Tag with lotus icon & progress bar */}
            <div className="flex items-center gap-1 mt-0.5">
              <span className="text-[10px] text-cyan-300 flex items-center gap-0.5 font-medium">
                🪷 {character.realm} tầng {character.realmLevel}
              </span>
            </div>
            {/* Tiny blue progress bar under realm */}
            <div className="w-24 h-1 bg-slate-900/90 rounded-full overflow-hidden border border-cyan-800/60 mt-0.5">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-cyan-300 transition-all duration-300"
                style={{ width: `${cultivationPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Right: Currencies with Official Game Icons */}
        <div className="flex flex-col items-end gap-1 font-mono text-[11px]">
          {/* Currency Row 1: Jade Token, Spirit Stones, Gold Ingots */}
          <div className="flex items-center gap-1.5">
            {/* Jade Token (Ngọc Bích) */}
            <div
              onClick={() => setNotification(`Ngọc Bích: ${character.jadeTokens.toLocaleString()} viên`)}
              className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-slate-950/80 border border-emerald-500/40 text-emerald-300 cursor-pointer hover:border-emerald-400 transition"
              title="Ngọc Bích"
            >
              <img src={ASSETS.currency.ngocBich} alt="Ngọc Bích" className="w-4 h-4 object-contain" />
              <span className="font-bold text-[10px]">{character.jadeTokens.toLocaleString()}</span>
              <span className="text-amber-400 font-sans font-bold text-[9px] ml-0.5">+</span>
            </div>

            {/* Spirit Stones (Linh Thạch) */}
            <div
              onClick={() => setNotification(`Linh Thạch: ${character.spiritStones.toLocaleString()} viên`)}
              className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-slate-950/80 border border-cyan-500/40 text-cyan-200 cursor-pointer hover:border-cyan-400 transition"
              title="Linh Thạch"
            >
              <img src={ASSETS.currency.linhThach} alt="Linh Thạch" className="w-4 h-4 object-contain" />
              <span className="font-bold text-[10px]">{character.spiritStones.toLocaleString()}</span>
              <span className="text-amber-400 font-sans font-bold text-[9px] ml-0.5">+</span>
            </div>

            {/* Gold Ingots (Nguyên Bảo) */}
            <div
              onClick={() => setNotification(`Nguyên Bảo: ${character.goldIngots} đĩnh`)}
              className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-slate-950/80 border border-amber-500/50 text-amber-300 cursor-pointer hover:border-amber-400 transition"
              title="Nguyên Bảo"
            >
              <img src={ASSETS.currency.nguyenBao} alt="Nguyên Bảo" className="w-4 h-4 object-contain" />
              <span className="font-bold text-[10px]">{character.goldIngots}</span>
              <span className="text-amber-400 font-sans font-bold text-[9px] ml-0.5">+</span>
            </div>
          </div>

          {/* Currency Row 2: Stamina (Thể lực) */}
          <div
            onClick={() => setNotification(`Thể Lực: ${character.stamina}/${character.maxStamina}`)}
            className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-950/80 border border-amber-600/40 text-[10px] cursor-pointer hover:border-amber-400 transition"
            title="Thể Lực"
          >
            <img src={ASSETS.currency.theLuc} alt="Thể Lực" className="w-4 h-4 object-contain" />
            <span className="text-amber-200/90 text-[10px]">Thể lực</span>
            <span className="font-bold text-slate-100">{character.stamina}/{character.maxStamina}</span>
            <span className="text-amber-400 font-sans font-bold text-[9px] ml-0.5">+</span>
          </div>
        </div>
      </div>

      {/* Sub Header Action Icons (Mail, Notice, Settings, BGM) */}
      {activeTab !== 'tu-luyen' && (
        <div className="flex justify-end gap-3 px-1 pt-1 text-[10px] text-amber-200/90 font-medium">
          <div
            onClick={toggleBGM}
            className={`flex flex-col items-center cursor-pointer hover:scale-105 active:scale-95 transition ${
              isBGMOn ? 'text-amber-300 drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]' : 'text-slate-400 opacity-70'
            }`}
            title={isBGMOn ? 'Tắt Nhạc Nền Đàn Tranh' : 'Bật Nhạc Nền Đàn Tranh'}
          >
            <span className="text-base leading-none">🎵</span>
            <span className="text-[9px] mt-0.5">{isBGMOn ? 'Nhạc: Bật' : 'Nhạc'}</span>
          </div>

          <div
            onClick={() => openModal('MAIL')}
            className="relative flex flex-col items-center cursor-pointer hover:scale-105 active:scale-95 transition"
            title="Thư từ"
          >
            <img src={ASSETS.ui.iconThu} alt="Thư" className="w-5 h-5 object-contain" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-rose-500 border border-slate-950" />
            <span className="text-[9px] mt-0.5">Thư</span>
          </div>

          <div
            onClick={() => openModal('ANNOUNCEMENTS')}
            className="flex flex-col items-center cursor-pointer hover:scale-105 active:scale-95 transition"
            title="Thông báo"
          >
            <img src={ASSETS.ui.iconThongBao} alt="Thông báo" className="w-5 h-5 object-contain" />
            <span className="text-[9px] mt-0.5">Thông báo</span>
          </div>

          <div
            onClick={() => openModal('SETTINGS')}
            className="flex flex-col items-center cursor-pointer hover:scale-105 active:scale-95 transition"
            title="Cài đặt"
          >
            <img src={ASSETS.ui.iconCaiDat} alt="Cài đặt" className="w-5 h-5 object-contain" />
            <span className="text-[9px] mt-0.5">Cài đặt</span>
          </div>
        </div>
      )}
    </header>
  );
};
