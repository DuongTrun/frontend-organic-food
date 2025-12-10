import React, { useEffect, useState } from "react";
import {
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
} from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import API & Types
import {
  getAllOrders,
  updateOrderStatus,
  getUserTotalSpent,
} from "../ultils/api"; // Đảm bảo đường dẫn đúng
import { Order, UserSpentStats } from "../ultils/type";

const AdminOrder = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  // State cho Modal xem chi tiêu
  const [statsModalOpen, setStatsModalOpen] = useState(false);
  const [currentStats, setCurrentStats] = useState<{
    username: string;
    total: number;
  } | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await getAllOrders();
      setOrders(data);
    } catch (error) {
      toast.error("Không thể tải danh sách đơn hàng!");
    } finally {
      setLoading(false);
    }
  };

  // Hàm cập nhật trạng thái
  const handleStatusChange = async (orderId: number, newStatus: string) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      toast.success(`Đơn #${orderId} đã chuyển sang: ${newStatus}`);
      fetchOrders(); // Load lại danh sách để cập nhật giao diện
    } catch (error) {
      toast.error("Cập nhật trạng thái thất bại!");
    }
  };

  // Hàm xem tổng tiền user đã mua
  const handleCheckUserSpent = async (userId: number, username: string) => {
    try {
      const data: UserSpentStats = await getUserTotalSpent(userId);
      setCurrentStats({ username, total: data.totalSpent });
      setStatsModalOpen(true);
    } catch (error) {
      toast.error("Lỗi khi lấy thông tin chi tiêu!");
    }
  };

  // Helper: Chọn màu cho Badge trạng thái
  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "CONFIRMED":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "SHIPPING":
        return "bg-indigo-100 text-indigo-800 border-indigo-200";
      case "DELIVERED":
        return "bg-green-100 text-green-800 border-green-200"; // Màu xanh lá organic
      case "CANCELLED":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Helper: Format tiền tệ
  const formatMoney = (amount: number) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <ToastContainer autoClose={2000} />

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Quản lý Đơn hàng</h2>
          <p className="text-gray-500 text-sm">Theo dõi và xử lý đơn hàng</p>
        </div>
        {/* Có thể thêm bộ lọc status ở đây nếu muốn */}
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wider">
              <th className="p-4 rounded-tl-lg">ID</th>
              <th className="p-4">Ngày đặt</th>
              <th className="p-4">Khách hàng</th>
              <th className="p-4">Tổng tiền</th>
              <th className="p-4">Trạng thái hiện tại</th>
              <th className="p-4">Cập nhật trạng thái</th>
              <th className="p-4 rounded-tr-lg text-center">Thống kê</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan={7} className="text-center p-6 text-gray-500">
                  Đang tải dữ liệu...
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-green-50/30 transition-colors"
                >
                  <td className="p-4 font-bold text-gray-700">#{order.id}</td>
                  <td className="p-4 text-sm text-gray-600">
                    {new Date(order.createdAt).toLocaleDateString("vi-VN")}{" "}
                    <br />
                    <span className="text-xs text-gray-400">
                      {new Date(order.createdAt).toLocaleTimeString("vi-VN")}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="font-medium text-gray-800">
                      {order.user?.username || "Guest"}
                    </div>
                    <div className="text-xs text-gray-500">
                      {order.user?.email}
                    </div>
                  </td>
                  <td className="p-4 font-bold text-primary">
                    {formatMoney(order.totalMoney)}
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                        order.status
                      )} flex w-fit items-center gap-1`}
                    >
                      {order.status === "DELIVERED" && (
                        <CheckCircle size={12} />
                      )}
                      {order.status === "SHIPPING" && <Truck size={12} />}
                      {order.status === "PENDING" && <Clock size={12} />}
                      {order.status === "CANCELLED" && <XCircle size={12} />}
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <select
                      className="border border-gray-300 rounded-lg p-1.5 text-sm focus:ring-2 focus:ring-primary outline-none bg-white cursor-pointer hover:border-primary transition-colors"
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order.id, e.target.value)
                      }
                      disabled={order.status === "CANCELLED"} // Không cho sửa nếu đã hủy
                    >
                      <option value="PENDING">Chờ xử lý</option>
                      <option value="CONFIRMED">Đã xác nhận</option>
                      <option value="SHIPPING">Đang giao</option>
                      <option value="DELIVERED">Đã giao</option>
                      <option value="CANCELLED">Hủy đơn</option>
                    </select>
                  </td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() =>
                        handleCheckUserSpent(order.user.id, order.user.username)
                      }
                      className="text-gray-500 hover:text-primary p-2 rounded-full hover:bg-green-50 transition-all tooltip"
                      title="Xem tổng chi tiêu của khách này"
                    >
                      <DollarSign size={20} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL XEM CHI TIÊU USER */}
      {statsModalOpen && currentStats && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl p-6 relative">
            <button
              onClick={() => setStatsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500"
            >
              <XCircle size={24} />
            </button>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-1">
                Thống kê chi tiêu
              </h3>
              <p className="text-gray-500 mb-6">
                Khách hàng:{" "}
                <span className="font-semibold text-gray-700">
                  {currentStats.username}
                </span>
              </p>

              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <p className="text-sm text-gray-500 mb-1">
                  Tổng số tiền đã mua thành công
                </p>
                <p className="text-3xl font-bold text-primary">
                  {formatMoney(currentStats.total)}
                </p>
                <p className="text-xs text-gray-400 mt-2 italic">
                  (Chỉ tính các đơn hàng đã giao thành công)
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <button
                onClick={() => setStatsModalOpen(false)}
                className="bg-primary hover:bg-primary-hover text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrder;
