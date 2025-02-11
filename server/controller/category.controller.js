import Category from "../models/category.model.js";

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

export default categoryController;
