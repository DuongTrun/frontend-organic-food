import React from "react";
import { FaChevronRight } from "react-icons/fa";
const AbountInfo = () => {
  const articles = [
    {
      id: 1,
      title:
        "Báo Nông Nghiệp: Organicfood tiên phong xây dựng hệ sinh thái hữu cơ",
      date: "Th 6 03/10/2025",
      desc: "Organicfood tiên phong xây dựng hệ sinh thái hữu cơ TP.HCM từ một cửa hàng nhỏ, Organicfood đã trở thành thương hiệu hữu cơ uy tín, tiên phong...",
      img: "https://cdn.hstatic.net/files/200000423303/article/dsc02839-105155_452-105157-101003_5b508f6e72b54232b219d0b7b1a51f31.jpg",
    },
  ];

  const sideArticles = [
    {
      id: 2,
      title:
        "Những Khoảnh Khắc Đầu Tiên Cùng Organicfood.vn tại “Organic Vibes” – Năng Lượng Xanh của Gen G",
      date: "Th 7 19/07/2025",
      desc: "“Organic Vibes” đã chính thức mở màn tại Sảnh Trống Đồng – Trường Đại học FPT (Khu Công Nghệ Cao, TP. Thủ Đức)...",
      img: "https://cdn.hstatic.net/files/200000423303/article/z6983312924659_62f383f89cda46255e26fc869d13c6bf_cb15275d702245cd92066b5fd2fceaac.jpg",
    },
    {
      id: 3,
      title: "Xu Hướng Tiêu Dùng Thực Phẩm Hữu Cơ 2025 – Góc Nhìn Từ Thaifex",
      date: "Th 6 06/06/2025",
      desc: "Nguồn: Fb Ngô Bích Quyên – Đồng sáng lập hệ thống Organicfood.vn...",
      img: "https://file.hstatic.net/200000423303/article/518936651_756763580260835_6950896858744046147_n_b680c1ec49e64148a21df4136bd43b93.jpg",
    },
    {
      id: 4,
      title:
        "Lễ hội Thực phẩm Hữu cơ – đòn bẩy cho thị trường xanh do Organicfood.vn cùng Farmersmarket tổ chức",
      date: "Th 4 21/05/2025",
      desc: "Sáng nay ngày 16 tháng 5 năm 2025, Lễ khai mạc Lễ hội Thực phẩm Hữu cơ vừa được tổ chức bởi hai chuỗi bán...",
      img: "https://file.hstatic.net/200000423303/article/screenshot_2025-06-06_at_11.05.29_e834526487a84e5c9e95256f3c38445c.png",
    },
    {
      id: 4,
      title:
        "Lễ hội Thực phẩm Hữu cơ – đòn bẩy cho thị trường xanh do Organicfood.vn cùng Farmersmarket tổ chức",
      date: "Th 4 21/05/2025",
      desc: "Sáng nay ngày 16 tháng 5 năm 2025, Lễ khai mạc Lễ hội Thực phẩm Hữu cơ vừa được tổ chức bởi hai chuỗi bán...",
      img: "https://file.hstatic.net/200000423303/article/screenshot_2025-06-06_at_11.05.29_e834526487a84e5c9e95256f3c38445c.png",
    },
    {
      id: 4,
      title:
        "Lễ hội Thực phẩm Hữu cơ – đòn bẩy cho thị trường xanh do Organicfood.vn cùng Farmersmarket tổ chức",
      date: "Th 4 21/05/2025",
      desc: "Sáng nay ngày 16 tháng 5 năm 2025, Lễ khai mạc Lễ hội Thực phẩm Hữu cơ vừa được tổ chức bởi hai chuỗi bán...",
      img: "https://file.hstatic.net/200000423303/article/screenshot_2025-06-06_at_11.05.29_e834526487a84e5c9e95256f3c38445c.png",
    },
    {
      id: 4,
      title:
        "Lễ hội Thực phẩm Hữu cơ – đòn bẩy cho thị trường xanh do Organicfood.vn cùng Farmersmarket tổ chức",
      date: "Th 4 21/05/2025",
      desc: "Sáng nay ngày 16 tháng 5 năm 2025, Lễ khai mạc Lễ hội Thực phẩm Hữu cơ vừa được tổ chức bởi hai chuỗi bán...",
      img: "https://file.hstatic.net/200000423303/article/screenshot_2025-06-06_at_11.05.29_e834526487a84e5c9e95256f3c38445c.png",
    },
    {
      id: 4,
      title:
        "Lễ hội Thực phẩm Hữu cơ – đòn bẩy cho thị trường xanh do Organicfood.vn cùng Farmersmarket tổ chức",
      date: "Th 4 21/05/2025",
      desc: "Sáng nay ngày 16 tháng 5 năm 2025, Lễ khai mạc Lễ hội Thực phẩm Hữu cơ vừa được tổ chức bởi hai chuỗi bán...",
      img: "https://file.hstatic.net/200000423303/article/screenshot_2025-06-06_at_11.05.29_e834526487a84e5c9e95256f3c38445c.png",
    },
    {
      id: 4,
      title:
        "Lễ hội Thực phẩm Hữu cơ – đòn bẩy cho thị trường xanh do Organicfood.vn cùng Farmersmarket tổ chức",
      date: "Th 4 21/05/2025",
      desc: "Sáng nay ngày 16 tháng 5 năm 2025, Lễ khai mạc Lễ hội Thực phẩm Hữu cơ vừa được tổ chức bởi hai chuỗi bán...",
      img: "https://file.hstatic.net/200000423303/article/screenshot_2025-06-06_at_11.05.29_e834526487a84e5c9e95256f3c38445c.png",
    },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mx-auto w-[82%] mt-9">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          Bạn Không Nên Bỏ Lỡ
        </h2>
        <a
          href="#"
          className="text-[#5bbb46] text-sm font-medium hover:underline flex items-center gap-1"
        >
          Xem tất cả
          <span className="text-lg">
            <FaChevronRight />
          </span>
        </a>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Main article */}
        <div className="w-[455px] h-[490px] bg-white  shadow-sm hover:shadow-md transition overflow-hidden flex flex-col">
          {/* Ảnh */}
          <img
            src={articles[0].img}
            alt={articles[0].title}
            className="w-full h-[303px] object-cover rounded-sm"
          />

          {/* Nội dung */}
          <div className="p-4 flex-1 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800 line-clamp-2">
                {articles[0].title}
              </h3>
              <p className="text-sm text-gray-500 mb-2">{articles[0].date}</p>
              <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                {articles[0].desc}{" "}
                <span className="text-[#5bbb46] hover:underline cursor-pointer">
                  Đọc tiếp
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Side articles */}
        <div className="w-[720px] flex flex-col gap-4 -ml-32 -mt-2 max-h-[503px] overflow-y-auto custom-scrollbar border-l">
          {sideArticles.map((item) => (
            <div
              key={item.id}
              className="flex items-start gap-3 p-2 border-b border-gray-200 hover:bg-gray-50 transition w-full "
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-28 h-20 object-cover rounded-sm"
              />
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-gray-800 line-clamp-2">
                  {item.title}
                </h4>
                <p className="text-xs text-gray-500 mt-1">{item.date}</p>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {item.desc}{" "}
                  <span className="text-[#5bbb46] hover:underline cursor-pointer">
                    Đọc tiếp
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AbountInfo;
