const mongoose = require("mongoose");

const brand = mongoose.Schema({
  image: {
    type: String
  },
  brandName: {
    type: String
  }
});

module.exports = mongoose.model("brand", brand);
