"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Navbar from "./Navbar";
import Footer from "./Footer";

const CheckoutPage = () => {
  const {
    cart,
    user,
    createOrder,
    validateShippingInfo,
    orderStatus,
    addToast,
  } = useShop();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    } else if (!cart || !cart.items || cart.items.length === 0) {
      navigate("/cart");
    }
  }, [user, cart, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    const validationErrors = validateShippingInfo(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Create order
    const result = await createOrder(formData);

    if (result.success) {
      addToast("Order placed successfully!", "success");
      navigate("/order-confirmation", {
        state: { orderId: result.orderId },
      });
    } else {
      addToast(`Order failed: ${result.error || "Unknown error"}`, "error");
    }
  };

  if (!user || !cart || !cart.items || cart.items.length === 0) {
    return null;
  }

  return (
    <section className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-4">
              {cart.items.map((item) => (
                <div
                  key={`${item.product._id}-${item.size}`}
                  className="flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium">{item.product.name}</p>
                    <p className="text-sm text-gray-500">
                      Size: {item.size.toUpperCase()} | Quantity:{" "}
                      {item.quantity}
                    </p>
                  </div>
                  <p className="font-medium">
                    ₹{(item.product.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
            <Separator className="my-4" />
            <div className="flex justify-between items-center font-semibold">
              <p>Total</p>
              <p>₹{cart.total.toFixed(2)}</p>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Full Name
                </label>
                <Input
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                />
                {errors.fullName && (
                  <p className="text-sm text-red-500 mt-1">{errors.fullName}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <Input
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <p className="text-sm text-red-500 mt-1">{errors.email}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Address
                </label>
                <Input
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="123 Main St"
                />
                {errors.address && (
                  <p className="text-sm text-red-500 mt-1">{errors.address}</p>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">City</label>
                  <Input
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="New York"
                  />
                  {errors.city && (
                    <p className="text-sm text-red-500 mt-1">{errors.city}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    State
                  </label>
                  <Input
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    placeholder="NY"
                  />
                  {errors.state && (
                    <p className="text-sm text-red-500 mt-1">{errors.state}</p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    ZIP Code
                  </label>
                  <Input
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    placeholder="10001"
                  />
                  {errors.zipCode && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.zipCode}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Country
                  </label>
                  <Input
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    placeholder="United States"
                  />
                  {errors.country && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.country}
                    </p>
                  )}
                </div>
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={orderStatus.loading}
              >
                {orderStatus.loading ? "Processing..." : "Place Order"}
              </Button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default CheckoutPage;
