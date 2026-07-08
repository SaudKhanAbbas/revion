import express from "express";

import { protect } from "../middleware/auth.middleware.js";

import {
  createMotorcycle,
  getMotorcycles,
  getMotorcycle,
  updateMotorcycle,
  deleteMotorcycle,
} from "../controllers/motorcycle.controller.js";

const router = express.Router();

router.use(protect);

router.route("/")
  .post(createMotorcycle)
  .get(getMotorcycles);

router.route("/:id")
  .get(getMotorcycle)
  .put(updateMotorcycle)
  .delete(deleteMotorcycle);

export default router;