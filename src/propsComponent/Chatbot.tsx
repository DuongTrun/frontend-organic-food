import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown"; // ✅ THÊM DÒNG NÀY
import { Link } from "react-router-dom"; // ✅ THÊM DÒNG NÀY

// Định nghĩa cấu trúc của một tin nhắn (giữ nguyên)
interface Message {
  sender: "user" | "bot";
  text: string;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([
    { sender: "bot", text: "Chào bạn, tôi có thể giúp gì cho bạn?" },
  ]);
  const [userInput, setUserInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messageListRef = useRef<HTMLDivElement>(null);

  // useEffect và handleSendMessage giữ nguyên hoàn toàn
  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;
    const newUserMessage: Message = { sender: "user", text: userInput };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    const currentInput = userInput;
    setUserInput("");
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://backend-organic-food.onrender.com/api/chatbot/query",
        {
          message: currentInput,
        }
      );
      const botReply: Message = { sender: "bot", text: response.data.reply };
      setMessages((prevMessages) => [...prevMessages, botReply]);
    } catch (error) {
      console.error("Lỗi khi gọi API chatbot:", error);
      const errorReply: Message = {
        sender: "bot",
        text: "Xin lỗi, đã có lỗi xảy ra ở máy chủ.",
      };
      setMessages((prevMessages) => [...prevMessages, errorReply]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Container chính cho chatbot (giữ nguyên)
    <div className="fixed bottom-[80px] right-3 z-50 pointer-events-none">
      {/* Cửa sổ chat (giữ nguyên) */}
      <div
        className={`transition-all duration-300 ${
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <div className="w-80 h-[28rem] bg-white rounded-lg shadow-2xl flex flex-col">
          {/* Header (giữ nguyên) */}
          <div className="bg-[#5bbb46] text-white p-3 rounded-t-lg flex justify-between items-center">
            <p className="font-bold">Organic Food Assistant</p>
            <button
              onClick={() => setIsOpen(false)}
              className="text-xl font-bold hover:text-gray-200"
            >
              &minus;
            </button>
          </div>

          {/* Khu vực hiển thị tin nhắn (giữ nguyên) */}
          <div
            ref={messageListRef}
            className="flex-1 p-4 overflow-y-auto bg-gray-50"
          >
            <div className="flex flex-col space-y-2">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    // ✅ THÊM CLASS `break-words` ĐỂ XUỐNG DÒNG ĐẸP HƠN
                    className={`max-w-xs px-4 py-2 rounded-2xl break-words ${
                      msg.sender === "user"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {/* 👇👇👇 THAY ĐỔI CỐT LÕI NẰM Ở ĐÂY 👇👇👇 */}
                    <ReactMarkdown
                      components={{
                        // Ghi đè cách render thẻ 'a' (link)
                        // Biến nó thành component <Link> của React Router
                        a: ({ node, ...props }) => (
                          <Link
                            to={`/product/${props.href}`} // Giả định URL sản phẩm là /product/:slug
                            className="font-bold text-blue-600 hover:underline"
                            {...props}
                          />
                        ),
                      }}
                    >
                      {msg.text}
                    </ReactMarkdown>
                    {/* 👆👆👆 KẾT THÚC PHẦN THAY ĐỔI 👆👆👆 */}
                  </div>
                </div>
              ))}
              {/* Hiệu ứng bot đang gõ (giữ nguyên) */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-200 text-gray-800 px-4 py-2 rounded-2xl">
                    <div className="flex items-center justify-center space-x-1">
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Khu vực nhập liệu (giữ nguyên) */}
          <div className="p-2 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Nhập tin nhắn..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                onClick={handleSendMessage}
                className="bg-[#5bbb46] text-white font-bold px-4 py-2 rounded-full hover:bg-green-600 transition-colors"
              >
                Gửi
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Nút tròn để mở/đóng chatbot (giữ nguyên) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#5bbb46] text-white w-16 h-16 rounded-full flex items-center justify-center text-3xl shadow-lg hover:bg-green-600 transition-transform transform hover:scale-110 mt-4 ml-auto pointer-events-auto"
      >
        💬
      </button>
    </div>
  );
};

export default Chatbot;
