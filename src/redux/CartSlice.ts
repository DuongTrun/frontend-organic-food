import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export interface CartItemType {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
  category?: string;
}

interface CartState {
  cartItems: CartItemType[];
  totalCount: number;
  totalPrice: number;
  selectedCategory: string;
}

const initialState: CartState = {
  cartItems: JSON.parse(localStorage.getItem("cartItems") || "[]"),
  totalCount: 0,
  totalPrice: 0,
  selectedCategory: "Tất cả",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItemType>) => {
      const product = action.payload;
      const numericPrice = Number(String(product.price).replace(/[^\d]/g, ""));
      const existing = state.cartItems.find((item) => item.id === product.id);

      if (existing) {
        existing.quantity += 1;
        toast.info("Tăng số lượng sản phẩm trong giỏ hàng 🛒", {
          style: { backgroundColor: "#5bbb46", color: "#fff" },
        });
      } else {
        state.cartItems.push({ ...product, price: numericPrice, quantity: 1 });
        toast.success("Thêm vào giỏ hàng thành công 🎉", {
          style: { backgroundColor: "#5bbb46", color: "#fff" },
        });
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    increaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.cartItems.find((i) => i.id === action.payload);
      if (item) item.quantity += 1;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.cartItems.find((i) => i.id === action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    removeItem: (state, action: PayloadAction<number>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
      toast.error("Đã xóa sản phẩm khỏi giỏ hàng ❌", {
        style: { backgroundColor: "#5bbb46", color: "#fff" },
      });
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    clearCart: (state) => {
      state.cartItems = [];
      localStorage.removeItem("cartItems");
    },

    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },

    resetCategory: (state) => {
      state.selectedCategory = "Tất cả";
    },

  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeItem,
  clearCart,
  setSelectedCategory,
  resetCategory
} = cartSlice.actions;

export default cartSlice.reducer;
