import React, { useState } from 'react';
import { useGameStore } from '../../../store/gameStore';
import { ItemType } from '../../../types/game';

export const GameModals: React.FC = () => {
  const activeModal = useGameStore((state) => state.activeModal);
  const closeModal = useGameStore((state) => state.closeModal);
  const character = useGameStore((state) => state.character);

  // Store data
  const inventory = useGameStore((state) => state.inventory);
  const useItem = useGameStore((state) => state.useItem);
  const techniques = useGameStore((state) => state.techniques);
  const selectTechnique = useGameStore((state) => state.selectTechnique);
  const quests = useGameStore((state) => state.quests);
  const claimQuest = useGameStore((state) => state.claimQuest);
  const eventGiftClaimed = useGameStore((state) => state.eventGiftClaimed);
  const claimEventGift = useGameStore((state) => state.claimEventGift);
  const upgradeSpiritArray = useGameStore((state) => state.upgradeSpiritArray);
  const feedKoi = useGameStore((state) => state.feedKoi);
  const mailList = useGameStore((state) => state.mailList);
  const claimMail = useGameStore((state) => state.claimMail);
  const toggleSound = useGameStore((state) => state.toggleSound);
  const isBGMOn = useGameStore((state) => state.isBGMOn);
  const toggleBGM = useGameStore((state) => state.toggleBGM);
  const resetGame = useGameStore((state) => state.resetGame);

  // Market Stall
  const marketCategory = useGameStore((state) => state.marketCategory);
  const setMarketCategory = useGameStore((state) => state.setMarketCategory);
  const allMarketItems = useGameStore((state) => state.allMarketItems);
  const buyMarketItem = useGameStore((state) => state.buyMarketItem);
  const sellItem = useGameStore((state) => state.sellItem);

  const [invFilter, setInvFilter] = useState<'ALL' | ItemType>('ALL');
  const [selectedMailId, setSelectedMailId] = useState<string | null>(null);
  const [stallTab, setStallTab] = useState<'BUY' | 'SELL'>('BUY');

  if (activeModal === 'NONE') return null;

  const filteredInventory = invFilter === 'ALL' ? inventory : inventory.filter((i) => i.type === invFilter);

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center p-3 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Modal Frame Container */}
      <div className="relative w-full max-w-[390px] max-h-[85vh] bg-[#0c1626]/95 border-2 border-amber-500/60 rounded-2xl shadow-[0_0_35px_rgba(245,158,11,0.35)] flex flex-col overflow-hidden text-slate-100 select-none">
        {/* Top Header Plaque */}
        <div className="relative px-4 py-3 bg-gradient-to-r from-amber-950/60 via-[#182638] to-amber-950/60 border-b border-amber-500/40 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-amber-400 font-serif font-bold text-base tracking-wider drop-shadow">
              {activeModal === 'QUESTS' && '📜 Tông Môn Nhiệm Vụ'}
              {activeModal === 'EVENT' && '🏮 Thất Tịch Thưởng Trăng'}
              {activeModal === 'INVENTORY' && '🎒 Túi Trữ Vật (Kho Chứa)'}
              {activeModal === 'TECHNIQUES' && '📖 Điển Tịch Công Pháp'}
              {activeModal === 'SPIRIT_ARRAY' && '🔮 Trận Tụ Linh Cổ Trận'}
              {activeModal === 'KOI_POND' && '🐟 Hồ Linh Ngư Tiên Đàm'}
              {activeModal === 'MAIL' && '✉️ Bồ Câu Đưa Thư'}
              {activeModal === 'ANNOUNCEMENTS' && '📢 Bảng Cáo Thị Tu Chân'}
              {activeModal === 'SETTINGS' && '⚙️ Thiết Lập Trò Chơi'}
              {activeModal === 'MARKET_STALL' && (
                marketCategory === 'HERB' ? '🌿 Linh Thảo Các' :
                marketCategory === 'PILL' ? '🔮 Đan Dược Các' :
                marketCategory === 'WEAPON' ? '⚔️ Pháp Khí Đường' : '📜 Công Pháp Phường'
              )}
            </span>
          </div>

          <button
            onClick={closeModal}
            className="w-7 h-7 rounded-full bg-slate-800/80 hover:bg-rose-900/80 border border-amber-500/40 text-amber-300 hover:text-white flex items-center justify-center font-bold text-xs active:scale-90 transition"
          >
            ✕
          </button>
        </div>

        {/* Modal Body Content (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-3.5 space-y-3 text-xs">
          {/* ================= 1. QUESTS MODAL ================= */}
          {activeModal === 'QUESTS' && (
            <div className="space-y-2.5">
              <p className="text-[11px] text-amber-200/80 italic text-center">
                Hoàn thành chỉ dụ tông môn để tích lũy linh thạch và tài nguyên tu chân.
              </p>
              {quests.map((q) => {
                const percent = Math.min(100, Math.floor((q.progress / q.maxProgress) * 100));
                return (
                  <div
                    key={q.id}
                    className={`p-2.5 rounded-xl border transition ${
                      q.completed && !q.claimed
                        ? 'bg-amber-950/40 border-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.25)]'
                        : 'bg-slate-900/60 border-slate-700/60'
                    }`}
                  >
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold ${q.type === 'MAIN' ? 'bg-amber-600 text-slate-950' : 'bg-cyan-700 text-cyan-100'}`}>
                            {q.type === 'MAIN' ? 'Chính tuyến' : 'Hàng ngày'}
                          </span>
                          <h4 className="font-bold text-amber-100 text-xs">{q.title}</h4>
                        </div>
                        <p className="text-[10px] text-slate-300 mt-1">{q.description}</p>
                      </div>

                      <button
                        disabled={!q.completed || q.claimed}
                        onClick={() => claimQuest(q.id)}
                        className={`px-3 py-1.5 rounded-lg font-bold text-[10px] whitespace-nowrap active:scale-95 transition ${
                          q.claimed
                            ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                            : q.completed
                            ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md font-bold hover:brightness-110'
                            : 'bg-slate-800/80 text-slate-400 cursor-not-allowed border border-slate-700/60'
                        }`}
                      >
                        {q.claimed ? 'Đã Nhận' : q.completed ? 'Nhận Thưởng' : `${q.progress}/${q.maxProgress}`}
                      </button>
                    </div>

                    {/* Progress Bar & Reward */}
                    <div className="mt-2 flex items-center justify-between gap-2">
                      <div className="flex-1 h-1.5 bg-slate-950 rounded-full overflow-hidden border border-slate-700">
                        <div className="h-full bg-gradient-to-r from-cyan-400 to-amber-400" style={{ width: `${percent}%` }} />
                      </div>
                      <div className="flex items-center gap-1 text-[10px] text-amber-300 font-mono font-bold">
                        <span>🪙 +{q.rewardSpiritStones.toLocaleString()}</span>
                        {q.rewardJadeTokens && <span>🟢 +{q.rewardJadeTokens}</span>}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* ================= 2. EVENT MODAL ================= */}
          {activeModal === 'EVENT' && (
            <div className="space-y-3 text-center">
              <div className="p-3 rounded-xl bg-gradient-to-b from-purple-950/60 to-slate-900 border border-purple-500/50 space-y-2">
                <span className="text-3xl">🏮🪷🌕</span>
                <h3 className="font-bold text-amber-200 text-sm">Đại Điển Thất Tịch Thưởng Trăng</h3>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Trăng rằm chiếu sáng cửu tiêu, thiên địa linh khí nồng đậm gấp bội. Toàn bộ tu sĩ nhận hiệu quả tăng tốc tu luyện <span className="text-amber-300 font-bold">+20%</span>.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-amber-500/40 flex items-center justify-between">
                <div className="text-left">
                  <div className="font-bold text-amber-100 text-xs">Quà Điểm Danh Thất Tịch</div>
                  <div className="text-[10px] text-emerald-400 font-mono mt-0.5">
                    🪙 2.000 Linh Thạch • 🟢 100 Ngọc Bích • 🟡 20 Nguyên Bảo
                  </div>
                </div>

                <button
                  disabled={eventGiftClaimed}
                  onClick={claimEventGift}
                  className={`px-3 py-1.5 rounded-lg font-bold text-[11px] active:scale-95 transition ${
                    eventGiftClaimed
                      ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                      : 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold hover:brightness-110 shadow-lg'
                  }`}
                >
                  {eventGiftClaimed ? 'Đã Nhận' : 'Nhận Quà'}
                </button>
              </div>
            </div>
          )}

          {/* ================= 3. INVENTORY MODAL ================= */}
          {activeModal === 'INVENTORY' && (
            <div className="space-y-2.5">
              {/* Category Filter Pills */}
              <div className="flex gap-1 overflow-x-auto pb-1 text-[10px]">
                {(['ALL', 'PILL', 'HERB', 'WEAPON', 'MANUAL'] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setInvFilter(cat)}
                    className={`px-2.5 py-1 rounded-full font-bold whitespace-nowrap transition ${
                      invFilter === cat
                        ? 'bg-amber-500 text-slate-950 font-bold shadow'
                        : 'bg-slate-900/80 text-slate-300 hover:text-white border border-slate-700'
                    }`}
                  >
                    {cat === 'ALL' && 'Tất cả'}
                    {cat === 'PILL' && 'Đan Dược'}
                    {cat === 'HERB' && 'Linh Thảo'}
                    {cat === 'WEAPON' && 'Pháp Khí'}
                    {cat === 'MANUAL' && 'Bí Kíp'}
                  </button>
                ))}
              </div>

              {/* Items Grid */}
              <div className="grid grid-cols-2 gap-2">
                {filteredInventory.map((item) => (
                  <div
                    key={item.id}
                    className="p-2 rounded-xl bg-slate-900/80 border border-amber-500/30 flex flex-col justify-between hover:border-amber-400 transition"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xl">{item.icon}</span>
                        <span className="px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-slate-950 text-amber-300 border border-amber-500/40">
                          x{item.count}
                        </span>
                      </div>
                      <h4 className="font-bold text-amber-100 text-[11px] mt-1 line-clamp-1">{item.name}</h4>
                      <p className="text-[9px] text-slate-400 line-clamp-2 mt-0.5">{item.description}</p>
                    </div>

                    <div className="mt-2 pt-1 border-t border-slate-800 flex items-center justify-between">
                      <span className="text-[9px] text-cyan-300 font-medium truncate">{item.effect}</span>
                      {item.type === 'PILL' && (
                        <button
                          onClick={() => useItem(item.id)}
                          className="px-2 py-0.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[9px] active:scale-95 transition"
                        >
                          Dùng
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= 4. TECHNIQUES MODAL ================= */}
          {activeModal === 'TECHNIQUES' && (
            <div className="space-y-2.5">
              <p className="text-[11px] text-amber-200/80 italic text-center">
                Mỗi công pháp hàm chứa quy luật vận hành linh khí và gia trì riêng biệt.
              </p>
              {techniques.map((t) => {
                const isActive = character.activeTechnique === t.name;
                return (
                  <div
                    key={t.id}
                    className={`p-3 rounded-xl border transition ${
                      isActive
                        ? 'bg-amber-950/40 border-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.3)]'
                        : 'bg-slate-900/60 border-slate-700/60'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-slate-950 border border-amber-500/40 text-amber-300">
                            Hệ {t.element}
                          </span>
                          <h4 className="font-bold text-amber-100 text-xs">{t.name}</h4>
                          {isActive && (
                            <span className="text-[9px] text-emerald-400 font-bold">● Đang Tu Luyện</span>
                          )}
                        </div>
                        <p className="text-[10px] text-slate-300 mt-1">{t.description}</p>
                        <p className="text-[10px] text-cyan-300 font-bold mt-1">✨ {t.buff}</p>
                      </div>

                      <div>
                        {isActive ? (
                          <span className="px-2.5 py-1 rounded bg-amber-500/20 border border-amber-400 text-amber-300 text-[10px] font-bold">
                            Kích hoạt
                          </span>
                        ) : t.unlocked ? (
                          <button
                            onClick={() => selectTechnique(t.id)}
                            className="px-3 py-1 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-[10px] active:scale-95 transition"
                          >
                            Luyện
                          </button>
                        ) : (
                          <span className="px-2 py-1 rounded bg-slate-800 text-slate-500 text-[9px]">
                            Chưa mở (Phường Thị)
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* ================= 5. SPIRIT ARRAY MODAL ================= */}
          {activeModal === 'SPIRIT_ARRAY' && (
            <div className="space-y-3 text-center">
              <div className="p-4 rounded-xl bg-gradient-to-b from-cyan-950/60 to-slate-900 border border-cyan-500/50 space-y-2">
                <span className="text-3xl">🔮💎✨</span>
                <h3 className="font-bold text-cyan-200 text-sm">
                  Trận Tụ Linh (Cấp {character.spiritArrayLevel || 1})
                </h3>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Hấp thụ thiên địa linh khí, ngưng tụ vào linh tuyền động phủ, giúp đẩy nhanh tốc độ tu luyện thụ động liên tục.
                </p>
                <div className="inline-block px-3 py-1 rounded-full bg-slate-950 border border-cyan-400 text-cyan-300 font-mono font-bold text-xs mt-1">
                  Hiệu quả: Tốc độ tu vi +{(character.spiritArrayLevel || 1) * 10}%
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-amber-500/40 flex items-center justify-between">
                <div className="text-left">
                  <div className="font-bold text-amber-100 text-xs">
                    Nâng Cấp Lên Cấp {(character.spiritArrayLevel || 1) + 1}
                  </div>
                  <div className="text-[10px] text-cyan-300 font-mono">
                    Chi phí: {((character.spiritArrayLevel || 1) * 2000).toLocaleString()} Linh Thạch
                  </div>
                </div>

                <button
                  onClick={upgradeSpiritArray}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-slate-950 font-bold text-xs shadow-lg active:scale-95 transition"
                >
                  Nâng Cấp
                </button>
              </div>
            </div>
          )}

          {/* ================= 6. KOI POND MODAL ================= */}
          {activeModal === 'KOI_POND' && (
            <div className="space-y-3 text-center">
              <div className="p-4 rounded-xl bg-gradient-to-b from-blue-950/60 to-slate-900 border border-blue-500/50 space-y-2">
                <span className="text-3xl">🐟🌊🪷</span>
                <h3 className="font-bold text-cyan-200 text-sm">Hồ Linh Ngư Kim Lân</h3>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Đàn cá chép vàng hấp thu linh tuyền bơi lội thanh tĩnh. Cho cá ăn giúp tâm cảnh sáng tỏ, giải tỏa tâm ma và nhận phúc lành linh thạch.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-amber-500/40 flex items-center justify-between">
                <div className="text-left">
                  <div className="font-bold text-amber-100 text-xs">Cho Đàn Cá Ăn</div>
                  <div className="text-[10px] text-amber-300 font-mono">
                    Tiêu hao: 5 Thể lực ➔ Nhận +80 Tu vi, +100 Linh Thạch
                  </div>
                </div>

                <button
                  onClick={feedKoi}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:brightness-110 text-slate-950 font-bold text-xs shadow-lg active:scale-95 transition"
                >
                  Cho Ăn
                </button>
              </div>
            </div>
          )}

          {/* ================= 7. MAIL MODAL ================= */}
          {activeModal === 'MAIL' && (
            <div className="space-y-2">
              {mailList.map((m) => (
                <div
                  key={m.id}
                  onClick={() => setSelectedMailId(selectedMailId === m.id ? null : m.id)}
                  className="p-2.5 rounded-xl bg-slate-900/70 border border-slate-700 hover:border-amber-400 cursor-pointer transition"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1.5">
                      <span className="text-base">{m.read ? '✉️' : '📩'}</span>
                      <h4 className={`text-xs ${m.read ? 'text-slate-300' : 'text-amber-200 font-bold'}`}>
                        {m.title}
                      </h4>
                    </div>
                    <span className="text-[9px] text-slate-500">{m.date}</span>
                  </div>

                  {selectedMailId === m.id && (
                    <div className="mt-2 pt-2 border-t border-slate-800 space-y-2 text-[11px] text-slate-300">
                      <p>{m.content}</p>
                      <div className="flex justify-between items-center pt-1">
                        <span className="text-[10px] text-emerald-400 font-mono font-bold">
                          Đính kèm: +{m.rewardSpiritStones} Linh thạch
                        </span>
                        <button
                          disabled={m.claimed}
                          onClick={(e) => {
                            e.stopPropagation();
                            claimMail(m.id);
                          }}
                          className={`px-2.5 py-1 rounded text-[10px] font-bold transition ${
                            m.claimed
                              ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                              : 'bg-amber-500 text-slate-950 hover:bg-amber-400 active:scale-95'
                          }`}
                        >
                          {m.claimed ? 'Đã Nhận' : 'Nhận'}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* ================= 8. ANNOUNCEMENTS MODAL ================= */}
          {activeModal === 'ANNOUNCEMENTS' && (
            <div className="space-y-2.5">
              <div className="p-3 rounded-xl bg-slate-900/80 border border-amber-500/30 space-y-1">
                <div className="flex justify-between text-[10px] text-amber-300">
                  <span className="font-bold">Bản Cập Nhật v1.2</span>
                  <span>Hôm nay</span>
                </div>
                <h4 className="font-bold text-amber-100 text-xs">Khai mở toàn bộ hệ thống Tiên Phủ</h4>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  - Nâng cấp đồ họa 2D Mobile-First chuẩn Xianxia cổ phong.<br />
                  - Tối ưu hóa chu trình Luyện Đan, Linh Điền và Phường Thị.<br />
                  - Khai mở Trận Tụ Linh và Hồ Linh Ngư tại Động Phủ.
                </p>
              </div>
            </div>
          )}

          {/* ================= 9. SETTINGS MODAL ================= */}
          {activeModal === 'SETTINGS' && (
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-700 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-amber-100 text-xs">Hiệu Ứng Âm Thanh (SFX)</h4>
                  <p className="text-[10px] text-slate-400">Tiếng chuông thiền, tiếng suối tuyền và lửa luyện đan</p>
                </div>
                <button
                  onClick={toggleSound}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition ${
                    character.soundEnabled
                      ? 'bg-emerald-500 text-slate-950'
                      : 'bg-slate-800 text-slate-400 border border-slate-600'
                  }`}
                >
                  {character.soundEnabled ? 'BẬT' : 'TẮT'}
                </button>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-700 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-amber-100 text-xs">Nhạc Nền Cổ Phong (BGM)</h4>
                  <p className="text-[10px] text-slate-400">Giai điệu đàn tranh ngũ cung thanh tịnh, thiền định</p>
                </div>
                <button
                  onClick={toggleBGM}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition ${
                    isBGMOn
                      ? 'bg-amber-400 text-slate-950'
                      : 'bg-slate-800 text-slate-400 border border-slate-600'
                  }`}
                >
                  {isBGMOn ? 'ĐANG PHÁT' : 'TẮT'}
                </button>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-700 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-amber-100 text-xs">Tài Khoản Tu Sĩ</h4>
                  <p className="text-[10px] text-slate-400">{character.name} • Luyện Khí Tầng {character.realmLevel}</p>
                </div>
                <button
                  onClick={() => {
                    if (window.confirm('Đạo hữu có chắc chắn muốn xóa dữ liệu và luân hồi tái sinh lại từ đầu?')) {
                      resetGame();
                    }
                  }}
                  className="px-3 py-1 rounded bg-rose-900/80 hover:bg-rose-800 text-rose-200 border border-rose-500/40 text-xs font-bold active:scale-95 transition"
                >
                  Luân Hồi
                </button>
              </div>
            </div>
          )}

          {/* ================= 10. MARKET STALL MODAL ================= */}
          {activeModal === 'MARKET_STALL' && (
            <div className="space-y-3">
              {/* Category tabs selector */}
              <div className="grid grid-cols-4 gap-1 p-1 bg-black/40 rounded-xl border border-amber-500/30">
                {[
                  { cat: 'HERB' as const, label: 'Linh Thảo', icon: '🌿' },
                  { cat: 'PILL' as const, label: 'Đan Dược', icon: '🔮' },
                  { cat: 'WEAPON' as const, label: 'Pháp Khí', icon: '⚔️' },
                  { cat: 'MANUAL' as const, label: 'Công Pháp', icon: '📜' },
                ].map((tab) => (
                  <button
                    key={tab.cat}
                    onClick={() => setMarketCategory(tab.cat)}
                    className={`py-1.5 rounded-lg text-[10px] font-bold flex flex-col items-center gap-0.5 transition ${
                      marketCategory === tab.cat
                        ? 'bg-amber-500/30 text-amber-300 border border-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.5)]'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span>{tab.icon}</span>
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Sub-tabs: Mua / Bán */}
              <div className="flex items-center justify-between px-1">
                <div className="flex gap-2">
                  <button
                    onClick={() => setStallTab('BUY')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                      stallTab === 'BUY'
                        ? 'bg-amber-500 text-slate-950 shadow'
                        : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    🛒 Mua Vật Phẩm
                  </button>
                  <button
                    onClick={() => setStallTab('SELL')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                      stallTab === 'SELL'
                        ? 'bg-amber-500 text-slate-950 shadow'
                        : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    💰 Bán Thu Linh Thạch
                  </button>
                </div>

                <div className="text-[10px] text-amber-300 font-mono font-bold">
                  💎 {character.spiritStones.toLocaleString()}
                </div>
              </div>

              {/* BUY TAB */}
              {stallTab === 'BUY' && (
                <div className="space-y-2 max-h-[50vh] overflow-y-auto pr-1">
                  {allMarketItems
                    .filter((m) => m.category === marketCategory)
                    .map((item) => (
                      <div
                        key={item.id}
                        className="p-2.5 rounded-xl bg-slate-900/80 border border-amber-500/30 flex items-center justify-between gap-2 hover:border-amber-400/60 transition"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-10 h-10 rounded-lg bg-amber-950/60 border border-amber-600/40 flex items-center justify-center text-xl shrink-0">
                            {item.icon}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <h4 className="font-bold text-amber-200 text-xs truncate">{item.name}</h4>
                              <span className="text-[9px] px-1 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                                {item.rarity}
                              </span>
                            </div>
                            <p className="text-[10px] text-slate-400 truncate">{item.description}</p>
                            <div className="flex items-center gap-1.5 text-[10px]">
                              <span className="text-emerald-400 font-bold font-mono">
                                💎 {item.discountPrice.toLocaleString()}
                              </span>
                              {item.originalPrice > item.discountPrice && (
                                <span className="line-through text-slate-500 text-[9px]">
                                  {item.originalPrice.toLocaleString()}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => buyMarketItem(item)}
                          disabled={item.bought}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 transition active:scale-95 ${
                            item.bought
                              ? 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                              : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-[0_0_8px_rgba(245,158,11,0.5)]'
                          }`}
                        >
                          {item.bought ? 'Đã Mua' : 'Mua'}
                        </button>
                      </div>
                    ))}
                </div>
              )}

              {/* SELL TAB */}
              {stallTab === 'SELL' && (
                <div className="space-y-2 max-h-[50vh] overflow-y-auto pr-1">
                  {inventory.filter((i) => i.type === marketCategory).length === 0 ? (
                    <div className="text-center py-8 text-xs text-slate-400">
                      Túi Trữ Vật không có vật phẩm thuộc danh mục này để bán!
                    </div>
                  ) : (
                    inventory
                      .filter((i) => i.type === marketCategory)
                      .map((item) => {
                        const priceMap: Record<string, number> = {
                          'Phàm': 80,
                          'Hạ': 150,
                          'Trung': 400,
                          'Thượng': 1500,
                          'Cực': 6000,
                        };
                        const sellPrice = priceMap[item.rarity] || 100;
                        return (
                          <div
                            key={item.id}
                            className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-700/60 flex items-center justify-between gap-2"
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-xl shrink-0">
                                {item.icon}
                              </div>
                              <div className="min-w-0">
                                <div className="flex items-center gap-1.5">
                                  <h4 className="font-bold text-amber-200 text-xs truncate">{item.name}</h4>
                                  <span className="text-[10px] text-amber-400 font-mono">x{item.count}</span>
                                </div>
                                <div className="text-[10px] text-emerald-400 font-mono">
                                  Giá thu: 💎 +{sellPrice.toLocaleString()} / cái
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-1 shrink-0">
                              <button
                                onClick={() => sellItem(item.id, 1)}
                                className="px-2 py-1 rounded bg-slate-800 hover:bg-amber-600/30 text-amber-300 border border-amber-500/40 text-[10px] font-bold active:scale-95 transition"
                              >
                                Bán x1
                              </button>
                              {item.count > 1 && (
                                <button
                                  onClick={() => sellItem(item.id, item.count)}
                                  className="px-2 py-1 rounded bg-amber-600/20 hover:bg-amber-600/40 text-amber-200 border border-amber-500/60 text-[10px] font-bold active:scale-95 transition"
                                >
                                  Bán hết
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
