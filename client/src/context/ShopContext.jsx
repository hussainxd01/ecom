import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import ToastContainer from "../components/ToastContainer";

const ShopContext = createContext(null);

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useShop must be used within a ShopProvider");
  }
  return context;
};

export const ShopProvider = ({ children }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [isInitialized, setIsInitialized] = useState(false);
  const [orderStatus, setOrderStatus] = useState({
    loading: false,
    error: null,
  });
  const [users, setUsers] = useState([]);
  const [toasts, setToasts] = useState([]);
  const [messages, setMessages] = useState([]);

  const addToast = (message) => {
    const newToast = { id: Date.now().toString(), message };
    setToasts((prevToasts) => [...prevToasts, newToast]);
  };

  const removeToast = (id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  const baseUrl = "https://ecom-1-9xsu.onrender.com/api";

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    };
  };

  const handleApiResponse = async (response, errorMessage) => {
    if (!response.ok) {
      const errorData = await response.json();
      const error = new Error(errorData.message || errorMessage);
      error.status = response.status;
      throw error;
    }
    return response.json();
  };

  const postUserMessage = async (message) => {
    try {
      const response = await fetch(`${baseUrl}/message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(message),
      });
      const data = await handleApiResponse(response, "Failed to send message");
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const fetchUserMessage = async () => {
    try {
      const response = await fetch(`${baseUrl}/message`);
      const data = await handleApiResponse(response, "Failed to fetch message");
      setMessages(data.data);
    } catch (err) {
      setError(err.message);
    }
  };

  const postNewsletter = async (email) => {
    try {
      const response = await fetch(`${baseUrl}/newsletter`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await handleApiResponse(response, "Failed to subscribe");
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${baseUrl}/products`);
      const data = await handleApiResponse(
        response,
        "Failed to fetch products"
      );
      setProducts(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (productData) => {
    try {
      setLoading(true);
      const response = await fetch(`${baseUrl}/products`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(productData),
      });
      const data = await handleApiResponse(response, "Failed to add product");
      setProducts([...products, data.data]);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const editProduct = async (productId, updatedProduct) => {
    try {
      const response = await fetch(`${baseUrl}/products/${productId}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(updatedProduct),
      });
      const data = await handleApiResponse(
        response,
        "Failed to update product"
      );
      setProducts((prev) => prev.map((p) => (p._id === productId ? data : p)));
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const deleteProduct = async (productId) => {
    try {
      const response = await fetch(`${baseUrl}/products/${productId}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      await handleApiResponse(response, "Failed to delete product");
      setProducts((prev) => prev.filter((p) => p._id !== productId));
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  // Categories
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${baseUrl}/categories`);
      const data = await handleApiResponse(
        response,
        "Failed to fetch categories"
      );
      setCategories(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addCategory = async (categoryData) => {
    try {
      const response = await fetch(`${baseUrl}/categories`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          name:
            typeof categoryData === "string" ? categoryData : categoryData.name,
        }),
      });
      const data = await handleApiResponse(response, "Failed to add category");
      setCategories([...categories, data.data]);
      return { success: true, category: data.data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const deleteCategory = async (categoryId) => {
    try {
      const response = await fetch(`${baseUrl}/categories/${categoryId}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      await handleApiResponse(response, "Failed to delete category");
      setCategories((prev) => prev.filter((cat) => cat._id !== categoryId));
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  // Auth
  const register = async (userData) => {
    try {
      if (!userData) throw new Error("No user data provided");
      const response = await fetch(`${baseUrl}/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      const data = await handleApiResponse(response, "Registration failed");
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
      setUser(data.user);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const login = async (credentials) => {
    try {
      const response = await fetch(`${baseUrl}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      const data = await handleApiResponse(response, "Login failed");
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
      setUser(data.user);
      await fetchCart();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${baseUrl}/users`, {
          headers: getAuthHeaders(),
        });
        const data = await handleApiResponse(response, "Failed to fetch users");
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    };

    if (user?.role === "admin") {
      fetchUsers();
    }
  }, [user]);

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setCart({ items: [], total: 0 });
    navigate("/");
  };

  // Cart
  const fetchCart = useCallback(async () => {
    if (!user || !user._id || user.role !== "user") return;
    try {
      const response = await fetch(`${baseUrl}/cart/${user._id}`, {
        headers: getAuthHeaders(),
      });
      const data = await handleApiResponse(response, "Failed to fetch cart");
      setCart(data);
    } catch (err) {
      if (err.status === 404) {
        setCart({ items: [], total: 0 });
      } else {
        setError(err.message);
      }
    }
  }, [user]);

  const cartOperation = async (endpoint, payload) => {
    if (!user) return { success: false, error: "Please login to continue" };
    try {
      const response = await fetch(`${baseUrl}/cart/${endpoint}`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ ...payload, userId: user._id }),
      });
      const data = await handleApiResponse(
        response,
        `Failed to ${endpoint} cart item`
      );
      setCart(data);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const addToCart = (productId, selectedSize, quantity = 1) => {
    if (!user) {
      navigate("/auth");
      return { success: false, error: "Please login to add items to cart" };
    }
    return cartOperation("add", { productId, size: selectedSize, quantity });
  };

  const removeFromCart = (productId, selectedSize) =>
    cartOperation("remove", { productId, size: selectedSize });

  const updateCartItemQuantity = (productId, quantity, selectedSize) =>
    cartOperation("update-quantity", {
      productId,
      size: selectedSize,
      quantity,
    });

  const clearCart = () => cartOperation("clear", {});

  // Orders
  const validateShippingInfo = (values) => {
    const errors = {};
    const validations = {
      fullName: { min: 2, message: "Full name is required" },
      email: {
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Invalid email address",
      },
      address: { min: 5, message: "Address is required" },
      city: { min: 2, message: "City is required" },
      state: { min: 2, message: "State is required" },
      zipCode: { min: 5, message: "Valid ZIP code is required" },
      country: { min: 2, message: "Country is required" },
    };

    Object.entries(validations).forEach(([field, rules]) => {
      const value = values[field];
      if (
        !value ||
        (rules.min && value.length < rules.min) ||
        (rules.pattern && !rules.pattern.test(value))
      ) {
        errors[field] = rules.message;
      }
    });

    return errors;
  };

  const createOrder = async (shippingInfo) => {
    setOrderStatus({ loading: true, error: null });
    try {
      const response = await fetch(`${baseUrl}/orders`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          ...shippingInfo,
          items: cart.items,
          total: cart.total,
          user: user._id,
        }),
      });
      const data = await handleApiResponse(response, "Failed to create order");
      await clearCart();
      await fetchOrders();
      setOrderStatus({ loading: false, error: null });
      return { success: true, orderId: data.orderId };
    } catch (err) {
      setOrderStatus({ loading: false, error: err.message });
      return { success: false, error: err.message };
    }
  };

  const fetchOrders = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const response = await fetch(`${baseUrl}/orders/user`, {
        headers: getAuthHeaders(),
      });
      const data = await handleApiResponse(response, "Failed to fetch orders");
      setOrders(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user, fetchOrders]);

  const fetchAllOrders = async () => {
    if (!user) return { success: false, error: "User not authenticated" };

    try {
      setLoading(true);
      const response = await fetch(`${baseUrl}/orders`, {
        headers: getAuthHeaders(),
      });
      const data = await handleApiResponse(response, "Failed to fetch orders");

      setOrders(data);
      return { success: true, orders: data };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(`${baseUrl}/orders/${orderId}/status`, {
        method: "PATCH",
        headers: getAuthHeaders(),
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await handleApiResponse(
        response,
        "Failed to update order status"
      );

      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  // User management
  const editUser = async (userId, userData) => {
    try {
      const response = await fetch(`${baseUrl}/users/${userId}`, {
        method: "PATCH",
        headers: getAuthHeaders(),
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update user data");
      }

      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  // Initialize session and data
  useEffect(() => {
    const initializeSession = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser && localStorage.getItem("token")) {
          setUser(JSON.parse(storedUser));
        }
      } catch (err) {
        console.error("Error initializing session:", err);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      } finally {
        setIsInitialized(true);
        setLoading(false);
      }
    };
    initializeSession();
  }, []);

  useEffect(() => {
    fetchUserMessage();
  });

  useEffect(() => {
    if (user && user._id) {
      fetchCart();
    }
  }, [user, fetchCart]);

  useEffect(() => {
    Promise.all([fetchProducts(), fetchCategories()]);
  }, []);

  const contextValue = {
    products,
    loading,
    error,
    user,
    cart,
    categories,
    orders,
    orderStatus,
    users,
    addProduct,
    deleteProduct,
    editProduct,
    register,
    login,
    logout,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    clearCart,
    fetchCart,
    fetchOrders,
    addCategory,
    deleteCategory,
    createOrder,
    validateShippingInfo,
    editUser,
    fetchAllOrders,
    updateOrderStatus,
    addToast,
    removeToast,
    postNewsletter,
    postUserMessage,
    fetchUserMessage,
    messages,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ShopContext.Provider>
  );
};

export { ShopContext };
