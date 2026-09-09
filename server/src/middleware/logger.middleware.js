import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logDir = path.join(__dirname, "../../logs");
const logFilePath = path.join(logDir, "access.log");

fs.mkdirSync(logDir, { recursive: true });

export const requestLogger = (req, res, next) => {
  const startTime = Date.now();

  res.on("finish", () => {
    const durationMs = Date.now() - startTime;
    processLogEntry(req, res, durationMs);
  });

  next();
};

function processLogEntry(req, res, durationMs) {
  const timestamp = new Date().toISOString();
  const userIdentifier = req.user ? `User#${req.user._id}` : "Anonymous";

  const logLine =
    `[${timestamp}] ${req.method} ${req.originalUrl}` +
    ` | Status: ${res.statusCode}` +
    ` | Latency: ${durationMs}ms` +
    ` | ${userIdentifier}\n`;

  queueMicrotask(() => {
    setImmediate(() => {
      fs.appendFile(logFilePath, logLine, "utf8", (err) => {
        if (err) {
          console.error("Revion access log write failed:", err.message);
        }
      });
    });
  });
}
