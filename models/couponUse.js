const mongoose = require("mongoose");

const carType = mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "userdetails"
  },
  couponCode: {
    type: String
  },
  dateTime: {
    type: String
    }
});

module.exports = mongoose.model("couponUse", carType);
