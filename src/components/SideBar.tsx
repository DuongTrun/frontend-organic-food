import React from 'react';
import { FilterState } from '../ultils/type';

interface Props {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
}

const Sidebar: React.FC<Props> = ({ filters, setFilters }) => {
  // Danh sách Brand cứng (để hiển thị checkbox)
  const brands = ["Organicfood.vn", "Thiên Nhiên", "Bếp O", "Kirkland", "Fuwa3e", "Bob’s Red Mill"];

  // Các mức giá
  const priceRanges = [
    { label: "Tất cả", min: undefined, max: undefined },
    { label: "Dưới 100k", min: 0, max: 100000 },
    { label: "100k - 200k", min: 100000, max: 200000 },
    { label: "200k - 500k", min: 200000, max: 500000 },
    { label: "Trên 500k", min: 500000, max: undefined }
  ];

  // Xử lý chọn Brand
  const handleBrandChange = (brand: string) => {
    setFilters(prev => {
      const newBrands = prev.brands.includes(brand)
        ? prev.brands.filter(b => b !== brand) // Bỏ chọn
        : [...prev.brands, brand];             // Chọn thêm
      return { ...prev, brands: newBrands };
    });
  };

  // Xử lý chọn Giá
  const handlePriceChange = (min?: number, max?: number) => {
    setFilters(prev => ({ ...prev, minPrice: min, maxPrice: max }));
  };

  return (
    <div className="w-full lg:w-1/4 pr-4 border-r border-gray-100">
      
      {/* FILTER BRAND */}
      <div className="mb-8">
        <h3 className="font-bold text-gray-800 mb-4 uppercase text-sm tracking-wide">Thương hiệu</h3>
        <div className="flex flex-col gap-3">
          {brands.map((brand) => (
            <label key={brand} className="flex items-center gap-3 cursor-pointer group hover:text-[#5bbb46] transition">
              <input
                type="checkbox"
                className="w-4 h-4 accent-[#5bbb46] cursor-pointer rounded border-gray-300"
                checked={filters.brands.includes(brand)}
                onChange={() => handleBrandChange(brand)}
              />
              <span className="text-gray-600 text-sm group-hover:text-[#5bbb46]">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* FILTER PRICE */}
      <div className="mb-8">
        <h3 className="font-bold text-gray-800 mb-4 uppercase text-sm tracking-wide">Mức giá</h3>
        <div className="flex flex-col gap-3">
          {priceRanges.map((range, index) => (
            <label key={index} className="flex items-center gap-3 cursor-pointer group hover:text-[#5bbb46] transition">
              <input 
                type="radio" 
                name="priceFilter"
                className="w-4 h-4 accent-[#5bbb46] cursor-pointer"
                checked={filters.minPrice === range.min && filters.maxPrice === range.max}
                onChange={() => handlePriceChange(range.min, range.max)}
              />
              <span className="text-gray-600 text-sm group-hover:text-[#5bbb46]">{range.label}</span>
            </label>
          ))}
        </div>
      </div>

      <button 
        onClick={() => setFilters({ brands: [], sort: 'id,asc', minPrice: undefined, maxPrice: undefined })}
        className="w-full py-2 border border-[#5bbb46] text-[#5bbb46] rounded hover:bg-[#5bbb46] hover:text-white transition text-sm font-semibold"
      >
        XÓA BỘ LỌC
      </button>
    </div>
  );
};

export default Sidebar;