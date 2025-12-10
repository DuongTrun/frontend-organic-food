import React, { useState } from "react";
import ProductCard from "../propsComponent/ProductCard";
import ArrowButton from "../propsComponent/ArrowButton";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronRight } from "react-icons/fa";
import saleBanner from "../assets/section_pro_banner.jpg";
import { CartItemType } from "../ultils/type";
import ProductModal from "./ProductModal";
const products = [
  {
    image:
      "//cdn.hstatic.net/products/200000423303/thiet_ke_chua_co_ten__50__2bd9b66a96ee4373b53d6dbf843717bf_large.png",
    name: "Siro hữu cơ mật cây thùa xanh Kirkland 1,02kg",
    price: "259.000đ",
  },
  {
    image:
      "//cdn.hstatic.net/products/200000423303/1_26b4895edaac4462a230b64e2e81502e_large.png",
    name: "Táo đỏ hữu cơ Altavie 450g",
    price: "149.000đ",
  },
  {
    image:
      "//cdn.hstatic.net/products/200000423303/4_2_74566da1633f4b02be1a723eedfa4ba7_large.png",
    name: "Cà phê Blend hữu cơ phin giấy TheorganiKcoffee - 5pcs/hộp",
    price: "199.000đ",
  },
  {
    image:
      "//cdn.hstatic.net/products/200000423303/thiet_ke_chua_co_ten__44__ee316b2e5f124ccbb6e520526dd2a6b8_large.png",
    name: "Đường ăn kiêng Erythritol hữu cơ Naturgreen gói 270 g",
    price: "89.000đ",
  },
  {
    image:
      "//cdn.hstatic.net/products/200000423303/ve-sinh-bon-cau_copy_c6354eb2434d49dfa67e1d3e67117f98_large.jpg",
    name: "Vệ sinh bồn cầu Fuwa3e 500ml",
    price: "299.000đ",
  },
  {
    image:
      "//cdn.hstatic.net/products/200000423303/nuoc-lau-san_copy_17adac7256164049bc361319304b26be_large.jpg",
    name: "Nước lau sàn Fuwa3e Sả chanh đậm đặc",
    price: "179.000đ",
  },
];
interface ProductSliderProps {
  handleAddToCart: (product: CartItemType) => void;
}
const KitchenProduct: React.FC<ProductSliderProps> = ({ handleAddToCart }) => {
  const [index, setIndex] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const itemsPerPage = 3;

  const next = () => {
    setIndex((prev) =>
      prev + itemsPerPage >= products.length ? 0 : prev + itemsPerPage
    );
  };

  const visibleProducts = products.slice(index, index + itemsPerPage);

  return (
    <div className="bg-white rounded-xl p-6 w-[82%] mx-auto mt-8 shadow-sm">
      <h2 className="text-2xl font-semibold mb-6 border-b pb-[5px]">
        Bếp Okitchen - Ready to eat
      </h2>

      <div className="flex items-center justify-between gap-4">
        <div>
          <img src={saleBanner} className="max-w-none h-[455px] object-fit" />
        </div>
        <div className="w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 -mt-[160px]"
            >
              {visibleProducts.map((p, i) => (
                <ProductCard
                  key={i}
                  {...p}
                  handleAddToCart={handleAddToCart}
                  onView={() => setSelectedProduct(p)}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <ArrowButton direction="right" onClick={next} />
      </div>

      <div className="flex justify-center mt-6">
        <button className="border flex items-center border-[#5bbb46] text-[#5bbb46] px-3 py-2 rounded-md hover:bg-[#5bbb46] hover:text-white transition">
          Xem tất cả
          <span>
            <FaChevronRight className="mt-[2px] ml-1" />
          </span>
        </button>
      </div>
      {selectedProduct && (
        <ProductModal
          handleAddToCart={handleAddToCart}
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export default KitchenProduct;
