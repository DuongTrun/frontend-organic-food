import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { CartItemType } from "../ultils/type";

interface CartOnHEaderProps {
  cartCount: number;
  cartItems: CartItemType[];
  handleIncrease: (id: number) => void;
  handleDecrease: (id: number) => void;
  handleRemove: (id: number) => void;
}
const CartOnHeader = ({
cartCount,
  cartItems,
  handleIncrease,
  handleDecrease,
  handleRemove,
}:CartOnHEaderProps) => {
     const navigate = useNavigate();
  const [isCartOpen, setIsCartOpen] = useState(false);


  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * Number(item.quantity),
    0
  );

  return (
    <div className="relative">
      <div
        className="flex items-center cursor-pointer relative"
        onClick={toggleCart}
      >
        <FaShoppingCart size={26} />
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {cartCount}
          </span>
        )}
      </div>

      {isCartOpen && (
        <div className="absolute right-0 mt-3 w-72 bg-white text-black shadow-lg rounded-lg z-50 p-4">
          <h3 className="text-lg font-semibold mb-3">Giỏ hàng của bạn</h3>

          {cartItems.length === 0 ? (
            <p className="text-sm text-gray-500">Chưa có sản phẩm nào</p>
          ) : (
            <ul className="max-h-60 overflow-y-auto">
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between mb-3 border-b pb-2"
                >
                  <div className="flex items-center space-x-2">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-10 h-10 object-cover rounded"
                    />
                    <div>
                      <p className="text-sm font-medium">{item.name}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        {/* Nút giảm */}
                        <button
                          onClick={() => handleDecrease(item.id)}
                          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm"
                        >
                          -
                        </button>

                        <span className="text-sm font-semibold">
                          {item.quantity}
                        </span>

                        {/* Nút tăng */}
                        <button
                          onClick={() => handleIncrease(item.id)}
                          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-semibold">
                      {item.price.toLocaleString()}₫
                    </p>

                    {/* Nút xóa */}
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="text-xs text-red-500 hover:underline mt-1"
                    >
                      Xóa
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}

          <div className="border-t pt-2 mt-2">
            <p className="text-right font-semibold">
              Tổng: {totalPrice.toLocaleString()}₫
            </p>
            <button
              onClick={() => navigate("/cart")}
              className="w-full mt-3 bg-[#5bbb46] text-white py-2 rounded-lg hover:bg-green-600 transition"
            >
              Xem giỏ hàng
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
export default CartOnHeader;