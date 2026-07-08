import express from "express";

import { protect } from "../middleware/auth.middleware.js";

import {
  createMaintenance,
  getMaintenanceLogs,
  updateMaintenance,
  deleteMaintenance,
} from "../controllers/maintenance.controller.js";

const router = express.Router();

router.use(protect);

router.route("/")
  .post(createMaintenance)
  .get(getMaintenanceLogs);

router.route("/:id")
  .put(updateMaintenance)
  .delete(deleteMaintenance);

export default router;