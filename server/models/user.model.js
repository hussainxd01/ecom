import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First name is required"],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: [6, "Password must be at least 6 characters"],
  },
  phone: {
    type: String,
    trim: true,
  },
  addresses: [
    {
      street: String,
      city: String,
      state: String,
      country: String,
      zipCode: String,
      isDefault: Boolean,
    },
  ],
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cart",
    total: {
      type: Number,
      default: 0,
    },
  },
  wishlist: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
  refreshToken: {
    type: String,
  },
  passwordResetToken: String,
  passwordResetExpires: Date,
  emailVerified: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Add cart-related methods
userSchema.methods.addToCart = async function (productId, quantity = 1) {
  const existingItem = this.cart.items.find(
    (item) => item.product.toString() === productId.toString()
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    this.cart.items.push({ product: productId, quantity });
  }

  // Recalculate total
  await this.populate("cart.items.product");
  this.cart.total = this.cart.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return this.save();
};

userSchema.methods.removeFromCart = async function (productId) {
  this.cart.items = this.cart.items.filter(
    (item) => item.product.toString() !== productId.toString()
  );

  // Recalculate total
  await this.populate("cart.items.product");
  this.cart.total = this.cart.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return this.save();
};

userSchema.methods.updateCartItemQuantity = async function (
  productId,
  quantity
) {
  const cartItem = this.cart.items.find(
    (item) => item.product.toString() === productId.toString()
  );

  if (cartItem) {
    cartItem.quantity = quantity;
  }

  // Recalculate total
  await this.populate("cart.items.product");
  this.cart.total = this.cart.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return this.save();
};

userSchema.methods.clearCart = function () {
  this.cart.items = [];
  this.cart.total = 0;
  return this.save();
};

const User = mongoose.model("User", userSchema);
export default User;
