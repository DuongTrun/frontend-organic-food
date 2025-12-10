// src/utils/auth.ts

export const setAuthToken = (token: string) => {
  localStorage.setItem("authToken", token);
};

export const getAuthToken = (): string | null => {
  return localStorage.getItem("authToken");
};

export const removeAuthToken = () => {
  localStorage.removeItem("authToken");
};

export const isAuthenticated = (): boolean => {
  const token = getAuthToken();
  // Trong ứng dụng thực tế, bạn sẽ muốn xác thực token kỹ hơn (ví dụ: kiểm tra JWT hết hạn)
  return !!token; // Trả về true nếu có token, false nếu không
};
