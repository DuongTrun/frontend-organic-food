import React from "react";
import { TiMessages } from "react-icons/ti";
import { FaAngleUp } from "react-icons/fa";
import Chatbot from "../propsComponent/Chatbot";
const FloatingButtons: React.FC = () => {
  // Hàm cuộn lên đầu trang
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // cuộn mượt
    });
  };

  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-center gap-3 z-50">
      {/* Nút Liên hệ */}
      {/* <button className="bg-[#5bbb46] hover:bg-green-600 text-white rounded-full shadow-lg w-14 h-14 flex flex-col items-center justify-center text-sm font-medium transition  border-white border-[3px]">
        <TiMessages size={20} />
        <span className="text-[8px] -mt-1">Liên hệ</span>
      </button> */}

      <Chatbot />

      {/* Nút lên đầu trang */}
      <button
        onClick={scrollToTop}
        className="bg-[#5bbb46] hover:bg-green-600 text-white rounded-md shadow-lg w-10 h-10 flex items-center justify-center transition border-white border-[3px]"
      >
        <FaAngleUp size={18} />
      </button>
    </div>
  );
};

export default FloatingButtons;
