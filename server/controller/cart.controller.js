import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";
import { isValidObjectId } from "mongoose";

// Validate inputs for cart operations
const validateCartInput = async (userId, productId, size) => {
  if (!userId || !isValidObjectId(userId)) {
    throw new Error("Valid user ID is required");
  }
  if (!productId || !isValidObjectId(productId)) {
    throw new Error("Valid product ID is required");
  }
  if (!size) {
    throw new Error("Size is required");
  }

  // Verify product exists and has the selected size
  const product = await Product.findById(productId);
  if (!product) {
    throw new Error("Product not found");
  }
  if (!product.sizes.includes(size)) {
    throw new Error("Invalid size selected for this product");
  }
};

// Add to cart function
const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity = 1 } = req.body;

    // Handle nested productId object
    const actualProductId = productId.productId || productId;
    const size = productId.selectedSize || req.body.size;

    // Validate userId
    if (!userId || !isValidObjectId(userId)) {
      return res.status(400).json({ message: "Valid user ID is required" });
    }

    // Validate productId
    if (!actualProductId || !isValidObjectId(actualProductId)) {
      return res.status(400).json({ message: "Valid product ID is required" });
    }

    // Validate size
    if (!size) {
      return res.status(400).json({ message: "Size is required" });
    }

    // Verify product exists and has the selected size
    const product = await Product.findById(actualProductId);
    if (!product) {
      return res.status(400).json({ message: "Product not found" });
    }
    if (!product.sizes.includes(size)) {
      return res
        .status(400)
        .json({ message: "Invalid size selected for this product" });
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = await Cart.create({
        user: userId,
        items: [{ product: actualProductId, quantity, size }],
      });
    } else {
      const existingItem = cart.items.find(
        (item) =>
          item.product.toString() === actualProductId && item.size === size
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ product: actualProductId, quantity, size });
      }
    }

    await cart.populate("items.product");
    cart.total = cart.items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Cart quantity update
const updateQuantity = async (req, res) => {
  try {
    const { userId, productId, quantity, size } = req.body;

    // Validate inputs
    await validateCartInput(userId, productId, size);

    // Validate quantity
    if (!Number.isInteger(quantity) || quantity < 0) {
      return res
        .status(400)
        .json({ message: "Quantity must be a non-negative integer" });
    }

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const cartItem = cart.items.find(
      (item) => item.product.toString() === productId && item.size === size
    );

    if (!cartItem) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    if (quantity === 0) {
      // Remove item if quantity is 0
      cart.items = cart.items.filter(
        (item) => !(item.product.toString() === productId && item.size === size)
      );
    } else {
      cartItem.quantity = quantity;
    }

    await cart.populate("items.product");
    cart.total = cart.items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Clear cart
const clearCart = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId || !isValidObjectId(userId)) {
      return res.status(400).json({ message: "Valid user ID is required" });
    }

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = [];
    cart.total = 0;
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get cart
const getCart = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId || !isValidObjectId(userId)) {
      return res.status(400).json({ message: "Valid user ID is required" });
    }

    const cart = await Cart.findOne({ user: userId }).populate("items.product");
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Remove from cart
const removeFromCart = async (req, res) => {
  try {
    const { userId, productId, size } = req.body;

    // Validate inputs
    await validateCartInput(userId, productId, size);

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      (item) => !(item.product.toString() === productId && item.size === size)
    );

    await cart.populate("items.product");
    cart.total = cart.items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export { addToCart, updateQuantity, clearCart, getCart, removeFromCart };
