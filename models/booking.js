const mongoose = require("mongoose");

const booking = mongoose.Schema({

    cartId: [{
        type: mongoose.Types.ObjectId,
        ref: "addtocarts"
    }],
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "userdetails"
    },
    carBrand: {
        type: mongoose.Types.ObjectId,
        ref: "brands"
    },
    carName: {
        type: mongoose.Types.ObjectId,
        ref: "carmodels"
    },
    fuelType: {
        type: mongoose.Types.ObjectId,
        ref: "fuelType"
    },
    pickupDate: {
        type: String
    },
    pickupTime: {
        type: String
    },
    timesOfDay: {
        type: String
    },
    dateTime: [{
        type: String
    }],
    status: {
        type: Number,
        default: 1
    },
    // 0 Not Active(prodect in cart)
    // 1 Active
    // 2 Completed
    // 3 Cancelled
    trackBooking: {
        type: Number,
        default: 0
    },
    // 0 "Booking placed",
    // 1 "Driver on the way",
    // 2 "Job card pending",
    // 3 "Job card approved successfully",
    // 4 "In Service",
    // 5 "Service Completed",
    // 6 "Ready for delivery"
    // 7 compeled dilivery
    // 8 cancel booking

    // Paras _v5
    // 0 "Booking placed",
    // 1 "Driver on the way",
    // 2 "Job card pending",
    // 3 "Job card approved successfully",
    // 4 "In Service",
    // 5 "Service Completed",
    // 6 "Ready for delivery"
    // 7 Out of dilivery
    // 8 Deliver
    // 9 Cancel

    bookingCompleteStatus: {
        type: Number,
        default: 1
    },
    //0 Not complete work
    //1 complete Work
    otp: {
        type: String
    },
    address: {
        type: String
    },
    instruction: {
        type: String,
        default: ""
    },
    name: {
        type: String
    },
    phone: {
        type: String
    },
    lat: {
        type: String
    },
    long: {
        type: String
    },
    totalPayAmount: {
        type: String
    },
    bookingId: {
        type: String
    },
    amount: {
        type: String
    },
    razorePayOrderId: {
        type: String
    },
    razorePayPaymentId: {
        type: String
    },
    carPlateNumber: {
        type: String
    }
});

module.exports = mongoose.model("booking", booking);
