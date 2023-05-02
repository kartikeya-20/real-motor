const mongoose = require("mongoose");

const address = mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "userdetails"
    },
    address: {
        type: String
    },
    lat: {
        type: String
    },
    long: {
        type: String
    },
    name: {
        type: String
    },
    phone: {
        type: String
    },
    status: {
        type: Number,
        default: 0
    },
    pincode : {
        type : String
    }
    // 0 not select Address
    // 1 select Address
});

module.exports = mongoose.model("userAddress", address);
