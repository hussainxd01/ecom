import { useState, useEffect, useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ChevronDown, Search, X } from "lucide-react";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import Footer from "./Footer";
import Breadcrumb from "./Breadcrumb";

export default function Shop() {
  const { products, categories } = useContext(ShopContext);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: "",
    priceRange: "",
    search: "",
  });
  const [sortBy, setSortBy] = useState("recommended");
  const [showFilters, setShowFilters] = useState(false);
  const { id } = useParams();
  const handleFilterChange = (type, value) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
  };

  const clearFilters = () => {
    setFilters({
      category: "",
      priceRange: "",
      search: "",
    });
  };

  useEffect(() => {
    let filtered = [...products];

    if (filters.category) {
      filtered = filtered.filter(
        (product) => product.category._id === filters.category
      );
    }

    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split("-").map(Number);
      filtered = filtered.filter(
        (product) => product.price >= min && product.price <= max
      );
    }

    if (filters.search) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    switch (sortBy) {
      case "price-low-high":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high-low":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
  }, [products, filters, sortBy]);

  return (
    <section className="bg-white min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header and Filters */}
        <Breadcrumb />
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4 sm:gap-0">
            <h1 className="text-xl font-normal uppercase tracking-widest">
              New Arrivals
            </h1>
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                className="font-normal uppercase text-xs tracking-widest w-full sm:w-auto border border-gray-200 hover:bg-gray-50"
                onClick={() => setShowFilters(!showFilters)}
              >
                Filter and Sort
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
              <div className="relative w-full sm:w-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search products"
                  value={filters.search}
                  onChange={(e) => handleFilterChange("search", e.target.value)}
                  className="pl-10 bg-gray-100 border-none text-xs tracking-widest w-full"
                />
              </div>
            </div>
          </div>
          {showFilters && (
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 border-t border-b gap-4 sm:gap-0">
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Select
                  value={filters.category}
                  onValueChange={(value) =>
                    handleFilterChange("category", value)
                  }
                >
                  <SelectTrigger className="w-full sm:w-[180px] uppercase text-xs tracking-widest">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category._id} value={category._id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  value={filters.priceRange}
                  onValueChange={(value) =>
                    handleFilterChange("priceRange", value)
                  }
                >
                  <SelectTrigger className="w-full sm:w-[180px] uppercase text-xs tracking-widest">
                    <SelectValue placeholder="Price Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-1000">₹0 - ₹1000</SelectItem>
                    <SelectItem value="1000-2000">₹1000 - ₹2000</SelectItem>
                    <SelectItem value="2000-5000">₹2000 - ₹5000</SelectItem>
                    <SelectItem value="5000-10000">₹5000+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-4">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full sm:w-[180px] uppercase text-xs tracking-widest">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recommended">Recommended</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="price-low-high">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="price-high-low">
                      Price: High to Low
                    </SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="ghost"
                  onClick={clearFilters}
                  className=" uppercase text-xs tracking-widest"
                >
                  Clear All <X className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <Link
              key={product._id}
              to={`/product/${product._id}`}
              className="group cursor-pointer"
            >
              <div className="aspect-w-1 aspect-h-1 sm:aspect-w-2 sm:aspect-h-3 mb-2">
                <img
                  src={product.images[0] || "/placeholder.svg"}
                  alt={product.name}
                  className="object-cover w-full h-full"
                />
              </div>
              <h3 className="text-xs font-normal truncate uppercase tracking-widest hover:underline">
                {product.name}
              </h3>
              <p className="text-sm text-gray-900">₹ {product.price}</p>
            </Link>
          ))}
        </div>
        {filteredProducts.length === 0 && (
          <p className="text-center text-gray-500 mt-8">No products found.</p>
        )}
      </div>
      <Footer />
    </section>
  );
}
