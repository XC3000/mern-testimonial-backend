const Testimonials = require("./testimonial.model");

const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonials.find({
      active: 1,
    }).exec();
    res.status(200).json({
      message: "Fetched",
      testimonials,
    });
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
    photo: req.file.filename,
    name,
    post,
    description,
    active: 1,
    createdOn: Date.now(),
    lastUpdatedOn: Date.now(),
  });

  try {
    const savedTestimonial = await newTestimonial.save();

    console.log(savedTestimonial);

    res.status(201).json({
      success: true,
      message: "added testimonial",
    });
  } catch (error) {
    console.log(error);
    throw new Error("Some Error Occured while adding");
  }
};

const updateTestimonial = async (req, res) => {
  const { name, post, description } = req.body;

  console.log(req.body);

  if (!name || !post || !description || !req.file) {
    res.status(400);
    throw new Error("Please add all the fields");
  }

  try {
    const foundTestimonial = await Testimonials.findById(req.params.id);

    if (foundTestimonial) {
      foundTestimonial.name = name;
      foundTestimonial.post = post;
      foundTestimonial.description = description;
      foundTestimonial.photo = req.file.filename;
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
