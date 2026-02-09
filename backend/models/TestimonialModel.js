const mongoose = require("mongoose");

const DataSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    category: { type: String, required: true },
    review: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const TestimonialModel = mongoose.model("Testimonial", DataSchema);

module.exports = TestimonialModel;
