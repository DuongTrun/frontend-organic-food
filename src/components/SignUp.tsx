// src/components/Register.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/logo.png";

const SignUp: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleRegister = async () => {
    const { fullName, email, password, confirmPassword } = formData;

    if (!fullName || !email || !password) {
      alert("⚠️ Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    if (password !== confirmPassword) {
      alert("⚠️ Mật khẩu xác nhận không khớp!");
      return;
    }

    try {
      const response = await axios.post(
        "https://backend-organic-food.onrender.com/api/auth/register",
        {
          username: fullName,
          email: email,
          password: password,
        }
      );

      if (response.status === 200 || response.status === 201) {
        alert("🎉 Đăng ký thành công!");
        navigate("/login");
      }
    } catch (error: any) {
      console.error("Lỗi khi đăng ký:", error);

      if (error.response) {
        alert(`❌ Lỗi: ${error.response.data || "Đăng ký thất bại"}`);
      } else {
        alert("❌ Không thể kết nối đến server!");
      }
    }
  };

  const handleNavigate = () => {
    navigate("/login");
  };

  return (
    <div className="bg-[#5bbb46] flex items-center justify-center min-h-screen py-12">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Organic Food Logo" className="h-20" />
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Tạo tài khoản mới
        </h2>

        {/* Form */}
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="fullName"
            >
              Họ và tên
            </label>
            <input
              id="fullName"
              type="text"
              placeholder="Nhập họ và tên của bạn"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Nhập email của bạn"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="password"
            >
              Mật khẩu
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="confirmPassword"
            >
              Xác nhận mật khẩu
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <button
              onClick={handleRegister}
              className="w-full bg-primary hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-300"
              type="button"
            >
              Đăng Ký
            </button>
          </div>
        </form>

        {/* Link to Login */}
        <p className="text-center text-gray-600 text-sm mt-8">
          Đã có tài khoản?{" "}
          <button
            className="text-primary font-semibold hover:underline"
            onClick={handleNavigate}
          >
            Đăng nhập
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
