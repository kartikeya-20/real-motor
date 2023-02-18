const mongoose = require("mongoose");

const discountCoupon = mongoose.Schema({
  image: {
    type: String
  },
  title: {
    type: String
  },
  discount: {
    type: String
  },
  description: {
    type: String
  },
  minimumAmount: {
    type: String,
    default: "0"
  },
  status: {
    type: Number,
    default: 0
    // expare 1
    // not expare 0
  },
  startDate: {
    type: String
  },
  endDate: {
    type: String
  },
  couponCode: {
    type: String
  },
  chackMemberShip: {
    type: Number,
    default: 0
    // 0 not memberShip
    // 1 membership
  }
});

module.exports = mongoose.model("discountCoupon", discountCoupon);
