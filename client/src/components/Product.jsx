import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

const ProductCard = ({ product }) => {
  const originalPrice = product.compareAtPrice || product.originalPrice;
  const hasDiscount = originalPrice && originalPrice > product.price;
  const discountPercentage = hasDiscount
    ? Math.round(((originalPrice - product.price) / originalPrice) * 100)
    : null;

  return (
    <div className="group cursor-pointer">
      <div className="relative aspect-[3/4] mb-4">
        {hasDiscount && (
          <div className="absolute top-2 right-2 bg-rose-500 text-white text-xs px-2 py-1 rounded">
            Save {discountPercentage}%
          </div>
        )}
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="space-y-1">
        <p className="text-xs text-gray-600 uppercase tracking-wide">
          {product.category.name}
        </p>
        <h2 className="font-normal hover:underline uppercase text-xs tracking-wider">
          {product.name}
        </h2>
        <div className="flex gap-2 items-center">
          <span className="text-sm">${product.price}</span>
          {hasDiscount && (
            <span className="text-sm text-gray-500 line-through">
              ${originalPrice}
            </span>
          )}
        </div>
        {product.colors && (
          <div className="flex gap-1 mt-2">
            {product.colors.map((color, index) => (
              <button
                key={index}
                className="w-4 h-4 rounded-full border border-gray-300"
                style={{ backgroundColor: color }}
                aria-label={`Select ${color} color`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const Product = () => {
  const { products, loading, error } = useContext(ShopContext);

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error)
    return <div className="p-8 text-center text-red-500">Error: {error}</div>;
  if (!Array.isArray(products)) {
    return (
      <div className="p-8 text-center">
        Error: Products data is not in array format.
      </div>
    );
  }

  return (
    <div className="max-w-screen-2xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12 p-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Product;
