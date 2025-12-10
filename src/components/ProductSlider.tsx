// import React, { useState } from "react";
// import ArrowButton from "../propsComponent/ArrowButton";
// import { motion, AnimatePresence } from "framer-motion";
// import { FaChevronRight } from "react-icons/fa";
// import ProductCardLG from "../propsComponent/ProductCardLG";
// import { CartItemType } from "../ultils/type";
// import ProductModal from "./ProductModal";

// const products = [
//   {
//     id: 1,
//     image:
//       "//cdn.hstatic.net/products/200000423303/thiet_ke_chua_co_ten__50__2bd9b66a96ee4373b53d6dbf843717bf_large.png",
//     name: "Siro hữu cơ mật cây thùa xanh Kirkland 1,02kg",
//     price: "259.000đ",
//   },
//   {
//     id: 2,
//     image:
//       "//cdn.hstatic.net/products/200000423303/1_26b4895edaac4462a230b64e2e81502e_large.png",
//     name: "Táo đỏ hữu cơ Altavie 450g",
//     price: "149.000đ",
//   },
//   {
//     id: 3,
//     image:
//       "//cdn.hstatic.net/products/200000423303/4_2_74566da1633f4b02be1a723eedfa4ba7_large.png",
//     name: "Cà phê Blend hữu cơ phin giấy TheorganiKcoffee - 5pcs/hộp",
//     price: "199.000đ",
//   },
//   {
//     id: 4,
//     image:
//       "//cdn.hstatic.net/products/200000423303/thiet_ke_chua_co_ten__44__ee316b2e5f124ccbb6e520526dd2a6b8_large.png",
//     name: "Đường ăn kiêng Erythritol hữu cơ Naturgreen gói 270 g",
//     price: "89.000đ",
//   },
//   {
//     id: 5,
//     image:
//       "//cdn.hstatic.net/products/200000423303/ve-sinh-bon-cau_copy_c6354eb2434d49dfa67e1d3e67117f98_large.jpg",
//     name: "Vệ sinh bồn cầu Fuwa3e 500ml",
//     price: "299.000đ",
//   },
//   {
//     id: 6,
//     image:
//       "//cdn.hstatic.net/products/200000423303/nuoc-lau-san_copy_17adac7256164049bc361319304b26be_large.jpg",
//     name: "Nước lau sàn Fuwa3e Sả chanh đậm đặc",
//     price: "179.000đ",
//   },
//   {
//     id: 7,
//     image:
//       "//product.hstatic.net/200000423303/product/thanh-long-ruot-do_b6dbd2c6f8994db88e84fe50139745bc_large.jpg",
//     name: "Thanh long tím hồng hữu cơ USDA",
//     price: "239.000đ",
//   },
//   {
//     id: 8,
//     image:
//       "//cdn.hstatic.net/products/200000423303/mix_7cfe606ac5644b6bb2b6d326b5d1b267_large.jpg",
//     name: "Kẹo mút hữu cơ vị trái cây hỗn hợp ECO Sweets 50 g",
//     price: "189.000đ",
//   },
// ];

// interface ProductSliderProps {
//   handleAddToCart: (product: CartItemType) => void;
// }

// const ProductSlider: React.FC<ProductSliderProps> = ({ handleAddToCart }) => {
//   const [index, setIndex] = useState(0);
//     const [selectedProduct, setSelectedProduct] = useState<any>(null);

//   const itemsPerPage = 4;

//   const next = () => {
//     setIndex((prev) =>
//       prev + itemsPerPage >= products.length ? 0 : prev + itemsPerPage
//     );
//   };

//   const prev = () => {
//     setIndex((prev) =>
//       prev - itemsPerPage < 0
//         ? Math.max(products.length - itemsPerPage, 0)
//         : prev - itemsPerPage
//     );
//   };

//   const visibleProducts = products.slice(index, index + itemsPerPage);

//   return (
//     <div className="bg-white rounded-xl p-6 w-[82%] mx-auto mt-8 shadow-sm">
//       <h2 className="text-2xl font-semibold mb-6 border-b pb-[5px]">
//         Hàng Organic Mới Về
//       </h2>

//       <div className="flex items-center justify-between gap-4">
//         <ArrowButton direction="left" onClick={prev} />

//         <div className="w-full">
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, scale: 0.98 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 0.98 }}
//               transition={{ duration: 0.5 }}
//               className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
//             >
//               {visibleProducts.map((p, i) => (
//                 <ProductCardLG
//                   key={i}
//                   {...p}
//                   onView={() => setSelectedProduct(p)}
//                   handleAddToCart={handleAddToCart}
//                 />
//               ))}
//             </motion.div>
//           </AnimatePresence>
//         </div>

