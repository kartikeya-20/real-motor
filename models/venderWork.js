const mongoose = require("mongoose");

const venderBooking = mongoose.Schema({

    userId: {
        type: mongoose.Types.ObjectId,
        ref:"userdetails"
    },
    bookingId: {
        type: mongoose.Types.ObjectId,
        ref: "bookings"
    },
    venderId: {
        type: mongoose.Types.ObjectId,
        ref: "venderdetails"
    },
    workshopStatus: {
        type: Number,
        default: 1
    },
    // 1 pickup
    // 2 inProcess
    // 3 complete for deliver
    // 4 cancel
    serviceStatus: {
        type: Number,
        default: 0
    },
    address: {
        type: String
    },
    mrp: {
        type: String
    },
    currentMrp: {
        type: String
    },
    totalPay: {
        type: String
    },
    dateTime: [{
        type: String
    }],
    verified: {
        type: Number,
        default : 0
    },
   
    // 0 not upload car image 
    // 1 car image upload 
    
    });

module.exports = mongoose.model("venderWork", venderBooking);
