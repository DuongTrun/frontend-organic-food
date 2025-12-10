import React from "react";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import {
  increaseQuantity,
  decreaseQuantity,
  removeItem,
} from "../redux/CartSlice";

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 🔹 Lấy dữ liệu từ Redux store
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * Number(item.quantity),
    0
  );

  const continueShopping = () => {
    navigate("/");
  };
  const handlePayment = () => {
    navigate("/checkout");
  }

  return (
    <div className="max-w-6xl mx-auto py-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* 🔹 Bên trái: Danh sách sản phẩm */}
      <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow">
        <h2 className="text-2xl font-semibold mb-2">Giỏ hàng</h2>
        <p className="text-sm text-red-600 mb-4">
          Organicfood.vn nhận giao đơn hàng Online có giá trị tối thiểu là{" "}
          <strong>199.000 VND</strong>. Vui lòng chọn thêm sản phẩm nếu chưa đạt
          giá trị này.
        </p>

        {cartItems.length === 0 ? (
          <p className="text-gray-500 text-center py-10">Giỏ hàng trống 😢</p>
        ) : (
          cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b py-4"
            >
              <div className="flex items-center gap-4">
                <button
                  onClick={() => dispatch(removeItem(item.id))}
                  className="text-gray-400 hover:text-red-500 transition"
                >
                  <FaTrash />
                </button>
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <h4 className="font-medium">{item.name}</h4>
                  <p className="text-gray-600 text-sm">
                    {(item.price * item.quantity).toLocaleString()}₫
                  </p>
                </div>
              </div>

              {/* 🔹 Nút tăng giảm */}
              <div className="flex items-center border rounded-md">
                <button
                  onClick={() => dispatch(decreaseQuantity(item.id))}
                  className="px-3 py-1 hover:bg-gray-100"
                >
                  –
                </button>
                <span className="px-3">{item.quantity}</span>
                <button
                  onClick={() => dispatch(increaseQuantity(item.id))}
                  className="px-3 py-1 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 🔹 Bên phải: Thanh toán */}
      <div className="bg-white p-6 rounded-xl shadow h-fit">
        <h3 className="text-lg font-semibold text-[#5bbb46] border-b pb-2 mb-4">
          Hẹn giờ nhận hàng
        </h3>

        <label className="text-sm font-medium block mb-1">Ngày nhận hàng</label>
        <input
          type="date"
          className="w-full border rounded-lg px-3 py-2 mb-4 focus:outline-[#5bbb46]"
          defaultValue={new Date().toISOString().split("T")[0]}
        />

        <label className="text-sm font-medium block mb-1">
          Thời gian nhận hàng
        </label>
        <select className="w-full border rounded-lg px-3 py-2 mb-4 focus:outline-[#5bbb46]">
          <option value="soon">Càng sớm càng tốt</option>
          <option value="morning">Buổi sáng</option>
          <option value="afternoon">Buổi chiều</option>
          <option value="evening">Buổi tối</option>
        </select>

        <div className="border-t pt-3 mt-3">
          <p className="text-right font-semibold mb-3">
            Tổng tiền:{" "}
            <span className="text-[#5bbb46]">
              {totalPrice.toLocaleString()}₫
            </span>
          </p>
          <button className="w-full bg-[#5bbb46] hover:bg-[#4ba73f] text-white py-2 rounded-lg transition" onClick={handlePayment}>
            Tiến hành thanh toán
          </button>
          <button
            className="text-sm text-gray-600 mt-3 block text-center hover:text-[#5bbb46]"
            onClick={continueShopping}
          >
            ← Tiếp tục mua hàng
          </button>
        </div>

        <textarea
          className="w-full border rounded-lg px-3 py-2 mt-4 focus:outline-[#5bbb46]"
          placeholder="Nếu bạn có ghi chú cho đơn hàng, hãy nhập tại đây..."
          rows={3}
        ></textarea>
      </div>
    </div>
  );
};

export default CartPage;
