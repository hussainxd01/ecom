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
import MessageList from "./MessageList";

const AdminDashboard = () => {
  const { user, loading } = useShop();
  const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("add Product");

  useEffect(() => {
    if (!loading && (!user || user.role !== "admin")) {
      navigate("/");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    const handleResize = () => {
      const mobileView = window.innerWidth < 768;
      setIsMobile(mobileView);

      if (mobileView) {
        setIsSidebarOpen(false);
        setIsCollapsed(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = [
    { id: "add Product", label: "Add Product", icon: PlusCircle },
    { id: "all Products", label: "All Products", icon: Package },
    { id: "users", label: "Users", icon: Users },
    { id: "orders", label: "Orders", icon: ShoppingCart },
    { id: "messages", label: "Messages", icon: Search },
  ];

  const handleTabChange = (id) => {
    setActiveTab(id);
    if (isMobile) setIsSidebarOpen(false);
  };

  const toggleSidebar = () => {
    if (isMobile) {
      setIsSidebarOpen(!isSidebarOpen);
    } else {
      setIsCollapsed(!isCollapsed);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  const sidebarWidth = isMobile
    ? isSidebarOpen
      ? "w-64"
      : "w-0"
    : isCollapsed
    ? "w-16"
    : "w-64";

  return (
    <div className="min-h-screen bg-white">
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-20"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed top-0 left-0 h-full bg-white border-r border-gray-100 transition-all duration-300 z-30",
          isMobile
            ? isSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
            : "translate-x-0",
          sidebarWidth
        )}
      >
        <div className="h-16 border-b border-gray-100 flex items-center justify-between px-4">
          {(!isCollapsed || isMobile) && (
            <span className="text-lg font-light tracking-wide text-gray-900">
              ADMIN
            </span>
          )}
          {isMobile && isSidebarOpen && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(false)}
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
                "w-full flex items-center py-3 px-3 text-sm font-light transition-colors",
                "hover:bg-gray-50 hover:text-gray-900",
                activeTab === item.id
                  ? "bg-gray-50 text-gray-900"
                  : "text-gray-600",
                isCollapsed && !isMobile && "justify-center"
              )}
              onClick={() => handleTabChange(item.id)}
            >
              <item.icon className="h-5 w-5 min-w-[20px]" />
              {(!isCollapsed || isMobile) && (
                <span className="ml-3">{item.label}</span>
              )}
            </button>
          ))}
        </nav>
      </aside>

      <main
        className={cn(
          "h-screen flex flex-col transition-all duration-300",
          isMobile ? "" : isCollapsed ? "md:ml-16" : "md:ml-64"
        )}
      >
        <header className="h-16 flex items-center justify-between px-4 bg-white border-b border-gray-100">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="hover:bg-gray-50"
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search"
              className="w-40 md:w-64 pl-9 py-2 border-0 bg-gray-50 focus:ring-0 text-sm placeholder:text-gray-400"
            />
          </div>
        </header>

        <ScrollArea className="flex-1 h-[calc(100vh-4rem)]">
          <div className="p-4 md:p-6 h-full">
            {activeTab === "add Product" && <ProductForm />}
            {activeTab === "all Products" && <ProductList />}
            {activeTab === "users" && <UserList />}
            {activeTab === "orders" && <OrderList />}
            {activeTab === "messages" && <MessageList />}
          </div>
        </ScrollArea>
      </main>
    </div>
  );
};

export default AdminDashboard;
