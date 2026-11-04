# BẢNG ĐÁNH DẤU TIẾN ĐỘ DỰ ÁN: PHÀM ĐẠO 2D (MOBILE-FIRST)
> **Cập nhật:** Phiên bản 2.0 • Trực tiếp trên mã nguồn `tu-tien-online`

---

## 📊 Tổng Quan Tiến Độ Dự Án: **75% Hoàn Thành (Bản MVP Alpha)**

```text
[████████████████████████████████████░░░░░░░░░░] 75%
```

| Phân Hệ | Tiến Độ | Trạng Thái | Ghi Chú |
|---|:---:|:---:|---|
| **1. Hạ Tầng & CI/CD** | 100% | ✅ Hoàn thành | Vite + React 18 + TS + Tailwind + GitHub Pages deploy |
| **2. Tài Liệu Thiết Kế (GDD)** | 100% | ✅ Hoàn thành | Đã chuyển sang GDD 2D Mobile-First đồng bộ 5 mockup |
| **3. Khung Giao Diện Mobile** | 100% | ✅ Hoàn thành | Header đỉnh 4 loại tiền tệ, Bottom Nav 5 tab mạ vàng |
| **4. Tích Hợp 5 Màn Hình Design** | 100% | ✅ Hoàn thành | Đã đưa 5 ảnh vào `public/design/` & phủ tương tác |
| **5. Logic Tu Luyện & Bế Quan** | 100% | ✅ Hoàn thành | Chạm vận khí, bế quan offline (lazy settlement 8h), đột phá |
| **6. Logic Linh Điền & Luyện Đan** | 90% | ✅ Hoàn thành | Tưới, bón linh thạch, thu hoạch; lò đan khống hỏa, dự đoán phẩm chất |
| **7. Giao Thương Phường Thị** | 80% | 🔄 Đang hoàn thiện | Đã có 4 sạp chợ & mua Đan Trúc Cơ; cần thêm popup mua bán |
| **8. Âm Thanh & Động Họa Chi Tiết** | 20% | ⏳ Chờ triển khai | Chưa có nhạc nền cổ phong (BGM) & SFX xúc giác |

---

## 🔍 Chi Tiết Trạng Thái Từng Hạng Mục

### ✅ 1. ĐÃ HOÀN THÀNH 100% (READY TO PLAY)

#### 🛠️ Kỹ thuật & Hạ tầng
- [x] Khởi tạo mã nguồn Vite + React 18 + TypeScript + Tailwind CSS.
- [x] Tối ưu hóa bundle siêu nhẹ: build nén gzip chỉ còn **~88 KB** (khởi động tức thì <0.5s trên điện thoại).
- [x] Cấu hình pipeline CI/CD GitHub Actions (`.github/workflows/deploy.yml`) tự động xuất bản lên GitHub Pages khi push vào `main`.
- [x] Hệ thống cơ sở dữ liệu trình duyệt `IndexedDB (Dexie.js)` tự động lưu nhân vật và trạng thái.

