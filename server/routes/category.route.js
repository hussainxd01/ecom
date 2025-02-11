import express from "express";
import categoryController from "../controller/category.controller.js";

const router = express.Router();

router.get("/", categoryController.getAllCategories);
router.post("/", categoryController.createCategory);
router.delete("/:id", categoryController.deleteCategory);

export default router;
