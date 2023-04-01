const mongoose = require("mongoose");

const service = mongoose.Schema({
  title: {
    type: String
  },
  service: [{
    type: String
  }],
  image: {
    type: String
  },
  icon: {
    type: String
  },
});

module.exports = mongoose.model("RegulerServices", service);
