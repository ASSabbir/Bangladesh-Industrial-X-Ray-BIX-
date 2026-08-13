const express = require("express");
const fs = require("fs");
const path = require("path");
const upload = require("../middleware/upload");
const { protect } = require("../middleware/auth");

const router = express.Router();

// @route  POST /api/upload            (admin only, single image)
// Field name must be "image". Returns a public URL under /uploads/...
router.post("/", protect, (req, res) => {
  upload.single("image")(req, res, (err) => {
    if (err) {
      return res.status(400).json({ success: false, message: err.message || "Upload failed" });
    }
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file was uploaded" });
    }
    const url = `/uploads/${req.file.filename}`;
    res.status(201).json({ success: true, url, filename: req.file.filename });
  });
});

// @route  POST /api/upload/multiple   (admin only, up to 10 images)
router.post("/multiple", protect, (req, res) => {
  upload.array("images", 10)(req, res, (err) => {
    if (err) {
      return res.status(400).json({ success: false, message: err.message || "Upload failed" });
    }
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: "No files were uploaded" });
    }
    const urls = req.files.map((f) => `/uploads/${f.filename}`);
    res.status(201).json({ success: true, urls });
  });
});

// @route  DELETE /api/upload/:filename    (admin only, removes an uploaded file)
router.delete("/:filename", protect, (req, res) => {
  const filename = path.basename(req.params.filename); // prevent path traversal
  const filePath = path.join(__dirname, "..", "uploads", filename);
  fs.unlink(filePath, (err) => {
    if (err && err.code !== "ENOENT") {
      return res.status(500).json({ success: false, message: "Failed to delete file" });
    }
    res.json({ success: true, message: "File deleted" });
  });
});

module.exports = router;
