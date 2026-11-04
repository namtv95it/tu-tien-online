import React from 'react';
import { useGameStore } from '../../../store/gameStore';

export const PhuongThiView: React.FC = () => {
  const setMarketCategory = useGameStore((state) => state.setMarketCategory);
  const buyFeaturedItem = useGameStore((state) => state.buyFeaturedItem);
  const setNotification = useGameStore((state) => state.setNotification);

  return (
    <div className="relative w-full aspect-[9/16] min-h-[700px] select-none text-slate-100 overflow-hidden shadow-inner">
      {/* 1. High-Res Design Artwork Background */}
      <img
        src={`${import.meta.env.BASE_URL}design/phuong-thi.png`}
        alt="Phường Thị"
        className="absolute inset-0 w-full h-full object-cover object-top pointer-events-none"
      />

      {/* 2. Interactive Market Stalls in Scene */}
      {/* Linh Thảo Các (Top Left) */}
      <div
        onClick={() => {
          setMarketCategory('HERB');
          setNotification('Linh Thảo Các: Bán các loại thảo dược nghìn năm tươi mới.');
        }}
        className="absolute top-[32%] left-[10%] w-[32%] h-[14%] z-20 cursor-pointer rounded-2xl hover:bg-emerald-500/20 active:scale-95 transition"
        title="Linh Thảo Các"
      />

      {/* Đan Dược Các (Bottom Left) */}
      <div
        onClick={() => {
          setMarketCategory('PILL');
          setNotification('Đan Dược Các: Đan dược trân quý, tăng tu vi vượt bậc!');
        }}
        className="absolute top-[50%] left-[8%] w-[32%] h-[16%] z-20 cursor-pointer rounded-2xl hover:bg-amber-500/20 active:scale-95 transition"
        title="Đan Dược Các"
      />

      {/* Pháp Khí Đường (Top Right) */}
      <div
        onClick={() => {
          setMarketCategory('WEAPON');
          setNotification('Pháp Khí Đường: Kiếm quang vạn dặm, pháp khí hộ thân sắc bén!');
        }}
        className="absolute top-[34%] right-[8%] w-[32%] h-[14%] z-20 cursor-pointer rounded-2xl hover:bg-blue-500/20 active:scale-95 transition"
        title="Pháp Khí Đường"
      />

      {/* Công Pháp Phường (Bottom Right) */}
      <div
        onClick={() => {
          setMarketCategory('MANUAL');
          setNotification('Công Pháp Phường: Điển tịch bí truyền, lĩnh ngộ đạo lý!');
        }}
        className="absolute top-[51%] right-[8%] w-[32%] h-[16%] z-20 cursor-pointer rounded-2xl hover:bg-purple-500/20 active:scale-95 transition"
        title="Công Pháp Phường"
      />

      {/* 3. Trade Category Selector (Bottom Left 4 Buttons) */}
      <div className="absolute bottom-[8%] left-[4%] w-[42%] h-[18%] z-20 grid grid-cols-2 gap-1.5">
        <button
          onClick={() => setMarketCategory('PILL')}
          className="rounded-lg opacity-0 hover:opacity-20 bg-amber-400 cursor-pointer"
          title="Đan dược"
        />
        <button
          onClick={() => setMarketCategory('HERB')}
          className="rounded-lg opacity-0 hover:opacity-20 bg-emerald-400 cursor-pointer"
          title="Linh thảo"
        />
        <button
          onClick={() => setMarketCategory('WEAPON')}
          className="rounded-lg opacity-0 hover:opacity-20 bg-blue-400 cursor-pointer"
          title="Pháp khí"
        />
        <button
          onClick={() => setMarketCategory('MANUAL')}
          className="rounded-lg opacity-0 hover:opacity-20 bg-purple-400 cursor-pointer"
          title="Công pháp"
        />
      </div>

      {/* 4. Buy Button for Featured Item: "Đan Trúc Cơ" */}
      <button
        onClick={buyFeaturedItem}
        className="absolute bottom-[9.5%] right-[6%] w-[20%] h-[4.5%] z-20 rounded-full opacity-0 hover:opacity-25 bg-amber-400 cursor-pointer active:scale-95 shadow-md"
        title="Mua Đan Trúc Cơ (48.000 Linh Thạch)"
      />
    </div>
  );
};
