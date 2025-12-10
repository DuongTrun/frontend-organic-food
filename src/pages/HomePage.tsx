import Topbar from "../components/Topbar";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import BannerFooter from "../components/BannerFooter";
import ProductSlider from "../components/ProductSlider";
import MainProduct from "../components/MainProduct";
import ProductBanner from "../components/ProductBanner";
import KitchenProduct from "../components/KitchenProduct";
import OrganicFruit from "../components/OrganicFruit";
import AboutInfo from "../components/AboutInfo";
import Footer from "../components/Footer";

import {  useDispatch } from "react-redux";
import { addToCart } from "../redux/CartSlice";
import FloatingButtons from "../components/FloatingButton";

export default function HomePage() {
  const dispatch = useDispatch();
  // const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  // const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  // ✅ Hàm thêm sản phẩm vào giỏ
  const handleAddToCart = (product: any) => {
    dispatch(addToCart(product));
  };

  return (
    <div>
      <Topbar />
      <Header />
      <Navbar />
      <Banner />
      <BannerFooter />

      <ProductSlider handleAddToCart={handleAddToCart} />
      <MainProduct handleAddToCart={handleAddToCart} />
      <ProductBanner />
      <KitchenProduct handleAddToCart={handleAddToCart} />
      <OrganicFruit handleAddToCart={handleAddToCart} />

      <AboutInfo />
      <Footer />
      <FloatingButtons />
    </div>
  );
}
