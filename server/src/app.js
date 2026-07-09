import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import motorcycleRoutes from "./routes/motorcycle.routes.js";
import maintenanceRoutes from "./routes/maintenance.routes.js";
import expenseRoutes from "./routes/expense.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Revion API is running",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/motorcycles", motorcycleRoutes);
app.use("/api/maintenance", maintenanceRoutes);
app.use("/api/expenses", expenseRoutes);

export default app;