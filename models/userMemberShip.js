const mongoose = require("mongoose");

const userMemberShip = mongoose.Schema({

    userId: {
        type: mongoose.Types.ObjectId,
        ref:"userdetails"
    },
    memberShipId: {
        type: mongoose.Types.ObjectId,
        ref:"memberships"
    },
    buyDateTime: {
        type: String
    },
    exDateTime: {
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
    service:[
        {
            serviceId: {
                type: mongoose.Types.ObjectId,
                // ref: "membershipservice"
                
                ref : "RegulerServices"
            },
            qty: {
                type: String
            },
            discount: {
                type: String
            }
        }
    ],
    // added for attached membership with one car
    carId: {
        type: mongoose.Types.ObjectId,
        ref:"carModel"
    },
    carNumber:{
        type: String
    },

});

module.exports = mongoose.model("usermembership", userMemberShip);
