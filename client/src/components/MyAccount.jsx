import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Package, Settings, LogOut } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
const MyAccount = () => {
  const [activeSection, setActiveSection] = useState("orders");
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const { logout, addToast } = useShop();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleLogout = async () => {
    await logout();
    addToast("You have been logged out.", "success");
    navigate("/auth");
  };

  const navItems = [
    { id: "orders", icon: Package, label: "Orders" },
    { id: "settings", icon: Settings, label: "Account Settings" },
    { id: "logout", icon: LogOut, label: "Sign Out", action: handleLogout },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-normal mb-8">My Account</h1>

      <div
        className={`${isMobile ? "flex flex-col" : "grid grid-cols-4 gap-8"}`}
      >
        {/* Navigation */}
        <nav className={`${isMobile ? "mb-8" : "col-span-1"}`}>
          <div className={`${isMobile ? "flex justify-between" : "space-y-4"}`}>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() =>
                  item.action ? item.action() : setActiveSection(item.id)
                }
                className={`
                  ${isMobile ? "flex-1 py-2" : "w-full text-left px-4 py-3"}
                  text-sm flex items-center justify-center md:justify-start gap-3 
                  hover:bg-gray-50 transition-colors
                  ${activeSection === item.id ? "bg-gray-50" : ""}
                  ${item.id === "logout" ? "text-gray-600" : ""}
                `}
              >
                <item.icon size={18} />
                <span className={`${isMobile ? "hidden" : ""}`}>
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </nav>

        {/* Main Content */}
        <div className={`${isMobile ? "" : "col-span-3"}`}>
          {activeSection === "orders" && <OrdersSection />}
          {activeSection === "settings" && <SettingsSection />}
        </div>
      </div>
    </section>
  );
};

const OrdersSection = () => {
  const { orders, user, loading, error } = useShop();
  console.log(orders);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Loading...</h1>
      </div>
    );
  }

  // Redirect to login if authentication is checked and user is null
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // Handle errors
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Error loading orders</h1>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-normal mb-6">Order History</h2>

      {orders.length === 0 ? (
        <p className="text-gray-500 text-sm">
          You haven't placed any orders yet.
        </p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border p-6 space-y-4 hover:border-gray-400 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium">Order ID: {order._id}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <span className="text-sm capitalize">{order.status}</span>
              </div>

              <div className="text-sm">
                <p>
                  {order.items.reduce((acc, item) => acc + item.quantity, 0)}{" "}
                  items
                </p>
                <p className="text-gray-500">
                  Total: ${order.total.toFixed(2)}
                </p>
              </div>

              <div className="pt-4 border-t flex justify-between items-center">
                <button className="text-xs h-8 border px-3 py-1 rounded">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const SettingsSection = () => {
  const { user, editUser } = useShop();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [status, setStatus] = useState({
    loading: false,
    error: null,
    success: false,
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  // Initialize form with user data when component mounts
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setStatus({ loading: false, error: null, success: false });
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: null, success: false });

    try {
      // Separate password update from profile update
      if (
        formData.newPassword ||
        formData.currentPassword ||
        formData.confirmPassword
      ) {
        // Password change validation
        if (!formData.currentPassword) {
          throw new Error("Current password is required to change password");
        }
        if (formData.newPassword !== formData.confirmPassword) {
          throw new Error("New passwords don't match");
        }
        if (formData.newPassword.length < 6) {
          throw new Error("New password must be at least 6 characters long");
        }

        // First, update password
        const passwordResult = await editUser(user._id, {
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
          updateType: "password",
        });

        if (!passwordResult.success) {
          throw new Error(passwordResult.error || "Failed to update password");
        }

        // Clear password fields after successful update
        setFormData((prev) => ({
          ...prev,
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        }));
      }

      // Then, update profile information if changed
      const profileChanged =
        formData.firstName !== user.firstName ||
        formData.lastName !== user.lastName ||
        formData.email !== user.email;

      if (profileChanged) {
        const profileResult = await editUser(user._id, {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          updateType: "profile",
        });

        if (!profileResult.success) {
          throw new Error(profileResult.error || "Failed to update profile");
        }
      }

      setStatus({ loading: false, error: null, success: true });

      // Clear success message after 3 seconds
      setTimeout(() => {
        setStatus((prev) => ({ ...prev, success: false }));
      }, 3000);
    } catch (err) {
      setStatus({ loading: false, error: err.message, success: false });
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 className="text-xl font-normal mb-6">Account Settings</h2>

      <form onSubmit={handleSubmit} className="space-y-8 max-w-xl">
        {status.error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded text-sm">
            {status.error}
          </div>
        )}

        {status.success && (
          <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded text-sm">
            Your changes have been saved successfully.
          </div>
        )}

        {/* Personal Information section remains the same */}
        <div className="space-y-6">
          <h3 className="text-sm font-medium">Personal Information</h3>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-xs">
                First name
              </Label>
              <Input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-xs">
                Last name
              </Label>
              <Input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="h-12"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-xs">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="h-12"
            />
          </div>
        </div>

        {/* Updated Password section */}
        <div className="space-y-6">
          <h3 className="text-sm font-medium">Change Password</h3>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword" className="text-xs">
                Current password
              </Label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  name="currentPassword"
                  type={showPasswords.current ? "text" : "password"}
                  value={formData.currentPassword}
                  onChange={handleChange}
                  className="h-12 pr-10"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("current")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPasswords.current ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword" className="text-xs">
                New password
              </Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  name="newPassword"
                  type={showPasswords.new ? "text" : "password"}
                  value={formData.newPassword}
                  onChange={handleChange}
                  className="h-12 pr-10"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("new")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPasswords.new ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-xs">
                Confirm new password
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPasswords.confirm ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="h-12 pr-10"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("confirm")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPasswords.confirm ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full h-12 bg-black hover:bg-gray-800"
          disabled={status.loading}
        >
          {status.loading ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </div>
  );
};

export default MyAccount;
