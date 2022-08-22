const mongoose = require("mongoose");
require("dotenv").config();

const uri = process.env.MONGO_URI;

module.exports = async () => {
  try {
    const connectParams = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    await mongoose.connect(uri, connectParams);
    console.log("Connected to DB");
  } catch (error) {
    console.log("NOt connected to DB");
    console.log(error);
  }
};
