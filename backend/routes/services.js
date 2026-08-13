const express = require("express");
const Service = require("../models/Service");
const { protect } = require("../middleware/auth");

const router = express.Router();

// @route  GET /api/services            (public list, published only unless admin)
router.get("/", async (req, res, next) => {
  try {
    const filter = req.query.all === "true" ? {} : { published: true };
    const services = await Service.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, count: services.length, data: services });
  } catch (err) {
    next(err);
  }
});

// @route  GET /api/services/:slug      (public detail by slug, with relations populated)
router.get("/:slug", async (req, res, next) => {
  try {
    const service = await Service.findOne({ slug: req.params.slug })
      .populate("relatedEquipment")
      .populate("relatedGallery");
    if (!service) return res.status(404).json({ success: false, message: "Service not found" });
    res.json({ success: true, data: service });
  } catch (err) {
    next(err);
  }
});

// @route  POST /api/services           (admin only)
router.post("/", protect, async (req, res, next) => {
  try {
    const service = await Service.create(req.body);
    res.status(201).json({ success: true, data: service });
  } catch (err) {
    next(err);
  }
});

// @route  PUT /api/services/:id        (admin only)
router.put("/:id", protect, async (req, res, next) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!service) return res.status(404).json({ success: false, message: "Service not found" });
    res.json({ success: true, data: service });
  } catch (err) {
    next(err);
  }
});

// @route  DELETE /api/services/:id     (admin only)
router.delete("/:id", protect, async (req, res, next) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) return res.status(404).json({ success: false, message: "Service not found" });
    res.json({ success: true, message: "Service deleted" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
