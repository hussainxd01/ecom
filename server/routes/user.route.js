import express from "express";
import {
  login,
  register,
  updateUser,
  getAllUsers,
} from "../controller/user.controller.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/", getAllUsers);
router.patch("/:id", updateUser);

export default router;
