import React, { useEffect, useState } from "react";
import Sidebar from "../components/SideBar";
import ProductCard from "../propsComponent/ProductCard"; // Import component có sẵn của bạn
import { getFilteredProducts } from "../ultils/api";
import { ProductAPI, FilterState, CartItemType } from "../ultils/type";
import SearchHeader from "../propsComponent/SearchHeader";

const FilterPage: React.FC = () => {
  const [products, setProducts] = useState<ProductAPI[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // State bộ lọc
  const [filters, setFilters] = useState<FilterState>({
    brands: [],
    sort: "name,asc",
    minPrice: undefined,
    maxPrice: undefined,
  });

  // Gọi API mỗi khi filters thay đổi
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getFilteredProducts(filters);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [filters]);

  // Hàm giả lập thêm vào giỏ (bạn thay bằng logic thật của bạn)
  const handleAddToCart = (item: CartItemType) => {
    console.log("Đã thêm vào giỏ:", item);
    alert(`Đã thêm ${item.name} vào giỏ hàng!`);
  };

  // Hàm giả lập xem chi tiết
  const handleViewDetail = (id: number) => {
    console.log("Xem chi tiết sản phẩm ID:", id);
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-[#f8f9fa] min-h-screen">
      <div className="w-screen -mx-[115px] mt-[-32px]">
        {" "}
        <SearchHeader />
      </div>
      {/* Title Header */}
      <div className="mb-6 border-b pb-4">
        <h1 className="text-2xl font-bold text-gray-800">Rau Củ Quả Organic</h1>
        <span className="text-sm text-gray-500">
          Tìm thấy {products.length} sản phẩm
        </span>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* --- LEFT: SIDEBAR --- */}
        <Sidebar filters={filters} setFilters={setFilters} />

        {/* --- RIGHT: PRODUCT LIST --- */}
        <div className="w-full lg:w-3/4">
          {/* Sort Dropdown */}
          <div className="flex justify-end mb-6">
            <select
              className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#5bbb46] bg-white shadow-sm"
              value={filters.sort}
              onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
            >
              <option value="name,asc">Tên A → Z</option>
              <option value="name,desc">Tên Z → A</option>
              <option value="price,asc">Giá tăng dần</option>
              <option value="price,desc">Giá giảm dần</option>
            </select>
          </div>

          {/* Render List */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-[#5bbb46]"></div>
            </div>
          ) : (
            <>
              {products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                  {products.map((product) => (
                    // Sử dụng lại ProductCard của bạn
                    <ProductCard
                      key={product.id}
                      id={product.id}
                      image={product.image}
                      name={product.name}
                      price={product.price}
                      // Logic Tag: Nếu là Organic thì hiện tag, không thì hiện Brand
                      tag={product.organic ? "Organic" : product.brand}
                      handleAddToCart={handleAddToCart}
                      onView={() => handleViewDetail(product.id)}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 bg-white rounded shadow-sm">
                  <p className="text-gray-500">
                    Không tìm thấy sản phẩm nào phù hợp.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterPage;
