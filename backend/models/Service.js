const mongoose = require("mongoose");
const slugify = (str) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");

const ServiceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true },
    category: { type: String, default: "Non-Destructive Testing" },
    shortDescription: { type: String },
    introduction: { type: String },
    detailedDescription: { type: String },
    workingProcess: [{ title: String, description: String }],
    features: [{ type: String }],
    benefits: [{ type: String }],
    image: { type: String },
    bannerImage: { type: String },
    relatedEquipment: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Equipment" }],
      validate: {
        validator: function (arr) {
          return !arr || arr.length <= 4;
        },
        message: "A service can have at most 4 related equipment items.",
      },
      default: [],
    },
    relatedGallery: [{ type: mongoose.Schema.Types.ObjectId, ref: "Gallery" }],
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

ServiceSchema.pre("validate", function (next) {
  if (this.title && !this.slug) this.slug = slugify(this.title);
  next();
});

module.exports = mongoose.model("Service", ServiceSchema);