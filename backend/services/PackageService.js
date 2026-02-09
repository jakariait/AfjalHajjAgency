const PackageModel = require("../models/PackageModel");

exports.createPackage = async (packageData) => {
  return await PackageModel.create(packageData);
};

exports.getAllPackages = async () => {
  return await PackageModel.find();
};

exports.getPackageById = async (id) => {
  return await PackageModel.findById(id);
};

exports.updatePackage = async (id, packageData) => {
  return await PackageModel.findByIdAndUpdate(id, packageData, { new: true });
};

exports.deletePackage = async (id) => {
  return await PackageModel.findByIdAndDelete(id);
};
