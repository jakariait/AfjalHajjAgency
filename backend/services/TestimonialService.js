const TestimonialModel = require("../models/TestimonialModel");

exports.createTestimonial = async (data) => {
  return await TestimonialModel.create(data);
};

exports.getAllTestimonials = async () => {
  return await TestimonialModel.find();
};

exports.getTestimonialById = async (id) => {
  return await TestimonialModel.findById(id);
};

exports.updateTestimonial = async (id, data) => {
  return await TestimonialModel.findByIdAndUpdate(id, data, { new: true });
};

exports.deleteTestimonial = async (id) => {
  return await TestimonialModel.findByIdAndDelete(id);
};