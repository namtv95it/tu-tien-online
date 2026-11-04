# PHÀM ĐẠO 3D
## Game Design Document (GDD) — Bản 1.0 / tiền sản xuất

**Thể loại:** Tu tiên 3D, mô phỏng đời sống, khám phá nhẹ, thế giới trực tuyến chung với động phủ riêng  
**Nền tảng:** Web desktop trước, thiết kế tương thích màn hình nhỏ về sau  
**Trải nghiệm ưu tiên:** Tu luyện chậm rãi · luyện đan có chiều sâu · xây dựng động phủ · xã hội tự nguyện  
**Trạng thái tài liệu:** Đặc tả thiết kế đề xuất, số liệu cân bằng cần kiểm chứng bằng playtest  
**Định hướng IP:** Thế giới, nhân vật, bản đồ, hình ảnh, tên công pháp và pháp khí thương mại cần nguyên bản; chỉ tham khảo mô-típ tiên hiệp và tinh thần “phàm nhân từng bước cầu đạo”.

---

# 1. Tóm tắt điều hành

**Phàm Đạo 3D** đặt người chơi vào vai một phàm nhân bước vào tu tiên giới không nhờ sức mạnh trời ban. Người chơi được sống trong một thế giới chung có phường thị, vùng thu thập, NPC và cộng đồng; đồng thời sở hữu **động phủ riêng, lưu trạng thái độc lập**, có thể mời bạn bè thăm. Cột mốc của trải nghiệm không phải cấp số tăng liên tục, mà là việc tự tay luyện thành viên đan đầu tiên, thuần thục một môn pháp thuật, tìm được vị trí linh mạch ưng ý hay bố trí thành công một tụ linh trận.

**USP 1 — Thời gian chậm nhưng không rỗng:** phiên chơi 20–45 phút luôn có quyết định, thành tựu hoặc chuyện để kể, kể cả không tăng cảnh giới.

**USP 2 — Ba hệ thống tạo thành kinh tế vật chất:** vườn thuốc → dược liệu → luyện đan → hỗ trợ tu luyện / giao dịch → nguyên liệu và bản vẽ cải tạo động phủ → vườn tốt hơn.

**USP 3 — Tiến triển không phụ thuộc đăng nhập liên tục:** bế quan ngoại tuyến và cây trồng dùng thời gian thực có giới hạn, không tạo lợi thế không thể đuổi kịp.

**USP 4 — Mọi thành tựu đều có nguyên nhân:** luyện đan có công thức, tỷ lệ, hỏa hầu; đột phá có chuẩn bị; vật phẩm hiếm đến từ tri thức, hợp tác hoặc cơ duyên có thể khám phá.

**Phiên bản MVP:** 1 làng, 1 phường thị, 1 khu rừng, 1 động phủ instanced; tu luyện Phàm Nhân → Luyện Khí 3; 8 loại dược liệu; 6 công thức đan; 1 lò đan tương tác; 12 đồ nội thất / công trình; 3 pháp thuật; 2 yêu thú; giao tiếp xã hội cơ bản; lưu bền vững trên server.

# 2. Trụ cột trải nghiệm và nguyên tắc

| Trụ cột | Yêu cầu có thể kiểm chứng | Điều không được làm |
|---|---|---|
| Chậm mà có tiến triển | 80% phiên 30 phút tạo ít nhất 1 kết quả hữu hình | Thanh EXP lấp đầy như hoạt động duy nhất |
| Người chơi có chủ quyền | Chọn làm đan sư, tu sĩ, người trồng thuốc, người trang trí | Nhiệm vụ ngày bắt buộc |
| Không khí tu tiên | Âm thanh gió, suối, lửa lò; UI có thể ẩn | Mưa pop-up, thông báo đỏ, hiệu ứng nhấp nháy |
| Chuẩn bị thắng may rủi | Vật liệu, kiến thức, thao tác ảnh hưởng kết quả | Thành công phụ thuộc RNG thuần túy |
| Công bằng ngoại tuyến | Không bắt treo trình duyệt; giới hạn lợi ích thụ động | Bán tốc độ tu luyện |
| Web-first | Tải từng khu, chạy ổn định trên laptop phổ thông | Bản đồ khổng lồ, shader nặng không cần thiết |

**Không thuộc MVP:** kết hôn, bang chiến, phi thăng, PK tự do, tiền tệ blockchain/NFT, cưỡi phi kiếm xuyên bản đồ, hệ thống thế giới do AI tự sinh không kiểm soát.

# 3. Đối tượng, nhịp chơi và vòng lặp

**Đối tượng:** người thích tiên hiệp, mô phỏng nông trại/crafting, ưa khám phá và xây dựng; chơi 3–5 phiên/tuần, mỗi phiên 20–60 phút. Trình độ nhập môn không cần biết nguyên tác.

**Vòng lặp ngắn (3–8 phút):** chọn mục tiêu → tương tác có quyết định (tưới cây, điều hỏa, vận khí) → nhận phản hồi rõ → ghi sổ tiến triển.

**Vòng lặp phiên chơi (20–45 phút):** thăm động phủ → thu hoạch/chăm sóc → mua nguyên liệu hoặc khám phá → luyện 1–2 mẻ đan → dùng đan/tu luyện → nâng cấp động phủ → thiết lập bế quan trước khi thoát.

**Vòng lặp dài (2–8 tuần):** nâng hiệu suất tự cung tự cấp → thuần thục công pháp → chuẩn bị đột phá → mở điều kiện và không gian mới, không vô hiệu hóa các nghề cũ.

**Câu chuyện điển hình:** Người chơi Luyện Khí 2 thiếu linh thảo để luyện Tụ Khí Đan. Họ hỏi bạn bè ở phường thị, đổi 3 viên Hồi Khí Đan lấy một hạt giống, về trồng cạnh giếng linh tuyền. Hai hôm sau thu hoạch, thử mẻ đan theo phương án điều hỏa an toàn, được một viên đan trung phẩm và đủ điều kiện lĩnh ngộ kỹ thuật vận khí mới. Không tăng tầng, nhưng đã đạt một kết quả tự tạo.

# 4. Thế giới, cấu trúc server và tương tác xã hội

## 4.1 Bản đồ MVP

