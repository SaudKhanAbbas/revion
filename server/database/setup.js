import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from server/.env
dotenv.config({ path: path.join(__dirname, "../.env") });

import pool from "../src/config/postgres.js";

async function setupDatabase() {
  console.log("🚀 Initializing Revion PostgreSQL database setup...");

  try {
    const schemaPath = path.join(__dirname, "schema.sql");
    const seedPath = path.join(__dirname, "seed.sql");

    const schemaSql = fs.readFileSync(schemaPath, "utf8");
    const seedSql = fs.readFileSync(seedPath, "utf8");

    // Execute schema.sql
    console.log("📋 Executing database schema (schema.sql)...");
    await pool.query(schemaSql);
    console.log("✅ Schema created successfully.");

    // Execute seed.sql
    console.log("🌱 Executing database seed data (seed.sql)...");
    await pool.query(seedSql);
    console.log("✅ Seed data inserted successfully.");

    console.log("🎉 Revion PostgreSQL database setup completed successfully!");
  } catch (error) {
    console.error("❌ Database setup failed:");
    console.error("Message:", error.message || "(No error message provided)");
    if (error.code) console.error("Code:", error.code);
    if (error.detail) console.error("Detail:", error.detail);
    if (error.stack) console.error("Stack:", error.stack);
    console.error("Full Error Object:", error);
    process.exitCode = 1;
  } finally {
    // Gracefully close connection pool
    await pool.end();
    console.log("🔌 PostgreSQL connection pool closed cleanly.");
  }
}

setupDatabase();
