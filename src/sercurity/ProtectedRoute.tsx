// src/components/ProtectedRoute.tsx

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from "../ultils/auth"; 

interface ProtectedRouteProps {
  redirectPath?: string; // Đường dẫn sẽ chuyển hướng nếu chưa đăng nhập, mặc định là /login
  children?: React.ReactNode; // Component con sẽ được render nếu đã đăng nhập
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ redirectPath = '/login', children }) => {
  if (!isAuthenticated()) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;