| Khu | Quy mô định hướng | Vai trò | Quyền truy cập |
|---|---|---|---|
| Thanh Hà Thôn | 120×120 m | tutorial, NPC, nhiệm vụ kể chuyện | công cộng, hòa bình |
| Thanh Mộc Phường | 100×100 m | giao dịch NPC, quảng trường gặp nhau | công cộng, hòa bình |
| Trúc Vân Lâm | 250×250 m | thu hái, 2 loại yêu thú, 1 bí cảnh nhỏ | công cộng, PvE |
| Động phủ cá nhân | nền 30×30 m, mở rộng 45×45 m | tu luyện, trồng cây, lò đan, nội thất | instance riêng; mời bạn |

Kích thước trên là target thiết kế level, chưa phải cam kết tải cảnh. Dùng cổng chuyển khu và loading ẩn bởi hiệu ứng di chuyển để tiết kiệm tài nguyên browser.

## 4.2 Mô hình multiplayer

- **Shared hubs:** các server room/phân kênh của làng, phường thị và rừng; mục tiêu MVP 20–30 avatar đồng thời / room, kiểm thử thực tế để điều chỉnh.
- **Private instance:** một instance logic theo `abode_id`, chỉ tải khi chủ nhà hoặc khách ghé; trạng thái được lưu DB. Khách có quyền mặc định chỉ xem, tưới cây nếu được cho phép, không được lấy đồ.
- **Nhóm:** mời tối đa 3 bạn vào động phủ; hiện avatar, chat ngắn, emote và ngồi thiền cạnh nhau. MVP không có chiến đấu nhóm phức tạp.
- **Không PvP trong MVP:** tránh xung đột với nhịp chơi thư giãn.
- **Phân tách authority:** server quyết định inventory, công thức, thời gian, tài sản, vị trí hợp lệ và giao dịch; client chỉ đề xuất hành động và biểu diễn.

## 4.3 Thế giới có đời sống

Chu kỳ ngày/đêm mỹ thuật ~ 90 phút đời thực; thời tiết luân phiên theo seed server; một số dược liệu ưa mưa hoặc đêm. Thời tiết **không chặn** tiến triển bắt buộc quá lâu: NPC có bán hoặc có nguồn thay thế với giá cao hơn. NPC có lịch trình tối giản (đi chợ/sắp đồ/đóng cửa) song các dịch vụ thiết yếu vẫn truy cập được.

# 5. Nhân vật, linh căn, tu vi, kinh mạch

## 5.1 Thuộc tính

| Thuộc tính | Ý nghĩa | Giới hạn/thiết kế |
|---|---|---|
| `qi` / linh lực hiện tại | tiêu hao khi dùng pháp thuật, vận khí | tái tạo theo thời gian và trạng thái |
| `qi_capacity` | dung lượng linh lực | tăng nhỏ theo tầng và công pháp |
| `cultivation` | tiến triển trong tầng hiện tại | không quy đổi thành chiến lực trực tiếp |
| `meridian_stability` 0–100 | ổn định kinh mạch | ảnh hưởng rủi ro vận khí, đột phá |
| `mind_state` 0–100 | tâm cảnh | quản lý qua nghỉ ngơi, tham ngộ, sự kiện |
| `spirit_sense` | thần thức | phạm vi tương tác đặc biệt, điều khiển pháp khí |
| `fatigue` 0–100 | mệt mỏi | chống spam hành động chủ động, hồi dễ |
| `alchemy_mastery` | hiểu biết luyện đan | ảnh hưởng độ ổn định, chất lượng; không trực tiếp tăng tu vi |

## 5.2 Linh căn

Kim/Mộc/Thủy/Hỏa/Thổ là năm thuộc tính cơ bản; biến dị chỉ dành cho mở rộng. MVP tạo **một trong ba cấu hình cân bằng**: thiên hướng Mộc, thiên hướng Thủy, hoặc cân bằng Ngũ hành; không quay ngẫu nhiên linh căn hiếm tạo lợi thế không thể khắc phục. Linh căn làm thay đổi phương pháp tối ưu, không khóa công thức nghề và không làm người chơi mất khả năng Trúc Cơ về sau.

**Ví dụ:** thiên hướng Mộc được +8% hiệu suất khi trồng cây thích hợp; thiên hướng Thủy có +8% dung sai hỏa hầu khi dùng một kỹ thuật điều hòa; cấu hình cân bằng được +5% độ ổn định khi đổi công pháp. Đây là placeholder để test, tổng hiệu quả 1 giờ không chênh >10% giữa các cấu hình với nội dung MVP.

## 5.3 Cảnh giới và pacing

MVP: Phàm Nhân, Luyện Khí tầng 1, 2, 3. Sau launch mở Luyện Khí 4–13, Trúc Cơ, Kết Đan, Nguyên Anh, Hóa Thần. Các tên cấp cao theo hệ tu tiên phổ biến, việc dùng các yếu tố sáng tạo cụ thể của nguyên tác cho sản phẩm thương mại phải được rà soát pháp lý.

**Mốc kiểm chứng đầu tiên:** nhập Luyện Khí 1 sau 40–70 phút chơi có hướng dẫn; Luyện Khí 2 sau 3–5 giờ tích lũy; Luyện Khí 3 sau 8–14 giờ tích lũy. Đây là thời gian chơi tích cực *cộng với* lợi ích bế quan hợp lý, không phải thời gian người chơi buộc online.

**Không có EXP từ giết quái.** Chiến đấu tạo nguyên liệu, kiến thức và cơ duyên; tu vi nhận từ vận khí, bế quan, công pháp và đan dược có diminishing returns.

## 5.4 Công thức tiến triển mẫu

Các số dưới đây chỉ là baseline thử nghiệm:

- Yêu cầu tu vi ở tầng `n` trong MVP: `T(n) = 100 × 1.8^(n−1)` đơn vị tu vi; tầng 1: 100, tầng 2: 180; bước sang tầng 3 sau vượt ngưỡng phù hợp.
- Tu vi mỗi phiên vận khí chủ động 5 phút: `G_active = 10 × E_linh_khi × E_cong_phap × E_tam_canh` (hệ số chuẩn hóa xấp xỉ 0.8–1.2 mỗi thành phần; tổng mỗi phiên có trần hợp lý).
- Tu vi bế quan ngoại tuyến: `G_offline = 0.7 × R_base × min(giờ_offline, 8) × E_dong_phu`; chỉ trả sau khi server tính, không dùng clock client.
- Hiệu suất tu vi từ đan trong 24 giờ: viên 1 = 100% hiệu quả; viên 2 = 65%; viên 3 = 35%; từ viên 4 = 10% (có thể cất đan để hôm sau); không cho bonus vô hạn.
- `E_dong_phu` từ 0.9–1.2 tại MVP, đảm bảo nâng động phủ hữu ích nhưng không phải con đường độc quyền để tiến cấp.

