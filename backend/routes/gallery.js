const express = require("express");
const Gallery = require("../models/Gallery");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const filter = req.query.all === "true" ? {} : { published: true };
    if (req.query.service) filter.service = req.query.service;
    if (req.query.equipment) filter.equipment = req.query.equipment;
    if (req.query.project) filter.project = req.query.project;
    if (req.query.category) filter.category = req.query.category;
    const items = await Gallery.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, count: items.length, data: items });
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const item = await Gallery.findById(req.params.id)
      .populate("service")
      .populate("equipment")
      .populate("project");
    if (!item) return res.status(404).json({ success: false, message: "Gallery item not found" });
    res.json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
});

router.post("/", protect, async (req, res, next) => {
  try {
    const item = await Gallery.create(req.body);
    res.status(201).json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
});

router.put("/:id", protect, async (req, res, next) => {
  try {
    const item = await Gallery.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!item) return res.status(404).json({ success: false, message: "Gallery item not found" });
    res.json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", protect, async (req, res, next) => {
  try {
    const item = await Gallery.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: "Gallery item not found" });
    res.json({ success: true, message: "Gallery item deleted" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;