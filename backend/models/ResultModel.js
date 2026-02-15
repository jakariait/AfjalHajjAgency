const mongoose = require("mongoose");

const DataSchema = mongoose.Schema(
  {
    imgSrc: { type: String, required: true },
    description: { type: String,  },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const ResultModel = mongoose.model("Result", DataSchema);

module.exports = ResultModel;