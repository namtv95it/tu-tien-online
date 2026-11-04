# Phàm Đạo 3D - Tu Tiên Ký (Web Edition)

> Game 3D Tu Tiên mô phỏng đời sống, khám phá nhẹ, bế quan ngoại tuyến, trồng dược liệu và luyện đan chạy hoàn toàn trên trình duyệt (Static Web / GitHub Pages).

---

## 🌟 Tính Năng Đã Hiện Thực Hóa (MVP)

1. **3D Web-First Engine:**
   - Dựng hình bằng Three.js & React Three Fiber mượt mà.
   - Bầu trời ngày đêm, sương mù tiên hiệp, rặng trúc xum xuê (GPU instancing), suối Linh Tuyền và Thảo Lư cổ phong.

2. **Nhân Vật & Vòng Lặp Tu Luyện:**
   - Điều khiển góc nhìn thứ ba (WASD + Shift chạy nhanh, camera bám sát chuyển động).
   - Tọa thiền tụ khí trên bồ đoàn tăng tu vi theo thời gian thực.
   - **Bế quan ngoại tuyến (Lazy Settlement):** Tắt trình duyệt vẫn nhận tu vi khi quay lại (tối đa 8h/ngày theo chuẩn GDD).
   - Đột phá cảnh giới từ Phàm Nhân lên Luyện Khí tầng 1..3 khi tu vi viên mãn.

3. **Vườn Linh Điền (Dược Thảo Viên):**
   - 4 ô linh điền 3D tương tác trực tiếp trong khuôn viên.
   - Gieo hạt (Thanh Diệp Thảo, Sương Thảo) từ túi đồ.
   - Cây lớn lên theo 3 giai đoạn: Mầm non ➜ Cây con ➜ Cây trưởng thành tỏa linh quang.
   - Chăm sóc tưới nước giữ độ ẩm, thu hoạch dược liệu nhập kho.

4. **Kiến Thiết Động Phủ (Grid Building Mode):**
   - Chế độ lưới snap 0.5m với preview mô hình xanh bán trong suốt.
   - Xoay hướng 90° bằng phím tắt hoặc nút bấm.
   - Danh mục 6 công trình & nội thất: Giếng đá Linh Tuyền, Bàn ngọc giản, Kệ chứa đồ, Đèn linh thạch, Tụ linh trận, Giường trúc.
   - Bố trí và thu hồi đồ đạc lưu trực tiếp vào IndexedDB.

5. **Đan Phòng & Luyện Đan 3 Pha (Alchemy):**
   - Tương tác với Đan Lô 3 chân cổ đồng trong sân hoặc mở từ thanh công cụ.
   - Đầy đủ 6 công thức đan dược MVP: *Tụ Khí Đan, Hồi Khí Đan, Dưỡng Mạch Đan, Tĩnh Tâm Đan, Thanh Độc Đan, Tụ Linh Hương*.
   - Minigame khống chế hỏa hầu 3 pha:
     - **Pha 1:** Khai lô & kiểm tra nguyên liệu.
     - **Pha 2:** Điều hòa nhiệt độ ngọn lửa (Thúc hỏa / Giảm lửa) giữ trong ngưỡng tối ưu.
     - **Pha 3:** Ngưng đan và đánh giá phẩm chất theo công thức GDD (*Hạ phẩm / Trung phẩm / Thượng phẩm / Cực phẩm*).

6. **Lưu Trữ & Khôi Phục Dữ Liệu:**
   - Tự động lưu trữ với `IndexedDB (Dexie.js)`.
   - Tính năng Xuất/Nhập file Save `.json` để sao lưu dữ liệu cá nhân.

---

## 🎮 Hướng Dẫn Thao Tác

| Phím / Thao Tác | Công Năng |
|---|---|
| `W` `A` `S` `D` / Mũi tên | Di chuyển nhân vật trong không gian 3D |
| `Shift` | Chạy nhanh |
| `Click 3D` vào Bồ Đoàn | Tọa thiền tĩnh tâm tụ khí / Thu công đứng dậy |
| `Click 3D` vào Linh Điền | Tưới nước / Thu hoạch thảo dược |
| `Click 3D` vào Đan Lô | Mở giao diện Luyện Đan 3 Pha |
| Nút `Kiến Thiết` | Bật/tắt chế độ xây dựng trên lưới 0.5m |
| Nút `Túi Trữ Vật` | Xem thảo dược, hạt giống, linh thạch và đan dược |
| Nút `Lưu Trữ` | Tải xuống file save JSON hoặc khôi phục tiến trình |

---

## 🛠️ Công Nghệ Sử Dụng

- **Frontend:** React 18, TypeScript, Vite
- **3D Graphics:** Three.js, React Three Fiber (R3F), `@react-three/drei`
- **State Management:** Zustand
- **Database:** Dexie.js (IndexedDB wrapper)
- **Styling:** Tailwind CSS, Lucide Icons
- **CI/CD:** GitHub Actions (`.github/workflows/deploy.yml`)
