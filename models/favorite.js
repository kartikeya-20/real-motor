const mongoose = require("mongoose");

const favorite = mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "userdetails"
  },
  serviceId: {
    type: mongoose.Types.ObjectId,
    ref: "servicedatas"
  },
  select: {
    type: Boolean,
    default: false
  },
   carModelId: {
    type: mongoose.Types.ObjectId,
    default: "carModel"
  },
  carFuelId: {
    type: mongoose.Types.ObjectId,
    default: "fuelType"
  }
});

module.exports = mongoose.model("favorite", favorite);