**Lưu ý tránh sai cấu trúc:** `cultivation` được lưu theo tầng hiện tại, khi tăng tầng trừ ngưỡng và giữ phần dư có giới hạn; mọi phép tính là transaction atomic trên server.

## 5.5 Đột phá

Điều kiện Luyện Khí 1→2: đủ tu vi, kinh mạch ≥60, tâm cảnh ≥50, hoàn thành bài tập vận khí 1 lần. Luyện Khí 2→3: tu vi đủ, kinh mạch ≥70, tâm cảnh ≥60, hiểu công pháp chủ tu ≥2. Đột phá diễn ra bằng một tương tác ngắn (điều hòa nhịp, lựa chọn thế vận hành khí), không đòi phản xạ nhanh. Nếu thất bại, hao một phần vật phẩm hỗ trợ và mất chút ổn định, nhưng **không giảm cảnh giới**. Cơ hội thất bại được báo trước theo khoảng (ví dụ “nguy cơ thấp”) và người chơi có thể hoãn để chuẩn bị.

# 6. Công pháp, thần thức và hành động tu luyện

## 6.1 Phân loại

- **Công pháp chủ tu:** quyết định cơ chế hấp thu linh khí, chỉ một bộ đang vận hành.
- **Thuật thức:** kỹ năng tương tác/chiến đấu như Ngự Vật, Linh Quang, Dẫn Thủy.
- **Phương pháp luyện thần:** tăng cảm nhận, phân biệt dược tính, giới hạn tương tác bí mật.
- **Phương pháp dưỡng thể:** nâng sức bền, giảm mệt mỏi; MVP ở dạng passive nhỏ.

MVP dùng tên tự sáng tạo: **Thanh Mộc Dẫn Khí Pháp**, **Tĩnh Thủy Quy Tức Pháp**, **Ngũ Hành Hòa Khí Chú**. Mỗi bộ có 3 mức thuần thục: Nhập môn / Thuần thục / Tiểu thành. Không có cây 100 kỹ năng.

## 6.2 Tọa thiền & vận khí

**Tọa thiền thụ động khi online:** trong động phủ, nhân vật ngồi yên, thanh tu vi tăng đều, có âm thanh và camera cảnh đẹp; người chơi có thể thoát trạng thái bất cứ lúc nào. Không cần click liên tục.

**Vận khí chủ động:** tối đa 3 phiên có thưởng chính mỗi ngày; mỗi phiên 2–4 phút. Người chơi chọn 1 trong 2 đường khí qua kinh mạch, điều chỉnh nhịp hô hấp có cửa sổ rộng, và nhận feedback trực quan. Không thành công tuyệt đối vẫn có tiến triển; kỹ năng làm tăng hiệu suất chứ không ngăn tiếp cận nội dung.

**Tham ngộ:** đọc ngọc giản tại bàn sách, chọn giải thích đúng dựa trên dữ kiện đã thu thập; có thể thử lại không tốn tài nguyên hiếm. Cơ chế kiến thức phải có logic, không là câu hỏi trivia từ tiểu thuyết.

## 6.3 Bế quan ngoại tuyến

- Người chơi chọn thời lượng tối đa 8 giờ tích lũy có hiệu quả / mỗi khoảng 24 giờ server; có thể rời trình duyệt.
- Không cần bắt buộc có linh thạch; linh thạch chỉ tăng hiệu suất nhỏ và có điểm dừng.
- Tiến trình tính **lazy settlement**: lưu `started_at`, `last_settled_at`, cấu hình snapshot; khi đăng nhập hoặc gọi server, tính phần hợp lệ, ghi transaction. Tránh chạy timer riêng cho từng người.
- Thời gian ngoại tuyến không bao giờ trừ thọ nguyên gây phạt hoặc phá cây trồng chỉ vì người chơi vắng mặt.
- Nếu hết giới hạn, bế quan dừng an toàn, không trừ tài nguyên thêm.

# 7. Luyện đan — hệ thống nghề trọng tâm

## 7.1 Kỳ vọng cảm xúc

Người chơi cảm thấy **mình thực sự học luyện đan** thay vì nhấn nút chờ RNG. Mỗi mẻ có sự chuẩn bị, phán đoán, xử lý sai sót, phẩm chất và thông tin học được. Một mẻ thất bại vẫn để lại kinh nghiệm nghề hoặc tro dược liệu làm phân bón; không tạo cảm giác mất trắng thường xuyên.

## 7.2 Thành phần dữ liệu

**Dược liệu:** `herb_id`, ngũ hành, tính nóng/lạnh, dược tính chính, độ tinh khiết, độ tươi, cấp linh khí, độ ẩm và nguồn gốc. **Công thức:** 2–4 nguyên liệu chính, thứ tự xử lý, nhiệt mục tiêu theo pha, độ nhạy, sản phẩm, điều kiện học. **Đan lô:** khả năng ổn nhiệt, dung lượng, hao mòn nhẹ; không bị phá vĩnh viễn. **Kỹ năng đan sư:** hiểu dược lý, khống hỏa, ngưng đan.

## 7.3 Quy trình một mẻ (5–8 phút)

1. **Chọn mục tiêu:** xem công dụng, thời gian và nguyên liệu còn thiếu.
2. **Sơ chế:** lựa chọn rửa/sấy/nghiền; quyết định độ tinh khiết và thất thoát, có thể dùng preset sau khi thông thạo.
3. **Nhập lò:** chọn trình tự bỏ dược liệu (hai phương án có giải thích).
4. **Điều hỏa:** 3 pha “khai lô → dung dược → ngưng đan”; kéo thanh nhiệt trong vùng ổn định, thời gian cho phản ứng đủ rộng để không đòi APM cao.
5. **Kết đan:** chỉ số ổn định dựa trên chuẩn bị, công thức, hỏa hầu và kỹ năng, nhận phẩm chất và nhật ký mẻ.
6. **Rút kinh nghiệm:** nhật ký chỉ ra biến nào ảnh hưởng; lưu preset cho lần tiếp theo.

## 7.4 Công thức chất lượng mẫu

`S = clamp(0, 100, 35 + 0.25P + 0.25H + 0.15M − 0.20D + jitter)`

Trong đó `P` (0–100) là chất lượng nguyên liệu; `H` (0–100) là điểm điều hỏa; `M` (0–100) là mastery; `D` (0–100) là sai lệch công thức, jitter ngẫu nhiên có biên ±3. Ví dụ P=80, H=75, M=40, D=10 → S≈77.75, tương ứng **thượng phẩm** theo ngưỡng thử nghiệm. Đây là mô hình dễ giải thích, chưa cân bằng thật.

