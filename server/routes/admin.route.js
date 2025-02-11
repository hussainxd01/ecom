import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { adminProtect } from "../middleware/admin.middleware.js";

const router = express.Router();

router.get("/dashboard", protect, adminProtect, (req, res) => {
  res.json({ message: "Welcome to the admin dashboard" });
});

export default router;
