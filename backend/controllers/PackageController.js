const packageService = require("../services/PackageService");

exports.createPackage = async (req, res) => {
  try {
    const newPackage = await packageService.createPackage(req.body);
    res.status(201).json(newPackage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllPackages = async (req, res) => {
  try {
    const packages = await packageService.getAllPackages();
    res.status(200).json(packages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPackageById = async (req, res) => {
  try {
    const packageItem = await packageService.getPackageById(req.params.id);
    if (!packageItem) {
      return res.status(404).json({ message: "Package not found" });
    }
    res.status(200).json(packageItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updatePackage = async (req, res) => {
  try {
    const updatedPackage = await packageService.updatePackage(
      req.params.id,
      req.body,
    );
    if (!updatedPackage) {
      return res.status(404).json({ message: "Package not found" });
    }
    res.status(200).json(updatedPackage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deletePackage = async (req, res) => {
  try {
    const deletedPackage = await packageService.deletePackage(req.params.id);
    if (!deletedPackage) {
      return res.status(404).json({ message: "Package not found" });
    }
    res.status(200).json({ message: "Package deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
