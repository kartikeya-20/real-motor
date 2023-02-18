const mongoose = require("mongoose");

const carModel = mongoose.Schema({
  image: {
    type: String
  },
  modelName: {
    type: String
  },
  carBrandId: {
    type: mongoose.Types.ObjectId,
    ref: "brand"
  },
  carTypeId: {
    type: mongoose.Types.ObjectId,
    ref:"cartype"
  }
});

module.exports = mongoose.model("carModel", carModel);
