import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import CartPage from "./pages/CartPage";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import Toast from "./propsComponent/Toast";
import SearchPage from "./components/SearchPage";
import FilterPage from "./pages/FilterPage";
import AdminLayout from "./components/AdminLayout";
import AdminProduct from "./pages/AdminProduct";
import AdminOrder from "./pages/AdminOrder";
import CheckoutPage from "./pages/CheckoutPage";
function App() {
  const {
    cartItems: cartItems,
    totalCount,
    totalPrice,
  } = useSelector((state: RootState) => state.cart);

  return (
    <div className="bg-gray-50 min-h-screen">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                cartItems={cartItems}
                cartCount={totalCount}
                // ✅ Các hàm này giờ không cần truyền nữa (redux lo)
                handleAddToCart={() => {}}
                handleIncrease={() => {}}
                handleDecrease={() => {}}
                handleRemove={() => {}}
              />
            }
          />

          <Route
            path="/cart"
            element={
              <CartPage
                totalPrice={totalPrice}
                cartItems={cartItems}
                // ✅ Không cần truyền các hàm này nữa (sẽ dùng dispatch trong component)
                handleIncrease={() => {}}
                handleDecrease={() => {}}
                handleRemove={() => {}}
              />
            }
          />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/search"
            element={<SearchPage handleAddToCart={() => {}} />}
          />
          <Route path="/filterpage" element={<FilterPage />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="products" replace />} />

            <Route path="products" element={<AdminProduct />} />

            {/* Route Order chính thức */}
            <Route path="orders" element={<AdminOrder />} />
          </Route>
        </Routes>
      </BrowserRouter>

      <Toast />
    </div>
  );
}

export default App;
