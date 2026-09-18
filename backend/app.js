require("dotenv").config();
const express = require("express");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middleware/errorHandler");

const app = express();

// --- Global middleware ---
app.use(helmet());

const isLocalhostOrigin = (origin) => /^https?:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (process.env.NODE_ENV === "production") {
        return origin === process.env.CLIENT_URL
          ? callback(null, true)
          : callback(new Error("Not allowed by CORS"));
      }
      if (isLocalhostOrigin(origin)) return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Ensure MongoDB is actually connected before any route runs. On a
// serverless cold start, without this a request could reach Service.find()
// before the connection finishes, causing Mongoose's command buffer to
// silently wait and eventually time out ("buffering timed out after
// 10000ms") instead of surfacing the real underlying problem (e.g. Atlas
// blocking the connection). connectDB() is cheap to call repeatedly — it
// returns immediately once already connected (see config/db.js).
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    next(err);
  }
});

app.use(
  "/uploads",
  (req, res, next) => {
    res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
    next();
  },
  express.static(path.join(__dirname, "uploads"))
);

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use("/api", apiLimiter);

// --- Routes ---
app.get("/", (req, res) => {
  res.json({ success: true, message: "BIX API server. See /api for available endpoints." });
});

app.get("/api", (req, res) => {
  res.json({ success: true, message: "BIX Corporate Website API is running" });
});

app.use("/api/auth", require("./routes/auth"));
app.use("/api/services", require("./routes/services"));
app.use("/api/equipment", require("./routes/equipment"));
app.use("/api/gallery", require("./routes/gallery"));
app.use("/api/projects", require("./routes/projects"));
app.use("/api/training", require("./routes/training"));
app.use("/api/contact", require("./routes/contact"));
app.use("/api/upload", require("./routes/upload"));

// --- Serve the built frontend, ONLY if it's actually present next to this
// file (true for a combined VPS/cPanel deployment; false when the backend
// is deployed on its own, e.g. on Vercel with the frontend hosted
// separately). Guarded with an existence check so a backend-only
// deployment never crashes trying to serve a folder that isn't there. ---
const frontendDist = path.join(__dirname, "..", "frontend", "dist");
if (process.env.NODE_ENV === "production" && fs.existsSync(frontendDist)) {
  app.use(express.static(frontendDist));
  app.get("*", (req, res, next) => {
    if (req.path.startsWith("/api") || req.path.startsWith("/uploads")) return next();
    res.sendFile(path.join(frontendDist, "index.html"));
  });
}

// --- Error handling ---
app.use(notFound);
app.use(errorHandler);

module.exports = app;