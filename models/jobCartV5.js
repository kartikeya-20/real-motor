const mongoose = require("mongoose");
const trackBooking = require("./trackBooking");

const jobCart = mongoose.Schema({

    title: {
        type: String
    },
    description: {
        type: String
    },
    venderId: {
        type: mongoose.Types.ObjectId,
        ref: "venderdetails"
    },
    bookingId: {
        type: mongoose.Types.ObjectId,
        ref: "bookings"
    },
    dateTime: [{
        type: String
    }],
    shotBookingId: {
        type: String
    },
    pdf: {
        type: String,
        default: ""
    },
    image: {
        type: String,
        default: ""
    },
    details: [
        {
            price: {
             type: String,
             default: ""
            },
            labourPrice : { 
                type : String,
                default : ""
            },
            title: {
                type: String,
                default: ""
            }   
        }
    ],
    jobCartStatus: {
        type: Number,
        default: 1
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "userdetails"
    }
});

module.exports = mongoose.model("jobCartv2", jobCart);
