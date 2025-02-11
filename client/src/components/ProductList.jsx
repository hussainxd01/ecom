import React, { useState } from "react";
import { useShop } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";

const ProductList = () => {
  const { products, deleteProduct, loading, error } = useShop();
  const navigate = useNavigate();
  const [productToDelete, setProductToDelete] = useState(null);

  const handleEdit = (productId) => {
    navigate(`/edit-product/${productId}`);
  };

  const handleDeleteClick = (productId) => {
    setProductToDelete(productId);
  };

  const handleDeleteConfirm = async () => {
    try {
      const result = await deleteProduct(productToDelete);
      if (result.success) {
        console.log("Product deleted successfully");
      } else {
        console.error("Failed to delete product:", result.error);
      }
    } catch (err) {
      console.error("Error deleting product:", err);
    } finally {
      setProductToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setProductToDelete(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-400">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        Error: {error}
      </div>
    );
  }

  const deletingProduct = products?.find((p) => p._id === productToDelete);

  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-light mb-8 tracking-wide uppercase">
        Products
      </h1>

      {/* Delete Confirmation Modal */}
      {productToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-light mb-4 tracking-wide">
              Delete Product
            </h3>
            <p className="mb-6 text-sm text-gray-600">
              Are you sure you want to delete{" "}
              <span className="font-medium">
                {deletingProduct?.name || "this product"}
              </span>
              ?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={handleDeleteCancel}
                className="px-6 py-2 text-sm hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-6 py-2 text-sm bg-black text-white hover:bg-gray-900 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid gap-6">
        {products?.map((product) => (
          <div
            key={product._id}
            className="group bg-white hover:bg-gray-50 transition-colors duration-200"
          >
            <div className="flex items-start gap-6 p-4">
              <div className="w-24 h-32 flex-shrink-0 overflow-hidden">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="flex-grow min-w-0 py-1">
                <h3 className="font-light text-lg tracking-wide mb-2">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-2">
                  {product.description}
                </p>
              </div>

              <div className="flex flex-col items-end gap-4 py-1">
                <div className="text-lg font-light tracking-wide">
                  ${product.price.toFixed(2)}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleEdit(product._id)}
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label="Edit product"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(product._id)}
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                    aria-label="Delete product"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {products?.length === 0 && (
          <div className="text-center py-12 text-gray-400 font-light tracking-wide">
            No products available
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
