// src/ultils/type.ts

// =================================================================
// 1. CÁC TYPE CŨ (GIỮ NGUYÊN)
// =================================================================

// Type dùng cho Giỏ hàng
export interface CartItemType {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

// Type quản lý bộ lọc
export interface FilterState {
  brands: string[];
  minPrice?: number;
  maxPrice?: number;
  sort: string; // "price,asc" | "name,desc"
}

// =================================================================
// 2. CẬP NHẬT & THÊM MỚI CHO ADMIN DASHBOARD
// =================================================================

// Cập nhật ProductAPI để khớp chính xác với JSON trả về từ Spring Boot
// (Backend trả về "isOrganic" và "isFeatured", trong khi type cũ của bạn là "organic" và "featured")
export interface ProductAPI {
  id?: number; // Để optional (?) vì khi tạo mới chưa có ID
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  brand: string;
  origin: string;
  slug?: string; // Backend mới thêm slug

  // Map cả 2 trường hợp tên biến để tránh lỗi (Frontend cũ dùng organic, Backend trả về isOrganic)
  organic?: boolean;
  isOrganic?: boolean; // Khớp với DTO Java: private Boolean isOrganic;

  processingStatus: string;

  featured?: boolean;
  isFeatured?: boolean; // Khớp với DTO Java
}

// --- THÊM MỚI: User (Để hiển thị trong đơn hàng) ---
export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
}

// --- THÊM MỚI: Order (Để quản lý đơn hàng) ---
export interface Order {
  id: number;
  user: User; // Object User lồng bên trong
  totalMoney: number;
  status: "PENDING" | "CONFIRMED" | "SHIPPING" | "DELIVERED" | "CANCELLED";
  createdAt: string; // Spring Boot trả về chuỗi thời gian
}

// --- THÊM MỚI: Thống kê tiền (Cho tính năng check tổng tiền user) ---
export interface UserSpentStats {
  userId: number;
  totalSpent: number;
}
