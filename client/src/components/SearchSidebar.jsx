import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

const SearchSidebar = ({
  searchQuery,
  searchResults,
  onSearchChange,
  onItemClick,
  onClose,
}) => {
  const trendingTags = ["Shirt", "Dress", "Black"];

  return (
    <div className="flex flex-col h-full w-full max-w-full bg-white overflow-hidden">
      {/* Add close button for desktop */}
      <div className="sm:px-6 px-2 py-4 flex items-center justify-between border-b">
        <h2 className="text-lg font-medium">Search</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="rounded-full p-2 hover:bg-gray-100"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto">
        {/* Search Input */}
        <div className="px-2 sm:px-6 py-4">
          <Input
            type="search"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full max-w-full min-w-0 h-10 bg-gray-50 border-0 focus-visible:ring-0 text-sm"
          />
        </div>

        <div className="px-6 space-y-8">
          {/* Trending Section */}
          <div>
            <h3 className="font-medium mb-4 text-xs tracking-wider">
              TRENDING
            </h3>
            <div className="flex flex-wrap gap-2">
              {trendingTags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="rounded-full px-4 py-1 text-xs font-normal bg-gray-50 hover:bg-gray-100 border-0 text-gray-900"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Search Results */}
          {searchResults.length > 0 && (
            <div>
              <h3 className="font-medium mb-4 text-xs tracking-wider">
                PRODUCT RECOMMEND
              </h3>
              <div className="space-y-6">
                {searchResults.map((product) => (
                  <div
                    key={product.id}
                    className="flex gap-4 cursor-pointer group"
                    onClick={() => onItemClick(product._id)}
                  >
                    <div className="h-[120px] w-[96px] flex-shrink-0 overflow-hidden">
                      <img
                        src={product.images[0] || "/placeholder.svg"}
                        alt={product.name}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1 min-w-0 py-1">
                      <h4 className="text-sm font-medium">{product.name}</h4>
                      <div className="mt-2 flex items-center gap-3">
                        <span className="text-sm font-medium">
                          ${product.price}
                        </span>
                        <span className="text-sm text-gray-400 line-through">
                          ${(product.price * 1.2).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchSidebar;
