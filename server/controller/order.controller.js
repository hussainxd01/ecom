import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import { sendOrderConfirmationEmail } from "../utils/emailService.js";
import mongoose from "mongoose";
import User from "../models/user.model.js";

export const createOrder = async (req, res) => {
  console.log("Full Request Body:", JSON.stringify(req.body, null, 2));
  console.log("Request User:", req.user);

  try {
    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const {
      items,
      total,
      fullName,
      email,
      address,
      city,
      state,
      zipCode,
      country,
    } = req.body;

    const validationErrors = [];

    if (!items || !Array.isArray(items) || items.length === 0) {
      validationErrors.push("Items list is required and must not be empty");
    }

    if (!total || typeof total !== "number" || total <= 0) {
      validationErrors.push("Valid total amount is required");
    }

    const requiredFields = [
      { field: fullName, name: "Full Name" },
      { field: email, name: "Email" },
      { field: address, name: "Address" },
      { field: city, name: "City" },
      { field: state, name: "State" },
      { field: zipCode, name: "ZIP Code" },
      { field: country, name: "Country" },
    ];

    requiredFields.forEach(({ field, name }) => {
      if (!field || field.trim() === "") {
        validationErrors.push(`${name} is required`);
      }
    });

    if (validationErrors.length > 0) {
      return res
        .status(400)
        .json({ message: "Validation failed", errors: validationErrors });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const processedItems = [];
    for (const item of items) {
      const product = await Product.findById(item.product._id);

      if (!product) {
        return res
          .status(404)
          .json({ message: `Product ${item.product._id} not found` });
      }

      if (product.price !== item.product.price) {
        return res.status(400).json({
          message: `Price for ${product.name} has changed. Please refresh your cart`,
        });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `Insufficient stock for ${product.name}`,
          availableStock: product.stock,
        });
      }

      processedItems.push({
        product: product._id,
        name: product.name,
        price: product.price,
        size: item.size,
        quantity: item.quantity,
      });

      product.stock -= item.quantity;
      await product.save();
    }

    const order = new Order({
      user: req.user._id,
      items: processedItems,
      total,
      shippingInfo: { fullName, email, address, city, state, zipCode, country },
    });

    await order.save();

    // **Update User's Orders Array**
    user.orders.push(order._id);
    await user.save();

    sendOrderConfirmationEmail({
      to: email,
      orderId: order._id,
      orderDetails: {
        items: processedItems,
        total,
        shippingInfo: order.shippingInfo,
      },
    }).catch((emailError) => console.error("Email send failed:", emailError));

    res.status(201).json({
      message: "Order created successfully",
      orderId: order._id,
      order,
    });
  } catch (error) {
    console.error("Order Creation Error:", {
      message: error.message,
      stack: error.stack,
      body: req.body,
    });
    res.status(500).json({
      message: "Internal server error",
      error: "Unable to process order",
    });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    console.log("User in request:", req.user); // Debugging

    if (!req.user || !req.user._id) {
      return res.status(400).json({ message: "User ID not found in request" });
    }

    let orders;

    // Check if the user is an admin
    if (req.user.role === "admin") {
      orders = await Order.find({})
        .sort({ createdAt: -1 })
        .populate("user", "name email")
        .populate("items.product");
    } else {
      orders = await Order.find({ user: req.user._id })
        .sort({ createdAt: -1 })
        .populate("items.product");
    }

    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({
      message: "Error fetching orders",
      error: error.message,
    });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    console.log("User in request:", req.user); // Debugging

    if (!req.user || !req.user._id) {
      return res.status(400).json({ message: "User ID not found in request" });
    }

    const orders = await Order.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .populate("items.product");

    res.json(orders);
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({
      message: "Error fetching user orders",
      error: error.message,
    });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    order.status = status;
    await order.save();

    res.json(order);
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({
      message: "Error updating order status",
      error: error.message,
    });
  }
};
