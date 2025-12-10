


import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../propsComponent/ProductCard";
import { FaChevronRight } from "react-icons/fa";
import { CartItemType } from "../ultils/type";
import ProductModal from "./ProductModal";

interface Product {
  id: number;
  name: string;
  price: number | string;
  image: string;
  quantity:number;
  description?: string;
  category?: string;
}

interface ProductSliderProps {
  handleAddToCart: (product: CartItemType) => void;
}

const MainProduct: React.FC<ProductSliderProps> = ({ handleAddToCart }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false); // 🔥 kiểm soát xem toàn bộ

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Gọi API lấy các sản phẩm thuộc category = "main"
        const res = await axios.get(
          "https://backend-organic-food.onrender.com/api/products/category/vegetable"
        );
        setProducts(res.data);
      } catch (error) {
        console.error("Lỗi tải sản phẩm:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // 🧩 Nếu chưa bấm “Xem tất cả” thì chỉ hiển thị 5 sản phẩm đầu
  const displayedProducts = showAll ? products : products.slice(0, 5);

  return (
    <div className="bg-white rounded-xl p-6 w-[82%] mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-6 border-b pb-[5px]">
        Rau củ Organic{" "}
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Đang tải sản phẩm...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
          {displayedProducts.map((p, i) => (
            <ProductCard
              key={i}
              {...p}
              handleAddToCart={handleAddToCart}
              onView={() => setSelectedProduct(p)}
            />
          ))}
        </div>
      )}

      {/* ✅ Nút "Xem tất cả" chỉ hiển thị khi chưa bật showAll */}
      {!showAll && products.length > 5 && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setShowAll(true)}
            className="border flex items-center border-[#5bbb46] text-[#5bbb46] px-3 py-2 rounded-md hover:bg-[#5bbb46] hover:text-white transition"
          >
            Xem tất cả
            <span>
              <FaChevronRight className="mt-[2px]" />
            </span>
          </button>
        </div>
      )}

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

export default MainProduct;
