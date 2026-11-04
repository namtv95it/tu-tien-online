import React, { useState } from 'react';
import { useGameStore } from '../../../store/gameStore';
import { ASSETS, getAssetUrl } from '../../../utils/assets';
import { DESIGN_LAYOUT } from '../../../utils/designCoordinates';

export const PhuongThiView: React.FC = () => {
  const marketCategory = useGameStore((state) => state.marketCategory);
  const setMarketCategory = useGameStore((state) => state.setMarketCategory);
  const allMarketItems = useGameStore((state) => state.allMarketItems);
  const buyMarketItem = useGameStore((state) => state.buyMarketItem);
  const buyFeaturedItem = useGameStore((state) => state.buyFeaturedItem);
  const setNotification = useGameStore((state) => state.setNotification);
  const openModal = useGameStore((state) => state.openModal);
  const openStallModal = useGameStore((state) => state.openStallModal);

  const [selectedItemId, setSelectedItemId] = useState<string>('dan_truc_co');

  const L = DESIGN_LAYOUT.phuong_thi;

  const categoryItems = allMarketItems.filter((m) => m.category === marketCategory);
  const currentItem = categoryItems.find((m) => m.id === selectedItemId) || categoryItems[0] || allMarketItems[0];

  const handleSelectCategory = (cat: 'PILL' | 'HERB' | 'WEAPON' | 'MANUAL', label: string) => {
    setMarketCategory(cat);
    const firstOfCat = allMarketItems.find((m) => m.category === cat);
    if (firstOfCat) {
      setSelectedItemId(firstOfCat.id);
    }
    setNotification(`Đã chuyển sang: ${label}`);
  };

  const handleBuy = () => {
    if (!currentItem) return;
    if (currentItem.id === 'dan_truc_co') {
      buyFeaturedItem();
    } else {
      buyMarketItem(currentItem);
    }
  };

  return (
    <div className="absolute inset-0 w-full h-full select-none text-slate-100 overflow-hidden">
      {/* 1. Background Scene (Already contains the fair, gate, stalls, and merchants) */}
      <img
        src={ASSETS.backgrounds.phuongThi}
        alt="Chợ Tiên Hiệp"
        className="absolute inset-0 w-full h-full object-cover object-top pointer-events-none"
      />

      {/* 2. Khung Nhiệm Vụ (Top-Left) từ assets/images/khung */}
      <div
        onClick={() => openModal('QUESTS')}
        style={{ left: L.khung_nhiem_vu.left, top: L.khung_nhiem_vu.top, width: L.khung_nhiem_vu.width, height: L.khung_nhiem_vu.height }}
        className="absolute z-20 cursor-pointer hover:scale-105 active:scale-95 transition drop-shadow-md"
        title="Nhiệm Vụ Phường Thị"
      >
        <img
          src={ASSETS.khung.nhiemVu}
          onError={(e) => {
            e.currentTarget.src = ASSETS.ui.bangNhiemVu;
          }}
          alt="Khung Nhiệm Vụ"
          className="w-full h-full object-contain filter drop-shadow"
        />
      </div>

      {/* 3. Banner Sự Kiện từ assets/images/khung */}
      <div
        onClick={() => openModal('EVENT')}
        style={{ left: L.banner_su_kien.left, top: L.banner_su_kien.top, width: L.banner_su_kien.width, height: L.banner_su_kien.height }}
        className="absolute z-20 cursor-pointer hover:scale-105 active:scale-95 transition drop-shadow-md"
        title="Banner Sự Kiện"
      >
        <img
          src={ASSETS.khung.bannerSuKien}
          onError={(e) => {
            e.currentTarget.src = ASSETS.ui.bannerSuKien;
          }}
          alt="Banner Sự Kiện"
          className="w-full h-full object-contain filter drop-shadow"
        />
      </div>

      {/* 4. Interactive Market Stalls Hotspots (The shops are painted in the background) */}
      {/* Sạp Linh Thảo Các (Top Left) */}
      <div
        onClick={() => openStallModal('HERB')}
        style={{ left: L.shop_linh_thao.left, top: L.shop_linh_thao.top, width: L.shop_linh_thao.width, height: L.shop_linh_thao.height }}
        className="absolute z-20 cursor-pointer rounded-2xl hover:bg-emerald-400/20 active:scale-95 transition"
        title="Linh Thảo Các (Bấm để mở gian hàng)"
      />

      {/* Sạp Pháp Khí Đường (Top Right) */}
      <div
        onClick={() => openStallModal('WEAPON')}
        style={{ left: L.shop_phap_khi.left, top: L.shop_phap_khi.top, width: L.shop_phap_khi.width, height: L.shop_phap_khi.height }}
        className="absolute z-20 cursor-pointer rounded-2xl hover:bg-cyan-400/20 active:scale-95 transition"
        title="Pháp Khí Đường (Bấm để mở gian hàng)"
      />

      {/* Sạp Đan Dược Các (Bottom Left) */}
      <div
        onClick={() => openStallModal('PILL')}
        style={{ left: L.shop_dan_duoc.left, top: L.shop_dan_duoc.top, width: L.shop_dan_duoc.width, height: L.shop_dan_duoc.height }}
        className="absolute z-20 cursor-pointer rounded-2xl hover:bg-amber-400/20 active:scale-95 transition"
        title="Đan Dược Các (Bấm để mở gian hàng)"
      />

      {/* Sạp Công Pháp Phường (Bottom Right) */}
      <div
        onClick={() => openStallModal('MANUAL')}
        style={{ left: L.shop_cong_phap.left, top: L.shop_cong_phap.top, width: L.shop_cong_phap.width, height: L.shop_cong_phap.height }}
        className="absolute z-20 cursor-pointer rounded-2xl hover:bg-purple-400/20 active:scale-95 transition"
        title="Công Pháp Phường (Bấm để mở gian hàng)"
      />

      {/* 5. Khung Giao Dịch (Bottom Panel) */}
      <div
        style={{ left: L.khung_giao_dich.left, top: L.khung_giao_dich.top, width: L.khung_giao_dich.width, height: L.khung_giao_dich.height }}
        className="absolute z-20 pointer-events-none drop-shadow-lg"
      >
        <img src={getAssetUrl(L.khung_giao_dich.path)} alt="Khung Giao Dịch" className="w-full h-full object-fill" />
      </div>

      {/* Bảng Danh Mục */}
      <div
        style={{ left: L.bang_danh_muc.left, top: L.bang_danh_muc.top, width: L.bang_danh_muc.width, height: L.bang_danh_muc.height }}
        className="absolute z-22 pointer-events-none drop-shadow"
      >
        <img src={getAssetUrl(L.bang_danh_muc.path)} alt="Bảng Danh Mục" className="w-full h-full object-contain" />
      </div>

      {/* Ô Đan Dược */}
      <button
        onClick={() => handleSelectCategory('PILL', 'Đan Dược')}
        style={{ left: L.o_dan_duoc.left, top: L.o_dan_duoc.top, width: L.o_dan_duoc.width, height: L.o_dan_duoc.height }}
        className={`absolute z-25 p-0 bg-transparent border-0 cursor-pointer active:scale-95 transition ${
          marketCategory === 'PILL' ? 'drop-shadow-[0_0_10px_rgba(245,158,11,0.9)] brightness-115 scale-105' : 'opacity-80 hover:opacity-100'
        }`}
        title="Đan Dược"
      >
        <img src={getAssetUrl(L.o_dan_duoc.path)} alt="Ô Đan Dược" className="w-full h-full object-contain" />
      </button>

      {/* Ô Linh Thảo */}
      <button
        onClick={() => handleSelectCategory('HERB', 'Linh Thảo')}
        style={{ left: L.o_linh_thao.left, top: L.o_linh_thao.top, width: L.o_linh_thao.width, height: L.o_linh_thao.height }}
        className={`absolute z-25 p-0 bg-transparent border-0 cursor-pointer active:scale-95 transition ${
          marketCategory === 'HERB' ? 'drop-shadow-[0_0_10px_rgba(52,211,153,0.9)] brightness-115 scale-105' : 'opacity-80 hover:opacity-100'
        }`}
        title="Linh Thảo"
      >
        <img src={getAssetUrl(L.o_linh_thao.path)} alt="Ô Linh Thảo" className="w-full h-full object-contain" />
      </button>

      {/* Ô Pháp Khí */}
      <button
        onClick={() => handleSelectCategory('WEAPON', 'Pháp Khí')}
        style={{ left: L.o_phap_khi.left, top: L.o_phap_khi.top, width: L.o_phap_khi.width, height: L.o_phap_khi.height }}
        className={`absolute z-25 p-0 bg-transparent border-0 cursor-pointer active:scale-95 transition ${
          marketCategory === 'WEAPON' ? 'drop-shadow-[0_0_10px_rgba(56,189,248,0.9)] brightness-115 scale-105' : 'opacity-80 hover:opacity-100'
        }`}
        title="Pháp Khí"
      >
        <img src={getAssetUrl(L.o_phap_khi.path)} alt="Ô Pháp Khí" className="w-full h-full object-contain" />
      </button>

      {/* Ô Công Pháp */}
      <button
        onClick={() => handleSelectCategory('MANUAL', 'Công Pháp')}
        style={{ left: L.o_cong_phap.left, top: L.o_cong_phap.top, width: L.o_cong_phap.width, height: L.o_cong_phap.height }}
        className={`absolute z-25 p-0 bg-transparent border-0 cursor-pointer active:scale-95 transition ${
          marketCategory === 'MANUAL' ? 'drop-shadow-[0_0_10px_rgba(168,85,247,0.9)] brightness-115 scale-105' : 'opacity-80 hover:opacity-100'
        }`}
        title="Công Pháp"
      >
        <img src={getAssetUrl(L.o_cong_phap.path)} alt="Ô Công Pháp" className="w-full h-full object-contain" />
      </button>

      {/* Bảng Vật Phẩm Đề Cử / Item Showcase */}
      <div
        style={{ left: L.bang_vat_pham_de_cu.left, top: L.bang_vat_pham_de_cu.top, width: L.bang_vat_pham_de_cu.width, height: L.bang_vat_pham_de_cu.height }}
        className="absolute z-22 pointer-events-none drop-shadow"
      >
        <img src={getAssetUrl(L.bang_vat_pham_de_cu.path)} alt="Bảng Vật Phẩm Đề Cử" className="w-full h-full object-contain" />
      </div>

      {/* Item Display or Featured Item Asset */}
      {currentItem && currentItem.id === 'dan_truc_co' ? (
        <div
          style={{ left: L.vat_pham_de_cu.left, top: L.vat_pham_de_cu.top, width: L.vat_pham_de_cu.width, height: L.vat_pham_de_cu.height }}
          className="absolute z-24 pointer-events-none drop-shadow"
        >
          <img src={getAssetUrl(L.vat_pham_de_cu.path)} alt="Vật Phẩm Đề Cử" className="w-full h-full object-contain" />
        </div>
      ) : currentItem ? (
        <div
          style={{ left: L.vat_pham_de_cu.left, top: L.vat_pham_de_cu.top, width: L.vat_pham_de_cu.width, height: L.vat_pham_de_cu.height }}
          className="absolute z-24 flex items-center gap-2 px-2 bg-slate-950/60 backdrop-blur-sm rounded-lg border border-amber-500/30 drop-shadow"
        >
          <div className="w-9 h-9 rounded bg-amber-950/50 border border-amber-600/40 flex items-center justify-center text-xl shrink-0">
            {currentItem.icon || '📦'}
          </div>
          <div className="flex-1 min-w-0 pr-1">
            <div className="text-[11px] font-bold text-amber-200 truncate flex items-center gap-1">
              <span>{currentItem.name}</span>
              <span className="text-[9px] px-1 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                {currentItem.rarity}
              </span>
            </div>
            <div className="text-[9px] text-amber-100/70 truncate">{currentItem.description}</div>
            <div className="text-[10px] text-emerald-400 font-mono font-bold flex items-center gap-1">
              <span>💎 {currentItem.discountPrice.toLocaleString()}</span>
              {currentItem.originalPrice > currentItem.discountPrice && (
                <span className="line-through text-slate-400 text-[8px]">
                  {currentItem.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
          </div>
        </div>
      ) : null}

      {/* Items list selector pills */}
      <div
        style={{ left: '50%', top: '71.5%', width: '42%' }}
        className="absolute z-25 flex items-center gap-1 overflow-x-auto no-scrollbar"
      >
        {categoryItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setSelectedItemId(item.id)}
            className={`px-1.5 py-0.5 rounded text-[8px] font-medium shrink-0 transition border ${
              (currentItem?.id === item.id)
                ? 'bg-amber-500/30 text-amber-200 border-amber-400 shadow-[0_0_6px_rgba(245,158,11,0.5)]'
                : 'bg-black/40 text-slate-300 border-white/10 hover:border-amber-400/40'
            }`}
          >
            {item.name.split(' ')[0]}
          </button>
        ))}
      </div>

      {/* Nút Xem Chi Tiết Cửa Hàng */}
      <button
        onClick={() => openStallModal(marketCategory)}
        style={{ left: '68%', top: '68.2%' }}
        className="absolute z-26 px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-[9px] font-bold border border-amber-300 shadow-[0_0_8px_rgba(245,158,11,0.6)] active:scale-95 transition flex items-center gap-0.5"
        title="Mở Bảng Mua Bán Toàn Diện Của Gian Hàng"
      >
        <span>Vào Gian Hàng</span>
        <span>›</span>
      </button>

      {/* Nút Mua */}
      <button
        onClick={handleBuy}
        disabled={currentItem?.bought}
        style={{ left: L.nut_mua.left, top: L.nut_mua.top, width: L.nut_mua.width, height: L.nut_mua.height }}
        className={`absolute z-26 p-0 bg-transparent border-0 cursor-pointer active:scale-95 transition group ${
          currentItem?.bought ? 'opacity-50 grayscale cursor-not-allowed' : ''
        }`}
        title={currentItem?.bought ? 'Đã Mua' : `Mua ${currentItem?.name}`}
      >
        <img
          src={getAssetUrl(L.nut_mua.path)}
          alt="Mua"
          className="w-full h-full object-contain filter group-hover:brightness-115 group-hover:drop-shadow-[0_0_10px_rgba(245,158,11,0.8)] drop-shadow transition"
        />
      </button>
    </div>
  );
};
