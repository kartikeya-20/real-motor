const mongoose = require("mongoose");

const wallet = mongoose.Schema({

    userId: {
        type: mongoose.Types.ObjectId,
        ref:"userdetails"
    },
    status:{
        type: Number
    },
    // 0 Paid
    // 1 Received
    // 2 Cashback
    title: {
        type: String
    },
    description: {
        type: String
    },
    amount: {
        type: String
    },
    dateTime: [{
        type: String
    }]
    });

module.exports = mongoose.model("wallet", wallet);
