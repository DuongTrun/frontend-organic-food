import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white text-gray-800 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Cột 1 */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Hệ Thống Cửa hàng</h3>
          <p>
            <span className="font-medium">Thời gian hoạt động:</span> <br />
            Từ thứ 2 đến Chủ Nhật <br />
            • Giờ mở cửa: 7h - 20h <br />
            • Giờ tư vấn: 7h - 20h <br />
            • Số chứng nhận organic (USDA/EU)
          </p>
          <p className="mt-2">
            Được cấp bởi tổ chức chứng nhận hữu cơ Quốc tế Control Union: CU
            900475 <br />
            • Phản hồi về chất lượng & dịch vụ:{" "}
            <span className="font-medium">0919991088</span>
          </p>
        </div>

        {/* Cột 2 */}
        <div>
          <h3 className="text-lg font-semibold mb-3">
            Chính Sách & Hỗ Trợ Khách Hàng
          </h3>
          <ul className="space-y-1">
            <li>Chương trình tích điểm</li>
            <li>Chính sách đổi trả</li>
            <li>Chính sách giao hàng</li>
            <li>Chính sách bảo mật</li>
            <li>Phương thức thanh toán</li>
            <li>Hướng dẫn mua hàng</li>
          </ul>
        </div>

        {/* Cột 3 */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Về Organicfood.vn</h3>
          <ul className="space-y-1">
            <li>Giới thiệu Organicfood.vn</li>
            <li>Làm việc với chúng tôi</li>
            <li>Chính sách bảo mật</li>
            <li>Điều khoản dịch vụ</li>
            <li>Organicfood.vn với cộng đồng</li>
            <li>Quan hệ đối tác</li>
            <li>Bán sỉ / Xuất khẩu</li>
            <li>Bếp O, Ready To Eat</li>
            <li>Liên hệ</li>
          </ul>
        </div>

        {/* Cột 4 */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Theo dõi chúng tôi</h3>
          <ul className="space-y-2">
            <li>Thời gian tư vấn: 7h - 20h</li>
            <li>Thời gian giao hàng: 7h30 - 20h</li>
          </ul>
          <img
            src="https://www.organicfood.vn/images/bocongthuong.png"
            alt="Bộ Công Thương"
            className="mt-4 w-40"
          />
        </div>
      </div>

      {/* Địa chỉ cửa hàng */}
      <div className="max-w-6xl mx-auto px-4 pb-8 space-y-4 text-sm">
        <div className="flex items-start gap-2">
          <MapPin className="w-4 h-4 mt-1 text-green-600" />
          <div>
            <p>🏠 Organicfood Quận 2</p>
            <p>93 Trần Não, P. Bình An, Q. 2</p>
            <p>- Hotline: 0931771088 - 02873071088 (Phím 2)</p>
          </div>
        </div>

        <div className="flex items-start gap-2">
          <MapPin className="w-4 h-4 mt-1 text-green-600" />
          <div>
            <p>🏠 Organicfood Quận 1</p>
            <p>123 Đinh Tiên Hoàng, Quận 1</p>
            <p>- Hotline: 0969421088 - 02873071088 (Phím 1)</p>
          </div>
        </div>

        <div className="flex items-start gap-2">
          <MapPin className="w-4 h-4 mt-1 text-green-600" />
          <div>
            <p>🏠 Organicfood Quận Phú Nhuận</p>
            <p>146 Phan Đình Phùng, Phú Nhuận</p>
            <p>- Hotline: 02873071088 - Phím 3</p>
          </div>
        </div>

        <div className="flex items-start gap-2">
          <MapPin className="w-4 h-4 mt-1 text-green-600" />
          <div>
            <p>🏠 Văn Phòng, Kho</p>
            <p>28 Đường Thảo Điền, P. Thảo Điền, Q. 2</p>
            <p>- Hotline: 02873071088 - Phím 0</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4 text-green-600" />
          <span>Số điện thoại: 02873071088</span>
        </div>
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4 text-green-600" />
          <span>Email: info@organicfood.vn</span>
        </div>
      </div>

      {/* Bản quyền */}
      <div className="bg-gray-100 text-gray-600 text-xs text-center py-4 px-2">
        © 2018 Bản quyền thuộc về Công ty Cổ Phần Vạn Sơn Thịnh Phát. GPDKKD:
        0313701476 do Sở KH & ĐT TP.HCM cấp ngày 17/03/2016. GPVSATTP: 682 – BQL
        ATTP HCM cấp ngày 18/02/2025.
      </div>
    </footer>
  );
}
