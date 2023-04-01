const mongoose = require("mongoose");

const trackBooking = mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "userdetails"
    },
    bookingId: {
        type: mongoose.Types.ObjectId,
        ref: "bookings"
    },
    otp: {
        type: String
    },
    status: {
        type: Number,
        default: 0
    }
    // 0 Booking placed
    // 1 Confirmed
    // 2 Expert On the way
    // 3 Reached at location
    // 4 Expert Going to Start work     

});

module.exports = mongoose.model("trackBooking", trackBooking);
