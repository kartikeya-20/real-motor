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
  },
  isActive: {  // added isActive field by Jayshri 23 Feb 2023
    type: Boolean,
    default: true
  }
  
});

module.exports = mongoose.model("carModel", carModel);
