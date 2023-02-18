const mongoose = require("mongoose");

const carModelFuel = mongoose.Schema({
  image: {
    type: String
  },
  fuelTypeId: {
    type: mongoose.Types.ObjectId,
    ref: "fueltypes"
  },
  carModelId: {
    type: mongoose.Types.ObjectId,
    ref: "carmodel"
  }
});

module.exports = mongoose.model("carModelFuel", carModelFuel);
