import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import {
  createOrder,
  getAllOrders,
  getUserOrders,
  updateOrderStatus,
} from "../controller/order.controller.js";

const router = express.Router();

// Apply authentication middleware to all routes
router.use(protect);

// Create new order
router.post("/", createOrder);

// Get all orders
router.get("/", getAllOrders);

// Get user's orders
router.get("/user", getUserOrders);

// Update order status
router.patch("/:id/status", updateOrderStatus);

export default router;
