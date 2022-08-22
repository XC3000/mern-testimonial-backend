const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const testimonialSchema = new Schema({
  photo: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  post: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },

  active: {
    type: Number,
    required: true,
  },

  createdOn: {
    type: Date,
    required: true,
  },

  lastUpdatedOn: {
    type: Date,
    required: true,
  },
});

const Testimonials = mongoose.model("Testimonial", testimonialSchema);

module.exports = Testimonials;
