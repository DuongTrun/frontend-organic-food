import { useState } from "react";
import { IoMdNotifications } from "react-icons/io";

function NotificationHover() {
  const [open, setOpen] = useState(false);

  const notifications = [
    {
      title: "Cá hồi Organic vừa mới về ngày 21/5. Đặt hàng ngay thôi",
      date: "21/05/2025",
      link: "#",
    },
    {
      title: "Nấm hữu cơ chuẩn USDA/EU vừa mới về.",
      date: "21/05/2025",
      link: "#",
    },
    {
      title: "Lễ hội thực phẩm hữu cơ đang diễn ra.",
      date: "16/05/2025",
      link: "#",
    },
    {
      title: "VTV đưa tin Niềm Tự Hào Nông Sản Việt",
      date: "29/04/2025",
      link: "#",
    },
  ];

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* Icon chuông */}
      <div className="relative">
        <IoMdNotifications className="text-white text-3xl ml-[-25px] cursor-pointer" />
        <span className="absolute -top-0 -right-0 w-3.5 h-3.5 bg-red-600 border-2 border-green-500 rounded-full"></span>
      </div>

      {/* Dropdown có hiệu ứng */}
      <div
        className={`absolute right-0 mt-2 w-80 bg-white border border-gray-300 rounded-xl shadow-lg overflow-hidden transform transition-all duration-500 ${
          open
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="max-h-80 overflow-y-auto">
          {notifications.map((item, index) => (
            <div
              key={index}
              className="p-3 border-b border-gray-200 hover:bg-gray-50 transition"
            >
              <p className="text-sm text-gray-800">{item.title}</p>
              <div className="flex justify-between text-xs mt-1">
                <span className="text-gray-500">{item.date}</span>
                <a
                  href={item.link}
                  className="text-green-600 font-medium hover:underline"
                >
                  Xem chi tiết
                </a>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center text-sm py-2 text-gray-500 hover:text-green-600 cursor-pointer">
          Xem tất cả thông báo
        </div>
      </div>
    </div>
  );
}

export default NotificationHover;
