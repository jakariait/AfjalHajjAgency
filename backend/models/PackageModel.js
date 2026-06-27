const mongoose = require("mongoose");

const generateSlug = (text) => {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^\u0980-\u09FFa-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

const DataSchema = mongoose.Schema(
  {
    // Basic
    title: { type: String, required: true },
    slug: { type: String, unique: true },
    type: { type: String, required: true },
    year: { type: String },

    // Pricing
    price: { type: String, required: true },
    priceWithQurbani: { type: String },
    priceWithoutQurbani: { type: String },

    // Duration & Travel
    duration: { type: String },
    flightInfo: { type: String },

    // Package tier
    tier: { type: String, enum: ["standard", "premium", "economy"], required: true, default: "standard" },

    // Detailed info
    specialFeatures: { type: [String] },
    journeyDetails: { type: String },
    note: { type: String },

    // Accommodation
    accommodationMakkah: { type: String },
    accommodationMedina: { type: String },
    roomFacilities: { type: [String] },

    // Food
    foodArrangements: { type: String },

    // Services
    includedServices: { type: String },
    transportation: { type: String },
    ziyarat: { type: String },
    guidanceService: { type: String },
    religiousEducation: { type: String },
    supervision: { type: String },

    // Flags
    showOnHomePage: { type: Boolean, default: false, required: true },

    // Disclaimer
    specialNote: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

DataSchema.pre("validate", async function (next) {
  if (this.isModified("title") || !this.slug) {
    let baseSlug = generateSlug(this.title);
    if (!baseSlug) {
      baseSlug = `package-${this._id}`;
    }
    let slug = baseSlug;
    let counter = 1;
    const Model = mongoose.model("Package");
    while (await Model.findOne({ slug, _id: { $ne: this._id } })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }
    this.slug = slug;
  }
  next();
});

const PackageModel = mongoose.model("Package", DataSchema);

module.exports = PackageModel;
