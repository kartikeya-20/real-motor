const mongoose = require("mongoose");
const userDetails = require("./userDetails");

const venderNotification = mongoose.Schema({
    venderId: {
        type: mongoose.Types.ObjectId,
        ref: "venderdetails"
    },
    title: {
        type: String
    },
    image: {
        type: String
    },
    description: {
        type: String
    },
    date: {
        type: String
    },
});

module.exports = mongoose.model("venderNotification", venderNotification);
