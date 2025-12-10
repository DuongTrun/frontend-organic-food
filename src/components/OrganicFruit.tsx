import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../propsComponent/ProductCard";
import { FaChevronRight } from "react-icons/fa";
import ProductModal from "./ProductModal";
import { CartItemType } from "../ultils/type";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setSelectedCategory } from "../redux/CartSlice";

// ✅ INTERFACE ĐÃ ĐƯỢC CẬP NHẬT
interface Product {
  id: number;
  name: string;
  price: number | string;
  image: string;
  quantity: number;
  description?: string;
  category?: string;
  origin?: string;
  organic?: boolean;
  processingStatus?: string;
}

interface ProductSliderProps {
  handleAddToCart: (product: CartItemType) => void;
}

const categories = [
  "Tất cả",
  "Trái cây việt hữu cơ",
  "Trái cây nhập khẩu",
  "Trái cây sấy và đông lạnh",
];

const OrganicFruit: React.FC<ProductSliderProps> = ({ handleAddToCart }) => {
  const dispatch = useDispatch();
  const selectedCategory = useSelector(
    (state: RootState) => state.cart.selectedCategory
  );

  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  // ✅ LOGIC FETCH DỮ LIỆU ĐÃ ĐƯỢC VIẾT LẠI HOÀN TOÀN
  useEffect(() => {
    const fetchProducts = async () => {
      console.log("Đang chọn danh mục:", selectedCategory);
      setLoading(true);

      // Xây dựng URL API động dựa trên category được chọn
      const baseUrl = "https://backend-organic-food.onrender.com/api/products";
      let apiUrl = baseUrl;

      // Logic chuyển đổi category từ frontend thành tham số cho backend
      // Vì component này là "Trái cây hữu cơ", isOrganic=true luôn được áp dụng
      switch (selectedCategory) {
        case "Trái cây việt hữu cơ":
          apiUrl += "?origin=vietnam&isOrganic=true";
          break;
        case "Trái cây nhập khẩu":
          // Lấy sản phẩm hữu cơ nhập khẩu
          apiUrl += "?origin=import&isOrganic=true";
          break;
        case "Trái cây sấy và đông lạnh":
          // Lấy sản phẩm hữu cơ được sấy HOẶC đông lạnh
          apiUrl += "?status=dried&status=frozen&isOrganic=true";
          break;
        case "Tất cả":
        default:
          // Mặc định hoặc khi chọn "Tất cả", chỉ lấy các sản phẩm hữu cơ
          apiUrl += "?isOrganic=true";
          break;
      }

      try {
        const res = await axios.get(apiUrl);
        setProducts(res.data);
      } catch (error) {
        console.error(
          `Lỗi khi tải sản phẩm cho category: ${selectedCategory}`,
          error
        );
        setProducts([]); // Đặt lại sản phẩm thành mảng rỗng nếu có lỗi
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]); // 🔥 Quan trọng: Effect này sẽ chạy lại mỗi khi `selectedCategory` thay đổi

  const displayedProducts = showAll ? products : products.slice(0, 5);

  return (
    <div className="bg-white rounded-xl p-6 w-[82%] mx-auto mt-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold mb-6">Trái cây hữu cơ</h2>
        <div className="flex gap-3 mb-6 relative z-100">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => dispatch(setSelectedCategory(cat))}
              className={`px-3 py-2 rounded-md text-sm font-normal border transition-all duration-200 ${
                selectedCategory === cat
                  ? "bg-[#5bbb46] text-white border-[#5bbb46]"
                  : "bg-gray-100 text-black hover:text-[#5bbb46] hover:border-[#5bbb46] hover:bg-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
      {loading ? (
        <p className="text-center text-gray-500 py-10">Đang tải sản phẩm...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
          {displayedProducts.map((p) => (
            <ProductCard
              key={p.id}
              {...p}
              onView={() => setSelectedProduct(p)}
              handleAddToCart={handleAddToCart}
            />
          ))}
        </div>
      )}
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
          product={selectedProduct as CartItemType}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export default OrganicFruit;
