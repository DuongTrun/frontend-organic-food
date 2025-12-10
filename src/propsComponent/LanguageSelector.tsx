import vietnam from "../assets/Co-Vietnam.png"
import england from "../assets/uk_flag.jpg"

function LanguageSelector() {
  return (
    <div className="relative group inline-block mr-2 ">
      {/* Nút hiển thị ngôn ngữ hiện tại */}
      <div className="flex items-center  px-3 py-2 bg-[#5bbb46] rounded-md cursor-pointer ml-[-10px]">
        <img
          src={vietnam}
          alt="Vietnam"
          className="w-5 h-4"
        />
        <svg
          className="w-4 h-4 ml-1 text-white group-hover:rotate-180 transition-transform duration-200"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Dropdown */}
      <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-200">
        <button className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 w-full text-left">
          <img src={vietnam} alt="Vietnam" className="w-5 h-4" />
          <span className="text-gray-800">Tiếng Việt</span>
        </button>
        <button className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 w-full text-left">
          <img src={england} alt="English" className="w-5 h-4" />
          <span className="text-gray-800">English</span>
        </button>
      </div>
    </div>
  );
}

export default LanguageSelector;
