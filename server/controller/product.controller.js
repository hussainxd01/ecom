import Product from "../models/product.model.js";

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("category", "name")
      .select("-ratings") // Exclude ratings array for performance
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server Error",
      message: error.message,
    });
  }
};

const addProduct = async (req, res) => {
  try {
    const productData = req.body;

    // Set the timestamps
    productData.createdAt = Date.now();
    productData.updatedAt = Date.now();

    const product = await Product.create(productData);

    res.status(201).json({
      success: true,
      data: product,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);

      res.status(400).json({
        success: false,
        error: "Validation Error",
        messages,
      });
    } else {
      res.status(500).json({
        success: false,
        error: "Server Error",
        message: error.message,
      });
    }
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, error: "Product not found" });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

const editProduct = async (req, res) => {
  try {
    const { name, description, price, images, sizes } = req.body;
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, price, images, sizes },
      { new: true }
    );
    if (!product) {
      return res
        .status(404)
        .json({ success: false, error: "Product not found" });
    }
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid product ID" });
    }
    res.status(500).json({ message: "Server error" });
  }
};

const categoryController = {
  // Get all categories
  getAllCategories: async (req, res) => {
    try {
      const categories = await Category.find({}).sort({ name: 1 });
      res.json(categories);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching categories", error: error.message });
    }
  },

  // Create a new category
  createCategory: async (req, res) => {
    try {
      const { name } = req.body;

      // Check if category already exists
      const existingCategory = await Category.findOne({ name: name });
      if (existingCategory) {
        return res.status(400).json({ message: "Category already exists" });
      }

      const category = new Category({ name });
      await category.save();

      res.status(201).json(category);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error creating category", error: error.message });
    }
  },

  // Delete a category
  deleteCategory: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedCategory = await Category.findByIdAndDelete(id);

      if (!deletedCategory) {
        return res.status(404).json({ message: "Category not found" });
      }

      res.json({
        message: "Category deleted successfully",
        category: deletedCategory,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error deleting category", error: error.message });
    }
  },
};

export {
  getAllProducts,
  addProduct,
  deleteProduct,
  editProduct,
  getSingleProduct,
  categoryController,
};
