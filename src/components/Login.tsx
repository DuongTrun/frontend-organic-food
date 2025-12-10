// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import logo from "../assets/logo.png";

// const Login: React.FC = () => {
//   const navigate = useNavigate();

//   // State cho form
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");

//   // 👉 Xử lý nút "Đăng nhập"
//   const handleLogin = async () => {
//     // 1. Validate cơ bản
//     if (!email || !password) {
//       setErrorMessage("Vui lòng nhập đầy đủ thông tin!");
//       return;
//     }

//     try {
//       // 2. Gọi API để xác thực với Backend (để lấy Token)
//       const response = await axios.post(
//         "http://localhost:8081/api/auth/login",
//         {
//           email,
//           password,
//         }
//       );

//       const { token, username } = response.data;

//       if (!token) {
//         setErrorMessage("Đăng nhập thất bại: Không nhận được token từ server!");
//         return;
//       }

//       // ✅ 3. Lưu token vào localStorage
//       localStorage.setItem("token", token);
//       if (username) localStorage.setItem("username", username);

//       alert("Đăng nhập thành công!");

//       if (email === "admin@gmail.com" && password === "123456") {
//         console.log("👉 Chào mừng Admin, đang chuyển hướng...");
//         navigate("/admin/products");
//       } else {
//         console.log("👉 Chào User, đang chuyển về trang chủ...");
//         navigate("/");
//       }
//     } catch (error: unknown) {
//       console.error("Lỗi khi đăng nhập:", error);

//       if (axios.isAxiosError(error)) {
//         const message =
//           (error.response?.data as Record<string, unknown>)?.[
//             "message"
//           ]?.toString() || "Sai email hoặc mật khẩu!";
//         setErrorMessage(message);
//       } else {
//         setErrorMessage("Không thể kết nối đến máy chủ!");
//       }
//     }
//   };

//   // 👉 Điều hướng sang đăng ký
//   const handleSignUp = () => {
//     navigate("/signup");
//   };

//   return (
//     <div className="bg-[#5bbb46] flex items-center justify-center min-h-screen">
//       <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
//         {/* Logo */}
//         <div className="flex justify-center mb-6">
//           <img src={logo} alt="Organic Food Logo" className="h-20" />
//         </div>

//         {/* Tiêu đề */}
//         <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
//           Chào mừng trở lại!
//         </h2>

//         {/* Form */}
//         <div className="mb-4">
//           <label
//             className="block text-gray-700 text-sm font-semibold mb-2"
//             htmlFor="email"
//           >
//             Email
//           </label>
//           <input
//             id="email"
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Nhập email của bạn"
//             className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
//           />
//         </div>

//         <div className="mb-6">
//           <label
//             className="block text-gray-700 text-sm font-semibold mb-2"
//             htmlFor="password"
//           >
//             Mật khẩu
//           </label>
//           <input
//             id="password"
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="••••••••"
//             className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
//           />
//         </div>

//         {/* Thông báo lỗi */}
//         {errorMessage && (
//           <p className="text-red-500 text-sm mb-4 text-center">
//             {errorMessage}
//           </p>
//         )}

//         <div>
//           <button
//             className="w-full bg-primary hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-300"
//             type="button"
//             onClick={handleLogin}
//           >
//             Đăng Nhập
//           </button>
//         </div>

