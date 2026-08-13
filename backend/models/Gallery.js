const mongoose = require("mongoose");

const GallerySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String },
    projectName: { type: String },
    date: { type: Date },
    service: { type: mongoose.Schema.Types.ObjectId, ref: "Service" },
    equipment: { type: mongoose.Schema.Types.ObjectId, ref: "Equipment" },
    project: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Gallery", GallerySchema);
