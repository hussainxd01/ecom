import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import ProductForm from "./ProductForm";

const EditProductPage = () => {
  const { id: productId } = useParams(); // Changed from productId to id to match route parameter
  const navigate = useNavigate();
  const { products } = useShop();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log(product);
  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        // Find product from existing products state instead of making new request
        const foundProduct = products?.find((p) => p._id === productId);

        if (!foundProduct) {
          setError("Product not found");
          return;
        }

        setProduct(foundProduct);
      } catch (error) {
        setError(error.message || "Error loading product");
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [productId, products]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-400 font-light">
        Loading product...
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-2xl mx-auto px-6 py-8">
        <div className="text-center">
          <h2 className="text-xl font-light mb-4 text-gray-600">{error}</h2>
          <button
            onClick={() => navigate("/products")}
            className="px-6 py-2 text-sm bg-black text-white hover:bg-gray-900 transition-colors"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="w-full max-w-2xl mx-auto px-6 py-8">
        <div className="text-center">
          <h2 className="text-xl font-light mb-4 text-gray-600">
            Product not found
          </h2>
          <button
            onClick={() => navigate("/products")}
            className="px-6 py-2 text-sm bg-black text-white hover:bg-gray-900 transition-colors"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return <ProductForm product={product} />; // Changed prop name to be more descriptive
};

export default EditProductPage;
