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
    pdf: {
        type: String,
        default: ""
    },
    voice: {
        type: String,
        default: ""
    },
    details: [
        {
            price: {
             type: String,
             default: ""
            },
            title: {
                type: String,
                default: ""
            }   
        }
    ]
});

module.exports = mongoose.model("jobCart", jobCart);
