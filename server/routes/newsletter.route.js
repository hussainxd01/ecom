import express from "express";
import {
  fetchAllNewsletters,
  createNewsletter,
} from "../controller/newsletter.controller.js";

const router = express.Router();

router.get("/", fetchAllNewsletters);
router.post("/", createNewsletter);
export default router;
