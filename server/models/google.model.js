// models/googleUser.js
import mongoose from "mongoose";

const googleUserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const GoogleUser = mongoose.model("GoogleUser", googleUserSchema);

export default GoogleUser;
