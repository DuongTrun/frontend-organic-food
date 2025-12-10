// // src/api/productApi.ts (hoặc tên file hiện tại của bạn)

// import axios from "axios";
// import { ProductAPI, FilterState, Order, UserSpentStats } from "../ultils/type";

// // ⚠️ Lưu ý: Kiểm tra lại port của Backend là 8080 hay 8081 nhé.
// // Nếu Backend chạy 8080 thì sửa số 8081 thành 8080 ở dòng dưới.
// const BASE_URL = "http://localhost:8081/api";

// const PRODUCT_URL = `${BASE_URL}/products`;
// const ORDER_URL = `${BASE_URL}/orders`;

// // =================================================================
// // 1. PHẦN CŨ (CLIENT VIEW & FILTER) - GIỮ NGUYÊN
// // =================================================================

// export const getFilteredProducts = async (filters: FilterState) => {
//   const params = new URLSearchParams();

//   // 1. Xử lý Brand
//   if (filters.brands.length > 0) {
//     params.append("brands", filters.brands.join(","));
//   }

//   // 2. Xử lý Giá
//   if (filters.minPrice !== undefined)
//     params.append("minPrice", filters.minPrice.toString());
//   if (filters.maxPrice !== undefined)
//     params.append("maxPrice", filters.maxPrice.toString());

//   // 3. Xử lý Sort
//   const [sortBy, sortDir] = filters.sort.split(",");
//   if (sortBy) params.append("sortBy", sortBy);
//   if (sortDir) params.append("sortDir", sortDir);

//   // Gọi API
//   const response = await axios.get<ProductAPI[]>(
//     `${PRODUCT_URL}?${params.toString()}`
//   );
//   return response.data;
// };

// // =================================================================
// // 2. PHẦN MỚI: ADMIN QUẢN LÝ SẢN PHẨM (CRUD)
// // =================================================================

// // Lấy tất cả sản phẩm (Không lọc, dùng cho bảng Admin)
// export const getAllProductsAdmin = async () => {
//   const response = await axios.get<ProductAPI[]>(PRODUCT_URL);
//   return response.data;
// };

// // Thêm sản phẩm mới
// export const createProduct = async (product: ProductAPI) => {
//   const response = await axios.post<ProductAPI>(PRODUCT_URL, product);
//   return response.data;
// };

// // Cập nhật sản phẩm
// export const updateProduct = async (id: number, product: ProductAPI) => {
//   const response = await axios.put<ProductAPI>(`${PRODUCT_URL}/${id}`, product);
//   return response.data;
// };

// // Xóa sản phẩm
// export const deleteProduct = async (id: number) => {
//   await axios.delete(`${PRODUCT_URL}/${id}`);
// };

// // =================================================================
// // 3. PHẦN MỚI: ADMIN QUẢN LÝ ĐƠN HÀNG (ORDER)
// // =================================================================

// // Lấy danh sách tất cả đơn hàng
// export const getAllOrders = async () => {
//   const response = await axios.get<Order[]>(ORDER_URL);
//   return response.data;
// };

// // Cập nhật trạng thái đơn hàng (VD: PENDING -> SHIPPING)
// export const updateOrderStatus = async (id: number, status: string) => {
//   // Backend đang nhận status qua Query Param (?status=SHIPPING)
//   const response = await axios.put<Order>(
//     `${ORDER_URL}/${id}/status?status=${status}`
//   );
//   return response.data;
// };

// // Lấy thống kê tổng tiền User đã tiêu
// export const getUserTotalSpent = async (userId: number) => {
//   const response = await axios.get<UserSpentStats>(
//     `${ORDER_URL}/user/${userId}/total-spent`
//   );
//   return response.data; // Trả về { userId: 1, totalSpent: 500000 }
// };

// src/api/productApi.ts

import axios from "axios";
import { ProductAPI, FilterState, Order, UserSpentStats } from "../ultils/type";

// ⚠️ Kiểm tra kỹ Port: 8080 hay 8081. Code cũ bạn gửi là 8081 nên mình giữ 8081.
const BASE_URL = "https://backend-organic-food.onrender.com/api";

// 1. TẠO INSTANCE AXIOS (Cấu hình chung)
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 2. THÊM INTERCEPTOR (Quan trọng nhất: Tự động gắn Token vào Header)
api.interceptors.request.use(
  (config: any) => {
    const token = localStorage.getItem("token");

    if (token) {
      // Vì config là 'any' nên bạn có thể gán thoải mái mà không bị báo lỗi đỏ
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// =================================================================
// 3. SỬA CÁC HÀM GỌI API (Dùng biến 'api' thay vì 'axios')
// =================================================================

// --- PHẦN KHÁCH HÀNG (View & Filter) ---
export const getFilteredProducts = async (filters: FilterState) => {
  const params = new URLSearchParams();

  // Xử lý Brand
  if (filters.brands.length > 0) {
    params.append("brands", filters.brands.join(","));
  }

  // Xử lý Giá
  if (filters.minPrice !== undefined)
    params.append("minPrice", filters.minPrice.toString());
  if (filters.maxPrice !== undefined)
    params.append("maxPrice", filters.maxPrice.toString());

  // Xử lý Sort
  const [sortBy, sortDir] = filters.sort.split(",");
  if (sortBy) params.append("sortBy", sortBy);
  if (sortDir) params.append("sortDir", sortDir);

  // ⚠️ Dùng api.get và đường dẫn tương đối (/products)
  const response = await api.get<ProductAPI[]>(
    `/products?${params.toString()}`
  );
  return response.data;
};

// --- PHẦN ADMIN: QUẢN LÝ SẢN PHẨM (CRUD) ---

// Lấy tất cả sản phẩm (Admin)
export const getAllProductsAdmin = async () => {
  const response = await api.get<ProductAPI[]>("/products");
  return response.data;
};

// Thêm sản phẩm mới
export const createProduct = async (product: ProductAPI) => {
  const response = await api.post<ProductAPI>("/products", product);
  return response.data;
};

// Cập nhật sản phẩm
export const updateProduct = async (id: number, product: ProductAPI) => {
  const response = await api.put<ProductAPI>(`/products/${id}`, product);
  return response.data;
};

// Xóa sản phẩm
export const deleteProduct = async (id: number) => {
  await api.delete(`/products/${id}`);
};

// --- PHẦN ADMIN: QUẢN LÝ ĐƠN HÀNG (ORDER) ---

// Lấy danh sách tất cả đơn hàng
export const getAllOrders = async () => {
  const response = await api.get<Order[]>("/orders");
  return response.data;
};

// Cập nhật trạng thái đơn hàng
export const updateOrderStatus = async (id: number, status: string) => {
  const response = await api.put<Order>(
    `/orders/${id}/status?status=${status}`
  );
  return response.data;
};

// Lấy thống kê tổng tiền User đã tiêu
export const getUserTotalSpent = async (userId: number) => {
  const response = await api.get<UserSpentStats>(
    `/orders/user/${userId}/total-spent`
  );
  return response.data;
};
export const createOrder = async (orderData: any) => {
  const response = await api.post("/orders/create", orderData);
  return response.data;
};
