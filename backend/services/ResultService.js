const fs = require('fs').promises;
const path = require('path');
const CarouselModel = require("../models/ResultModel");

// Create Carousel

const createCarousel = async (imgSrc) => {
  return await CarouselModel.create({ imgSrc });
};

// Get All Carousel

const getAllCarousels = async () => {
  return await CarouselModel.find();
};

// Delete Carousel

const deleteCarousel = async (id) => {
  const carousel = await CarouselModel.findById(id);
  if (!carousel) {
    return null; // Carousel not found
  }

  const imagePath = path.join(__dirname, '..', 'uploads', carousel.imgSrc);

  try {
    await fs.unlink(imagePath);
    console.log(`Successfully deleted image: ${imagePath}`);
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log(`Image file not found, skipping deletion: ${imagePath}`);
    } else {
      console.error(`Error deleting image file ${imagePath}:`, error);
      // Depending on requirements, you might want to throw the error or return null here
      // if the database entry should not be deleted without the file being deleted.
    }
  }

  return await CarouselModel.findByIdAndDelete(id);
};

module.exports = {
  createCarousel,
  getAllCarousels,
  deleteCarousel,
};