#### 📑 Tài liệu thiết kế (GDD)
- [x] Cập nhật hoàn chỉnh [GDD_Pham_Dao_2D.md](file:///d:/NamTV/Git/tu-tien-online/GDD_Pham_Dao_2D.md) và [GDD_Pham_Dao_3D.md](file:///d:/NamTV/Git/tu-tien-online/GDD_Pham_Dao_3D.md) sang phiên bản 2D Mobile-First.
- [x] Đặc tả chính xác các thông số nhân vật, công thức luyện đan, thuật toán bế quan ngoại tuyến.

#### 📱 Khung giao diện chuẩn Mockup (`assets/design/`)
- [x] **Top Header Bar:**
  - Avatar Chibi cấp `Lv.12`.
  - Tên nhân vật `Tạ Văn Nam`.
  - Cảnh giới `Luyện Khí tầng 2` kèm thanh tiến độ mini màu lam.
  - 4 loại tài nguyên: 🟢 Ngọc biếc (1.280), 🪙 Linh thạch/bạc (56.420), 🟡 Kim nguyên bảo (320), ⚡ Thể lực (120/120).
  - Biểu tượng phụ: Thư (có chấm đỏ), Thông báo, Cài đặt.
- [x] **Bottom Navigation Bar:**
  - 5 nút bấm mạ vàng: `Động phủ`, `Tu luyện`, `Luyện đan`, `Linh điền`, `Phường thị`.
  - Hiệu ứng vòm cung kim sắc phát sáng rực rỡ khi active.

#### 🎮 5 Màn hình tương tác thực tế
- [x] **Màn hình 1 - Tu Luyện (`TuLuyenView.tsx`):**
  - Đài bát quái sen vàng, chạm vào đạo sĩ nhận số linh khí bay lên `+120 Tu Vi`.
  - 3 nút chức năng tròn: `Bế quan` (bật/tắt chế độ bế quan), `Vận khí` (+120), `Tham ngộ` (+350).
  - Thanh tiến độ tu vi thực tế `7.200 / 12.000` và nút kích hoạt thiên kiếp `Đột phá cảnh giới`.
- [x] **Màn hình 2 - Động Phủ (`DongPhuView.tsx`):**
  - Sơn trang phong cảnh hữu tình.
  - Chạm vào các biển hiệu công trình để nhảy nhanh sang màn hình tương ứng: *Đài Tu Luyện*, *Phòng Luyện Đan*, *Linh Điền*.
  - Chạm vào *Trận Tụ Linh*, *Kho Chứa*, *Hồ Linh Ngư* nhận phản hồi trực quan.
- [x] **Màn hình 3 - Luyện Đan (`LuyenDanView.tsx`):**
  - Lò đan rồng vàng vĩ đại với tam muội chân hỏa.
  - Chọn công thức (`Tụ Khí Đan`, `Tráng Thể Đan`, `Thanh Tâm Đan`).
  - Nút chỉnh cường độ lửa `[-]` / `[+]` từ Lv.1 đến Lv.10.
  - Hiển thị tỷ lệ thành công (85%), dự đoán phẩm chất (*Thượng phẩm 55%*).
  - Nút `Bắt đầu luyện đan` bấm để xuất lò đan dược và nhận điểm tu vi.
- [x] **Màn hình 4 - Linh Điền (`LinhDienView.tsx`):**
  - 8 ô đất thảo dược bên bờ suối.
  - Bảng thông tin: `Mộc Linh Hoa`, thời gian đếm ngược, độ ẩm `72% (Tốt)`.
  - 3 nút thao tác: `💧 Tưới` (tăng độ ẩm), `🔮 Bón linh thạch` (giảm thời gian), `🧺 Thu hoạch`.
- [x] **Màn hình 5 - Phường Thị (`PhuongThiView.tsx`):**
  - Chợ phiên tấp nập với 4 gian hàng: *Linh Thảo Các, Đan Dược Các, Pháp Khí Đường, Công Pháp Phường*.
  - Khung đề cử: Mua `Đan Trúc Cơ` ưu đãi -20% (48.000 linh thạch).

---

### 🔄 2. HẠNG MỤC ĐANG THỰC HIỆN / CẦN NÂNG CẤP TIẾP THEO

1. **Popup Mua Bán Chi Tiết Cho 4 Sạp Phường Thị:**
   - Khi bấm vào *Linh Thảo Các*, *Đan Dược Các*, *Pháp Khí Đường*, *Công Pháp Phường*, hiển thị bảng danh sách các món hàng (hạt giống, đan dược, pháp bảo) để người chơi tự do mua bán đổi linh thạch.
2. **Âm Thanh Cổ Phong (BGM & SFX):**
   - Nhạc nền đàn tranh/sáo trúc thanh tịnh.
   - Hiệu ứng âm thanh khi chạm đạo sĩ, tiếng nước tưới cây, tiếng lửa lò đan bùng cháy, tiếng chuông khi đột phá tầng mới.
3. **Đồ Họa Động (Animated Sprites Layering):**
   - Tách các lớp nhân vật hoạt hình cử động nhẹ (nhân vật thở, nước chảy, khói lò bay lượn) để màn hình thêm phần sống động.
4. **Đẩy Lên GitHub Pages:**
   - Chạy lệnh `git push origin main` để xuất bản bản demo trực tiếp lên internet.

