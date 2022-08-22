const express = require("express");
const multer = require("multer");
const router = express.Router();

const {
  getTestimonials,
  getTestimonialsById,
  addTestimonial,
} = require("./testimonial.controller");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
});

router.get("/", getTestimonials);

router.get("/:id", getTestimonialsById);

router.post("/", upload.single("file"), addTestimonial);

module.exports = router;
