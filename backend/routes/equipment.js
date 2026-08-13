const express = require("express");
const Equipment = require("../models/Equipment");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const filter = req.query.all === "true" ? {} : { published: true };
    const equipment = await Equipment.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, count: equipment.length, data: equipment });
  } catch (err) {
    next(err);
  }
});

router.get("/:slug", async (req, res, next) => {
  try {
    const item = await Equipment.findOne({ slug: req.params.slug }).populate("relatedServices");
    if (!item) return res.status(404).json({ success: false, message: "Equipment not found" });
    res.json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
});

router.post("/", protect, async (req, res, next) => {
  try {
    const item = await Equipment.create(req.body);
    res.status(201).json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
});

router.put("/:id", protect, async (req, res, next) => {
  try {
    const item = await Equipment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!item) return res.status(404).json({ success: false, message: "Equipment not found" });
    res.json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", protect, async (req, res, next) => {
  try {
    const item = await Equipment.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: "Equipment not found" });
    res.json({ success: true, message: "Equipment deleted" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
