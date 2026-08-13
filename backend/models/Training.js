const mongoose = require("mongoose");

const TrainingSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    image: { type: String },
    courseDescription: { type: String },
    details: { type: String },
    schedule: { type: String },
    duration: { type: String },
    certificationInfo: { type: String },
    gallery: [{ type: String }],
    contactInfo: { type: String },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Training", TrainingSchema);
