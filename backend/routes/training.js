const express = require("express");
const Training = require("../models/Training");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const filter = req.query.all === "true" ? {} : { published: true };
    const items = await Training.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, count: items.length, data: items });
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const item = await Training.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: "Training not found" });
    res.json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
});

router.post("/", protect, async (req, res, next) => {
  try {
    const item = await Training.create(req.body);
    res.status(201).json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
});

router.put("/:id", protect, async (req, res, next) => {
  try {
    const item = await Training.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!item) return res.status(404).json({ success: false, message: "Training not found" });
    res.json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", protect, async (req, res, next) => {
  try {
    const item = await Training.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: "Training not found" });
    res.json({ success: true, message: "Training deleted" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
