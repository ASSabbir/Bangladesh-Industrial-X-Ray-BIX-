require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middleware/errorHandler");

const app = express();

// --- Connect to MongoDB ---
connectDB();

// --- Global middleware ---
app.use(helmet());

const isLocalhostOrigin = (origin) =>
  /^https?:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin);

app.use(
  cors({
    origin: (origin, callback) => {
      console.log("CORS DEBUG:", {
        origin,
        NODE_ENV: process.env.NODE_ENV,
        CLIENT_URL: process.env.CLIENT_URL,
        isLocalhost: origin ? isLocalhostOrigin(origin) : null,
      });

      if (!origin) {
        return callback(null, true);
      }

      if (process.env.NODE_ENV === "production") {
        return origin === process.env.CLIENT_URL
          ? callback(null, true)
          : callback(new Error("Not allowed by CORS"));
      }

      if (isLocalhostOrigin(origin)) {
        return callback(null, true); 
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Serve uploaded images. helmet blocks cross-origin image loading by default
// (needed since the frontend runs on a different port during dev), so we
// relax that one header just for this static route.
app.use(
  "/uploads",
  (req, res, next) => {
    res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
    next();
  },
  express.static(path.join(__dirname, "uploads")),
);

// Basic rate limiting for API routes (security requirement from SRS section 24)
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use("/api", apiLimiter);

// --- Routes ---
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

// --- Serve the built frontend in production (single-domain deployment) ---
// After `npm run build` in /frontend, the static files live in
// ../frontend/dist relative to this file. Serving them from the same
// Express app means one domain, no CORS, and /uploads paths resolve
// correctly without any extra origin logic on the frontend.
if (process.env.NODE_ENV === "production") {
  const frontendDist = path.join(__dirname, "..", "frontend", "dist");
  app.use(express.static(frontendDist));

  // Anything that isn't /api or /uploads falls through to index.html so
  // React Router can handle client-side routes like /services/paut.
  app.get("*", (req, res, next) => {
    if (req.path.startsWith("/api") || req.path.startsWith("/uploads"))
      return next();
    res.sendFile(path.join(frontendDist, "index.html"));
  });
}

// --- Error handling ---
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`BIX backend server running on port ${PORT}`);
});
