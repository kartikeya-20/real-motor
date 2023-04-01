const mongoose = require("mongoose");

const carType = mongoose.Schema({
  image: {
    type: String
  },
  carType: {
    type: String
  }
});

module.exports = mongoose.model("cartype", carType);
