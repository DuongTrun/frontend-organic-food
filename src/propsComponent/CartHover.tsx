import { useState } from "react";
import { FaShoppingBag } from "react-icons/fa";

interface CartProps {
  cartCount: number;
}

function CartHover({cartCount}: CartProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Icon giỏ hàng */}
      <div className="flex items-center space-x-1 cursor-pointer border-2 border-white pr-4 pl-2 py-2 rounded-md hover:bg-white hover:text-[#5bbb46] transition-all duration-300">
        <FaShoppingBag size={25} />
        <p className="">Giỏ hàng</p>
        <p className="font-thin">{cartCount}</p>
      </div>

      {/* Hộp thông báo có hiệu ứng */}
      <div
        className={`absolute right-0 mt-2 w-56 bg-white border border-gray-300 rounded-xl shadow-md p-4 transform transition-all duration-500 ${
          isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <p className="text-center text-gray-700">Không có sản phẩm nào.</p>
      </div>
    </div>
  );
}

export default CartHover;
