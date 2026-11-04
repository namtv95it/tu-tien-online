# Phàm Đạo 3D - Tu Tiên Ký (Web Edition)

> Game 3D Tu Tiên mô phỏng đời sống, khám phá nhẹ, bế quan ngoại tuyến và luyện đan chạy hoàn toàn trên trình duyệt (Static Web / GitHub Pages).

---

## 🌟 Tính Năng Nổi Bật (MVP)

- **3D Web-First:** Dựng hình bằng Three.js & React Three Fiber mượt mà trên laptop và trình duyệt thông thường.
- **Phong Cách Tiên Hiệp:** Giao diện thủy mặc thanh tịnh, chu kỳ ngày đêm, cảnh quan trúc lâm và am thất cổ phong.
- **Tu Vi & Tọa Thiền Tụ Khí:** Ngồi thiền trên bồ đoàn tích lũy tu vi theo thời gian thực.
- **Bế Quan Ngoại Tuyến (Offline Settlement):** Dù tắt trình duyệt, khi quay lại người chơi vẫn nhận được tu vi bế quan (tối đa 8 giờ/ngày theo chuẩn GDD).
- **Đột Phá Cảnh Giới:** Tích lũy đủ tu vi để cảm ứng thiên kiếp, đột phá từ Phàm Nhân lên Luyện Khí các tầng.
- **Lưu Trữ Cục Bộ (IndexedDB):** Lưu tự động trong trình duyệt với Dexie.js + hỗ trợ Xuất/Nhập file Save `.json`.
- **Triển Khai Tự Động:** Tích hợp sẵn GitHub Actions tự động build và xuất bản lên GitHub Pages khi push code.

---

## 🎮 Hướng Dẫn Thao Tác

| Phím / Thao Tác | Công Năng |
|---|---|
| `W` `A` `S` `D` / Phím mũi tên | Di chuyển nhân vật trong không gian 3D |
| `Shift` | Chạy nhanh |
| `Click Chuột` vào Bồ Đoàn / Nút Tọa Thiền | Tọa thiền tĩnh tâm tụ khí / Thu công đứng dậy |
| Nút `Túi Trữ Vật` | Mở xem dược liệu, hạt giống, linh thạch |
| Nút `Lưu Trữ` | Tải xuống file save JSON hoặc khôi phục dữ liệu |

---

## 🛠️ Công Nghệ Sử Dụng

- **Frontend Framework:** React 18 + TypeScript + Vite
- **3D Graphics Engine:** Three.js, React Three Fiber (R3F), `@react-three/drei`, `@react-three/rapier`
- **Quản lý State:** Zustand
- **Cơ Sở Dữ Liệu:** Dexie.js (IndexedDB wrapper)
- **Styling:** Tailwind CSS + Lucide Icons
- **CI/CD:** GitHub Actions (`.github/workflows/deploy.yml`)

---

## 🚀 Khởi Chạy Dự Án Cục Bộ

1. Cài đặt các thư viện phụ thuộc:
```bash
npm install
```

2. Khởi chạy máy chủ phát triển:
```bash
npm run dev
```

3. Build bản phát hành production:
```bash
npm run build
```
