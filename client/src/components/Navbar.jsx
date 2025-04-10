import React, { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import MenSectionImage from "../assets/images/mens.jpg";
import WomenSectionImage from "../assets/images/women.jpg";
import { useShop } from "../context/ShopContext";
import SearchSidebar from "./SearchSidebar";
import SearchTopBar from "./SearchTopBar";
import LOGO from "../assets/images/LOGO_TRANSPARENT.png";
import { ChevronDown, Menu, Search, ShoppingBag, X } from "lucide-react";
// Navigation data configuration
const NAVIGATION_CONFIG = {
  main: [
    { name: "Home", to: "/" },
    { name: "Shop", to: "/shop" },
    { name: "About", to: "/our-story" },
    { name: "Contact", to: "/contact-us" },
  ],
  user: [
    { name: "My Account", to: "/account", icon: UserIcon },
    { name: "Cart", to: "/cart", icon: CartIcon },
    { name: "Settings", to: "/settings", icon: SettingsIcon },
    {
      name: "Manage Site",
      to: "/dashboard",
      icon: ManageIcon,
      adminOnly: true,
    },
    { name: "Logout", icon: LogoutIcon },
    { name: "Login", to: "/auth", icon: LoginIcon },
  ],
  shop: {
    featured: {
      title: "FEATURED",
      items: [
        { name: "Sale", link: "/category/sale" },
        { name: "New arrivals", link: "/category/new-arrivals" },
        { name: "Best sellers", link: "/category/best-sellers" },
        { name: "Shop all", link: "/shop" },
      ],
    },
    categories: {
      title: "CATEGORIES",
      items: [
        { name: "Top Wear", link: "/category/top wear" },
        { name: "Bottom Wear", link: "/category/bottom wear" },
        { name: "Jacket", link: "/category/jacket" },
        { name: "Shirt", link: "/category/shirt" },
        { name: "Shop all", link: "/shop" },
      ],
    },
    other: {
      title: "OTHER",
      items: [
        { name: "Surplus Sale", link: "/surplus-sale" },
        { name: "Outerwear", link: "/outerwear" },
        { name: "Denim", link: "/denim" },
        { name: "Shop all", link: "/shop-all-other" },
      ],
    },
  },
};

// Icon Components
function SearchIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="size-5"
    >
      <path
        fillRule="evenodd"
        d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function LoginIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="size-5"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="size-5"
    >
      <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
      />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="size-5"
    >
      <path d="M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.465 14.493a1.23 1.23 0 0 0 .41 1.412A9.957 9.957 0 0 0 10 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 0 0-13.074.003Z" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="size-5"
    >
      <path
        fillRule="evenodd"
        d="M6 5v1H4.667a1.75 1.75 0 0 0-1.743 1.598l-.826 9.5A1.75 1.75 0 0 0 3.84 19H16.16a1.75 1.75 0 0 0 1.743-1.902l-.826-9.5A1.75 1.75 0 0 0 15.333 6H14V5a4 4 0 0 0-8 0Zm4-2.5A2.5 2.5 0 0 0 7.5 5v1h5V5A2.5 2.5 0 0 0 10 2.5ZM7.5 10a2.5 2.5 0 0 0 5 0V8.75a.75.75 0 0 1 1.5 0V10a4 4 0 0 1-8 0V8.75a.75.75 0 0 1 1.5 0V10Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="size-4"
    >
      <path
        fillRule="evenodd"
        d="M7.84 1.804A1 1 0 0 1 8.82 1h2.36a1 1 0 0 1 .98.804l.331 1.652a6.993 6.993 0 0 1 1.929 1.115l1.598-.54a1 1 0 0 1 1.186.447l1.18 2.044a1 1 0 0 1-.205 1.251l-1.267 1.113a7.047 7.047 0 0 1 0 2.228l1.267 1.113a1 1 0 0 1 .206 1.25l-1.18 2.045a1 1 0 0 1-1.187.447l-1.598-.54a6.993 6.993 0 0 1-1.929 1.115l-.33 1.652a1 1 0 0 1-.98.804H8.82a1 1 0 0 1-.98-.804l-.331-1.652a6.993 6.993 0 0 1-1.929-1.115l-1.598.54a1 1 0 0 1-1.186-.447l-1.18-2.044a1 1 0 0 1 .205-1.251l1.267-1.114a7.05 7.05 0 0 1 0-2.227L1.821 7.773a1 1 0 0 1-.206-1.25l1.18-2.045a1 1 0 0 1 1.187-.447l1.598.54A6.992 6.992 0 0 1 7.51 3.456l.33-1.652ZM10 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function ManageIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="currentColor"
      className="size-4"
    >
      <path
        fillRule="evenodd"
        d="M4.784 3A2.25 2.25 0 0 0 2.68 4.449L1.147 8.475A2.25 2.25 0 0 0 1 9.276v1.474A2.25 2.25 0 0 0 3.25 13h9.5A2.25 2.25 0 0 0 15 10.75V9.276c0-.274-.05-.545-.147-.801l-1.534-4.026A2.25 2.25 0 0 0 11.216 3H4.784Zm-.701 1.983a.75.75 0 0 1 .7-.483h6.433a.75.75 0 0 1 .701.483L13.447 9h-2.412a1 1 0 0 0-.832.445l-.406.61a1 1 0 0 1-.832.445h-1.93a1 1 0 0 1-.832-.445l-.406-.61A1 1 0 0 0 4.965 9H2.553l1.53-4.017Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="size-4"
    >
      <path
        fillRule="evenodd"
        d="M10 2a.75.75 0 0 1 .75.75v7.5a.75.75 0 0 1-1.5 0v-7.5A.75.75 0 0 1 10 2ZM5.404 4.343a.75.75 0 0 1 0 1.06 6.5 6.5 0 1 0 9.192 0 .75.75 0 1 1 1.06-1.06 8 8 0 1 1-11.313 0 .75.75 0 0 1 1.06 0Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

// Subcomponents
const SearchResults = ({ results, onItemClick }) => (
  <div className="absolute top-full left-0 right-0 bg-white mt-2 rounded-lg shadow-lg border border-gray-100/100 max-h-96 overflow-y-auto">
    {results.map((product) => (
      <div
        key={product.id}
        className="flex items-center gap-4 p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100/100 last:border-b-0"
        onClick={() => onItemClick(product._id)}
      >
        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-medium text-gray-900 normal-case">
            {product.name}
          </h3>
          <p className="text-sm text-gray-500 normal-case line-clamp-1">
            {product.description}
          </p>
          <p className="mt-1 text-sm font-medium text-gray-900">
            ${product.price}
          </p>
        </div>
      </div>
    ))}
  </div>
);

const ShopDropdown = ({ open, navigationData, onMouseEnter, onMouseLeave }) => (
  <div
    className={`transform transition-all duration-300 ease-in-out w-full absolute z-10 ${
      open
        ? "opacity-100 translate-y-0"
        : "opacity-0 -translate-y-2 pointer-events-none"
    }`}
  >
    <nav
      className="flex justify-between items-center px-10 h-72 bg-white py-5 border-b border-gray-100/100 w-full"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="flex gap-40">
        {Object.entries(navigationData).map(([key, section]) => (
          <div key={key} className="flex flex-col">
            <h2 className="text-sm font-semibold mb-4 text-black tracking-widest">
              {section.title}
            </h2>
            <ul className="space-y-2 uppercase">
              {section.items.map((item, index) => (
                <li key={index}>
                  <NavLink
                    to={item.link}
                    className="text-xs text-gray-600 hover:text-black tracking-widest font-light"
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="flex gap-20">
        <FeaturedImage
          src={MenSectionImage}
          alt="Men's Fashion"
          title="Men's Fashion"
        />
        <FeaturedImage
          src={WomenSectionImage}
          alt="Women's Fashion"
          title="Women's Fashion"
        />
      </div>
    </nav>
  </div>
);

const FeaturedImage = ({ src, alt, title }) => (
  <div className="h-full flex flex-col gap-2">
    <div className="h-52 w-80 overflow-hidden cursor-pointer">
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transform transition-transform duration-300 ease-in-out hover:scale-110"
      />
    </div>
    <div className="flex items-center justify-between mt-1">
      <h1 className="text-gray-700 text-xs tracking-widest uppercase">
        {title}
      </h1>
      <Link
        to="/shop"
        className="flex gap-2 items-center text-xs tracking-widest uppercase text-gray-700"
      >
        Shop Now
      </Link>
    </div>
  </div>
);

const MenuItem = ({ item, isOpen, onToggle, onClose }) => {
  const hasSubmenu = item.submenu && item.submenu.length > 0;
  const navigate = useNavigate();

  const handleClick = (e) => {
    if (hasSubmenu) {
      e.preventDefault();
      onToggle();
    } else if (item.action) {
      e.preventDefault();
      item.action();
      onClose();
    } else if (item.link) {
      navigate(item.link);
      onClose();
    }
  };

  return (
    <div className="border-b border-gray-100">
      <div
        className="flex items-center justify-between px-6 py-4 cursor-pointer"
        onClick={handleClick}
      >
        <div className="flex items-center gap-3">
          {/* {item.icon && <item.icon className="h-4 w-4" />} */}
          <span className="text-sm font-normal">{item.title}</span>
        </div>
        {hasSubmenu && (
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        )}
      </div>
      {hasSubmenu && isOpen && (
        <div className="bg-gray-50">
          {item.submenu.map((subItem, index) => (
            <div
              key={index}
              className="block px-8 py-3 text-sm text-gray-600 hover:text-gray-900 cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                navigate(subItem.link);
                onClose();
              }}
            >
              {subItem.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Navbar = () => {
  const { logout, user, products, addToast } = useShop();
  const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState(false);
  const [openMenus, setOpenMenus] = useState({});

  const [state, setState] = useState({
    open: false,
    searchQuery: "",
    searchResults: [],
    userDropdown: false,
    isSidebarOpen: false,
    isAdmin: false,
    showManageSidebar: false,
    isSearchOpen: false,
    isLoggedIn: false,
  });

  if (user !== null) {
    state.isLoggedIn = true;
  }

  if (state.isSidebarOpen === true) {
    state.isSearchOpen = false;
  }

  const getMobileNavigationItems = () => {
    if (!user) {
      // Show only Login when user is not logged in
      return NAVIGATION_CONFIG.user.filter((item) => item.name === "Login");
    }
    // Show all items except Login when user is logged in
    return NAVIGATION_CONFIG.user.filter(
      (item) => item.name !== "Login" && (!item.adminOnly || state.isAdmin)
    );
  };

  const getMobileMenuItems = () => {
    const shopSubmenu = [];
    Object.values(NAVIGATION_CONFIG.shop).forEach((section) => {
      shopSubmenu.push(
        ...section.items.map((subItem) => ({
          title: subItem.name,
          link: subItem.link,
        }))
      );
    });

    const mainItems = NAVIGATION_CONFIG.main.map((item) => {
      if (item.name === "Shop") {
        return {
          title: item.name,
          link: item.to,
          submenu: shopSubmenu,
        };
      }
      return {
        title: item.name,
        link: item.to,
      };
    });

    const userItems = getMobileNavigationItems().map((item) => ({
      title: item.name,
      link: item.to,
      action: item.name === "Logout" ? handleLogout : null,
      icon: item.icon,
    }));

    return [...mainItems, ...userItems];
  };

  const toggleMenu = (title) => {
    setOpenMenus((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Update isAdmin status when user changes
  useEffect(() => {
    setState((prev) => ({
      ...prev,
      isAdmin: user?.role === "admin",
    }));
  }, [user]);

  // Handle search functionality
  useEffect(() => {
    if (state.searchQuery.trim()) {
      const filtered = products
        ?.filter(
          (product) =>
            product.name
              .toLowerCase()
              .includes(state.searchQuery.toLowerCase()) ||
            product.description
              .toLowerCase()
              .includes(state.searchQuery.toLowerCase()) ||
            product.category.name
              .toLowerCase()
              .includes(state.searchQuery.toLowerCase())
        )
        .slice(0, 5);
      setState((prev) => ({ ...prev, searchResults: filtered || [] }));
    } else {
      setState((prev) => ({ ...prev, searchResults: [] }));
    }
  }, [state.searchQuery, products]);

  // Handle mobile sidebar clicks
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (state.showManageSidebar && window.innerWidth < 640) {
        const sidebar = document.querySelector(".manage-sidebar");
        if (sidebar && !sidebar.contains(e.target)) {
          setState((prev) => ({ ...prev, showManageSidebar: false }));
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [state.showManageSidebar]);

  const handleSearchClick = (productId) => {
    setState((prev) => ({ ...prev, searchBar: false, searchQuery: "" }));
    navigate(`/product/${productId}`);
  };

  const handleLogout = () => {
    logout();
    addToast("You have been logged out.", "success");
    navigate("/");
  };

  return (
    <section className="relative w-full">
      {/* Main Navigation Bar */}
      <nav className="flex items-center justify-between sm:px-10 px-4 sm:h-24 border-b border-gray-100/100 z-10 h-20">
        {/* Mobile Menu Toggle */}
        <div
          className="size-10 flex items-center justify-center hover:bg-gray-100 rounded-full cursor-pointer sm:hidden"
          onClick={() => setState((prev) => ({ ...prev, isSidebarOpen: true }))}
        >
          <MenuIcon />
        </div>

        {/* Logo */}
        <div>
          <Link
            className="text-2xl tracking-widest uppercase font-extrabold text-black"
            to={"/"}
          >
            <img src={LOGO} alt="Logo" className="w-40" />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="text-gray-600 flex-1 ml-60 h-full sm:flex items-center hidden text-xs tracking-widest uppercase font-light">
          {NAVIGATION_CONFIG.main.map((item) => (
            <NavLink
              to={item.to}
              key={item.name}
              className={({ isActive }) =>
                `${isActive ? "mx-4 font-medium text-grey-900" : "mx-4"} 
                text-xs h-full flex items-center hover:text-black tracking-widest`
              }
              onMouseEnter={() =>
                item.name === "Shop" &&
                setState((prev) => ({ ...prev, open: true }))
              }
              onMouseLeave={() =>
                item.name === "Shop" &&
                setState((prev) => ({ ...prev, open: false }))
              }
            >
              {item.name}
              {item.name === "Shop" && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="size-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </NavLink>
          ))}
        </div>

        {/* Mobile Icons */}
        <div className="flex gap-2 sm:hidden">
          <button
            className="size-10 flex items-center justify-center hover:bg-gray-100 rounded-full sm:hidden"
            onClick={() =>
              setState((prev) => ({ ...prev, isSearchOpen: true }))
            }
          >
            <SearchIcon />
          </button>
          <button
            className="size-10 flex items-center justify-center hover:bg-gray-100 rounded-full"
            onClick={() => navigate("/cart")}
          >
            <CartIcon />
          </button>
        </div>

        {/* Desktop Icons */}
        <div className="sm:flex hidden gap-3 h-full items-center justify-center">
          <button
            className="size-10 flex items-center justify-center hover:bg-gray-100 rounded-full"
            onClick={() =>
              setState((prev) => ({ ...prev, isSearchOpen: true }))
            }
          >
            <SearchIcon />
          </button>
          <div
            className="flex h-full items-center justify-center"
            onMouseEnter={() =>
              setState((prev) => ({ ...prev, userDropdown: true }))
            }
            onMouseLeave={() =>
              setState((prev) => ({ ...prev, userDropdown: false }))
            }
            onClick={() => !user && navigate("/auth")}
          >
            <div className="size-10 flex items-center justify-center hover:bg-gray-100 rounded-full cursor-pointer">
              <UserIcon />
            </div>
          </div>
          <button
            className="size-10 flex items-center justify-center hover:bg-gray-100 rounded-full"
            onClick={() => navigate("/cart")}
          >
            <CartIcon />
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-50 transition-all duration-300 ${
          state.isSidebarOpen ? "visible" : "invisible"
        }`}
      >
        {/* Overlay */}
        <div
          className={`fixed inset-0 bg-black/50 transition-opacity duration-300 ${
            state.isSidebarOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() =>
            setState((prev) => ({ ...prev, isSidebarOpen: false }))
          }
        />

        {/* Sidebar Content */}
        <div
          className={`fixed inset-y-0 left-0 w-80 max-w-full bg-white shadow-xl transition-transform duration-300 ease-in-out ${
            state.isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <span className="text-sm font-medium">Menu</span>
            <button
              onClick={() =>
                setState((prev) => ({ ...prev, isSidebarOpen: false }))
              }
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="overflow-y-auto h-[calc(100%-64px)]">
            {getMobileMenuItems().map((item, index) => (
              <MenuItem
                key={index}
                item={item}
                isOpen={openMenus[item.title]}
                onToggle={() => toggleMenu(item.title)}
                onClose={() =>
                  setState((prev) => ({ ...prev, isSidebarOpen: false }))
                }
              />
            ))}
          </div>
        </div>
      </div>
      {/* Shop Dropdown */}
      <ShopDropdown
        open={state.open}
        navigationData={NAVIGATION_CONFIG.shop}
        onMouseEnter={() => setState((prev) => ({ ...prev, open: true }))}
        onMouseLeave={() => setState((prev) => ({ ...prev, open: false }))}
      />
      {/* User Dropdown */}
      {state.userDropdown && user && (
        <div
          className="absolute mt-2 w-48 bg-white border border-gray-100/100 z-10 top-[87px] right-12"
          onMouseEnter={() =>
            setState((prev) => ({ ...prev, userDropdown: true }))
          }
          onMouseLeave={() =>
            setState((prev) => ({ ...prev, userDropdown: false }))
          }
        >
          <ul className="text-xs text-gray-700 uppercase tracking-widest font-light">
            {getMobileNavigationItems().map((item) => (
              <li key={item.name}>
                {item.name === "Logout" ? (
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 uppercase flex gap-2 items-center font-light"
                  >
                    <item.icon />
                    {item.name}
                  </button>
                ) : (
                  <Link
                    to={item.to}
                    className="px-4 py-2 hover:bg-gray-100 flex gap-2 items-center"
                    onClick={() =>
                      item.name === "Manage Site" &&
                      setState((prev) => ({
                        ...prev,
                        showManageSidebar: true,
                      }))
                    }
                  >
                    <item.icon />
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Search Components */}
      {state.isSearchOpen && (
        <>
          {/* Desktop Search Sidebar */}
          {!isMobile && (
            <div className="fixed inset-0 z-50 bg-black/50">
              <div className="fixed right-0 top-0 h-full w-full max-w-[600px] bg-white shadow-lg">
                <SearchSidebar
                  searchQuery={state.searchQuery}
                  searchResults={state.searchResults}
                  onSearchChange={(value) =>
                    setState((prev) => ({ ...prev, searchQuery: value }))
                  }
                  onItemClick={handleSearchClick}
                  onClose={() =>
                    setState((prev) => ({ ...prev, isSearchOpen: false }))
                  }
                />
              </div>
            </div>
          )}

          {/* Mobile Search TopBar */}
          {isMobile && (
            <div className="flex w-full">
              <SearchTopBar
                isOpen={state.isSearchOpen}
                searchQuery={state.searchQuery}
                searchResults={state.searchResults}
                onSearchChange={(value) =>
                  setState((prev) => ({ ...prev, searchQuery: value }))
                }
                onItemClick={handleSearchClick}
                onClose={() =>
                  setState((prev) => ({ ...prev, isSearchOpen: false }))
                }
              />
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default Navbar;
