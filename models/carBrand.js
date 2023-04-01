const mongoose = require("mongoose");

const brand = mongoose.Schema({
  image: {
    type: String
  },
  brandName: {
    type: String
  },
  isActive: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model("brand", brand);
