import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import {
  getServiceGuides,
  getServiceGuidesByCategory,
  getServiceCategories,
} from "../controllers/serviceGuide.controller.js";

const router = express.Router();

// Require authentication for service guide catalog APIs
router.use(protect);

router.get("/", getServiceGuides);
router.get("/categories", getServiceCategories);
router.get("/category/:categoryId", getServiceGuidesByCategory);

export default router;
