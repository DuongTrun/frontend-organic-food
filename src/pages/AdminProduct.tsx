import React, { useEffect, useState } from "react";
import { Plus, Edit, Trash2, Search, X } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import API và Types
import {
  getAllProductsAdmin,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../ultils/api"; // Sửa lại đường dẫn import api cho đúng file bạn vừa tạo
import { ProductAPI } from "../ultils/type";// Sửa lại đường dẫn import type

const AdminProduct = () => {
  const [products, setProducts] = useState<ProductAPI[]>([]);
  const [loading, setLoading] = useState(false);

  // State cho Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // State cho Form
  const initialFormState: ProductAPI = {
    name: "",
    price: 0,
    image: "",
    description: "",
    category: "Vegetable",
    brand: "",
    origin: "vietnam",
    isOrganic: false,
    processingStatus: "fresh",
    isFeatured: false,
    slug: "",
  };
  const [formData, setFormData] = useState<ProductAPI>(initialFormState);

  // 1. Load danh sách sản phẩm
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await getAllProductsAdmin();
      // Sắp xếp ID giảm dần để thấy cái mới tạo
      setProducts(data.sort((a, b) => (b.id || 0) - (a.id || 0)));
    } catch (error) {
      toast.error("Lỗi tải danh sách sản phẩm!");
    } finally {
      setLoading(false);
    }
  };

  // 2. Xử lý Input Form
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    // Xử lý riêng cho checkbox
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // 3. Submit Form (Thêm hoặc Sửa)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing && formData.id) {
        await updateProduct(formData.id, formData);
        toast.success("Cập nhật thành công!");
      } else {
        await createProduct(formData);
        toast.success("Thêm mới thành công!");
      }
      closeModal();
      fetchProducts();
    } catch (error) {
      toast.error("Có lỗi xảy ra!");
      console.error(error);
    }
  };

  // 4. Xóa sản phẩm
  const handleDelete = async (id: number) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      try {
        await deleteProduct(id);
        toast.success("Đã xóa sản phẩm!");
        setProducts(products.filter((p) => p.id !== id));
      } catch (error) {
        toast.error("Xóa thất bại!");
      }
    }
  };

  // Helper: Mở/Đóng Modal
  const openAddModal = () => {
    setFormData(initialFormState);
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const openEditModal = (product: ProductAPI) => {
    setFormData(product);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <ToastContainer autoClose={2000} />

      {/* HEADER: Tiêu đề + Nút thêm */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Sản phẩm</h2>
          <p className="text-gray-500 text-sm">
            Quản lý kho hàng hữu cơ của bạn
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg transition-all shadow-md hover:shadow-lg"
        >
          <Plus size={20} /> Thêm sản phẩm
        </button>
      </div>

      {/* TABLE: Danh sách */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wider">
              <th className="p-4 rounded-tl-lg">Hình ảnh</th>
              <th className="p-4">Tên sản phẩm</th>
              <th className="p-4">Giá</th>
              <th className="p-4">Danh mục</th>
              <th className="p-4">Trạng thái</th>
              <th className="p-4 rounded-tr-lg text-center">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan={6} className="text-center p-4">
                  Đang tải...
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr
                  key={product.id}
                  className="hover:bg-green-50/30 transition-colors"
                >
                  <td className="p-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded-md border"
                    />
                  </td>
                  <td className="p-4 font-medium text-gray-800">
                    {product.name}
                  </td>
                  <td className="p-4 text-primary font-bold">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(product.price)}
                  </td>
                  <td className="p-4">
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                      {product.category}
                    </span>
                  </td>
                  <td className="p-4">
                    {product.isOrganic ? (
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold">
                        Organic
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-gray-100 text-gray-500 rounded text-xs">
                        Thường
                      </span>
                    )}
                  </td>
                  <td className="p-4 flex justify-center gap-3">
                    <button
                      onClick={() => openEditModal(product)}
                      className="text-blue-500 hover:text-blue-700 p-2 hover:bg-blue-50 rounded-full transition-all"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id!)}
                      className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-full transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL: Form Thêm/Sửa */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-800">
                {isEditing ? "Cập nhật sản phẩm" : "Thêm sản phẩm mới"}
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Body (Form) */}
            <form
              onSubmit={handleSubmit}
              className="p-6 grid grid-cols-2 gap-4"
            >
              {/* Cột 1 */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tên sản phẩm
                </label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Giá (VNĐ)
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-primary outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Danh mục
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-primary outline-none"
                >
                  <option value="Vegetable">Rau củ</option>
                  <option value="Fruit">Trái cây</option>
                  <option value="Dry">Đồ khô</option>
                </select>
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Link Ảnh (URL)
                </label>
                <input
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  placeholder="https://..."
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-primary outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Thương hiệu
                </label>
                <input
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-primary outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Xuất xứ
                </label>
                <select
                  name="origin"
                  value={formData.origin}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-primary outline-none"
                >
                  <option value="vietnam">Việt Nam</option>
                  <option value="import">Nhập khẩu</option>
                </select>
              </div>

              {/* Checkbox */}
              <div className="col-span-2 flex gap-6 mt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isOrganic"
                    checked={formData.isOrganic}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-primary rounded focus:ring-primary"
                  />
                  <span className="text-gray-700">
                    Sản phẩm hữu cơ (Organic)
                  </span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isFeatured"
                    checked={formData.isFeatured}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-primary rounded focus:ring-primary"
                  />
                  <span className="text-gray-700">Nổi bật (Featured)</span>
                </label>
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mô tả chi tiết
                </label>
                <textarea
                  name="description"
                  rows={3}
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-primary outline-none"
                ></textarea>
              </div>

              {/* Footer Buttons */}
              <div className="col-span-2 flex justify-end gap-3 mt-4 pt-4 border-t">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-primary hover:bg-primary-hover text-white font-medium rounded-lg shadow-md transition-all"
                >
                  {isEditing ? "Lưu cập nhật" : "Thêm sản phẩm"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProduct;