//         {/* Liên kết sang đăng ký */}
//         <p className="text-center text-gray-600 text-sm mt-8">
//           Chưa có tài khoản?{" "}
//           <button
//             className="text-primary font-semibold hover:underline"
//             onClick={handleSignUp}
//           >
//             Đăng ký ngay
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import logo from "../assets/logo.png"; // Nhớ bỏ comment nếu có ảnh

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignUp = () => {
    navigate("/signup");
  };
  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMessage("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    try {
      // 1. Gọi API đăng nhập
      const response = await axios.post(
        "https://backend-organic-food.onrender.com/api/auth/login",
        {
          email,
          password,
        }
      );

      // 2. Lấy dữ liệu trả về
      const { token, username } = response.data;

      // 3. Lưu vào localStorage
      localStorage.setItem("token", token);
      if (username) localStorage.setItem("username", username);

      // 4. XỬ LÝ CHUYỂN HƯỚNG (ROUTING)
      // Vì backend đã trả về OK, ta chỉ cần check email để chuyển trang
      if (email === "admin@gmail.com") {
        alert("Xin chào Admin! Đang vào trang quản lý...");
        navigate("/admin/products"); // Chuyển sang Admin Dashboard
      } else {
        alert("Đăng nhập thành công!");
        navigate("/"); // Chuyển sang trang chủ bán hàng
      }
    } catch (error: any) {
      console.error("Lỗi:", error);
      // Xử lý thông báo lỗi từ Backend gửi về (nếu có)
      const msg = error.response?.data?.message || "Sai email hoặc mật khẩu!";
      setErrorMessage(msg);
    }
  };

  return (
    <div className="bg-[#5bbb46] flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Đăng Nhập
        </h2>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#5bbb46] outline-none"
            placeholder="admin@gmail.com"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            Mật khẩu
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#5bbb46] outline-none"
            placeholder="Nhập mật khẩu..."
          />
        </div>

        {errorMessage && (
          <p className="text-red-500 text-sm mb-4 text-center">
            {errorMessage}
          </p>
        )}

        <button
          onClick={handleLogin}
          className="w-full bg-[#5bbb46] hover:bg-green-600 text-white font-bold py-3 rounded-lg transition-colors"
        >
          Đăng Nhập
        </button>
        <div className="mt-4 text-center">
           <span className="text-gray-600">Chưa có tài khoản? </span>
          {" "}
          <button
            onClick={handleSignUp}
            className="text-[#5bbb46] font-bold hover:underline focus:outline-none"
          >
            Đăng ký
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// // import logo from "../assets/logo.png"; // Nhớ bỏ comment nếu có ảnh

// const Login: React.FC = () => {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");

//   const handleLogin = async () => {
//     if (!email || !password) {
//       setErrorMessage("Vui lòng nhập đầy đủ thông tin!");
//       return;
//     }

//     try {
//       // 1. Gọi API đăng nhập
//       const response = await axios.post(
//         "http://localhost:8081/api/auth/login",
//         {
//           email,
//           password,
//         }
//       );

//       // 2. Lấy dữ liệu trả về
//       const { token, username } = response.data;

//       // 3. Lưu vào localStorage
//       localStorage.setItem("token", token);
//       if (username) localStorage.setItem("username", username);

//       // 4. XỬ LÝ CHUYỂN HƯỚNG (ROUTING)
//       // Vì backend đã trả về OK, ta chỉ cần check email để chuyển trang
//       if (email === "admin@gmail.com") {
//         alert("Xin chào Admin! Đang vào trang quản lý...");
//         navigate("/admin/products"); // Chuyển sang Admin Dashboard
//       } else {
//         alert("Đăng nhập thành công!");
//         navigate("/"); // Chuyển sang trang chủ bán hàng
//       }
//     } catch (error: any) {
//       console.error("Lỗi:", error);
//       // Xử lý thông báo lỗi từ Backend gửi về (nếu có)
//       const msg = error.response?.data?.message || "Sai email hoặc mật khẩu!";
//       setErrorMessage(msg);
//     }
//   };

//   // Hàm xử lý khi nhấn vào Đăng ký
//   const handleSignUp = () => {
//     navigate("/signup");
//   };

//   return (
//     <div className="bg-[#5bbb46] flex items-center justify-center min-h-screen">
//       <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
//         <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
//           Đăng Nhập
//         </h2>

//         <div className="mb-4">
//           <label className="block text-gray-700 font-semibold mb-2">
//             Email
//           </label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#5bbb46] outline-none"
//             placeholder="admin@gmail.com"
//           />
//         </div>

//         <div className="mb-6">
//           <label className="block text-gray-700 font-semibold mb-2">
//             Mật khẩu
//           </label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#5bbb46] outline-none"
//             placeholder="Nhập mật khẩu..."
//           />
//         </div>

//         {errorMessage && (
//           <p className="text-red-500 text-sm mb-4 text-center">
//             {errorMessage}
//           </p>
//         )}

//         <button
//           onClick={handleLogin}
//           className="w-full bg-[#5bbb46] hover:bg-green-600 text-white font-bold py-3 rounded-lg transition-colors"
//         >
//           Đăng Nhập
//         </button>

//         {/* Phần thêm vào: Liên kết Đăng ký */}
//         <div className="mt-4 text-center">
//           <span className="text-gray-600">Chưa có tài khoản? </span>
//           <button
//             onClick={handleSignUp}
//             className="text-[#5bbb46] font-bold hover:underline focus:outline-none"
//           >
//             Đăng ký
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