| Điểm S | Kết quả | Tác động |
|---|---|---|
| <35 | Hỏng mẻ | tro dược làm phân, ít kinh nghiệm nghề |
| 35–54 | Hạ phẩm | hiệu quả chuẩn thấp |
| 55–74 | Trung phẩm | hiệu quả chuẩn |
| 75–89 | Thượng phẩm | hiệu quả +10–15% |
| ≥90 | Cực phẩm | hiệu quả +20%, rất hiếm ở MVP |

**Bảo vệ người mới:** 2 mẻ hướng dẫn đầu có nguyên liệu miễn phí, lần đầu luôn ra ít nhất hạ phẩm khi làm đúng các bước; sau đó mô hình thật hoạt động. Khi dùng preset “an toàn”, điểm H tối thiểu 60, đầu ra thường trung phẩm hoặc hạ phẩm; điều hỏa chủ động chỉ cải thiện mức phẩm, không là điều kiện để nghề tồn tại.

## 7.5 Sáu công thức MVP

| Đan | Thành phần gợi ý | Công dụng | Ràng buộc |
|---|---|---|---|
| Tụ Khí Đan | Thanh Diệp + Linh Lộ | tăng tu vi vừa phải | hiệu quả giảm nếu dùng liên tiếp |
| Hồi Khí Đan | Sương Thảo + Thanh Diệp | hồi linh lực | cooldown sử dụng |
| Dưỡng Mạch Đan | Ôn Mạch Căn + Linh Lộ | tăng ổn định kinh mạch | không vượt cap ngày |
| Tĩnh Tâm Đan | Nguyệt Diệp + Sương Thảo | phục hồi tâm cảnh | không cộng dồn vô hạn |
| Thanh Độc Đan | Bạch Liên Tâm + Linh Lộ | xóa debuff nhẹ | không thay mọi loại thuốc |
| Tụ Linh Hương | Thanh Diệp + Mộc Tinh Phấn | buff tọa thiền tại động phủ | công dụng theo thời hạn |

Tên dược liệu và công thức là thiết kế gốc của game, chưa lấy từ danh sách bảo vật chính thức của tác phẩm tham chiếu.

# 8. Vườn linh thảo và chuỗi cung ứng

## 8.1 Trồng cây

Mỗi ô đất có `soil_fertility`, `moisture`, `aura_type`, `aura_level`; mỗi cây có `seed`, `planted_at`, `last_watered`, `growth_progress`, `health`, `harvest_ready_at`. Tăng trưởng theo thời gian server; thu hoạch không mất vì quên đăng nhập. Thiếu nước **chỉ giảm phẩm chất đến một ngưỡng**, không chết cây trong MVP.

- Bắt đầu: 4 ô đất, 2 loại cây, 1 giếng nước.
- Nâng tối đa MVP: 12 ô đất; 8 loại cây, 3 yếu tố chăm sóc (nước, đất, linh khí).
- Thời gian lớn lên thử nghiệm: 2 giờ (cây thường), 8 giờ (cây vừa), 24 giờ (cây hiếm). Không có cây 7–30 ngày trong MVP.
- Chăm sóc chủ động có lợi ích khoảng +5–15% chất lượng/thành phẩm; không nên biến thành đăng nhập đúng giờ.

## 8.2 Kinh tế tự cung

Mỗi cây thu hoạch 1–3 đơn vị nguyên liệu; mẻ đan dùng 2–4 đơn vị. NPC có bán nguyên liệu căn bản giá cao hơn tự trồng ~20–35%, bảo đảm người chơi thích luyện đan có thể tiếp cận mà không bắt buộc chơi nông trại. Nguyên liệu hiếm từ khám phá làm mục tiêu dài hạn, nhưng không khóa tiến cảnh giới cơ bản.

# 9. Động phủ — hệ thống sở hữu và sáng tạo

## 9.1 Triết lý

Động phủ là **ngôi nhà có công năng** chứ không phải kho buff. Mỗi lựa chọn bố trí vừa đẹp vừa có tác động nhỏ: ánh sáng để đọc ngọc giản, giếng gần vườn để chăm thuận tiện, phòng đan có thông gió, tụ linh trận đặt hợp lý. Không buộc người chơi tối ưu một layout duy nhất.

## 9.2 Đặt công trình

Giao diện chế độ xây: lưới 0.5 m, snap 90°/45°, camera tự do, preview xanh/đỏ khi hợp lệ, undo/redo 10 thao tác, lưu bản nháp và nút hoàn tất. Các tương tác có thể sử dụng bàn phím và chuột; không cần đoán góc 3D để đặt đồ.

**Quy tắc:** không chồng collider, không chắn lối vào, diện tích xây giới hạn bằng `plot_bounds`, tổng tối đa 80 đối tượng (gồm cây) ở MVP; đồ lặp giống nhau dùng instancing. Thao tác edit gửi lên server theo batch có phiên bản `abode_revision` để chống ghi đè.

## 9.3 Hạng mục MVP

| Hạng mục | Công năng | Chi phí ví dụ |
|---|---|---|
| Giường trúc | nghỉ phục hồi mệt mỏi | 20 gỗ + 10 đá |
| Bồ đoàn | bắt đầu tọa thiền | nhận từ tutorial |
| Bàn ngọc giản | tham ngộ công pháp | 15 gỗ + 5 linh thạch |
| Đan lô sơ cấp | luyện 6 công thức | quest tutorial |
| Giếng đá | cấp nước vườn | 20 đá + 10 gỗ |
| Ô linh điền | trồng thảo dược | 10 đất tốt + 5 gỗ / ô |
| Kệ chứa đồ | +20 ô kho | 10 gỗ |
| Tụ linh trận nhỏ | +5% hiệu suất bế quan | 15 linh thạch + phù văn |
| Đèn linh thạch | ánh sáng/không khí | 3 linh thạch |
| Hàng rào, cửa, cây cảnh | trang trí | nguyên liệu thường |
| Trạm điều dược | tăng chất lượng sơ chế nhẹ | 10 gỗ + 4 đá |
| Bảng khách ghé thăm | quản lý quyền viếng thăm | miễn phí |

Tổng 12 nhóm hạng mục, có biến thể mỹ thuật để người chơi cá nhân hóa. Tụ linh trận buff chỉ một nguồn có hiệu lực; đặt 10 trận không nhân lợi ích.

## 9.4 Ghé thăm & quyền

