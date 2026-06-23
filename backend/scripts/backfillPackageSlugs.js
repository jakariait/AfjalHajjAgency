const mongoose = require("mongoose");
const PackageModel = require("../models/PackageModel");

const MONGODB_URI = "";

const backfillSlugs = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    const packages = await PackageModel.find({});
    console.log(`Found ${packages.length} packages`);

    for (const pkg of packages) {
      pkg.slug = undefined;
      await pkg.save();
      console.log(`  ✓ Generated slug "${pkg.slug}" for "${pkg.title}"`);
    }

    console.log("Backfill complete!");
    process.exit(0);
  } catch (error) {
    console.error("Backfill failed:", error);
    process.exit(1);
  }
};

backfillSlugs();
