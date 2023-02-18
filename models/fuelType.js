const mongoose = require("mongoose");
const trackBooking = require("./trackBooking");

const FuelType = mongoose.Schema({

    fuelType: {
        type: String
    },
    image: {
        type: String
    }
});

module.exports = mongoose.model("fuelType", FuelType);