Vai trò: `owner`, `trusted_guest`, `visitor`. Mặc định visitor chỉ xem / ngồi ghế / trò chuyện; trusted_guest được tưới cây nếu chủ bật quyền; **không ai được thu hoạch, bán, sửa hoặc rút kho** trừ chủ nhà trong MVP. Có nút trục xuất khách, giới hạn danh sách truy cập và block.

## 9.5 Tiến triển động phủ

3 cột mốc: **Nhà tranh** (mới chơi) → **Tiểu động phủ** (mở 8 ô đất, bàn thuốc) → **Linh phủ** (12 ô đất, trận nhỏ, mở khu trang trí). Mốc cần cả vật liệu và thành tựu nghề, không chỉ tiền. Người chơi có thể trang trí lại miễn phí; tháo công trình hoàn trả 80–100% nguyên liệu căn bản để giảm sợ thử.

# 10. Khám phá, thu thập, chiến đấu (tính năng phụ)

Thu thập dược liệu qua node có chu kỳ tái sinh; node cá nhân theo seed để tránh người mới bị vét sạch; khám phá và nhiệm vụ tạo nguyên liệu đặc biệt. MVP có 2 yêu thú: **Linh Nha Thỏ** (né, đánh gần) và **Mộc Giáp Trùng** (giáp trước, điểm yếu sau). Pháp thuật: **Linh Quang Thuật** (chiếu sáng/tìm dấu), **Ngự Vật Thuật** (kéo vật nhẹ, đánh đơn), **Thổ Thuẫn Thuật** (phòng thủ ngắn). Mục tiêu chiến đấu: 20–40 giây cho 1 địch thường; có nút thoát/độn an toàn khỏi khu cơ bản.

Không có tăng tu vi trực tiếp nhờ giết quái. Đánh quái chủ yếu lấy dược tính, vật liệu và khám phá. Chết/kiệt sức: quay về nơi an toàn, giảm độ bền tạm của đồ và mệt mỏi ngắn; không mất tài sản chủ chốt.

# 11. Kinh tế, vật phẩm, trao đổi

## 11.1 Tiền tệ

**Linh thạch vụn** là tiền giao dịch mềm trong game; kiếm từ nhiệm vụ, giao hàng, bán đan, khám phá. **Không có kim cương nạp để mua tiến cảnh giới.** MVP có hàng hóa NPC theo giá sàn/trần; tính năng giao dịch người chơi nếu xuất hiện phải kiểm soát exploit và bot, nên để ở alpha sau khi core loop ổn định.

## 11.2 Nguồn sinh và tiêu

| Nguồn sinh | Nguồn tiêu |
|---|---|
| hoàn thành đơn đặt hàng của NPC | mua hạt giống, vật liệu khẩn cấp |
| bán đan dược đúng nhu cầu | phí sửa chữa/duy trì rất nhỏ |
| khám phá rương và cơ duyên có kiểm soát | xây dựng và trang trí động phủ |
| nhiệm vụ cốt truyện một lần | mua vật phẩm tiện dụng không tăng sức mạnh tuyệt đối |

Dùng các telemetry `currency_earned`, `currency_spent`, `avg_wallet`, `stockpiled_herbs` để đo lạm phát. NPC không mua vô hạn đan phổ thông ở giá cao: có hạn ngạch đơn hàng theo ngày và mức giá giảm dần cho bán lặp, nhưng không được biến thành hard daily chore.

## 11.3 Chống pay-to-win

Có thể thương mại hóa trang phục, skin đan lô, nội thất, vật nuôi trang trí, slot lưu bản thiết kế động phủ. Không bán tu vi, linh căn tốt, đan đột phá, xác suất luyện đan hoặc tài nguyên bắt buộc. Nếu dùng thuê bao, chỉ ưu tiên chất lượng dịch vụ/trang trí không ảnh hưởng chênh lệch tốc độ tu luyện thực chất.

# 12. UX, UI, tương tác và tính dễ tiếp cận

## 12.1 Điều khiển

- WASD di chuyển, Shift chạy ngắn, E tương tác, Esc menu, Tab mở túi, M bản đồ.
- Chuột xoay camera; click lên điểm tương tác trong phạm vi hoặc bấm E. Camera có chống xuyên tường, giới hạn zoom.
- Khi ở động phủ, có chế độ “thanh tịnh”: ẩn hầu hết UI, chỉ hiện một thanh trạng thái nhỏ khi người chơi yêu cầu.
- Tất cả minigame luyện đan đều có phương án phím, không yêu cầu kéo chuột chính xác vào 1 px.

## 12.2 Giao diện chính

Góc trái: avatar nhỏ, tầng tu luyện, linh lực; góc phải chỉ minimap có thể thu gọn; thanh dưới tối đa 5 ô dùng nhanh; không có nút thưởng nhấp nháy. Khi tương tác với lò đan, UI chuyển sang panel tập trung “nguyên liệu — ba pha — nhật ký”, che bớt thế giới chứ không đổi trang hoàn toàn.

## 12.3 Onboarding 45–70 phút

1. 0–5’: tỉnh dậy ở Thanh Hà Thôn, học di chuyển và E.
2. 5–12’: giúp NPC thu thảo dược; quan sát nguồn tài nguyên.
3. 12–20’: kiểm tra linh căn; chọn một trong ba phương pháp tu luyện cân bằng.
4. 20–30’: được cấp động phủ, đặt bồ đoàn và trồng hai hạt giống.
5. 30–42’: học điều hỏa trên mẻ đan được bảo hiểm nguyên liệu.
6. 42–55’: luyện khí lần đầu và thử Ngự Vật Thuật trong khu an toàn.
7. 55–70’: hoàn thành điều kiện nhập Luyện Khí 1, về động phủ, thiết lập bế quan, thoát game.

Mỗi bước đều bỏ qua được nếu đã chơi qua; có hướng dẫn ngữ cảnh, không có tường chữ dài. Hệ thống mục tiêu hiện tại chỉ có **1 nhiệm vụ gợi ý**, và luôn có nút “Tự do khám phá”.

## 12.4 Accessibility

Font dễ đọc, có tùy chọn kích thước UI 90–130%, giảm chuyển động, giảm bloom, tắt rung camera, phụ đề hiệu ứng quan trọng, màu sắc không là tín hiệu duy nhất, có thể chơi bằng một tay chuột khi ở động phủ. Kết nối chập chờn phải giữ tiến trình giao dịch đúng theo server.

# 13. Dữ liệu và cấu trúc backend

## 13.1 Data model lõi

