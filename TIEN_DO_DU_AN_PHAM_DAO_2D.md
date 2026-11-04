# BẢNG ĐÁNH DẤU TIẾN ĐỘ DỰ ÁN: PHÀM ĐẠO 2D (MOBILE-FIRST)
> **Cập nhật:** Phiên bản 2.5 • Trực tiếp trên mã nguồn `tu-tien-online`

---

## 📊 Tổng Quan Tiến Độ Dự Án: **98% Hoàn Thành (Bản MVP Alpha Hoàn Thiện)**

```text
[██████████████████████████████████████████████░] 98%
```

| Phân Hệ | Tiến Độ | Trạng Thái | Ghi Chú |
|---|:---:|:---:|---|
| **1. Hạ Tầng & CI/CD** | 100% | ✅ Hoàn thành | Vite + React 18 + TS + Tailwind + GitHub Pages deploy |
| **2. Tài Liệu Thiết Kế (GDD)** | 100% | ✅ Hoàn thành | Đã chuyển sang GDD 2D Mobile-First đồng bộ 5 mockup |
| **3. Khung Giao Diện Mobile** | 100% | ✅ Hoàn thành | Header đỉnh 4 loại tiền tệ, Bottom Nav 5 tab mạ vàng |
| **4. Tích Hợp 5 Màn Hình Design** | 100% | ✅ Hoàn thành | Đã đồng bộ tài nguyên ảnh sắc nét từ `public/images/` |
| **5. Logic Tu Luyện & Bế Quan** | 100% | ✅ Hoàn thành | Chạm vận khí, bế quan offline (lazy settlement 8h), đột phá, đổi công pháp |
| **6. Logic Linh Điền & Luyện Đan** | 100% | ✅ Hoàn thành | 8 luống thảo dược đếm ngược, khống hỏa lò đan, sinh đan dược |
| **7. Giao Thương Phường Thị** | 100% | ✅ Hoàn thành | Đầy đủ 4 gian hàng, Popup Mua & Bán đổi Linh Thạch hai chiều |
| **8. Âm Thanh Cổ Phong & Hạt Tiên Khí** | 100% | ✅ Hoàn thành | Nhạc nền Đàn Tranh Ngũ Cung (BGM) + SFX xúc giác + Particle tiên khí |

---

## 🔍 Chi Tiết Trạng Thái Từng Hạng Mục

### ✅ 1. ĐÃ HOÀN THÀNH 100% (READY TO PLAY)

#### 🛠️ Kỹ thuật & Hạ tầng
- [x] Khởi tạo mã nguồn Vite + React 18 + TypeScript + Tailwind CSS.
- [x] Tối ưu hóa bundle siêu nhẹ: build nén gzip chỉ còn **~106 KB** (khởi động tức thì <0.3s trên điện thoại).
- [x] Cấu hình pipeline CI/CD GitHub Actions (`.github/workflows/deploy.yml`) tự động xuất bản lên GitHub Pages khi push vào `main`.
- [x] Hệ thống cơ sở dữ liệu trình duyệt `IndexedDB (Dexie.js)` tự động lưu nhân vật và trạng thái.

