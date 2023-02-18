const mongoose = require("mongoose");

const userMemberShipService = mongoose.Schema({

    userId: {
        type: mongoose.Types.ObjectId,
        ref:"userdetails"
    },
    title:{
        type: String
    },
    serviceId: {
        type: mongoose.Types.ObjectId,
        ref: "membershipservices"
    },
    status: {
        type: Number,
        default: 0
        // 0 not use
        // 1 use
    }
    });

module.exports = mongoose.model("userMemberShipService", userMemberShipService);
