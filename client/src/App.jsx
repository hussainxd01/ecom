import Homepage from "./pages/Homepage";
import { Route, Routes } from "react-router-dom";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";
import EditProductPage from "./components/EditProductPage";
import Dashboard from "./components/Dashboard";
import Shop from "./components/Shop";
import AuthPage from "./components/AuthPage";
import ProductDetail from "./components/ProductDetail";
import Cart from "./components/Cart";
import CheckoutPage from "./components/CheckoutPage";
import OrderConfirmation from "./components/OrderConfirmation";
import MyAccount from "./components/MyAccount";
import CategoryPage from "./components/CategoryPage";
import OurStory from "./components/OurStory";
import TermsAndConditions from "./components/TermsAndCondition";
import PrivacyPolicy from "./components/PrivacyPolicy";
import NewsletterPopup from "./components/NewsletterPopup";
import ContactUs from "./components/ContactUs";
const App = () => {
  return (
    <div className="font-sans overflow-x-hidden">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/add-products" element={<ProductForm />} />
        <Route path="/edit-product/:id" element={<EditProductPage />} />
        <Route path="/all-products" element={<ProductList />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="/account" element={<MyAccount />} />
        <Route path="/our-story" element={<OurStory />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/contact-us" element={<ContactUs />} />
      </Routes>
      <NewsletterPopup />
    </div>
  );
};

export default App;
