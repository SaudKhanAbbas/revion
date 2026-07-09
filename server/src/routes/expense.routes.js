import express from "express";

import { protect } from "../middleware/auth.middleware.js";

import {
  createExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
} from "../controllers/expense.controller.js";

const router = express.Router();

router.use(protect);

router.route("/")
  .post(createExpense)
  .get(getExpenses);

router.route("/:id")
  .put(updateExpense)
  .delete(deleteExpense);

export default router;