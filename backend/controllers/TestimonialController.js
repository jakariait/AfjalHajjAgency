const TestimonialService = require("../services/TestimonialService");

exports.createTestimonial = async (req, res) => {
  try {
    const testimonial = await TestimonialService.createTestimonial(req.body);
    res.status(201).json(testimonial);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await TestimonialService.getAllTestimonials();
    res.status(200).json(testimonials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTestimonialById = async (req, res) => {
  try {
    const testimonial = await TestimonialService.getTestimonialById(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ message: "Testimonial not found" });
    }
    res.status(200).json(testimonial);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateTestimonial = async (req, res) => {
  try {
    const testimonial = await TestimonialService.updateTestimonial(
      req.params.id,
      req.body,
    );
    if (!testimonial) {
      return res.status(404).json({ message: "Testimonial not found" });
    }
    res.status(200).json(testimonial);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await TestimonialService.deleteTestimonial(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ message: "Testimonial not found" });
    }
    res.status(200).json({ message: "Testimonial deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};