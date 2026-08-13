const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
  {
    projectName: { type: String, required: true },
    clientName: { type: String },
    contractorName: { type: String },
    location: { type: String },
    summary: { type: String },
    workCategory: { type: String },
    yearOfExecution: { type: String },
    images: [{ type: String }],
    videos: [{ type: String }],
    relatedServices: [{ type: mongoose.Schema.Types.ObjectId, ref: "Service" }],
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", ProjectSchema);
