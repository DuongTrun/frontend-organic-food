import { Menu } from "lucide-react";
import { CiStar } from "react-icons/ci";
import { IoGiftOutline } from "react-icons/io5";
import { GiFruitBowl } from "react-icons/gi";
const Navbar = () => {
  return (
    <nav className="bg-white py-2 px-6 flex items-center justify-around w-[82%] mx-auto">
      <div className="flex items-center space-x-2 font-semibold text-gray-800 relative right-[80px] ">
        <Menu className="text-black" size={25} />
        <span className="font-base  ">Danh sách sản phẩm</span>
      </div>

      <div className="hidden md:flex  text-gray-600  font-normal gap-3 text-base">
        <span className="flex items-center ">
          <CiStar size={20} />
        </span>
        <p>Chứng nhận hữu cơ</p>
        <span className="flex items-center">
          <IoGiftOutline size={18} />
        </span>
        <p>Hàng sỉ hữu cơ giá tốt</p>
        <span className="flex items-center">
          <GiFruitBowl size={18} />
        </span>
        <p>Tự hào là doanh nghiệp do phụ nữ làm chủ</p>
      </div>
    </nav>
  );
};

export default Navbar;
