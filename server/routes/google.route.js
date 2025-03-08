import express from "express";
import googleUserController from "../controller/google.controller.js";
const router = express.Router();

router.post("/auth-02", googleUserController.createUser);
router.get("google-all", googleUserController.getAllUsers);

export default router;
