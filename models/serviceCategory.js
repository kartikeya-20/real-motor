const mongoose = require("mongoose");

const serviceCategory = mongoose.Schema({
  categoryName: {
    type: String
  },
  icon: {
    type: String
  }
});

module.exports = mongoose.model("serviceCategory", serviceCategory);