#### 📑 Tài liệu thiết kế (GDD)
- [x] Cập nhật hoàn chỉnh [GDD_Pham_Dao_2D.md](file:///d:/Git/tu-tien-online/GDD_Pham_Dao_2D.md) và [GDD_Pham_Dao_3D.md](file:///d:/Git/tu-tien-online/GDD_Pham_Dao_3D.md) sang phiên bản 2D Mobile-First.
- [x] Đặc tả chính xác các thông số nhân vật, công thức luyện đan, thuật toán bế quan ngoại tuyến.

#### 📱 Khung giao diện chuẩn Mockup (`assets/design/`)
- [x] **Top Header Bar:**
  - Avatar Chibi cấp `Lv.12`, Tên nhân vật `Tạ Văn Nam`.
  - Cảnh giới `Luyện Khí tầng 2` kèm thanh tiến độ mini màu lam.
  - 4 loại tài nguyên: 🟢 Ngọc biếc (1.280), 🪙 Linh thạch/bạc (56.420), 🟡 Kim nguyên bảo (320), ⚡ Thể lực (120/120).
  - Biểu tượng phụ: Nút Nhạc Cổ Phong (BGM Bật/Tắt), Thư (có chấm đỏ), Thông báo, Cài đặt.
- [x] **Bottom Navigation Bar:**
  - 5 nút bấm mạ vàng: `Động phủ`, `Tu luyện`, `Luyện đan`, `Linh điền`, `Phường thị`.
  - Hiệu ứng vòm cung kim sắc phát sáng rực rỡ khi active.

#### 🎮 5 Màn hình tương tác thực tế
- [x] **Màn hình 1 - Tu Luyện (`TuLuyenView.tsx`):**
  - Đài bát quái sen vàng, chạm vào đạo sĩ nhận số linh khí bay lên `+120 Tu Vi`.
  - 3 nút chức năng tròn: `Bế quan` (bật/tắt chế độ bế quan), `Vận khí` (+120), `Tham ngộ` (+350).
  - Thanh tiến độ tu vi thực tế và nút kích hoạt thiên kiếp `Đột phá cảnh giới` kèm âm thanh chuông đồng.
  - Nút "Đổi công pháp >" mở popup chuyển đổi giữa 4 đại công pháp (*Trường Xuân Công, Quy Tức Quyết, Thái Hư Kiếm Điển, Cửu Chuyển Huyền Công*).
- [x] **Màn hình 2 - Động Phủ (`DongPhuView.tsx`):**
  - Sơn trang phong cảnh hữu tình.
  - Chạm vào các biển hiệu công trình để nhảy nhanh sang màn hình tương ứng: *Đài Tu Luyện*, *Phòng Luyện Đan*, *Linh Điền*.
  - Chạm vào *Trận Tụ Linh* để nâng cấp cấp độ trận pháp gia tăng tốc độ tu vi.
  - Chạm vào *Hồ Linh Ngư* cho cá chép rồng ăn nhận phúc duyên và linh thạch.
  - Chạm vào *Kho Chứa* mở Túi Trữ Vật.
- [x] **Màn hình 3 - Luyện Đan (`LuyenDanView.tsx`):**
  - Lò đan rồng vàng vĩ đại với tam muội chân hỏa và khói dược liệu nghi ngút.
  - Chọn công thức (`Tụ Khí Đan`, `Tráng Thể Đan`, `Thanh Tâm Đan`).
  - Nút chỉnh cường độ lửa `[-]` / `[+]` từ Lv.1 đến Lv.10.
  - Hiển thị tỷ lệ thành công (85%), dự đoán phẩm chất (*Thượng phẩm 55%*).
  - Nút `Bắt đầu luyện đan` bấm để xuất lò đan dược và nhận điểm tu vi.
- [x] **Màn hình 4 - Linh Điền (`LinhDienView.tsx`):**
  - 8 ô đất thảo dược bên bờ suối với đom đóm bay lấp lánh ban đêm.
  - Bảng thông tin: `Mộc Linh Hoa`, thời gian đếm ngược, độ ẩm `72% (Tốt)`.
  - 3 nút thao tác: `💧 Tưới` (tăng độ ẩm), `🔮 Bón linh thạch` (giảm thời gian), `🧺 Thu hoạch`.
  - Khung Nhiệm Vụ & Banner Sự Kiện mở bảng nhiệm vụ và nhận quà Thất Tịch.
- [x] **Màn hình 5 - Phường Thị (`PhuongThiView.tsx`):**
  - Chợ phiên tấp nập với 4 gian hàng: *Linh Thảo Các, Đan Dược Các, Pháp Khí Đường, Công Pháp Phường*.
  - Bấm vào từng gian hàng hoặc nút "Vào Gian Hàng" mở **Modal Gian Hàng Toàn Diện (Market Stall Modal)**:
    - Tab 1: **Mua Vật Phẩm** (Hạt giống, đan dược, pháp bảo, bí kíp).
    - Tab 2: **Bán Cho Thương Nhân** (Bán vật phẩm từ Túi Đồ để đổi lấy Linh Thạch theo giá thương nhân).

#### 🎶 Âm Thanh Cổ Phong & Hạt Đồ Họa Động
- [x] **Bộ Tổng Hợp BGM Đàn Tranh Ngũ Cung (`src/utils/audio.ts`):**
  - Synthesizer Web Audio API độc lập, không dùng file ngoài.
  - Giai điệu ngũ cung (Gong, Shang, Jiao, Zhi, Yu) thanh tịnh, êm dịu, tự động lặp vô tận.
  - Nút bật/tắt BGM trên Header và trong phần Cài đặt.
- [x] **Hiệu Ứng Âm Thanh Xúc Giác (SFX):**
  - Tiếng chuông thiền, tiếng nước suối linh tuyền, tiếng lửa bùng lò đan, tiếng rơi linh thạch khi giao dịch, tiếng cồng chiêng đột phá.
- [x] **Lớp Hạt Tiên Khí (`XianxiaAtmosphere.tsx`):**
  - Đốm linh khí tụ hội trên đài bát quái, tàn lửa và khói lò đan, đom đóm thảo dược linh điền, cánh hoa đào bay lượn ở phường thị.

---

### 🚀 2. BƯỚC CUỐI CÙNG: XUẤT BẢN TRỰC TIẾP
- [ ] Chạy lệnh `git push origin main` để GitHub Actions tự động build và xuất bản bản chơi trực tiếp lên GitHub Pages.
