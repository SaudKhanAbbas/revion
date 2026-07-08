import express from "express";
import cors from "cors";

import dashboardRoutes from "./routes/dashboard.routes.js";
import authRoutes from "./routes/auth.routes.js";
import motorcycleRoutes from "./routes/motorcycle.routes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health Check
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Revion API is running",
    timestamp: new Date().toISOString(),
  });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/motorcycles", motorcycleRoutes);

export default app;