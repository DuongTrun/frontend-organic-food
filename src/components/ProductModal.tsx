import React from "react";
import { motion } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { CartItemType } from "../ultils/type";
interface ProductSliderProps {
  product: CartItemType;
  handleAddToCart: (product: CartItemType) => void;
  onClose: () => void;
}

const formatPrice = (price: number | string) => {
  const numericPrice = Number(price);
  if (isNaN(numericPrice)) return price;
  return new Intl.NumberFormat("vi-VN").format(numericPrice) + "đ";
};
const ProductModal: React.FC<ProductSliderProps> = ({
  product,
  onClose,
  handleAddToCart,


}) => {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="absolute inset-0" onClick={onClose}></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="relative bg-white rounded-xl shadow-lg w-11/12 md:w-1/2 p-6 z-10"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-black"
        >
          <IoClose size={24} />
        </button>

        <div className="flex flex-col md:flex-row items-center gap-6">
          <img
            src={product.image}
            alt={product.name}
            className="w-48 h-48 object-cover rounded-lg"
          />
          <div>
            <h2 className="text-2xl font-semibold mb-2">{product.name}</h2>
            <p className="text-[#5bbb46] font-bold">{formatPrice(product.price)}</p>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <button className="bg-[#5bbb46] text-white px-5 py-2 rounded-md hover:bg-[#4ba73f] transition" onClick={() => handleAddToCart(product)}>
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductModal;
