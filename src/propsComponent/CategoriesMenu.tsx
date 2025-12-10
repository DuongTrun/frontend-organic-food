import {
  FaAppleAlt,
  FaUtensils,
  FaCarrot,
  FaDrumstickBite,
  FaShoppingBasket,
  FaCheese,
  FaWineBottle,
} from "react-icons/fa";
import { MdLocalGroceryStore, MdLocalDrink } from "react-icons/md";
import { IoChevronForward } from "react-icons/io5";

const categories = [
  { name: "Trái Cây Theo Mùa", icon: <FaAppleAlt /> },
  { name: "Bếp O - Ready To Eat", icon: <FaUtensils /> },
  { name: "Rau Củ Quả", icon: <FaCarrot /> },
  { name: "Tươi Sống", icon: <FaDrumstickBite /> },
  { name: "Bếp O - Ready To Cook", icon: <FaShoppingBasket /> },
  { name: "Thực Phẩm Khô", icon: <MdLocalGroceryStore /> },
  { name: "Gia Vị & Phụ Liệu", icon: <FaCheese /> },
  { name: "Đồ Uống Tốt Sức Khỏe", icon: <MdLocalDrink /> },
  { name: "Bơ - Sữa", icon: <FaWineBottle /> },
  { name: "Bơ - Sữa", icon: <FaWineBottle /> },
  { name: "Bơ - Sữa", icon: <FaWineBottle /> },
  { name: "Bơ - Sữa", icon: <FaWineBottle /> },
];

export default function CategoryMenu() {
  return (
    <div className="w-[276px] bg-white border">
      <ul className=" max-h-[355px] overflow-y-auto custom-scrollbar">
        {categories.map((item, index) => (
          <li
            key={index}
            className="flex items-center justify-between px-4 py-2 hover:bg-gray-100 cursor-pointer transition"
          >
            <div className="flex items-center space-x-3 text-gray-700">
              <span className="text-xl text-gray-700">{item.icon}</span>
              <span className="font-medium">{item.name}</span>
            </div>
            <IoChevronForward className="text-black" />
          </li>
        ))}
      </ul>
    </div>
  );
}
