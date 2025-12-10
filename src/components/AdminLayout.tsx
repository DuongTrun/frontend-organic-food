import React from "react";
import { Link, useLocation, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingBag,
  ShoppingCart,
  LogOut,
} from "lucide-react"; // Icon

const AdminLayout = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/login");
  };
  const location = useLocation();

  // Danh sách menu
  const menuItems = [
    {
      path: "/admin/products",
      label: "Quản lý Sản phẩm",
      icon: <ShoppingBag size={20} />,
    },
    {
      path: "/admin/orders",
      label: "Quản lý Đơn hàng",
      icon: <ShoppingCart size={20} />,
    },
    // Có thể thêm Dashboard, User... sau này
  ];

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      {/* --- SIDEBAR TRÁI --- */}
      <aside className="w-64 bg-white shadow-md flex flex-col z-10">
        {/* Logo */}
        <div className="h-16 flex items-center justify-center border-b">
          <h1 className="text-2xl font-bold text-primary">Organic Admin</h1>
        </div>

        {/* Menu Links */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200
                                    ${
                                      isActive
                                        ? "bg-primary text-white shadow-lg shadow-green-200"
                                        : "text-gray-600 hover:bg-green-50 hover:text-primary"
                                    }`}
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t">
          <button className="flex items-center gap-3 w-full px-4 py-3 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors" onClick={handleLogout}>
            <LogOut size={20} />
            <span>Đăng xuất</span>
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT PHẢI --- */}
      <main className="flex-1 overflow-auto p-8">
        <Outlet /> {/* Nơi hiển thị các trang con (Products, Orders...) */}
      </main>
    </div>
  );
};

export default AdminLayout;
