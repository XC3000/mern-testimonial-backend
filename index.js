const connection = require("./db");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const { errorHandler } = require("./middleware/errorMiddleware");
const app = express();

connection();
app.use(morgan("tiny"));

app.use(express.json());

// app.use(
//   express.urlencoded({
//     extended: false,
//   })
// );
app.use(cors());

app.use(express.static("public"));
app.use("/images", express.static("images"));

app.use("/api/testimonial", require("./testimonial/testimonial.routes"));
app.use("/api", (req, res) => {
  res.status(200).json({
    message: "Server Running",
  });
});

app.use(errorHandler);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}`));
