import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";


const SearchInput: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  // Hàm xử lý điều hướng sang trang tìm kiếm
  const handleSearch = () => {
    const trimmedTerm = searchTerm.trim();
    if (trimmedTerm) {
      // Điều hướng người dùng đến trang /search với từ khóa
      // Đây là hành động "thoát khỏi trang home và điều hướng"
      navigate(`/search?keyword=${encodeURIComponent(trimmedTerm)}`);
    }
    // Nếu ô tìm kiếm trống, không làm gì cả
  };

  // Xử lý khi nhấn phím Enter
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex items-center p-3">
      <div className="flex-1 max-w-lg mx-auto flex items-stretch">
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          className="w-full pr-[150px] pl-2 py-2 focus:outline-none rounded-tl-[5px] rounded-bl-[5px] text-black"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
        />
       <div className="px-[11px] py-[10px] cursor-pointer hover:bg-[#94ed82]">
          <IoSearch className="text-white" size={20} onClick={handleSearch} />
        </div>
      </div>
    </div>
  );
};

export default SearchInput;
