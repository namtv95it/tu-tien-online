import React from 'react';
import { useGameStore } from '../../../store/gameStore';
import { ASSETS, getAssetUrl } from '../../../utils/assets';
import { DESIGN_LAYOUT } from '../../../utils/designCoordinates';

export const PhuongThiView: React.FC = () => {
  const marketCategory = useGameStore((state) => state.marketCategory);
  const setMarketCategory = useGameStore((state) => state.setMarketCategory);
  const buyFeaturedItem = useGameStore((state) => state.buyFeaturedItem);
  const setNotification = useGameStore((state) => state.setNotification);

  const L = DESIGN_LAYOUT.phuong_thi;

  return (
    <div className="absolute inset-0 w-full h-full select-none text-slate-100 overflow-hidden">
      {/* 1. Background Scene (Already contains the fair, gate, stalls, and merchants) */}
      <img
        src={ASSETS.backgrounds.phuongThi}
        alt="Chợ Tiên Hiệp"
        className="absolute inset-0 w-full h-full object-cover object-top pointer-events-none"
      />

      {/* 2. Khung Nhiệm Vụ (Top-Left) */}
      <div
        onClick={() => setNotification('Nhiệm vụ: Mua sắm tại Phường Thị để chuẩn bị đột phá cảnh giới')}
        style={{ left: L.khung_nhiem_vu.left, top: L.khung_nhiem_vu.top, width: L.khung_nhiem_vu.width, height: L.khung_nhiem_vu.height }}
        className="absolute z-20 cursor-pointer hover:scale-105 active:scale-95 transition drop-shadow-md"
        title="Nhiệm Vụ"
      >
        <img src={getAssetUrl(L.khung_nhiem_vu.path)} alt="Khung Nhiệm Vụ" className="w-full h-full object-contain" />
      </div>

      {/* 3. Banner Sự Kiện */}
      <div
        onClick={() => setNotification('Sự kiện: Giờ Vàng Phường Thị - Giảm giá 20% toàn bộ đan dược!')}
        style={{ left: L.banner_su_kien.left, top: L.banner_su_kien.top, width: L.banner_su_kien.width, height: L.banner_su_kien.height }}
        className="absolute z-20 cursor-pointer hover:scale-105 active:scale-95 transition drop-shadow-md"
        title="Sự Kiện Phường Thị"
      >
        <img src={getAssetUrl(L.banner_su_kien.path)} alt="Banner Sự Kiện" className="w-full h-full object-contain" />
      </div>

      {/* 4. Interactive Market Stalls Hotspots (The shops are painted in the background) */}
      {/* Sạp Linh Thảo Các (Top Left) */}
      <div
        onClick={() => { setMarketCategory('HERB'); setNotification('Đã vào Linh Thảo Các: Bách thảo tươi mới'); }}
        style={{ left: L.shop_linh_thao.left, top: L.shop_linh_thao.top, width: L.shop_linh_thao.width, height: L.shop_linh_thao.height }}
        className="absolute z-20 cursor-pointer rounded-2xl hover:bg-emerald-400/20 active:scale-95 transition"
        title="Linh Thảo Các"
      />

      {/* Sạp Pháp Khí Đường (Top Right) */}
      <div
        onClick={() => { setMarketCategory('WEAPON'); setNotification('Đã vào Pháp Khí Đường: Thần binh sắc bén'); }}
        style={{ left: L.shop_phap_khi.left, top: L.shop_phap_khi.top, width: L.shop_phap_khi.width, height: L.shop_phap_khi.height }}
        className="absolute z-20 cursor-pointer rounded-2xl hover:bg-cyan-400/20 active:scale-95 transition"
        title="Pháp Khí Đường"
      />

      {/* Sạp Đan Dược Các (Bottom Left) */}
      <div
        onClick={() => { setMarketCategory('PILL'); setNotification('Đã vào Đan Dược Các: Tiên đan diệu dược'); }}
        style={{ left: L.shop_dan_duoc.left, top: L.shop_dan_duoc.top, width: L.shop_dan_duoc.width, height: L.shop_dan_duoc.height }}
        className="absolute z-20 cursor-pointer rounded-2xl hover:bg-amber-400/20 active:scale-95 transition"
        title="Đan Dược Các"
      />

      {/* Sạp Công Pháp Phường (Bottom Right) */}
      <div
        onClick={() => { setMarketCategory('MANUAL'); setNotification('Đã vào Công Pháp Phường: Điển tịch bí truyền'); }}
        style={{ left: L.shop_cong_phap.left, top: L.shop_cong_phap.top, width: L.shop_cong_phap.width, height: L.shop_cong_phap.height }}
        className="absolute z-20 cursor-pointer rounded-2xl hover:bg-purple-400/20 active:scale-95 transition"
        title="Công Pháp Phường"
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
        onClick={() => { setMarketCategory('PILL'); setNotification('Chọn danh mục: Đan Dược'); }}
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
        onClick={() => { setMarketCategory('HERB'); setNotification('Chọn danh mục: Linh Thảo'); }}
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
        onClick={() => { setMarketCategory('WEAPON'); setNotification('Chọn danh mục: Pháp Khí'); }}
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
        onClick={() => { setMarketCategory('MANUAL'); setNotification('Chọn danh mục: Công Pháp'); }}
        style={{ left: L.o_cong_phap.left, top: L.o_cong_phap.top, width: L.o_cong_phap.width, height: L.o_cong_phap.height }}
        className={`absolute z-25 p-0 bg-transparent border-0 cursor-pointer active:scale-95 transition ${
          marketCategory === 'MANUAL' ? 'drop-shadow-[0_0_10px_rgba(168,85,247,0.9)] brightness-115 scale-105' : 'opacity-80 hover:opacity-100'
        }`}
        title="Công Pháp"
      >
        <img src={getAssetUrl(L.o_cong_phap.path)} alt="Ô Công Pháp" className="w-full h-full object-contain" />
      </button>

      {/* Bảng Vật Phẩm Đề Cử & Nút Mua */}
      <div
        style={{ left: L.bang_vat_pham_de_cu.left, top: L.bang_vat_pham_de_cu.top, width: L.bang_vat_pham_de_cu.width, height: L.bang_vat_pham_de_cu.height }}
        className="absolute z-22 pointer-events-none drop-shadow"
      >
        <img src={getAssetUrl(L.bang_vat_pham_de_cu.path)} alt="Bảng Vật Phẩm Đề Cử" className="w-full h-full object-contain" />
      </div>

      <div
        style={{ left: L.vat_pham_de_cu.left, top: L.vat_pham_de_cu.top, width: L.vat_pham_de_cu.width, height: L.vat_pham_de_cu.height }}
        className="absolute z-24 pointer-events-none drop-shadow"
      >
        <img src={getAssetUrl(L.vat_pham_de_cu.path)} alt="Vật Phẩm Đề Cử" className="w-full h-full object-contain" />
      </div>

      <button
        onClick={buyFeaturedItem}
        style={{ left: L.nut_mua.left, top: L.nut_mua.top, width: L.nut_mua.width, height: L.nut_mua.height }}
        className="absolute z-26 p-0 bg-transparent border-0 cursor-pointer active:scale-95 transition group"
        title="Mua Đan Trúc Cơ"
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
