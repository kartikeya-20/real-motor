const mongoose = require("mongoose");

const carVerifiedImage = mongoose.Schema({
    carImageOne: {
        type: String,
        default: ""
    },
    carImageTwo: {
        type: String,
        default: ""
    },
    carImageThree: {
        type: String,
        default: ""
    },
    carImageFour: {
        type: String,
        default: ""
    },
    carImageFive: {
        type: String,
        default: ""
    },
    carImageSix: {
        type: String,
        default: ""
    },
    bookingId: {
        type: mongoose.Types.ObjectId,
        ref: "bookings"
    },
    venderId: {
        type: mongoose.Types.ObjectId,
        ref: "venderdetails"
    }
});

module.exports = mongoose.model("carVerifiedImage", carVerifiedImage);
