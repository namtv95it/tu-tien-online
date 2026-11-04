# Phàm Đạo 2D - Tu Tiên Ký (Mobile-First Web Edition)

> Game 2D Tu Tiên mô phỏng đời sống, bế quan ngoại tuyến, trồng linh thảo và luyện đan 3 pha tối ưu hóa cho màn hình điện thoại (Mobile-First PWA), chạy trực tiếp trên GitHub Pages.

---

## 📱 Điểm Nổi Bật Bản 2D Mobile-First

1. **Tối Ưu Tuyệt Đối Cho Điện Thoại:**
   - Khung hình chuẩn dọc (Portrait) thao tác một tay bằng ngón cái.
   - Kích thước siêu nhẹ: Bundle JS nén chỉ **~97 KB** (tải trong chớp mắt < 0.5s trên 4G/5G, không nóng máy, không hao pin).
   - Hỗ trợ thêm vào màn hình chính (Add to Home Screen) chơi như app gốc.

2. **Khung Cảnh 2D Tiên Hiệp Thủy Mặc:**
   - Nhân vật tọa thiền với hiệu ứng hào quang lãng đãng (breathing aura).
   - Bầu trời ngày đêm, trăng sao và rặng trúc thanh tịnh.

3. **5 Phân Hệ Tính Năng Cốt Lõi (Bottom Navigation):**
   - 🧘 **Tu Luyện:** Tọa thiền tụ khí, theo dõi kinh mạch / tâm cảnh, bế quan ngoại tuyến (tối đa 8h/ngày chuẩn GDD), đột phá cảnh giới (Phàm Nhân ➜ Luyện Khí tầng 1..3).
   - 🌿 **Linh Điền:** Quản lý ô đất, tưới nước Linh Tuyền giữ độ ẩm, gieo hạt giống (Thanh Diệp, Sương Thảo) và thu hoạch dược thảo thời gian thực.
   - 🏺 **Đan Phòng:** Lò đan 3 pha (Khai Lô ➜ Khống Hỏa với minigame chỉnh nhiệt độ ➜ Ngưng Đan), đánh giá 4 bậc phẩm chất: *Hạ phẩm, Trung phẩm, Thượng phẩm, Cực phẩm*.
   - 🏯 **Động Phủ:** Nâng cấp cảnh giới động phủ (*Thảo Lư ➜ Tiểu Động Phủ ➜ Linh Phủ*), kiến thiết 6 công trình nhận phúc lợi bị động (Giếng đá, Tụ linh trận, Bàn ngọc...).
   - 🎒 **Túi Đồ:** Quản lý kho, chạm uống đan dược lập tức tăng tu vi / hồi phục linh lực, xuất/nhập file Save JSON.

4. **Lưu Trữ Cục Bộ (IndexedDB):**
   - Tự động lưu tiến trình vào trình duyệt qua Dexie.js.

---

## 🎮 Hướng Dẫn Thao Tác Trên Điện Thoại

| Thao Tác | Công Năng |
|---|---|
| **Chạm khung cảnh / Nút Tọa Thiền** | Chuyển đổi trạng thái Tọa Thiền (nhập định) và Xuất Định |
| **Tab 🌿 Linh Điền** | Chạm để tưới nước, gieo hạt từ túi đồ hoặc thu hoạch |
| **Tab 🏺 Lò Đan** | Chọn đơn thuốc, chạm *Thúc Hỏa* / *Giảm Lửa* căn nhiệt độ rồi xuất lò |
| **Tab 🏯 Động Phủ** | Dùng linh thạch vụn nâng cấp động phủ và xây công trình |
| **Tab 🎒 Túi Đồ** | Chạm nút *Uống* trên đan hoàn để tăng tu vi; Xuất/Nhập file save |

---

## 🛠️ Công Nghệ Sử Dụng

- **Frontend:** React 18, TypeScript, Vite
- **UI & Styling:** Tailwind CSS, Lucide Icons, Custom Xianxia Theme
- **State Management:** Zustand
- **Database:** Dexie.js (IndexedDB)
- **CI/CD:** GitHub Actions (`.github/workflows/deploy.yml`)

---

## 🚀 Khởi Chạy Thử Cục Bộ

```powershell
npm run dev
```

Mở trình duyệt trên máy tính hoặc quét mã IP từ điện thoại cùng mạng Wi-Fi để trải nghiệm giao diện mobile mượt mà.
