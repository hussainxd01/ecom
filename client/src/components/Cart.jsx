"use client";

import { useEffect, useState } from "react";
import { useShop } from "../context/ShopContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus, Trash2 } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Link, Navigate } from "react-router-dom";

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    updateCartItemQuantity,
    clearCart,
    fetchCart,
    user,
  } = useShop();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadCart() {
      try {
        setIsLoading(true);
        if (user) {
          await fetchCart();
        }
      } catch (err) {
        setError(err.message);
        console.error("Error fetching cart:", err);
      } finally {
        setIsLoading(false);
      }
    }

    loadCart();
  }, [user, fetchCart]);

  if (isLoading || user === undefined) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Loading...</h1>
      </div>
    );
  }

  // Redirect to login only if authentication check is completed and user is still null
  if (!isLoading && !user) {
    return <Navigate to="/auth" replace />;
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Loading cart...</h1>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Error loading cart</h1>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  // Ensure cart and cart.items exist
  if (!cart || !cart.items) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Cart unavailable</h1>
        <p>There was a problem loading your cart. Please try again later.</p>
      </div>
    );
  }

  const handleQuantityChange = async (productId, newQuantity, size) => {
    try {
      if (newQuantity < 1) return;
      if (newQuantity > 99) return; // Add maximum quantity limit
      await updateCartItemQuantity(productId, newQuantity, size);
    } catch (err) {
      console.error("Error updating quantity:", err);
      // Optionally show an error message to the user
    }
  };

  const handleRemoveItem = async (productId, size) => {
    try {
      await removeFromCart(productId, size);
    } catch (err) {
      console.error("Error removing item:", err);
      // Optionally show an error message to the user
    }
  };

  const handleClearCart = async () => {
    try {
      await clearCart();
    } catch (err) {
      console.error("Error clearing cart:", err);
      // Optionally show an error message to the user
    }
  };

  return (
    <section className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
        {cart.items.length === 0 ? (
          <div className="text-center py-8">
            <p className="mb-4">Your cart is empty.</p>
            <Link
              to="/shop"
              className="text-blue-500 hover:underline text-sm inline-block px-4 py-2 border rounded"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {cart.items.map((item) => (
                <div
                  key={`${item.product._id}-${item.size}`}
                  className="flex items-center justify-between border-b pb-4"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.product.images?.[0] || "/placeholder.svg"}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded"
                      onError={(e) => {
                        e.target.src = "/placeholder.svg";
                      }}
                    />
                    <div>
                      <h2 className="font-semibold uppercase">
                        {item.product.name}
                      </h2>
                      <p className="text-sm text-gray-500">
                        ₹{(item.product.price || 0).toFixed(2)}
                      </p>
                      {item.size && (
                        <p className="text-sm font-medium text-gray-700">
                          Size: {item.size.toUpperCase()}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        handleQuantityChange(
                          item.product._id,
                          item.quantity - 1,
                          item.size
                        )
                      }
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Input
                      type="number"
                      min="1"
                      max="99"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(
                          item.product._id,
                          Number(e.target.value),
                          item.size
                        )
                      }
                      className="w-16 text-center"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        handleQuantityChange(
                          item.product._id,
                          item.quantity + 1,
                          item.size
                        )
                      }
                      disabled={item.quantity >= 99}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() =>
                        handleRemoveItem(item.product._id, item.size)
                      }
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-between items-center">
              <p className="text-xl font-semibold">
                Total: ₹{(cart.total || 0).toFixed(2)}
              </p>
              <div className="space-x-2">
                <Button variant="outline" onClick={handleClearCart}>
                  Clear Cart
                </Button>
                <Link to="/checkout">
                  <Button>Checkout</Button>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </section>
  );
}
