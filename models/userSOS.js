const mongoose = require("mongoose");
const userDetails = require("./userDetails");

const userSOS = mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "userdetails"
    },
    sosId: {
        type: mongoose.Types.ObjectId,
        ref: "sos"
    },
    dateTime : [{
        type: String
    }],
    phone:{
        type: String
    },
    lat: {
        type: String
    },
    long: {
        type: String
    },
    venderId: {
        type: mongoose.Types.ObjectId,
        ref: "venderdetails"
    },
    amount: {
        type: String
    },
    razorePayOrderId:{
        type: String
    },
    razorePayPaymentId:{
        type: String
    },
});

module.exports = mongoose.model("userSOS", userSOS);
