import express from "express";
import {
  getAllProducts,
  addProduct,
  deleteProduct,
  editProduct,
  getSingleProduct,
} from "../controller/product.controller.js";

const router = express.Router();

router.get("/", getAllProducts);
router.post("/", addProduct);
router.delete("/:id", deleteProduct);
router.put("/:id", editProduct);
router.get("/:id", getSingleProduct);

export default router;
