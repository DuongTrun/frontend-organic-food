import React from "react";
import { FaEye } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa6";
import { CartItemType } from "../ultils/type";

interface ProductCardProps {
  id: number;
  image: string;
  name: string;
  price: number;
  tag?: string;
  onView?: () => void;
  handleAddToCart: (product: CartItemType) => void;
}
const formatPrice = (price: number | string) => {
  const numericPrice = Number(price);
  if (isNaN(numericPrice)) return price;
  return new Intl.NumberFormat("vi-VN").format(numericPrice) + "đ";
};
const ProductCard: React.FC<ProductCardProps> = ({
  id,
  image,
  name,
  price,
  tag,
  onView,
  handleAddToCart,
}) => {
  return (
    <div className="relative group bg-white rounded-sm shadow hover:shadow-lg transition-all duration-300 overflow-hidden ">
      <div className="relative w-full h-[180px] flex justify-center items-center ">
        {tag && (
          <span className="absolute top-0 right-0 bg-[#5bbb46] px-1 py-2 text-[13px] font-bold text-white [clip-path:polygon(0%_0%,_100%_0%,_100%_100%,_50%_85%,_0%_100%)]  z-10">
            {tag}
          </span>
        )}

        <img
          src={image}
          alt={name}
          className="object-contain h-full p-4 scale-150 transition-transform duration-300 group-hover:scale-105 "
        />

        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition-opacity duration-300 z-0 "></div>

        <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <button
            className="bg-white text-[#5bbb46] p-3 rounded-full hover:scale-105 transition"
            onClick={() =>
              handleAddToCart({ id, name, price, image: image, quantity: 1 })
            }
          >
            <FaCartPlus size={18} />
          </button>
          <button
            className="bg-white text-[#5bbb46] p-3 rounded-full hover:scale-105 transition"
            onClick={onView}
          >
            <FaEye size={18} />
          </button>
        </div>
      </div>

      <div className="p-4 ">
        <h3 className="text-gray-700 font-normal text-sm mb-2 line-clamp-1 ">
          {name}
        </h3>
        <p className="text-[#5bbb46] font-bold">{formatPrice(price)}</p>
      </div>
    </div>
  );
};

export default ProductCard;
