import React from 'react';
import { MobileTab } from '../../../types/game';

interface XianxiaAtmosphereProps {
  tab: MobileTab;
}

export const XianxiaAtmosphere: React.FC<XianxiaAtmosphereProps> = ({ tab }) => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-15">
      {/* 1. Màn Tu Luyện: Hào quang & Linh khí tụ hội */}
      {tab === 'tu-luyen' && (
        <>
          {/* Vòng linh khí thở nhẹ xung quanh đài tọa */}
          <div className="absolute top-[28%] left-1/2 -translate-x-1/2 w-48 h-48 rounded-full bg-cyan-400/15 blur-2xl animate-pulse" />
          {/* Các đốm linh khí tụ hội bay lên */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              style={{
                left: `${35 + (i * 6)}%`,
                top: `${40 + (i % 3) * 5}%`,
                animationDelay: `${i * 0.4}s`,
                animationDuration: `${2.5 + (i % 3) * 0.5}s`,
              }}
              className="absolute w-1.5 h-1.5 rounded-full bg-amber-300 shadow-[0_0_8px_rgba(245,158,11,0.9)] animate-bounce opacity-70"
            />
          ))}
        </>
      )}

      {/* 2. Màn Luyện Đan: Khói thơm & Tàn lửa */}
      {tab === 'luyen-dan' && (
        <>
          {/* Ánh lửa lập lòe dưới đáy lò đan */}
          <div className="absolute top-[32%] left-[46%] w-14 h-14 rounded-full bg-orange-500/25 blur-xl animate-pulse" />
          {/* Làn khói dược thảo bốc lên từ nắp lò */}
          <div className="absolute top-[18%] left-[48%] w-8 h-12 bg-gradient-to-t from-purple-400/20 to-transparent blur-md rounded-full animate-pulse" />
          {/* Tàn lửa li ti */}
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              style={{
                left: `${45 + (i * 2.5)}%`,
                top: `${26 + (i % 2) * 4}%`,
                animationDelay: `${i * 0.3}s`,
                animationDuration: `${1.8 + i * 0.3}s`,
              }}
              className="absolute w-1 h-1 rounded-full bg-amber-400 shadow-[0_0_6px_rgba(245,158,11,0.8)] animate-ping opacity-60"
            />
          ))}
        </>
      )}

      {/* 3. Màn Linh Điền: Đom đóm thảo dược & Làn sương bờ suối */}
      {tab === 'linh-dien' && (
        <>
          {/* Đom đóm linh thảo xanh ngọc */}
          {[...Array(7)].map((_, i) => (
            <div
              key={i}
              style={{
                left: `${20 + (i * 10)}%`,
                top: `${35 + (i % 4) * 8}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${3 + (i % 3)}s`,
              }}
              className="absolute w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)] animate-pulse opacity-75"
            />
          ))}
          {/* Nước suối phản chiếu ánh sáng lấp lánh */}
          <div className="absolute top-[65%] left-[25%] w-16 h-8 bg-cyan-300/15 blur-lg rounded-full animate-pulse" />
        </>
      )}

      {/* 4. Màn Phường Thị: Cánh hoa đào bay lượn */}
      {tab === 'phuong-thi' && (
        <>
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              style={{
                left: `${10 + (i * 11)}%`,
                top: `${15 + (i % 5) * 12}%`,
                animationDelay: `${i * 0.7}s`,
                animationDuration: `${4 + (i % 3)}s`,
              }}
              className="absolute w-2 h-2 rounded-full bg-rose-300/60 shadow-[0_0_4px_rgba(244,114,182,0.6)] animate-pulse"
            />
          ))}
        </>
      )}

      {/* 5. Màn Động Phủ: Sương khói mây ngàn */}
      {tab === 'dong-phu' && (
        <>
          <div className="absolute bottom-[10%] left-0 right-0 h-16 bg-gradient-to-t from-cyan-900/10 to-transparent blur-md pointer-events-none" />
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              style={{
                left: `${30 + (i * 12)}%`,
                top: `${20 + (i % 3) * 10}%`,
                animationDelay: `${i * 0.6}s`,
              }}
              className="absolute w-1.5 h-1.5 rounded-full bg-amber-200/50 shadow-[0_0_6px_rgba(253,230,138,0.7)] animate-pulse"
            />
          ))}
        </>
      )}
    </div>
  );
};