| Bảng / aggregate | Trường cốt lõi |
|---|---|
| `accounts` | id, auth_provider, created_at, flags |
| `characters` | id, account_id, name, realm, realm_level, cultivation, qi, max_qi, meridian_stability, mind_state, last_seen_at |
| `character_affinities` | character_id, wood, water, fire, metal, earth, affinity_profile |
| `cultivation_sessions` | id, character_id, method, started_at, last_settled_at, end_cap_at, config_snapshot, awarded_total, status |
| `inventory_stacks` | id, owner_type, owner_id, item_def_id, quantity, bind_state, version |
| `item_instances` | id, owner_id, item_def_id, rolled_properties, durability, created_at |
| `recipe_definitions` | id, ingredients_json, phase_targets_json, output_def_id, unlock_rule, version |
| `alchemy_batches` | id, character_id, recipe_id, input_snapshot, phase_scores, quality_score, result, created_at |
| `abodes` | id, owner_id, tier, plot_id, layout_revision, permissions_json |
| `abode_objects` | id, abode_id, object_def_id, pos_x, pos_y, pos_z, yaw, state_json |
| `garden_plots` | id, abode_id, cell_id, seed_id, planted_at, last_settled_at, growth_state, quality_modifier |
| `currency_ledger` | id, owner_id, amount_signed, reason, ref_id, created_at |
| `event_log` | id, actor_id, event_name, payload, timestamp, idempotency_key |

Định nghĩa vật phẩm, công thức và công trình nên lưu dạng dữ liệu versioned bên server (JSON/YAML được build vào bảng hoặc catalogue), tránh hardcode UI. Thời gian theo UTC, PostgreSQL `timestamptz`.

## 13.2 Luồng giao dịch luyện đan

1. Client `POST /alchemy/batches/start` kèm `recipe_id`, `cauldron_id`, `idempotency_key`.
2. Server kiểm tra session, quyền sở hữu, công thức, nguyên liệu, trạng thái đan lô; khóa dòng inventory và trừ nguyên liệu trong transaction; tạo batch `in_progress`.
3. Client gửi kết quả điều hỏa từng pha (`POST /alchemy/batches/{id}/phase`) với số thao tác/timestamp hợp lệ, server tính score theo giới hạn và thời gian server.
4. `POST /alchemy/batches/{id}/finish`: server tính chất lượng, tạo output và tăng mastery trong một transaction; cập nhật trạng thái `completed`.
5. Gọi lặp lại cùng idempotency key trả kết quả cũ, **không nhân đôi vật phẩm**. Batch bỏ dở có chính sách settle an toàn; không hoàn trả nguyên liệu không giới hạn để reroll.

## 13.3 Luồng động phủ

Client tải layout bằng `GET /abodes/{id}`. Khi xây, gửi batch `POST /abodes/{id}/layout` có `expected_revision`; server xác nhận chủ sở hữu, giới hạn vị trí, công trình, va chạm, số lượng và chi phí; transaction trừ vật liệu + cập nhật layout + tăng revision. Nếu revision sai, trả 409 và cho UI tải lại, không mất bản nháp.

## 13.4 Đồng bộ realtime

WebSocket chỉ dùng cho avatar, chat, sự kiện room và mời thăm động phủ; các thao tác tài sản qua HTTP transaction đáng tin cậy. Client có prediction vị trí avatar cho cảm giác mượt, server định kỳ xác thực tốc độ và vùng hợp lệ. Lưu trữ snapshot công trình để khách vào muộn vẫn thấy đầy đủ.

## 13.5 Kiến trúc đề xuất

Web UI React + TypeScript + Vite, đồ họa Three.js qua React Three Fiber, collider/physics Rapier; API NestJS/Node.js; PostgreSQL; Redis cho session/rate-limit/room presence; object storage + CDN phục vụ glTF/GLB/KTX2/audio. Có thể triển khai monolith modular trước; không cần microservice sớm.

**Module backend:** auth, character, cultivation, alchemy, garden, abode, inventory, economy, world, social, telemetry. Biên giới quan trọng: `inventory` và `economy` chỉ nhận lệnh có transaction và idempotency.

# 14. Hiệu năng, bảo mật, vận hành

## 14.1 Target kỹ thuật để playtest

| Chỉ tiêu | Mục tiêu thử nghiệm |
|---|---|
| Desktop laptop tầm trung, 1080p | ≥45 FPS ở quality Medium, mục tiêu 60 FPS ở khu riêng |
| Chất lượng Low | ≥30 FPS trong room công cộng ở máy mục tiêu thấp |
| Tải lần đầu qua internet phổ thông | cảnh tương tác trong ≤20 giây ở điều kiện thử nghiệm xác định |
| Chuyển khu đã cache | ≤5 giây p95 nội bộ |
| Gọi API thường | ≤250 ms p95 server-side, không tính WAN |
| Lưu luyện đan, xây dựng | không double reward khi retry hoặc mất mạng |
| Số người / room | thử 20, tăng lên 30 nếu đủ FPS và băng thông |

Các con số này là **acceptance targets dự kiến**, không phải hiệu năng được xác minh. Đo bằng browser Performance, WebGL stats và load tests trước khi chốt.

## 14.2 Quy tắc tối ưu 3D

- Mô hình glTF/GLB, nén mesh/texture; KTX2/Basis khi phù hợp; level-of-detail 2–3 cấp cho cây và nhà.
- Dùng GPU instancing cho trúc, đá, cỏ, vật lặp; giới hạn dynamic lights và shadow casters.
- Dynamic resolution / quality preset; culling và lazy loading theo khu vực; không render vùng ngoài động phủ khi đang ở trong nhà.
- Khóa animation tick và network update theo mức cần thiết, tránh setState React mỗi frame với dữ liệu 3D nóng.
- Browser mất tab: pause client render, server vẫn tính tiến triển theo thời gian đã ghi; reconnect có snapshot.

## 14.3 Bảo mật / chống cheat

- Không tin clock, kết quả RNG, score luyện đan, số tiền hay inventory từ client.
- API bắt buộc authenticated, authorization theo object owner, rate limiting và payload validation.
- Database unique constraints cho idempotency và ledger reference, transactions có locking, không dùng floating-point cho tiền.
- Log các hành vi có rủi ro: tốc độ di chuyển bất khả thi, submit pha luyện đan quá nhanh, giao dịch lặp, âm tiền, object đặt ngoài vùng.
- Sao lưu DB, migration có rollback, alert cho lỗi settlement, số lần transaction thất bại và vật phẩm sinh bất thường.

# 15. Cân bằng và thử nghiệm kinh tế

