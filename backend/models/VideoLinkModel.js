const mongoose = require("mongoose");

const DataSchema = mongoose.Schema(
  {
    videoLink: { type: String, required: true },
    showOnHomePage: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const VideoLinkModel = mongoose.model("VideoLink", DataSchema);

module.exports = VideoLinkModel;
