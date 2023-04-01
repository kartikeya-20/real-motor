const mongoose = require("mongoose");

const feedBackSchema = mongoose.Schema({
    rating: {
        type: Number,
        default:0
    },
    feedBack: {
        type: String,
        default:""
    },
    bookingId: {
        type: mongoose.Types.ObjectId,
        ref:"bookings"
    }
});

module.exports = mongoose.model("FeedBack", feedBackSchema);