## 15.1 Ngân sách thời gian một phiên 45 phút

| Hoạt động | Thời lượng | Giá trị nhận |
|---|---:|---|
| thăm động phủ, thu hoạch | 5 phút | nguyên liệu, quyết định gieo trồng |
| đi phường thị / hái thêm | 10 phút | dược liệu, NPC, xã hội |
| luyện một mẻ đan | 8 phút | đan, mastery, nhật ký |
| tu luyện chủ động | 10 phút | tu vi + kinh mạch |
| xây / trang trí | 10 phút | thành tựu cá nhân |
| chọn bế quan | 2 phút | chuẩn bị phiên sau |

## 15.2 Các ràng buộc cân bằng

- Không hoạt động nào (trừ bug/exploit) cho >35% tổng lượng tu vi bình quân chỉ vì thao tác lặp vô hạn.
- Người chơi hoạt động 30–45 phút/ngày đạt ≥70% hiệu quả tu luyện của người chơi 2 giờ/ngày trong cùng điều kiện build sau khi tối ưu thành tích; đây là mục tiêu chứ không phải cam kết.
- Phần lớn nguyên liệu thuốc phổ thông có ít nhất hai nguồn độc lập (vườn / NPC / thu thập).
- Điểm chất lượng đan càng cao càng đòi chuẩn bị và thành thạo, RNG tối đa ±3 điểm; người có tay nghề không bị thất bại hàng loạt vì ngẫu nhiên.
- Không đặt 1 cây / 1 vật phẩm độc quyền làm cửa khóa toàn bộ tiến triển.

## 15.3 Công cụ cân bằng

Tạo bảng mô phỏng 1.000 nhân vật giả theo bốn playstyle (tu luyện, đan sư, nông dân, hỗn hợp), với thời gian 20/45/90 phút/ngày. Mô phỏng 30 ngày lượng tu vi, cây, đan, linh thạch; đánh dấu bất bình đẳng quá mức, nguồn tiền vô hạn và tắc nghẽn nguyên liệu. Sau đó điều chỉnh tham số qua config thay vì code.

# 16. Telemetry, KPI và nghiệm thu trải nghiệm

**Event cần thu:** `tutorial_step_complete`, `abode_first_placement`, `seed_planted`, `herb_harvested`, `alchemy_start`, `alchemy_complete`, `alchemy_fail_reason`, `cultivation_session_settle`, `realm_breakthrough`, `abode_visit`, `session_end`, `network_reconnect`.

**KPI MVP thử nghiệm (đặt mục tiêu, không phải dữ liệu thực):**

| KPI | Mục tiêu playtest |
|---|---|
| ≥80% test users đặt bồ đoàn và trồng cây | trong 30 phút đầu |
| ≥70% hoàn thành mẻ đan đầu | trong 60 phút đầu |
| ≥65% hiểu lý do chất lượng đan khác nhau | qua khảo sát và quan sát |
| ≥75% nhận thấy buổi chơi có tiến triển | sau 3 buổi thử |
| <5% báo game buộc online / AFK | trong survey |
| 0 vụ nhân đôi vật phẩm | test retry/reconnect có kịch bản |
| p95 FPS và load times | theo mục kỹ thuật |

D1/D7 retention là dữ liệu cần theo dõi ở alpha, không nên đặt làm lý do để đưa điểm danh hay nhiệm vụ ngày cưỡng ép vào thiết kế.

# 17. Hành trình trải nghiệm 7 ngày đầu

| Ngày / phiên | Trọng tâm | Khoảnh khắc đáng nhớ |
|---|---|---|
| Phiên 1 | kiểm tra linh căn, nhận động phủ, mẻ đan đầu, Luyện Khí 1 | “Ta đã bắt đầu tu tiên” |
| Phiên 2 | trồng cây, tự cung nguyên liệu, học loại đan thứ hai | “Ta làm được thứ cần dùng” |
| Phiên 3 | khám phá rừng trúc, dùng Linh Quang | “Bản đồ còn có bí mật” |
| Phiên 4 | cải tạo đan phòng, lưu preset | “Tay nghề có tiến bộ” |
| Phiên 5 | thăm động phủ bạn, đổi nguyên liệu bằng NPC | “Có người sống trong thế giới này” |
| Phiên 6 | tu luyện công pháp, tối ưu kinh mạch | “Tôi đang chuẩn bị một bước lớn” |
| Phiên 7 | Luyện Khí 2 / gần đột phá, tự chọn mục tiêu tiếp | “Không cần vội nhưng đã đi xa” |

Không khóa nội dung theo ngày; bảng chỉ mô tả một hành trình điển hình, người chơi có thể tăng tốc hoặc lang thang.

# 18. Phạm vi MVP và backlog sản xuất

## 18.1 P0 bắt buộc

- Tài khoản, tạo nhân vật, di chuyển 3D, camera, tương tác NPC, chuyển scene.
- Tiến trình linh căn và Luyện Khí 1–3; tọa thiền + bế quan offline chuẩn server.
- Động phủ riêng, xây dựng trên lưới, bố trí tối thiểu 12 loại đồ và lưu server.
- 8 cây / nguyên liệu chính, 4–12 ô đất; growth server authoritative.
- Luyện đan 6 công thức, 3 pha nhiệt, đánh giá chất lượng có feedback.
- Kho đồ và giao dịch NPC, nhật ký hành động; hệ thống idempotency.
- Room công cộng có hiện người chơi khác + chat ngắn, mời thăm động phủ.
- Accessibility cơ bản, settings chất lượng 3D, hướng dẫn mới chơi.

## 18.2 P1 nên có sau MVP

Trang trí nhiều hơn, NPC đơn đặt hàng đa dạng, 2–3 sự kiện thời tiết, luyện phù cấp thấp, bảng tin phường thị, ghi chép công thức, thành tựu không cộng sức mạnh, thêm nội dung bí cảnh.

## 18.3 P2 giai đoạn tăng trưởng

Đấu giá người chơi có bảo vệ giá, PvE nhóm, tông môn, đan phương bí truyền, động phủ có nhiều phòng, luyện khí/khôi lỗi, mở tầng 4–13, Trúc Cơ, các khu vực lớn hơn.

## 18.4 Định nghĩa hoàn thành MVP (Definition of Done)

Một người chơi mới có thể **tự mình**: tạo nhân vật → nhập Luyện Khí 1 → nhận động phủ → trồng và thu hoạch → luyện thành một viên đan phẩm chất khác nhau qua thao tác → sử dụng đan để hỗ trợ tu luyện → trang trí nhà → thiết lập offline cultivation → thoát → quay lại nhận kết quả chính xác → thăm động phủ bạn; toàn bộ hoạt động được lưu lại sau khi reload, reconnect và retry requests.

