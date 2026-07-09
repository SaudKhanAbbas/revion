import express from "express";

import { protect } from "../middleware/auth.middleware.js";
import { diagnoseMotorcycle } from "../controllers/diagnosis.controller.js";

const router = express.Router();

router.use(protect);

router.post("/", diagnoseMotorcycle);

export default router;