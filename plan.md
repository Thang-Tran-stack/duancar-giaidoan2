# KẾ HOẠCH PHÁT TRIỂN TRANG WEB CAR

## 1. Tổng quan dự án
-**Tên dự án:** Web bán xe phong cách JDM
-**Công nghệ sử dụng:** HTML, CSS, Javascript thuần
-**Phong cách thiết kế:** Hiện đại, tối giản, tập trung vào hình ảnh xe


## 2. Cấu trúc thư mục (Folder Structure)
-'index.html' <- Trang chủ
-'Hãng xe.html' <- Trang Hãng xe & Bộ sưu tập các mẫu xe JDM
-'style.css' <- File CSS dùng chung
-'script.js' <- File Javascript xử lý hiệu ứng, bộ lọc và tương tác
-'/image' <- Nơi chứa hình ảnh

## 3. Chi tiết các phần trên trang ('index.html')

### 3.1 Header (Phần đầu)
- Dùng thẻ <nav> làm menu điều hướng 
- Logo: "JDM Car" (Bên trái)
- Menu: Trang chủ, Hãng xe, Sản phẩm, Liên hệ (Bên phải)
- Cố định menu ở trên cùng màn hình khi cuộn trang (Sticky header)

### 3.2 Hero Section (Phần chính giữa)
- Background: Hình ảnh xe đẹp full màn hình
- Title: "Yêu Xe Như Yêu Vợ Bạn"
- Subtitle: "Dịch vụ chăm sóc xe chuyên nghiệp"
- Tìm kiếm theo tên xe, hãng xe, loại xe
- Nút "Khám phá ngay" dẫn đến trang sản phẩm

### 3.3 Các Danh Mục / Dịch Vụ
- Dùng thẻ <section> chứa 3 thẻ ghi thông tin (Cards) nằm ngang.
- Mỗi Card gồm: 1 hình ảnh icon, 1 tiêu đề <h3>, và 1 đoạn văn ngắn.
- Các danh mục có thể là: Rửa Xe, Dán Film Cách Nhiệt, Độ Đèn.

### 3.4 Footer
- Chứa Logo (JDM Car)
- Địa chỉ cửa hàng
- Số điện thoại
- Các mạng xã hội (Facebook, Instagram)
- Thông tin bản quyền (Copyright)

### 3.5 Chi tiết trang Hãng xe ('Hãng xe.html')
- **Header**: Giữ nguyên tương tự trang chủ (Logo JDM Car, menu điều hướng với mục 'Hãng xe' active, hỗ trợ mobile toggle).
- **Banner & Bộ lọc**:
  - Tiêu đề: "Các Hãng Xe & Mẫu Xe Huyền Thoại"
  - Bộ nút lọc thương hiệu: Tất cả, Toyota, Nissan, Honda, Mazda, Subaru, Mitsubishi.
  - Ô tìm kiếm trực tiếp (Live Search) theo tên mẫu xe hoặc hãng xe.
- **Body (Lưới các Box xe)**:
  - Mỗi box nhỏ đại diện cho 1 chiếc xe JDM kinh điển.
  - Mỗi box gồm: Hình ảnh xe chất lượng cao với hiệu ứng zoom khi hover, thẻ tên hãng, huy hiệu nổi bật (Huyền thoại 2JZ, Godzilla, Rotary...), tên xe, 4 thông số kỹ thuật dạng lưới (Động cơ, Mã lực, Hộp số, Dẫn động), và nút "Chi tiết".
  - Hỗ trợ cửa sổ Pop-up (Modal) xem chi tiết thông số và liên hệ tư vấn.
- **Footer**: Đồng bộ tương tự như trang chủ.

## 4. Yêu cầu kĩ thuật
- Font chữ: Chọn font chữ hiện đại, dễ đọc (Outfit từ Google Fonts)
- Màu sắc: Chọn màu sắc hài hòa, phù hợp với phong cách JDM (Tone đen đỏ thể thao, kính mờ Glassmorphism)
- Responsive: Tương thích hoàn hảo trên Mobile, Tablet và Desktop

## 5. Giao diện (UI/UX)
- Bố cục trang web hiện đại
- Dễ dàng di chuyển giữa các trang
- Tối ưu cho thiết bị di động

## 6. Các bước triển khai AI (checklist)
- [x] Bước 1: Tạo file `index.html` dựng khung HTML chuẩn semantic (`<header>`, `<nav>`, `<main>`, `<footer>`).
- [x] Bước 2: Tạo file `style.css` và viết CSS căn chỉnh bố cục cơ bản.
- [x] Bước 3: Hoàn thiện màu sắc, font chữ và hiệu ứng hover cho nút bấm/menu.
- [x] Bước 4: Hoàn thiện trang `Hãng xe.html` với header đồng bộ trang chủ và lưới các box nhỏ hiển thị hình ảnh, thông số xe JDM theo từng hãng.