# 19. Kế hoạch triển khai gợi ý và nhân sự

**Sprint 0 (2 tuần):** prototype nhân vật/camera, thiết kế cảnh nghệ thuật mẫu, repository, pipeline asset, schema đầu tiên, budget hiệu năng.

**Sprint 1–2 (4 tuần):** login, nhân vật, shared room, scene streaming, tương tác, inventory và NPC.

**Sprint 3–4 (4 tuần):** động phủ đặt vật thể, lưới, quyền sở hữu, vườn cây và lazy settlement.

**Sprint 5–6 (4 tuần):** hệ luyện đan, các pha thao tác, công thức, sản phẩm, nhật ký, anti-duplication.

**Sprint 7–8 (4 tuần):** tu luyện, công pháp, cảnh giới, offline, onboarding hoàn chỉnh.

**Sprint 9 (2 tuần):** tích hợp, tối ưu, QA, kiểm tra bot/exploit, 20–50 người playtest theo đợt.

**Tổng gợi ý:** khoảng 20 tuần cho bản MVP tập trung với nhóm có kinh nghiệm và asset stylized giới hạn; có thể lâu hơn đáng kể nếu đội nhỏ hoặc tự làm 3D. Đây là ước lượng sơ bộ, không phải cam kết lịch/chi phí.

**Nhóm tối thiểu đề xuất:** 1 game designer/product, 1 frontend/3D engineer, 1 backend engineer, 1 technical artist/3D generalist, QA kiêm level/content part-time. Nếu chỉ 1–2 lập trình viên, cần cắt multiplayer thời gian thực xuống chỉ hiện avatar ở hub, giữ động phủ và luyện đan làm ưu tiên.

# 20. Rủi ro, quyết định mở và nguyên tắc quản trị

| Rủi ro | Triệu chứng | Giải pháp |
|---|---|---|
| Chậm thành nhàm chán | chỉ chờ timer | thêm quyết định nhỏ, discovery, nhật ký có ý nghĩa |
| Luyện đan quá khó | tỷ lệ bỏ giữa mẻ cao | preset an toàn, giới hạn RNG, tutorial bảo hiểm |
| Động phủ như spreadsheet | ai cũng xếp một kiểu tối ưu | buff nhỏ, trần cộng dồn, bố trí thẩm mỹ tự do |
| Player offline bị tụt hậu | đòi online nhiều giờ | 8h bế quan, giảm lợi ích chơi kéo dài |
| Khai thác đồng hồ/mạng | nhân đôi đan, cây tăng trưởng vô hạn | server time, idempotency, DB locks |
| Web 3D nặng | rớt FPS, load chậm | khu nhỏ, instancing, LOD, profile thiết bị |
| Tranh chấp IP | dùng tên nhân vật/pháp khí/hình ảnh nguyên tác | worldbuilding gốc, thẩm định pháp lý trước phát hành |

**Các quyết định cần playtest:** độ dài một mẻ luyện đan (5 hay 8 phút); số ô cây khởi đầu (4 hay 6); mức lợi ích tu luyện ngoại tuyến (50–70% chủ động); điều kiện tầng 1→3; giao dịch người chơi có nên xuất hiện ở alpha; thời gian tải thích hợp cho đối tượng dùng mạng phổ thông.

# 21. Ba lát cắt sản xuất phải chứng minh trước khi mở rộng

**Vertical Slice A — Tu luyện:** nhân vật vào động phủ, tọa thiền, dùng một công pháp, thấy vận khí thay đổi chỉ số, đăng xuất rồi nhận kết quả chính xác khi trở lại.

**Vertical Slice B — Luyện đan:** hái 2 dược liệu, cho vào lò, điều hỏa 3 pha, ra 2 mức phẩm chất khác nhau, uống đan và ghi nhận tác động có giới hạn.

**Vertical Slice C — Động phủ xã hội:** đặt giường, bồ đoàn, 4 ô linh điền, giếng, đan lô; tự do xoay/đổi vị trí và lưu; mời 1 bạn vào xem mà không thể đánh cắp tài sản.

**Quyết định Go/No-Go:** nếu 10–15 người chơi thử độc lập không thấy vui ở ít nhất hai trong ba lát cắt dù đã loại lỗi UI, không mở rộng bản đồ hay cảnh giới; sửa core loop trước.

---

## Phụ lục A — Ví dụ API tối thiểu

```text
POST /auth/session
GET  /characters/me
POST /characters/choose-affinity
POST /cultivation/start
POST /cultivation/settle
POST /cultivation/breakthrough
GET  /inventory
GET  /alchemy/recipes
POST /alchemy/batches/start
POST /alchemy/batches/{id}/phase
POST /alchemy/batches/{id}/finish
GET  /abodes/me
POST /abodes/{id}/layout
POST /abodes/{id}/garden/plant
POST /abodes/{id}/garden/harvest
POST /abodes/{id}/invite
GET  /world/rooms
WS   /world/presence
```

## Phụ lục B — Ví dụ config versioned

```json
{
  "balanceVersion": "mvp-0.1",
  "offlineCultivation": {"maxHoursPer24h": 8, "efficiency": 0.7},
  "alchemy": {"randomJitter": 3, "safePresetMinFireScore": 60},
  "abode": {"maxObjects": 80, "maxGardenPlots": 12},
  "cultivation": {"realm1Threshold": 100, "realm2Threshold": 180},
  "room": {"targetConcurrency": 20, "softCap": 30}
}
```

## Phụ lục C — Chú ý về tham chiếu và quyền sử dụng

Tài liệu này lấy cảm hứng từ cảm giác tu luyện chậm và hệ thống khái niệm tiên hiệp được người chơi biết đến qua *Phàm Nhân Tu Tiên*. Mọi **tên thế giới, nhân vật, tông môn, công pháp, tài nguyên, thiết kế mỹ thuật có tính biểu đạt cụ thể** khi phát hành thương mại cần được xây dựng độc lập hoặc sử dụng sau khi có giấy phép phù hợp. Không sao chép model 3D, hình ảnh phim, âm thanh, lời thoại hay cốt truyện nguyên tác.

**Tham khảo kỹ thuật:** tài liệu chính thức React Three Fiber (`https://r3f.docs.pmnd.rs/`) và Three.js về tối ưu đối tượng (`https://threejs.org/manual/pages/optimize-lots-of-objects.html`).
