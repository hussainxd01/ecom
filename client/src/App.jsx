import React from "react";
import Homepage from "./pages/Homepage";
import { Route, Routes } from "react-router-dom";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";
import EditProductPage from "./components/EditProductPage";
import Dashboard from "./components/Dashboard";
import Shop from "./components/Shop";
import AuthPage from "./components/AuthPage";
import { Toaster } from "@/components/ui/toaster";
import ProductDetail from "./components/ProductDetail";
import Cart from "./components/Cart";
import CheckoutPage from "./components/CheckoutPage";
import OrderConfirmation from "./components/OrderConfirmation";
import MyAccount from "./components/MyAccount";
import CategoryPage from "./components/CategoryPage";
import OurStory from "./components/OurStory";
const App = () => {
  return (
    <section className="font-sans">
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
      </Routes>
      <Toaster />
    </section>
  );
};

export default App;
