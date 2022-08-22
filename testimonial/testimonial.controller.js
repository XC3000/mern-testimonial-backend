const fs = require("fs");
var path = require("path");
var rimraf = require("rimraf");
const Testimonials = require("./testimonial.model");

const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonials.find({
      active: 1,
    }).exec();
    res.status(200).json(testimonials);
  } catch (error) {
    throw new Error("Some Error Occured");
  }
};

const getTestimonialsById = async (req, res) => {
  try {
    const testimonialById = await Testimonials.findById(req.params.id);
    if (testimonialById) {
      res.status(200).json({
        message: "Fetched",
        testimonialById,
      });
    } else {
      res.status(200).json({
        message: "testimonial with that id not found",
      });
    }
  } catch (error) {
    throw new Error("Some Error Occured");
  }
};

const addTestimonial = async (req, res) => {
  const { name, post, description } = req.body;
  if (!name || !post || !description) {
    res.status(400);
    throw new Error("Please add all the fields");
  }
  const newTestimonial = new Testimonials({
    photo: `images/${req.file.filename}`,
    name,
    post,
    description,
    active: 1,
    createdOn: Date.now(),
    lastUpdatedOn: Date.now(),
  });
  try {
    const savedTestimonial = await newTestimonial.save();
    res.status(201).json({
      success: true,
      message: "added successfully",
      data: savedTestimonial,
    });
  } catch (error) {
    console.log(error);
    throw new Error("Some Error Occured while adding");
  }
};

const updateTestimonial = async (req, res) => {
  const { name, post, description } = req.body;

  if (!name || !post || !description || !req.file) {
    res.status(400);
    throw new Error("Please add all the fields");
  }

  try {
    const foundTestimonial = await Testimonials.findById(req.params.id);

    if (foundTestimonial) {
      fs.unlink(path.normalize(`./${foundTestimonial.photo}`), (err) => {
        if (err) console.log(err);
      });

      foundTestimonial.name = name;
      foundTestimonial.post = post;
      foundTestimonial.description = description;
      foundTestimonial.photo = `images/${req.file.filename}`;
      foundTestimonial.lastUpdatedOn = Date.now();

      const savedTestimonial = await foundTestimonial.save();

      res.status(201).json({
        success: true,
        message: "updated",
        testimonial: savedTestimonial,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "id not found",
      });
    }
  } catch (error) {
    throw new Error("Some Error Occured while updating");
  }
};

const deleteTestimonial = async (req, res) => {
  try {
    const foundTestimonial = await Testimonials.findById(req.params.id);

    if (foundTestimonial) {
      foundTestimonial.active = 0;
      foundTestimonial.lastUpdatedOn = Date.now();

      const savedTestimonial = await foundTestimonial.save();

      res.status(201).json({
        success: true,
        message: "testimonial deleted successfully",
        testimonial: savedTestimonial,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "id not found",
      });
    }
  } catch (error) {
    throw new Error("Some Error Occured while updating");
  }
};

module.exports = {
  getTestimonials,
  getTestimonialsById,
  addTestimonial,
  updateTestimonial,
  deleteTestimonial,
};
