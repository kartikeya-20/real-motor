const mongoose = require("mongoose");

const banner = mongoose.Schema({
  image: {
    type: String
  }
});

module.exports = mongoose.model("banner", banner);
