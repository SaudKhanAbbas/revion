import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Directory for Revion backend server logs
const logDir = path.join(__dirname, "../../logs");
const logFilePath = path.join(logDir, "access.log");

/**
 * ============================================================================
 * CONCEPT DEMONSTRATION & TECHNICAL COMPARISON:
 * ----------------------------------------------------------------------------
 * 1. JAVASCRIPT EVENT LOOP (`setImmediate`):
 *    In Node.js, `setImmediate()` schedules execution of a callback in the "Check"
 *    phase of the Event Loop tick.
 *    By wrapping request observability log creation inside `setImmediate`, we defer
 *    non-critical disk write operations until after the current Event Loop tick
 *    finishes delivering the HTTP response to the client. This guarantees zero
 *    latency overhead for Revion users.
 *
 * 2. JAVASCRIPT HOISTING:
 *    The function `processLogEntry()` below is called inside `requestLogger` (at the top
 *    of the module logic), yet its function declaration (`function processLogEntry(...)`)
 *    is placed at the bottom of this file. In JavaScript, function declarations are
 *    hoisted to the top of their enclosing scope during the compilation phase, making
 *    them accessible anywhere in that scope prior to their execution.
 *
 * 3. PROMISES VS CALLBACKS (Node.js I/O):
 *    - Callback-based API (`fs.appendFile(path, data, callback)`):
 *      Executes I/O on libuv worker pool threads. When completed, pushes the callback
 *      to the Event Loop I/O queue. Does not block the main thread.
 *    - Promise-based API (`fs.promises.appendFile` / `async/await`):
 *      Wraps the libuv thread pool operation inside a JavaScript Promise, allowing
 *      usage of `await` syntactic sugar.
 *    - Synchronous API (`fs.appendFileSync` - NOT USED HERE):
 *      Blocks the main JavaScript single thread until the disk write completes,
 *      freezing incoming HTTP request handling across the entire server.
 * ============================================================================
 */

export const requestLogger = (req, res, next) => {
  const startTime = Date.now();

  res.on("finish", () => {
    const durationMs = Date.now() - startTime;

    // Use setImmediate to execute background log formatting on the Check phase of the Event Loop
    setImmediate(() => {
      // NATURAL HOISTING DEMONSTRATION:
      // Calling processLogEntry() before its lexical function declaration below
      processLogEntry(req, res, durationMs);
    });
  });

  next();
};

/**
 * Hoisted Function Declaration
 * Formats request details and performs non-blocking callback-based log appending.
 */
function processLogEntry(req, res, durationMs) {
  const timestamp = new Date().toISOString();
  const userIdentifier = req.user ? `User#${req.user._id}` : "Anonymous";
  const logLine = `[${timestamp}] ${req.method} ${req.originalUrl} | Status: ${res.statusCode} | Latency: ${durationMs}ms | ${userIdentifier}\n`;

  // Asynchronous callback-based Node.js filesystem API (Non-blocking)
  fs.mkdir(logDir, { recursive: true }, (mkdirErr) => {
    if (mkdirErr) {
      console.error("Failed to create log directory:", mkdirErr);
      return;
    }

    fs.appendFile(logFilePath, logLine, "utf8", (appendErr) => {
      if (appendErr) {
        console.error("Failed to write to access.log via callback:", appendErr);
      }
    });
  });
}
