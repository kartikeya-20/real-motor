const mongoose = require("mongoose");

const conformCart = mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "userdetails"
    },
    serviceId: {
        type: mongoose.Types.ObjectId,
        ref: "bookings"
    },
    deliveryCharges: {
        type: String
    },
    currentMrp: {
        type: String
    },
    mrp: {
        type: String
    },
    totalPay: {
        type: String
    },
    discount: {
        type: String
    },
    refferal: {
        type: String
    },
    couponAmaunt: {
        type: String
    },
    couponCode: {
        type: String
    },
    dateTime: [{
        type: String
    }],
    address: {
        type: String
    },
    amount: {
        type: String
    },
    razorePayOrderId:{
        type: String
    },
    razorePayPaymentId:{
        type: String
    },
    
});

module.exports = mongoose.model("conformCart", conformCart);
