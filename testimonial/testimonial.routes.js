const express = require("express");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
var _ = require("lodash");
const router = express.Router();

const {
  getTestimonials,
  getTestimonialsById,
  addTestimonial,
  updateTestimonial,
  deleteTestimonial,
} = require("./testimonial.controller");

var limits = {
  files: 1, // allow only 1 file per request
  fileSize: 1024 * 1024, // 1 MB (max file size)
};

var fileFilter = function (req, file, cb) {
  // supported image file mimetypes
  var allowedMimes = ["image/jpeg", "image/pjpeg", "image/png", "image/gif"];

  if (_.includes(allowedMimes, file.mimetype)) {
    // allow supported image files
    cb(null, true);
  } else {
    // throw error for invalid files
    cb(
      new Error(
        "Invalid file type. Only jpg, png and gif image files are allowed."
      )
    );
  }
};

const DIR = "images";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, uuidv4() + "-" + fileName);
  },
});
var upload = multer({
  storage: storage,
  limits: limits,
  fileFilter: fileFilter,
});

router.get("/", getTestimonials);

router.get("/:id", getTestimonialsById);

router.post("/", upload.single("file"), addTestimonial);
router.put("/:id", upload.single("file"), updateTestimonial);
router.delete("/:id", deleteTestimonial);

module.exports = router;