//         <ArrowButton direction="right" onClick={next} />
//       </div>

//       <div className="flex justify-center mt-6">
//         <button className="border flex items-center border-[#5bbb46] text-[#5bbb46] px-3 py-2 rounded-md hover:bg-[#5bbb46] hover:text-white transition">
//           Xem tất cả
//           <span>
//             <FaChevronRight className="mt-[2px] ml-1" />
//           </span>
//         </button>
//       </div>
//        {selectedProduct && (
//         <ProductModal
//           handleAddToCart={handleAddToCart}
//           product={selectedProduct}
//           onClose={() => setSelectedProduct(null)}
//         />
//       )}
//     </div>

//   );
// };

// export default ProductSlider;

import React, { useState, useEffect } from "react";
import axios from "axios"; // ✅ Thêm axios để gọi API
import ArrowButton from "../propsComponent/ArrowButton";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronRight } from "react-icons/fa";
import ProductCardLG from "../propsComponent/ProductCardLG";
import { CartItemType } from "../ultils/type";
import ProductModal from "./ProductModal";

// ✅ Định nghĩa Product interface
interface Product {
  id: number;
  name: string;
  price: number | string;
  image: string;
  quantity: number;
  description?: string;
  category?: string;
}

interface ProductSliderProps {
  handleAddToCart: (product: CartItemType) => void;
}

const ProductSlider: React.FC<ProductSliderProps> = ({ handleAddToCart }) => {
  // ✅ STATE MỚI ĐỂ LƯU DỮ LIỆU TỪ API
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  // State cũ được giữ lại cho slider và modal
  const [index, setIndex] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const itemsPerPage = 4;

  // ✅ FETCH DỮ LIỆU TỪ BACKEND KHI COMPONENT MOUNT
  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      setLoading(true);
      try {
        // Gọi API để lấy các sản phẩm nổi bật
        const res = await axios.get(
          "https://backend-organic-food.onrender.com/api/products/featured"
        );
        setProducts(res.data);
      } catch (error) {
        console.error("Lỗi khi tải sản phẩm nổi bật:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []); // [] đảm bảo chỉ fetch 1 lần

  // Logic của slider (giữ nguyên)
  const next = () => {
    setIndex((prev) =>
      prev + itemsPerPage >= products.length ? 0 : prev + itemsPerPage
    );
  };

  const prev = () => {
    setIndex((prev) =>
      prev - itemsPerPage < 0
        ? Math.max(products.length - itemsPerPage, 0)
        : prev - itemsPerPage
    );
  };

  // Sản phẩm hiển thị trên slider
  const visibleProducts = products.slice(index, index + itemsPerPage);

  return (
    <div className="bg-white rounded-xl p-6 w-[82%] mx-auto mt-8 shadow-sm">
      <h2 className="text-2xl font-semibold mb-6 border-b pb-[5px]">
        Hàng Organic Mới Về
      </h2>

      {loading ? (
        <p className="text-center text-gray-500 py-10">Đang tải sản phẩm...</p>
      ) : showAll ? (
        // ✅ GIAO DIỆN KHI "XEM TẤT CẢ" ĐƯỢC BẬT
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((p) => (
            <ProductCardLG
              key={p.id}
              {...p}
              onView={() => setSelectedProduct(p)}
              handleAddToCart={handleAddToCart}
            />
          ))}
        </div>
      ) : (
        // ✅ GIAO DIỆN SLIDER MẶC ĐỊNH
        <div className="flex items-center justify-between gap-4">
          <ArrowButton direction="left" onClick={prev} />
          <div className="w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
              >
                {visibleProducts.map((p) => (
                  <ProductCardLG
                    key={p.id}
                    {...p}
                    onView={() => setSelectedProduct(p)}
                    handleAddToCart={handleAddToCart}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
          <ArrowButton direction="right" onClick={next} />
        </div>
      )}

      {/* ✅ NÚT "XEM TẤT CẢ" VỚI LOGIC MỚI */}
      {!showAll && products.length > itemsPerPage && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setShowAll(true)}
            className="border flex items-center border-[#5bbb46] text-[#5bbb46] px-3 py-2 rounded-md hover:bg-[#5bbb46] hover:text-white transition"
          >
            Xem tất cả
            <span>
              <FaChevronRight className="mt-[2px] ml-1" />
            </span>
          </button>
        </div>
      )}

      {/* Modal giữ nguyên */}
      {selectedProduct && (
        <ProductModal
          handleAddToCart={handleAddToCart}
          product={selectedProduct as CartItemType}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export default ProductSlider;
