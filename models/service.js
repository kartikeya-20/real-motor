const mongoose = require("mongoose");

const service = mongoose.Schema({
  title: {
    type: String
  },
  image: {
    type: String
  },
  icon: {
    type: String
  },
  mrp: {
    type: String
  },
  currentMrp: {
    type: String
  },
  discount: {
    type: String
  },
  service: [{
    type: String
  }],
  deliveryCharges: {
    type: String,
    default: "0"
  },
  carTypeId: {
    type: mongoose.Types.ObjectId,
    ref: "cartypes"
  },
  subCategoryId: {
    type: mongoose.Types.ObjectId,
    ref: "servicecategories"
  },
  //--------- 2/12/2022 Paras ---------
  carModelId: {
    type: mongoose.Types.ObjectId,
    ref: "carModel"
  },
  carFualTypeId: {
    type: mongoose.Types.ObjectId,
    ref: "fuelType"
  }
});

module.exports = mongoose.model("serviceData", service);
