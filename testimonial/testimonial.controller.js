const getTestimonials = (req, res) => {
  res.status(200).json({
    message: "get testimonial",
  });
};

const getTestimonialsById = (req, res) => {
  res.status(200).json({
    message: "get testimonial by id",
  });
};

const addTestimonial = (req, res) => {
  const { photo, name, post, description } = req.body;

  console.log(req.body);

  if (!photo || !name || !post || !description) {
    res.status(400);
    throw new Error("Please add all the fields");
  }

  console.log(photo, name, post, description);

  res.status(201).json({
    message: "add",
  });
};

module.exports = {
  getTestimonials,
  getTestimonialsById,
  addTestimonial,
};
