/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      maxWidth: {
        "6xl": "1210px", // 🔧 Ghi đè giá trị mặc định của 6xl
        "8xl": "1400px", // 🌟 Hoặc thêm mới một giá trị tùy chọn
      },
      colors: {
        primary: "#5bbb46",
        "primary-hover": "#4ca33a",
      },
    },
    animation: {
      bounce: "bounce 1s infinite",
    },
    keyframes: {
      bounce: {
        "0%, 100%": {
          transform: "translateY(-25%)",
          animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)",
        },
        "50%": {
          transform: "translateY(0)",
          animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
        },
      },
    },
  },
};
