// import { CloseIcon } from "./Icons";
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
const SearchTopBar = ({
  isOpen,
  searchQuery,
  searchResults,
  onSearchChange,
  onItemClick,
  onClose,
}) => {
  return (
    <div className="z-[9999] bg-white flex flex-col w-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Search</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <CloseIcon />
          </button>
        </div>
      </div>

      {/* Search Input */}
      <div className="p-4">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          autoFocus
        />
      </div>

      {/* Results Container */}
      <div className="flex-1 overflow-y-auto pb-4">
        {searchResults.length > 0 ? (
          searchResults.map((product) => (
            <div
              key={product.id}
              className="flex items-center gap-4 p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
              onClick={() => onItemClick(product._id)}
            >
              <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                <img
                  src={product.images[0] || "/placeholder.svg"}
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
          ))
        ) : (
          <div className="text-center text-gray-500 p-4">
            {searchQuery ? "No results found" : "Start typing to search"}
          </div>
        )}
      </div>
    </div>
  );
};
export default SearchTopBar;
