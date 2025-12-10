import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; // 👈 Import Redux hooks
import { RootState } from "../redux/store"; // 👈 Đường dẫn tới file store của bạn
import { clearCart } from "../redux/CartSlice"; // 👈 Import action xóa giỏ
import { createOrder } from "../ultils/api"; // 👈 Import API tạo đơn hàng
import {
  CheckCircle,
  MapPin,
  Phone,
  User,
  FileText,
  ShoppingCart,
} from "lucide-react";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 🔹 1. LẤY DỮ LIỆU TỪ REDUX STORE
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);

  // 🔹 2. TÍNH TỔNG TIỀN (Dựa trên dữ liệu Redux)
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * Number(item.quantity),
    0
  );

  // State form
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    address: "",
    note: "",
  });

  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // Xử lý nhập form
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Xử lý Đặt hàng
  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      alert("Giỏ hàng đang trống!");
      return;
    }

    setLoading(true);

    try {
      // Chuẩn bị dữ liệu gửi xuống Backend
      const orderPayload = {
        userId: 1, // Thay bằng ID user thật nếu có login
        ...formData,
        amount: totalAmount,
        paymentMethod: "COD",

        // Map dữ liệu từ Redux sang DTO của Backend
        items: cartItems.map((item) => ({
          productId: item.id,
          productName: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
      };

      // Gọi API
      await createOrder(orderPayload);

      // 🔥 3. GỌI ACTION XÓA GIỎ HÀNG TRONG REDUX
      dispatch(clearCart());

      setIsSuccess(true);
    } catch (error) {
      console.error(error);
      alert("Đặt hàng thất bại! Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  // --- MÀN HÌNH THÀNH CÔNG ---
  if (isSuccess) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md w-full animate-in fade-in zoom-in duration-300">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-[#5bbb46]" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Đặt hàng thành công!
          </h2>
          <p className="text-gray-600 mb-6">
            Cảm ơn bạn đã mua sắm. Đơn hàng đã được ghi nhận.
          </p>

          <button
            onClick={() => navigate("/")}
            className="w-full bg-[#5bbb46] hover:bg-green-600 text-white font-bold py-3 rounded-lg transition-all"
          >
            Tiếp tục mua sắm
          </button>
        </div>
      </div>
    );
  }

  // --- MÀN HÌNH GIỎ HÀNG TRỐNG ---
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <ShoppingCart className="w-16 h-16 text-gray-300 mb-4" />
        <p className="text-gray-500 mb-4">Giỏ hàng của bạn đang trống</p>
        <button
          onClick={() => navigate("/")}
          className="text-[#5bbb46] font-bold hover:underline"
        >
          Quay lại mua sắm
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* CỘT TRÁI: FORM ĐIỀN THÔNG TIN */}
        <div className="bg-white p-6 rounded-xl shadow-sm h-fit">
          <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-4 flex items-center gap-2">
            <User className="text-[#5bbb46]" /> Thông tin giao hàng
          </h2>

          <form onSubmit={handlePlaceOrder} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Họ và tên
              </label>
              <input
                required
                name="fullName"
                placeholder="Nguyễn Văn A"
                className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#5bbb46] outline-none"
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Số điện thoại
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                <input
                  required
                  name="phoneNumber"
                  type="tel"
                  placeholder="09xx xxx xxx"
                  className="w-full border border-gray-300 rounded-lg p-2.5 pl-10 focus:ring-2 focus:ring-[#5bbb46] outline-none"
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Địa chỉ nhận hàng
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                <input
                  required
                  name="address"
                  placeholder="Số nhà, Đường, Phường/Xã..."
                  className="w-full border border-gray-300 rounded-lg p-2.5 pl-10 focus:ring-2 focus:ring-[#5bbb46] outline-none"
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ghi chú (Tùy chọn)
              </label>
              <textarea
                name="note"
                rows={3}
                placeholder="Ví dụ: Giao giờ hành chính..."
                className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#5bbb46] outline-none"
                onChange={handleInputChange}
              />
            </div>
          </form>
        </div>

        {/* CỘT PHẢI: HIỂN THỊ GIỎ HÀNG (TỪ REDUX) */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-4 flex items-center gap-2">
              <FileText className="text-[#5bbb46]" /> Đơn hàng của bạn
            </h2>

            {/* List sản phẩm */}
            <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center border-b border-gray-100 pb-3 last:border-0"
                >
                  <div className="flex gap-3 items-center">
                    <div className="w-16 h-16 border rounded-md overflow-hidden bg-gray-50 flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        onError={(e) =>
                          (e.currentTarget.src =
                            "https://via.placeholder.com/50")
                        }
                      />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 line-clamp-1">
                        {item.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        Số lượng:{" "}
                        <span className="font-bold text-gray-700">
                          {item.quantity}
                        </span>
                      </p>
                    </div>
                  </div>
                  <p className="font-bold text-gray-700 whitespace-nowrap">
                    {(
                      Number(item.price) * Number(item.quantity)
                    ).toLocaleString()}
                    đ
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t mt-4 pt-4 space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Tạm tính</span>
                <span>{totalAmount.toLocaleString()}đ</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Phí vận chuyển</span>
                <span>Miễn phí</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-[#5bbb46] pt-2 border-t mt-2">
                <span>Tổng cộng</span>
                <span>{totalAmount.toLocaleString()}đ</span>
              </div>
            </div>
          </div>

          {/* Nút xác nhận */}
          <button
            onClick={handlePlaceOrder}
            disabled={loading}
            className="w-full bg-[#5bbb46] hover:bg-green-600 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all disabled:bg-gray-400"
          >
            {loading ? "Đang xử lý..." : "XÁC NHẬN THANH TOÁN"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
