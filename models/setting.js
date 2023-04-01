const mongoose = require("mongoose");

const setting = mongoose.Schema({
  userCode: {
    type: String,
    default: "0"
  },
  referralCode: {
    type: String,
    default: "0"
  },
  orderAscend: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model("setting", setting);
