const mongoose = require("mongoose");

const addToCart = mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "userdetails"
    },
    serviceId: {
        type: mongoose.Types.ObjectId,
        ref: "servicedatas"
    },
    carModelId: {
        type: mongoose.Types.ObjectId,
        ref: "carModel"
    },
    fuelTypeId: {
        type: mongoose.Types.ObjectId,
        ref: "fuelType"
    },
    status: {
        type: Number,
        default: 0
    }
    // 0 not booking 
    // 1 booking
});

module.exports = mongoose.model("addToCart2", addToCart);
