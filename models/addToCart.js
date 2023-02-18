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
    status: {
        type: Number,
        default: 0
    }
    // 0 not booking 
    // 1 booking
});

module.exports = mongoose.model("addToCart", addToCart);
