const mongoose = require("mongoose");

const DataSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    price: { type: String, required: true },
    type: { type: String, required: true },
    feature: { type: [String], required: true },
    featured: { type: Boolean, default: false, required: true },
    showOnHomePage: { type: Boolean, default: false, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const PackageModel = mongoose.model("Package", DataSchema);

module.exports = PackageModel;
