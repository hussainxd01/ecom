import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import ProductForm from "./ProductForm";
import ProductList from "./ProductList";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import OrderList from "./OrderManagement";
import {
  Package,
  Users,
  ShoppingCart,
  PlusCircle,
  Menu,
  Search,
  X,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import UserList from "./UserList";

const AdminDashboard = () => {
  const { user, loading } = useShop(); // Using 'user' from context
  const navigate = useNavigate();

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("add Product");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Redirect non-admin users
  useEffect(() => {
    if (!loading && (!user || user.role !== "admin")) {
      navigate("/"); // Redirect to home if not admin
    }
  }, [user, loading, navigate]);

  // Handle screen resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsSidebarOpen(window.innerWidth >= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = [
    { id: "add Product", label: "Add Product", icon: PlusCircle },
    { id: "all Products", label: "All Products", icon: Package },
    { id: "users", label: "Users", icon: Users },
    { id: "orders", label: "Orders", icon: ShoppingCart },
  ];

  const handleTabChange = (id) => {
    setActiveTab(id);
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>; // Prevent rendering until user is loaded
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Overlay for mobile */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-20"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-full bg-white border-r border-gray-100 transition-all duration-300 ease-in-out z-30",
          isSidebarOpen ? "w-64" : "w-16",
          isMobile &&
            (isSidebarOpen ? "w-64 translate-x-0" : "-translate-x-full")
        )}
      >
        <div className="h-16 border-b border-gray-100 flex items-center justify-between px-4">
          {(isSidebarOpen || !isMobile) && (
            <span className="text-lg font-light tracking-wide text-gray-900">
              ADMIN
            </span>
          )}
          {isMobile && isSidebarOpen && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(false)}
              className="md:hidden"
            >
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>
        <nav className="w-full">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={cn(
                "w-full flex items-center text-left py-6 px-3 text-sm font-light transition-colors",
                "hover:bg-gray-50 hover:text-gray-900",
                activeTab === item.id
                  ? "bg-gray-50 text-gray-900"
                  : "text-gray-600",
                !isSidebarOpen && !isMobile && "justify-center px-4"
              )}
              onClick={() => handleTabChange(item.id)}
            >
              <item.icon className="h-5 w-5 min-w-[20px]" />
              {(isSidebarOpen || isMobile) && (
                <span className="ml-3">{item.label}</span>
              )}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main
        className={cn(
          "min-h-screen flex flex-col min-w-0 transition-all duration-300",
          isSidebarOpen ? "md:ml-64" : "md:ml-16",
          isMobile && "ml-0"
        )}
      >
        {/* Header */}
        <header className="h-16 flex items-center justify-between px-4 bg-white border-b border-gray-100 sticky top-0 z-10">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="hover:bg-gray-50"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search"
                className="w-40 md:w-64 pl-9 py-5 border-0 bg-gray-50 focus:ring-0 text-sm placeholder:text-gray-400"
              />
            </div>
          </div>
        </header>

        {/* Content Area */}
        <ScrollArea className="flex-1">
          <div className="p-4 md:p-6 h-full">
            {activeTab === "add Product" && <ProductForm />}
            {activeTab === "all Products" && <ProductList />}
            {activeTab === "users" && <UserList />}
            {activeTab === "orders" && <OrderList />}
          </div>
        </ScrollArea>
      </main>
    </div>
  );
};

export default AdminDashboard;
