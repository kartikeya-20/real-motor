const mongoose = require("mongoose");

const serviceSubCategory = mongoose.Schema({
  subCategotyName: {
    type: String
  },
  categoryId:{
    type: mongoose.Types.ObjectId,
    ref: "servicecategories"
  },
  icon: {
    type: String
  }
});

module.exports = mongoose.model("serviceSubCategory", serviceSubCategory);
