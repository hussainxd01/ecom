import { useState } from "react";
import { Heart, Star } from "lucide-react";
import { useShop } from "../context/ShopContext";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "./Breadcrumb";

const ProductDetail = () => {
  const { products, addToCart, addToWishlist, user, addToast } = useShop();
  const { productId } = useParams();
  const product = products.find((p) => p._id === productId);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState(
    product?.colors?.[0] || ""
  );
  const [error, setError] = useState("");

  if (!product) {
    return <div className="container mx-auto px-4 py-8">Product not found</div>;
  }

  const navigate = useNavigate();
  const validateAndAddToCart = () => {
    setError("");

    if (!user) {
      setError("Please log in to add items to cart");
      return;
    }

    if (!product) {
      setError("Product information is missing");
      return;
    }

    if (!selectedSize) {
      setError("Please select a size");
      return;
    }

    try {
      addToCart({
        userId: user.id,
        productId: product._id,
        selectedSize,
        selectedColor,
      });

      addToast(
        `${product.name}, SIZE ${selectedSize} ADDED TO CART.`,
        "success"
      );
    } catch (err) {
      setError(err.message || "Failed to add item to cart");
    }
  };
  return (
    <section>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb productName={product.name} />

        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden">
              <img
                src={product.images?.[selectedImage] || product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images && product.images.length > 1 && (
              <div className="flex gap-4 overflow-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 border rounded-lg overflow-hidden ${
                      selectedImage === index
                        ? "border-black"
                        : "border-gray-200"
                    }`}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-contain"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="uppercase tracking-widest text-xs text-gray-600">
                  {product.category.name}
                </span>
              </div>
              <h1 className="text-2xl font-semibold uppercase">
                {product.name}
              </h1>
              {product.rating && (
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? "fill-primary"
                          : "fill-muted stroke-muted-foreground"
                      }`}
                    />
                  ))}
                  <span className="text-sm text-muted-foreground ml-2">
                    {product.averageRating || 0} reviews
                  </span>
                </div>
              )}
            </div>

            <div className="text-2xl font-bold">
              ${product.price.toFixed(2)}
            </div>

            <div>
              <p className="text-sm text-gray-600 tracking-widest">
                {product.description}
              </p>
            </div>

            <div className="space-y-4">
              {product.colors && product.colors.length > 0 && (
                <div className="space-y-2">
                  <Label>Color</Label>
                  <RadioGroup
                    value={selectedColor}
                    onValueChange={setSelectedColor}
                    className="flex gap-3"
                  >
                    {product.colors.map((color) => (
                      <div key={color} className="flex items-center space-x-2">
                        <RadioGroupItem value={color} id={`color-${color}`} />
                        <Label htmlFor={`color-${color}`}>{color}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              )}

              {product.sizes && product.sizes.length > 0 && (
                <div className="space-y-2">
                  <Label>
                    Size {product.sizeType && `(${product.sizeType})`}
                  </Label>
                  <div className="grid grid-cols-5 gap-2">
                    {product.sizes.map((size) => (
                      <Button
                        key={size}
                        variant={selectedSize === size ? "default" : "outline"}
                        onClick={() => setSelectedSize(size)}
                        className="h-11"
                      >
                        {size}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-4">
              <Button
                className="flex-1 h-12 text-base bg-black hover:bg-black/90"
                onClick={validateAndAddToCart}
              >
                Add to cart
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-12 w-12"
                onClick={() => addToWishlist(product)}
              >
                <Heart className="h-5 w-5" />
              </Button>
            </div>

            {product.freeShippingThreshold && (
              <p className="text-sm text-muted-foreground">
                Free delivery on orders over $
                {product.freeShippingThreshold.toFixed(2)}
              </p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default ProductDetail;
