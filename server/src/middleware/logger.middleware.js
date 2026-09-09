import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Directory for Revion backend server logs
const logDir = path.join(__dirname, "../../logs");
const logFilePath = path.join(logDir, "access.log");

// Ensure the log directory exists once at startup rather than on every request.
// fs.mkdirSync with recursive:true is safe to call if the directory already exists.
fs.mkdirSync(logDir, { recursive: true });

/**
 * Revion Access Logger Middleware
 *
 * Captures HTTP request metadata (method, URL, status, latency, authenticated
 * user) and writes a structured log entry to disk without blocking the
 * response. The log write is deferred through the Node.js event loop so that
 * the main thread remains free to serve subsequent requests.
 *
 * Execution order for each HTTP request:
 *
 *   1. Express invokes requestLogger (synchronous — runs on the call stack).
 *   2. A 'finish' listener is registered on the response object.
 *   3. next() passes control to the route handler.
 *   4. The route handler sends the HTTP response; the 'finish' event fires.
 *   5. Inside the 'finish' handler, processLogEntry() is called to build the
 *      log string — this is a regular function declaration that is hoisted,
 *      so it is callable above its textual position in this module.
 *   6. processLogEntry() uses queueMicrotask() to schedule the next step
 *      in Node's microtask queue. Microtasks are processed after the
 *      current JavaScript execution completes and between event-loop
 *      phases, making this suitable for lightweight follow-up work that
 *      should complete before the event loop continues to later phases.
 *   7. The microtask uses setImmediate() to schedule the actual disk write
 *      in the event loop's "check" phase. setImmediate() runs after pending
 *      I/O events have been processed in the current iteration of the event
 *      loop, which keeps log I/O from competing with in-flight request work.
 *   8. Inside the setImmediate callback, fs.appendFile() starts an
 *      asynchronous write on libuv's thread pool.
 *   9. When the OS confirms the write, libuv posts the completion and
 *      the fs.appendFile callback executes in a subsequent iteration of
 *      the event loop.
 */

// ─── Middleware entry point ──────────────────────────────────────────────────
// This arrow function is the Express middleware. It executes synchronously
// on the call stack when a request arrives.
export const requestLogger = (req, res, next) => {
  // Capture the start time synchronously — this runs on the call stack
  // as part of the current middleware execution.
  const startTime = Date.now();

  // Register a listener for the 'finish' event. The callback will fire
  // once Express has finished sending the HTTP response to the client.
  res.on("finish", () => {
    const durationMs = Date.now() - startTime;

    // processLogEntry is a function declaration defined below this export.
    // Function declarations are hoisted to the top of their module scope
    // during the compile phase, so processLogEntry is already available
    // here despite appearing later in the source text.
    processLogEntry(req, res, durationMs);
  });

  // Yield control to the next middleware or route handler.
  // Everything above ran synchronously on the call stack; no log I/O
  // has occurred, so request handling is not delayed.
  next();
};

// ─── Log processing (function declaration — hoisted) ─────────────────────────
// This function declaration is hoisted: the JavaScript engine registers it
// in the module scope before any code executes. That is why requestLogger
// (defined above) can reference processLogEntry before this point in the
// source file. Moving this function below the export keeps the middleware's
// public API at the top of the file while the internal implementation
// detail follows — a common Node.js readability pattern that relies on
// hoisting.
function processLogEntry(req, res, durationMs) {
  const timestamp = new Date().toISOString();
  const userIdentifier = req.user ? `User#${req.user._id}` : "Anonymous";

  const logLine =
    `[${timestamp}] ${req.method} ${req.originalUrl}` +
    ` | Status: ${res.statusCode}` +
    ` | Latency: ${durationMs}ms` +
    ` | ${userIdentifier}\n`;

  // Schedule log persistence via Node's microtask queue.
  // queueMicrotask() schedules work in Node's microtask queue, which is
  // processed after the current JavaScript execution completes and between
  // event-loop phases. Here it separates the synchronous string formatting
  // above from the I/O scheduling below, ensuring the formatted log line
  // is ready before we ask the event loop to commit it to disk.
  queueMicrotask(() => {
    // setImmediate() places the callback in the event loop's "check" phase.
    // This defers the filesystem write until after any pending I/O callbacks
    // from active request handling have been processed, keeping log writes
    // from contending with higher-priority network I/O in the same loop
    // iteration.
    setImmediate(() => {
      // fs.appendFile() performs asynchronous filesystem I/O so the
      // JavaScript execution thread is not synchronously blocked waiting
      // for the disk operation. The write runs on libuv's thread pool;
      // once the OS completes it, the callback below executes in a
      // subsequent iteration of the event loop.
      fs.appendFile(logFilePath, logLine, "utf8", (err) => {
        // This callback executes after the asynchronous I/O operation
        // finishes. If the write failed, the error is logged to stderr;
        // the failure is non-fatal because access logging must never
        // interrupt request serving.
        if (err) {
          console.error("Revion access log write failed:", err.message);
        }
      });
    });
  });
}
