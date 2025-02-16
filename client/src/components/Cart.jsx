"use client";

import { useEffect, useState } from "react";
import { useShop } from "../context/ShopContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus, Trash2 } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Link } from "react-router-dom";

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

  return (
    <section className="min-h-screen flex flex-col">
      <Navbar />

      <div className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

        {/* Loading State */}
        {isLoading ? (
          <div className="text-center py-8">
            <h2 className="text-xl font-semibold">Loading your cart...</h2>
          </div>
        ) : error ? (
          /* Error State */
          <div className="text-center py-8">
            <h2 className="text-xl font-semibold text-red-500">
              Error loading cart
            </h2>
            <p className="text-gray-600">{error}</p>
          </div>
        ) : !user ? (
          /* User Not Logged In */
          <div className="text-center py-8">
            <h2 className="text-xl font-semibold">
              Please login to view your cart
            </h2>
            <Link to="/auth">
              <Button className="mt-4 rounded-none ">Log In</Button>
            </Link>
          </div>
        ) : !cart || !cart.items || cart.items.length === 0 ? (
          /* Empty Cart */
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
          /* Cart Items */
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
                      <h2 className="font-semibold uppercase text-xs sm:text-base">
                        {item.product.name}
                      </h2>
                      <p className="text-sm text-gray-500 ">
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
                        updateCartItemQuantity(
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
                        updateCartItemQuantity(
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
                        updateCartItemQuantity(
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
                        removeFromCart(item.product._id, item.size)
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
                <Button variant="outline" onClick={clearCart}>
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
