import React, { useState } from 'react';
import { useGameStore } from '../../../store/gameStore';
import { ASSETS, getAssetUrl } from '../../../utils/assets';
import { DESIGN_LAYOUT } from '../../../utils/designCoordinates';

export const LuyenDanView: React.FC = () => {
  const selectedRecipeId = useGameStore((state) => state.selectedRecipeId);
  const setSelectedRecipe = useGameStore((state) => state.setSelectedRecipe);
  const fireIntensity = useGameStore((state) => state.fireIntensity);
  const setFireIntensity = useGameStore((state) => state.setFireIntensity);
  const alchemyBatchCount = useGameStore((state) => state.alchemyBatchCount);
  const setAlchemyBatchCount = useGameStore((state) => state.setAlchemyBatchCount);
  const startAlchemy = useGameStore((state) => state.startAlchemy);
  const setNotification = useGameStore((state) => state.setNotification);

  const [brewing, setBrewing] = useState(false);

  const L = DESIGN_LAYOUT.luyen_dan;

  const handleStartAlchemy = () => {
    setBrewing(true);
    startAlchemy();
    setTimeout(() => setBrewing(false), 1500);
  };

  return (
    <div className="absolute inset-0 w-full h-full select-none text-slate-100 overflow-hidden">
      {/* 1. Background Scene (Already contains the ancient furnace and alchemist) */}
      <img
        src={ASSETS.backgrounds.luyenDan}
        alt="Phòng Luyện Đan"
        className="absolute inset-0 w-full h-full object-cover object-top pointer-events-none"
      />

      {/* Flame effect over furnace when brewing */}
      {brewing && (
        <div
          style={{ left: L.lo_dan.left, top: L.lo_dan.top, width: L.lo_dan.width, height: L.lo_dan.height }}
          className="absolute z-21 pointer-events-none flex items-center justify-center"
        >
          <div className="w-28 h-28 rounded-full bg-orange-500/40 blur-2xl animate-ping" />
        </div>
      )}

      {/* 2. Tiêu Đề: Phòng Luyện Đan */}
      <div
        style={{ left: L.tieu_de.left, top: L.tieu_de.top, width: L.tieu_de.width, height: L.tieu_de.height }}
        className="absolute z-20 pointer-events-none drop-shadow-md"
      >
        <img src={getAssetUrl(L.tieu_de.path)} alt="Phòng Luyện Đan" className="w-full h-full object-contain" />
      </div>

      {/* 3. Danh Sách Đan Phương (Scroll list on left) */}
      <div
        style={{ left: L.danh_sach_dan_phuong.left, top: L.danh_sach_dan_phuong.top, width: L.danh_sach_dan_phuong.width, height: L.danh_sach_dan_phuong.height }}
        className="absolute z-20 drop-shadow-md"
      >
        <img src={getAssetUrl(L.danh_sach_dan_phuong.path)} alt="Danh Sách Đan Phương" className="w-full h-full object-contain" />
        {/* Hotspots to switch recipes */}
        <button
          onClick={() => { setSelectedRecipe('tu_khi_dan'); setNotification('Đã chọn: Tụ Khí Đan'); }}
          className={`absolute top-[18%] left-[8%] right-[8%] h-[24%] rounded cursor-pointer transition ${
            selectedRecipeId === 'tu_khi_dan' ? 'ring-2 ring-amber-400 bg-amber-400/20' : 'hover:bg-amber-400/10'
          }`}
          title="Tụ Khí Đan"
        />
        <button
          onClick={() => { setSelectedRecipe('trang_the_dan'); setNotification('Đã chọn: Tráng Thể Đan'); }}
          className={`absolute top-[44%] left-[8%] right-[8%] h-[24%] rounded cursor-pointer transition ${
            selectedRecipeId === 'trang_the_dan' ? 'ring-2 ring-cyan-400 bg-cyan-400/20' : 'hover:bg-cyan-400/10'
          }`}
          title="Tráng Thể Đan"
        />
        <button
          onClick={() => { setSelectedRecipe('thanh_tam_dan'); setNotification('Đã chọn: Thanh Tâm Đan'); }}
          className={`absolute top-[70%] left-[8%] right-[8%] h-[24%] rounded cursor-pointer transition ${
            selectedRecipeId === 'thanh_tam_dan' ? 'ring-2 ring-emerald-400 bg-emerald-400/20' : 'hover:bg-emerald-400/10'
          }`}
          title="Thanh Tâm Đan"
        />
      </div>

      {/* 4. Lịch Sử Luyện Đan (Right panel) */}
      <div
        onClick={() => setNotification('Lịch sử luyện đan: Luyện thành công 5/6 lò gần nhất!')}
        style={{ left: L.lich_su_luyen_dan.left, top: L.lich_su_luyen_dan.top, width: L.lich_su_luyen_dan.width, height: L.lich_su_luyen_dan.height }}
        className="absolute z-20 cursor-pointer hover:scale-105 active:scale-95 transition drop-shadow-md"
        title="Lịch Sử Luyện Đan"
      >
        <img src={getAssetUrl(L.lich_su_luyen_dan.path)} alt="Lịch Sử Luyện Đan" className="w-full h-full object-contain" />
      </div>

      {/* 5. Khung Thông Tin Đan Dược */}
      <div
        style={{ left: L.khung_thong_tin_dan.left, top: L.khung_thong_tin_dan.top, width: L.khung_thong_tin_dan.width, height: L.khung_thong_tin_dan.height }}
        className="absolute z-20 pointer-events-none drop-shadow-md"
      >
        <img src={getAssetUrl(L.khung_thong_tin_dan.path)} alt="Khung Thông Tin Đan" className="w-full h-full object-fill" />
      </div>

      <div
        style={{ left: L.icon_tu_khi_dan.left, top: L.icon_tu_khi_dan.top, width: L.icon_tu_khi_dan.width, height: L.icon_tu_khi_dan.height }}
        className="absolute z-25 pointer-events-none drop-shadow"
      >
        <img src={getAssetUrl(L.icon_tu_khi_dan.path)} alt="Icon Đan Dược" className="w-full h-full object-contain" />
      </div>

      {/* 6. Khung Nguyên Liệu */}
      <div
        style={{ left: L.khung_nguyen_lieu.left, top: L.khung_nguyen_lieu.top, width: L.khung_nguyen_lieu.width, height: L.khung_nguyen_lieu.height }}
        className="absolute z-20 pointer-events-none drop-shadow-md"
      >
        <img src={getAssetUrl(L.khung_nguyen_lieu.path)} alt="Khung Nguyên Liệu" className="w-full h-full object-fill" />
      </div>

      {/* 4 Nguyên Liệu Slots */}
      <div
        onClick={() => setNotification('Nhân Sâm 50 năm: Đủ 2/2')}
        style={{ left: L.nguyen_lieu_nhan_sam.left, top: L.nguyen_lieu_nhan_sam.top, width: L.nguyen_lieu_nhan_sam.width, height: L.nguyen_lieu_nhan_sam.height }}
        className="absolute z-25 cursor-pointer hover:scale-105 active:scale-95 transition drop-shadow"
        title="Nhân Sâm"
      >
        <img src={getAssetUrl(L.nguyen_lieu_nhan_sam.path)} alt="Nhân Sâm" className="w-full h-full object-contain" />
      </div>

      <div
        onClick={() => setNotification('Hàn Băng Hoa Tím: Đủ 1/1')}
        style={{ left: L.nguyen_lieu_hoa_tim.left, top: L.nguyen_lieu_hoa_tim.top, width: L.nguyen_lieu_hoa_tim.width, height: L.nguyen_lieu_hoa_tim.height }}
        className="absolute z-25 cursor-pointer hover:scale-105 active:scale-95 transition drop-shadow"
        title="Hoa Tím"
      >
        <img src={getAssetUrl(L.nguyen_lieu_hoa_tim.path)} alt="Hoa Tím" className="w-full h-full object-contain" />
      </div>

      <div
        onClick={() => setNotification('Linh Thạch Hạ Phẩm: Đủ 5/5')}
        style={{ left: L.nguyen_lieu_linh_thach.left, top: L.nguyen_lieu_linh_thach.top, width: L.nguyen_lieu_linh_thach.width, height: L.nguyen_lieu_linh_thach.height }}
        className="absolute z-25 cursor-pointer hover:scale-105 active:scale-95 transition drop-shadow"
        title="Linh Thạch"
      >
        <img src={getAssetUrl(L.nguyen_lieu_linh_thach.path)} alt="Linh Thạch" className="w-full h-full object-contain" />
      </div>

      <div
        onClick={() => setNotification('Linh Chi Đỏ: Đủ 1/1')}
        style={{ left: L.nguyen_lieu_linh_chi.left, top: L.nguyen_lieu_linh_chi.top, width: L.nguyen_lieu_linh_chi.width, height: L.nguyen_lieu_linh_chi.height }}
        className="absolute z-25 cursor-pointer hover:scale-105 active:scale-95 transition drop-shadow"
        title="Linh Chi"
      >
        <img src={getAssetUrl(L.nguyen_lieu_linh_chi.path)} alt="Linh Chi" className="w-full h-full object-contain" />
      </div>

      {/* 7. Ba Bước Luyện Đan */}
      <div
        style={{ left: L.buoc_tinh_luyen.left, top: L.buoc_tinh_luyen.top, width: L.buoc_tinh_luyen.width, height: L.buoc_tinh_luyen.height }}
        className="absolute z-20 pointer-events-none drop-shadow"
      >
        <img src={getAssetUrl(L.buoc_tinh_luyen.path)} alt="Bước Tinh Luyện" className="w-full h-full object-contain" />
      </div>

      <div
        style={{ left: L.buoc_dung_hop.left, top: L.buoc_dung_hop.top, width: L.buoc_dung_hop.width, height: L.buoc_dung_hop.height }}
        className="absolute z-20 pointer-events-none drop-shadow"
      >
        <img src={getAssetUrl(L.buoc_dung_hop.path)} alt="Bước Dung Hợp" className="w-full h-full object-contain" />
      </div>

      <div
        style={{ left: L.buoc_ngung_dan.left, top: L.buoc_ngung_dan.top, width: L.buoc_ngung_dan.width, height: L.buoc_ngung_dan.height }}
        className="absolute z-20 pointer-events-none drop-shadow"
      >
        <img src={getAssetUrl(L.buoc_ngung_dan.path)} alt="Bước Ngưng Đan" className="w-full h-full object-contain" />
      </div>

      {/* 8. Thanh Cường Độ Lửa */}
      <div
        style={{ left: L.thanh_cuong_do_lua.left, top: L.thanh_cuong_do_lua.top, width: L.thanh_cuong_do_lua.width, height: L.thanh_cuong_do_lua.height }}
        className="absolute z-20 drop-shadow"
      >
        <img src={getAssetUrl(L.thanh_cuong_do_lua.path)} alt="Thanh Cường Độ Lửa" className="w-full h-full object-contain" />
        {/* Fire adjust buttons */}
        <button
          onClick={() => setFireIntensity(fireIntensity - 1)}
          className="absolute left-[3%] top-[10%] bottom-[10%] w-[12%] rounded-full cursor-pointer hover:bg-amber-400/20 active:scale-90 transition"
          title="Giảm Cường Độ Lửa"
        />
        <button
          onClick={() => setFireIntensity(fireIntensity + 1)}
          className="absolute right-[3%] top-[10%] bottom-[10%] w-[12%] rounded-full cursor-pointer hover:bg-orange-500/20 active:scale-90 transition"
          title="Tăng Cường Độ Lửa"
        />
      </div>

      {/* 9. Khung Dự Đoán Phẩm Chất */}
      <div
        style={{ left: L.khung_du_doan_pham_chat.left, top: L.khung_du_doan_pham_chat.top, width: L.khung_du_doan_pham_chat.width, height: L.khung_du_doan_pham_chat.height }}
        className="absolute z-20 pointer-events-none drop-shadow-md"
      >
        <img src={getAssetUrl(L.khung_du_doan_pham_chat.path)} alt="Dự Đoán Phẩm Chất" className="w-full h-full object-fill" />
      </div>

      {/* 10. Nút Bắt Đầu Luyện Đan & Số Lần Luyện */}
      <button
        onClick={handleStartAlchemy}
        style={{ left: L.nut_bat_dau_luyen_dan.left, top: L.nut_bat_dau_luyen_dan.top, width: L.nut_bat_dau_luyen_dan.width, height: L.nut_bat_dau_luyen_dan.height }}
        className="absolute z-25 p-0 bg-transparent border-0 cursor-pointer active:scale-95 transition group"
        title="Bắt Đầu Luyện Đan"
      >
        <img
          src={getAssetUrl(L.nut_bat_dau_luyen_dan.path)}
          alt="Bắt Đầu Luyện Đan"
          className="w-full h-full object-contain filter group-hover:brightness-115 group-hover:drop-shadow-[0_0_14px_rgba(245,158,11,0.8)] drop-shadow transition"
        />
      </button>

      <div
        style={{ left: L.so_lan_luyen.left, top: L.so_lan_luyen.top, width: L.so_lan_luyen.width, height: L.so_lan_luyen.height }}
        className="absolute z-25 drop-shadow"
      >
        <img src={getAssetUrl(L.so_lan_luyen.path)} alt="Số Lần Luyện" className="w-full h-full object-contain" />
        {/* Count adjust buttons */}
        <button
          onClick={() => setAlchemyBatchCount(alchemyBatchCount - 1)}
          className="absolute left-[8%] top-[10%] bottom-[10%] w-[25%] rounded-full cursor-pointer hover:bg-amber-400/20 active:scale-90 transition"
          title="Giảm Số Lần"
        />
        <button
          onClick={() => setAlchemyBatchCount(alchemyBatchCount + 1)}
          className="absolute right-[8%] top-[10%] bottom-[10%] w-[25%] rounded-full cursor-pointer hover:bg-amber-400/20 active:scale-90 transition"
          title="Tăng Số Lần"
        />
      </div>
    </div>
  );
};
