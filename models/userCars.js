const mongoose = require("mongoose");

const userCars = mongoose.Schema({
  image: {
    type: String
  },
  carTypeId: {
    type: mongoose.Types.ObjectId,
    ref: "cartype"
  },
  fuelTypeId: {
    type: mongoose.Types.ObjectId,
    ref: "carModelFuel"
  },
  carModelId: {
    type: mongoose.Types.ObjectId,
    ref: "carmodel"
  },
  carBrandId: {
    type: mongoose.Types.ObjectId,
    ref: "brand"
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "usercars"
  },
  status:{
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model("userCars", userCars);
