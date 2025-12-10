import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { IoSearch } from "react-icons/io5";
import { CartItemType } from "../ultils/type";
import ProductCard from "../propsComponent/ProductCard";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/CartSlice";
import Header from "./Header";
import ProductModal from "./ProductModal";
import SearchHeader from "../propsComponent/SearchHeader";
import { Link } from "react-router-dom";
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

const SearchPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const keyword = searchParams.get("keyword") || "";
  const [searchTerm, setSearchTerm] = useState(keyword);

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const dispatch = useDispatch();
  const handleAddToCart = (product: any) => {
    dispatch(addToCart(product));
  };

  useEffect(() => {
    setSearchTerm(keyword);

    if (!keyword) {
      setProducts([]);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(false);
      try {
        const response = await axios.get(
          `https://backend-organic-food.onrender.com/api/products/search?keyword=${encodeURIComponent(
            keyword
          )}`
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Lỗi khi tìm kiếm:", error);
        setError(true);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [keyword]);

  // Gửi yêu cầu tìm kiếm
  const handleSearch = () => {
    const trimmed = searchTerm.trim();
    if (trimmed) {
      setSearchParams({ keyword: trimmed });
      if (window.location.pathname !== "/search") {
        navigate(`/search?keyword=${encodeURIComponent(trimmed)}`);
      }
    } else {
      setSearchParams({});
      setProducts([]);
    }
  };

  // Nhấn Enter để tìm
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="p-6 max-w-6xl mx-auto ">
      <div className="w-screen -mx-[158px] mt-[-32px]">
        {" "}
        <SearchHeader />
      </div>
      {/* THANH TÌM KIẾM */}
      <div className="flex items-center p-3 mb-8 border border-gray-300 bg-white rounded-lg shadow-md">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            className="w-full pl-2 py-2 text-gray-800 focus:outline-none text-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div
          className="px-[11px] py-[10px] cursor-pointer bg-[#5bbb46] hover:bg-[#94ed82] rounded-r-lg transition-colors"
          onClick={handleSearch}
        >
          <IoSearch size={24} className="text-white" />
        </div>
      </div>

      {/* KẾT QUẢ TÌM KIẾM */}
      {keyword && (
        <h2 className="2xl:text-2xl font-semibold mb-4 text-gray-800 border-b pb-2">
          Kết quả tìm kiếm cho:{" "}
          <span className="text-green-600 font-bold">{keyword} </span>
          <span className="text-green-600 font-medium text-sm ml-[600px]">
            Không ưng ý về tìm kiếm sản phẩm ?{" "}
            <Link
              to="/filterpage"
              className="underline hover:text-green-800 transition-colors ml-1"
            >
              Thử tìm cách khác
            </Link>
          </span>
        </h2>
      )}

      {loading && (
        <p className="text-center text-xl text-[#5bbb46] my-10">
          Đang tìm kiếm sản phẩm...
        </p>
      )}

      {error && (
        <p className="text-center text-xl text-red-500 my-10">
          ❌ Đã xảy ra lỗi khi tải dữ liệu. Vui lòng kiểm tra kết nối API.
        </p>
      )}

      {!loading &&
        !error &&
        keyword &&
        (products.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                // id={product.id}
                {...product}
                image={
                  product.image ||
                  "https://placehold.co/300x300/e2e8f0/94a3b8?text=Lỗi+Ảnh"
                }
                // name={product.name}
                // price={product.price}

                handleAddToCart={handleAddToCart}
                onView={() => setSelectedProduct(product)}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-xl text-gray-500 my-10">
            🔍 Không tìm thấy sản phẩm nào phù hợp với từ khóa "{keyword}".
          </p>
        ))}

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

export default SearchPage;
