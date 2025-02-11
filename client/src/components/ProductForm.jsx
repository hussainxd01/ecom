import React, { useState } from "react";
import { useShop } from "../context/ShopContext";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Trash, Plus, UploadCloud } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

const ProductForm = ({ product = {} }) => {
  const {
    addProduct,
    editProduct,
    categories,
    addCategory,
    handleDeleteCategory,
  } = useShop();
  const isEditing = Boolean(product?._id);

  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [newCategory, setNewCategory] = useState("");

  const initialFormState = {
    name: "",
    description: "",
    price: "",
    category: "",
    gender: "",
    stock: "",
    sizes: product.sizes || [],
    images: [],
    existingImages: [],
  };

  const [formData, setFormData] = useState({
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price?.toString() || "",
    category: product?.category || "",
    gender: product?.gender || "",
    stock: product?.stock?.toString() || "",
    sizes: product?.sizes || [],
    images: [],
    existingImages: product?.images || [],
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [previewImages, setPreviewImages] = useState([]);

  const handleNewCategory = async () => {
    if (
      newCategory.trim() &&
      !categories.some((cat) => cat.name === newCategory)
    ) {
      try {
        const newCat = await addCategory({ name: newCategory });
        setFormData((prev) => ({ ...prev, category: newCat._id }));
        setNewCategory("");
        setIsAddCategoryOpen(false);
      } catch (error) {
        setMessage({
          type: "error",
          text: "Failed to add new category",
        });
      }
    }
  };

  const removeImage = (index, isExisting) => {
    if (isExisting) {
      setFormData((prev) => ({
        ...prev,
        existingImages: prev.existingImages.filter((_, i) => i !== index),
      }));
    } else {
      const updatedImages = [...formData.images];
      const updatedPreviews = [...previewImages];
      updatedImages.splice(index, 1);
      updatedPreviews.splice(index, 1);

      setFormData((prev) => ({ ...prev, images: updatedImages }));
      setPreviewImages(updatedPreviews);
    }
  };

  const validateForm = () => {
    const errors = [];
    if (!formData.name.trim()) errors.push("Product name is required");
    if (!formData.description.trim()) errors.push("Description is required");
    if (!formData.price || Number(formData.price) <= 0)
      errors.push("Valid price is required");
    if (!formData.stock || Number(formData.stock) < 0)
      errors.push("Valid stock quantity is required");
    if (!formData.category) errors.push("Category is required");
    if (!formData.sizes.length) errors.push("At least one size is required");
    if (!formData.gender) errors.push("Gender is required");
    if (formData.existingImages.length === 0 && formData.images.length === 0) {
      errors.push("At least one image is required");
    }
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
    );

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${
        import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
      }/image/upload`,
      { method: "POST", body: formData }
    );
    return response.json();
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(
      (file) => file.type.startsWith("image/") && file.size <= 5 * 1024 * 1024
    );

    const imageUrls = validFiles.map((file) => URL.createObjectURL(file));
    setPreviewImages((prev) => [...prev, ...imageUrls]);
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...validFiles],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setMessage({
        type: "error",
        text: `Please fix errors: ${validationErrors.join(", ")}`,
      });
      return;
    }

    setLoading(true);
    try {
      const uploadPromises = formData.images.map((file) =>
        uploadToCloudinary(file)
      );
      const uploadedUrls = (await Promise.all(uploadPromises)).map(
        (res) => res.secure_url
      );

      const productData = {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
        images: [...formData.existingImages, ...uploadedUrls],
      };

      if (isEditing) {
        await editProduct(product._id, productData);
        setMessage({ type: "success", text: "Product updated successfully!" });
      } else {
        await addProduct(productData);
        setFormData(initialFormState);
        setPreviewImages([]);
        setMessage({ type: "success", text: "Product added successfully!" });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: `Failed to ${isEditing ? "update" : "add"} product: ${error}`,
      });
    } finally {
      setLoading(false);
    }
  };

  const existingImageObjects = formData.existingImages.map((url, index) => ({
    type: "existing",
    url,
    index,
  }));

  const newImageObjects = previewImages.map((url, index) => ({
    type: "new",
    url,
    index,
  }));

  const allImages = [...existingImageObjects, ...newImageObjects];

  return (
    <div className="w-full min-h-screen bg-white">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="border-b pb-6">
          <h1 className="text-3xl font-light tracking-wide">
            {isEditing ? "Edit Product" : "New Product"}
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-8 space-y-6">
            {message.text && (
              <div
                className={`p-4 text-sm ${
                  message.type === "success"
                    ? "bg-green-50 text-green-800"
                    : "bg-red-50 text-red-800"
                }`}
              >
                {message.text}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-6">
                <div>
                  <Label className="text-xs uppercase tracking-wider text-gray-500">
                    Product Name
                  </Label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 font-light"
                    placeholder="Enter product name"
                  />
                </div>

                <div>
                  <Label className="text-xs uppercase tracking-wider text-gray-500">
                    Description
                  </Label>
                  <Textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="mt-1 font-light min-h-[120px]"
                    placeholder="Enter product description"
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Label className="text-xs uppercase tracking-wider text-gray-500">
                      Price
                    </Label>
                    <Input
                      name="price"
                      type="number"
                      value={formData.price}
                      onChange={handleChange}
                      className="mt-1 font-light"
                    />
                  </div>
                  <div>
                    <Label className="text-xs uppercase tracking-wider text-gray-500">
                      Stock
                    </Label>
                    <Input
                      name="stock"
                      type="number"
                      value={formData.stock}
                      onChange={handleChange}
                      className="mt-1 font-light"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-xs uppercase tracking-wider text-gray-500">
                    Gender
                  </Label>
                  <Select
                    value={formData.gender}
                    onValueChange={(value) =>
                      handleSelectChange("gender", value)
                    }
                  >
                    <SelectTrigger className="mt-1 font-light">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      {["Men", "Women", "Boys", "Girls"].map((gender) => (
                        <SelectItem key={gender} value={gender}>
                          {gender}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-xs uppercase tracking-wider text-gray-500">
                    Sizes
                  </Label>
                  <div className="mt-2 grid grid-cols-5 gap-4">
                    {["S", "M", "L", "XL", "XXL"].map((size) => (
                      <div key={size} className="flex items-center space-x-2">
                        <Checkbox
                          id={`size-${size}`}
                          checked={formData.sizes.includes(size)}
                          onCheckedChange={(checked) => {
                            setFormData((prev) => ({
                              ...prev,
                              sizes: checked
                                ? [...prev.sizes, size]
                                : prev.sizes.filter((s) => s !== size),
                            }));
                          }}
                        />
                        <Label htmlFor={`size-${size}`} className="font-light">
                          {size}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <Label className="text-xs uppercase tracking-wider text-gray-500">
                      Category
                    </Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setIsAddCategoryOpen(true)}
                      className="text-xs"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      New Category
                    </Button>
                  </div>
                  <Select
                    value={formData.category}
                    onValueChange={(value) =>
                      handleSelectChange("category", value)
                    }
                  >
                    <SelectTrigger className="font-light">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories?.map((category) => (
                        <div
                          key={category._id}
                          className="flex items-center justify-between px-2 py-1"
                        >
                          <SelectItem value={category._id}>
                            {category.name}
                          </SelectItem>
                          <button
                            onClick={() => {
                              setCategoryToDelete(category._id);
                              setIsDeleteDialogOpen(true);
                            }}
                            className="text-gray-400 hover:text-red-500"
                          >
                            <Trash className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full py-6 text-sm uppercase tracking-wide"
              >
                {loading ? (
                  <span className="flex items-center">
                    <span className="mr-2">Processing</span>
                  </span>
                ) : (
                  <span>{isEditing ? "Update Product" : "Add Product"}</span>
                )}
              </Button>
            </form>
          </div>

          {/* Image Upload Section */}
          <div className="lg:col-span-4 space-y-6">
            <div className="border rounded-lg p-6">
              <h3 className="text-xs uppercase tracking-wider text-gray-500 mb-4">
                Product Images
              </h3>

              <div className="space-y-4">
                {/* Main Image Upload */}
                {allImages[0] ? (
                  <div className="relative aspect-[3/4]">
                    <img
                      src={allImages[0].url}
                      className="w-full h-full object-cover"
                      alt="Main preview"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() =>
                        removeImage(
                          allImages[0].index,
                          allImages[0].type === "existing"
                        )
                      }
                    >
                      ×
                    </Button>
                  </div>
                ) : (
                  <Label
                    htmlFor="image-upload"
                    className="aspect-[3/4] border border-dashed rounded flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition-colors"
                  >
                    <UploadCloud className="h-8 w-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-500">
                      Upload Main Image
                    </span>
                    <Input
                      id="image-upload"
                      type="file"
                      multiple
                      onChange={handleImageChange}
                      className="hidden"
                      accept="image/*"
                    />
                  </Label>
                )}

                {/* Thumbnail Grid */}
                <div className="grid grid-cols-3 gap-2">
                  {allImages.slice(1, 4).map((image, index) => (
                    <div
                      key={`${image.type}-${image.index}`}
                      className="relative aspect-square"
                    >
                      <img
                        src={image.url}
                        className="w-full h-full object-cover"
                        alt={`Thumbnail ${index + 1}`}
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-1 right-1"
                        onClick={() =>
                          removeImage(image.index, image.type === "existing")
                        }
                      >
                        ×
                      </Button>
                    </div>
                  ))}

                  {allImages.length < 4 && (
                    <Label
                      htmlFor="additional-images"
                      className="aspect-square border border-dashed rounded flex items-center justify-center cursor-pointer hover:border-gray-400 transition-colors"
                    >
                      <Input
                        id="additional-images"
                        type="file"
                        multiple
                        onChange={handleImageChange}
                        className="hidden"
                        accept="image/*"
                      />
                      <Plus className="h-5 w-5 text-gray-400" />
                    </Label>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <Dialog open={isAddCategoryOpen} onOpenChange={setIsAddCategoryOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-light">
              New Category
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label className="text-xs uppercase tracking-wider text-gray-500">
                Category Name
              </Label>
              <Input
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="mt-1 font-light"
                placeholder="Enter category name"
              />
            </div>
            <Button onClick={handleNewCategory} className="w-full">
              Add Category
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-light">
              Delete Category
            </DialogTitle>
          </DialogHeader>
          <p className="text-gray-600">
            Are you sure you want to delete this category? This action cannot be
            undone.
          </p>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={async () => {
                if (categoryToDelete) {
                  const result = await handleDeleteCategory(categoryToDelete);
                  if (result?.success) {
                    setIsDeleteDialogOpen(false);
                    setCategoryToDelete(null);
                    if (formData.category === categoryToDelete) {
                      setFormData((prev) => ({ ...prev, category: "" }));
                    }
                  }
                }
              }}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductForm;
