import { FaPhoneSquareAlt, FaUserCircle } from "react-icons/fa";
import logo from "../assets/logo.png";
import LanguageSelector from "../propsComponent/LanguageSelector";
import NotificationHover from "../propsComponent/NotificationHover";
import { useNavigate } from "react-router-dom";
import CartOnHeader from "../propsComponent/CartOnHeader";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import {
  increaseQuantity,
  decreaseQuantity,
  removeItem,
} from "../redux/CartSlice";
import { useEffect, useState } from "react";
import SearchPage from "./SearchPage";
import { IoSearch } from "react-icons/io5";
import SearchInput from "./SearchInput";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [username, setUsername] = useState<string | null>(null);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const name = localStorage.getItem("username");
    if (name) setUsername(name);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setUsername(null);
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleBackHome = () => {
    navigate("/");
  };

  // ✅ Lấy dữ liệu từ Redux store
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <header className="bg-[#5bbb46] py-2 px-4 flex flex-col md:flex-row items-center justify-evenly text-white relative">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <img
          src={logo}
          alt="OrganicFood"
          className="w-[110px] h-[110px] cursor-pointer"
          onClick={handleBackHome}
        />
      </div>

      {/* Search */}

      <SearchInput />

      {/* Info */}
      <div className="flex items-center space-x-6 mt-3 md:mt-0 ml-[-5.5rem] relative">
        {/* Phone */}
        <div className="flex items-center space-x-1">
          <FaPhoneSquareAlt size={25} className="mr-3" />
          <div className="flex-col">
            <p className="text-base font-normal">Hỗ trợ khách hàng</p>
            <p className="text-base font-bold hover:text-[#5bbb46] cursor-pointer">
              028 7307 1088
            </p>
          </div>
        </div>

        {/* Account */}

        <div className="flex items-center space-x-2 cursor-pointer relative">
          {username ? (
            <>
              <div
                className="flex items-center space-x-2"
                onClick={() => setShowMenu(!showMenu)}
              >
                <FaUserCircle size={28} className="text-white" />
                <span className="font-medium text-white hover:text-[#5bbb46]">
                  {username}
                </span>
              </div>

              {showMenu && (
                <div className="absolute top-10 right-0 bg-white shadow-md rounded-md p-2">
                  <button
                    onClick={handleLogout}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    Đăng xuất
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="flex items-center space-x-2">
              <FaUserCircle size={28} className="text-white" />
              <div className="flex flex-col">
                <p className="text-base font-normal hover:text-[#5bbb46]">
                  Tài khoản
                </p>
                <button
                  className="text-sm font-normal hover:text-[#5bbb46]"
                  onClick={handleLogin}
                >
                  Đăng nhập
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ✅ Giỏ hàng từ Redux */}
        <CartOnHeader
          cartItems={cartItems}
          cartCount={cartCount}
          handleIncrease={(id) => dispatch(increaseQuantity(id))}
          handleDecrease={(id) => dispatch(decreaseQuantity(id))}
          handleRemove={(id) => dispatch(removeItem(id))}
        />

        {/* Language */}
        <LanguageSelector />
        {/* Notification */}
        <NotificationHover />
      </div>
    </header>
  );
};

export default Header;
