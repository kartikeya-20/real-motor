const mongoose = require("mongoose");
const trackBooking = require("./trackBooking");

const memberShipService = mongoose.Schema({

    memberShipService: {
        type: String
    }
});

module.exports = mongoose.model("membershipservice", memberShipService);
