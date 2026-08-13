const mongoose = require("mongoose");
const slugify = (str) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");

const EquipmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, unique: true },
    shortDescription: { type: String },
    description: { type: String },
    image: { type: String },
    images: [{ type: String }],
    specifications: [{ label: String, value: String }],
    features: [{ type: String }],
    workingPrinciple: { type: String },
    manufacturer: { type: String },
    model: { type: String },
    quantity: { type: String },
    category: { type: String },
    relatedServices: [{ type: mongoose.Schema.Types.ObjectId, ref: "Service" }],
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

EquipmentSchema.pre("validate", function (next) {
  if (this.name && !this.slug) this.slug = slugify(this.name) + "-" + Math.random().toString(36).slice(2, 6);
  next();
});

module.exports = mongoose.model("Equipment", EquipmentSchema);
